import { Request, Response, NextFunction, RequestHandler } from 'express';
import JWT from 'jsonwebtoken';

export const isAuthenticated: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return; // Ensure middleware ends here
  }

  try {
    const decoded = JWT.verify(token, process.env.JWTSecret as string);
    req.user = decoded; // Attach the user to the request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: 'Invalid or expired token' });
    return; // Ensure middleware ends here
  }
};
