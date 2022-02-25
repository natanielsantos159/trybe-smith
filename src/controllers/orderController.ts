import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import orderService from '../services/orderService';

const create = async (req: Request, res: Response) => {
  const { products }: { products: number[] } = req.body;

  const { authorization } = req.headers as { authorization: string };
  const { username } = jwt
    .decode(authorization) as { username: string, password: string, iat: number };

  try {
    const { id: userId } = await userService.getByUsername(username);
  
    const orderInfo = { userId, products };
    await orderService.create(orderInfo);
    return res.status(201).json({ order: { userId, products } });
  } catch (err) {
    return res.status(500).json({ error: 'Ocorreu um erro' });
  }
};

export default {
  create,
};