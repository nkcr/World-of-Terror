var Overlay = (function () {
    function Overlay(dom_id_frame, dom_id_text_frame) {
        this._overlay_frame = document.getElementById(dom_id_frame);
        this._overlay_text = document.getElementById(dom_id_text_frame);
        this._events_counter = 0;
    }
    Overlay.prototype.addEvent = function (description) {
        if (this._events_counter == 0) {
            this._overlay_frame.style.visibility = "visible";
            this._overlay_frame.style.opacity = "1";
        }
        var uuid = this.guidGenerator();
        var node = document.createElement("P");
        var textnode = document.createTextNode(description);
        node.appendChild(textnode);
        node.setAttribute("id", uuid);
        this._overlay_text.appendChild(node);
        this._events_counter = this._events_counter + 1;
        return uuid;
    };
    Overlay.prototype.removeEvent = function (uuid) {
        var _this = this;
        var text = document.createTextNode("OK");
        setTimeout(function () {
            var node = document.getElementById(uuid);
            if (node != null) {
                node.appendChild(text);
            }
        }, 700);
        this._events_counter = this._events_counter - 1;
        if (this._events_counter == 0) {
            setTimeout(function () {
                _this._overlay_text.innerHTML = '';
                _this._overlay_frame.style.visibility = "hidden";
                _this._overlay_frame.style.opacity = "0";
            }, 1000);
        }
    };
    Overlay.prototype.guidGenerator = function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
    return Overlay;
}());
export default Overlay;
//# sourceMappingURL=overlay.js.map