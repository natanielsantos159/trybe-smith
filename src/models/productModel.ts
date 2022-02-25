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

export default {
  create,
  getAll,
};