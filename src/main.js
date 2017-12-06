import Vue from "./vue/vue.js";
import Slider from "./vue/slider.js";
import Mapbox from "./map/mapbox.js";
import Parser from "./parser/parser.js";
import Overlay from "./overlay/overlay.js";
var Main = (function () {
    function Main() {
        var overlay = new Overlay("overlay");
        overlay.addEvent();
        var vue = new Vue();
        var slider = new Slider();
        var p1 = new Promise(function (resolve, reject) {
            vue.initVue("#app", resolve, reject);
        });
        var p2 = new Promise(function (resolve, reject) {
            slider.initSlider("slider", vue.getVm(), resolve, reject);
        });
        var map = new Mapbox();
        var mapPromise = new Promise(function (resolve, reject) {
            map.initMap(resolve, reject);
        });
        var parser = new Parser("src/vendors/papaparse.min.js");
        var loadPromise = new Promise(function (resolve, reject) {
            parser.loadData("../../assets/data/db.csv", vue.getVm(), resolve, reject);
        });
        var donePromise = Promise.all([p1, p2, mapPromise, loadPromise]);
        donePromise.then(function () {
            overlay.removeEvent();
            console.log("Everything loaded");
            vue.setMap(map);
            map.mapUpdate(1970, 2020, vue.getVm().db);
        });
    }
    return Main;
}());
var main = new Main();
//# sourceMappingURL=main.js.map