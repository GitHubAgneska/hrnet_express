const Employee = require('../db/models/employeeModel')
const storage = window.localStorage;
const uuidv4 = require("uuid/v4")

module.exports.getEmployeesList = async (req, res) => {
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

module.exports.createEmployee = async (req, res, employee ) => {
    let newEmployee = new Employee(
        employee.firstName,
        employee.lastName,
        employee.startDate,
        employee.department,
        employee.dob
    );
    newEmployee.id = uuidv4();
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

module.exports.getEmployee = async (req, res, id) => {

}
