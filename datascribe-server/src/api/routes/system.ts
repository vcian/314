import { Router, Request, Response } from 'express';
import status_code from '../../common/utils/StatusCodes';
import IWorkspace from '../interface/IWorkspace';
import * as l10n from 'jm-ez-l10n';
import { WORKSPACE_SCHEMA } from '../schema/workspace.schema';
import ISystem from '../interface/ISystem';
import { isAuth } from "../middlewares/Authorizationn";

const route = Router();

export default (app: Router) => {
  app.use('/system', route);
  route.get('/local-files', isAuth, getLocalFiles);
};

const getLocalFiles = async (req: Request, res: Response) => {
  ISystem.getLocalFiles()
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
