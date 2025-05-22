import Task from "../models/Task.js";
import Board from "../models/Board.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from "../errors/index.js";
import {checkPermissions} from "../utils/checkPermissions.js";

export const createTask = async (req, res) => {
    const {title, status, boardId} = req.body;

    if (!title || !status) {
        throw new BadRequestError('Пожалуйста, укажите все значения');
    }

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`Нет доски с ID: ${boardId}`);
    }

    checkPermissions(req.user, board.createdBy);

    req.body.userId = req.user.userId;
    const task = await Task.create(req.body);

    return res.status(StatusCodes.CREATED).json({task});
}

export const getTasks = async (req, res) => {
    const {id: boardId} = req.params;

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`Нет доски с ID: ${boardId}`);
    }

    checkPermissions(req.user, board.createdBy);

    let tasks = await Task.find({boardId});

    tasks = tasks.reduce((acc, curr) => {
        if (acc[curr.status]) {
            acc[curr.status] = [...acc[curr.status], curr];
        } else {
            acc[curr.status] = [curr];
        }

        return acc;
    }, {});

    return res.status(StatusCodes.OK).json({tasks});
}

export const updateTask = async (req, res) => {
    const {id: taskId} = req.params;
    const {boardId} = req.body;

    if (!boardId) {
        throw new BadRequestError('Пожалуйста, предоставьте ID доски');
    }

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`Нет доски с ID: ${boardId}`);
    }

    if (!taskId) {
        throw new BadRequestError('Пожалуйста, предоставьте ID задачи')
    }

    const task = await Task.findOne({_id: taskId});
    if (!task) {
        throw new NotFoundError(`Нет доски с ID: ${taskId}`)
    }

    checkPermissions(req.user, task.userId);

    const updatedTask = await Task.findOneAndUpdate({_id: taskId}, req.body, {new: true});

    return res.status(StatusCodes.OK).json({updatedTask});
}

export const deleteTask = async (req, res) => {
    const {id: taskId} = req.params;

    const task = await Task.findOne({_id: taskId});
    if (!task) {
        throw new NotFoundError(`Нет доски с ID: ${taskId}`)
    }

    checkPermissions(req.user, task.userId);
    await task.remove();

    return res.status(StatusCodes.OK).json({msg: 'Успех! Задача удалена'});
}