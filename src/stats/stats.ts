export default class Stats {
    //Target = 35, Group = 58


    partialOpts: PieChartOptions = {
    segmentShowStroke: true,
    segmentStrokeColor: "#fff",
    segmentStrokeWidth: 2,
    percentageInnerCutout: 50,
    animationSteps: 20,
    animationEasing: "easeInOutElastic",
    animateRotate: false,
    animateScale: true,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\" style=\"list-style:none;\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>;color:white\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>"
};
    canvasTargets:any;
    ctxTargets:any;
    pieChartTarg:Chart;
    pieTarg:CircularInstance;
    TargetsLabel:HTMLElement;

    canvasTerrGroups:any;
    ctxTerrGroups:any;
    pieChartTerr:Chart;
    PieTerr:CircularInstance;
    TerrLabel: HTMLElement;

    TerrGroupData:CircularChartData[];
    oldTerrData:CircularChartData[];
    TargetData:CircularChartData[];
    oldTargData:CircularChartData[];

    db:any;
    isInit:boolean;

    constructor() {
        this.isInit=false;
    }
    //Afficher des stats,
    //Selon le nombre de labels afficher d'autres informations
    updateStats(attacks: any)
    {
        if(!this.isInit)return;
        else{
            //console.log("is init!");
            //console.log(this.db);
        }

       /* if(this.pieTarg!=null)
        {
            this.pieTarg.clear();
            //this.pieTarg.destroy();
            this.TargetsLabel.innerHTML="";

        }
        if(this.PieTerr!=null)
        {
            this.PieTerr.clear();
            //this.PieTerr.destroy();
            this.TerrLabel.innerHTML="";

        }*/

        var filteredTargets=[];
        var filteredTerrGroups=[];

        var targetLabels=[];
        var terrGroupLabels=[];

        var targetValues=[];
        var terrGroupLabels=[];

        //Retrieve data from database
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
        //console.log("Target Labels: "+JSON.stringify(targetLabels));

        for(var i=0;i<filteredTerrGroups.length;i++)
        {
        if(terrGroupLabels.indexOf(filteredTerrGroups[i])<0)
            {
                terrGroupLabels.push(filteredTerrGroups[i]);
            }
        }
        //console.log("Terrorist group Labels: "+JSON.stringify(terrGroupLabels));

        var nbTargets:number= targetLabels.length;
        var nbTerrGroups:number=terrGroupLabels.length;

        if(nbTargets<20)
        {
            //creating array with number of occurences per target
            var nbOccurrenceTarget=[];
            for(var i=0;i<targetLabels.length;i++)
            {
                var curOccurrences=0;
                for(var j=0;j<filteredTargets.length;j++)
                {
                    if(targetLabels[i]==filteredTargets[j])
                        {
                            curOccurrences++;
                        }
                }
                nbOccurrenceTarget[i]=curOccurrences;
            }
            this.TargetData=[];
            for(var i=0;i<targetLabels.length;i++)
            {
                var curTarget: CircularChartData={
                    label:targetLabels[i],
                    value:nbOccurrenceTarget[i],
                    color:"hsl("+(i/targetLabels.length*360)+",50%,50%)",
                    highlight:"hsl("+(i/targetLabels.length*360)+",50%,70%)"
                }

                this.TargetData.push(curTarget);
            }

            if(this.oldTargData==null)
            {
               this.pieTarg=this.pieChartTarg.Doughnut(this.TargetData, this.partialOpts);
               var pieTargLegend=this.pieTarg.generateLegend();
               this.TargetsLabel.innerHTML=pieTargLegend;
            }
            else
            {
                if(JSON.stringify(this.oldTargData)!=JSON.stringify(this.TargetData))
                {
                    //console.log("old target data:"+JSON.stringify(this.oldTargData),"\r\nnew target data:"+JSON.stringify(this.TargetData));
                    this.pieTarg.clear();
                    this.pieTarg.destroy();
                    this.pieTarg=this.pieChartTarg.Doughnut(this.TargetData, this.partialOpts);
                    var pieTargLegend=this.pieTarg.generateLegend();
                    this.TargetsLabel.innerHTML=pieTargLegend;
                }
            }
            this.oldTargData=this.TargetData;
        }
        else
        {

        }

        if(nbTerrGroups<20)
        {
            //creating array with number of occurrences per terrorist group
            var nbOccurrenceTerrGroup=[];
            for(var i=0;i<terrGroupLabels.length;i++)
            {
                var curOccurrences=0;
                for(var j=0;j<filteredTerrGroups.length;j++)
                {
                    if(terrGroupLabels[i]==filteredTerrGroups[j])
                        {
                            curOccurrences++;
                        }
                }
                nbOccurrenceTerrGroup[i]=curOccurrences;
            }

            this.TerrGroupData=[];
            for(var i=0;i<terrGroupLabels.length;i++)
            {
                var curTerrGroup: CircularChartData = {
                    label:terrGroupLabels[i],
                    value:nbOccurrenceTerrGroup[i],
                    color:"hsl("+(i/terrGroupLabels.length*360)+",50%,50%)",
                    highlight:"hsl("+(i/terrGroupLabels.length*360)+",50%,70%)"
                }
                this.TerrGroupData.push(curTerrGroup);
            }

            if(this.oldTerrData==null)
            {
                this.PieTerr=this.pieChartTerr.Doughnut(this.TerrGroupData,this.partialOpts);
                var pieTerrLegend=this.PieTerr.generateLegend();
                this.TerrLabel.innerHTML=pieTerrLegend;
            }
            else
            {
                 if(JSON.stringify(this.oldTerrData)!=JSON.stringify(this.TerrGroupData))
                {
                    this.PieTerr.clear();
                    this.PieTerr.destroy();
                    this.PieTerr=this.pieChartTerr.Doughnut(this.TerrGroupData,this.partialOpts);
                    var pieTerrLegend=this.PieTerr.generateLegend();
                    this.TerrLabel.innerHTML=pieTerrLegend;
                }
            }
            this.oldTerrData=this.TerrGroupData;
        }
        else
        {

        }
    }
    initStats(db:any) {
        this.isInit=true;
        this.db=db;
        this.canvasTargets = <HTMLCanvasElement>document.getElementById("targets");
        this.ctxTargets = this.canvasTargets.getContext('2d');

        this.canvasTerrGroups = <HTMLCanvasElement>document.getElementById("terrorist-groups");
        this.ctxTerrGroups = this.canvasTerrGroups.getContext('2d');

        this.pieChartTarg=new Chart(this.ctxTargets);
        this.pieChartTerr=new Chart(this.ctxTerrGroups);

        this.TargetsLabel=document.getElementById("targets_legend");
        this.TerrLabel=document.getElementById("terrorist_legend");
        }

}
