/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

const people = require("./people");

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

const people = require("./people");
const companies = require("./companies");


async function main(){

    //Get person by Id Test
    try{
        const peopledata = await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById(-1);
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }


    // Same Job Title Test 
    try{
        const peopledata = await people.sameJobTitle("Help Desk Operator");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameJobTitle();
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }


    // Get Postal Code ( City, State) Test
    try{
        const peopledata = await people.getPostalCodes("Salt Lake City", "Utah");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPostalCodes();
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }


    //same  City and State Test
    try{
        const peopledata = await people.sameCityAndState("Salt Lake City", "Utah");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameCityAndState("Bayside", "New York");
        console.log(peopledata);
    }catch(e){
        console.log (e);
    }

    //List Employees Test
    try{
        const d = await companies.listEmployees("Kemmer-Mohr");
        console.log(d);
    }catch(e){
        console.log (e);
    }
    try{
        const d = await companies.listEmployees('foobar');
        console.log(d);
    }catch(e){
        console.log (e);
    }

    //sameIndustry Test
    try{
        const d = await companies.sameIndustry('Auto Parts:O.E.M.');
        console.log(d);
    }catch(e){
        console.log (e);
    }
    try{
        const d = await companies.sameIndustry('Foobar Industry');
        console.log(d);
    }catch(e){
        console.log (e);
    }

    //Get company by Id Test

    try{
        const d = await companies.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf");
        console.log(d);
    }catch(e){
        console.log (e);
    }
    try{
        const d = await companies.getCompanyById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log(d);
    }catch(e){
        console.log (e);
    }
    
};

//Calling main function
main();
