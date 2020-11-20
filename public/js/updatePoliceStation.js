var psname = document.getElementById('policeStationname')

psname.textContent = sessionStorage.getItem('policestationname');

const button = document.getElementById('submit');

button.addEventListener('click', function(e) {
    var sel = document.getElementById("field");
    var fieldname = sel.options[sel.selectedIndex].value;

  console.log('button was clicked');
    let updateinfo = {
        fieldname: fieldname,
        info:document.getElementById('info').value
    };

    $.ajax({
        type: "POST",
        url: "/updatepolicestation",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/policestationadmin";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: updateinfo
    });
});
