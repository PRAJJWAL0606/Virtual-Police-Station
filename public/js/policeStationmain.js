$(document).ready(function (){
    
    $.ajax({
        type: "GET",
        url: "/getpolicestationdetails",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                var mainele = document.getElementById('policeStationname');
                mainele.textContent = msg[0].policeStationname;
                sessionStorage.setItem('policestationname', msg[0].policeStationname);
                
                //sho card
                var shoinfo = document.getElementById('SHOinfo');
                var cardmember = document.createElement('div');
                cardmember.setAttribute('class','card member-box');
                var span = document.createElement('span');
                span.setAttribute('class','shape');
                cardmember.appendChild(span);
                var image = document.createElement('img');
                image.setAttribute('class','card-img-top');
                image.src = msg[0].SHOimage;
                cardmember.appendChild(image);
                var cardbody = document.createElement('cardbody');
                cardbody.setAttribute('class','card-body');
                var span1 = document.createElement('span');
                span1.setAttribute('class','member-degignation');
                span1.textContent = "S.H.O";
                var head = document.createElement('h4');
                head.setAttribute('class','member-title');
                head.textContent = msg[0].SHOname;
                var small1 = document.createElement('small');
                small1.textContent = "Email : "+ msg[0].SHOEmail;
                var breakele = document.createElement('br');
                var small2 = document.createElement('small');
                small2.textContent = "Contact no. : "+ msg[0].SHOContactno;

                cardbody.appendChild(span1);
                cardbody.appendChild(head);
                cardbody.appendChild(small1);
                cardbody.appendChild(breakele);
                cardbody.appendChild(small2);

                cardmember.appendChild(cardbody);
                shoinfo.appendChild(cardmember);

                
                var pie = document.getElementById('pie');
                var pieConfig = new Chart(pie, {
                    type: 'pie',
                    data: {
                        labels: ['Solved', 'Unsolved'],
                        datasets: [{
                            label: '# of data',
                            data: [parseInt(msg[0].SolvedCases),(parseInt(msg[0].TotalCases) - parseInt(msg[0].SolvedCases))],
                            backgroundColor: ['rgb(242, 230, 255)', 'rgba(113,96,255,1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true, // Instruct chart js to respond nicely.
                        maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height 
                    }
                });

                var topOfficersdiv = document.getElementById('topofficers');
                var image1 = document.createElement('img');
                image1.setAttribute('class','imagetopofficers');
                image1.alt = "Avatar";
                image1.src = msg[0].topOfficer1;
                var image2 = document.createElement('img');
                image2.setAttribute('class','imagetopofficers');
                image2.alt = "Avatar";
                image2.src = msg[0].topofficer2;
                var image3 = document.createElement('img');
                image3.setAttribute('class','imagetopofficers');
                image3.alt = "Avatar";
                image3.src = msg[0].topofficer3;
                topOfficersdiv.appendChild(image1);
                topOfficersdiv.appendChild(image2);
                topOfficersdiv.appendChild(image3);
            }
            else{
                alert('Something went wrong !!');
            }
        },
    });
});
