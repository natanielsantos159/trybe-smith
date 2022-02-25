import { ResultSetHeader, FieldPacket } from 'mysql2';
import connection from './connection';

const create = async (userId: number): Promise<number> => {
  const [result] = await connection
    .execute(
      'INSERT Trybesmith.Orders(userId) VALUES (?)', 
      [userId],
    ) as [ResultSetHeader, FieldPacket[]];
  return result.insertId;
};

export default {
  create,
};