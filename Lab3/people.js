const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
}

function inputCheckString(string){
    if (!string) {
        throw "Error : Input Must Exist"
    }
    if (typeof string !== 'string'){
        throw "Error : Input must be a string!"
    }
    if (string.trim().length <= 0) {
        throw "Error : Input must not be empty!"
    }

}



const getPersonById = async (id) => {
    inputCheckString(id);
    const people = await getPeople();
    let res = [];
    let personFound = false;
    for (let i = 0; i< people.length; i++) {    
        if (people[i]["id"] === id) {
            res = people[i];
            personFound = true;
        }
    }
    if(!personFound) {
        throw 'Error : person not found';
    }
    return res;
};

const sameJobTitle = async (jobTitle) => {
    inputCheckString(jobTitle);
    const people = await getPeople();
    let res = [];
    for(let i = 0; i<people.length; i++){
        if(people[i]['job_title'].toLowerCase() === jobTitle.toLowerCase()){
            res.push(people[i]);
        }
    }
    if(res.length < 2){
        throw 'Error : There are no two or more people having same Job Title';
    }
    return res;
};


const getPostalCodes = async (city, state) => {
    inputCheckString(city);
    inputCheckString(state);
    const people = await getPeople();
    let res = [];
    for(let i =0; i<people.length; i++){
        if(people[i]['city'].toLowerCase() === city.toLowerCase() && people[i]['state'].toLowerCase() === state.toLowerCase()){
            res.push(parseInt(people[i]['postal_code']));
        }
    }
    if(res.length === 0){
        throw 'Error : There are no postal codes for the given city and state';
    }
    res = res.sort(function(a, b){return a - b});
    return res;
};  

const sameCityAndState = async (city, state) => {
    inputCheckString(city);
    inputCheckString(state);
    const people = await getPeople();
    let temp = [];
    let res=[];
    for(let i =0; i<people.length; i++){
        if(people[i]['city'].toLowerCase() === city.toLowerCase() && people[i]['state'].toLowerCase() === state.toLowerCase()){
            temp.push(people[i]['last_name']);
        }
    }
    if(temp.length < 2 ){
        throw 'Error : There are no two or more people with the same city and state';
    }
    temp.sort();
    temp.forEach(element => {
        people.forEach(person => {  
            if(person['last_name'] === element){
                res.push(person['first_name'] +' '+ element);
            }
        }); 
    });
    return res;
};


module.exports = {
    getPeople,
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState
};
