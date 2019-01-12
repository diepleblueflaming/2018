const MESSAGE = require('./message/en.json');
const STATUS_CODE = require('./statusCodes/index.json');
module.exports = {
    VALIDATION: {
        EMAIL: {
            resource: 'user',
            field: 'email',
            message: MESSAGE['EMAIL_INVALID']
        },
        PASSWORD: {
            resource: 'user',
            field: 'password',
            message: MESSAGE['PASSWORD_INVALID']
        },
        EXISTED_USER: {
            resource: 'user',
            field: 'email',
            message: MESSAGE['EXISTED_USER']
        },
        STATUS_CODE: STATUS_CODE['VALIDATION_ERROR'],
        MESSAGE: MESSAGE['VALIDATION_ERROR']
    },

    AUTHENTICATION: {
        MISSING_TOKEN: {
            message: MESSAGE['MISSING_TOKEN']
        },
        USER_NOT_FOUND: {
            message: MESSAGE['USER_NOT_FOUND_TOKEN']
        },
        STATUS_CODE: STATUS_CODE['UNAUTHORIZED'],
        MESSAGE: MESSAGE['AUTHENTICATION_ERROR']
    },

    INTERNAL_SERVER: {
        COMMON: {
            message: MESSAGE['COMMON']
        },
	    DATABASE: {
		    message: MESSAGE['DATABASE']
	    },
	    ARGUMENTS: {},
        STATUS_CODE: STATUS_CODE['INTERNAL_SERVER_ERROR'],
        MESSAGE: MESSAGE['INTERNAL_SERVER_ERROR']
    },

    RESOURCE_NOT_FOUND: {
        STATUS_CODE: STATUS_CODE['NOT_FOUND'],
        MESSAGE: MESSAGE['RESOURCE_NOT_FOUND']
    }
};
