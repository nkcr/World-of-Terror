
import Info from "../info/info.js";

export default class Filters {

  _filter_perpetrator: HTMLElement;
  _info: Info;
  _db: any;
  _attackTypeFilter:number[];

  constructor(vm:any, db:any, info: Info) {

     // Succes or unsuccess filter manager
     var sucRadio = document.getElementsByName("successRadio");
     var prev:any = null;
     for(var i = 0; i < sucRadio.length; i++) {
         sucRadio[i].onclick = function() {
             if(this !== prev) {
                 prev = this;
                 vm.filters_success = this.id;
             }
         };
     }

     var attackTypeCheckboxList = document.getElementsByName("attackTypeCheckbox");
     for(var i = 0; i < attackTypeCheckboxList.length; i++) {
        attackTypeCheckboxList[i].onclick = function() {
           let checkbox:HTMLInputElement = <HTMLInputElement>(this);
           let id_filter_perpetrator:number = Number(checkbox.value);
           vm.filters_perpetrators[id_filter_perpetrator] = checkbox.checked;
           let filters_perpetrators_new:number[] = [];
           for(var j = 0; j < vm.filters_perpetrators.length; j++){
             filters_perpetrators_new.push(vm.filters_perpetrators[j]);
           }
           vm.filters_perpetrators = filters_perpetrators_new;

        };
     }
     // Attack Type filter manager
     /*var attackTypeCheckbox =  document.getElementById("attacktypeFilterList");
     var meFilter = this;
     attackTypeList.onchange = function() {
        var select:HTMLSelectElement = <HTMLSelectElement>(this);
        let attackTypeList:number[]  = [];
        for(var i = 0; i < select.selectedOptions.length; i++){
           var option = select.selectedOptions[i];
           attackTypeList.push(Number(option.value));
        }

        console.log(attackTypeList);
     }*/
  }
}
