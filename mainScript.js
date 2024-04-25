// Add Row Function - make sure it matches working table rows to ensure synchronization between original rows and added rows
$(document).ready(function () {

    function addNewRow() {
        var newRow = $("<tr>");
        newRow.append('<td><input type="text" class="form-control form-control-lg name-input" placeholder="Name" size="15"></td>');
        newRow.append('<td><select name="successors" class="form-select presuc-input predecessor" placeholder="Predecessors" multiple><option></option></select></td>');
        newRow.append('<td><select name="successors" class="form-select presuc-input successor" placeholder="Successors" multiple><option></option></select></td>');
        newRow.append('<td><input type="text" class="form-control form-control-lg" placeholder="Duration" size="7"></td>');
        newRow.append('<td><div class="alert alert-success" style="margin:auto; width: 75px; height: 50px"></div></td>');
        newRow.append('<td><div class="alert alert-success" style="margin:auto; width: 75px; height: 50px"></div></td>');
        newRow.append('<td><div class="alert alert-success" style="margin:auto; width: 75px; height: 50px"></div></td>');
        newRow.append('<td><div class="alert alert-success" style="margin:auto; width: 75px; height: 50px"></div></td>');
        newRow.append('<td><div class="alert alert-success" style="margin:auto; width: 75px; height: 50px"></div></td>');
        newRow.append('<td><input type="button" class="btn btn-danger" style="height: 50px;" value="Delete Row" onclick="deleteRow(this)"></td>');

        $(".possibleInputTable").append(newRow);
    }

    $("#addButton").click(function () {
        addNewRow();
    });
});


// Listener for toggle switch
const toggleSwitch = document.getElementById('toggle');
const toggleLabel = document.getElementById('toggle-label');

toggleSwitch.addEventListener('change', function () {
    // OFF
    if (this.checked) {
        toggleOff()
    }
    // ON
    else {
        toggleOn();
    }
});

// Toggle Switch On Function
function toggleOn() {
    calculate(true);
}

// Toggle Switch Off Function
function toggleOff() {
    calculate(false);
}