const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const authenticator = require('./modules/auth');
const database = require('./modules/datahandler');
const { makeToken, valToken, getPayload } = require('./modules/jtoken');
const secret = process.env.keysecret || require('./localenv').keysecret;

const server = express();

server.use(bodyParser.json());
server.use(express.static('public'));

//Login bruker
server.post('/user/auth', authenticator, async function (req, res) {

  if (req.login) {
    let token = makeToken({ username: req.username });

    res.status(200).json(token).end();

  } else {

    res.status(403).end();
  }


});

//Create bruker
server.post('/user', async function (req, res) {

  let username = req.body.username;
  let password = req.body.password;
  password = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');
  let result = await database.placeAccIntoDb(username, password);
  console.log(result);
  if (result) {
    res.status(200).json("success!").end();
  } else {
    res.status(200).json("failed").end();
  }
});


//Add a new task 
server.post("/task", async (req, res) => {
  const task = new task({
    title: req.body.title,
    description: req.body.description
  })

});



//Get tasks  hente data 
server.get("/task", async (req, res) => {
  try {
    const task = await task.findByid(req.params.taskId);
    res.json(task);

  } catch (err) {
    res.json({ message: err });
  }

});

//Remove an existing task 
server.delete("/task", async (req, res) => {
  try {
    task.removedtask = await task.remove({ _id: req.params.taskId });
    res.json(removetask);

  } catch (err) {
    res.json({ message: err });
  }

});



//Update a task 
server.put('/task', async (req, res) => {
  try {
    const updatedtask = await task.updateone(
      { _id: req.params.taskId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedtask);

  } catch (err) {
    res.json({ message: err });
  }

});


//Start server

const PORT = process.env.port || 8080;

server.listen(PORT, () => {
  console.log(` server has started on port ${PORT}`)
});