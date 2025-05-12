import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      req.user = decoded;
     
      
      next();
    } catch (err) {
      console.error(err);
      return res.status(403).json({ message: "Token is not valid" ,error:err});
    }
  } else {
    return res.status(401).json({ message: "Authentication required" });
  }
};

export default verifyToken;
