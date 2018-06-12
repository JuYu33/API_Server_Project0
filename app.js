const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');
const arRoutes = require('./api/routes/anomaly_report')

mongoose.connect(
  process.env.MONGO_CONNECT,  
  {
    auth: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PW
    }
  }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));//logger
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));//true = extended bodies with rich data
app.use(bodyParser.json());

//prevent CORS errors
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_ACCESS);//currently allows all source access. 
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})


app.use('/user', userRoutes);
app.use('/anomaly_report', arRoutes);

//if neither of the routes were able to handle the request. Handle error
app.use((req,res,next) => {
  const error = new Error('Page not found..');
  error.status = 404;
  next(error); //forward the error request
})

//handle all errors that were not caused by lack of routes
app.use((err,req,res,next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})

module.exports = app;