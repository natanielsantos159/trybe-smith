import express from 'express';
import validateUserInfo from './middlewares/validateUserInfo';

const app = express();

app.use(express.json());

app.post('/users', validateUserInfo);
export default app;
