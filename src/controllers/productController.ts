import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Product from '../interfaces/Product';
import productService from '../services/productService';

const create = async (req: Request, res: Response) => {
  const productInfo: Product = req.body;
  
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  const data = jwt.decode(authorization);
  if (!data) return res.status(401).json({ error: 'Invalid token' });

  const createdProduct = await productService.create(productInfo);
  return res.status(201).json({ item: createdProduct });
};

export default {
  create,
};