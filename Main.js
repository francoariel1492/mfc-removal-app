let myLatLng = { lat: -34.672, lng: -58.44 };
let mapContainer = document.getElementById("mapContainer");
let from = document.getElementById("from");
let to = document.getElementById("to");
let output = document.querySelector("#output");

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
  }
}

let mapOptions = {
  center: myLatLng,
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

let map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

let directionsService = new google.maps.DirectionsService();

let directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

function calcRoute() {
  let request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
  };

  directionsService.route(request, (result, status) => {
    let fwFrom = from.value.split(",")[0];
    let fwTo = to.value.split(",")[0];
    let distance = result.routes[0].legs[0].distance.text;
    if (status == google.maps.DirectionsStatus.OK) {
      setTimeout(() => {
        window.scrollBy(0, 575);
      }, 500);
      mapContainer.className = `container py-5 animate__animated animate__fadeIn`;

      output.innerHTML =
        "<div class='alert-info'>Desde: " +
        fwFrom +
        ".<br />Hasta: " +
        fwTo +
        ".<br /> Distancia: " +
        `${distance}` +
        `.<br/> <div class="lead">El precio por km es de $5. Comunicate con nosotros para cordinar y realizar el trabajo</div>`;
      (".</div>");

      directionsDisplay.setDirections(result);
    }
  });
}

let options = {
  types: ["(cities)"],
  types: ["address"],
};

let input1 = document.getElementById("from");
let autocomplete1 = new google.maps.places.SearchBox(input1, options);

let input2 = document.getElementById("to");
let autocomplete2 = new google.maps.places.SearchBox(input2, options);
