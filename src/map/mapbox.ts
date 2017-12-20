import Stats from "../stats/stats.js";
import Info from "../info/info.js";
import Overlay from "../overlay/overlay";

declare var L: any;

export default class Mapbox {

  markers: any;
  mapbox: any;
  stats: Stats;
  info: Info;
  overlay: Overlay;

  indexesInBounds: any[] = [];

  constructor(stats: Stats, info: Info) {
    this.markers = [];
    this.stats = stats;
    this.info = info;
  }

  initMap(resolve: any, reject: any, db :Array<any>, overlay: Overlay) {
    var me = this;
    this.overlay = overlay;

    var reset = document.getElementById("reset");
    reset.onclick = function() {
      me.mapbox.setView([-10, 1.757813], 2);
    }

    console.log('------------initMap------------');
    L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
    // Create a map in the div #map
    this.mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
    this.mapbox.on('load', function () {
      me.mapbox.setView([-10, 1.757813], 2);
      L.mapbox.styleLayer("mapbox://styles/nkcr/citu52wjb001y2irqtlt8ki9e").addTo(me.mapbox);
      resolve("OK");
    });
  }

  mapUpdate(dstart :number, dend :number, db :Array<any>, filters_success:string, filters_attackType:Array<number>,
                                                          filters_perpetrators:number, filters_targets:number) {
     const uuid = this.overlay.addEvent("Updating map...");
     if (this.markers) {
        this.mapbox.removeLayer(this.markers);
     }
     this.markers = new L.MarkerClusterGroup({
        maxClusterRadius: 40
     });
     let info = this.info;
     let map = this.mapbox;
     let gname_filter:string = "";
     if(filters_perpetrators != -1){
       gname_filter = db[filters_perpetrators][58];
     }
     let target_filter:string = "";
     if(filters_targets != -1){
       target_filter = db[filters_targets][35];
     }
     for (var i = 0; i < db.length; i++) {
        if (db[i][1] >= dstart && db[i][1] <= dend) {
           var success = db[i][26];

           /**********************************************************************/
           /************************ Filter by Success  *************************/
           /**********************************************************************/
           if(filters_success == "success_radio_id" && success != 1){
             continue;
           }
           if(filters_success == "unsuccess_radio_id" && success != 0){
             continue;
           }

           /**********************************************************************/
           /********************** Filter by Attack Type  ***********************/
           /**********************************************************************/
           let attackTypeId:number = Number(db[i][28]);
           if(!filters_attackType[attackTypeId-1]){
             continue;
           }

           /**********************************************************************/
           /********************** Filter by Perpetrator  ***********************/
           /**********************************************************************/
           var gname:string = String(db[i][58]);
           if(filters_perpetrators != -1 && gname != gname_filter){
             continue;
           }

           /**********************************************************************/
           /************************ Filter by Target ****************************/
           /**********************************************************************/
           var target:string = String(db[i][35]);
           if(filters_targets != -1 && target != target_filter){
             continue;
           }
           /**********************************************************************/


           let attackType =db[i][29];
           var latlng = new L.LatLng(db[i][13], db[i][14]);
           var attack_icon_url = "assets/images/icons/" + attackTypeId + "_" + success + ".png";
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
    let me = this;
    this.mapbox.on('move', function (object:any) {
      /*let inBounds: any[] = []; // will contain every id of the visible attacks.

      // Get the map bounds - the top-left and bottom-right locations.
      var bounds = map.getBounds();
      markers.eachLayer(function(marker:any) {
        // For each marker, consider whether it is currently visible by comparing
        // with the current map bounds.
        if (bounds.contains(marker.getLatLng())){
            inBounds.push(marker.options.title);
        }
     });*/
      let inBounds: any[] = me.countMarkerInBox(map, markers);
      me.indexesInBounds = inBounds;
      stats.updateStats(inBounds);
     });
    this.mapbox.addLayer(this.markers);
    this.overlay.removeEvent(uuid);

    // Update stats by taking the filters in account
    let inBounds: any[] = me.countMarkerInBox(map, markers);
    this.indexesInBounds = inBounds;
    stats.updateStats(this.indexesInBounds);
  }

  countMarkerInBox(map:any, markers:any){
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
     return inBounds;
  }

  createPopup(db :Array<any>, i:number,  attackType:string, attack_icon_url:string, latlng:any, success:any){
     let icon_img = '<img src=' + attack_icon_url  + ' height=35 width=35/>';
     let dateOfAttack:string = db[i][1] + '/' + db[i][2] + '/' + db[i][3];
     let content =   '<h2>' + icon_img + ' ' + attackType + " <br/> <center>" + dateOfAttack + '</center></h2>';
     let popup = L.popup()
          .setLatLng(latlng)
          .setContent(content);
     return popup;
  }


}
