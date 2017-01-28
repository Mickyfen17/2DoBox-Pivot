import {editTodos, voteButtons, deleteTodo} from './closures';

let libraryObj = {};

//Function to enable and disable save button
export const enableSaveBtn = () => {
  console.log("test");
  let title = $(".title").val();
  let task = $(".task").val();
  let saveBtn = $(".save");
  return title.length > 0 && task.length > 0 ? saveBtn.attr('disabled', false) : saveBtn.attr('disabled', true);
};

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

//clear input fields
export const clearInputs = () => {
  $(".title").val("");
  $(".task").val("");
};

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
const retrieveTodos = () => {
  $(".todo-card").remove();

  // console.log(localStorage)
  libraryObj = JSON.parse(localStorage["2Do"]);
  // console.log(libraryObj

  for(let key in libraryObj) {
    // console.log(libraryObj[key])
    let todo = new NewTodo(libraryObj[key]);
    displayTodo(todo);
    // console.log(todo)
  }
};

//on load retrieve all items from local storage
$(document).ready(retrieveTodos);

// Create new delete button
const createDeleteBtn = () => $("<button class='delete'></button>");
const createUpBtn = () => $("<button class='upvote'></button>");
const createDownBtn = () => $("<button class='downvote'></button>");

//displays parsed todos to DOM//
const displayTodo = newTodoContent => {
  let { id, title, body, quality } = newTodoContent;
  let deleteBtn = createDeleteBtn();
  let upBtn = createUpBtn();
  let downBtn = createDownBtn();
  let titleNode = $(`<h5 class='edit' contenteditable>${title}</h5>`);
  let bodyNode = $(`<p class='edit' contenteditable>${body}</p>`);
  let todoCard = $(`
    <article id="${id}" class="todo-card">
      <h6>quality:<h5 class="quality">${quality}</h5></h6>
    </article>`);
  $(".entries").prepend(todoCard);
  $(`#${newTodoContent.id}`).prepend(deleteBtn, titleNode, bodyNode, upBtn, downBtn);
  deleteTodo(newTodoContent.id, deleteBtn, todoCard);
  voteButtons(upBtn, downBtn, newTodoContent.id);
  editTodos(titleNode, bodyNode, newTodoContent.id);
};

export const deleteFromLS = id => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  delete libraryObj[id];
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};

//updates stored quality values after a vote click
export const updateStoredQuality = (voteButton, id) => {
  libraryObj = JSON.parse(localStorage.getItem("2Do"));
  console.log(libraryObj[id]);
  let toEditTodo = new NewTodo(libraryObj[id]);

  qualityRange(voteButton, toEditTodo);
  let todoQualText = $(voteButton).siblings(".quality");

  todoQualText.text(toEditTodo.quality);
  libraryObj[id] = Object.assign(toEditTodo);

  // console.log(libraryObj);
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
  // console.log(localStorage);
};

const qualityRange = (button, toDo) => {
  if($(button).hasClass("upvote") && toDo.qualityCount < toDo.qualityArr.length -1) {
    console.log("up", toDo.qualityCount);
    toDo.upVoteQuality();
    console.log("up", toDo.qualityCount);
  } else if($(button).hasClass("downvote") && toDo.qualityCount > 0) {
    console.log("down", toDo.qualityCount);
    toDo.downVoteQuality();
    console.log("down", toDo.qualityCount);
  }
};

export const editTodoInLS = (content, key, id) => {
  libraryObj = JSON.parse(localStorage["2Do"]);
  let toEditTodo = libraryObj[id];
  toEditTodo[key] = content.innerText;
  libraryObj[id] = Object.assign(toEditTodo);
  localStorage.setItem("2Do", JSON.stringify(libraryObj));
};
