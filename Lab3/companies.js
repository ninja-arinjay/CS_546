const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
}

async function getCompany(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return data;
}

//To check if the input is valid or not
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

const listEmployees = async (companyName) => {
    inputCheckString(companyName); // input validation
    const companies = await getCompany();
    const people = await getPeople();
    let compId = null ;
    let res = [];
    companies.forEach(company => {
        if(company['name'] === companyName){
            compId = company['id'];
            res.push(company);
        }
    });
    if(compId === null){// throw error if there is no company with the given company name
        throw 'Error : Company was not found';
    }
    let temp =[];
    let emplist =[];
    people.forEach(person => {
        if(person['company_id'] === compId){
            temp.push(person['last_name']);
        }
    });
    temp.sort();
    temp.forEach(element => { // To sort the names by last name
        people.forEach(person => {  
            if(person['last_name'] === element){
                emplist.push(person['first_name'] +' '+ element);
            }
        }); 
    });
    res[0].employees = emplist;
    return res;
};

const sameIndustry = async (industry) => {
    inputCheckString(industry);  // input validation
    let res=[];
    const companies = await getCompany();
    companies.forEach(company => {
        if(company['industry'] === industry){
            res.push(company);
        }
    });
    if(res.length === 0){ // Throw error if there is no company with given industry
        throw 'Error : No company with the given industry';
    }
    return res;
};

const getCompanyById = async (id) => {
    inputCheckString(id);  // input validation
    const companies = await getCompany();
    let res = [];
    companies.forEach(company => {
        if(company['id'] === id){
            res.push(company);
        }
    });
    if(res.length === 0){ // Throw error if there is no company with given id
        throw 'Error : Company not found.';
    }
    return res;
};



module.exports = { // Exporting functions
    getPeople,
    getCompany,
    listEmployees,
    sameIndustry,
    getCompanyById
};
