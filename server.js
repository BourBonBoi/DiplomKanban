import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import connectDB from "./db/connect.js";
import morgan from 'morgan';
import helmet from "helmet";
import xss from 'xss-clean';
import mongoSanitize from "express-mongo-sanitize";

// middleware
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import authRouter from "./routes/authRouter.js";
import boardRouter from "./routes/boardRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/boards', boardRouter);
app.use('/api/v1/tasks', taskRouter);

// catch errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.DB_URL);
        app.listen(port, () => {
            console.log(`server is running on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
