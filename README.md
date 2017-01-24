# 2DoBox-Pivot

To do list:

Phase 1

Adding a new ToDo

On the application’s main page, a user should:

~~See two text boxes for entering the “Title” and “Task” for a new TODO, and a “Save” button for committing that TODO.~~ 

When a user clicks “Save”:

~~A new TODO with the provided title and body should appear in the TODO list.~~
~~The text fields should be cleared and ready to accept a new TODO.
The page should not reload.
The TODO should be persisted. It should still be present upon reloading the page~~

Deleting an existing TODO

When viewing the TODO list:

Each TODO in the list should have a link or button to “Delete” (or 𝗫).
Upon clicking “Delete”, the appropriate TODO should be removed from the list.
The page should not reload when an idea is deleted.
The TODO should be removed from localStorage. It should not re-appear on next page load.
Editing an existing TODO

When a user clicks the title or task of a TODO in the list, that text should:

Become an editable text field, pre-populated with the existing TODO title or task.
The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
If the user reloads the page, their edits will be reflected.
Searching

We’d like our users to be able to easily find specific TODOs they already created, so let’s provide them with a filtering interface on the TODO list.

At the top of the TODO list, include a text field labeled “Search”.
As a user types in the search box, the list of TODOs should filter in real time to only display TODOs whose title or task include the user’s text.
The page should not reload.
Clearing the search box should restore all the ideas to the list.
Es6 Usage

You should make sure that Webpack is set up to use es6 (hint: the key words here are babel, es6 and webpack)

Picking at least one new feature of es6 - review the intermission assignment for ideas - refactor your existing code and use this es6 feature instead

Note: You should always try to not ‘mix and match’ in your code, so if you decide to use let and const instead or var in your code - you should not have any files with both var and let.
Phase 2

Marking a TODO as completed

When viewing the TODO list:

Each TODO in the list should have a button called Completed Task
When a the user clicks the Completed Task button the idea should be either grayed out and/or shown with a strike through text
On reloading the page the page the completed TODOs should be exempted from the list.
When the user clicks the show completed TODOs The completed TODOs should be loaded back onto the top of the TODO list.
Accessibility

Your web application should pass aXe-core tests and should be tab index accessible. For tab indexing refer to this resource

Importance

Each TODO should be given a level of importance.

As a user I should be able to change the level of importance by up-voting or down-voting that specific TODO.
Each TODO should start with a level of Normal.
Levels of Importance are as follows

1) Critical

2) High

3) Normal

4) Low

5) None

The change of importance should persist after a page refresh
Phase 3

Recent TODOs

The application should only show the ten most recent TODOS.

The application should contain a button labeled “Show more TODOs …”
When a user clicks on the Show more TODOs... button this list should load additional messages from the past.
Filter by Importance

The application should allow users to filter the TODO list based off of importance.

Your application should have 5 buttons corresponding to each level of importance (Critical, High, Normal, Low, and None).

When one of the filter buttons is clicked the TODO list should only display TODOs with the selected importance.

Character Counter

The application is able to count the number of characters inside of the input field in real time.

As the user types the character count should increment up.
If the user delets characters the character count should decrease.
Submit button disabled

The submit button should be disabled when there is not valid content in both input fields and if the input field character count exceeds 120 characters.
