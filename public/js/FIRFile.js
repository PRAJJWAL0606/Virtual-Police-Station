const button = document.getElementById('submit');
var psname = document.getElementById('policeStationname');
psname.textContent = sessionStorage.getItem('policestationname');

button.addEventListener('click', function(e) {
    var sel = document.getElementById("Firtype");
    var Firtype = sel.options[sel.selectedIndex].value;

  console.log('button was clicked');
    let fir = {
        subject: document.getElementById('subject').value,    
        image: document.getElementById('imageurl').value,
        type: Firtype,
        description:document.getElementById('Description').value
    };

    $.ajax({
        type: "POST",
        url: "/filefir",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/firtracking";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: fir
    });
});
