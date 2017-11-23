var map;
var markerCluster = null;
var markers = [];

function initMap() {
  var uluru = { lat: 0, lng: 0 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: uluru
  });
  markerClusterer = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });
}

// function mapUpdate(dstart, dend, db) {

//   // clear array
//   markers = [];
//   for (var i = 0; i < dend - dstart; i++) {

//     var position = new google.maps.LatLng(db[dstart + i][13], db[dstart + i][14])
//     var title = db[dstart + i][29];
//     marker = new google.maps.Marker({
//       position: position,
//       title: title,
//       id: i
//     });
//     markers.push(marker);
//   }
//   if (markerClusterer) {
//     markerClusterer.clearMarkers();
//     // 				markerClusterer.addMarkers(markers,true)
//     markerClusterer.addMarkers(markers);
//   }
// }

var imageUrl = 'https://chart.apis.google.com/chart?cht=mm&chs=24x32&' + 'chco=FFFFFF,008CFF,000000&ext=.png';
var pinIcon = "icons/pin_green.png";
var pinIcon = 'https://chart.apis.google.com/chart?cht=mm&chs=24x32&' + 'chco=FFFFFF,00FF8C,000000&ext=.png';

var clusterer_styles = [
  [{
    url: imageUrl,
    height: 35,
    width: 35,
    anchor: [16, 0],
    textColor: '#ff00ff',
    textSize: 10
  }, {
    url: imageUrl,
    height: 45,
    width: 45,
    anchor: [24, 0],
    textColor: '#ff0000',
    textSize: 11
  }, {
    url: imageUrl,
    height: 55,
    width: 55,
    anchor: [32, 0],
    textColor: '#ffffff',
    textSize: 12
  }],
  [{
    url: imageUrl,
    height: 27,
    width: 30,
    anchor: [3, 0],
    textColor: '#ff00ff',
    textSize: 10
  }, {
    url: imageUrl,
    height: 36,
    width: 40,
    anchor: [6, 0],
    textColor: '#ff0000',
    textSize: 11
  }, {
    url: imageUrl,
    width: 50,
    height: 45,
    anchor: [8, 0],
    textSize: 12
  }],
  [{
    url: imageUrl,
    height: 26,
    width: 30,
    anchor: [4, 0],
    textColor: '#ff00ff',
    textSize: 10
  }, {
    url: imageUrl,
    height: 35,
    width: 40,
    anchor: [8, 0],
    textColor: '#ff0000',
    textSize: 11
  }, {
    url: imageUrl,
    width: 50,
    height: 44,
    anchor: [12, 0],
    textSize: 12
  }]
];