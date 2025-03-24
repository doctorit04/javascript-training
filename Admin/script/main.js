function showError(message) { 
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    })
}


window.onload = function(){

    document.getElementById("btnLogin").addEventListener("click", function() {
        
        //read data from form
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        //validate data
        if(username == "" || password == "") {
            showError('Username or Password is missing!');
            return;
        }

        //create data object
        var data = {
            username: username,
            password: password,
        };

        login(data);
    });
}

async function login(data) {
    
    try 
    {
        const url = 'http://localhost:3001/login';
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        if(result.status == 200) {
        
            //show success message 1500 ms
            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                text: 'You are logged in!',
                showConfirmButton: false, //remove confirm button
            })

            //redirect to home page after 1500 ms
            setTimeout(function(){
                //redirect to home page
                window.location.href = 'dashboard.html';
            }, 1500);

        }
        else {
            //alert('Invalid username or password');
            showError('User or Password incorrect!');
        }
    }
    catch(error) {
        showError('Connection problem!');
    }

}   