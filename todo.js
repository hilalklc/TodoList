//Tüm elementleri seçtik
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const fistCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
//Event listenerları atamak
function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}

function clearAllTodos(e) { //arayüzden todo temizleme
    if (confirm("Tümünü silmek istediğinizden emin misiniz")) {
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

}

function filterTodos(e) { //filter ile todolarda arama yaparız
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) { //filtrelemek istediğimiz kısmı gireriz
            //bulunamama
            listItem.setAttribute("style", "display:none!important"); //bulunmazsa blok görünmez
        } else {
            listItem.setAttribute("style", "display:block"); // bulursak görünür
        }
    })
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {

        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi..");
    }

}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1); // o indexten itibaren 1 tane değer siler yani onu
        }

    })
    localStorage.setItem("todos", JSON.stringify(todos)); // silme işleminden sonra localstorage güncellemiş oluruz
}



function loadAllTodosToUI() { //todoları ekrana çıkarttık
    let todos = getTodosFromStorage();
    todos.forEach(function(todo) { //her bir elemanı çıkartırız ekrarna
        addTodoToUI(todo);
    })
}

function addTodo(e) {
    const newTodo = todoInput.value.trim(); // trim ile inputtaki başta ve sondaki boşluklar silinir.
    if (newTodo === "") {
        showAlert("danger", "Lütfen bir todo girin..");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi")
    }

    e.preventDefault();
}

function getTodosFromStorage() { //storageden fonksiyonları alma
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //araya çevirdik
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos)); //arrayımızı string haline çevirdik

}




function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = 'alert alert-${type}';
    alert.textContent = message;

    fistCardBody.appendChild(alert);

    setTimeout(function() {
        alert.remove();
    }, 2000);

}


function addTodoToUI(newTodo) { // stringi list item olarak arayüze ekleyecek
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);

    todoInput.value = ""; //todo eklendikten sonra inputu temizler

}