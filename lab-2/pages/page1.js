const { By } = require('selenium-webdriver');
var BasePage = require('../pages/basepage');

class Page1 extends BasePage {

  item(i) {
    return By.xpath(`//input[@name='li${i}']/following-sibling::span`);
  }

  itemCheckBox(i) {
    return By.name("li" + i);
  }

  get inputField() {
    return By.id("sampletodotext");
  }

  get addButton() {
    return By.id("addbutton");
  }

  async open() {
    await this.goToUrl('https://lambdatest.github.io/sample-todo-app/');
  }

  async addNewItem(itemName) {
    await this.enterText(this.inputField, itemName);
    await this.click(this.addButton);
  }

  async checkItem(itemNumber) {
    await this.click(this.itemCheckBox(itemNumber));
  }

}

module.exports = new Page1()