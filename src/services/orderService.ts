import Order from '../interfaces/Order';
import orderModel from '../models/orderModel';
import productModel from '../models/productModel';

const create = async ({ userId, products }: { userId: number, products: number[] }) => {
  const orderId = await orderModel.create(userId);
  await Promise.all(products
    .map((productId) => productModel.updateProductOrder(productId, orderId)));
};

const getById = async (orderId: number) => {
  const order = await orderModel.getById(orderId);
  const products = await productModel.getByOrderId(orderId);
  const productsIds = products.map(({ id }) => id);

  if (!order) throw new Error('Order not found');
  return { id: orderId, userId: order.userId, products: productsIds };
};

const getAll = async () => {
  const orders: Order[] = await orderModel.getAll();

  const result = await Promise.all(
    orders.map(async ({ id, userId }) => {
      const products = await productModel.getByOrderId(id);
      const productsIds = products.map(({ id: productId }) => productId) as number[];
      return { id, userId, products: productsIds };
    }, []),
  );
  return result;
};

export default {
  create,
  getById,
  getAll,
};