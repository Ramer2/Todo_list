// variables
const textField = document.querySelector("#text-input");
const submit = document.querySelector("#submit");
const list = document.querySelector("#list");

// adding event listeners
submit.addEventListener("click", addTask);
list.addEventListener("click", deleteTask);
document.addEventListener("DOMContentLoaded", loadTasks);

// functions
function addTask(e) {
    e.preventDefault();

    const input = textField.value;
    textField.value = "";

    if (input) {
        const newTask = document.createElement("li");
        newTask.appendChild(document.createTextNode(input));

        // delete button creation
        const deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("X"));
        deleteButton.classList.add("delete-button");
        newTask.appendChild(deleteButton);

        list.appendChild(newTask);
        saveTask(newTask);
    }
}

function deleteTask(e) {
    // check if the click occured on the delete button
    if (e.target.classList.contains("delete-button")) {
        e.target.parentNode.remove();
        removeTask(e.target.parentNode);
    }
}

function saveTask(task) {
    let taskList = [];
    try {
        taskList = JSON.parse(localStorage.getItem("taskList"));
        if (taskList == null) {
            taskList = [];
        }
    } catch (e) {
        taskList = [];
    }

    taskList.push(task.firstChild.textContent);

    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function loadTasks(e) {
    let taskList = [];
    try {
        taskList = JSON.parse(localStorage.getItem("taskList"));
        if (taskList == null) {
            taskList = [];
        }
    } catch (e) {
        taskList = [];
    }

    taskList.forEach((task) => {
        const newTask = document.createElement("li");
        newTask.appendChild(document.createTextNode(task));

        // delete button creation
        const deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("X"));
        deleteButton.classList.add("delete-button");
        newTask.appendChild(deleteButton);

        list.appendChild(newTask);
    });
}

function removeTask(task) {
    let taskList = [];
    try {
        taskList = JSON.parse(localStorage.getItem("taskList"));
        if (taskList == null) {
            taskList = [];
        }
    } catch (e) {
        taskList = [];
    }

    const copy = taskList;
    taskList = [];

    copy.forEach((element) => {
        if (element != task.firstChild.textContent) {
            taskList.push(element);
        }
    });

    localStorage.setItem("taskList", JSON.stringify(taskList));
}
