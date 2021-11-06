const express = require('express')
const router = express.Router()
const employeesService = require('../services/employeesService')
// const userController = require('../controllers/userController')
// const tokenValidation = require('../middleware/tokenValidation')

app.get('/employees', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/employee-list.html'))
})
module.exports = router
