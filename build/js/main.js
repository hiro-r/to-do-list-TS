"use strict";
const inputEl = document.querySelector("input");
const addBtn = document.querySelector("#add");
const clearBtn = document.querySelector("#clear");
const listContainer = document.querySelector("#list-container");
function loadTodoList() {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
        const todoList = JSON.parse(storedTodoList);
        todoList.forEach((item) => {
            const listEl = document.createElement("li");
            listEl.textContent = item;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            listEl.appendChild(deleteBtn);
            listContainer.appendChild(listEl);
        });
    }
}
function saveTodoList() {
    const todoListItems = Array.from(listContainer.querySelectorAll("li"));
    const todoList = todoListItems.map((item) => { var _a; return (_a = item.childNodes[0].textContent) === null || _a === void 0 ? void 0 : _a.trim(); } //not saving button el and its textContent "X"
    );
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
addBtn.addEventListener("click", () => {
    const inputVal = inputEl.value;
    if (inputVal.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = inputVal;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        listItem.appendChild(deleteBtn);
        listContainer.appendChild(listItem);
        inputEl.value = "";
        saveTodoList();
    }
});
clearBtn.addEventListener("click", () => {
    listContainer.innerHTML = "";
    saveTodoList();
});
listContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === "button") {
        const listItem = target.parentElement;
        if (listItem !== null) {
            listContainer.removeChild(listItem);
            saveTodoList();
        }
    }
});
loadTodoList();
