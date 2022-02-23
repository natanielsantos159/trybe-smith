import userModel from '../models/userModel';
import User from '../interfaces/User';

const create = async (userInfo: User): Promise<void> => {
  await userModel.create(userInfo);
};

export default {
  create,
};