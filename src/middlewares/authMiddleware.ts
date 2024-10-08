import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET || '');
    req['user'] = decoded['user'];
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};
