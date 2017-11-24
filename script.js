vm = new Vue({
  el: '#app',
  data: {
    dstart: 1,
    dend: 100,
  },
  methods: {
    collection: function() {
      if(this.db != undefined) {
        return this.db[this.dstart][0];
      } else {
        return "null";
      }
    }
  },
  watch: {
    dstart: function() {
      mapUpdate(this.dstart, this.dend, this.db);
    },
    dend: function () {
      mapUpdate(this.dstart, this.dend, this.db);
    }
  }
});

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
  start: [1970, 2016],
  connect: true,
  range: {
    'min': 1970,
    'max': 2016
  },
  tooltips: true,
  format: wNumb({
    decimals: 0
  }),
  pips: { // Show a scale with the slider
    mode: 'steps',
    stepped: true,
    density: 4
  },
  step: 1
});

slider.noUiSlider.on('end', function () {
  vm.dstart = parseInt(slider.noUiSlider.get()[0]);
  vm.dend = parseInt(slider.noUiSlider.get()[1]);
});

//Papa.SCRIPT_PATH = "/Users/nkcr/Desktop/VI Test";
// Stream big file in worker thread
Papa.parse("db.csv", {
  download: true,
  complete: function (results, file) {
    console.log(results);
    vm.db = results.data;
    if(mapLoaded) {
      mapUpdate(1970, 2016, vm.db);      
    }
    dbLoaded = true;
  }
});