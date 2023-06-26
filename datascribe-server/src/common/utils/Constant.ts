export const MODULE_NAME = {
    EMAIL: 'Email',
    USER: 'User',
    AUTH: 'Authorization',
    TOKEN: 'Token'
}

export const REQUEST_METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'updated',
    DELETE: 'delete',
    REGISTERED: 'registered',
    LOGOUT: 'logout'
}

export const AUTHORIZATION_MESSAGE = {
    SUCCESS: 'success',
    ERROR: 'error',
    INVALID_REQUEST: `Invalid ${MODULE_NAME.AUTH.toLowerCase()} ${MODULE_NAME.TOKEN.toLowerCase()}`
}

export const EMAIL_CONSTANTS: object = {};
