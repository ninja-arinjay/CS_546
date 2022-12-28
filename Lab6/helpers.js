//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

// Function to check if the input string is valid or not.
const checkInputString= (input) =>{
    if(!input) throw 'ERROR: ALL FIELDS MUST HAVE AN INPUT!';
    if (typeof input !== 'string') throw "ERROR: INPUT MUST BE A STRING!";
    if (input.trim().length === 0)
      throw 'INPUT CANNOT BE AN EMPTY STRING OR STRING WITH JUST SPACES';
};

// Function to check if the input array is valid or not.
const checkInputArray =(input)=>{
    if(!input) throw "ERROR: ALL FIELDS MUST HAVE AN INPUT!";
    if (!Array.isArray(input)) 
        throw "ERROR: GENRE/CAST_MEMBERS MUST BE AN ARRAY!";
    if(input.length === 0)
        throw "ERROR: GENRE/CAST_MEMBERS CANNOT BE AN EMPTY ARRAY!";
};

// Function to check if the input title is valid or not.
const checkTitle = (input) =>{
    if(input.length <2) throw "ERROR : Title must be at least two characters";
    input = input.toLowerCase();
    let charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
    let numArr = ['0','1','2','3','4','5','6','7','8','9'];
    for(let i =0; i<input.length; i++){
        if(charArr.includes(input.charAt(i)) || numArr.includes(input.charAt(i))){
            continue;
        }
        else{
            throw "ERROR : Title can only contain letters or numbers."
        }
    }
};

// Function to check if the input studio is valid or not.
const checkStudio = (input) =>{
    if(input.length < 5) throw "ERROR : Studio must be at least 5 Characters long";
    input = input.toLowerCase();
    let charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
    for(let i =0; i<input.length; i++){
        if(charArr.includes(input.charAt(i))){
            continue;
        }
        else{
            throw "ERROR : Studio can only contain letters."
        }
    }
};

// Function to check if the input director and cast members are valid or not.
const checkDirector = (input) =>{
    input= input.toLowerCase();
    let arr = input.split(" ");
    if(arr.length != 2) throw "ERROR : Director/Cast Members can only contain First Name and Last Name";
    if(arr[0].length <3) throw "ERROR : Director/Cast Members First Name should be at least 3 Characters long";
    if(arr[1].length < 3) throw "ERROR : Director/Cast Members Last Name should be at least 3 Characters long";
    let charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    for(let i =0; i<arr.length;i++){
        for(let j =0; j<arr[i].length; j++){
            if(charArr.includes(arr[i].charAt(j))){
                continue;
            }
            else{
                throw "ERROR : Director/Cast Members can only contains letters."
            }
        }
    }
};

// Function to check if the input rating is valid or not.
const checkRating = (input) =>{
    checkarr = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
    if(!(checkarr.includes(input))){
        throw "ERROR : Not a Valid Rating";
    }
};

// Function to check if the input genres is valid or not.
const checkGenres = (input) =>{
    input = input.toLowerCase();
    if(input.length <5) throw "ERROR : Each element in genres must be at least 5 characters long."
    let charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    for(let i =0; i<input.length; i++){
        if(charArr.includes(input.charAt(i))){
            continue;
        }
        else{
            throw "ERROR : Genres can only contain letters."
        }
    }
};

// Function to check if the input date is of valid format or not.
const checkDate = (input) =>{
    let daysList =[31,28,31,30,31,30,31,31,30,31,30,31];
    let inparr = input.split("/");
    let mm = parseInt(inparr[0]);
    if(mm<=0 || mm>12){
        throw "Error : Month can only between 1 to 12."
    }
    let dd = parseInt(inparr[1]);
    if(dd<=0 || dd>daysList[mm-1]){
        throw "ERROR : Invalid Day format in Date."
    }
    let lowerLimit = 1900;
    let upperLimit = new Date().getFullYear() +2;
    let yy = parseInt(inparr[2]);
    if(yy<lowerLimit || yy>upperLimit){
        throw "ERROR : Invalid Year format in Date."
    }
};

// Function to check if the runtime is of valid format or not.
const checkRuntime = (input) =>{
    if(!(Number.isInteger(parseInt(input[0])))){
        throw "ERROR : Runtime can only be a whole number."
    }
    if(input[0]<=0){
        throw "ERROR : Runtime must be greater than 0h."
    }
    if(input[1] != 'h'){
        throw "Error : Invalid Runtime format."
    }
    if(input[2] != ' '){
        throw "Error : Invalid Runtime format."
    }
    let pos = input.indexOf('m')
    let min = parseInt(input.substring(3,pos));
    if(!(Number.isInteger(min))){
        throw "ERROR : Runtime can only be a whole number."
    }
    if(min<0){
        throw "ERROR : Runtime can only have positive value of min."
    }
    if(min>=60){
        throw "ERROR : Runtime can only have value of min less than 60."
    }
    if(input.substring(pos) != 'min'){
        throw "ERROR : Invalid Runtime format."
    }
};

module.exports = {
    checkInputString,
    checkInputArray,
    checkTitle,
    checkStudio,
    checkDirector,
    checkRating,
    checkGenres,
    checkDate,
    checkRuntime
};