//Search function to toggle display of idea cards
// $(".search-input").on("keyup", function() {
//   var ideas = $(".idea-card");
//   var searchText = $(this).val().toLowerCase();
//   ideas.each(function(i, idea) {
//     var ideaText = $(idea).text().toLowerCase();
//     var matched = ideaText.indexOf(searchText) !== -1;
//     $(idea).toggle(matched);
//   });
// });

//Search function to toggle display of idea cards
$(".search-input").on("keyup", () => {
  let ideas = $(".idea-card");
  let searchText = $(".search-input").val().toLowerCase();
  ideas.each((i, idea) => {
    let ideaText = $(idea).text().toLowerCase();
    let matched = ideaText.includes(searchText);
    $(idea).toggle(matched);
  });
});