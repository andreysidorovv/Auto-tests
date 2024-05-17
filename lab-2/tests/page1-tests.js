const { beforeEach, afterEach} = require('mocha');
const page1 = require('../pages/page1');

describe('page1 Test', async function() {
  
  beforeEach(async function() {
    await page1.open();
  })

  it('opens page1, check all options and add new item', async function() {
    var total = 5;
    for (let i = 1; i <= total; i++) {
      await page1.checkItem(i);
    }
    await page1.addNewItem('sys');
      total++;
      await page1.checkItem(total);
  })

  afterEach(async function() {
    await page1.closeBrowser();
  })
  
})