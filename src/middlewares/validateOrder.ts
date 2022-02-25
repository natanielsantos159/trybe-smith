import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';

const schema = Joi.object({
  products: Joi.array().items(Joi.number()).min(1).label('Products')
    .required()
    .messages({
      'array.min': 'Products can\'t be empty',
      'array.base': 'Products must be an array of numbers',
      'array.items': 'Products must be an array of numbers',
    }),
});

const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const orderInfo = req.body;
  const { error } = schema.validate(orderInfo, { errors: { wrap: { label: false } } });
  if (error instanceof ValidationError) {
    const code = error.message.includes('required') ? 400 : 422;
    return res.status(code).json({ error: error.message });
  }

  next();
};

export default validateOrder;