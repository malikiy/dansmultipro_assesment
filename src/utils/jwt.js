import jwt from 'jsonwebtoken';
import { jwtSecret } from '../configs/constantConfig.js'; 

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
}

export { verifyToken }