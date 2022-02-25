import orderModel from '../models/orderModel';
import productModel from '../models/productModel';

const create = async ({ userId, products }: { userId: number, products: number[] }) => {
  const orderId = await orderModel.create(userId);
  await Promise.all(products
    .map((productId) => productModel.updateProductOrder(productId, orderId)));
};

export default {
  create,
};