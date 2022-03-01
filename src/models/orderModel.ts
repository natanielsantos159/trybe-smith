import { ResultSetHeader, FieldPacket } from 'mysql2';
import Order from '../interfaces/Order';
import connection from './connection';

const create = async (userId: number): Promise<number> => {
  const [result] = await connection
    .execute(
      'INSERT Trybesmith.Orders(userId) VALUES (?)', 
      [userId],
    ) as [ResultSetHeader, FieldPacket[]];
  return result.insertId;
};

const getById = async (id: number) => {
  const [rows] = await connection
    .execute(
      'SELECT * FROM Trybesmith.Orders WHERE id = ?',
      [id],
    ) as [Order[], FieldPacket[]];
  return rows[0];
};

export default {
  create,
  getById,
};