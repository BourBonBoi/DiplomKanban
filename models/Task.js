import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Пожалуйста, укажите заголовок']
    },
    description: {
        type: String,
    },
    subtasks: {
        type: [{
            name: {
                type: String
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }]
    },
    status: {
        type: String,
        required: [true, 'Пожалуйста, укажите статус']
    },
    boardId: {
        type: mongoose.Types.ObjectId,
        ref: 'Board',
        required: [true, 'Пожалуйста, укажите ID доски']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Пожалуйста, укажите ID пользователя']
    }
}, {
    timestamps: true
});

export default mongoose.model('Task', TaskSchema);