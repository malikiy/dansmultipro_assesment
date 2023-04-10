import axios from 'axios';
import { badRequest, Created, InternalServerError, Ok } from "../utils/httpStatus.js"
import { hostDansMultiPro } from '../configs/constantConfig.js';

const getJobs = async(req, res, next) => {
    try {
        var conf = {
            method: 'get',
            url: `${hostDansMultiPro}/api/recruitment/positions.json`,
            headers: { 
              'Content-Type': 'application/json'
          },
          params: {
              page: req.query.page,
              description: req.query.description,
              location: req.query.location,
              full_time: req.query.full_time
            }
          };
          const getAllJobs = await axios(conf)
        return res.jsond(Ok, Ok,"success", "Success get jobs", getAllJobs.data)
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

const getJobDetail = async(req, res, next) => {
    try {
        var conf = {
            method: 'get',
            url: `${hostDansMultiPro}/api/recruitment/positions/${req.params.jobsId}`,
            headers: { 
              'Content-Type': 'application/json'
          }
          };
          const getAllJobs = await axios(conf)
        return res.jsond(Ok, Ok,"success", "Success get job detail", getAllJobs.data)
    } catch (error) {
        console.log(error);
        return res.jsond(InternalServerError, InternalServerError,"error", "Something went wrong");
    }
}

export {
    getJobs,
    getJobDetail
}