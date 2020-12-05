$(document).ready(function (){
    var psname = document.getElementById('policeStationname');
    psname.textContent = sessionStorage.getItem('policestationname');
    var tracking = document.getElementById('Tracking');
    var filed = document.getElementById('Filed');
    var completed = document.getElementById('Completed');

    $.ajax({
        type: "GET",
        url: "/getfiledfiruser",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                for(var x=0;x<msg.length;x++){
                    var maindiv = document.createElement('div');
                    maindiv.setAttribute('class','list-group-item list-group-item-action flex-column align-items-start');

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
            }
            else{
                var p1 = document.createElement('p');
                p1.textContent="No FIR Tracking yet";
                tracking.appendChild(p1);      
                p1.textContent = "No Firs Filed yet";
                filed.appendChild(p1);
                p1.textContent = "No Firs Completed yet";
                completed.appendChild(p1);
            }
        },
    });
});


// function checkEmptyString(val) {
//     return (val == undefined || val == null || val.trim().length == 0);
// }

