// //updates stored quality values after a vote click
// export const updateStoredQuality = (voteButton, newQuality) => {
//   let id = $(voteButton).parent().attr("id");
//   let itemsToEdit = JSON.parse(localStorage.getItem(id));
//   itemsToEdit.quality = newQuality.text();
//   localStorage.setItem(id, JSON.stringify(itemsToEdit));
// };

//function to edit content of title and body
export const editTodos = (item, content) => {
  let id = $(item).parent().attr("id");
  let updatedTodo = item.innerText;
  let itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit[content] = updatedTodo;
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
};

//Function to enable and disable save button
export const enableSaveBtn = () => {
  let title = $(".title").val();
  let task = $(".task").val();
  let saveBtn = $(".save");
  return title.length > 0 && task.length > 0 ? saveBtn.attr('disabled', false) : saveBtn.attr('disabled', true);
};

//constructor function
class NewTodo {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.qualityArr= ["None", "Low", "Normal", "High", "Critical"];
    this.qualityCount = 2;
    this.quality = this.qualityArr[this.qualityCount];
  }
  upVoteQuality() {
    console.log("upvote");
    this.qualityCount++;
  }
  downVoteQuality() {
    console.log("downvote");
    this.qualityCount--;
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
  const newTodo = new NewTodo(uniqueID, title, task);
  console.log(newTodo);
  stringObj(uniqueID, newTodo);
};

let libraryObj = {};
//function to stringify new object and save to local storage
const stringObj = (id, todoObj) => {
  // let todoId = id;
  libraryObj[id] = todoObj;
  let stringObj = JSON.stringify(libraryObj);
  localStorage.setItem("2Do", stringObj);
  retrieveTodos();
};

//removes all previous todos and then loops through local storage and parses the data
const retrieveTodos = () => {
  $(".todo-card").remove();
  let parsedLib = JSON.parse(localStorage["2Do"]);
  for(let key in parsedLib) {
    let todo = parsedLib[key];
    displayTodo(todo);
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
  // <button class="upvote"></button>
  // <button class="downvote"></button>
  let deleteBtn = createDeleteBtn();
  let upBtn = createUpBtn();
  let downBtn = createDownBtn();
  let todoCard = $(`
    <article id="${newTodoContent.id}" class="todo-card">
      <h5 class="edit" contenteditable>${newTodoContent.title}</h5>
      <p class="edit" contenteditable>${newTodoContent.body}</p>
      <h6>quality:<h5 class="quality">${newTodoContent.quality}</h5></h6>
    </article>`);
  $(".entries").prepend(todoCard);
  $(`#${newTodoContent.id}`).prepend(deleteBtn, upBtn, downBtn);
  deleteTodo(newTodoContent.id, deleteBtn, todoCard);
  voteButtons(upBtn, downBtn, newTodoContent.id);
};

//Closure to add click event to delete the todo card
const deleteTodo = (id, button, todo) => {
  button.on("click", function(ev) {
    ev.stopPropagation();
    debugger
    // JSON.parse(localStorage.getItem["2Do"].removeItem[id]);
    // todoCards.removeItem(id);
    deleteHelper(id);
    todo.remove();
    // this.remove();
  });
};
function deleteHelper(id) {
  debugger
  let todoCards = JSON.parse(localStorage["2Do"]);
  delete todoCards[id];
  localStorage.setItem("2Do", JSON.stringify(todoCards));
}

const voteButtons = (upBtn, downBtn, id) => {
  // console.log(upBtn, downBtn, id);
  upBtn.on("click", function() {
    console.log("up")
    updateStoredQuality(this, id)
  });
  downBtn.on("click", function() {
    console.log("down")
  });
};

//updates stored quality values after a vote click
export const updateStoredQuality = (voteButton, id) => {
  let itemToEdit = JSON.parse(localStorage.getItem(id));
  console.log(itemToEdit)
  console.log(itemToEdit.qualityCount)
  // itemToEdit.upVoteQuality()
  // console.log(itemToEdit.qualityCount)
  // itemsToEdit.quality = newQuality.text();
  // localStorage.setItem(id, JSON.stringify(itemsToEdit));
};
