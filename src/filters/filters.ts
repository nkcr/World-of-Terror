
import Info from "../info/info.js";

export default class Filters {

  _filter_perpetrator: HTMLElement;
  _db: any;

  _filter_perpetrator_initial_state:boolean = true;
  _filter_targets_initial_state:boolean = true;

  FILTER_PERPETRATOR_INITIAL_STATE:string = "Display only attacks triggered by this perpetrator";
  FILTER_PERPETRATOR_CLICKED_STATE:string = "Display all attacks";

  FILTER_TARGETS_INITIAL_STATE:string = "Display only attacks for this target type";
  FILTER_TARGETS_CLICKED_STATE:string = "Display all attacks";

  filter_perpetrator_href:any;
  filter_targets_href:any;


  constructor(vm:any, db:any, info: Info) {
     /**********************************************************************/
     /********************** Filter by Success  ***********************/
     /**********************************************************************/
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

     /**********************************************************************/
     /********************** Filter by Attack Type  ***********************/
     /**********************************************************************/
     var attackTypeCheckboxList = document.getElementsByName("attackTypeCheckbox");
     for(var i = 0; i < attackTypeCheckboxList.length; i++) {
        attackTypeCheckboxList[i].onclick = function() {
           let checkbox:HTMLInputElement = <HTMLInputElement>(this);
           let id_filter_attacktype:number = Number(checkbox.value);
           vm.filters_attackType[id_filter_attacktype] = checkbox.checked;
           let filters_attackType_new:boolean[] = [];
           for(var j = 0; j < vm.filters_attackType.length; j++){
             filters_attackType_new.push(Boolean(vm.filters_attackType[j]));
           }
           vm.filters_attackType = filters_attackType_new;

        };
     }

     /**********************************************************************/
     /********************** Filter by Perpetrator *************************/
     /**********************************************************************/
     this.filter_perpetrator_href = document.getElementById("filter_perpetrator");
     var me = this;
     this.filter_perpetrator_href.onclick = function() {
        me._filter_perpetrator_initial_state = !me._filter_perpetrator_initial_state;
        if(me._filter_perpetrator_initial_state){
           vm.filters_perpetrators = -1;
           this.innerHTML = me.FILTER_PERPETRATOR_INITIAL_STATE;
        }else{
           vm.filters_perpetrators = info.current_marker_id;
           this.innerHTML = me.FILTER_PERPETRATOR_CLICKED_STATE;
        }
     }

     /**********************************************************************/
     /************************ Filter by Target ****************************/
     /**********************************************************************/
     this.filter_targets_href = document.getElementById("filter_targets");
     var me = this;
     this.filter_targets_href.onclick = function() {
        me._filter_targets_initial_state = !me._filter_targets_initial_state;
        if(me._filter_targets_initial_state){
           vm.filters_targets = -1;
           this.innerHTML = me.FILTER_TARGETS_INITIAL_STATE;
        }else{
           vm.filters_targets = info.current_marker_id;
           this.innerHTML = me.FILTER_PERPETRATOR_CLICKED_STATE;
        }
     }

  }

}
