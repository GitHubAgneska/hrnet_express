// $( function() {} = shortcut for '$(document).ready(function(){})' (IIFE)
$(function() {
    const employees = JSON.parse(localStorage.getItem('employees'));

    // JQUERY PLUGIN : data table
    // reported issues: slow to load new data when new employee added (creating and loading the whole table each time )
    $('#employee-table').DataTable({
        data: employees,
        columns: [
            { title: 'First Name', data: 'firstName' },
            { title: 'Last Name', data: 'lastName' },
            { title: 'Start Date', data: 'startDate' },
            { title: 'Department', data: 'department' },
            { title: 'Date of Birth', data: 'dateOfBirth' },
            { title: 'Street', data: 'street' },
            { title: 'City', data: 'city' },
            { title: 'State', data: 'state' },
            { title: 'Zip Code', data: 'zipCode' },
        ]
    });
});