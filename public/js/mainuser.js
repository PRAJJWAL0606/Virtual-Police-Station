$(document).ready(function (){
    
    var mainlist = document.getElementById('policestationlist');
    $.ajax({
        type: "GET",
        url: "/getpolicestation",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                for(var x=0;x<msg.length;x++){
                    var maindiv = document.createElement('div');
                    maindiv.setAttribute('class','list-group-item list-group-item-action');

                    var subdiv = document.createElement('div');
                    subdiv.setAttribute('class','d-flex w-100 justify-content-between');

                    var heading = document.createElement('h5');
                    heading.setAttribute('class','mb-1');
                    heading.textContent = msg[x].policeStationname;
                    
                    heading.setAttribute('onClick', "getpoliceStationinfo('" + msg[x]._id + "')");
                    subdiv.appendChild(heading);
                    var smalltg = document.createElement('small');

                    var image = document.createElement('img');
                    image.setAttribute('class','imgpolicestation');
                    image.src = msg[x].image;
                    smalltg.appendChild(image);
                    
                    
                    subdiv.appendChild(smalltg);
                    maindiv.appendChild(subdiv);

                    var p1 = document.createElement('p');
                    p1.setAttribute('class',"mb-1");
                    p1.textContent = "Address : "+msg[x].address;
                    maindiv.appendChild(p1);

                    var small = document.createElement('small');
                    var btn = document.createElement('button');
                    btn.setAttribute('class','btn btn-light');
                    btn.textContent = "Alert";
                    btn.style.zIndex = -1;
                    btn.setAttribute('onClick', "alertPoliceStation('" + msg[x]._id + "'); return false;");

                    small.appendChild(btn);
                    maindiv.appendChild(small);
                    maindiv.style.zIndex = 1;
                    mainlist.appendChild(maindiv);
                }
            }
            else{
                var p1 = document.createElement('p');
                p1.textContent="No Police Station nearby";
                mainlist.appendChild(p1);
            }
        },
    });
});


function alertPoliceStation(idnumber) {
    var test = {
        'idnumber': idnumber
    };
    $.ajax({
        type: "GET",
        url: "/getuserDetails",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {

                    var test1 = {
                        'policeStationid': idnumber,
                        'name':msg[0].username,
                        'contactno':msg[0].contactno,
                        'emailid':msg[0].emailid
                    };
                    $.ajax({
                        type: "POST",
                        url: "/alertPoliceStation",
                        dataType: "json",
                        success: function (msg) {
                            if (msg.length > 0) {
                                
                                alert("Suceesfully sent the alert to the police Station !!");
                            } 
                            else {
                                alert("Something went wrong try again!!");
                            }
                        },
                        data: test1,
                    });
                
            } 
            else {
                alert("Something went wrong try again!!");
            }
        },
        data: test,
    });
}

function getpoliceStationinfo(idnumber){
    location.href = "/policestationmain/"+idnumber;
}