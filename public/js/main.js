

const allCategory = []

const categoryToIcon = (category) => {
  const iconTemplate = {
    iconUrl: '',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  }
  switch (category) {
    case "architecture religieuse":

    case "génie civil":
      return '🏠'
    case "architecture militaire":
      return '🎯';
    case "architecture de l'administration ou de la vie publique":
      return '📚';
    case "architecture domestique":
      return '🏠';
    case "site archéologique":
      return '🏛';
    case "architecture funéraire - commémorative - votive":
      return '🏛';
    case "architecture commerciale":
      return '💰';
    case "architecture de jardin":
      return '🌱';
    case "architecture agricole":
      return '🌾';
    case "architecture de culture - recherche - sport - loisir":
      return '🎮';
    case "architecture artisanale":
      return '🏭';
    case "architecture industrielle":
      return '🏭';
    case "architecture hospitalière - d'assistance - de protection sociale":
      return '🏥';
    default:
      return '💬';
  }
}

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
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  L.marker([latitude, longitude]).addTo(map)
    .bindPopup('Latitude: ' + latitude + '<br>Longitude: ' + longitude)
    .openPopup();
};

const addMakerToMap = (latitude, longitude, name, icon = null) => {
  const icon = icon == null ? {} : { icon: categoryToIcon(category) };
  L.marker([latitude, longitude], {icon: icon }).addTo(map)
    .bindPopup(name)
    .openPopup();
}

const getMonuments = async () => {
  const monumentsWrapper = document.querySelector('#monumentsWrapper');
  const apiURL = 'https://www.data.corsica/api/records/1.0/search/?dataset=liste-des-monuments-historiques-en-corse&rows=9999';
  const response = await fetch(apiURL);
  const data = await response.json();

  const addElement = (name, category) => {
    const new_element = document.createElement('li');
    new_element.setAttribute('class', 'list-group-item');
    new_element.textContent = name + ' - ' + category;
    monumentsWrapper.appendChild(new_element);
  };

  // liste les monuments
  data.records.forEach((element) => {
    const name = element.fields.appelation;
    const category = element.fields.categorie;
    const latitude = element.fields.point2d[0];
    const longitude = element.fields.point2d[1];
    addElement(name, category);
    addMakerToMap(latitude, longitude, name);
  });

  console.log(allCategory);
}

// MAIN //
const map = initMap();
getUserLocation();

getMonuments();