import Mapbox from "../map/mapbox";

declare var Vue: any;

export default class {
  _vm: any;
  _map: Mapbox;

  constructor() {

  }

  getVm():any {
    return this._vm;
  }

  setMap(map: Mapbox) {
    this._map = map;
  }

  mapUpdate() {
    this._map.mapUpdate(this._vm.dstart, this._vm.dend, this._vm.db);
  }

  initVue(dom_el: string, resolve: any, reject: any) {
    var me = this;
    this._vm = new Vue({
      el: dom_el,
      data: {
        dstart: 1,
        dend: 100,
      },
      methods: {
        collection: function () {
          if (this.db != undefined) {
            return this.db[this.dstart][0];
          } else {
            return "null";
          }
        }
      },
      watch: {
        dstart: function () {
          me.mapUpdate();
        },
        dend: function () {
          me.mapUpdate();
        }
      }
    });
    resolve("OK init Vue");
  }
}