import Product from '../interfaces/Product';
import productModel from '../models/productModel';

const create = async (productInfo: Product) => {
  const createdProduct = await productModel.create(productInfo);
  return createdProduct;
};

const getAll = async (): Promise<Product[]> => {
  const allProducts: Product[] = await productModel.getAll();
  return allProducts;
};

export default {
  create,
  getAll,
};