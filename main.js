"use strict";

const data = new Date();
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const todoContainer = document.querySelector(".todo-container");
const date = document.getElementById("date");
const hour = document.getElementById("hour");
let oldInputValue;

//Using Date.now() and toDateString() to display the current date

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();

//Creating time() function to display the current time

function time() {
  const data = new Date();
  let h = data.getHours();
  let m = data.getMinutes();
  let s = data.getSeconds();
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;
  document.getElementById("hour").innerHTML = h + ":" + m + ":" + s;
  setTimeout(time, 1000);
}

//Save to localStorage

const saveToLocalStorage = () => {
  const temp = Array.from(todoList.children).map((child) => ({
    text: child.innerText,
    classList: child.classList,
  }));
  localStorage.setItem(
    "todoList",
    JSON.stringify(temp.filter((data, index) => index > 0))
  );
};

//Add New Todo Functionality

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = todoInput.value;
  if (inputValue) saveTodo(inputValue); //Save Function
});

const saveTodo = (text, classList) => {
  const todo = document.createElement("div");
  if (classList) {
    Object.values(classList).forEach((cssClass) =>
      todo.classList.add(cssClass)
    );
  } else {
    todo.classList.add("todo");
  }
  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(removeBtn);

  todoList.appendChild(todo);
  todoInput.value = "";
  todoInput.focus();
  saveToLocalStorage();
};

//Add Todo Items events for complete, remove and edit

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3"))
    todoTitle = parentEl.querySelector("h3").innerText;

  if (targetEl.classList.contains("finish-todo"))
    parentEl.classList.toggle("done");

  if (targetEl.classList.contains("remove-todo")) parentEl.remove();

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
  saveToLocalStorage();
});

//Toggle function for toggle hide/show

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

//Cancel button event in Edit form

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

//Edit Todo Items updateTodo() to update existing Todo Items

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;
  if (editInputValue) updateTodo(editInputValue); //Update value function

  toggleForms();
});

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) todoTitle.innerText = text;
    saveToLocalStorage();
  });
};

window.onload = () => {
  time();
  const stored = localStorage.getItem("todoList");
  const storedData = stored ? JSON.parse(stored) : null;
  if (storedData) {
    storedData.forEach((data) => {
      saveTodo(data.text, data.classList);
    });
  }
};

// dark-mode functionality

const body = document.querySelector("body");
const btn = document.querySelector(".btn-dark");
const icon = document.querySelector(".btn-dark-icon");

//Saving the dark mode using the object "local storage".
//function that stores the value true if the dark mode is activated or false if it's not.
function store(value) {
  localStorage.setItem("darkmode", value);
}

//function that indicates if the "darkmode" property exists. It loads the page as we had left it.
function load() {
  const darkmode = localStorage.getItem("darkmode");
  //if the dark mode was never activated
  if (!darkmode) {
    store(false);
    icon.classList.add("fa-sun");
  } else if (darkmode == "true") {
    //if the dark mode is activated
    body.classList.add("darkmode");
    todoContainer.classList.add("darkmode");
    date.classList.add("darkmode");
    hour.classList.add("darkmode");
    icon.classList.add("fa-moon");
  } else if (darkmode == "false") {
    //if the dark mode exists but is disabled
    icon.classList.add("fa-sun");
  }
}

load();

btn.addEventListener("click", () => {
  body.classList.toggle("darkmode");
  icon.classList.add("animated");
  todoContainer.classList.toggle("darkmode");
  date.classList.toggle("darkmode");
  hour.classList.toggle("darkmode");
  //save true or false
  store(body.classList.contains("darkmode"));
  if (body.classList.contains("darkmode")) {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
  setTimeout(() => {
    icon.classList.remove("animated");
  }, 500);
});
