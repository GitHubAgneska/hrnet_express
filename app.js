const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const cors = require('cors')

const router = express.Router();

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
});

app.get('/employees', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/employee-list.html'))
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


