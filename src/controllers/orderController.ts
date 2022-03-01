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

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productInfo = await orderService.getById(Number(id));
    return res.status(200).json(productInfo);
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      return res.status(404).json({ error: err.message });
    }
  }
};

export default {
  create,
  getById, 
};