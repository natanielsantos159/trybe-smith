import { ResultSetHeader, FieldPacket } from 'mysql2';
import connection from './connection';
import Product from '../interfaces/Product';

const create = async ({ name, amount }: Product): Promise<Product> => {
  const [result] = await connection.execute(`INSERT INTO Trybesmith.Products(name, amount)
  VALUES (?, ?)`, [name, amount]) as [ResultSetHeader, FieldPacket[]];

  return {
    id: result.insertId,
    name,
    amount,
  };
};

const getAll = async () => {
  const [rows] = await connection
    .execute('SELECT * FROM Trybesmith.Products') as [Product[], FieldPacket[]];
  return rows;
};

const updateProductOrder = async (productId: number, orderId: number) => {
  await connection
    .execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?', 
      [orderId, productId],
    ) as [ResultSetHeader, FieldPacket[]];
};

const getByOrderId = async (orderId: number) => {
  const [rows] = await connection
    .execute(
      'SELECT * FROM Trybesmith.Products WHERE orderId = ?', 
      [orderId],
    ) as [Product[], FieldPacket[]];
  return rows;
}; 

export default {
  create,
  getAll,
  updateProductOrder,
  getByOrderId,
};