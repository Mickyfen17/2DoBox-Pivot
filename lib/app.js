import {displayTodo} from './display';
import {qualityRange, ifZero, checkForCompletedTodos} from './helpers';
import {NewTodo} from './constructor';

// library object to be passed into local storage
let libraryObj = {};

// grabs input value and assigns to new todo object
export const grabValues = uniqueID => {
  let title = $(".title").val();
  let task = $(".task").val();
  const newTodo = new NewTodo({id: uniqueID, title: title, body: task});
  stringObj(uniqueID, newTodo);
};

// function to stringify new object and save to local storage
const stringObj = (id, todoObj) => {
  libraryObj[id] = todoObj;
  let stringObj = JSON.stringify(libraryObj);
  localStorage.setItem("2Do", stringObj);
  retrieveTodos();
};

// removes all previous todos and then loops through local storage and parses the data
export const retrieveTodos = () => {
  $(".todo-card").remove();
  let completed = 0;
  libraryObj = JSON.parse(localStorage["2Do"]);
  for(let key in libraryObj) {
    let todo = new NewTodo(libraryObj[key]);
    todo.isComplete === "" ? displayTodo(todo) : completed ++;
  }
  checkForCompletedTodos(completed);
};

// displays all todos with the class of completed after click on show all completed
export const showAllCompleted = () => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  for(let key in libraryObj) {
    let todo = new NewTodo(libraryObj[key]);
    if(todo.isComplete !== "") {
      displayTodo(todo);
    }
  }
};

// deletes todo from local storage
export const deleteFromLS = id => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  delete libraryObj[id];
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};

// updates stored quality values after a vote click
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

// updates the todo in local storage as to whether its complete or not
export const markAsComplete = id => {
  let toEditTodo = parseLib(id);
  libraryObj = JSON.parse(localStorage["2Do"]);
  toEditTodo.isComplete === "" ? toEditTodo.isComplete = "completeTodo" : toEditTodo.isComplete = "";
  stringifyLib(toEditTodo, id);
};

// parse lib helper function
const parseLib = id => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  return libraryObj[id];
};

// stringify lib helper function
const stringifyLib = (todo, id) => {
  libraryObj[id] = Object.assign(todo);
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};
