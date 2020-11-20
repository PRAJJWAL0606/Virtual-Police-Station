var firidnumber;

$(document).ready(function (){  
    var psname = document.getElementById('policeStationname')
    psname.textContent = sessionStorage.getItem('policestationname');
    var tracking = document.getElementById('Tracking');
    var filed = document.getElementById('Filed');
    var completed = document.getElementById('Completed');
    var detailfir = document.getElementById('detailfir');
    
    $.ajax({
        type: "GET",
        url: "/getfiledfiradmin",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                for(var x=0;x<msg.length;x++){
                    var maindiv = document.createElement('div');
                    maindiv.setAttribute('class','list-group-item list-group-item-action flex-column align-items-start');
                    maindiv.setAttribute('onClick', "getdetails('" + msg[x]._id + "')");
                    var subdiv = document.createElement('div');
                    subdiv.setAttribute('class','d-flex w-100 justify-content-between');

                    var heading = document.createElement('h5');
                    heading.setAttribute('class','mb-1');
                    heading.textContent = msg[x].subject;
                    subdiv.appendChild(heading);

                    var smalltg = document.createElement('small');
                    smalltg.setAttribute('class','text-muted');
                    smalltg.textContent = msg[x].date;
                    subdiv.appendChild(smalltg);

                    maindiv.appendChild(subdiv);

                    if(msg[x].image != "null"){
                        var image = document.createElement('img');
                        image.setAttribute('class','imgitem');
                        image.src = msg[x].image;
                        maindiv.appendChild(image);
                    }

                    var p1 = document.createElement('p');
                    p1.setAttribute('class',"mb-1");
                    p1.textContent = "Description : "+msg[x].description;
                    maindiv.appendChild(p1);

                    var p2= document.createElement('p');
                    p2.setAttribute('class',"mb-1");
                    p2.textContent = "Message : "+msg[x].message;
                    maindiv.appendChild(p2);
                    
                    if(msg[x].status == "Tracking"){
                        tracking.appendChild(maindiv);
                    }
                    else if(msg[x].status == "Filed"){
                        filed.appendChild(maindiv);
                    }
                    else{
                        completed.appendChild(maindiv);
                    }
                }
                var p = document.createElement('p');
                p.textContent = "No FIR Selected yet , Choose FIR to view details";
                detailfir.appendChild(p);
            }
            else{
                var p1 = document.createElement('p');
                p1.textContent="No FIR Tracking yet";
                tracking.appendChild(p1);      
                p1.textContent = "No FIR Filed yet";
                filed.appendChild(p1);
                p1.textContent = "No FIR Completed yet";
                completed.appendChild(p1);
                var p = document.createElement('p');
                p.textContent = "No FIR To Select from";
                detailfir.appendChild(p);
            }
        },
    });
});


function getdetails(idnumber) {
    var maindiv = document.getElementById('detailfir');
    maindiv.innerHTML = "";
    firidnumber = idnumber;
    console.log('div was clicked with ' + idnumber);
    var test = {
        'idnumber': idnumber
    };
    $.ajax({
        type: "GET",
        url: "/getdetailfir",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {

                var subdiv = document.createElement('div');
                subdiv.setAttribute('class','d-flex w-100 justify-content-between');

                var heading = document.createElement('h5');
                heading.setAttribute('class','mb-1');
                heading.textContent = msg[0].subject;
                
                var breakdiv = document.createElement('br');
                heading.appendChild(breakdiv);
                var p1 = document.createElement('p');
                p1.setAttribute('class',"mb-1");
                p1.textContent = "Description : "+msg[0].description;
                p1.style.fontSize = "14px";
                heading.appendChild(p1);

                var p2= document.createElement('p');
                p2.setAttribute('class',"mb-1");
                p2.textContent = "Message : "+msg[0].message;
                
                p2.style.fontSize = "14px";
                heading.appendChild(p2);
                
                subdiv.appendChild(heading);
                heading.style.color = "white";
                if(msg[0].image != "null"){
                    var image = document.createElement('img');
                    image.setAttribute('class','imgdetail');
                    image.src = msg[0].image;
                    image.alt = "Avatar";
                    maindiv.appendChild(image);     
                    var smalltg = document.createElement('small');
                    smalltg.setAttribute('class','text-muted');
                    smalltg.appendChild(image)
                    subdiv.appendChild(smalltg);
                }
                maindiv.appendChild(subdiv);

                
            } 
            else {
                var p1 = document.createElement('p');
                p1.textContent="Something went wrong !! Choose again";
                maindiv.appendChild(p1);
            }
        },
        data: test,
    });
}


const buttonmsg = document.getElementById('sendmsg');

buttonmsg.addEventListener('click', function(e) {
  console.log('button was clicked');
    let updatefir = {
        idnumber: firidnumber,    
        message: document.getElementById('msgadmin').value
    };
    $.ajax({
        type: "POST",
        url: "/sendmsgadmin",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/adminfirtracking";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: updatefir
    });
});


const filedbtn = document.getElementById('filedbtn');

filedbtn.addEventListener('click', function(e) {
  console.log('button was clicked');
    let updatefir = {
        idnumber: firidnumber,    
        status:"Filed"
    };
    $.ajax({
        type: "POST",
        url: "/updatefirstatus",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/adminfirtracking";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: updatefir
    });
});


const trackedbtn = document.getElementById('trackedbtn');

trackedbtn.addEventListener('click', function(e) {
  console.log('button was clicked');
    let updatefir = {
        idnumber: firidnumber,    
        status:"Tracking"
    };
    $.ajax({
        type: "POST",
        url: "/updatefirstatus",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/adminfirtracking";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: updatefir
    });
});


const compbtn = document.getElementById('completedbtn');

compbtn.addEventListener('click', function(e) {
  console.log('button was clicked');
    let updatefir = {
        idnumber: firidnumber,    
        status:"Completed"
    };
    $.ajax({
        type: "POST",
        url: "/updatefirstatus",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/adminfirtracking";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: updatefir
    });
});
