const button = document.getElementById('submit');

button.addEventListener('click', function(e) {

  console.log('button was clicked');
    let fir = {
        username:document.getElementById('username').value,
        password:document.getElementById('password').value,
        role:"citizen",
        policeStation:"null",
        contactno:document.getElementById('contactno').value,
        emailid:document.getElementById('email').value,
    };

    $.ajax({
        type: "POST",
        url: "/signupnewuser",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: fir
    });
});
