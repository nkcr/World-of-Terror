var Mapbox = (function () {
    function Mapbox() {
        this.markers = [];
    }
    Mapbox.prototype.initMap = function (resolve, reject, db) {
        L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
        this.mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
        this.mapbox.on('load', function () {
            resolve("OK");
        });
        var map = this.mapbox;
        var myMarkers = this.markers;
        this.mapbox.on('move', function () {
            var inBounds = [];
            var bounds = map.getBounds();
            console.log('--------');
            console.log(bounds);
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
                var attackType = db[i][29];
                var latlng = new L.LatLng(db[i][13], db[i][14]);
                var attack_icon_url = "assets/images/icons/" + db[i][28] + ".svg";
                var myIcon = L.icon({
                    iconUrl: attack_icon_url,
                    iconSize: [38, 95],
                    popupAnchor: [-3, -76]
                });
                var marker = L.marker(latlng, {
                    attackId: i,
                    icon: myIcon
                });
                var popup = this.createPopup(db, i, attack_icon_url, latlng);
                marker.bindPopup(popup);
                this.markers.addLayer(marker);
            }
        }
        this.mapbox.addLayer(this.markers);
    };
    Mapbox.prototype.createPopup = function (db, i, attack_icon_url, latlng) {
        var summary = db[i][18];
        if (!summary) {
            summary = 'Sorry, no summary is available.';
        }
        var dateOfAttack = db[i][1] + '/' + db[i][2] + '/' + db[i][3];
        var gname = db[i][58];
        var targetType = db[i][35];
        var icon_img = '<img src=' + attack_icon_url + ' height=25 width=25/>';
        var content = '<h1>' + dateOfAttack + '</h1>' +
            '<table>' +
            '<tr><th>Perpetrator</th><th>Attack type</th><th>Target</th></tr>' +
            '<tr><td>' + gname + '</td><td>' + icon_img + '</td><td>' + targetType + '</td></tr>' +
            '</table>' +
            '<hr>' +
            '<p>' + summary + '</p>';
        var popup = L.popup()
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this.mapbox);
        return popup;
    };
    return Mapbox;
}());
export default Mapbox;
//# sourceMappingURL=mapbox.js.map