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
        this._map.mapUpdate(this._vm.dstart, this._vm.dend, this._vm.db);
    };
    default_1.prototype.initVue = function (dom_el) {
        var me = this;
        this._vm = new Vue({
            el: dom_el,
            data: {
                dstart: 1,
                dend: 100
            },
            methods: {
                collection: function () {
                    if (this.db != undefined) {
                        return this.db[this.dstart][0];
                    }
                    else {
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
    };
    return default_1;
}());
export default default_1;
//# sourceMappingURL=vue.js.map