const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//import student model
const Student = require('./src/student.model');

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
            "id": 1,
            "name": "John",
            "age": 20,
            "city": "New York"
        },
        {
            "id": 2,
            "name": "Doe",
            "age": 25,
            "city": "California"
        },
        {
            "id": 3,
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


app.delete('/students/:id', function (req, res) {

    console.log(req.params.id);
    var studentList = [
        {
            "id": 1,
            "name": "John",
            "age": 20,
            "city": "New York"
        },
        {
            "id": 2,
            "name": "Doe",
            "age": 25,
            "city": "California"
        },
        {
            "id": 3,
            "name": "Smith",
            "age": 30,
            "city": "Texas"
        }
    ];

    //get id from url
    var id = req.params.id;

    //find index by student id
    var index = studentList.findIndex(student => student.id == id);

    //if not found return message
    if(index == -1){
        return res.status(404).json({message: "No student found"});
    }   

    //filter student from list except the student to be deleted
    studentList = studentList.filter(student => student.id != id);
    
    console.log(studentList);

    //return updated list
    res.json(studentList);

});


//** Rest API from Database */
app.get('/db/students', function (req, res) {
    try {
        //query all students
        Student.findAll().then(students => {
            res.json(students);
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
 });

 app.post('/db/students', function (req, res) {
    try {
        //object student from request
        var student = req.body;
        console.log(student);

        //create student
        Student.create(student).then(student => {
            res.json(student);
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
 });



app.listen(3001);
console.log('Rest API running at http://localhost:3001/');