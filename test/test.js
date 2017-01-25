const assert    = require("assert");
const webdriver = require("selenium-webdriver");
const test      = require("selenium-webdriver/testing");

describe('testing 2Do Pivot', () => {
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

  test.it('should allow me to input a title', () => {
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

 });
