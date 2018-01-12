var Filters = (function () {
    function Filters(vm, db, info) {
        this._filter_perpetrator_initial_state = true;
        this._filter_targets_initial_state = true;
        this.FILTER_PERPETRATOR_INITIAL_STATE = "Display only attacks triggered by this perpetrator";
        this.FILTER_PERPETRATOR_CLICKED_STATE = "Display all attacks";
        this.FILTER_TARGETS_INITIAL_STATE = "Display only attacks for this target type";
        this.FILTER_TARGETS_CLICKED_STATE = "Display all attacks";
        this._db = db;
        this._vm = vm;
        var sucRadio = document.getElementsByName("successRadio");
        for (var i = 0; i < sucRadio.length; i++) {
            sucRadio[i].onclick = function () {
                vm.filters_success = this.id;
            };
        }
        var attackTypeCheckboxList = document.getElementsByName("attackTypeCheckbox");
        for (var i = 0; i < attackTypeCheckboxList.length; i++) {
            attackTypeCheckboxList[i].onclick = function () {
                var checkbox = (this);
                var id_filter_attacktype = Number(checkbox.value);
                vm.filters_attackType[id_filter_attacktype] = checkbox.checked;
                var filters_attackType_new = [];
                for (var j = 0; j < vm.filters_attackType.length; j++) {
                    filters_attackType_new.push(Boolean(vm.filters_attackType[j]));
                }
                vm.filters_attackType = filters_attackType_new;
            };
        }
        this.filter_perpetrator_href = document.getElementById("filter_perpetrator");
        var me = this;
        this.filter_perpetrator_href.onclick = function () {
            if (typeof info.current_marker_id == "undefined") {
                return;
            }
            me._filter_perpetrator_initial_state = !me._filter_perpetrator_initial_state;
            if (me._filter_perpetrator_initial_state) {
                vm.filters_perpetrators = -1;
                this.innerHTML = me.FILTER_PERPETRATOR_INITIAL_STATE;
            }
            else {
                vm.filters_perpetrators = info.current_marker_id;
                this.innerHTML = me.FILTER_PERPETRATOR_CLICKED_STATE;
            }
        };
        this.filter_targets_href = document.getElementById("filter_targets");
        var me = this;
        this.filter_targets_href.onclick = function () {
            if (typeof info.current_marker_id == "undefined") {
                return;
            }
            me._filter_targets_initial_state = !me._filter_targets_initial_state;
            if (me._filter_targets_initial_state) {
                vm.filters_targets = -1;
                this.innerHTML = me.FILTER_TARGETS_INITIAL_STATE;
            }
            else {
                vm.filters_targets = info.current_marker_id;
                this.innerHTML = me.FILTER_PERPETRATOR_CLICKED_STATE;
            }
        };
        var reset_attack_type_btn = document.getElementById("reset_attack_type_btn");
        reset_attack_type_btn.onclick = function () {
            me.reset_attack_types_filters(vm);
        };
        var reset_filters = document.getElementById("reset_filters");
        reset_filters.onclick = function () {
            vm.reset_all = true;
            vm.filters_success = "success_unsuccess_radio_id";
            vm.filters_attackType = [true, true, true, true, true, true, true, true, true];
            vm.filters_perpetrators = -1;
            vm.filters_targets = -1;
            vm.getVue().mapUpdate();
            vm.reset_all = false;
        };
    }
    Filters.prototype.reset_attack_types_filters = function (vm) {
        var attackTypeCheckboxList = document.getElementsByName("attackTypeCheckbox");
        for (var i = 0; i < attackTypeCheckboxList.length; i++) {
            var checkbox = (attackTypeCheckboxList[i]);
            checkbox.checked = true;
        }
        vm.filters_attackType = [true, true, true, true, true, true, true, true, true];
    };
    Filters.prototype.reset_filters_graphical_elements = function () {
        var success_unsuccess_radio_id = (document.getElementById("success_unsuccess_radio_id"));
        success_unsuccess_radio_id.checked = true;
        var success_radio_id = (document.getElementById("success_radio_id"));
        success_radio_id.checked = false;
        var unsuccess_radio_id = (document.getElementById("unsuccess_radio_id"));
        unsuccess_radio_id.checked = false;
        var attackTypeCheckboxList = document.getElementsByName("attackTypeCheckbox");
        for (var i = 0; i < attackTypeCheckboxList.length; i++) {
            var checkbox = (attackTypeCheckboxList[i]);
            checkbox.checked = true;
        }
        this.filter_targets_href.innerHTML = this.FILTER_TARGETS_INITIAL_STATE;
        this._filter_targets_initial_state = true;
        this.filter_perpetrator_href.innerHTML = this.FILTER_PERPETRATOR_INITIAL_STATE;
        this._filter_perpetrator_initial_state = true;
    };
    return Filters;
}());
export default Filters;
//# sourceMappingURL=filters.js.map