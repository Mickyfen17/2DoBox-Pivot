// Search function to toggle display of todo cards
$(".search-input").on("keyup", () => {
  let todos = $(".todo-card");
  let searchText = $(".search-input").val().toLowerCase();
  todos.each((i, todo) => {
    let todoText = $(todo).children(".edit").text().toLowerCase();
    let matched = todoText.includes(searchText);
    $(todo).toggle(matched);
  });
});
