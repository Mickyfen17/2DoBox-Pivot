import {grabValues, retrieveTodos} from './app';
import {clearInputs, enableSaveBtn} from './helpers';

//event listener for save button
$(".save").on("click", () => {
  let uniqueID = Date.now();
  grabValues(uniqueID);
  clearInputs();
  enableSaveBtn();
});

//keyup event listener for title and todos inputs
$(".title, .task").on("keyup", enableSaveBtn);

//on load retrieve all items from local storage
$(document).ready(retrieveTodos);
