//updates stored quality values after a vote click
export const updateStoredQuality = (voteButton, newQuality) => {
  let id = $(voteButton).parent().attr("id");
  let itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit.quality = newQuality.text();
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
};

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
function NewTodo(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
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
  let newTodo = new NewTodo(uniqueID, title, task);
  stringObj(uniqueID, newTodo);
};

//function to stringify new object and save to local storage
const stringObj = (id, todoObj) => {
  let stringObj = JSON.stringify(todoObj);
  localStorage.setItem(id, stringObj);
  retrieveTodos();
}

//removes all previous todos and then loops through local storage and parses the data
const retrieveTodos = () => {
  $(".todo-card").remove();
  for(let key in localStorage) {
    let parsed = JSON.parse(localStorage[key]);
    displayTodo(parsed);
  }
}

//on load retrieve all items from local storage
$(document).ready(retrieveTodos);

//displays parsed todos to DOM//
const displayTodo = newTodoContent => {
  $(".entries").prepend(`
    <article id="${newTodoContent.id}" class="todo-card">
      <h5 class="edit" contenteditable>${newTodoContent.title}</h5>
      <p class="edit" contenteditable>${newTodoContent.body}</p>
      <button class="delete"></button>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <h6>quality:<h5 class="quality">${newTodoContent.quality}</h5></h6>
    </article>`
  );
}
