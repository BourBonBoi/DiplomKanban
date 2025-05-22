import {StatusCodes} from "http-status-codes";

const notFoundMiddleware = (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).json({msg: 'Маршрут не существует'});
}

export default notFoundMiddleware;