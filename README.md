### Express base environment to compile basic html/js project
---

#### Install
```bash
npm init
npm install express --save
```

#### Init
- create a app.js file with base scaffolding code:
```bash
// Imports
const express = require('express')
const app = express()
const port = 5000

// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))
```
- launch : `node app.js`

- basic app structure (with pug template engine)
```bash
    .
    ├── app.js  
    ├── package.json
    ├── public
    │   ├── images
    │   ├── javascripts
    │   └── stylesheets
    │       └── style.css
    ├── routes
    │   ├── index.js
    │   └── users.js
    └── views
        ├── error.pug
        ├── index.pug
        └── layout.pug

```
