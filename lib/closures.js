import {updateStoredQuality, editTodoInLS, deleteFromLS, markAsComplete} from './app';

// closure function to edit content of title and body
export const editTodos = (title, body, id) => {
  title.on("blur", function() {
    editTodoInLS(this, "title", id);
  });
  body.on("blur", function() {
    editTodoInLS(this, "body", id);
  });
};

// closure to add click event to up & down vote button
export const voteButtons = (upBtn, downBtn, id) => {
  upBtn.on("click", function() {
    updateStoredQuality(this, id);
  });
  downBtn.on("click", function() {
    updateStoredQuality(this, id);
  });
};

// closure to add click event to delete the todo card
export const deleteTodo = (button, todo, id) => {
  button.on("click", function() {
    deleteFromLS(id);
    todo.remove();
  });
};

// closure to toggle completed class to todo card
export const completeTodo = (button, id) => {
  button.on("click", function() {
    markAsComplete(id);
    $(this).closest(`#${id}`).toggleClass("completeTodo");
  });
};
