import Board from "../models/Board.js";
import Task from "../models/Task.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from "../errors/index.js";
import {checkPermissions} from "../utils/checkPermissions.js";

export const createBoard = async (req, res) => {
    const {name} = req.body;
    if (!name) {
        throw new BadRequestError('Пожалуйста, укажите все значения.');
    }

    req.body.createdBy = req.user.userId;
    const board = await Board.create(req.body);

    return res.status(StatusCodes.CREATED).json({board});
}

export const getBoards = async (req, res) => {
    const boards = await Board.find({createdBy: req.user.userId});
    return res.status(StatusCodes.OK).json({boards});
}

export const updateBoard = async (req, res) => {
    const {id: boardId} = req.params;

    const {name, columns: updatedColumns} = req.body;
    if (!name) {
        throw new BadRequestError('Пожалуйста, укажите все значения.');
    }

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`Нет доски с ID ${boardId}`);
    }

    checkPermissions(req.user, board.createdBy);
    const updatedBoard = await Board.findOneAndUpdate({_id: boardId}, req.body, {new: true});

    const {columns: oldColumns} = board;
    const updatedColumnIds = updatedColumns.map((item) => item._id);
    const deletedColumns = [];
    oldColumns.forEach((item) => {
        if (!updatedColumnIds.includes(item._id.toString())) {
            deletedColumns.push(item.column);
        }
    });
    await Task.deleteMany({status: deletedColumns});
    oldColumns.forEach( (item) => {
        const {column: oldColumn, _id: oldColumnId} = item;

        updatedColumns.forEach(async (col) => {
            const {column: updatedColumn, _id: updatedColumnId} = col;
            if (oldColumnId.toString() === updatedColumnId && oldColumn !== updatedColumn) {
                await Task.updateMany({status: oldColumn}, {status: updatedColumn});
            }
        });
    });

    return res.status(StatusCodes.OK).json({updatedBoard});
}

export const deleteBoard = async (req, res) => {
    const {id: boardId} = req.params;

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`Нет доски с ID ${boardId}`);
    }

    checkPermissions(req.user, board.createdBy);
    await board.remove();
    await Task.deleteMany({boardId});

    return res.status(StatusCodes.OK).json({msg: 'Успех! Доска объявлений была удалена'});
}