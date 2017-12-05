import Vue from "./vue/vue.js";
import Slider from "./vue/slider.js";
import Mapbox from "./map/mapbox.js";
import Parser from "./parser/parser.js";

declare var Promise: any;

class Main {

  constructor() {

    // Init Vue and Slider
    let vue = new Vue();
    let slider = new Slider();
    vue.initVue("#app");
    slider.initSlider("slider", vue.getVm());

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
    const donePromise = Promise.all([mapPromise, loadPromise]);
    donePromise.then(function() {
      console.log("Everything loaded");
      vue.setMap(map);
      map.mapUpdate(1970, 2016, vue.getVm().db);
   });

  }
}

let main = new Main();
