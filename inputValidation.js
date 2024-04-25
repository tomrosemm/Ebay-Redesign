//console.log('inputValidation accessed');


const cbutton = document.getElementById('calculateButton');

//function that checks a given string for special characters. 
//returns true if there are
function containsSpecialChars(str) {
  const specialChars =
    /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

//function that checks name for every row of rowArray. 
//if it is valid it returns true. 
//if it is an invalid name it returns false
function nameValid() {
  for (let i = 0; i < rowArray.length; i++) {
    //console.log(rowArray[i].name);
    if (containsSpecialChars(rowArray[i].name)) {
      //console.log('Invalid name input: special character');
      return false;
    }
    if (rowArray[i].name == '') {
      //console.log('Invalid name input: no input');
      return false;
    }
  }
  //console.log('Valid name inputs');
  return true;
}



//fuction that checks duration for every row of rowArray. 
//if it is a positive interger is is valid and thus returns true. 
//if it is anything else it is invalid and thus returns false
function durationValid() {
  for (let i = 0; i < rowArray.length; i++) {
    //console.log(rowArray[i].duration);

    if (Number.isInteger(parseInt(rowArray[i].duration)) == false) {
      //console.log('Invalid duration input: not and integer');
      return false;
    }
    if (parseInt(rowArray[i].duration) < 0) {
      //console.log('Invalid duration input: Negative number');
      return false;
    }
  }
  //console.log('Valid duration inputs');
  return true;
}

//calls both functions
function valid() {
  if (nameValid() == true && durationValid() == true) {
    //console.log('Dont disable button: Valid');
    cbutton.disabled = false;
  }
  else {
    //console.log('Disabel button: Not valid');
    cbutton.disabled = true;
  }
}


/*
rowArray.addEventListener("change", (e)=> {
  console.log(rowArray.name);
  if(nameValid == true  && durationValid == true ) {
    calcButton.disabled = false;
  }
  else {
    calcButton.disabled = true;
  }
})



cbutton.addEventListener("click", (e) => {
  
  if(nameValid()==true && durationValid()==true) {
    console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYY');
    cbutton.disabled = true;
  }
  else {
    console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
  }
})

*/

/*
//checks to see if predeccessor and successor 
function psValid(array,name) {
    console.log('psValid called successfully');
    for (let i = 0; i < array.length; i++) {
      if(array[i] == n) {
        cbutton.disabled = true;
        return;
      } 
    }
    return;
  }
  */
