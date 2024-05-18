const { Builder, Browser } = require('selenium-webdriver');

class BasePage {

  async goToUrl(url) {
    global.driver = new Builder().forBrowser(Browser.CHROME).build();
    driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get(url);
    await driver.sleep(1000);
  }

  async enterText(locator, textToEnter) {
    await driver.findElement(locator).click();
    await driver.findElement(locator).sendKeys(textToEnter);
    await driver.sleep(1000);
  }

  async click(locator) {
    await driver.findElement(locator).click();
    await driver.sleep(1000);
  }

  async SaveScreenshot(filename) {
    driver.takeScreenshot().then(function (image) {
      require('fs').writeFileSync(fileName, image, 'base64')
    });
  }

  async closeBrowser() {
    await driver.sleep(1000);
    await driver.quit();
  }

  async close() {
    const windows = await driver.getAllWindowHandles();
    await driver.switchTo().window(windows[1]);
  }
}

module.exports = BasePage