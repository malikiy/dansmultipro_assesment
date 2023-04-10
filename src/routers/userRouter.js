import express from 'express';
import { 
    getAllUsers,
    login,
    registerUser,
    userDetails
} from '../controllers/userController.js';
import { userAuth } from '../middleware/auth.js';

var router = express.Router();

router
.route('/register')
.post(
    registerUser
);

router
.route('/login')
.post(
    login
);

router
.route('/')
.get(
    userAuth,
    getAllUsers
);

router
.route('/:userId')
.get(
    userAuth,
    userDetails
);

export {
    router
}