//javascript.js

//set map options
let myLatLng = { lat: -34.672, lng: -58.44 };
let mapContainer = document.getElementById('mapContainer')

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      let myLatLng = { lat: lat, lng: lng };

      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: myLatLng,
      });

      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
      });
    });
  } else {
    // geolocation no es soportado por el navegador
  }
}

// let myLatLng = navigator.geolocation.getCurrentPosition()
let mapOptions = {
  center: myLatLng,
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

//create map
let map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
let directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
let directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute() {
  mapContainer.className = `container py-5`
  //create request
  let request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  //pass the request to the route method
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //Get distance and time
      const output = document.querySelector("#output");
      output.innerHTML =
        "<div class='alert-info'>From: " +
        document.getElementById("from").value +
        ".<br />To: " +
        document.getElementById("to").value +
        ".<br /> Driving distance <i class='fas fa-road'></i> : " +
        result.routes[0].legs[0].distance.text +
        ".<br />Duration <i class='fas fa-hourglass-start'></i> : " +
        result.routes[0].legs[0].duration.text +
        ".</div>";

      //display route
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //center map in London
      map.setCenter(myLatLng);

      //show error message
      output.innerHTML =
        "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
    }
  });
}

//create autocomplete objects for all inputs
let options = {
  types: ["(cities)"],
  types: ["address"]
};

let input1 = document.getElementById("from");
let autocomplete1 = new google.maps.places.SearchBox(input1, options);

let input2 = document.getElementById("to");
let autocomplete2 = new google.maps.places.SearchBox(input2, options);
