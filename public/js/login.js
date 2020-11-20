const button = document.getElementById('loginsubmit');
var role = document.getElementById('role');

button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let person = {
        username: document.getElementById('username').value,    
        password: document.getElementById('password').value,
        role: document.getElementById('role').value,
    };

    // if (checkEmptyString(person.username))
    // {
    //     alert('User name is required');
    //     return;
    // }
 
    $.ajax({
        type: "POST",
        url: "/login",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                if(msg[0].role == "admin"){  
                    location.href = "/policestationadmin";
                }
                else if(msg[0].role="main admin"){
                    location.href="/addpoliceStation";
                }
                else{
                    location.href= "/mainuserpage";
                }
            }
            else {
                alert("Invalid User !");
            }
        },
        data: person
    });
});

// function checkEmptyString(val)
// {
//     return (val == undefined || val == null || val.trim().length == 0);
// }
