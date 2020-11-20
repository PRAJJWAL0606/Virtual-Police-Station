const button = document.getElementById('submit');

button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let policeStation = {
        policeStationname:document.getElementById('policeStationname').value,
        address:document.getElementById('address').value,
        lat:document.getElementById('lat').value,
        lang:document.getElementById('lang').value,
        topOfficer1:document.getElementById('topOfficer1').value,
        topofficer2:document.getElementById('topofficer2').value,
        topofficer3:document.getElementById('topofficer3').value,
        SHOimage:document.getElementById('SHOimage').value,
        SHOContactno:document.getElementById('SHOContactno').value,
        SHOname:document.getElementById('SHOname').value,
        SHOEmail:document.getElementById('SHOEmail').value,
        SolvedCases:document.getElementById('SolvedCases').value,
        TotalCases:document.getElementById('TotalCases').value,
        image:document.getElementById('image').value
    };

    $.ajax({
        type: "POST",
        url: "/addnewpolicestation",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) { 

                let admindetails = {
                    username:document.getElementById('username').value,
                    password:document.getElementById('password').value,
                    role:"admin",
                    policeStation:msg[0].message,
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
                    data: admindetails
                });


            }
            else {
                alert("Invalid User !");
            }
        },
        data: policeStation
    });
});
