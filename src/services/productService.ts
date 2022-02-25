import Product from '../interfaces/Product';
import productModel from '../models/productModel';

const create = async (productInfo: Product) => {
  const createdProduct = await productModel.create(productInfo);
  return createdProduct;
};

export default {
  create,
};