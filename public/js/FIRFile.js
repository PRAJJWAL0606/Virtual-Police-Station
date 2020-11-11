const button = document.getElementById('loginsubmit');
var e = document.getElementById("elementId");
var type = e.options[e.selectedIndex].value;

button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let fir = {
        subject: document.getElementById('username').value,    
        image: document.getElementById('password').value,
        type: type,
        description:document.getElementById('Description').value
    };

    $.ajax({
        type: "POST",
        url: "/filefir",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                href.location = "/firtracking";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: fir
    });
});
