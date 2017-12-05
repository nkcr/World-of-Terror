var Mapbox = (function () {
    function Mapbox() {
        this.markers = [];
    }
    Mapbox.prototype.initMap = function (resolve, reject) {
        L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
        this.mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
        this.mapbox.on('load', function () {
            resolve("OK");
        });
    };
    Mapbox.prototype.mapUpdate = function (dstart, dend, db) {
        if (this.markers) {
            this.mapbox.removeLayer(this.markers);
        }
        this.markers = new L.MarkerClusterGroup({
            maxClusterRadius: 40
        });
        for (var i = 0; i < db.length; i++) {
            if (db[i][1] >= dstart && db[i][1] <= dend) {
                var title = db[i][29];
                var latlng = new L.LatLng(db[i][13], db[i][14]);
                var attack_icon_url = "assets/images/icons/" + db[i][28] + ".svg";
                var myIcon = L.icon({
                    iconUrl: attack_icon_url,
                    iconSize: [38, 95],
                    popupAnchor: [-3, -76]
                });
                var marker = L.marker(latlng, {
                    icon: myIcon
                });
                var gname = db[i][58];
                var container = L.DomUtil.create('div');
                var startBtn = this.createButton('Start from this location', container);
                var popup = L.popup()
                    .setLatLng(latlng)
                    .setContent('</div>Perpetrator Group Name:' + gname + '</div><p>' + startBtn)
                    .openOn(this.mapbox);
                marker.bindPopup(popup);
                marker.setIcon(myIcon);
                this.markers.addLayer(marker);
                L.DomEvent.on(startBtn, 'click', function () {
                    alert("---- startBtn -----");
                });
            }
        }
        this.mapbox.addLayer(this.markers);
    };
    Mapbox.prototype.createButton = function (label, container) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    };
    return Mapbox;
}());
export default Mapbox;
//# sourceMappingURL=mapbox.js.map