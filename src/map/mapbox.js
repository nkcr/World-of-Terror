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
                var marker = L.marker(new L.LatLng(db[i][13], db[i][14]), {
                    icon: L.mapbox.marker.icon({ 'marker-symbol': 'post', 'marker-color': '0044FF' }),
                    title: title
                });
                marker.bindPopup(title);
                this.markers.addLayer(marker);
            }
        }
        this.mapbox.addLayer(this.markers);
    };
    return Mapbox;
}());
export default Mapbox;
//# sourceMappingURL=mapbox.js.map