import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import userService from '../services/userService';
import User from '../interfaces/User';

const create = async (req: Request, res: Response): Promise<Response> => {
  const userInfo = req.body;
  try {
    await userService.create(userInfo);
    const newToken = jwt.sign(userInfo, 'myownsecret');
    return res.status(201).json({ token: newToken });
  } catch (err: Error | unknown) {
    return res.status(500).json({ 
      error: err instanceof Error ? err.message : 'Ocorreu um erro', 
    });
  }
};

const login = async (req: Request, res: Response) => {
  const userInfo: User = req.body;
  
  try {
    await userService.login(userInfo);
    const newToken = jwt.sign(userInfo, 'myownsecret');
    return res.status(200).json({ token: newToken });
  } catch (err: Error | unknown) {
    return res.status(401).json({ 
      error: err instanceof Error ? err.message : 'Ocorreu um erro no servidor', 
    });
  }
};

export default {
  create,
  login,
};
