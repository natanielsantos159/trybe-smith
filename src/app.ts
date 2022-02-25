import express from 'express';
import validateUserInfo from './middlewares/validateUserInfo';
import userController from './controllers/userController';
import productController from './controllers/productController';

import validateLogin from './middlewares/validateLogin';
import validateProductInfo from './middlewares/validateProductInfo';

const app = express();

app.use(express.json());

app.post('/users', validateUserInfo, userController.create);

app.post('/login', validateLogin, userController.login);

app.post('/products', validateProductInfo, productController.create);

export default app;
