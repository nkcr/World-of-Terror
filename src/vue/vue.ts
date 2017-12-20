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
    this._map.mapUpdate(this._vm.dstart, this._vm.dend, this._vm.db, this._vm.filters_success,
                        this._vm.filters_attackType, this._vm.filters_perpetrators, this._vm.filters_targets);
  }

  initVue(dom_el: string, resolve: any, reject: any) {
    var me = this;
    this._vm = new Vue({
      el: dom_el,
      data: {
        dstart: 1970,
        dend: 2020,
        filters_success: "success_unsuccess_radio_id",
        filters_attackType: [true,true,true,true,true,true,true,true,true],
        filters_perpetrators: -1,
        filters_targets: -1,
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
        filters_success: function () {
          me.mapUpdate();
        },
        filters_attackType: function () {
          me.mapUpdate();
        },
        filters_perpetrators: function () {
          me.mapUpdate();
        },
        filters_targets: function () {
          me.mapUpdate();
        }
      }
    });
    resolve("OK init Vue");
  }
}
