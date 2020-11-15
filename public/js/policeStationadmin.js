$(document).ready(function (){
    
    var mainlist = document.getElementById('alerts');
    $.ajax({
        type: "GET",
        url: "/getalerts",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                for(var x=0;x<msg.length;x++){
                    var maindiv = document.createElement('div');
                    maindiv.setAttribute('class','list-group-item list-group-item-action');

                    var p1 = document.createElement('p');
                    p1.setAttribute('class',"mb-1");
                    p1.textContent = "Name : "+msg[x].name;
                    maindiv.appendChild(p1);

                    var p2 = document.createElement('p');
                    p2.setAttribute('class',"mb-1");
                    p2.textContent = "Contact Number : "+msg[x].contactno;
                    maindiv.appendChild(p2);

                    var small = document.createElement('small');
                    var btn = document.createElement('button');
                    btn.setAttribute('class','btn btn-success');
                    btn.textContent = "Confirm";
                    btn.setAttribute('onClick', "confirmalert('" + msg[x]._id + "'); return false;");

                    small.appendChild(btn);
                    maindiv.appendChild(small);
                    mainlist.appendChild(maindiv);
                }
            }
            else{
                var p1 = document.createElement('p');
                p1.textContent="No Alerts yet !!";
                mainlist.appendChild(p1);
            }
        },
    });
});




function confirmalert(idnumber) {

    var test = {
        'idnumber': idnumber
    };
    $.ajax({
        type: "POST",
        url: "/confirmalert",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href="/policestationadmin";
            }
            else {
                alert("Something went wrong try again!!");
            }
        },
        data: test,
    });
}
