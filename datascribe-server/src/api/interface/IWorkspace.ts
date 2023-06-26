import { Workspace } from '../../common/model';
import status_code from '../../common/utils/StatusCodes';
import * as l10n from 'jm-ez-l10n';
import { Op } from 'sequelize';
import {
  checkPythonAppAlive,
  processDocument,
} from '../../common/utils/helper';
import IWorkspaceDocument from './IWorkspaceDocument';
import { chatWithWorkspace } from '../../common/chat';
import Container from 'typedi';

export default class IWorkspace {
  static async createWorkspace(data) {
    try {
      const tokenData: any = Container.get('auth-token');

      await Workspace.create({ ...data, slug: data.name });
      return {
        status: status_code.CREATED,
        message: l10n.t('COMMON_SUCCESS_MESSAGE', {
          key: 'workspace',
          method: 'created',
        }),
      };
    } catch (error) {
      return {
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      };
    }
  }

  static async getWorkspaces(data) {
    try {
      const tokenData: any = Container.get('auth-token');
      console.log({ tokenData });

      const page = +data.page;
      const limit = +data.limit;
      const filter: any = {};
      if (data.search) {
        filter.slug = { [Op.iLike]: `%${data.search}%` };
      }
      const { count, rows } = await Workspace.findAndCountAll({
        where: filter,
        limit: data.limit,
        offset: (page - 1) * limit,
      });
      if (!rows.length) {
        return {
          status: status_code.NOTFOUND,
          message: l10n.t('NOT_FOUND', {
            key: 'workspace',
          }),
        };
      }
      return {
        status: status_code.OK,
        message: l10n.t('COMMON_SUCCESS_MESSAGE', {
          key: 'workspace',
          method: 'get',
        }),
        data: { count, rows },
      };
    } catch (error) {
      return {
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      };
    }
  }

  static async findWorkspace(data) {
    try {
      const tokenData: any = Container.get('auth-token');

      const slug = await Workspace.findOne({ where: { slug: data.slug } });
      if (!slug) {
        return {
          status: status_code.NOTFOUND,
          message: l10n.t('NOT_FOUND', {
            key: 'workspace',
          }),
        };
      }
      return {
        status: status_code.OK,
        message: l10n.t('COMMON_SUCCESS_MESSAGE', {
          key: 'workspace',
          method: 'get',
        }),
        data: slug,
      };
    } catch (error) {
      return {
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      };
    }
  }

  static async updateWorkspaceSlug(data) {
    try {
      const tokenData: any = Container.get('auth-token');

      const { adds, deletes } = data;
      const slug = await Workspace.findOne({ where: data.slug });
      if (!slug) {
        return {
          status: status_code.NOTFOUND,
          message: l10n.t('NOT_FOUND', {
            key: 'workspace',
          }),
        };
      }
      await IWorkspaceDocument.addDocuments(slug, adds);
      await IWorkspaceDocument.removeDocuments(slug, deletes);
      // await Workspace.update(data, { where: { id: slug.id } });
      return {
        status: status_code.OK,
        message: l10n.t('COMMON_SUCCESS_MESSAGE', {
          key: 'workspace',
          method: 'updated',
        }),
      };
    } catch (error) {
      console.log(error);
      return {
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      };
    }
  }

  static async uploadFile(data) {
    try {
      // const tokenData: any = Container.get('auth-token');
      const path = require('path');
      const fs = require('fs');
      const { originalFilename } = data.file;
      const newPath = path.resolve(
        __dirname,
        `../../../collector/hotdir/${originalFilename}`,
      );

      fs.rename(data.file.path, newPath, function (err) {
        if (err) throw err;
        console.log('Successfully renamed - AKA moved!');
      });
      console.log(originalFilename);
      const processingOnline = await checkPythonAppAlive();

      if (!processingOnline) {
        console.log(
          `Python processing API is not online. Document ${originalFilename} will not be processed automatically.`,
        );
        return {
          status: status_code.INTERNAL_SERVER_ERROR,
          message: l10n.t('FILE_PROCESS'),
        };
      }
      const { success, reason } = await processDocument(originalFilename);
      if (!success) {
        return {
          status: status_code.INTERNAL_SERVER_ERROR,
          message: l10n.t('FILE_PROCESS'),
        };
      }
      return {
        status: status_code.OK,
        message: l10n.t('COMMON_SUCCESS_MESSAGE', {
          key: 'workspace',
          method: 'updated',
        }),
        data: success,
      };
    } catch (error) {
      console.log(error);
      return {
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      };
    }
  }
  static async chat(data) {
    try {
      const workspace = await Workspace.findOne({ where: data.slug });
      if (!workspace) {
        return {
          status: status_code.NOTFOUND,
          message: l10n.t('NOT_FOUND', {
            key: 'workspace',
          }),
        };
      }
      const result = await chatWithWorkspace(
        workspace,
        data.message,
        data.mode,
      );

      return {
        status: status_code.OK,
        message: l10n.t('COMMON_SUCCESS_MESSAGE', {
          key: 'workspace',
          method: 'updated',
        }),
        data: { ...result },
      };
    } catch (error) {
      console.log(error);
      return {
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      };
    }
  }
}
