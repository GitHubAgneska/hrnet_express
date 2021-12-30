// chunk adapted from redux official doc https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/master/?from-embed=&file=/src/api/server.js:0-3041
// https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/tutorial-steps?file=/src/App.js:0-6
/* eslint-disable no-unused-vars */

const { createServer,Model, Factory, hasMany, RestSerializer}  = require('miragejs'); // backend API mock
const faker = require('faker') // js library for generating fake data
const seedrandom = require ('seedrandom')
const _ = require('lodash')
const departments = require('../../public/data/departments')
const states = require('../../public/data/usStates')


const IdSerializer = RestSerializer.extend({ serializeIds: 'always' })

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.
let useSeededRNG = false

let rng = seedrandom()

if (useSeededRNG) {
    let randomSeedString = localStorage.getItem('randomTimestampSeed')
    let seedDate

    if (randomSeedString) {
        seedDate = new Date(randomSeedString)
    } else {
        seedDate = new Date()
        randomSeedString = seedDate.toISOString()
        localStorage.setItem('randomTimestampSeed', randomSeedString)
    }
    rng = seedrandom(randomSeedString)
    faker.seed(seedDate.getTime())
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array) => {
    const index = getRandomInt(0, array.length - 1)
    return array[index]
}


// export function makeServer({ environment = "development" } = {}) {
module.exports.makeServer = () => {

let server = createServer({
    
    //environment,

    routes() {
        this.namespace = 'fakeApi'
        this.timing = 2000

        this.resource('employee')  // define multiple Shorthands for a given resource => get/post/patch/del
        this.resource('employees-list')

        const server = this

        this.get("/employees", schema => {
            return schema.employees.all();
        });

        this.post('/employees-list', function (schema, req) { 
        // const data = this.normalizedRequestAttrs() // helper that returns the body of a request in a normalized form
        // console.log('NORMALIZED DATA==', data)
        const data = JSON.parse(req.requestBody);
        // schema.results.create(attrs);

        if (data.text === 'error') { throw new Error('Could not save the employee!')  }

        const result = server.create('employee', data)
        return result
        })
    },
    models: {
            employee: Model.extend({}),
            employeesList: Model.extend({ employees: hasMany() }),
    },
    factories: {
        employee: Factory.extend({
            
            id(i) { return Number(i) },
            firstName() { return faker.name.firstName() },
            lastName() { return faker.name.lastName() },
            dob() { return faker.date.past(50, new Date(2002, 0, 1)) }, // -- keep date's ISO original format, then format to dd/mm/yyyy only when rendering
            // dob() { return moment(faker.date.past(50, new Date(2002, 0, 1))).format('MM/DD/YYYY') }, 
            startDate() { return faker.date.past( 10, new Date()) },
            // startDate() { return moment(faker.date.recent()).format('MM/DD/YYYY') },
            street() { return (faker.datatype.number()).toString() + ' ' + faker.address.streetName() },
            city() { return faker.address.city() },
            state() { return randomFromArray(states) },
            zipcode() { return _.times(5, () => _.sample('123456789')).join('') },
            department() { return randomFromArray(departments) }
        }),
    },
    serializers: {
        employee: IdSerializer.extend({
            serialize(object, request) {
                // HACK Mirage keeps wanting to store integer IDs as strings. Always convert them to numbers for now.
                const numerifyId = (employee) => {
                    employee.id = Number(employee.id)
                }
                let json = IdSerializer.prototype.serialize.apply(this, arguments)

                if (json.employee) { numerifyId(json.employee) }
                else if (json.employees) { json.employees.forEach(numerifyId) }

                return json
            },
        }),
        employeesList: IdSerializer,
    },
    seeds(server) { server.createList('employee', 100) ; console.log('--generating list---')}
})

return server; }
