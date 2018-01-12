var default_1 = (function () {
    function default_1() {
    }
    default_1.prototype.getVm = function () {
        return this._vm;
    };
    default_1.prototype.setMap = function (map) {
        this._map = map;
    };
    default_1.prototype.mapUpdate = function () {
        this._map.mapUpdate(this._vm.dstart, this._vm.dend, this._vm.db, this._vm.filters_success, this._vm.filters_attackType, this._vm.filters_perpetrators, this._vm.filters_targets);
    };
    default_1.prototype.initVue = function (dom_el, resolve, reject) {
        var me = this;
        this._vm = new Vue({
            el: dom_el,
            data: {
                dstart: 1970,
                dend: 2020,
                filters_success: "success_unsuccess_radio_id",
                filters_attackType: [true, true, true, true, true, true, true, true, true],
                filters_perpetrators: -1,
                filters_targets: -1,
                reset_all: false,
                total_displayed: 0,
                total_map: 0
            },
            methods: {
                collection: function () {
                    if (me._vm.db != undefined) {
                        return me._vm.db[me._vm.dstart][0];
                    }
                    else {
                        return "null";
                    }
                },
                getVue: function () {
                    return me;
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
                    if (!me._vm.reset_all) {
                        me.mapUpdate();
                    }
                },
                filters_attackType: function () {
                    if (!me._vm.reset_all) {
                        me.mapUpdate();
                    }
                },
                filters_perpetrators: function () {
                    if (!me._vm.reset_all) {
                        me.mapUpdate();
                    }
                },
                filters_targets: function () {
                    if (!me._vm.reset_all) {
                        me.mapUpdate();
                    }
                }
            }
        });
        resolve("OK init Vue");
    };
    return default_1;
}());
export default default_1;
//# sourceMappingURL=vue.js.map