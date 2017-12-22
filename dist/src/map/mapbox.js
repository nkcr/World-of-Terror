var Mapbox = (function () {
    function Mapbox(stats, info, vm) {
        this.indexesInBounds = [];
        this.markers = [];
        this.stats = stats;
        this.info = info;
        this.vm = vm;
    }
    Mapbox.prototype.setFilters = function (filters) {
        this.filters = filters;
    };
    Mapbox.prototype.initMap = function (resolve, reject, db, overlay) {
        var me = this;
        this.overlay = overlay;
        var reset_view = document.getElementById("reset_view");
        reset_view.onclick = function () {
            me.mapbox.setView([-10, 1.757813], 2);
        };
        console.log('------------initMap------------');
        L.mapbox.accessToken = 'pk.eyJ1IjoibmtjciIsImEiOiI4UnhLZEx3In0.bakfmpx2lREiNbHn0lWq9Q';
        this.mapbox = L.mapbox.map('mapbox', 'mapbox.streets');
        this.mapbox.on('load', function () {
            me.mapbox.setView([-10, 1.757813], 2);
            L.mapbox.styleLayer("mapbox://styles/nkcr/citu52wjb001y2irqtlt8ki9e").addTo(me.mapbox);
            resolve("OK");
        });
    };
    Mapbox.prototype.mapUpdate = function (dstart, dend, db, filters_success, filters_attackType, filters_perpetrators, filters_targets) {
        var uuid = this.overlay.addEvent("Updating map...");
        if (this.markers) {
            this.mapbox.removeLayer(this.markers);
        }
        this.markers = new L.MarkerClusterGroup({
            maxClusterRadius: 40
        });
        var info = this.info;
        var map = this.mapbox;
        var gname_filter = "";
        if (filters_perpetrators != -1) {
            gname_filter = db[filters_perpetrators][58];
        }
        var target_filter = "";
        if (filters_targets != -1) {
            target_filter = db[filters_targets][35];
        }
        var count = 0;
        var _loop_1 = function () {
            if (db[i][1] >= dstart && db[i][1] <= dend) {
                success = db[i][26];
                if (filters_success == "success_radio_id" && success != 1) {
                    return "continue";
                }
                if (filters_success == "unsuccess_radio_id" && success != 0) {
                    return "continue";
                }
                var attackTypeId = Number(db[i][28]);
                if (!filters_attackType[attackTypeId - 1]) {
                    return "continue";
                }
                gname = String(db[i][58]);
                if (filters_perpetrators != -1 && gname != gname_filter) {
                    return "continue";
                }
                target = String(db[i][35]);
                if (filters_targets != -1 && target != target_filter) {
                    return "continue";
                }
                var attackType = db[i][29];
                latlng = new L.LatLng(db[i][13], db[i][14]);
                attack_icon_url = "assets/images/icons/" + attackTypeId + "_" + success + ".png";
                myIcon = L.icon({
                    iconUrl: attack_icon_url,
                    iconSize: [50, 50]
                });
                marker = L.marker(latlng, {
                    icon: myIcon,
                    title: i
                });
                var db_i_1 = i;
                popup = this_1.createPopup(db, i, attackType, attack_icon_url, latlng, success);
                marker.bindPopup(popup);
                marker.on('click', function (e) {
                    map.setView(e.target.getLatLng(), map.getZoom());
                    info.updateInfo(db_i_1);
                });
                count = count + 1;
                this_1.markers.addLayer(marker);
            }
            this_1.vm.total_map = count;
        };
        var this_1 = this, success, gname, target, latlng, attack_icon_url, myIcon, marker, popup;
        for (var i = 0; i < db.length; i++) {
            _loop_1();
        }
        var markers = this.markers;
        var stats = this.stats;
        var me = this;
        this.mapbox.on('move', function (object) {
            var inBounds = me.countMarkerInBox(map, markers);
            me.indexesInBounds = inBounds;
            stats.updateStats(inBounds);
        });
        this.mapbox.addLayer(this.markers);
        this.overlay.removeEvent(uuid);
        var inBounds = me.countMarkerInBox(map, markers);
        this.indexesInBounds = inBounds;
        stats.updateStats(this.indexesInBounds);
        if (this.vm.reset_all) {
            this.filters.reset_filters_graphical_elements();
        }
    };
    Mapbox.prototype.countMarkerInBox = function (map, markers) {
        var inBounds = [];
        var bounds = map.getBounds();
        markers.eachLayer(function (marker) {
            if (bounds.contains(marker.getLatLng())) {
                inBounds.push(marker.options.title);
            }
        });
        this.vm.total_displayed = inBounds.length;
        return inBounds;
    };
    Mapbox.prototype.createPopup = function (db, i, attackType, attack_icon_url, latlng, success) {
        var icon_img = '<img src=' + attack_icon_url + ' height=35 width=35/>';
        var dateOfAttack = db[i][1] + '/' + db[i][2] + '/' + db[i][3];
        var content = '<h2>' + icon_img + ' ' + attackType + " <br/> <center>" + dateOfAttack + '</center></h2>';
        var popup = L.popup()
            .setLatLng(latlng)
            .setContent(content);
        return popup;
    };
    return Mapbox;
}());
export default Mapbox;
//# sourceMappingURL=mapbox.js.map