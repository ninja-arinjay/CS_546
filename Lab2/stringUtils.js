/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

//To check if the input is valid or not
function checkIsProperString(string){
      if (!string) {
            throw "Error: Input is not supplied or undefined";
      }
      if (typeof string != "string") {
            throw "Error: Input must be only a string type";
      }
      string = string.trim();
      if (string.length <= 0) {
            throw "Error: Input can not be an empty string";
      }
}

//To check the input string is a palindrome string or not
function checkIsPalindrome(string){
      string= string.toLowerCase();
      let reverse = '';
      let len = string.length;
      for(let j =len-1; j>=0; j--){
            //calculating the reverse of the input string
            reverse = reverse + string.charAt(j);
      }
      if(reverse === string){
            return true;
      }

      else{
            return false;
      }
}

//palindromes function
let palindromes = (string) => {
      //input validation
      checkIsProperString(string);
      string = string.trim();
      let len = string.length;
      let start=0;
      let result = [];
      for(let i =0; i<len; i++){
            if(string.charAt(i) === ' ' || string.charAt(i) === ',' || string.charAt(i) === '!' || string.charAt(i) === '?'){
                  let subStr = string.substring(start, i);
                  if(checkIsPalindrome(subStr) && subStr.length > 1){
                        result.push(subStr);
                  }
                  start = i+1;
            }
      }
      return result;
};

//replaceChar function
let replaceChar = (string) => {
      //input validation
      checkIsProperString(string);
      string = string.trim();
      let len = string.length;
      let result = '';
      let flag = true;
      for(let i=0; i<len; i++){
            if(i%2 === 0){
                  result = result + string.charAt(i);
            }
            else{
                  if(flag){
                        result = result + '*';
                  }
                  else{
                        result = result + '$';
                  }
                  flag = !flag;
            }
      }
      return result;
};

//charSwap function
let charSwap = (string1, string2) => {
      //input validation
      checkIsProperString(string1);
      checkIsProperString(string2);
      string1 = string1.trim();
      string2 = string2.trim();
      if(string1.length < 4 || string2.length < 4){
            throw "Error : Length of String is less than 4";
      }
      let temp1 = string1.substring(0,4);
      let temp2 = string2.substring(0,4);
      let result = temp2 + string1.substring(4) + ' ' + temp1 + string2.substring(4);
      return result;
};

//exporting functions
module.exports = {
      palindromes,
      replaceChar,
      charSwap
};