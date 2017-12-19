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
    this._map.mapUpdate(this._vm.dstart, this._vm.dend, this._vm.db, this._vm.filters_perpetrators);
  }

  initVue(dom_el: string, resolve: any, reject: any) {
    var me = this;
    this._vm = new Vue({
      el: dom_el,
      data: {
        dstart: 1970,
        dend: 2020,
        filters_perpetrators: [],
      },
      methods: {
        collection: function ():any {
          if (me._vm.db != undefined) {
            return me._vm.db[me._vm.dstart][0];
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
        },
        filters_perpetrators: function () {
          me.mapUpdate();
        }
      }
    });
    resolve("OK init Vue");
  }
}
