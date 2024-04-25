function calcbtc(arr) {
  calcestandeft(arr)
  calclstandlft(arr)
  calcslack(arr)
}

function calcestandeft(arr) {
  for (let i = 0; i < arr.length; i++) {
    calcest(arr, i);
    calceft(arr, i);
  }
}

function calclstandlft(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    calclft(arr, i);
    calclst(arr, i);
  }
}

function calcslack(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].slack = arr[i].lst - arr[i].est;
  }
}

function calcest(arr, index) {
  // Set initial activity est to 0
  if (arr[index].predecessors.length == 1 && arr[index].predecessors[0] == "") {
    arr[index].est = 0;
    return;
  }
  let max = 0;
  // Loop through each other task
  for (let j = 0; j < arr.length; j++) {
    // If our task has that task as a predecessor
    if (arr[index].predecessors.includes(arr[j].name)) {
      if (arr[j].eft > max) { // Set the new EST to that task's EFT
        max = arr[j].eft;
        // If we have multiple predecessors, set the task to the maximum predecessor EFT
      }
    }
  }
  arr[index].est = max;
}

function calceft(arr, index) {
  arr[index].eft = arr[index].est + parseInt(arr[index].duration);
}

function calclst(arr, index) {
  arr[index].lst = arr[index].lft - parseInt(arr[index].duration);
}

function calclft(arr, index) {
  // Set final activity LFT to be the EFT of the final task (They did this, but I don't think it's necessary)
  if (arr[index].successors.length == 1 && arr[index].successors[0] == "") {
    arr[index].lft = arr[index].eft;
    return;
  }
  let min = Number.POSITIVE_INFINITY;
  // Loop through each other task
  for (let j = 0; j < arr.length; j++) {
    // If our task has that task as a predecessor
    if (arr[index].successors.includes(arr[j].name)) {
      if (arr[j].lst < min) { // Set the new EST to that task's EFT
        min = arr[j].lst;
        // If we have multiple predecessors, set the task to the maximum predecessor EFT
      }
    }
  }
  arr[index].lft = min;
}