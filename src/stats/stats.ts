export default class Stats {
  
  constructor() {

  }

  initStats(dom_id: string, vm: any, resolve: any, reject: any) {
    console.log("initStats Called")
    var canvas = <HTMLCanvasElement>document.getElementById(dom_id);
    var ctx = canvas.getContext('2d');

    var lineData: LinearChartData = {
        labels: ['03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
        datasets: [
            {
                label: 'Accepted',
                type: 'bar',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                borderColor: "#9b0391",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Quarantined',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 86, 27, 90],
                yAxisID: 'quarantined'
            }
        ]
    };
      
    console.log("Creating new Chart");

    var myLineChart = new Chart(ctx).Line(lineData, {
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            position: "left",
            "id": "users"
          }, {
            position: "right",
            "id": "ratio",
            ticks: {
              min: -13
            }
          }]
        },
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    });

    var myLineChartLegend: string = myLineChart.generateLegend();
    var myLineChartImage: string = myLineChart.toBase64Image();
    resolve("OK");

  }
  updateStats()
  {

  }
}