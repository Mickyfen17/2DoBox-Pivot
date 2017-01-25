//on load retrieve all items from local storage
$(document).ready(retrieveTodos);

//updates stored quality values after a vote click
export const updateStoredQuality = function(voteButton, newQuality) {
  var id = $(voteButton).parent().attr("id");
  var itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit.quality = newQuality.text();
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
};

//function to edit content of title and body
export const editTodos = function(item, content) {
  var id = $(item).parent().attr("id");
  var updatedTodo = item.innerText;
  var itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit[content] = updatedTodo;
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
};

//Function to enable and disable save button
export const enableSaveBtn = function() {
  var title = $(".title").val();
  var task = $(".task").val();
  var saveBtn = $(".save");
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
export const clearInputs = function() {
  $(".title").val("");
  $(".task").val("");
};

//grabs input value and assigns to new todo object
export const grabValues = function(uniqueID) {
  var title = $(".title").val();
  var task = $(".task").val();
  var newTodo = new NewTodo(uniqueID, title, task);
  stringObj(uniqueID, newTodo);
};

//function to stringify new object and save to local storage
function stringObj(id, todoObj) {
  var stringObj = JSON.stringify(todoObj);
  localStorage.setItem(id, stringObj);
  retrieveTodos();
}

//removes all previous todos and then loops through local storage and parses the data
function retrieveTodos() {
  $(".todo-card").remove();
  for(var key in localStorage) {
    var parsed = JSON.parse(localStorage[key]);
    displayTodo(parsed);
  }
}

//displays parsed todos to DOM//
function displayTodo(newTodoContent) {
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
