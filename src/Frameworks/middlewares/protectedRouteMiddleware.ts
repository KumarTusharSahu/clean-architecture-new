import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Define the type for your JWT payload
interface UserPayload extends JwtPayload {
  username: string;
  userId: string;
}

// Middleware function to extract username from JWT
const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Assuming 'Bearer <token>'

  if (token) {
    const secretKey = `${process.env.JWT_SECRET}`;  // Ensure this is the same key used to sign the token

    // Verify and decode the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }

      // 'decoded' contains the token payload
      // You should cast it to the UserPayload type
      (req as any).user = decoded as UserPayload;
      next(); // Proceed to the next middleware/route handler
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

export default protectRoute;
