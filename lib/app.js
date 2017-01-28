import {displayTodo} from './display';
import {qualityRange, ifZero} from './helpers';
import {NewTodo} from './constructor';

let libraryObj = {};

//grabs input value and assigns to new todo object
export const grabValues = uniqueID => {
  let title = $(".title").val();
  let task = $(".task").val();
  const newTodo = new NewTodo({id: uniqueID, title: title, body: task});
  stringObj(uniqueID, newTodo);
};

//function to stringify new object and save to local storage
const stringObj = (id, todoObj) => {
  libraryObj[id] = todoObj;
  let stringObj = JSON.stringify(libraryObj);
  localStorage.setItem("2Do", stringObj);
  retrieveTodos();
};

//removes all previous todos and then loops through local storage and parses the data
export const retrieveTodos = () => {
  $(".todo-card").remove();
  libraryObj = JSON.parse(localStorage["2Do"]);
  for(let key in libraryObj) {
    let todo = new NewTodo(libraryObj[key]);
    displayTodo(todo);
  }
};

// deletes todo from local storage
export const deleteFromLS = id => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  delete libraryObj[id];
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};

//updates stored quality values after a vote click
export const updateStoredQuality = (voteButton, id) => {
  libraryObj = JSON.parse(localStorage.getItem("2Do"));
  let toEditTodo = new NewTodo(libraryObj[id]);
  qualityRange(voteButton, toEditTodo);
  let { quality, qualityCount } = toEditTodo;
  $(voteButton).siblings(".quality").text(quality);
  toEditTodo.qualityCount = ifZero(qualityCount);
  stringifyLib(toEditTodo, id);
};

// updates edited todo in local storage
export const editTodoInLS = (content, key, id) => {
  let toEditTodo = parseLib(id);
  toEditTodo[key] = content.innerText;
  stringifyLib(toEditTodo, id);
};

export const markAsComplete = id => {
  let toEditTodo = parseLib(id);
  libraryObj = JSON.parse(localStorage["2Do"]);
  toEditTodo.isComplete === "" ? toEditTodo.isComplete = "completeTodo" : toEditTodo.isComplete = "";
  stringifyLib(toEditTodo, id);
};

const parseLib = id => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  return libraryObj[id];
};

const stringifyLib = (todo, id) => {
  libraryObj[id] = Object.assign(todo);
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};
