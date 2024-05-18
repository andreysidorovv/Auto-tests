const { By, Key } = require('selenium-webdriver');
var BasePage = require('./basepage');

class Polytech extends BasePage {

  get scheduleButton() {return By.xpath('//html/body/header/nav/div[1]/div[2]/div[1]/div/ul/li[3]/a');}
  get watchOnSiteButton() {return By.xpath('//*[contains(@href, "rasp.dmami.ru")]');}
  get searchField() {return By.xpath(".//input[@class='groups']");}
  get groupButton() {return By.id("221-323")}
  get searchField() {return By.xpath(".//input[@class='groups']");}


  async open(){
    await this.goToUrl('https://mospolytech.ru/');  
  }
  
  async openSchedule() {
    await this.click(this.scheduleButton);
  }

  async navToSchedule() {
    await this.click(this.watchOnSiteButton);
  }

  async findInput() {
    await this.enterText(this.searchField, '221-323');
  }

  async clickOnGroup() {
    await this.click(this.groupButton);
  }
  
}

module.exports = new Polytech()