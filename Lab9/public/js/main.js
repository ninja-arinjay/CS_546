/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/

const inForm = document.getElementById('inForm');
const arrayInput = document.getElementById('inputArray');
const errorDiv = document.getElementById('error');
const results = document.getElementById('results');


let color = false;
let errorFlag = false;
(function () {
    function checkArray(arr, final) {
        //To chheck it is an array
        if(!Array.isArray(arr)) {
            errorFlag = true;
            arrayInput.value = '';
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: You must enter a valid input value!';
            errorDiv.className = 'error';
            arrayInput.focus();
            inForm.reset();
        } 
        // To check each array should have at least one element
        if(arr.length == 0) {
            errorFlag = true;
            arrayInput.value = '';
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: Each Inner Array should contain at least one input !';
            errorDiv.className = 'error';
            arrayInput.focus();
            inForm.reset();
        }
        for(let i =0; i<arr.length;i++){
            let num = parseFloat(arr[i]);
            if((num - Math.floor(num)) !== 0){
                errorFlag = true;
                arrayInput.value = '';
                errorDiv.hidden = false;
                errorDiv.innerHTML = 'Error: Array Elements should be whole numbers !';
                errorDiv.className = 'error';
                arrayInput.focus();
                inForm.reset();
            }
        }

    }



    if(inForm) { // confused
        inForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let start =-1;
            let end =-1;
            let startFlag = false;
            let endFlag = false;
            let inp=[];
            for(let i =0; i<arrayInput.value.length; i++){
                if(arrayInput.value.charAt(i)==='['){
                    start=i;
                    startFlag = true;
                }
                else if(arrayInput.value.charAt(i)===']'){
                    end =i;
                    endFlag = true;
                }
                if(startFlag && endFlag){
                    let temp = arrayInput.value.substring(start+1,end);
                    temp = "[" + temp + "]";
                    temp = JSON.parse(temp);
                    inp.push(temp);
                    startFlag = false;
                    endFlag = false;
                }
            }
            if(inp.length > 0){
                let final =[];
                for(let j =0; j<inp.length; j++){
                    checkArray(inp[j],final);
                }
                if(!errorFlag){
                    for(let k =0; k<inp.length;k++){
                        for(let m =0; m<inp[k].length;m++){
                            final.push(inp[k][m]);
                        }
                    }
                    final.sort(function (a, b) {
                        return a === b ? 0 : a > b ? 1 : -1;
                    });
                    let li = document.createElement('li');
                    color = !color;
                    if(color){
                        li.classList.add("is-green");
                    }
                    else{
                        li.classList.add("is-red");
                    }
                    li.innerHTML = "[" + final + "]";
                    results.appendChild(li);
                }
                inForm.reset();
            }else{
                arrayInput.value = '';
                errorDiv.hidden = false;
                errorDiv.innerHTML = 'Error: Input Cannot be Empty or Invalid !';
                errorDiv.className = 'error';
                arrayInput.focus();
            }
        });
    }

})();