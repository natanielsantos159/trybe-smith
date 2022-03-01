import express from 'express';
import validateUserInfo from './middlewares/validateUserInfo';
import userController from './controllers/userController';
import productController from './controllers/productController';
import orderController from './controllers/orderController';

import validateLogin from './middlewares/validateLogin';
import validateProductInfo from './middlewares/validateProductInfo';
import validateJWT from './middlewares/validateJWT';
import validateOrder from './middlewares/validateOrder';

const app = express();

app.use(express.json());

app.post('/users', validateUserInfo, userController.create);

app.post('/login', validateLogin, userController.login);

app.use(validateJWT);

app.post('/products', validateProductInfo, productController.create);

app.get('/products', productController.getAll);

app.post('/orders', validateOrder, orderController.create);

app.get('/orders/', orderController.getAll);

app.get('/orders/:id', orderController.getById);

export default app;
