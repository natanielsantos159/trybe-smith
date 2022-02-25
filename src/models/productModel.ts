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

export default {
  create,
};