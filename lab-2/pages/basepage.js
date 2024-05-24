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

  async checkTabs() {
    const initialWindowHandle = await this.driver.getWindowHandle();
    const newWindowHandle = await this.driver.wait(async () => {
      const handlesAfterAction = await this.driver.getAllWindowHandles();
      return handlesAfterAction.find(handle => handle !== initialWindowHandle);
    }, 3000);
    if (newWindowHandle) {
      await this.driver.switchTo().window(newWindowHandle);
    }
  }

  async getTitle() {
    return await this.driver.findElement(By.xpath('//h1')).getText();
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

class SchedulePage {
  constructor(driver) {
    this.driver = driver;
  }
  async checkGroups() {
    const groupNumber = '221-323';
    const searchField = await this.driver.findElement(By.className('groups'));
    await searchField.sendKeys(groupNumber);
    const resultElements = await this.driver.findElements(By.className('group'));
    const groupTexts = await Promise.all(resultElements.map(async (element) => {
      return await element.getText();
    }));
    if (groupTexts.length === 1 && groupTexts[0] === groupNumber) {
      await this.driver.findElement(By.id(groupNumber)).click();
    }
    await this.driver.sleep(1000);
  }
  async clickGroup() {
    const groupNumber = '221-323';
    await this.driver.findElement(By.id(groupNumber)).click()
    await this.driver.sleep(1000);
  }
  async checkColor() {
    await this.driver.findElement(By.className('goToToday')).click();
    const parentElements = [await this.driver.findElement(By.className("schedule-day_today"))];
    const data = await Promise.all(parentElements.map(async (element) => {
      const title = await element.findElement(By.className("schedule-day__title")).getText();
      return title;
    }));
    return data;
  }
}


module.exports = BasePage