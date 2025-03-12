const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//config body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//enable cors
app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/name', function (req, res) {
    res.send('My name is Aeedy');
})

app.get('/surname', function (req, res) {
    res.send('My sur name is Chaisan');
})

app.get('/info', function (req, res) {
    const info = { 
        name: 'Aeedy',
        surname: 'Chaisan',
        age : 25
    }
    res.json(info);
})

app.get('/students', function (req, res) { 
    var studentList = [
        {
            "name": "John",
            "age": 20,
            "city": "New York"
        },
        {
            "name": "Doe",
            "age": 25,
            "city": "California"
        },
        {
            "name": "Smith",
            "age": 30,
            "city": "Texas"
        }
    ];

    res.json(studentList);
});


app.post('/students', function (req, res) {

    var studentList = [
        {
            "name": "John",
            "age": 20,
            "city": "New York"
        },
        {
            "name": "Doe",
            "age": 25,
            "city": "California"
        },
        {
            "name": "Smith",
            "age": 30,
            "city": "Texas"
        }
    ];

    var student = req.body;
    console.log(student);

    //add student to list
    studentList.push(student);

    //Insert to database
    //db.insert(student);



    //return updated list
    res.json(studentList);
});


app.listen(3001);
console.log('Rest API running at http://localhost:3001/');