function checkValid(element)
{
    if (element.value == "")
    {
        element.style.border = "1px solid #ff0000"; 
    }
}

function checkForm()
{
    var errorString = "";
    var formValid = true;
    var inputs = document.getElementsByTagName("input");
    for (var i=0; i<=4; i++)
    {
        if (inputs[i].value == "")
        {
            formValid = false;
            errorString = errorString+" "+inputs[i].id+", ";
        }
    }
    if (formValid)
    {
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var location = document.getElementById("location").value;
        var checkin = document.getElementById("checkin").value;
        var checkout = document.getElementById("checkout").value;
        //go through with submitting the data
		request = new XMLHttpRequest();
		url = "PHP/submit.php";
        request.open("POST",url);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function results() {
            //if request has been completed
            if (request.readyState == 4) 
            {
                if (request.status == 200) //successful
                {
                    alert("Recorded successfully! Thank you and stay safe")
                }
                else //other unexpected error
                { 
                    alert("Error: " + request.statusText);
                }
            }
        }
		request.send("name="+name+"&phone="+phone+"&location="+location+"&checkin="+checkin+"checkout="+checkout);
    }
    else
    {
        alert("Invalid entry for "+ errorString +". Please try again.");
    }
}

function findLocation() 
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(displayPosition,errorCallback,{timeout:10000});
    }
    else
    {
        errorCallback()
    }
}

function displayPosition(latlng)
{
    var lat = latlng.coords.latitude;
    var long = latlng.coords.longitude;
    var url = "https://eu1.locationiq.com/v1/reverse.php?key=80460069ea54e8&lat="+lat+"&lon="+long+"&format=json";
    fetch(url)
    .then(response => response.json())
		.then(json => document.getElementById("location").value = json.display_name);
}

function errorCallback()
{
    document.getElementById("location").value = "Location not found";
    console.log("Geolocator is either not supported or timed out.");
}

async function checkIn()
{
    var time = new Date();
    document.getElementById("checkin").value = time;
}

async function checkOut()
{
    var time = new Date();
    document.getElementById("checkout").value = time;
}

//GOOGLE MAPS API - unused
// async function initMap(){    
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 8,
//       center: {lat: 40.9006, lng: 174.8860} //centred on NZ to start
//     });
//     var geocoder = new google.maps.Geocoder;
//     var infowindow = new google.maps.InfoWindow;

//     document.getElementById('location').addEventListener('click', function() {
//       geocodeLatLng(geocoder, map, infowindow);
//     });
// }

// async function findLocation(geocoder, map, infowindow) {
//     var input = navigator.geolocation.getCurrentPosition();
//     var latlngStr = input.split(',', 2);
//     var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
//     geocoder.geocode({'location': latlng}, function(results, status) {
//       if (status === 'OK') {
//         if (results[0]) {
//           map.setZoom(11);
//           var marker = new google.maps.Marker({
//             position: latlng,
//             map: map
//           });
//           infowindow.setContent(results[0].formatted_address);
//           infowindow.open(map, marker);
//           document.getElementById("location").value = results[0].formatted_address;
//         } else {
//           window.alert('No results found');
//         }
//       } else {
//         window.alert('Geocoder failed due to: ' + status);
//       }
//     });
//   }