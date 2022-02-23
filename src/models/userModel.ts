import User from '../interfaces/User';
import connection from './connection';

const create = async (userInfo: User) => {
  const { username, classe, level, password } = userInfo;
  await connection.execute(`
  INSERT INTO Trybesmith.Users (username, classe, level, password)
    VALUES 
      (?, ?, ?, ?)`, [username, classe, level, password]);
};

export default {
  create,
};