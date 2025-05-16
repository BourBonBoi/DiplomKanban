import {UnAuthenticatedError} from "../errors/index.js";

export const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString()) {
        return;
    }
    throw new UnAuthenticatedError('Не авторизован для доступа к этому маршруту');
};