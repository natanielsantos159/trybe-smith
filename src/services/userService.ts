import userModel from '../models/userModel';
import User from '../interfaces/User';

const create = async (userInfo: User): Promise<void> => {
  await userModel.create(userInfo);
};

const login = async (userInfo: User): Promise<void> => {
  await userModel.login(userInfo);
};

const getByUsername = async (username: string): Promise<User> => {
  const user = await userModel.getByUsername(username);
  return user;
};

export default {
  create,
  login,
  getByUsername,
};