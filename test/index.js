describe('testing ideabox', function() {
  let driver
  test.beforeEach(()=> {
  this.timeout(10000)
  driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build()
  driver.get('http://localhost:8080')
  });

  test.afterEach(()=>{
    driver.quit()
  });
})
