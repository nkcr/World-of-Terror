declare var L: any;

export default class Mapbox {

  markers: any;
  mapbox: any;


  constructor() {
    this.markers = [];
  }

  initMap(resolve: any, reject: any, db :Array<any>) {
    L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
    // Create a map in the div #map
    this.mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
    this.mapbox.on('load', function () {
      resolve("OK");
    });
    let map = this.mapbox;
    let myMarkers = this.markers;
    this.mapbox.on('move', function () {
      var inBounds = [];
    // Get the map bounds - the top-left and bottom-right locations.
      var bounds = map.getBounds();
      console.log('--------');
      console.log(bounds);
       // For each marker, consider whether it is currently visible by comparing
       // with the current map bounds.
       /*myMarkers.eachLayer(function(marker) {
            console.log(marker);
       });*/

    // Display a list of markers.
    //console.log(inBounds.join('\n'));
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
        var attackType =db[i][29];
        var latlng = new L.LatLng(db[i][13], db[i][14]);

        var attack_icon_url = "assets/images/icons/" + db[i][28] + ".svg";
        var myIcon = L.icon({
          iconUrl: attack_icon_url,
          iconSize:     [38, 95], // size of the icon
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
       });
        var marker = L.marker(latlng, {
           attackId:i,
           icon: myIcon
        });

        var popup = this.createPopup(db, i, attack_icon_url, latlng)
        marker.bindPopup(popup);


        this.markers.addLayer(marker);
      }
    }

    this.mapbox.addLayer(this.markers);
  }

  createPopup(db :Array<any>, i:number,  attack_icon_url:string, latlng:any){
     let summary:string = db[i][18];

     if(!summary){
       summary = 'Sorry, no summary is available.';
     }
     let dateOfAttack:string = db[i][1] + '/' + db[i][2] + '/' + db[i][3];
     let gname:string = db[i][58];
     let targetType:string = db[i][35];
     let icon_img = '<img src=' + attack_icon_url+ ' height=25 width=25/>';
     let content =   '<h1>' + dateOfAttack + '</h1>' +
                     '<table>' +
                     '<tr><th>Perpetrator</th><th>Attack type</th><th>Target</th></tr>'+
                     '<tr><td>' + gname +'</td><td>' + icon_img +'</td><td>' + targetType + '</td></tr>'+
                     '</table>' +
                     '<hr>' +
                     '<p>' + summary  + '</p>';

     let popup = L.popup()
          .setLatLng(latlng)
          .setContent(content)
          .openOn(this.mapbox);
     return popup;
  }

}
