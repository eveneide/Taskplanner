const express = require(`express`);

const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

class Task{
    constructor(id, title, subject, task_text){
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.task_text = task_text;
    }
}

Tasks = []
// Task data

Tasks.push(new Task(1, ' lese til eksamen', 'eksamen', 'les fra kap 12 til kap 25 .'))
Tasks.push(new Task(2, 'se på tv ', 'Gjøremål fotball kamp', 'start mot brann i kveld !!.'))
Tasks.push(new Task(3, 'klasse tur', 'Paris', 'vi skal ut og spise .'))

// Rounters for tasks - will return all tasks
app.get(`/task`, (reg, res) =>{
    res.send(Tasks);
});

// Will return one task
app.get(`/task/:id`, (reg, res) =>{
    // Id som kommer fra url
    const id = reg.params.id;
    if(id > Tasks.length){
        return res.send('Bad request', 400);
    }
    // Vi ser om vi har en task med id som kommer fra url
    for(let i = 0; i < Tasks.length; i++){
        if(Tasks[i].id == id){
            return  res.send(Tasks[i]);
        }
    }

});

// Route to create new task
app.post(`/task`, (req, res) => {
    console.log(req);
    console.log(req.body)
    Tasks.push(req.body)
    return res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => console.log(`running on ${PORT}`));

