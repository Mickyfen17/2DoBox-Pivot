
function NewIdea(title, body) {
  // this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
}

function grabValues() {
  var title = $( ".title" ).val();
  var idea = $( ".idea" ).val();
  console.log(title + " " + idea);
  var newIdea = new NewIdea(title, idea);
  console.log(newIdea);
  stringObj(newIdea);
}


$( ".save" ).on("click",function() {
  grabValues();
});

function stringObj(ideaObj) {
  var stringObj = JSON.stringify(ideaObj);
  localStorage.setItem(idNum, stringObj);
  idNum ++;
}
var idNum = 1;
