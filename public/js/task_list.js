const inpTask = document.querySelector('.inpTask');
const addTaskBtn = document.querySelector('.addTaskBtn');
const taskList = document.querySelector('.task-list');
const filterTasks = document.querySelector('.filter-task');

document.addEventListener('DOMContentLoaded', getTasks);
addTaskBtn.addEventListener('click', addTask);
filterTasks.addEventListener('click', filterTask);
taskList.addEventListener('click', deleteCheck);

//Add a new task
function addTask(event) {
    event.preventDefault();
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    //List - append
    const newTask = document.createElement("li");
    newTask.innerText = inpTask.value;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);

    //Legg til i liste lokalt på pc

    saveLocalTasks(inpTask.value);


    //Done-button
    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = "Done";
    doneBtn.classList.add("done-btn");
    taskDiv.appendChild(doneBtn);

    //Delete-button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("del-btn");
    taskDiv.appendChild(deleteBtn);

    //Add div to list
    taskList.appendChild(taskDiv);

    //Remove inp value
    inpTask.value = "";

}

function deleteCheck(evt) {
    const item = evt.target;

    //Remove task
    if (item.classList[0] === "del-btn") {
        const task = item.parentElement;

        removeLocalTasks(task);
        task.addEventListener("click", function () {
            task.remove();
        });
    }

    if (item.classList[0] === "done-btn") {
        const task = item.parentElement;
        task.classList.toggle("done");
    }
}


//Filter tasks - done/due
function filterTask(evt) {
    const tasks = taskList.childNodes;
    tasks.forEach(function (task) {
        switch (evt.target.value) {
            case "all":
                task.style.display = "flex";
                break;
            case "done":
                if (task.classList.contains('done')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = "none";
                }
                break;
            case "due":
                if (!task.classList.contains('done')) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
        }
    });
}

//Save tasks locally
function saveLocalTasks(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        //List - append
        const newTask = document.createElement("li");
        newTask.innerText = task;
        newTask.classList.add("task-item");
        taskDiv.appendChild(newTask);

        //Done-button
        const doneBtn = document.createElement("button");
        doneBtn.innerHTML = 'Done';
        doneBtn.classList.add("done-btn");
        taskDiv.appendChild(doneBtn);

        //Delete-button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("del-btn");
        taskDiv.appendChild(deleteBtn);

        //Add div to list
        taskList.appendChild(taskDiv);
    })
};

//Remove tasks locally
function removeLocalTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


/*
taskForm.addEventListener('submit', async function (evt) {

    evt.preventDefault();

    let fdata = {
        title: inpTitle.value,
        msg: inpTask
    }

    let cfg = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": credentials
        },
        body: JSON.stringify(fdata)

    }

    try {


        let response = await fetch(url, cfg);
        let data = await response.json();

    }
    catch (err) {
        tilbakeMelding.innerHTML = "Noe gikk galt";
    }


});

*/