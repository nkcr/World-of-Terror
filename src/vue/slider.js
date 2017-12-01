var Slider = (function () {
    function Slider() {
    }
    Slider.prototype.initSlider = function (dom_id, vm, resolve, reject) {
        var slider;
        slider = document.getElementById(dom_id);
        noUiSlider.create(slider, {
            start: [1970, 2016],
            connect: true,
            range: {
                'min': 1970,
                'max': 2016
            },
            tooltips: true,
            pips: {
                mode: 'steps',
                stepped: true,
                density: 4
            },
            format: {
                from: function (value) {
                    return Math.floor(value);
                },
                to: function (value) {
                    return Math.floor(value);
                }
            },
            step: 1
        });
        slider.noUiSlider.on('end', function () {
            vm.dstart = parseInt(slider.noUiSlider.get()[0]);
            vm.dend = parseInt(slider.noUiSlider.get()[1]);
        });
        resolve("Ok init Slider");
    };
    return Slider;
}());
export default Slider;
//# sourceMappingURL=slider.js.map