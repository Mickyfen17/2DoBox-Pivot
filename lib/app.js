import {displayTodo} from './display';
import {qualityRange, ifZero} from './helpers';

let libraryObj = {};

//constructor function
class NewTodo {
  constructor(options) {
    // debugger
    this.id = options.id;
    this.title = options.title;
    this.body = options.body;
    this.qualityArr= ["None", "Low", "Normal", "High", "Critical"];
    this.qualityCount = options.qualityCount || 2;
    this.quality = options.quality || this.qualityArr[this.qualityCount];
    this.isComplete = options.isComplete || "";
  }
  upVoteQuality() {
    this.qualityCount++;
    this.quality = this.qualityArr[this.qualityCount];
  }
  downVoteQuality() {
    this.qualityCount--;
    this.quality = this.qualityArr[this.qualityCount];
  }
}

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
  libraryObj[id] = Object.assign(toEditTodo);
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};

// updates edited todo in local storage
export const editTodoInLS = (content, key, id) => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  let toEditTodo = libraryObj[id];
  toEditTodo[key] = content.innerText;
  libraryObj[id] = Object.assign(toEditTodo);
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};

export const markAsComplete = id => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  let toEditTodo = libraryObj[id];
  toEditTodo.isComplete === "" ? toEditTodo.isComplete = "completeTodo" : toEditTodo.isComplete = "";
  libraryObj[id] = Object.assign(toEditTodo);
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};
