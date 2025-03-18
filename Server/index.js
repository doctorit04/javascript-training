const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//config body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//enable cors
app.use(cors())

//register route
require('./src/route')(app);

app.listen(3001);
console.log('Rest API running at http://localhost:3001/');