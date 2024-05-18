const { beforeEach, afterEach} = require('mocha');
const polytech = require('../pages/polytech');

describe('polytech Test', async function() {
  
  beforeEach(async function() {
    await polytech.open();
    
  })

  it('opens polytech page then open schedule, check timetable in my group (221-323)', async function() {
      await polytech.openSchedule();
      await polytech.navToSchedule();
      await polytech.close();
      await polytech.findInput();
      await polytech.clickOnGroup()

    });
    
  })

  afterEach(async function() {
     await polytech.closeBrowser();
})
  
