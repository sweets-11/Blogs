import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
import blogRouter from './routes/blogs.js';
import commentRouter from './routes/comments.js';
import { connectMongo } from './services/connectMongo.js';
config({
    path: '.env',
});
const PORT = process.env.PORT || 5000;
const MongoURI = process.env.MONGO_URI;
connectMongo(MongoURI);
const app = express();
app.use(cors());
app.use(express.json()); //when send json data
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); //when send data in form
app.use(express.static(path.resolve('public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);
app.get('/', (req, res) => {
    res.render('register');
});
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
