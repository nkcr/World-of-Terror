import Vue from "./vue/vue.js";
import Slider from "./vue/slider.js";
import Mapbox from "./map/mapbox.js";
import Parser from "./parser/parser.js";
var Main = (function () {
    function Main() {
        var vue = new Vue();
        var slider = new Slider();
        vue.initVue("#app");
        slider.initSlider("slider", vue.getVm());
        var map = new Mapbox();
        var mapPromise = new Promise(function (resolve, reject) {
            map.initMap(resolve, reject);
        });
        var parser = new Parser("src/vendors/papaparse.min.js");
        var loadPromise = new Promise(function (resolve, reject) {
            parser.loadData("../../assets/data/db.csv", vue.getVm(), resolve, reject);
        });
        var donePromise = Promise.all([mapPromise, loadPromise]);
        donePromise.then(function () {
            console.log("Everything loaded");
            vue.setMap(map);
            map.mapUpdate(1970, 2016, vue.getVm().db);
        });
    }
    return Main;
}());
var main = new Main();
//# sourceMappingURL=main.js.map