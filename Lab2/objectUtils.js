/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

//To check if the input is valid or not
function checkObjects(obj){
      if (!obj) {
            throw "Error: Input not supplied or undefined";
      }
      if (typeof obj !== "object") {
            throw "Error: Input must be of proper type of object)";
      }
}

//to check if the input function is valid or not
function checkFunction(func) {
      if (!func) {
        throw "Error: Input not supplied or undefined";
      }
      if (typeof func !== "function") {
        throw "Error: Input must be of proper type of function";
      }
}

//Deep Equality function
let deepEquality = (obj1, obj2) => {
      checkObjects(obj1);
      checkObjects(obj2);
      //to check the length of both the input objects are equal or not
      if(Object.keys(obj1).length != Object.keys(obj2).length){
            return false;
      }
      for(let key of Object.keys(obj1)){
            // if the value is an object, calling the function recursively
            if(typeof obj1[key] === 'object'){
                  if(!(deepEquality(obj1[key], obj2[key]))){
                        return false;
                  }
            }
            else if(obj1[key] != obj2[key]){
                  return false;
            }
      }
      return true;
};


const res = new Object();
//commonKeysValues function
let commonKeysValues = (obj1, obj2) => {
      //input validation
      checkObjects(obj1);
      checkObjects(obj2);

      for(let key of Object.keys(obj1)){
            // if the value is an object, calling the function recursively
            if(typeof obj1[key] === 'object'){
                  if(deepEquality(obj1[key], obj2[key])){
                        res[key] = obj1[key];
                  }
                  commonKeysValues(obj1[key], obj2[key]);
            }
            else if(obj1[key] === obj2[key]){
                  res[key] = obj1[key];
            }
      }
      return res;
};

//calculateObject function
let calculateObject = (object, func) => {
      //input validation
      checkObjects(object);
      checkFunction(func);
      //To check if the each value of an object is a number or throw error
      for(let value of Object.values(object)){
            if (typeof value !== "number") {
                  throw "Error: Each object value must be a number";
            }
      }
      let result = new Object();
      //calling the input function for each value
      for(let key of Object.keys(object)){
            let temp = func(object[key]);
            temp = Math.sqrt(temp);
            temp = temp.toFixed(2);
            result[key] = temp;
      }
      return result;
};

//exporting functions
module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject
};