declare var L: any;

export default class Mapbox {

  markers: any;
  mapbox: any;

  constructor() {
    this.markers = [];
  }

  initMap(resolve: any, reject: any) {
    L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
    // Create a map in the div #map
    this.mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
    this.mapbox.on('load', function () {
      resolve("OK");
    });
  }

  mapUpdate(dstart :number, dend :number, db :Array<any>) {
    if (this.markers) {
      this.mapbox.removeLayer(this.markers);
    }
    this.markers = new L.MarkerClusterGroup({
      maxClusterRadius: 40
    });

    for (var i = 0; i < db.length; i++) {
      if (db[i][1] >= dstart && db[i][1] <= dend) {
        var attackType = db[i][29];
        var latlng = new L.LatLng(db[i][13], db[i][14]);

        var attack_icon_url = "assets/images/icons/" + db[i][28] + ".svg";
        var myIcon = L.icon({
          iconUrl: attack_icon_url,
          iconSize:     [38, 95], // size of the icon
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
       });
        var marker = L.marker(latlng, {
          icon: myIcon
        });

        var gname = db[i][58];
        var targetType = db[i][35];
        var container = L.DomUtil.create('div');
        var icon_img = '<img src=' + attack_icon_url+ ' height=25 width=25/>';
        var content = '<table>' +
                        '<tr><th>Perpetrator</th><th>Attack type</th><th>Target</th></tr>'+
                        '<tr><td>' + gname +'</td><td>' + icon_img +'</td><td>' + targetType + '</td></tr>'+
                        '</table>'
        var popup = L.popup().setLatLng(latlng).setContent(content);//.openOn(this.mapbox);
        marker.bindPopup(popup);


        this.markers.addLayer(marker);
      }
    }

    this.mapbox.addLayer(this.markers);
  }

  createButton(label: string, container: any) {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
  }
}
