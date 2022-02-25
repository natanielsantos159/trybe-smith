import { Request, Response } from 'express';
import Product from '../interfaces/Product';
import productService from '../services/productService';

const create = async (req: Request, res: Response) => {
  const productInfo: Product = req.body;

  const createdProduct = await productService.create(productInfo);
  return res.status(201).json({ item: createdProduct });
};

const getAll = async (_req: Request, res: Response) => {
  try {
    const allProducts: Product[] = await productService.getAll();
    return res.status(200).json(allProducts);
  } catch (err) {
    return res.status(500).json({ error: 'Ocorreu um erro no servidor' });
  }
};

export default {
  create,
  getAll,
};