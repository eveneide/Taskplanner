
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const server = express();

const database = require('./modules/datahandler');
const user = require("./modules/user");
const jtoken = require('./modules/jtoken');
const tpc = require('./modules/taskplannercipher');



server.use(bodyParser.json());
server.use(express.static('public'));

const credentials = require('./localenv').DATABASE_URL || process.env.DATABASE_URL;
const keysecret = require('./localenv').HASH_SECRET || process.env.HASH_SECRET;

//const database = new storage(credentials);

// Authenticator middleware//

const authenticator = async (req, res, next) => {
 
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end();
  }

  const credentials = req.headers.authorization.split(' ')[1];
  const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    //Hente user og passord fra databasen
    let fetchPassword;
    if (username) {
        let data = await database.selectUser(username);
        if (!data) {
            console.log('Bruker eksisterer ikke!');
            return;
        } else {
            fetchPassword = data.password;
        }
    }
      //Hvis passord og login er ok
      if (tpc.encrypt(tpc.encrypt(password), fetchPassword)) {
        req.user = username;
        req.login = true;
        next();
      } else {
        req.login = false;
        next();
      }
}

//tilgang
const authorizer = async (req, res, next) => {

  if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
      return res.append("WWW-Authenticate", 'Bearer realm="User Visible Realm", charset="UTF-8"').status(401).end();
  }

  //Verifisere token
  let token = req.headers.authorization.split(' ')[1];
  let valid = jtoken.valToken(token);

  if (valid) {
      //console.log('Authorized');
      req.authorized = true;
      req.token = token;
      next();
  } else {
      //console.log('Unauthorized');
      res.status(401).end();
  }
}





 // innlogging //
server.post('/user/auth', authenticator, async (req, res) => {

  if (req.login) {
      let token = jtoken.makeToken({ username: req.user });
      res.status(200).json(token);

  } else {

      res.status(403).send('Noe gikk galt').end();
  }
});




// Create User //
server.post("/user", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + password)
  
  
    
    
     
      const newUser = new user(username, password);
      const resp = await newUser.create();
  
      if (resp === null) {
        res.status(401).json("Username is taken!").end();
      } else {
        res.status(200).json("Account created!").end();
      }
      // Hva om databasen feilet?
      // Hva om det var en bruker med samme brukernavn?
    
  });

const {
    Router
  } = require('express');



  let task = [];


  //create a task 

  server.get('/task',async (req, res) =>{
      res.send( "task planner");

  });

  
  //add a new task 
  
  server.post("/task", async (req,res) =>{
      const task = new task ({
          title : req.body.title,
         description: req.body.description
      });

      
     
    });



    // get taskS  hente data 

    server.get ("/task", async (req,res) =>{
        try{
            const task = await task.findByid(req.params.taskId);
            res.json(task);

        } catch (err){
            res.json({message:err});
        }

        });
    
  // remove an existing task 

  server.delete ('/task:id', async (req,res) => {
      try {
      task.removedtask = await task.remove({_id:req.params.taskId});
      res.json(removetask);
       
        }catch (err){
         res.json({message:err});
        }

        });



  // update a task 

  server.put ('/task', async (req,res) => {
      try {
          const updatedtask = await task.updateone(
              { _id: req.params.taskId },
              {$set: {title : req.body.title}}
          );
          res.json(updatedtask);
          
        } catch ( err) {
            res.json({message:err});
        }
    
      });



  

    




// start server


server.listen(8080,() => {
  console.log(" server has started on port 8080")
});