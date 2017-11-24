L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
// Create a map in the div #map
mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
mapbox.on('ready', function () {
  if(dbLoaded) {
    mapUpdate(1970, 2016, vm.db);
  }
  mapLoaded = true;
});

mapUpdate = function(dstart, dend, db) {
  if(markers) {
    mapbox.removeLayer(markers);
  }
  markers = new L.MarkerClusterGroup({
    maxClusterRadius: 40
  });

  for (var i = 0; i < db.length; i++) {
    if (db[i][1] >= dstart && db[i][1] <= dend ) {
      var title = db[i][29];
      var marker = L.marker(new L.LatLng(db[i][13], db[i][14]), {
        icon: L.mapbox.marker.icon({ 'marker-symbol': 'post', 'marker-color': '0044FF' }),
        title: title
      });
      marker.bindPopup(title);
      markers.addLayer(marker);
    }
  }

  mapbox.addLayer(markers);
}