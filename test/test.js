const assert    = require("assert");
const webdriver = require("selenium-webdriver");
const test      = require("selenium-webdriver/testing");
require('locus')


describe("testing 2Do Pivot", function() {
  let driver;

  test.beforeEach(() => {
    // this.timeout(10000);
    driver = new webdriver.Builder()
                          .forBrowser("chrome")
                          .build();
    driver.get("http://localhost:8080");
  });
  test.afterEach(() => {
    // driver.quit();
  });

  test.it("should allow me to input a title", function() {
    const title = driver.findElement({className: "title"});
    title.sendKeys("Testing the title input field")
         .then(() => title.getAttribute("value"))
         .then((value) => {
      assert.equal(value, "Testing the title input field");
    });
  });

  test.it("should allow me to input a task", function() {
    const task = driver.findElement({className: "task"});
    task.sendKeys("Testing the task input field")
        .then(() => task.getAttribute("value"))
        .then((value) => {
      assert.equal(value, "Testing the task input field");
    });
  });

  test.it("Should add a new todo to the DOM", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    const items = driver.findElement({className: "edit"});
    items.getText().then((value) =>
      assert.equal(value, "Testing the title")
    );
  });

  test.it("Should add 5 new todos to the DOM", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    for(let i = 0; i < 5; i++) {
           title.sendKeys("Testing the title")
                .then(() => task.sendKeys("Testing the tasks"))
                .then(() => save.click()
      );
    }
    driver.findElements({className: "todo-card"}).then((value) =>
       assert.equal(value.length, 5)
     );
  });

  test.it("Should add 3 new todos to the DOM and then delete one", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    for(let i = 0; i < 3; i++) {
           title.sendKeys("Testing the title")
                .then(() => task.sendKeys("Testing the tasks"))
                .then(() => save.click());
    }
    const deleteBtn  = driver.findElement({className: "delete"});
    driver.findElements({className: "todo-card"}).then((value) =>
       assert.equal(value.length, 3))
       .then(() => deleteBtn.click()
    );
    driver.findElements({className: "todo-card"}).then((value) =>
       assert.equal(value.length, 2)
    );
  });

  test.it("Should add new todo, click complete and check for completed status", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    driver.findElements({className: "completeTodo"}).then((value) =>
      assert.equal(value.length, 0)
    );
    const completeBtn = driver.findElement({className: "complete"});
    completeBtn.click();
    driver.findElements({className: "completeTodo"}).then((value) =>
      assert.equal(value.length, 1)
    );
  });

  test.it("Should add new todo, click complete twice and that status is not complete", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    driver.findElements({className: "completeTodo"}).then((value) =>
      assert.equal(value.length, 0)
    );
    const completeBtn = driver.findElement({className: "complete"});
    completeBtn.click();
    driver.findElements({className: "completeTodo"}).then((value) =>
      assert.equal(value.length, 1))
      .then(() => completeBtn.click()
    );
    driver.findElements({className: "completeTodo"}).then((value) =>
      assert.equal(value.length, 0)
    );
  });

  test.it("Should add new todo and increase importance", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    const quality = driver.findElement({className: "quality"});
    quality.then((value) => value.getText())
         .then((value) =>
      assert.equal(value, "Normal")
    );
    driver.findElement({className: "upvote"}).then((value) =>
      value.click()
    );
    quality.then((value) => value.getText())
         .then((value) =>
      assert.equal(value, "High")
    );
  });

  test.it("Should add new todo and decrease importance", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    const quality = driver.findElement({className: "quality"});
    quality.then((value) => value.getText())
         .then((value) =>
      assert.equal(value, "Normal")
    );
    driver.findElement({className: "downvote"}).then((value) =>
      value.click()
    );
    quality.then((value) => value.getText())
         .then((value) =>
      assert.equal(value, "Low")
    );
  });

  test.it("Should check importance high limit", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    const upvoteBtn = driver.findElement({className: "upvote"});
    const quality = driver.findElement({className: "quality"});
    quality.then((value) => value.getText())
         .then((value) =>
      assert.equal(value, "Normal")
    );
    for(let i = 0; i < 4; i++) {
      upvoteBtn.click();
    }
    quality.then((value) => value.getText())
         .then((value) =>
      assert.equal(value, "Critical")
    );
  });

  test.it("Should check importance low limit", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    const downvoteBtn = driver.findElement({className: "downvote"});
    const quality = driver.findElement({className: "quality"});
    quality.then((value) => value.getText())
         .then((value) =>
      assert.equal(value, "Normal")
    );
    for(let i = 0; i < 4; i++) {
      downvoteBtn.click();
    }
    quality.then((value) => value.getText())
         .then((value) =>
      assert.equal(value, "None")
    );
  });

  test.it("Should add todo, add content to search and test if todo is displayed or not", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    const search = driver.findElement({className: "search-input"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    const todo = driver.findElement({className: "todo-card"});
    todo.isDisplayed().then((value) =>
      assert.equal(value, true)
    );
    search.sendKeys("z").then(() => todo.isDisplayed())
         .then((value) =>
      assert.equal(value, false)
    );
    search.clear().then(() => search.sendKeys("test"))
         .then(() => todo.isDisplayed())
         .then((value) =>
      assert.equal(value, true)
    );
  });

  test.it("Should add todo and change the title content of the todo card", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    const search = driver.findElement({className: "search-input"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    const todo = driver.findElement({className: "todo-card"});
    const titleText = driver.findElement({className: "todo-title"});
    titleText.getText().then((value) =>
      assert.equal(value, "Testing the title")
    );
    titleText.click().then(() => titleText.clear())
         .then(() => titleText.sendKeys("SELENIUM"))
         .then(() => titleText.getText())
         .then((value) =>
       assert.equal(value, "SELENIUM")
    );
  });

  test.it("Should add todo and change the body content of the todo card", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    const search = driver.findElement({className: "search-input"});
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("Testing the tasks"))
         .then(() => save.click()
    );
    const todo = driver.findElement({className: "todo-card"});
    const bodyText = driver.findElement({className: "todo-body"});
    bodyText.getText().then((value) =>
      assert.equal(value, "Testing the tasks")
    );
    bodyText.click().then(() => bodyText.clear())
         .then(() => bodyText.sendKeys("SELENIUM AGAIN"))
         .then(() => bodyText.getText())
         .then((value) =>
       assert.equal(value, "SELENIUM AGAIN")
    );
  });

  test.it("Should check that the char count decreases after text input", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    const search = driver.findElement({className: "search-input"});
    const charCount = driver.findElement({id: "char-count"});
    charCount.getText().then((value) =>
      assert.equal(value, 120)
    );
    title.sendKeys("Testing the title")
         .then(() => task.sendKeys("1234567890"))
         .then(() => charCount.getText())
         .then((value) =>
      assert.equal(value, 110)
    );
  });

  test.it("Should add 130 chars and check that save button is disabled", function() {
    const title = driver.findElement({className: "title"});
    const task  = driver.findElement({className: "task"});
    const save  = driver.findElement({className: "save"});
    const search = driver.findElement({className: "search-input"});
    const charCount = driver.findElement({id: "char-count"});
    const addingKeys = () => {
      for(let i = 0; i < 13; i++) {
        task.sendKeys("1234567890");
      }
    };
    title.sendKeys("Testing the title")
         .then(() => addingKeys())
         .then(() => save.getAttribute("disabled"))
         .then((value) =>
      assert.equal(value, "true")
    );
  });
});
