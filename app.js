'use strict';

const express         = require('express');
const bodyParser      = require('body-parser');
const mysql           = require('anytv-node-mysql');                
const dataManagement  = require('./routes/dataManagement');
const app             = express();
const MASTER_DB       = require('./config/db_config');
const apidoc          = __dirname + '/doc';
						require('./global_functions');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


try {
	mysql.add('master',MASTER_DB);
}
catch(err){
	console.log(err.message);
}
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
  next();
});

app.use('/v1',dataManagement);
app.use('/apidoc', express.static(apidoc));

app.use('/', (req,res)=>{
  return res.json({
    message : 'Route not found',
    context : 'Route does not exists'
  }).status(404);
});


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});



module.exports = app;