//Axios call to get all data
const axios = require('axios');

function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    if (typeof id !== 'string') throw 'Error: id must be a string';
    id = id.trim();
    if (id.length === 0)
      throw 'Error: id cannot be an empty string or just spaces';
    return id;
}

function checkPersonName(searchPersonName) {
    if (!searchPersonName) throw 'Error: You must provide a Name to search for';
    if (typeof searchPersonName !== 'string') throw 'Error: Name must be a string';
    searchPersonName = searchPersonName.trim();
    if (searchPersonName.length === 0) throw 'Error: Name cannot be an empty string or just spaces';
    return searchPersonName;
}

const getAllPeople = async () => {
    const { data } = await axios.get(`https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json`);
    return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    checkPersonName(searchPersonName);
    const people = await getAllPeople();
    let res = [];
    let idRes =[];
    let personFound = false;
    for (let i = 0; i< people.length; i++) {   
        if (people[i]["firstName"].includes(searchPersonName) || people[i]["lastName"].includes(searchPersonName)) {
            res.push(people[i]);
            idRes.push(people[i]["id"]);
            personFound = true;
        }
    }
    if(!personFound) {
        return [];
    }
    idRes = idRes.sort(function(a, b){return a - b});
    let finalRes=[];
    for(let j =0; j<idRes.length;j++){
        if(j>=20){
            break;
        }
        for(let k =0; k<res.length;k++){
            if(idRes[j] === res[k]["id"]){
                finalRes.push(res[k]);
            }
        }
    }
    return finalRes;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    checkId(id);
    const people = await getAllPeople();
    let res = [];
    let personFound = false;
    for (let i = 0; i< people.length; i++) {   
        if (people[i]["id"] === parseInt(id)) {
            res = people[i];
            personFound = true;
        }
    }
    if(!personFound) {
        throw 'Error : person not found';
    }
    return res;
};

module.exports = { searchPeopleByName, searchPeopleByID };


