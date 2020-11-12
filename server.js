const express = require(`express`);

const bodyParser = require('body-parser')
const server = express();

server.use(bodyParser.urlencoded({extended: true}));

server.use(express.static('public'));

server.get(`/task`, (reg, res) =>{
    res.send(Tasks);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT,() => console.log(`running on ${PORT}`));

