import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { port } from './src/configs/constantConfig.js';


//call for routers
import { router as userRoute } from './src/routers/userRouter.js';
import { router as jobsRoute } from './src/routers/jobsRouter.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use ((req, res, next) => {
  res.jsonf = (code, status, message, response)=> {
    res.json({
      code:code,
      status:status,
      message:message,
      response : response
    }).status(code)
  }

  res.jsond = (httpStatus, code, status, message, response)=> {
    res.json({
      code:code,
      status:status,
      message:message,
      response : response
    }).status(httpStatus)
  }
  next()
});

//health check
// app.use('/', healthCheckRoute)
//prefix declaration

app.use(`/api/v1/user/`, userRoute);
app.use(`/api/v1/jobs/`, jobsRoute);

app.listen(port, () => {
    console.log(`service started on port`, port);
})