$(document).ready(function() {
  //Create map variable
  var map = L.map('mapid');

  L.mapbox.accessToken = 'pk.eyJ1IjoiZXNpbmFydGEiLCJhIjoiY2swanRkdGdqMGVneDNjb2N6MGJtc2loNCJ9.J6DmYxFleE5Secq-aRveRg';

  //Get OSM data
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '&copy; <a href="https://apps.mapbox.com/feedback/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

  //Set user location
  map.locate({
    setView: true,
    maxZoom: 16,
    timeout: 1000000000,
    enableHighAccuracy: true
  });

  getRoute(map);

  //Find user location and display marker
  function onLocationFound(e) {
    var radius = e.accuracy;
  
    L.marker(e.latlng).addTo(map)
      .bindPopup("You are here").openPopup();
  
    L.circle(e.latlng, radius).addTo(map);
  }

  map.on('locationfound', onLocationFound);

  function onLocationError(e) {
      alert(e.message);
  }

  map.on('locationerror', onLocationError);

});

  function getRoute(map) {
  var event = "vanhack2019"
  var ref = firebase.database().ref("events/" + event);
	ref.once("value", function(snap) {
    var route = snap.val().coordinates;
    console.log(route);
    addRoute(route, map);
  });

}

function addRoute(route, map) {
  let i;
  var waypointsArray = []

  for(i = 0; i < route.length; i++) {
    if(route[i] != null) {
      let lat, lng;
      lat = route[i].lat;
      lng = route[i].long;
      waypointsArray.push(L.latLng(lat, lng));
    }
  }

  L.Routing.control({
    waypoints: waypointsArray,
    routeWhileDragging: false,
    createMarker: function() { return null; }
  }).addTo(map);

}
