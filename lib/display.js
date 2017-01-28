import {editTodos, voteButtons, deleteTodo} from './closures';

// Create new buttons
const createDeleteBtn = () => $("<button class='delete'></button>");
const createUpBtn = () => $("<button class='upvote'></button>");
const createDownBtn = () => $("<button class='downvote'></button>");

// create basic to card to be preneded with button nodes
const creatCard = newTodoContent => {
  let { id, quality } = newTodoContent;
  return $(`
    <article id="${id}" class="todo-card">
    <h6>Importance:<h5 class="quality">${quality}</h5></h6>
    </article>`);
};

//displays parsed todos to DOM//
export const displayTodo = newTodoContent => {
  let { id, title, body} = newTodoContent;
  let deleteBtn = createDeleteBtn();
  let upBtn = createUpBtn();
  let downBtn = createDownBtn();
  let todoCard = creatCard(newTodoContent);
  let titleNode = $(`<h5 class='edit' contenteditable>${title}</h5>`);
  let bodyNode = $(`<p class='edit' contenteditable>${body}</p>`);
  let completeBtnNode = $("<button class='complete '>Completed</button>");
  $(".entries").prepend(todoCard);
  $(`#${newTodoContent.id}`).prepend(deleteBtn, titleNode, bodyNode, upBtn, downBtn, completeBtnNode);
  deleteTodo(deleteBtn, todoCard, id);
  voteButtons(upBtn, downBtn, id);
  editTodos(titleNode, bodyNode, id);
  completeTodo(completeBtnNode, id);
};

const completeTodo = (button, id) => {
  button.on("click", function() {
    console.log("clicked", button, id)
  });
};
