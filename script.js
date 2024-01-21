document.addEventListener("DOMContentLoaded", function () {

    loadTasks();

    document.getElementById("taskInput").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});



function deleteTask(element) {
    
    var taskList = document.getElementById("taskList");
    var taskItem = element.parentNode;
    taskList.removeChild(taskItem);

   
    saveTasks();
}

function saveTasks() {
    
    var taskList = document.getElementById("taskList");
    var tasks = [];

    for (var i = 0; i < taskList.children.length; i++) {
        tasks.push(taskList.children[i].innerText.replace("Delete", "").trim());
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTask() {
    
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    
    if (taskText !== "") {
        
        var taskList = document.getElementById("taskList");
        var newTask = document.createElement("li");
        newTask.innerHTML = taskText + ' <span class="delete" onclick="deleteTask(this)">Delete</span>';
        taskList.appendChild(newTask);

        
        taskInput.value = "";

        
        saveTasks();
    }
}

function loadTasks() {
  
    var taskList = document.getElementById("taskList");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (var i = 0; i < tasks.length; i++) {
        var newTask = document.createElement("li");
        newTask.innerHTML = tasks[i] + ' <span class="delete" onclick="deleteTask(this)">Delete</span>';
        taskList.appendChild(newTask);
    }
}
