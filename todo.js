const todoArray = [];
let counter = 0;

function Delete(myCounter) {
    const todoGrid = document.querySelector("#inserter");


    todoGrid.innerHTML = "";
    console.log(todoArray.length);
    if (todoArray.length == 1) {
        todoArray.pop();
    }
    else if (todoArray.length == 0) {
        todoArray = [];
    }
    todoArray.splice(myCounter, 1);
    counter -= 1;

    todoArray.forEach(element => {

        element.forEach(ele => {
            console.log(ele);
            todoGrid.appendChild(ele);
        }
        )
    });
}

function deleteImported(myCounter) {
    const todoGrid = document.querySelector("#inserter");
    const fileInput = document.getElementById("fileInput");

    todoGrid.innerHTML = "";
    console.log(data.length);
    if (data["date"].length == 1) {
        data["date"].pop();
        data["todoName"].pop();
        fileInput.value="";

    }
    else if (data["date"].length == 0) {
        data = {};
        fileInput.value="";
    }
    data["date"].splice(myCounter, 1);
    data["todoName"].splice(myCounter, 1);
    counter -= 1;

    renderTodo(data);
}

function validFields(arr) {
    const todoName = document.getElementById("todo-name");
    const todoDate = document.getElementById("todo-date");

    if (todoName.values !== "" && todoDate.value !== "") {
        return true;
    }
    else {
        return false;
    }
}
function add() {


    const ForT = validFields()
    if (ForT) {
        const todoName = document.getElementById("todo-name");
        const todoDate = document.getElementById("todo-date");
        const todoGrid = document.querySelector("#inserter");
        const todoNameCreated = document.createElement("p");
        const todoDateCreated = document.createElement("p");
        const todoDeleteButton = document.createElement("button");
        todoDeleteButton.innerText = "Delete";
        todoDeleteButton.className = "delete-btn d3-active"
        const currentIndex = counter;
        todoDeleteButton.onclick = function () { Delete(currentIndex) };
        counter += 1;
        console.log(todoArray);

        todoNameCreated.innerText = todoName.value;
        todoDateCreated.innerText = todoDate.value;
        todoArray.push([todoNameCreated, todoDateCreated, todoDeleteButton]);
        console.log(todoArray);
        todoGrid.appendChild(todoNameCreated);
        todoGrid.appendChild(todoDateCreated);
        todoGrid.appendChild(todoDeleteButton);
    }
}




function renderTodo(obj) {
    const todoGrid = document.querySelector("#inserter");
    todoGrid.innerHTML = "";
    let counter = 0;
    for (let index = 0; index < obj["date"].length; index++) {

        todoGrid.innerHTML += `<p>${obj["todoName"][index]}</p>`;
        todoGrid.innerHTML += `<p>${obj["date"][index]}</p>`;

        todoGrid.innerHTML += `<button class="delete-btn d3-btn" onclick="deleteImported(${index})">Delete</button>`;
        counter += 1;

    }

}

function exportFunc() {
    const saveObj = {
        "date": [],
        "todoName": []
    };
    const regex = /\b\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/;
    const todos = document.querySelectorAll("#inserter p");
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].innerText.toString().match(regex)) {
            saveObj["date"].push(todos[index].innerText)
        }
        else {
            saveObj["todoName"].push(todos[index].innerText)
        }
    }

    console.log(JSON.stringify(saveObj));


    const blob = new Blob([JSON.stringify(saveObj)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.json";
    a.click();

    URL.revokeObjectURL(url);
}


function importFunc() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
    fileInput.value="";
    fileInput.addEventListener("change", function () {
        const todoGrid = document.querySelector("#inserter");
        todoGrid.innerHTML = "";
        if (this.files.length > 0) {
            showData();
        }
    });
}
let data = null;
function showData() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        data = JSON.parse(e.target.result);
        console.log(data);
        renderTodo(data);
    };

    reader.readAsText(file);
}

