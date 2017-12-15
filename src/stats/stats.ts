export default class Stats {
    //Target = 35, Group = 58
    partialOpts: ChartSettings = {
      showTooltips: true,
      tooltipEvents: ["mousemove", "touchstart", "touchmove"],
      tooltipFillColor: "rgba(0,0,0,0.8)",
      tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      tooltipFontSize: 14,
      tooltipFontStyle: "normal",
      tooltipFontColor: "#fff",
      tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      tooltipTitleFontSize: 14,
      tooltipTitleFontStyle: "bold",
      tooltipTitleFontColor: "#fff",
      tooltipYPadding: 6,
      tooltipXPadding: 6,
      tooltipCaretSize: 8,
      tooltipCornerRadius: 6,
      tooltipXOffset: 10,
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>"
  };
  
  db:any;
  constructor() {

  }
  //Afficher des stats, 
  //Selon le nombre d'attaques afficher d'autres informations
  updateStats(dom_id: string,attacks: any)
  {
    var canvas = <HTMLCanvasElement>document.getElementById(dom_id);
    var ctx = canvas.getContext('2d');
    var filteredTargets=[];
    var filteredTerrGroups=[];

    var targetLabels=[];
    var terrGroupLabels=[];

    var targetValues=[];
    var terrGroupLabels=[];

    if(attacks.length<100)
      {
        var j=0;
        for(var i=0;i<attacks.length;i++)
          {
            filteredTargets[j]=this.db[attacks[i]][35];
            filteredTerrGroups[j]=this.db[attacks[i]][58];
            j++;
          }
        //retrieve labels
        for(var i=0;i<filteredTargets.length;i++)
        {
          if(targetLabels.indexOf(filteredTargets[i])<0)
            {
                targetLabels.push(filteredTargets[i]);
            }
        }
        for(var i=0;i<filteredTerrGroups.length;i++)
        {
          if(terrGroupLabels.indexOf(filteredTerrGroups[i])<0)
            {
                terrGroupLabels.push(filteredTerrGroups[i]);
            }
        }
        console.log("Terrorist group Labels: "+JSON.stringify(terrGroupLabels));
        console.log("Target Labels: "+JSON.stringify(targetLabels))


        //create array with values
        //display donuts
      }
      //console.log("filteredTargets: "+JSON.stringify(filteredTargets));
      //console.log("filteredGroups: "+JSON.stringify(filteredGroups));

  }
  initStats(dom_id: string, db:any) {
    this.db=db;
    var canvas = <HTMLCanvasElement>document.getElementById(dom_id);
    var ctx = canvas.getContext('2d');
    
   var pieData: CircularChartData[] = [
    {
        value: 300,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
];

var myDoughnutChart = new Chart(ctx).Doughnut(pieData, {
    segmentShowStroke: true,
    segmentStrokeColor: "#fff",
    segmentStrokeWidth: 2,
    percentageInnerCutout: 50,
    animationSteps: 100,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
});

var myDoughnutChartLegend: string = myDoughnutChart.generateLegend();
var myPieChartImage: string = myDoughnutChart.toBase64Image();
myDoughnutChart.addData({
    value: 120,
    color: "#4D5360",
    highlight: "#616774",
    label: "Dark Grey"
}, 0);
  
  var my2ndDoughnutChart = new Chart(ctx).Doughnut(pieData, this.partialOpts);
  }

}