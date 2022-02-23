import express from 'express';
import validateUserInfo from './middlewares/validateUserInfo';
import userController from './controllers/userController';

import validateLogin from './middlewares/validateLogin';

const app = express();

app.use(express.json());

app.post('/users', validateUserInfo, userController.create);

app.post('/login', validateLogin, userController.login);

export default app;
