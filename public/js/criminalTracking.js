const button = document.getElementById('submit');
var psname = document.getElementById('policeStationname')

psname.textContent = sessionStorage.getItem('policestationname');
button.addEventListener('click', function(e) {

  console.log('button was clicked');
    let criminal = {
        name: document.getElementById('name').value,    
        image: document.getElementById('image').value,
        type: "Criminal",
        reward:document.getElementById('reward').value,
        description:document.getElementById('description').value,
        contactno:document.getElementById('contactno').value,
        suspensionDate:"Not Appropriate",
        salary:"Not Appropiate",
        behaviour:"Not Appropiate"
    };

    $.ajax({
        type: "POST",
        url: "/addcriminal",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/admincriminaltracking";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: criminal
    });
});




$(document).ready(function (){
    maincol = document.getElementById('criminallist');
    $.ajax({
        type: "GET",
        url: "/getcriminallist",
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
                    heading.textContent = msg[x].name;

                    var p1 = document.createElement('p');
                    p1.setAttribute('class','card-text');
                    p1.textContent = 'Description : '+ msg[x].description;
                    
                    var p2 = document.createElement('p');
                    p2.setAttribute('class','card-text');
                    p2.textContent = msg[x].reward;
                    

                    div2sub.appendChild(heading);
                    div2sub.appendChild(p1);
                    div2sub.appendChild(p2);
                    
                    //table 
                    var table = document.createElement('table');
                    table.style.overflowY = "scroll";
                    table.style.height = "100px !important";

                    //table heading
                    var tableh = document.createElement("thead");
                    var tablehr = document.createElement("tr");
                    var tablehh1 = document.createElement('th');
                    var tablehh2 = document.createElement('th');
                    var tablehh3 = document.createElement('th');
                    tablehh1.scope = "col";
                    tablehh2.scope = "col";
                    tablehh3.scope = "col";
                    tablehh1.textContent = "Feild";
                    tablehh2.textContent = "Detail";
                    tablehh3.textContent = "Edit";

                    tablehr.appendChild(tablehh1);
                    tablehr.appendChild(tablehh2);
                    tablehr.appendChild(tablehh3);

                    tableh.appendChild(tablehr);
                    table.appendChild(tableh);

                    //tablebody
                    var tablebody = document.createElement('tbody');

                    //contact no
                    var tbtr1 = document.createElement('tr');
                    var tbtr1h = document.createElement('th');
                    tbtr1h.scope = "row";
                    tbtr1h.textContent = "Contact No";
                    var tbtr1d1 = document.createElement('td');
                    tbtr1d1.textContent = msg[x].contactno;

                    var tbtr1d2 = document.createElement('td');
                    var divinput = document.createElement('div');
                    divinput.setAttribute('class','input-group mb-3');
                    var input = document.createElement('input');
                    input.type = "text";
                    input.setAttribute('class','form-control');
                    input.placeholder = "Enter contact no";
                    input.id = "contact"+msg[x]._id;
                    divinput.appendChild(input);

                    var divbtnsubmit = document.createElement('div');
                    divbtnsubmit.setAttribute('class','input-group-append');
                    var btnsumit = document.createElement('button');
                    btnsumit.setAttribute('class','btn btn-outline-secondary');
                    btnsumit.setAttribute('onClick', "updatecontactno('" + msg[x]._id + "')");
                    
                    var btnicon = document.createElement('i');
                    btnicon.setAttribute('class','fa fa-pencil');
                    btnicon.setAttribute("aria-hidden","true");

                    btnsumit.appendChild(btnicon);
                    divbtnsubmit.appendChild(btnsumit);
                    divinput.appendChild(divbtnsubmit);

                    tbtr1d2.appendChild(divinput);
                    tbtr1.appendChild(tbtr1h);
                    tbtr1.appendChild(tbtr1d1);
                    tbtr1.appendChild(tbtr1d2);


                    //type
                    var tbtr2 = document.createElement('tr');
                    var tbtr2h = document.createElement('th');
                    tbtr2h.scope = "row";
                    tbtr2h.textContent = "Type";
                    var tbtr2d1 = document.createElement('td');
                    tbtr2d1.textContent = msg[x].type;

                    var tbtr2d2 = document.createElement('td');
                    var divinput2 = document.createElement('div');
                    divinput2.setAttribute('class','input-group mb-3');
                    var input2 = document.createElement('input');
                    input2.type = "text";
                    input2.setAttribute('class','form-control');
                    input2.placeholder = "Enter Type";
                    input2.id = "type"+msg[x]._id;
                    divinput2.appendChild(input2);

                    var divbtnsubmit2 = document.createElement('div');
                    divbtnsubmit2.setAttribute('class','input-group-append');
                    var btnsumit2 = document.createElement('button');
                    btnsumit2.setAttribute('class','btn btn-outline-secondary');
                    btnsumit2.setAttribute('onClick', "updatetype('" + msg[x]._id + "')");
                
                    var btnicon2 = document.createElement('i');
                    btnicon2.setAttribute('class','fa fa-pencil');
                    btnicon2.setAttribute("aria-hidden","true");

                    btnsumit2.appendChild(btnicon2);
                    divbtnsubmit2.appendChild(btnsumit2);
                    divinput2.appendChild(divbtnsubmit2);

                    tbtr2d2.appendChild(divinput2);
                    tbtr2.appendChild(tbtr2h);
                    tbtr2.appendChild(tbtr2d1);
                    tbtr2.appendChild(tbtr2d2);

                    tablebody.appendChild(tbtr1);
                    tablebody.appendChild(tbtr2);

                    table.appendChild(tablebody);

                    div2sub.appendChild(table);
                    div2.appendChild(div2sub);
                    subdiv.appendChild(div2);
                    maindiv.appendChild(subdiv);
                    maincol.appendChild(maindiv);
                }
            }
            else{
                var p1 = document.createElement('p');
                p1.textContent="No Crminals yet !!";
                maincol.appendChild(p1); 
            }
        },
    });
});



function updatecontactno(idnumber) {
    var t = document.getElementById('contact'+idnumber);
    console.log('div was clicked with ' + idnumber);
    var test = {
        'idnumber': idnumber,
        'contactno':t.value
    };
    $.ajax({
        type: "POST",
        url: "/updatecriminalcontact",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href="/admincriminaltracking";
            } 
            else {
                alert("Something went wrong try again!!");
            }
        },
        data: test,
    });
}



function updatetype(idnumber) {
    var t = document.getElementById('type'+idnumber);
    console.log('div was clicked with ' + idnumber);
    var test = {
        'idnumber': idnumber,
        'type':t.value
    };
    $.ajax({
        type: "POST",
        url: "/updatecriminaltype",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href="/admincriminaltracking";
            } 
            else {
                alert("Something went wrong try again!!");
            }
        },
        data: test,
    });
}
