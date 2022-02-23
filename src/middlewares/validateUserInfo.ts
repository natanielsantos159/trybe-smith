import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/User';

const schema = Joi.object({
  username: Joi.string().label('Username').min(3).required()
    .messages({
      'string.min': '{{#label}} must be longer than 2 characters',
    }),
  classe: Joi.string().min(3).label('Classe').required()
    .messages({
      'string.min': '{{#label}} must be longer than 2 characters',
    }),
  level: Joi.number().min(1).label('Level').required()
    .messages({
      'number.min': '{{#label}} must be greater than 0',
    }),
  password: Joi.string().min(8).label('Password').required()
    .messages({
      'string.min': '{{#label}} must be longer than 7 characters',
    }),
});

const getErrorCode = (type: string):number => (type.includes('required') ? 400 : 422);

const validateUserInfo = async (
  req: Request,
  res: Response, 
  next: NextFunction,
): Promise<Response | void> => {
  const userInfo: User = req.body;
  
  try {
    await schema.validateAsync(userInfo, { convert: false });
    next();
  } catch (err: ValidationError | unknown) {
    if (err instanceof ValidationError) {
      const { type } = err.details[0];
      res.status(getErrorCode(type)).json({ error: err.message.replace(/"/g, '') });
    }
  }
};

export default validateUserInfo;