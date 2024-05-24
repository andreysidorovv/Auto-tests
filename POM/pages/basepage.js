const { Builder, Browser, By } = require('selenium-webdriver');

class BasePage {

  async goToUrl(url) {
    global.driver = new Builder().forBrowser(Browser.CHROME).build();
    driver.manage().setTimeouts({ implicit: 5000 });
    await driver.get(url);
  }

  async enterText(locator, textToEnter) {
    await driver.findElement(locator).sendKeys(textToEnter);
  }

  async click(locator) {
    const element = await driver.findElement(locator);
    
    const isDisplayedBefore = await element.isDisplayed();
    const isEnabledBefore = await element.isEnabled();

    if (isDisplayedBefore && isEnabledBefore) {
      await element.click();
      
      const isDisplayedAfter = await element.isDisplayed();
      const isEnabledAfter = await element.isEnabled();

      console.log(`Element state before click: displayed=${isDisplayedBefore}, enabled=${isEnabledBefore}`);
      console.log(`Element state after click: displayed=${isDisplayedAfter}, enabled=${isEnabledAfter}`);
    } else {
      throw new Error('Element not in clickable state');
    }
  }

  async saveScreenshot(filename) {
    const image = await driver.takeScreenshot();
    require('fs').writeFileSync(filename, image, 'base64');
  }

  async closeBrowser() {
    await driver.sleep(1000);
    await driver.quit();
  }
}

module.exports = BasePage;
