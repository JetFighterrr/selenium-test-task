//This file contains step definitions for the feature file.

require('chromedriver');
let {defineSupportCode} = require('cucumber');
let {After, Before, Given, When, Then} = require('cucumber');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
let driver;

Given('there is connection to Google',{timeout: 60 * 1000}, async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.google.com/search?q=calculator');
    });

When('I start with {int}',{timeout: 60 * 1000},async function (num) {
    await clickOnButton(num.toString());
    });

When('I use pointer and {int}',{timeout: 60 * 1000},async function (num) {
    await clickOnButton('.');
    await clickOnButton(num.toString());
});

When('I add {int}',{timeout: 60 * 1000},async function (num) {
    await clickOnButton('+');
    await clickOnButton(num.toString());
    });

When('I subtract {int}',{timeout: 60 * 1000},async function (num) {
    await clickOnButton('-');
    await clickOnButton(num.toString());
    });

When('I multiply by {int}',{timeout: 60 * 1000},async function (num) {
    await clickOnButton('X');
    await clickOnButton(num.toString());
});

When('I divide by {int}',{timeout: 60 * 1000},async function (num) {
    await clickOnButton('/');
    await clickOnButton(num.toString());
});

When('I press result',{timeout: 60 * 1000},async function () {
    await clickOnButton('=');
    //waiting for a result of operation
    await driver.sleep(1000);
    });

Then('I see {int} as a result',{timeout: 60 * 1000}, async function (num) {
    //I find result cell and later make assertion
    let title = await driver.findElement(By.xpath('//*[@id="cwos"]')).getText();
    let referenceValue = num.toString();
    assert.ok( title.toString() === referenceValue, 'Error: result of operation is expected to be equal to' + referenceValue + ', but was: ' + title.toString());
    });

After(async function () {
    return await (driver && driver.quit());
    });

async function clickOnButton(str){
    //find button by XPath
    let button = await driver.findElement(By.xpath(parseStringToXpath(str)));
    //click on button
    await button.click();
}

function parseStringToXpath(str){
    //creating XPath String here
    let result ='/html/body/div[8]/div[3]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/';
    switch(str){
        case '0':result += 'tr[5]/td[1]';
            break;
        case '1': result += 'tr[4]/td[1]';
            break;
        case '2': result += 'tr[4]/td[2]';
            break;
        case '3': result += 'tr[4]/td[3]';
            break;
        case '4': result += 'tr[3]/td[1]';
            break;
        case '5': result += 'tr[3]/td[2]';
            break;
        case '6': result += 'tr[3]/td[3]';
            break;
        case '7': result += 'tr[2]/td[1]';
            break;
        case '8': result += 'tr[2]/td[2]';
            break;
        case '9': result += 'tr[2]/td[3]';
            break;
        case '+': result += 'tr[5]/td[4]';
            break;
        case '-': result += 'tr[4]/td[4]';
            break;
        case 'X': result += 'tr[3]/td[4]';
            break;
        case '/': result += 'tr[2]/td[4]';
            break;
        case '=': result += 'tr[5]/td[3]';
            break;
        case '.': result += 'tr[5]/td[2]';
            break;
        case 'AC': return result + 'tr[2]/td[4]/div/div[1]';
        //default case is 4
        default: result += 'tr[3]/td[1]';
            break;
    }
    result += '/div/div';
    return result;
}