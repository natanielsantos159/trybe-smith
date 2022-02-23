import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import userService from '../services/userService';

const create = async (req: Request, res: Response): Promise<Response> => {
  const userInfo = req.body;
  try {
    await userService.create(userInfo);
    const newToken = process.env.JWT_SECRET && jwt.sign(userInfo, process.env.JWT_SECRET);
    return res.status(201).json({ token: newToken });
  } catch (err: Error | unknown) {
    return res.status(500).json({ 
      error: err instanceof Error ? err.message : 'Ocorreu um erro', 
    });
  }
};

export default {
  create,
};