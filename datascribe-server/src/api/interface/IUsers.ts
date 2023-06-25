import { Op } from 'sequelize';
import * as l10n from 'jm-ez-l10n';
import { v4 as uuidv4 } from 'uuid';
import statusCode from '../../common/utils/StatusCodes';
import { Users } from '../../common/model';
import {
    AUTHORIZATION_MESSAGE,
    MODULE_NAME,
    REQUEST_METHOD,
} from '../../common/utils/Constant';
import { genHashToken } from '../../common/services/Helper';
import { generateJWTToken } from '../../common/services/jwtTokens';
import Container from 'typedi';

export class IUser {
    static async signUp(data: any) {
        try {
            let admin = await Users.findOne({
                where: { email: data['email'].toLowerCase() },
                raw: true,
            });
            if (admin)
                return {
                    status: statusCode.ALREADY_EXIST,
                    message: `${MODULE_NAME.EMAIL} already exists`,
                };

            const invitationToken = genHashToken(50);

            const dataToSave: any = {
                firstName: data.firstName ? data.firstName : data.email.split('@')[0],
                lastName: data.lastName,
                password: data.password,
                email: data.email.toLowerCase(),
                userId: uuidv4(),
                isActive: '0', // will be in-active until password is not set
                invitationToken: invitationToken,
                token: null,
            };
            await Users.create(dataToSave);

            // Send set password email
            /* await serviceMailer.setPasswordMail({
                      sentFrom: 'DataScribe',
                      receiver_email: data.email.toLowerCase(),
                      invitationToken: invitationToken,
                      name: data['email'].toLowerCase().split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
                  }); */
            return {
                status: statusCode.OK,
                message: l10n.t('COMMON_SUCCESS', {
                    key: MODULE_NAME.USER,
                    method: REQUEST_METHOD.REGISTERED,
                }),
            };
        } catch (error) {
            console.error(error);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                message: 'SOMETHING_WENT_WRONG',
            };
        }
    }

    static async signIn(data: any) {
        try {
            const attributes = [
                'id',
                'email',
                'userId',
                'firstName',
                'gender',
                'isActive',
                'createdAt',
            ];
            let user = await Users.findOne({
                where: { email: data.email, password: data.password },
                attributes,
            });
            if (!user)
                return {
                    status: statusCode.NOTFOUND,
                    message: l10n.t('NOT_EXISTS', { key: MODULE_NAME.USER }),
                };

            let tokenData = { id: user.id, uid: user.userId, email: user.email };
            const jwtToken = await generateJWTToken(tokenData);

            await Users.update(
                { token: jwtToken, isActive: true },
                { where: { userId: user.userId, id: user.id } },
            );

            user.token = jwtToken;
            return { status: statusCode.OK, message: l10n.t('COMMON_SUCCESS', { key: `${MODULE_NAME.USER} details`, method: REQUEST_METHOD.PUT }), data: user };
        } catch (error) {
            console.error(error);
            return { status: statusCode.INTERNAL_SERVER_ERROR, message: 'SOMETHING_WENT_WRONG' };
        }
    }

    static async verifyPassword(data: any) {
        try {
            return {
                status: statusCode.OK,
                message: `${MODULE_NAME.USER} ${MODULE_NAME.EMAIL} verified successfully`,
            };
        } catch (error) {
            console.error(error);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                message: 'SOMETHING_WENT_WRONG',
            };
        }
    }

    static async getProfile() {
        try {
            const tokenData: any = Container.get('auth-token');

            const attributes = [
                'email',
                'userId',
                'firstName',
                'gender',
                'isActive',
                'createdAt',
            ];
            const user = await Users.findOne({
                where: { userId: tokenData.uid },
                attributes,
            });
            if (user.isActive == false)
                return {
                    status: statusCode.UNAUTHORISED,
                    message: AUTHORIZATION_MESSAGE.INVALID_REQUEST,
                };
            if (!user)
                return {
                    status: statusCode.NOTFOUND,
                    message: l10n.t('NOT_EXISTS', { key: MODULE_NAME.USER }),
                };

            return {
                status: statusCode.OK,
                message: `${MODULE_NAME.USER} details ${REQUEST_METHOD.GET} successfully`,
                data: user,
            };
        } catch (error) {
            console.error(error);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                message: 'SOMETHING_WENT_WRONG',
            };
        }
    }

    static async forgetPassword() {
        try {
            return { status: 200, message: `${MODULE_NAME.EMAIL} sent successfully` };
        } catch (error) {
            console.error(error);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                message: 'SOMETHING_WENT_WRONG',
            };
        }
    }

    static async signOut() {
        try {
            const tokenData: any = Container.get('auth-token');

            const user = await Users.findOne({ where: { userId: tokenData.uid } });
            if (!user)
                return {
                    status: statusCode.NOTFOUND,
                    message: l10n.t('NOT_EXISTS', { key: MODULE_NAME.USER }),
                };

            await Users.update(
                { isActive: false },
                { where: { userId: tokenData.uid } },
            );
            return {
                status: statusCode.OK,
                message: `${MODULE_NAME.USER} ${REQUEST_METHOD.LOGOUT} successfully`,
            };
        } catch (error) {
            console.error(error);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                message: 'SOMETHING_WENT_WRONG',
            };
        }
    }
}
