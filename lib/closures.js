import {updateStoredQuality, editTodoInLS, deleteFromLS} from './app';

// Closure function to edit content of title and body
export const editTodos = (title, body, id) => {
  title.on("blur", function() {
    editTodoInLS(this, "title", id);
  });
  body.on("blur", function() {
    editTodoInLS(this, "body", id);
  });
};

//Closure to add click event to up & down vote button
export const voteButtons = (upBtn, downBtn, id) => {
  upBtn.on("click", function() {
    updateStoredQuality(this, id);
  });
  downBtn.on("click", function() {
    updateStoredQuality(this, id);
  });
};

//Closure to add click event to delete the todo card
export const deleteTodo = (id, button, todo) => {
  button.on("click", function() {
    deleteFromLS(id);
    todo.remove();
  });
};
