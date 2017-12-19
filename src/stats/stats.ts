/**
 * The stats class displays the charts in the right part of the view. It uses ChartJS 1.1.1
 * Thi class can be improved by reducing  the duplicate code, possibly by creating a RetrieveDataAndDisplayChart function.
 * RetrieveDataAndDisplayChart(column:number, canvas:string, legend:string, maxLabels:number=20)
 * Second improvement would be the usage of ChartJS 2 which brings more possibilities to the table
 */

var errMess: string = "<p style=\"text-align:center;\">Too many labels to display this chart correctly... Zoom in a bit!</p>";
var zoomInImage : HTMLImageElement;
export default class Stats {
    //Type = 29 ,Target = 35, Group = 58


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

    canvasAttacks: any;
    ctxAttacks:any;
    pieChartAttacks:Chart;
    pieAttacks:CircularInstance;
    attacksLabel:HTMLElement;

    TerrGroupData:CircularChartData[];
    oldTerrData:CircularChartData[];
    TargetData:CircularChartData[];
    oldTargData:CircularChartData[];
    AttackData:CircularChartData[];
    oldAtkData:CircularChartData[];

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

        var filteredTargets=[];
        var filteredTerrGroups=[];
        var filteredAttackTypes=[];

        var targetLabels=[];
        var terrGroupLabels=[];
        var attackTypeLabels=[];

        //Retrieve data from database
        var j=0;
        for(var i=0;i<attacks.length;i++)
        {
            filteredTargets[j]=this.db[attacks[i]][35];
            filteredTerrGroups[j]=this.db[attacks[i]][58];
            filteredAttackTypes[j]=this.db[attacks[i]][29];
            j++;
        }
        //retrieve labels for targets
        for(var i=0;i<filteredTargets.length;i++)
        {
        if(targetLabels.indexOf(filteredTargets[i])<0)
            {
                targetLabels.push(filteredTargets[i]);
            }
        }
        
        //retrieve labels for terrorist groups
        for(var i=0;i<filteredTerrGroups.length;i++)
        {
        if(terrGroupLabels.indexOf(filteredTerrGroups[i])<0)
            {
                terrGroupLabels.push(filteredTerrGroups[i]);
            }
        }

        //retrieve labels for attack types
        for(var i=0;i<filteredAttackTypes.length;i++)
        {
        if(attackTypeLabels.indexOf(filteredAttackTypes[i])<0)
            {
                attackTypeLabels.push(filteredAttackTypes[i]);
            }
        }

        var nbTargets:number= targetLabels.length;
        var nbTerrGroups:number=terrGroupLabels.length;
        var nbAttackTypes:number=attackTypeLabels.length;

        /**
         * ATTACK TYPES
         */
        var nbOcurrenceAttacks=[];
            for(var i=0;i<attackTypeLabels.length;i++)
            {
                var curOccurrences=0;
                for(var j=0;j<filteredAttackTypes.length;j++)
                {
                    if(attackTypeLabels[i]==filteredAttackTypes[j])
                        {
                            curOccurrences++;
                        }
                }
                nbOcurrenceAttacks[i]=curOccurrences;
            }

            this.AttackData=[];
            for(var i=0;i<attackTypeLabels.length;i++)
            {
                var curAttack: CircularChartData = {
                    label:attackTypeLabels[i],
                    value:nbOcurrenceAttacks[i],
                    color:"hsl("+(i/attackTypeLabels.length*360)+",50%,50%)",
                    highlight:"hsl("+(i/attackTypeLabels.length*360)+",50%,70%)"
                }
                this.AttackData.push(curAttack);
            }

            if(this.oldAtkData==null)
            {
                this.pieAttacks=this.pieChartAttacks.Doughnut(this.AttackData,this.partialOpts);
                var pieAttackLegend=this.pieAttacks.generateLegend();
                this.attacksLabel.innerHTML=pieAttackLegend;
            }
            else
            {
                 if(JSON.stringify(this.oldAtkData)!=JSON.stringify(this.AttackData))
                {
                    this.pieAttacks.clear();
                    this.pieAttacks.destroy();
                    this.pieAttacks=this.pieChartAttacks.Doughnut(this.AttackData,this.partialOpts);
                    var pieAttackLegend=this.pieAttacks.generateLegend();
                    this.attacksLabel.innerHTML=pieAttackLegend;
                }
            }
            this.oldAtkData=this.AttackData;


        /**
         * TARGETS
         */
        if(nbTargets<15)
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
            if(this.pieTarg!=null)
                {
                    this.pieTarg.clear();
                    this.pieTarg.destroy();
                }
            this.ctxTargets.drawImage(zoomInImage,this.canvasTargets.width / 2 - 100 / 2, this.canvasTargets.height / 2 - 100 / 2,100,100);
            this.TargetsLabel.innerHTML =errMess;
        }

        /**
         * TERRORIST GROUPS
         */
        if(nbTerrGroups<15)
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
            if(this.PieTerr!=null)
            {
                this.PieTerr.clear();
                this.PieTerr.destroy();
            }
            this.ctxTerrGroups.drawImage(zoomInImage,this.canvasTerrGroups.width / 2 - 100 / 2, this.canvasTerrGroups.height / 2 - 100 / 2,100,100);
            this.TerrLabel.innerHTML=errMess;
        }

        

    }
    initStats(db:any) {
        this.isInit=true;
        this.db=db;

        zoomInImage = <HTMLImageElement>document.getElementById('zoomIn');

        this.canvasTargets = <HTMLCanvasElement>document.getElementById("targets");
        this.ctxTargets = this.canvasTargets.getContext('2d');

        this.canvasTerrGroups = <HTMLCanvasElement>document.getElementById("terrorist-groups");
        this.ctxTerrGroups = this.canvasTerrGroups.getContext('2d');

        this.canvasAttacks = <HTMLCanvasElement>document.getElementById("attack-types");
        this.ctxAttacks = this.canvasAttacks.getContext('2d');

        this.pieChartTarg=new Chart(this.ctxTargets);
        this.pieChartTerr=new Chart(this.ctxTerrGroups);
        this.pieChartAttacks= new Chart(this.ctxAttacks);

        this.TargetsLabel=document.getElementById("targets_legend");
        this.TerrLabel=document.getElementById("terrorist_legend");
        this.attacksLabel = document.getElementById("attack_legend");
        }

}
