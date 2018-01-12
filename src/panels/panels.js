var Panels = (function () {
    function Panels() {
        this._panel_buttons = [
            document.getElementById("btn-panel-1"),
            document.getElementById("btn-panel-2"),
            document.getElementById("btn-panel-3"),
            document.getElementById("btn-panel-4")
        ];
        this._panels = [
            document.getElementById("panel-1"),
            document.getElementById("panel-2"),
            document.getElementById("panel-3"),
            document.getElementById("panel-4")
        ];
        for (var i = 0; i < this._panel_buttons.length; i++) {
            var me = this;
            this._panel_buttons[i].onclick = function () {
                me._closePanels(me._panels);
                me._hideBtnPanels(me._panel_buttons);
                var panel_id = Number(this.dataset.panel);
                me._panels[panel_id - 1].style.display = "block";
                this.classList.add('current');
            };
        }
    }
    Panels.prototype._closePanels = function (panels) {
        for (var i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
        }
    };
    Panels.prototype._hideBtnPanels = function (panel_buttons) {
        for (var i = 0; i < panel_buttons.length; i++) {
            panel_buttons[i].classList.remove('current');
        }
    };
    return Panels;
}());
export default Panels;
//# sourceMappingURL=panels.js.map