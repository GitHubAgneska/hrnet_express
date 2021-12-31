const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const cors = require('cors')
const fetch = require("node-fetch")
const faker = require("faker");
const _  = require('lodash')

const states = require('./public/data/usStates')

/* miragejs config
const server = require('./db/api/server')
const { client, get } = require('./db/api/client')
*/
const employeesService = require('./services/employeesService')

const router = express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./public/scratch');
}

localStorage.clear()

//add the router
app.use('/', router);
// Handle CORS issues
app.use(cors())

// Jquery files
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// Static Files (imgs, css, ..)
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))


router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname = resolve project folder
})


/* miragejs config
server.makeServer()
*/
let emp = new Object()
emp.list = [];
void function() {
    localStorage.clear()
    /* fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => employeesService.setListToStorage(data))
        .catch(error => console.log(error)) */
        for (let i = 0; i < 100; i++) {
            let fakeEmployee = new Object({
                id: Math.ceil(Math.random()).toString(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                startDate: faker.date.past( 10, new Date()),
                department: faker.random.arrayElement([ 'engineering', 'human resources', 'legal', 'marketing', 'sales' ]),
                //department: departments[Math.floor(Math.random() * departments.length)],
                dateOfBirth: faker.date.past(50, new Date(2002, 0, 1)), // -- keep date's ISO original format, then format to dd/mm/yyyy only when rendering
                street: (faker.datatype.number()).toString() + ' ' + faker.address.streetName(),
                city: faker.address.city(),
                state: (faker.random.arrayElement(states)),
                zipcode: _.times(5, () => _.sample('123456789')).join(''),
            })
            emp.list.push(fakeEmployee)
        }
        return localStorage.setItem("allEmployees", JSON.stringify(emp))
}();


app.get('/employees', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/employee-list.html'))
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


