// Class for TableInputRow

class TableInputRow {
    static latestId = -1; // Initialize latestId

    constructor(name, predecessors, successors, duration, est, eft, lst, lft, slack) {
        this.id = TableInputRow.incrementId();
        this.name = name;
        this.predecessors = predecessors;
        this.successors = successors;
        this.duration = duration;
        this.est = est;
        this.eft = eft;
        this.lst = lst;
        this.lft = lft;
        this.slack = slack;
    }

    static incrementId() {
        TableInputRow.latestId++; // Increment latestId
        return TableInputRow.latestId;
    }
}

// Define an array to store TableInputRow objects
const rowArray = [];

// Create a new sample TableInputRow object
const tableInputRow0 = new TableInputRow("", [""], [""], "", "", "", "", "", "");

// Push the TableInputRow object to the rowArray
rowArray.push(tableInputRow0);

// Event listener for the "Add Row" button
document.getElementById("addButton").addEventListener("click", function () {
    const newRow = new TableInputRow("", [""], [""], "", "", "", "", "", "");
    rowArray.push(newRow); // Push the new TableInputRow object to the rowArray
    bindEventListenersForRow(); // Bind event listeners for the new row
    updateTable(); // Update the table to display the new row
});

// Calculate function to call btc and graph
function calculate(display = false) {
    calcbtc(rowArray);
    createGraph(rowArray, display);
    updateTable();
}

// Delete row functionality
function deleteRow(button) {
    const row = button.closest('tr'); // Get the closest row element
    const rowIndex = row.rowIndex - 1; // Get the index of the row to delete

    // Decrement IDs of all rows that come after the deleted row
    for (let i = rowIndex + 1; i < rowArray.length; i++) {
        rowArray[i].id--;
    }

    // Decrement latestId
    TableInputRow.latestId--;

    // Remove the row from the HTML table
    row.remove();

    // Remove the deleted row object from the rowArray
    rowArray.splice(rowIndex, 1);

    // Remove the row name from options in predecessor and successor dropdowns
    //const deletedRowName = rowArray[rowIndex].name;       <-- (This is unnecessary, made it cuz I thought I would need it, keeping for now)
    updateAllDropdownOptions();

    // Update table
    updateTable();
}

// Function to bind event listeners for rows
function bindEventListenersForRow() {
    const table = document.querySelector('table.possibleInputTable');

    table.addEventListener('input', function (event) {
        const target = event.target;
        if (target.matches('input[type="text"]') || target.matches('select')) {
            updateTableRow(event);
        }

    });
}

bindEventListenersForRow(); // Initial event listeners bind

// Function to update TableInputRow object when input or select changes
function updateTableRow(event) {
    const inputElement = event.target;
    const rowIndex = inputElement.parentElement.parentElement.rowIndex - 1; // Get row index
    const placeholder = inputElement.getAttribute('placeholder'); // Get placeholder value
    let value = inputElement.value; // Get input value

    // For iterating through predecessor and successor inputs and adding them to array
    if (inputElement.tagName === 'SELECT' && inputElement.multiple) {
        // For multi-select elements
        value = Array.from(inputElement.selectedOptions).map(option => option.value);
    } else {
        value = inputElement.value;
    }

    if (placeholder === 'Name') {
        // Update the name of the row
        rowArray[rowIndex].name = value;
        // Update the options of predecessor and successor dropdowns for all rows
        updateAllDropdownOptions();
    } else {
        // Update other properties
        rowArray[rowIndex][placeholder.toLowerCase()] = value;
    }

    updateTable(); // Update table
}

// Function to update the options of predecessor and successor dropdowns for all rows
function updateAllDropdownOptions() {
    const names = rowArray.map(row => row.name); // Get all names

    // Update the options of predecessor and successor dropdowns for all rows
    const dropdowns = document.querySelectorAll('.presuc-input');

    i = 0;

    dropdowns.forEach((dropdown, i) => {
        i++;
        ind = Math.ceil(i / 2) - 1;
        updateDropdownOptions(dropdown, names, ind);
    });
}

// Function to update the options of a specific dropdown
function updateDropdownOptions(dropdown, names, ind) {
    i = ind;

    // Clear existing options
    dropdown.innerHTML = '<option></option>';

    // Add options for all names
    names.forEach((name) => {
        if (name === names[i]) {
        }
        else {
            const option = document.createElement('option');
            option.text = name;
            option.value = name;
            dropdown.add(option);
        }
    });

    // Validates inputs to determine if calculate should be available
    valid();
}

function updateTable() {
    const table = document.getElementById("myTable");
    const rows = table.querySelectorAll("tr"); // Get all rows except the header

    // Iterate over each rowArray element
    for (let i = 0; i < rowArray.length; i++) {
        const row = rowArray[i];
        const cells = rows[i + 1].querySelectorAll("td"); // Get cells of the corresponding row

        // Update cells with scheduling information
        cells[4].innerHTML = `<div class="alert alert-success" style="margin:auto; width: 75px; height: 50px">${row.est}</div>`; // EST
        cells[5].innerHTML = `<div class="alert alert-success" style="margin:auto; width: 75px; height: 50px">${row.eft}</div>`; // EFT
        cells[6].innerHTML = `<div class="alert alert-success" style="margin:auto; width: 75px; height: 50px">${row.lst}</div>`; // LST
        cells[7].innerHTML = `<div class="alert alert-success" style="margin:auto; width: 75px; height: 50px">${row.lft}</div>`; // LFT
        cells[8].innerHTML = `<div class="alert alert-success" style="margin:auto; width: 75px; height: 50px">${row.slack}</div>`; // Slack Time
    }

    // Validates inputs to determine if calculate should be available
    valid();
}

updateTable(); // Initial update to table