import {grabValues, retrieveTodos, showAllCompleted} from './app';
import {clearInputs, enableSaveBtn, charCounter} from './helpers';

// event listener for save button
$(".save").on("click", () => {
  let uniqueID = Date.now();
  grabValues(uniqueID);
  clearInputs();
  charCounter();
});

// keyup event listener for title input
$(".title").on("keyup", enableSaveBtn);

// keyup event listener for todo inputs
$(".task").on("keyup", charCounter);

// on load retrieve all items from local storage
$(document).ready(retrieveTodos);

// event listener for show button
$(".show").on("click", function() {
  showAllCompleted();
  $(this).attr('disabled', true);
});
