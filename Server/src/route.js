
//import student model
const Student = require('./student.model');
const User = require('./users.model');

//arrow function
const route = (app) => { 

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
      //query all students
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
      
      //query student by id
       app.get('/db/students/:id', async function (req, res) {
          try {
              
              const id = req.params.id;
              const student = await Student.findByPk(id);
      
              //check if student not found
              if(student == null){
                  return res.status(404).json({message: "Student not found"});
              }
      
              //return student
              res.json(student);
          }
          catch (error) {
              res.status(500).json({ message: error });
          }   
       });
      
      
      //insert student
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
      
      
       //update student
      app.put('/db/students/:id',async function (req, res) {
      
          try {
      
              //object student from request
              const id = req.params.id;
              var student = req.body;
              console.log(student);
      
              //check if student id is existed
              const studentExisted = await Student.findByPk(id);
      
              //check if student not found
              if(studentExisted == null){
                  return res.status(404).json({message: "Student not found"});
              }
      
              //update student
              Student.update(student, {
                  where: {
                      id: id
                  }
              }).then(() => {
                  return res.json(student);
              });
      
          }
          catch (error) {
              res.status(500).json({ message: error });
          }
          
       });
      
      
       //delete student
      app.delete('/db/students/:id', async function (req, res) { 
          try {
              const id = req.params.id;
      
              //check if student id is existed
              const studentExisted = await Student.findByPk(id);
      
              //check if student not found
              if(studentExisted == null){
                  return res.status(404).json({message: "Student not found"});
              }
      
              //delete student
              Student.destroy({
                  where: {
                      id: id
                  }
              }).then(() => {
                  return res.json({message: "Student deleted"});
              });
      
          }
          catch (error) {
              res.status(500).json({ message: error });
          }
      
      });
      

      //Login API
      app.post('/login', async function (req, res) {
          try {
                //object user from request
                var user = req.body;
                console.log(user);  

                //check if user is existed
                const userExisted = await User.findOne({
                    where: {
                        username: user.username,
                        password: user.password
                    }
                }); 

                //check if user not found
                if(userExisted == null){
                    return res.status(404).json({message: "User not found"});
                }

                //return user
                res.json(userExisted);
          }
          catch (error) {
              res.status(500).json({ message: error });
          }
       });
       
       
};

module.exports = route;