import Stats from "../stats/stats.js";
import Info from "../info/info.js";

declare var L: any;

export default class Mapbox {

  markers: any;
  mapbox: any;
  stats: Stats;
  info: Info;


  constructor(stats: Stats, info: Info) {
    this.markers = [];
    this.stats = stats;
    this.info = info;
  }

  initMap(resolve: any, reject: any, db :Array<any>) {
    var me = this;

    var reset = document.getElementById("reset");
    reset.onclick = function() {
      me.mapbox.setView([-10, 1.757813], 1);
    }

    console.log('------------initMap------------');
    L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
    // Create a map in the div #map
    this.mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
    this.mapbox.on('load', function () {
      me.mapbox.setView([-10, 1.757813], 1);
      L.mapbox.styleLayer("mapbox://styles/nkcr/citu52wjb001y2irqtlt8ki9e").addTo(me.mapbox);
      resolve("OK");
    });
  }

  mapUpdate(dstart :number, dend :number, db :Array<any>, filters_perpetrators: Array<string>) {
     console.log('------------mapUpdate------------');
     console.log(filters_perpetrators);
     console.log(filters_perpetrators.length);
     console.log(dstart);
     console.log(dend);
     if (this.markers) {
        this.mapbox.removeLayer(this.markers);
     }
     this.markers = new L.MarkerClusterGroup({
        maxClusterRadius: 40
     });
     let info = this.info;
     let map = this.mapbox;
     for (var i = 0; i < db.length; i++) {
        if (db[i][1] >= dstart && db[i][1] <= dend) {
           let attackType =db[i][29];
           var latlng = new L.LatLng(db[i][13], db[i][14]);
           var success = db[i][26];
           var attack_icon_url = "assets/images/icons/" + db[i][28] + "_" + success + ".png";
           var myIcon = L.icon({
              iconUrl: attack_icon_url,
              iconSize:     [50, 50], // size of the icon
           });
           var marker = L.marker(latlng, {
              icon: myIcon,
              title: i
           });


           let db_i = i;
           var popup = this.createPopup(db, i, attackType, attack_icon_url, latlng, success)
           marker.bindPopup(popup);
           marker.on('click', function (e:any) {
             map.setView(e.target.getLatLng(),map.getZoom());
             info.updateInfo(db_i);
          });
           this.markers.addLayer(marker);
        }
    }

    let markers = this.markers;
    let stats = this.stats;
    this.mapbox.on('move', function (object:any) {
      let inBounds: any[] = []; // will contain every id of the visible attacks.

      // Get the map bounds - the top-left and bottom-right locations.
      var bounds = map.getBounds();
      markers.eachLayer(function(marker:any) {
        // For each marker, consider whether it is currently visible by comparing
        // with the current map bounds.
        if (bounds.contains(marker.getLatLng())){
            inBounds.push(marker.options.title);
        }
      });
      stats.updateStats(inBounds);
     });
    this.mapbox.addLayer(this.markers);
  }


  createPopup(db :Array<any>, i:number,  attackType:string, attack_icon_url:string, latlng:any, success:any){
     let icon_img = '<img src=' + attack_icon_url  + ' height=35 width=35/>';
     let dateOfAttack:string = db[i][1] + '/' + db[i][2] + '/' + db[i][3];
     let content =   '<h2>' + icon_img + ' ' + attackType + " <br/> <center>" + dateOfAttack + '</center></h2>';
     /*
     let summary:string = db[i][18];
     if(!summary){
       summary = 'Sorry, no summary is available.';
     }
     let success_url =  "assets/images/success/" + success + ".png";
     let dateOfAttack:string = db[i][1] + '/' + db[i][2] + '/' + db[i][3];
     let gname:string = db[i][58];
     let targetType:string = db[i][35];
     let icon_img = '<img src=' + attack_icon_url  + ' height=35 width=35/>';
     let success_img = '<img src=' + success_url +  ' height=25 width=25/>';
     let content =   '<h2>' + icon_img + ' ' + attackType + '</h2>' +
                     '<table align=center>' +
                     '<tr><td align=center>' + dateOfAttack +'</td><td align=center>' + '<strong>Success </strong>' + success_img +'</td></tr>'+
                     '<tr><td align=center>' + '<strong>Perpetrator</strong><br>' + gname +'</td><td align=center>' + '<strong>Target</strong><br>' + targetType +'</td></tr>'+
                     '</table>' +
                     '<hr>' +
                     '<p>' + summary  + '</p>';*/
     let popup = L.popup()
          .setLatLng(latlng)
          .setContent(content);
     return popup;
  }


}
