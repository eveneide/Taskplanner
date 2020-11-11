
const express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  postgres = require('pg');
  Task = require('./api/models/taskplannerModel'), //modellen loades
  bodyParser = require('body-parser');
  
// connecter til postgres database
postgres.Promise = global.Promise;
postgres.connect('postgres://tmplmhrmilqvtk:747f8924461eeb0726f584d31b1c995bf8341aee029d9e6e2910117814156349@ec2-34-251-118-151.eu-west-1.compute.amazonaws.com:5432/d1e36c0kot9sq0'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/taskplannerRoutes'); //importerer route
routes(app); //registrerer routes


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);