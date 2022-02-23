import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().label('Username').required(),
  password: Joi.string().label('Password').required(),
}); 

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const userInfo = req.body;

  try {
    await loginSchema.validateAsync(userInfo);
    next();
  } catch (err: ValidationError | unknown) {
    if (err instanceof ValidationError) {
      return res.status(400).json({
        error: err.message.replace(/"/g, '') });
    }
  }
};

export default validateLogin;