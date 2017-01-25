const assert    = require("assert");
const webdriver = require("selenium-webdriver");
const test      = require("selenium-webdriver/testing");

describe("testing 2Do Pivot", function() {
  let driver;

  test.beforeEach(() => {
    this.timeout(10000);
    driver = new webdriver.Builder()
                          .forBrowser("chrome")
                          .build();
    driver.get("http://localhost:8080");
  });
  test.afterEach(() => {
    driver.quit();
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
         .then(() => save.click());

    const items = driver.findElement({className: "edit"});

    items.getText().then((value) =>
      assert.equal(value, "Testing the title")
    );
  });

 });