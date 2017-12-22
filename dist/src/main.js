import Vue from "./vue/vue.js";
import Slider from "./vue/slider.js";
import Mapbox from "./map/mapbox.js";
import Parser from "./parser/parser.js";
import Overlay from "./overlay/overlay.js";
import Stats from "./stats/stats.js";
import Info from "./info/info.js";
import Panels from "./panels/panels.js";
import Filters from "./filters/filters.js";
var Main = (function () {
    function Main() {
        var overlay = new Overlay("overlay", "overlay-text");
        var uuid1 = overlay.addEvent("Loading view...");
        var uuid2 = overlay.addEvent("Init vue.js...");
        var vue = new Vue();
        var slider = new Slider();
        var stats = new Stats();
        var info = new Info();
        var p1 = new Promise(function (resolve, reject) {
            vue.initVue("#app", resolve, reject);
        });
        p1.then(function () { overlay.removeEvent(uuid2); });
        var uuid3 = overlay.addEvent("Init slider...");
        var p2 = new Promise(function (resolve, reject) {
            slider.initSlider("slider", vue.getVm(), resolve, reject);
        });
        p2.then(function () { overlay.removeEvent(uuid3); });
        var uuid4 = overlay.addEvent("Init map...");
        var map = new Mapbox(stats, info, vue.getVm());
        var mapPromise = new Promise(function (resolve, reject) {
            map.initMap(resolve, reject, vue.getVm().db, overlay);
        });
        mapPromise.then(function () { overlay.removeEvent(uuid4); });
        var uuid5 = overlay.addEvent("Loading data...");
        var parser = new Parser("src/vendors/papaparse.min.js");
        var loadPromise = new Promise(function (resolve, reject) {
            parser.loadData("../../assets/data/db.csv", vue.getVm(), resolve, reject);
        });
        loadPromise.then(function () { overlay.removeEvent(uuid5); });
        var donePromise = Promise.all([p1, p2, mapPromise, loadPromise]);
        donePromise.then(function () {
            overlay.removeEvent(uuid1);
            console.log("Everything loaded");
            vue.setMap(map);
            map.mapUpdate(vue.getVm().dstart, vue.getVm().dend, vue.getVm().db, vue.getVm().filters_success, vue.getVm().filters_attackType, vue.getVm().filters_perpetrators, vue.getVm().filters_targets);
            stats.initStats(vue.getVm().db);
            info.initInfo(vue.getVm().db);
            var filters = new Filters(vue.getVm(), vue.getVm().db, info);
            map.setFilters(filters);
        });
        var panels = new Panels();
        document.getElementById("export-btn").onclick = function () {
            parser.exportData(vue.getVm().db, map.indexesInBounds);
        };
    }
    return Main;
}());
var main = new Main();
//# sourceMappingURL=main.js.map