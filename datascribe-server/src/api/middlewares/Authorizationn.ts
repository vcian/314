import * as crypto from 'crypto-js';
import { NextFunction, Request, Response } from 'express';
import * as l10n from 'jm-ez-l10n';
import * as jwt from 'jsonwebtoken';
import { Container } from 'typedi';
import config from '../../common/config';
import statusCode from '../../common/utils/StatusCodes';
import { AUTHORIZATION_MESSAGE, MODULE_NAME } from "../../common/utils/Constant";
import { Users } from "../../common/models";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = <string>req.headers['authorization'];
    if (!headerToken) {
        return res.status(statusCode.BAD_REQUEST).json({ status: statusCode.BAD_REQUEST, message: l10n.t('NOT_FOUND', { key: `${MODULE_NAME.AUTH} ${MODULE_NAME.TOKEN}` }) });
    } else {
        const token = headerToken.split('Bearer ')[1];
        jwt.verify(token, config.JWT_SECRET, async function (err: any, decode: any) {
            if (err) return res.status(statusCode.UNAUTHORISED).json({ status: statusCode.UNAUTHORISED, message: AUTHORIZATION_MESSAGE.INVALID_REQUEST });
            res.locals.jwtTTL = { exp: decode.exp, jwt: token };
            const bytes = crypto.AES.decrypt(decode.sub, config.CIPHER_SECRET);
            const decryptedData = bytes.toString(crypto.enc.Utf8);

            res.locals.jwtPayload = JSON.parse(decryptedData);
            const userData = await Users.findOne({ where: { userId: res.locals.jwtPayload.uid } });
            if (userData.isActive) {
                Container.set('auth-token', res.locals.jwtPayload);
                Container.set('token-string', token);
                next();
            } else {
                return res.status(statusCode.UNAUTHORISED).json({ status: statusCode.UNAUTHORISED, message: AUTHORIZATION_MESSAGE.INVALID_REQUEST });
            }
        });
    }
};