// Variables
const mapContainer = document.querySelector("#mapContainer");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const output = document.querySelector("#output");
const mapOptions = {
  center: { lat: -34.672, lng: -58.44 },
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};
const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();
const inputOptions = {
  types: ["(cities)", "address"],
};

// Functions
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      const myLatLng = { lat, lng };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: myLatLng,
      });
      const marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
      });
    });
  }
}

function calcRoute() {
  const fwFrom = from.value.split(",")[0];
  const fwTo = to.value.split(",")[0];
  const request = {
    origin: from.value,
    destination: to.value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
  };
  directionsService.route(request, (result, status) => {
    const distance = result.routes[0].legs[0].distance.text;
    if (status == google.maps.DirectionsStatus.OK) {
      setTimeout(() => {
        window.scrollBy(0, 575);
      }, 500);
      mapContainer.className = `container py-5 animate__animated animate__fadeIn`;
      output.innerHTML = `<div class='alert-info'>Desde: ${fwFrom}.<br />Hasta: ${fwTo}.<br />Distancia: ${distance}.<br/><div class="lead">El precio por km es de $5. Comunicate con nosotros para cordinar y realizar el trabajo</div></div>`;
      directionsDisplay.setDirections(result);
    }
  });
}

// Autocomplete
const autocomplete1 = new google.maps.places.SearchBox(from, inputOptions);
const autocomplete2 = new google.maps.places.SearchBox(to, inputOptions);

// Initialization
const map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
directionsDisplay.setMap(map);


