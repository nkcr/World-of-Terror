var Slider = (function () {
    function Slider() {
    }
    Slider.prototype.initSlider = function (dom_id, vm, resolve, reject) {
        var slider;
        slider = document.getElementById(dom_id);
        noUiSlider.create(slider, {
            start: [1970, 2020],
            connect: true,
            range: {
                'min': [1970],
                '20%': [1980, 1],
                '40%': [1990, 1],
                '60%': [2000, 1],
                '80%': [2010, 1],
                'max': [2020]
            },
            tooltips: true,
            pips: {
                mode: 'range',
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
        slider.noUiSlider.on('change', function () {
            vm.dstart = parseInt(slider.noUiSlider.get()[0]);
            vm.dend = parseInt(slider.noUiSlider.get()[1]);
        });
        resolve("Ok init Slider");
    };
    return Slider;
}());
export default Slider;
//# sourceMappingURL=slider.js.map