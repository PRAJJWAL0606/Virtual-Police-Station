$(document).ready(function (){
    maincol = document.getElementById('missinglist');
    $.ajax({
        type: "GET",
        url: "/getmissingperson",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                for(var x=0;x<msg.length;x++){
                    var maindiv = document.createElement('div');
                    maindiv.setAttribute('class','card mb-3');
                    maindiv.style.maxWidth = "540px";

                    var subdiv = document.createElement('div');
                    subdiv.setAttribute('class','row no-gutters');

                    var div1 = document.createElement('div');
                    div1.setAttribute('class','col-md-4');

                    var image = document.createElement('img');
                    image.setAttribute('class','card-img');
                    image.src = msg[x].image;
                    image.alt="...";
                    div1.appendChild(image);
                    subdiv.appendChild(div1);

                    var div2 = document.createElement('div');
                    div2.setAttribute('class','col-md-8');

                    var div2sub = document.createElement('div');
                    div2sub.setAttribute('class','card-body');

                    var heading = document.createElement('h5');
                    heading.setAttribute('class','card-title');
                    heading.textContent = "Description";

                    var p1 = document.createElement('p');
                    p1.setAttribute('class','card-text');
                    p1.textContent = msg[x].description;
                    
                    var p2 = document.createElement('p');
                    p2.setAttribute('class','card-text');
                    p2.textContent = msg[x].date;

                    div2sub.appendChild(heading);
                    div2sub.appendChild(p1);
                    div2sub.appendChild(p2);
                    div2.appendChild(div2sub);
                    subdiv.appendChild(div2);

                    maindiv.appendChild(subdiv);
                    maincol.appendChild(maindiv);
                }
            }
            else{
                var p1 = document.createElement('p');
                p1.textContent="No Missing Person yet !!";
                maincol.appendChild(p1);      
            }
        },
    });
});


// function checkEmptyString(val) {
//     return (val == undefined || val == null || val.trim().length == 0);
// }

