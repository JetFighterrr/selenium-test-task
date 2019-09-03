// Import requirement packages
'use strict';
require('chromedriver');
const assert = require('assert');
require('mocha');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('Checkout Google.com', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    // Next, we will write steps for our test.
    // For the element ID, you can find it by open the browser inspect feature.
    it('Calculates on Google', async function() {
        // Load the page
        await driver.get('https://www.google.com/search?q=calculator');
        //find button 7 and click
        let button;
        button = await driver.findElement(By.xpath('/html/body/div[8]/div[3]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[2]/td[1]/div/div'));
       // setTimeout(() =>  console.log(button), 30000);
        await button.click();
        // clickButton('+');
        button = await driver.findElement(By.xpath('/html/body/div[8]/div[3]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[5]/td[4]/div/div'));
       // setTimeout(() =>  console.log(button), 30000);
        await button.click();
       // clickButton('8');
        button = await driver.findElement(By.xpath('/html/body/div[8]/div[3]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[2]/td[2]/div/div'));
        //setTimeout(() =>  console.log(button), 30000);
        await button.click();
        // clickButton('=');
        button = await driver.findElement(By.xpath('/html/body/div[8]/div[3]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[5]/td[3]/div/div'));
        //setTimeout(() =>  console.log(button), 30000);
        await button.click();
       //wait result to appear
        await driver.sleep(1000);
        //checking result
        let title = await driver.findElement(By.xpath('//*[@id="cwos"]')).getText();
        //setTimeout(() => logTitle(title), 3000);
        let referenceValue = '15';
        assert.ok( title.toString() === referenceValue, 'Error: result of operation is expected to be equal to' + referenceValue + ', but was: ' + title.toString());
    });
    // close the browser after running tests
    after(() => driver && driver.quit());
});

function logTitle(title){
    console.log('result:' + title)
}
