import { FieldPacket } from 'mysql2';
import User from '../interfaces/User';
import connection from './connection';

const create = async (userInfo: User) => {
  const { username, classe, level, password } = userInfo;
  await connection.execute(`
  INSERT INTO Trybesmith.Users (username, classe, level, password)
    VALUES 
      (?, ?, ?, ?)`, [username, classe, level, password]);
};

const login = async ({ username, password }: User) => {
  const [rows] = await connection.execute(
    `
  SELECT * FROM Trybesmith.Users
  WHERE username = ? AND password = ?`,
    [username, password],
  );
  if (rows instanceof Array && rows.length === 0) throw new Error('Username or password invalid');
};

const getByUsername = async (username: string) => {
  const [rows] = await connection
    .execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ?', 
      [username],
    ) as [User[], FieldPacket[]];

  return rows[0];
};

export default {
  create,
  login,
  getByUsername,
};