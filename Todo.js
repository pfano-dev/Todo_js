const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const check = "fa-circle-check";
const unCheck = "fa-circle";
const lineThrough = "line-through";

let List, id;

let data = localStorage.getItem("TODO");

if (data) {
  List = JSON.parse(data);
  id = List.length;
  loadList(List);
} else {
  List = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
const option = { weekday: "long", month: "short", day: "numeric" };

const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", option);

function addTodo(todo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? check : unCheck;
  const Line = done ? lineThrough : "";
  const item = `   <li class="items">
            <div class="item">
              <i
                class="fa-regular ${DONE} check"
                job="complete"
                id="${id}"
              ></i>
              <p class="text ${Line}">${todo}</p>
            </div>
            <i class="fa-solid fa-trash-can bin" job="delete" id="0"></i>
          </li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addTodo(toDo, id, false, false);
      List.push({
        id: id,
        name: toDo,
        done: false,
        trash: false,
      });
      localStorage.setItem("TODO", JSON.stringify(List));
      id++;
    }
    input.value = "";
    console.log(List);
  }
});

addTodo("pfano", 1, true, true);

function completeToDo(element) {
  element.classList.toggle(check);
  element.classList.toggle(unCheck);

  element.parentNode.querySelector(".text").classList.toggle(lineThrough);

  List[element.id].done = List[element.id].done ? false : true;
}

function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  List[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(List));
});
