import Vue from "./vue/vue.js";
import Slider from "./vue/slider.js";
import Info from "./vue/info.js";
import Mapbox from "./map/mapbox.js";
import Parser from "./parser/parser.js";
import Overlay from "./overlay/overlay.js";

declare var Promise: any;

class Main {

  constructor() {
    // Init Overlay
    let overlay = new Overlay("overlay");
    overlay.addEvent();

    // Init Vue and Slider
    let vue = new Vue();
    let slider = new Slider();


    let p1 = new Promise((resolve: any, reject: any) => {
      vue.initVue("#app", resolve, reject);
    });

    let p2 = new Promise((resolve: any, reject: any) => {
      slider.initSlider("slider", vue.getVm(), resolve, reject);
   });


    // Init map
    let map = new Mapbox();
    const mapPromise = new Promise((resolve: any, reject: any) => {
      map.initMap(resolve, reject);
   });

    // Load data
    let parser = new Parser("src/vendors/papaparse.min.js");
    const loadPromise = new Promise((resolve: any, reject: any) => {
      parser.loadData("../../assets/data/db.csv", vue.getVm(), resolve, reject);
   });

    // Wait for map and data
    const donePromise = Promise.all([p1, p2, mapPromise, loadPromise]);
    donePromise.then(function() {
      overlay.removeEvent();
      console.log("Everything loaded");
      vue.setMap(map);
      map.mapUpdate(1970, 2020, vue.getVm().db);
   });

  }
}

let main = new Main();
