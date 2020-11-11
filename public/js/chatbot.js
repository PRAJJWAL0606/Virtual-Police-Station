const button = document.getElementById('submit');
var chatbox = document.getElementById('chatsbox');

button.addEventListener('click', function(e) {
    queryperson = {
        message: document.getElementById('message').value,
    };

    $.ajax({
        type: "GET",
        url: "/getbotresponse",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                //user
                var userdiv = document.createElement('div');
                userdiv.setAttribute('class','userreplydiv');
                var imgdivu = document.createElement('img');
                imgdivu.src = "https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png";
                imgdivu.alt ="Avatar";
                imgdivu.setAttribute('class','user');
                var lieleu = document.createElement('li');
                lieleu.id = "userreply";
                lieleu.textContent =  document.getElementById('message').value;
                lieleu.setAttribute('class','list-group-item');
                userdiv.appendChild(lieleu);
                userdiv.appendChild(imgdivu);
                chatbox.appendChild(userdiv);
                 
                //chatbot
                var botdiv = document.createElement('div');
                botdiv.setAttribute('class','botreplydiv');
                var imgdiv = document.createElement('img');
                imgdiv.src = "https://www.pngitem.com/pimgs/m/73-732620_transparent-call-center-agent-clipart-call-center-agent.png";
                imgdiv.alt ="Avatar";
                imgdiv.setAttribute('class','bot');
                var liele = document.createElement('li');
                liele.id = "botreply";
                liele.textContent = msg[0].response;
                liele.setAttribute('class','list-group-item');
                botdiv.appendChild(imgdiv);
                botdiv.appendChild(liele);
                chatbox.appendChild(botdiv);
            }
        },
        data:queryperson
    });
});


// function checkEmptyString(val) {
//     return (val == undefined || val == null || val.trim().length == 0);
// }

