import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {  users } from "../utils/prismaSchema.js";
import { badRequest, Created, InternalServerError, Ok } from "../utils/httpStatus.js"
import { jwtSecret, jwtExpiryTime } from '../configs/constantConfig.js';

const checkEmail = async(params) => {
   const checkDuplicate = await users.findUnique({
    where: {
        email: params
    }
   })
   return checkDuplicate;
}

const registerUser = async(req, res, next) => {
    try {
        const checkDuplicate = await checkEmail(req.body.email);
        if(checkDuplicate){
            return res.jsond(badRequest, badRequest,"failed", "Email already exist")
        }
        req.body.id = uuidv4();
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        req.body.created_at = new Date();
        await users.create({
            data: req.body
        })
        return res.jsond(Created, Created,"success", "Success create users")
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

const login = async(req, res, next) => {
    try {
        const checkEmailRegistered = await checkEmail(req.body.email);
        if(!checkEmailRegistered){
            return res.jsond(badRequest, badRequest,"failed", "Email not registered")
        }
        let match = await bcrypt.compare(req.body.password, checkEmailRegistered.password);
        if(match){
            let userData = {
                id: checkEmailRegistered.id,
                email: checkEmailRegistered.email,
            }
            const signToken = jwt.sign(userData, jwtSecret, { expiresIn: jwtExpiryTime });
            userData.token = signToken;
            return res.jsond(Created, Created,"success", "Success create users",  userData)
        }
        return res.jsond(badRequest, badRequest,"failed", "Wrong password")
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

const getAllUsers = async(req, res, next) => {
    try {
        const getUsers = await users.findMany({
            select: {
                id: true,
                email: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true
            }
        })
        return res.jsond(Ok, Ok,"success", "Success get users",  getUsers)
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

const userDetails = async(req, res, next) => {
    try {
        const getUserDetail = await users.findUnique({
            where: {
                id: req.params.userId
            }
        })
        if(!getUserDetail){
            return res.jsond(badRequest, badRequest,"failed", "No data found with that id")
        }
        return res.jsond(Ok, Ok,"success", "Success get users",  getUserDetail)
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

export {
    registerUser,
    login,
    getAllUsers,
    userDetails
}