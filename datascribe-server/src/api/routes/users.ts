import { Router, Request, Response } from 'express';
import statusCode from '../../common/utils/StatusCodes';
import { IUser } from '../interface/IUsers';
import { isAuth } from "../middlewares/Authorizationn";
import { USER_SCHEMA } from "../schema/users.schema";

const route = Router();

export default (app: Router) => {
    app.use('', route);

    route.post('/signup', USER_SCHEMA.AUTH, signUp);
    route.post('/signin', USER_SCHEMA.AUTH, signIn);
    route.post('/verify', isAuth, verifyPassword);
    route.get('/profile', isAuth, getProfile);
    route.post('/forget-password', isAuth, forgetPassword);
    route.post('/signout', isAuth, signOut);

};

async function signUp(req: Request, res: Response) {
    const data = req.body;
    IUser.signUp(data)
        .then(response => {
            res.status(response.status).json(response);
        })
        .catch(e => {
            console.error(e);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: statusCode.INTERNAL_SERVER_ERROR, message: 'something went wrong' });
        });
}

async function signIn(req: Request, res: Response) {
    const data = req.body;
    IUser.signIn(data)
        .then(response => {
            res.status(response.status).json(response);
        })
        .catch(e => {
            console.error(e);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: statusCode.INTERNAL_SERVER_ERROR, message: 'something went wrong' });
        });
}

async function forgetPassword(req: Request, res: Response) {
    IUser.forgetPassword()
        .then(response => {
            res.status(response.status).json(response);
        })
        .catch(e => {
            console.error(e);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: statusCode.INTERNAL_SERVER_ERROR, message: 'something went wrong' });
        });
}

async function getProfile(req: Request, res: Response) {
    IUser.getProfile()
        .then(response => {
            res.status(response.status).json(response);
        })
        .catch(e => {
            console.error(e);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: statusCode.INTERNAL_SERVER_ERROR, message: 'something went wrong' });
        });
}

async function verifyPassword(req: Request, res: Response) {
    const data = req.body;
    IUser.verifyPassword(data)
        .then(response => {
            res.status(response.status).json(response);
        })
        .catch(e => {
            console.error(e);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: statusCode.INTERNAL_SERVER_ERROR, message: 'something went wrong' });
        });
}

async function signOut(req: Request, res: Response) {
    const data = req.body;
    IUser.signOut()
        .then(response => {
            res.status(response.status).json(response);
        })
        .catch(e => {
            console.error(e);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ status: statusCode.INTERNAL_SERVER_ERROR, message: 'something went wrong' });
        });
}