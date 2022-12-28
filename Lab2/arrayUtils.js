/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

//To check if the input array is valid or not
function checkIsArray (array){
  if(array === null || array === undefined){
    throw "Error : No input provided to the array or undefined";
  }
  if(!(Array.isArray(array))){
    throw "Error : Input is not an array";
  }
  if(array.length === 0){
    throw "Error : The length of Input Array is Zero";
  }
};

//To check if all the elements of an array are numbers or not
function checkArrayElement(value) {
  if (typeof value !== "number") {
    throw "Error: Each array element must be a number";
  }
};

//To calculate the median of an array
function calcMedian(array){
  let size = array.length;
  //if the size is odd
  if(size & 1 != 0){
    return array[Math.floor(size/2)];
  }
  //even case
  else{
    let temp = array[Math.floor(size/2)] + array[Math.floor(size/2) - 1];
    return temp/2;
  }
};

//To calculate the mode of an array
function calcMode(array){
  let mapping =[];
  array.forEach(element => {
    if(mapping[element] === undefined){
      mapping[element] = 0;
    }
    else{
      mapping[element] = mapping[element]+1;
    }
  });
  let max =0;
  for(let map in mapping){
    if(mapping[map] > max){
      max = mapping[map];
    }
  }
  if(max === 0){
    return 0;
  }
  let count =0;
  let temporaryResult =0;
  for(let map in mapping){
    if(mapping[map] === max){
      temporaryResult = map;
      count++;
    }
  }
  if(count === 1){
    return Number(temporaryResult);
  }
  else{
    let res = [];
    for(let map in mapping){
      if(mapping[map] === max){
        res.push(Number(map));
      }
    }
    return res;
  }
};

//arrayStats function
let arrayStats = (array) => {
  //input validation
  checkIsArray(array);
  array.forEach(element => {
    checkArrayElement(element);
  });
  let result ={};
  array.sort(function(a, b){return a - b});
  let sum =0;
  let count = array.length;
  array.forEach(element => {
    sum = sum+element;
  });
  let mean = sum/count;
  let max = Math.max(...array);
  let min = Math.min(...array);
  let range = max - min;
  result.mean = mean;
  result.median = calcMedian(array);
  result.mode = calcMode(array);
  result.range = range;
  result.minimum = min;
  result.maximum = max;
  result.count = count;
  result.sum = sum;
  return result;
};

//makeObjects function
let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  //input validation
  arrays.forEach(array => {
    checkIsArray(array);
    if(!(array.length === 2)){
      throw "Error : The number of elements in an array is not equal to 2";
    }
  });
  var myMap = new Map();
  arrays.forEach(array => {
      myMap.set(array[0], array[1]);
  });
  var result = new Object();
  for(let [key,value] of myMap){
    result[key] = value;
  }
  return result;
};

//To check common elements in two arrays
function commonInTwo(a, b){
  let c = a.filter(value => b.includes(value));
  return c;
};

//commonElemenst function
let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if(arrays.length < 2){
    throw "Error : Number of input arrays are less than 2";
  }
  arrays.forEach(array => {
    checkIsArray(array);
  }) 
  let flag = false;
 let temp = arrays[0];
 let t2=[];
  arrays.forEach(array => {
    temp = commonInTwo(temp, array);
    array.forEach(element => {
      if(Array.isArray(element)){
        if(flag){
          t2= commonInTwo(t2, element);
        }
        else{
          t2=element;
          flag=true;
        }
      }
    });
  });
  if(t2.length != 0){
    temp.push(t2);
  }
  return temp;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements
};