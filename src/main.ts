import Vue from "./vue/vue.js";
import Slider from "./vue/slider.js";
import Mapbox from "./map/mapbox.js";
import Parser from "./parser/parser.js";
import Overlay from "./overlay/overlay.js";
import Stats from "./stats/stats.js";
import Info from "./info/info.js";
import Panels from "./panels/panels.js"
import Filters from "./filters/filters.js"

declare var Promise: any;

class Main {
  //stats:Stats;
  constructor() {
    // Init Overlay
    let overlay = new Overlay("overlay", "overlay-text");
    var uuid1 = overlay.addEvent("Loading view...");

    // Init Vue and Slider
    var uuid2 = overlay.addEvent("Init vue.js...");
    let vue = new Vue();
    let slider = new Slider();
    let stats = new Stats();
    let info = new Info();
    let p1 = new Promise((resolve: any, reject: any) => {
      vue.initVue("#app", resolve, reject);
    });
    p1.then(function() {overlay.removeEvent(uuid2);});

    var uuid3 = overlay.addEvent("Init slider...");
    let p2 = new Promise((resolve: any, reject: any) => {
      slider.initSlider("slider", vue.getVm(), resolve, reject);
    });
    p2.then(function() {overlay.removeEvent(uuid3);});

   /*let p3 = new Promise((resolve: any, reject: any) => {
      stats.initStats("statistiques", vue.getVm().db,resolve, reject);
   });*/

    // Init map
    var uuid4 = overlay.addEvent("Init map...");
    let map = new Mapbox(stats, info);
    const mapPromise = new Promise((resolve: any, reject: any) => {
      map.initMap(resolve, reject, vue.getVm().db, overlay);
    });
    mapPromise.then(function() {overlay.removeEvent(uuid4);});

    // Load data
    var uuid5 = overlay.addEvent("Load data...");
    let parser = new Parser("src/vendors/papaparse.min.js");
    const loadPromise = new Promise((resolve: any, reject: any) => {
      parser.loadData("../../assets/data/db.csv", vue.getVm(), resolve, reject);
    });
    loadPromise.then(function() {overlay.removeEvent(uuid5);});

    // Wait for map and data
    const donePromise = Promise.all([p1, p2,mapPromise, loadPromise]);
    donePromise.then(function() {
      overlay.removeEvent(uuid1);
      console.log("Everything loaded");
      vue.setMap(map);
      map.mapUpdate(1970, 2020, vue.getVm().db, vue.getVm().filters_perpetrators);
      stats.initStats(vue.getVm().db);
      info.initInfo(vue.getVm().db);
      let filters = new Filters(vue.getVm(), vue.getVm().db, info);
   });

   // Init panels
   let panels = new Panels();

  }
}

let main = new Main();
