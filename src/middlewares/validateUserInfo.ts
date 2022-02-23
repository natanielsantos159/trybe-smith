import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/User';

const schema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.min': '{{#label}} must be longer than 2 characters',
  }),
  classe: Joi.string().min(3).required().messages({
    'string.min': '{{#label}} must be longer than 2 characters',
  }),
  level: Joi.number().min(1).required().messages({
    'number.min': '{{#label}} must be greater than 0',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': '{{#label}} must be longer than 7 characters',
  }),
});

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const getErrorCode = (type: string):number => {
  if (type === 'string.required' || type === 'any.required') {
    return 400;
  }
  return 422;
};

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
    if (err instanceof ValidationError && typeof err.details[0].path[0] === 'string') {
      const { type } = err.details[0];
      const property = err.details[0].path[0];
      const newMessage = err.message.replace(`"${property}"`, capitalize(property));
      res.status(getErrorCode(type)).json({ error: newMessage });
    }
  }
};

export default validateUserInfo;