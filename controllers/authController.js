import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError, UnAuthenticatedError} from "../errors/index.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError('Пожалуйста, укажите все значения');
    }

    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
        throw new BadRequestError('Почта уже используется');
    }

    const user = await User.create(req.body);
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName
        },
        token
    });
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new BadRequestError('Пожалуйста, укажите все значения');
    }

    const user = await User.findOne({email}).select('+password');
    if (!user) {
        throw new UnAuthenticatedError('Неверные данные');
    }

    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Неверные данные');
    }

    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName
        },
        token
    });
}

export const updateUser = async (req, res) => {
    const {name, lastName, email} = req.body;

    if (!name || !lastName || !email) {
        throw new BadRequestError('Пожалуйста, укажите все значения');
    }

    const user = await User.findById({_id: req.user.userId});

    user.name = name;
    user.lastName = lastName;
    user.email = email;

    await user.save();
    const token = user.createJWT();

    return res.status(StatusCodes.OK).json({user, token});
}