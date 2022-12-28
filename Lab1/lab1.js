function questionOne(arr) {
  // TODO: Implement question 1 here
  const res = []

  arr.forEach(num => {
     let count = 0;
     for(let i =2; i<num; i++){
      if(num%i === 0){
        count++;
      }
     }
     //to check if its prime or not
     if(count === 0 && num > 1){
      //appending to the array true if its a prime number
      res.push(true)
     }
     else{
      res.push(false)
     }
  });
  return res
}


function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here

  //checking starting number and commonRatio are valid no or not
  if(startingNumber === 0 || commonRatio === 0){
    return 0;
  }

  //checking number of terms is a valid input or not
  if(numberOfTerms <= 0){
    return NaN;
  }

  //To store the sum of Geometric series
  let sum =0;

  //Calculating Geometric series
  for(let i = 0; i<numberOfTerms; i++){
    sum = sum + startingNumber * Math.pow(commonRatio, i);
  }
  return sum;
}



function questionThree(str) {
  // TODO: Implement question 3 here

  //To check if input is valid or not
  if (Object.prototype.toString.call(str) === '[object String]'){
    str = str.trim();
    str = str.toLowerCase();

    //Storing all the consonants in a single string
    const consonants = 'bcdfghjklmnpqrstvwxyz';

    //To store the number of consonants in a string
    let count = 0;


    for(let i=0; i<str.length; i++){
      let c = str.at(i);

      //To check if the input string contains a consonant or not
      if(consonants.includes(c)){
        count++;
      }
    }
    return count;
  }

  else{
    return 'Inavlid Input'
  }
  
}

function questionFour(fullString, substring) {
  // TODO: Implement question 4 here

  // To Check the inputs is valid or not
  if (Object.prototype.toString.call(fullString) === '[object String]' && Object.prototype.toString.call(substring) === '[object String]'){
      let lastIndex = 0;

      //To convert both inputs to lower case
      fullString = fullString.toLowerCase();
      substring = substring.toLowerCase();

    //to count the number of substrings
    let count =0;

    while(lastIndex != -1){
      lastIndex = fullString.indexOf(substring, lastIndex);
      if(lastIndex != -1){
        count++;
        lastIndex = lastIndex + substring.length;
      }
    }
    return count;
  }
  else{
    return 'Invalid Input';
  }
  
}

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: 'ARINJAY',
  lastName: 'PANWAR',
  studentId: 'APANWAR2',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
