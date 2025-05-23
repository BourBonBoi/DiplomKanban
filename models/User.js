import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Пожалуйста, укажите свое имя'],
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    lastName: {
        type: String,
        default: 'Фамилия',
        maxLength: 30,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Пожалуйста, укажите почту '],
        validate: {
            validator: validator.isEmail,
            message: 'Пожалуйста, укажите рабочую почту'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Пожалуйста, укажите пароль'],
        minLength: 6,
        select: false
    }
});

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
};

UserSchema.methods.comparePasswords = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

export default mongoose.model('User', UserSchema);