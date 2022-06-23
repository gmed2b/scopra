
// FUNCTIONS //
const initMap = () => {
  // initialize the map on the "map" div with a given center and zoom
  const map = L.map('map').setView([42.18, 9.20], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  return map;
}

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, err => {
      console.log(err);
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
};

const showPosition = (position) => {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(map);
  L.marker([latitude, longitude]).addTo(map)
    .bindPopup('Latitude: ' + latitude + '<br>Longitude: ' + longitude)
    .openPopup();
};

// MAIN //
const map = initMap();
getUserLocation();