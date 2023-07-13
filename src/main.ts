import { TodoListItem } from "./class/TodoListItem.js";
import {
  inputEl,
  addBtn,
  clearBtn,
  listContainer,
} from "./domUtils/domUtils.js";

function loadTodoList() {
  const storedTodoList = localStorage.getItem("todoList");

  if (storedTodoList) {
    const todoList = JSON.parse(storedTodoList);

    todoList.forEach((item: string) => {
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
  const todoList = todoListItems.map(
    (item) => item.childNodes[0].textContent?.trim() //not saving button el and its textContent "X"
  );
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

addBtn.addEventListener("click", () => {
  const inputVal = inputEl.value;
  const randomNum = Math.floor(Math.random() * 100);
  const listItem = new TodoListItem(randomNum, inputVal);

  if (listItem.item.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = listItem.item;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    li.appendChild(deleteBtn);
    listContainer.appendChild(li);

    inputEl.value = "";

    saveTodoList();
  }
});

clearBtn.addEventListener("click", () => {
  listContainer.innerHTML = "";
  saveTodoList();
});

listContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.tagName.toLowerCase() === "button") {
    const li = target.parentElement;
    if (li !== null) {
      listContainer.removeChild(li);
      saveTodoList();
    }
  }
});

loadTodoList();