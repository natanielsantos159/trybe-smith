import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Product from '../interfaces/Product';

const MIN_LENTGH_MESSAGE = '{#label} must be longer than 2 characters';

const schema = Joi.object({
  name: Joi.string().min(3).label('Name').required()
    .messages({
      'string.min': MIN_LENTGH_MESSAGE,
    }),
  amount: Joi.string().min(3).label('Amount').required()
    .messages({
      'string.min': MIN_LENTGH_MESSAGE,
    }),
});

const validateProductInfo = async (req: Request, res: Response, next: NextFunction) => {
  const productInfo: Product = req.body;
  const { error } = schema.validate(productInfo, { errors: { wrap: { label: false } } });
  if (error instanceof ValidationError) {
    const HTTPCode = error.message.includes('required') ? 400 : 422;
    return res.status(HTTPCode).json({ error: error.message });
  }

  next();
};

export default validateProductInfo;