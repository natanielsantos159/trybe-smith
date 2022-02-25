import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  const data = jwt.decode(authorization);
  if (!data) return res.status(401).json({ error: 'Invalid token' });

  next();
};

export default validateJWT;