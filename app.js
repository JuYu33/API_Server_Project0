const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let myData1 = {};
const fetch = require('node-fetch');
// console.log("fetch?");
// fetch('http://api.sportradar.us/nba/trial/v4/en/games/2018/05/07/schedule.json?api_key=qcpkrzg2e8ajwk4ssshrrr6d')
// fetch('https://api.github.com/search/repositories?q=stars:>1+language:all&sort=stars&order=desc&type=Repositories')
// // fetch('https://api.github.com/users/github')
//   .then(response => {
//     return response.json();
//   })
//   .then(valu => {
//     console.log(valu);
//   })
//   .catch(err => {
//     console.error(err);
//   }
// )

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

const mongoConnect1 = 'mongodb://node-rest-test-shard-00-00-coz1f.mongodb.net:27017,node-rest-test-shard-00-01-coz1f.mongodb.net:27017,node-rest-test-shard-00-02-coz1f.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-test-shard-0&authSource=admin';

mongoose.connect(
  mongoConnect1,  
  {
    auth: {
      user: process.env.MONGO_ATLAS_USER,
      password: process.env.MONGO_ATLAS_PW
    }
    //useMongoClient: true //no longer required in mongoose version 5.x
  }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));//logger
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));//true = extended bodies with rich data
app.use(bodyParser.json());

//prevent CORS errors
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');//* allows all access. 
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

app.use('/products', productRoutes); //filter for products route
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

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