L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
// Create a map in the div #map
var mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
var markers = null;

function mapUpdate(dstart, dend, db) {
  if(markers) {
    mapbox.removeLayer(markers);
  }
  markers = new L.MarkerClusterGroup({
    maxClusterRadius: 40
  });

  for (var i = 0; i < dend-dstart; i++) {
    var title = db[i][29];
    var marker = L.marker(new L.LatLng(db[dstart + i][13], db[dstart+i][14]), {
      icon: L.mapbox.marker.icon({ 'marker-symbol': 'post', 'marker-color': '0044FF' }),
      title: title
    });
    marker.bindPopup(title);
    markers.addLayer(marker);
  }

  mapbox.addLayer(markers);
}