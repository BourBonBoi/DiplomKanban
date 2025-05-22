import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Пожалуйста, укажите свое имя']
        },
        columns: {
            type: [{
                column: {
                    type: String,
                }
            }]
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Пожалуйста, укажите имя пользователя']
        },
    },
    {timestamps: true}
);

export default mongoose.model('Board', BoardSchema);