const assert    = require("assert");
const webdriver = require("selenium-webdriver");
const test      = require("selenium-webdriver/testing");

describe('testing 2Do Pivot', function() {
  let driver;

  // test.beforeEach(() => {
  //   this.timeout(10000);
  //   driver = new webdriver.Builder()
  //                         .forBrowser("chorme")
  //                         .build();
  //   driver.get("http://localhost:8080");
  // });
  // test.afterEach(() => {
  //   driver.quit();
  // });

  test.it("should allow me to input a title", function() {
    this.timeout(10000);
    const driver = new webdriver.Builder()
                                        .forBrowser("chrome")
                                        .build();
    driver.get("http://localhost:8080");

    const title = driver.findElement({className: "title"});
    title.sendKeys("Testing the title input field").then(() => title.getAttribute("value")).then((value) => {
      assert.equal(value, "Testing the title input field");
    });
    driver.quit();
  });

  test.it("should allow me to input a task", function() {
    this.timeout(10000);
    const driver = new webdriver.Builder()
                                        .forBrowser("chrome")
                                        .build();
    driver.get("http://localhost:8080");

    const task = driver.findElement({className: "task"});
    task.sendKeys("Testing the task input field").then(() => task.getAttribute("value")).then((value) => {
      assert.equal(value, "Testing the task input field");
    });
    driver.quit();
  });

 });
