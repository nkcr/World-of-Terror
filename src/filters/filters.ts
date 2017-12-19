
import Info from "../info/info.js";

export default class Filters {

  _filter_perpetrator: HTMLElement;
  _info: Info;
  _db: any;

  constructor(vm:any, db:any, info: Info) {
   /* this._info = info;
    this._filter_perpetrator = document.getElementById("btn-filter_perpetrator");

    var me_info = this._info;
    var me_db = db;
    var vm = vm;
    this._filter_perpetrator.onclick = function () {
      if(me_info.current_marker_id){
        var gname = me_db[me_info.current_marker_id][58];
        vm.filters_perpetrators = [gname];
      }
   }*/

  }
}
