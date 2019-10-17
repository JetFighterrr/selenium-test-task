//This file contains step definitions for the feature file.
import {After, Given, When, Then} from 'cucumber';
import { assert } from 'chai';
let browser;

Given('there is connection to Google',{timeout: 60 * 1000}, function() {
    browser.url('https://www.google.com/search?q=calculator');
});

When('I start with {int}',{timeout: 60 * 1000}, function (num) {
    clickOnButton(num.toString());
    });

When('I use pointer and {int}',{timeout: 60 * 1000}, function (num) {
    clickOnButton('.');
    clickOnButton(num.toString());
});

When('I add {int}',{timeout: 60 * 1000},async function (num) {
    clickOnButton('+');
    clickOnButton(num.toString());
    });

When('I subtract {int}',{timeout: 60 * 1000},async function (num) {
    clickOnButton('-');
    clickOnButton(num.toString());
    });

When('I multiply by {int}',{timeout: 60 * 1000},function (num) {
    clickOnButton('X');
    clickOnButton(num.toString());
});

When('I divide by {int}',{timeout: 60 * 1000},function (num) {
    clickOnButton('/');
    clickOnButton(num.toString());
});

When('I press result',{timeout: 60 * 1000}, function () {
    clickOnButton('=');
    //waiting for a result of operation
    browser.pause(1000);
    });

Then('I see {int} as a result',{timeout: 60 * 1000}, function (num) {
    //I find result cell and later make assertion
    let calcResult = $('#cwos');
    let referenceValue = num.toString();
    assert.equal(
        calcResult.getText().toString(),
        referenceValue,
        'Error: result of operation is expected to be equal to' + referenceValue + ', but was: ' + calcResult.toString());
    });

After(async function () {
    browser.closeWindow();
    });

function clickOnButton(str){
    //find button by XPath
    let button = $(parseStringToXpath(str));
    //click on button
    button.click();
}

function parseStringToXpath(str){
    //creating XPath String here
    let result ='//body/div[8]/div[3]/div[10]/div[1]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/';
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