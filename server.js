const express = require(`express`);
const app = express ();
app.get(`/`, (reg, res) =>{
    res.send("onyx");
});

app.get(`/name`, (reg, res) =>{
    res.send("my name is oooo");
});

const PORT = process.env.PORT|| 8080;
app.listen(PORT,() => console.log(`running on ${PORT}`));

