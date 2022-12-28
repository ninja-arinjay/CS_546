//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
function inputCheck(user, pass) {
    if ((!user) || (!pass)){
        throw "ERROR: USERNAME AND PASSWORD MUST BE INPUTTED";
    }
    if (typeof user !== "string") {
        throw "ERROR: USERNAME MUST BE A STRING";
    }
    user = user.trim();
    if(user.trim().length === 0){
        throw "ERROR: USERNAME CAN'T HAVE EMPTY SPACES";
    }
    if (user.trim().length < 4){
        throw "ERROR: MUST HAVE 4 OR MORE CHARACTERS"
    }
    //https://stackoverflow.com/questions/15933727/javascript-regular-expression-for-usernames-no-spaces
    let reUser = /^[a-zA-Z0-9]{4,}$/; // I did up to unlimited characters
    if (reUser.test(user) === false) {
        throw "ERROR: MUST BE A VALID STRING!";
    }
    if (typeof pass !== "string") {
        throw "ERROR: PASSWORD MUST BE A STRING!"
    }
    let rePass = /^[a-zA-Z0-9.\-_$#&@*!]{6,}$/; // I did up to unlimited characters
    if (rePass.test(pass) === false) {
        throw "ERROR: MUST BE A VALID STRING!";
    }

    
}
module.exports ={
    inputCheck
};