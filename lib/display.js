import {editTodos, voteButtons, deleteTodo, completeTodo} from './closures';

// create new buttons
const createDeleteBtn = () => $("<button aria-label='delete' class='delete'></button>");
const createUpBtn = () => $("<button aria-label='up vote' class='upvote'></button>");
const createDownBtn = () => $("<button aria-label='down vote' class='downvote'></button>");

// create basic to card to be preneded with button nodes
const creatCard = newTodoContent => {
  let { id, quality, isComplete } = newTodoContent;
  return $(`
    <article tabindex='0' aria-label='todo card' id="${id}" class="todo-card ${isComplete}">
    <h6 tabindex='0' >Importance:<h5 tabindex='0' class="quality">${quality}</h5></h6>
    </article>`);
};

// displays parsed todos to DOM//
export const displayTodo = newTodoContent => {
  let { id, title, body} = newTodoContent;
  let deleteBtn = createDeleteBtn();
  let upBtn = createUpBtn();
  let downBtn = createDownBtn();
  let todoCard = creatCard(newTodoContent);
  let titleNode = $(`<h5 aria-label='todo card title' class='todo-title edit' contenteditable>${title}</h5>`);
  let bodyNode = $(`<p aria-label='todo card body' class='todo-body edit' contenteditable>${body}</p>`);
  let completeBtnNode = $("<button class='complete'>Completed</button>");
  $(".entries").prepend(todoCard);
  $(`#${newTodoContent.id}`).prepend(deleteBtn, titleNode, bodyNode, upBtn, downBtn, completeBtnNode);
  deleteTodo(deleteBtn, todoCard, id);
  voteButtons(upBtn, downBtn, id);
  editTodos(titleNode, bodyNode, id);
  completeTodo(completeBtnNode, id);
};
