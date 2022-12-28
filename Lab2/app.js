/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

const arrayUtils = require("./arrayUtils");
const objectUtils = require("./objectUtils");
const stringUtils = require("./stringUtils");


// arrayStats Tests
try {
    // Should Pass
    const arrayStatsOne = arrayUtils.arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20]);
    console.log('arrayStats passed successfully');

 } catch (e) {
    console.error('arrayStats failed test case');
 }
 try {
    // Should Fail
    const arrayStatsTwo = arrayUtils.arrayStats(1234);
    console.error('arrayStats did not error');
 } catch (e) {
    console.log('arrayStats failed successfully');
 }

 //makeObjects Tests
 try {
    // Should Pass
    const makeObjectsOne = arrayUtils.makeObjects(["foo", "bar"], ["name", "Patrick Hill"], ["foo", "not bar"]);
    console.log('makeObjects passed successfully');
 } catch (e) {
    console.error('makeObjects failed test case');
 }
 try {
    // Should Fail
    const makeObjectsTwo = arrayUtils.makeObjects(1234);
    console.error('makeObjects did not error');
 } catch (e) {
    console.log('makeObjects failed successfully');
 }


 //commonElements Tests
 try {
    // Should Pass
    const arr1 = [5, 7]; 
    const arr2 = [20, 5]; 
    const commonElementsOne = arrayUtils.commonElements(arr1, arr2);
    console.log('commonElements passed successfully');
 } catch (e) {
    console.error('commonElements failed test case');
 }
 try {
    // Should Fail
    const commonElementsTwo = arrayUtils.commonElements(1234);
    console.error('commonElements did not error');
 } catch (e) {
    console.log('commonElements failed successfully');
 }

 
 //palindromes Tests
try {
    // Should Pass
    const palindromesOne = stringUtils.palindromes("Hi mom, At noon, I'm going to take my kayak to the lake");
    console.log('palindromes passed successfully');
 } catch (e) {
    console.error('palindromes failed test case');
 }
 try {
    // Should Fail
    const palindromesTwo = stringUtils.palindromes(1234);
    console.error('palindromes did not error');
 } catch (e) {
    console.log('palindromes failed successfully');
 }


 //replaceChar Tests
 try {
    // Should Pass
    const replaceCharOne = stringUtils.replaceChar("Daddy");
    console.log('replaceChar passed successfully');
 } catch (e) {
    console.error('replaceChar failed test case');
 }
 try {
    // Should Fail
    const replaceCharTwo = stringUtils.replaceChar(1234);
    console.error('replaceChar did not error');
 } catch (e) {
    console.log('replaceChar failed successfully');
 }


 //charSwap Tests
 try {
    // Should Pass
    const charSwapOne = stringUtils.charSwap("Patrick", "Hill");
    console.log('charSwap passed successfully');
 } catch (e) {
    console.error('charSwap failed test case');
 }
 try {
    // Should Fail
    const charSwapTwo = stringUtils.charSwap("Patrick", "");
    console.error('charSwap did not error');
 } catch (e) {
    console.log('charSwap failed successfully');
 }


 //deepEquality Tests
 try {
    // Should Pass
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const deepEqualityOne = objectUtils.deepEquality(first, second);
    console.log('deepEquality passed successfully');
 } catch (e) {
    console.error('deepEquality failed test case');
 }
 try {
    // Should Fail
    const deepEqualityTwo = objectUtils.deepEquality(1234);
    console.error('deepEquality did not error');
 } catch (e) {
    console.log('deepEquality failed successfully');
 }


 //commonKeysValues Tests
 try {
    // Should Pass
    const third = {a: 2, b: {c: true, d: false}};
    const forth = {b: {c: true, d: false}, foo: "bar"};
    const commonKeysValuesOne = objectUtils.commonKeysValues(third, forth);
    console.log('commonKeysValues passed successfully');
 } catch (e) {
    console.error('commonKeysValues failed test case');
 }
 try {
    // Should Fail
    const commonKeysValuesTwo = objectUtils.commonKeysValues(1234);
    console.error('commonKeysValues did not error');
 } catch (e) {
    console.log('commonKeysValues failed successfully');
 }


 //calculateObject Tests
 try {
    // Should Pass
    const calculateObjectOne = objectUtils.calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('calculateObject passed successfully');
 } catch (e) {
    console.error('calculateObject failed test case');
 }
 try {
    // Should Fail
    const calculateObjectTwo = objectUtils.calculateObject(1234);
    console.error('calculateObject did not error');
 } catch (e) {
    console.log('calculateObject failed successfully');
 }