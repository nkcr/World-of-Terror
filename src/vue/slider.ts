declare var noUiSlider: any;

export default class Slider {

  constructor() {

  }

  initSlider(dom_id: string, vm: any, resolve: any, reject: any) {
    var slider: any;
    slider = document.getElementById(dom_id);

    noUiSlider.create(slider, {
      start: [1970, 2016],
      connect: true,
      range: {
        'min': 1970,
        'max': 2016
      },
      tooltips: true,
      pips: { // Show a scale with the slider
        mode: 'steps',
        stepped: true,
        density: 4
      },
      format: {
        from: function (value: number) {
          return Math.floor(value);
        },
        to: function (value: number) {
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
  }
}