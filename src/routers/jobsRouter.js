import express from 'express';
import { getJobDetail, getJobs } from '../controllers/jobController.js';
import { userAuth } from '../middleware/auth.js';

var router = express.Router();

router
.route('/')
.get(
    userAuth,
    getJobs
);

router
.route('/:jobsId')
.get(
    userAuth,
    getJobDetail
);


export {
    router
}