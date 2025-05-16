import {StatusCodes} from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
    
    const defaultError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || 'Что-то пошло не так, пожалуйста, повторите попытку позже'
    }

    if (error.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(error.errors).map((item) => item.message).join(', ');
    }

    if (error.code && error.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `${Object.keys(error.keyValue)} поле должно быть уникальным`;
    }

    return res.status(defaultError.statusCode).json({msg: defaultError.msg});
}

export default errorHandlerMiddleware;