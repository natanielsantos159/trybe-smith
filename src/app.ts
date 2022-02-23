import express from 'express';
import validateUserInfo from './middlewares/validateUserInfo';
import userController from './controllers/userController';

const app = express();

app.use(express.json());

app.post('/users', validateUserInfo, userController.create);

export default app;
