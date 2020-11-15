const button = document.getElementById('submit');

button.addEventListener('click', function(e) {

  console.log('button was clicked');
    let criminal = {
        name: document.getElementById('name').value,    
        image: document.getElementById('image').value,
        type: "Inmate",
        reward:"Not Appropiate",
        description:document.getElementById('description').value,
        contactno:"Not Appropiate",
        suspensionDate:document.getElementById('date').value,
        salary:document.getElementById('salary').value,
        behaviour:"Not Appropiate"
    };

    $.ajax({
        type: "POST",
        url: "/addinmate",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href = "/admininmatetracking";
            }
            else {
                alert("Invalid User !");
            }
        },
        data: criminal
    });
});




$(document).ready(function (){
    maincol = document.getElementById('inmatelist');
    $.ajax({
        type: "GET",
        url: "/getinmatelist",
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
                    p2.textContent = 'Suspension Date : ' + msg[x].suspensionDate;
                    

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

                    //wage
                    var tbtr1 = document.createElement('tr');
                    var tbtr1h = document.createElement('th');
                    tbtr1h.scope = "row";
                    tbtr1h.textContent = "Wage";
                    var tbtr1d1 = document.createElement('td');
                    tbtr1d1.textContent = msg[x].salary;

                    var tbtr1d2 = document.createElement('td');
                    var divinput = document.createElement('div');
                    divinput.setAttribute('class','input-group mb-3');
                    var input = document.createElement('input');
                    input.type = "text";
                    input.setAttribute('class','form-control');
                    input.placeholder = "Enter wage";
                    input.id = "wage"+msg[x]._id;
                    divinput.appendChild(input);

                    var divbtnsubmit = document.createElement('div');
                    divbtnsubmit.setAttribute('class','input-group-append');
                    var btnsumit = document.createElement('button');
                    btnsumit.setAttribute('class','btn btn-outline-secondary');
                    btnsumit.setAttribute('onClick', "updateinmatewage('" + msg[x]._id + "')");
                    
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
                    btnsumit2.setAttribute('onClick', "updateinmatetype('" + msg[x]._id + "')");
                
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


                    //behaviour
                    var tbtr3 = document.createElement('tr');
                    var tbtr3h = document.createElement('th');
                    tbtr3h.scope = "row";
                    tbtr3h.textContent = "Behaviour";
                    var tbtr3d1 = document.createElement('td');
                    tbtr3d1.textContent = msg[x].behaviour;

                    var tbtr3d2 = document.createElement('td');
                    var divinput3 = document.createElement('div');
                    divinput3.setAttribute('class','input-group mb-3');
                    var input3 = document.createElement('input');
                    input3.type = "text";
                    input3.setAttribute('class','form-control');
                    input3.placeholder = "Enter behaviour";
                    input3.id = "behaviour"+msg[x]._id;
                    divinput3.appendChild(input3);

                    var divbtnsubmit3 = document.createElement('div');
                    divbtnsubmit3.setAttribute('class','input-group-append');
                    var btnsumit3 = document.createElement('button');
                    btnsumit3.setAttribute('class','btn btn-outline-secondary');
                    btnsumit3.setAttribute('onClick', "updateinmatebehaviour('" + msg[x]._id + "')");
                
                    var btnicon3 = document.createElement('i');
                    btnicon3.setAttribute('class','fa fa-pencil');
                    btnicon3.setAttribute("aria-hidden","true");

                    btnsumit3.appendChild(btnicon3);
                    divbtnsubmit3.appendChild(btnsumit3);
                    divinput3.appendChild(divbtnsubmit3);

                    tbtr3d2.appendChild(divinput3);
                    tbtr3.appendChild(tbtr3h);
                    tbtr3.appendChild(tbtr3d1);
                    tbtr3.appendChild(tbtr3d2);


                    tablebody.appendChild(tbtr1);
                    tablebody.appendChild(tbtr2);
                    tablebody.appendChild(tbtr3);

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
                p1.textContent="No Inmates yet !!";
                maincol.appendChild(p1); 
            }
        },
    });
});



function updateinmatewage(idnumber) {
    var t = document.getElementById('wage'+idnumber);
    console.log('div was clicked with ' + idnumber);
    var test = {
        'idnumber': idnumber,
        'salary':t.value
    };
    $.ajax({
        type: "POST",
        url: "/updateinmatewage",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href="/admininmatetracking";
            } 
            else {
                alert("Something went wrong try again!!");
            }
        },
        data: test,
    });
}



function updateinmatetype(idnumber) {
    var t = document.getElementById('type'+idnumber);
    console.log('div was clicked with ' + idnumber);
    var test = {
        'idnumber': idnumber,
        'type':t.value
    };
    $.ajax({
        type: "POST",
        url: "/updateinmatetype",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href="/admininmatetracking";
            } 
            else {
                alert("Something went wrong try again!!");
            }
        },
        data: test,
    });
}


function updateinmatebehaviour(idnumber) {
    var t = document.getElementById('behaviour'+idnumber);
    console.log('div was clicked with ' + idnumber);
    var test = {
        'idnumber': idnumber,
        'behaviour':t.value
    };
    $.ajax({
        type: "POST",
        url: "/updateinmatebehaviour",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href="/admininmatetracking";
            } 
            else {
                alert("Something went wrong try again!!");
            }
        },
        data: test,
    });
}
