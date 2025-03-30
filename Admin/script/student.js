


    /*
    $(document).ready(function() {
        
    });
    */


    //--- Using jQuery document ready function ---///
    //document ready function
    $(function () {


        //Ajax fetch student data
        $.ajax({
            url: "http://localhost:3001/db/students",
            type: "GET",
            success: function(data) {

                console.log("Load data successfully");
                displayData(data);

                //Data Table
                $("#example1").DataTable(
                    {
                        "responsive": true, "lengthChange": false, "autoWidth": false,
                        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
                        'columnDefs': [
                            {'width': '10%', 'targets': 4},
                            {'width': '10%', 'targets': 5},
                        ],
                    }
                  ).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

            },
            error: function(error) {
                console.log(error);
            }
        });


        /*
      $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
        */

    });


    //--- Other way to load data from server using fetch API ---///
    //window load function
    window.onload = async function() {
        const url = "http://localhost:3001/db/students";
        const response = await getStudentData(url);
        console.log(response);
    }

    async function getStudentData(url) { 
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    //-- display data --//
    function displayData(allStudents) {

        var studentList = document.getElementById('studentList');
            var html = "";
            allStudents.forEach(student => {
                html += `<tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.city}</td>
                    <td><button type="button" class="btn btn-block btn-warning" onclick="onEditStudent(${student.id})" ><i class="fa fa-pen"></i> Edit</button></td>
                    <td><button type="button" class="btn btn-block btn-danger" onclick="onDeleteStudent(${student.id})"><i class="fa fa-trash"></i> Delete</button></td>
                </tr>`;
            });

            studentList.innerHTML = html;
    }

    async function onEditStudent(id) {
        
        //call student data from server
        const url = `http://localhost:3001/db/students/${id}`;
        const response = await getStudentData(url);
        console.log(response);

        //set data to modal
        //document.getElementById("name").value = response.name;
        //document.getElementById("age").value = response.age;
        //document.getElementById("city").value = response.city;
        //document.getElementById("studentId").value = response.id;

        //set data to modal with jQuery
        $("#name").val(response.name);
        $("#age").val(response.age);
        $("#city").val(response.city);
        $("#studentId").val(response.id);

        $("#modal-student").modal("show");
    }

    async function onSaveChange() {

        //get data from modal
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const city = document.getElementById("city").value;
        const id = document.getElementById("studentId").value;

        //get data from modal with jQuery
        //const name = $("#name").val();
        //const age = $("#age").val();
        //const city = $("#city").val();
        //const id = $("#studentId").val();

        //create object
        const data = {
            name: name,
            age: age,
            city: city
        }
        console.log(data);


        const url = `http://localhost:3001/db/students/${id}`;
        const result = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        //check if result is ok
        if (result.ok) {
            //show success message 1500 ms
            Swal.fire({
                position: "top-end",
                icon: 'success',
                title: 'Save Success',
                text: 'You have saved the student data!',
                timer: 1500,
                showConfirmButton: false, //remove confirm button
            })

            //close modal
            $("#modal-student").modal("hide");

        } else {
            //show error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong!',
            })
        }
    }


    function onDeleteStudent(id) {
        //$("#modal-delete").modal("show");
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (action) => {
            if (action.isConfirmed) {

                //delete student data
                const url = `http://localhost:3001/db/students/${id}`;
                const result = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
     
                //check if result is ok
                if (result.ok) {
                    //show delete success message 1500 ms

                    Swal.fire({
                        position: "top-end",
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false, //remove confirm button
                    });

                    //close modal
                    $("#modal-student").modal("hide");

                } else {
                    //show error message
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Something went wrong!',
                    })
                }
            } //end if action

          });

    } //end function onDeleteStudent
