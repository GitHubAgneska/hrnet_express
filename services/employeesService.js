const Employee = require('../db/models/employeeModel')
const { client, get }= require('../db/api/client')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports.setListToStorage = (list) => {
    console.log('setListToStorage called')
    localStorage.setItem("allEmployees", JSON.stringify(list))
}

/* module.exports.getEmployeesList = async (req, res) => {
    let response = {}

    try {
        const responseFromService = JSON.parse(localStorage.getItem('allEmployees'))
        response.body = responseFromService

    } catch (error) {
        console.log('Error in userController.js')
        response.status = 400
    }
    return res.status(response.status).send(response)
}
 */
module.exports.createEmployee = async (req, res, employee ) => {
    let newEmployee = new Employee(
        employee.firstName,
        employee.lastName,
        employee.startDate,
        employee.department,
        employee.dob
    );
    newEmployee.id = Math.random();
    newEmployee.address = new Object( employee.street, employee.city, employee.state, employee.zipCode );
    console.log('new employee = ', newEmployee);

    // 1st retrieve whole employees array from storage
    let employees = JSON.parse(localStorage.getItem("allEmployees"));
    if (employees == null) employees = [];
    // 2d set new employee to localStorage
    storage.setItem(newEmployee.id, JSON.stringify(newEmployee));
    // 3d append new employee to allEmployees array from localStorage
    employees.push(newEmployee);
    // 4 set updated array of allEmployees to localstorage
    localStorage.setItem("allEmployees", JSON.stringify(allEmployees));
}


/* /* miragejs config --- compatibility nodejs issue.......
module.exports.getEmployeesListFromMirage = async(req, res) => {
    localStorage.clear()
    let response = {}
    letresponseFromMirage
    console.log('request started')
    try { 
        const responseFromMirage = get('/fakeApi/employees')
        .then(response.body = responseFromMirage)
        .then(console.log('responseFromMirage=>', responseFromMirage))
        .then(localStorage.setItem("allEmployees", JSON.stringify(responseFromMirage)))
    }
    catch (error) {
        console.log('Error in userController.js when fetching from Mirage=>', error)
        response.status = 400
    }
    // return res.status(response.status).send(response)
} */
