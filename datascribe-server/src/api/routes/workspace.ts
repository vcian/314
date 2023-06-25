import { Router, Request, Response } from 'express';
import status_code from '../../common/utils/StatusCodes';
import IWorkspace from '../interface/IWorkspace';
import * as l10n from 'jm-ez-l10n';
import { WORKSPACE_SCHEMA } from '../schema/workspace.schema';
import { setupMulter } from '../../common/utils/multer';
import { isAuth } from '../middlewares/Authorizationn';
const { handleUploads } = setupMulter();
import multipart from 'connect-multiparty';

const multipartMiddleware = multipart();

const route = Router();

export default (app: Router) => {
  app.use('/workspaces', route);
  route.post('/', WORKSPACE_SCHEMA.CREATE_WORKSPACE, isAuth, createWorkspace);
  route.get('/', WORKSPACE_SCHEMA.LIST_WORKSPACE, isAuth, getWorkspaces);
  route.get('/:slug', WORKSPACE_SCHEMA.FIND_WORKSPACE, isAuth, findWorkspace);
  route.patch(
    '/:slug',
    WORKSPACE_SCHEMA.UPDATE_WORKSPACE,
    isAuth,
    updateWorkspaceSlug,
  );
  route.put(
    '/:slug/embedding',
    WORKSPACE_SCHEMA.UPDATE_WORKSPACE,
    isAuth,
    updateWorkspaceSlug,
  );
  route.put('/:slug/upload', multipartMiddleware, /* isAuth, */ uploadFile);
  route.post('/:slug/chat', chat);
};

const createWorkspace = async (req: Request, res: Response) => {
  const data = req.body;
  IWorkspace.createWorkspace(data)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((e) => {
      return res.status(status_code.INTERNAL_SERVER_ERROR).json({
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      });
    });
};

const getWorkspaces = async (req: Request, res: Response) => {
  const data = req.query;
  IWorkspace.getWorkspaces(data)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((e) => {
      return res.status(status_code.INTERNAL_SERVER_ERROR).json({
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      });
    });
};

const findWorkspace = async (req: Request, res: Response) => {
  const data = req.params;
  IWorkspace.findWorkspace(data)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((e) => {
      return res.status(status_code.INTERNAL_SERVER_ERROR).json({
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      });
    });
};

const updateWorkspaceSlug = async (req: Request, res: Response) => {
  const data = req.body;
  data.slug = req.params;
  IWorkspace.updateWorkspaceSlug(data)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((e) => {
      return res.status(status_code.INTERNAL_SERVER_ERROR).json({
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      });
    });
};

const uploadFile = async (req: any, res: Response) => {
  const data = req.body;
  data.slug = req.params;
  data.file = req.files.file;
  // data.file = req.file;
  // multipartMiddleware;
  IWorkspace.uploadFile(data)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((e) => {
      return res.status(status_code.INTERNAL_SERVER_ERROR).json({
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      });
    });
};

const chat = async (req: Request, res: Response) => {
  const data = req.body;
  data.slug = req.params;

  IWorkspace.chat(data)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((e) => {
      return res.status(status_code.INTERNAL_SERVER_ERROR).json({
        status: status_code.INTERNAL_SERVER_ERROR,
        message: l10n.t('SOMETHING_WENT_WRONG'),
      });
    });
};
