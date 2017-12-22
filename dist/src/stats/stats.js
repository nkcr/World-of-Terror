var errMess = "<p style=\"text-align:center;\">Too many labels to display this chart correctly... Zoom in a bit!</p>";
var zoomInImage;
var Stats = (function () {
    function Stats() {
        this.partialOpts = {
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
        this.isInit = false;
    }
    Stats.prototype.updateStats = function (attacks) {
        if (!this.isInit)
            return;
        else {
        }
        var numberOfAttacks = attacks.length;
        var filteredTargets = [];
        var filteredTerrGroups = [];
        var filteredAttackTypes = [];
        var filteredSuccess = [];
        var targetLabels = [];
        var terrGroupLabels = [];
        var attackTypeLabels = [];
        var j = 0;
        for (var i = 0; i < attacks.length; i++) {
            filteredTargets[j] = this.db[attacks[i]][35];
            filteredTerrGroups[j] = this.db[attacks[i]][58];
            filteredAttackTypes[j] = this.db[attacks[i]][29];
            filteredSuccess[j] = this.db[attacks[i]][26];
            j++;
        }
        var nbSuccesses = 0;
        for (var i = 0; i < numberOfAttacks; i++) {
            if (filteredSuccess[i] == 1) {
                nbSuccesses += 1;
            }
        }
        for (var i = 0; i < filteredTargets.length; i++) {
            if (targetLabels.indexOf(filteredTargets[i]) < 0) {
                targetLabels.push(filteredTargets[i]);
            }
        }
        for (var i = 0; i < filteredTerrGroups.length; i++) {
            if (terrGroupLabels.indexOf(filteredTerrGroups[i]) < 0) {
                terrGroupLabels.push(filteredTerrGroups[i]);
            }
        }
        for (var i = 0; i < filteredAttackTypes.length; i++) {
            if (attackTypeLabels.indexOf(filteredAttackTypes[i]) < 0) {
                attackTypeLabels.push(filteredAttackTypes[i]);
            }
        }
        var nbTargets = targetLabels.length;
        var nbTerrGroups = terrGroupLabels.length;
        var nbAttackTypes = attackTypeLabels.length;
        var nbOcurrenceAttacks = [];
        for (var i = 0; i < attackTypeLabels.length; i++) {
            var curOccurrences = 0;
            for (var j = 0; j < filteredAttackTypes.length; j++) {
                if (attackTypeLabels[i] == filteredAttackTypes[j]) {
                    curOccurrences++;
                }
            }
            nbOcurrenceAttacks[i] = curOccurrences;
        }
        this.AttackData = [];
        for (var i = 0; i < attackTypeLabels.length; i++) {
            var curAttack = {
                label: attackTypeLabels[i],
                value: nbOcurrenceAttacks[i],
                color: "hsl(" + (i / attackTypeLabels.length * 360) + ",50%,50%)",
                highlight: "hsl(" + (i / attackTypeLabels.length * 360) + ",50%,70%)"
            };
            this.AttackData.push(curAttack);
        }
        if (this.oldAtkData == null) {
            this.pieAttacks = this.pieChartAttacks.Doughnut(this.AttackData, this.partialOpts);
            var pieAttackLegend = this.pieAttacks.generateLegend();
            this.attacksLabel.innerHTML = pieAttackLegend;
        }
        else {
            if (JSON.stringify(this.oldAtkData) != JSON.stringify(this.AttackData)) {
                this.pieAttacks.clear();
                this.pieAttacks.destroy();
                this.pieAttacks = this.pieChartAttacks.Doughnut(this.AttackData, this.partialOpts);
                var pieAttackLegend = this.pieAttacks.generateLegend();
                this.attacksLabel.innerHTML = pieAttackLegend;
            }
        }
        this.oldAtkData = this.AttackData;
        if (nbTargets < 15) {
            var nbOccurrenceTarget = [];
            for (var i = 0; i < targetLabels.length; i++) {
                var curOccurrences = 0;
                for (var j = 0; j < filteredTargets.length; j++) {
                    if (targetLabels[i] == filteredTargets[j]) {
                        curOccurrences++;
                    }
                }
                nbOccurrenceTarget[i] = curOccurrences;
            }
            this.TargetData = [];
            for (var i = 0; i < targetLabels.length; i++) {
                var curTarget = {
                    label: targetLabels[i],
                    value: nbOccurrenceTarget[i],
                    color: "hsl(" + (i / targetLabels.length * 360) + ",50%,50%)",
                    highlight: "hsl(" + (i / targetLabels.length * 360) + ",50%,70%)"
                };
                this.TargetData.push(curTarget);
            }
            if (this.oldTargData == null) {
                this.pieTarg = this.pieChartTarg.Doughnut(this.TargetData, this.partialOpts);
                var pieTargLegend = this.pieTarg.generateLegend();
                this.TargetsLabel.innerHTML = pieTargLegend;
            }
            else {
                if (JSON.stringify(this.oldTargData) != JSON.stringify(this.TargetData)) {
                    this.pieTarg.clear();
                    this.pieTarg.destroy();
                    this.pieTarg = this.pieChartTarg.Doughnut(this.TargetData, this.partialOpts);
                    var pieTargLegend = this.pieTarg.generateLegend();
                    this.TargetsLabel.innerHTML = pieTargLegend;
                }
            }
            this.oldTargData = this.TargetData;
        }
        else {
            if (this.pieTarg != null) {
                this.pieTarg.clear();
                this.pieTarg.destroy();
            }
            this.ctxTargets.drawImage(zoomInImage, this.canvasTargets.width / 2 - 100 / 2, this.canvasTargets.height / 2 - 100 / 2, 100, 100);
            this.TargetsLabel.innerHTML = errMess;
        }
        if (nbTerrGroups < 15) {
            var nbOccurrenceTerrGroup = [];
            for (var i = 0; i < terrGroupLabels.length; i++) {
                var curOccurrences = 0;
                for (var j = 0; j < filteredTerrGroups.length; j++) {
                    if (terrGroupLabels[i] == filteredTerrGroups[j]) {
                        curOccurrences++;
                    }
                }
                nbOccurrenceTerrGroup[i] = curOccurrences;
            }
            this.TerrGroupData = [];
            for (var i = 0; i < terrGroupLabels.length; i++) {
                var curTerrGroup = {
                    label: terrGroupLabels[i],
                    value: nbOccurrenceTerrGroup[i],
                    color: "hsl(" + (i / terrGroupLabels.length * 360) + ",50%,50%)",
                    highlight: "hsl(" + (i / terrGroupLabels.length * 360) + ",50%,70%)"
                };
                this.TerrGroupData.push(curTerrGroup);
            }
            if (this.oldTerrData == null) {
                this.PieTerr = this.pieChartTerr.Doughnut(this.TerrGroupData, this.partialOpts);
                var pieTerrLegend = this.PieTerr.generateLegend();
                this.TerrLabel.innerHTML = pieTerrLegend;
            }
            else {
                if (JSON.stringify(this.oldTerrData) != JSON.stringify(this.TerrGroupData)) {
                    this.PieTerr.clear();
                    this.PieTerr.destroy();
                    this.PieTerr = this.pieChartTerr.Doughnut(this.TerrGroupData, this.partialOpts);
                    var pieTerrLegend = this.PieTerr.generateLegend();
                    this.TerrLabel.innerHTML = pieTerrLegend;
                }
            }
            this.oldTerrData = this.TerrGroupData;
        }
        else {
            if (this.PieTerr != null) {
                this.PieTerr.clear();
                this.PieTerr.destroy();
            }
            this.ctxTerrGroups.drawImage(zoomInImage, this.canvasTerrGroups.width / 2 - 100 / 2, this.canvasTerrGroups.height / 2 - 100 / 2, 100, 100);
            this.TerrLabel.innerHTML = errMess;
        }
        if (numberOfAttacks > 0) {
            var percentageSuccess = Math.round(nbSuccesses / numberOfAttacks * 100);
            var nbUnsuccessful = numberOfAttacks - nbSuccesses;
            var percentageFailure = Math.round(nbUnsuccessful / numberOfAttacks * 100);
            this.SuccessElement.innerHTML = "<p><b>Successful attacks</b>: " + nbSuccesses + "(" + percentageSuccess + "%).<br><b>Unsuccessful attacks</b>: " + nbUnsuccessful + "(" + percentageFailure + "%).</p>";
        }
        else {
            this.SuccessElement.innerHTML = "<p>There are no attacks in the selected zone... Move around a bit!</p>";
        }
    };
    Stats.prototype.initStats = function (db) {
        this.isInit = true;
        this.db = db;
        zoomInImage = document.getElementById('zoomIn');
        this.canvasTargets = document.getElementById("targets");
        this.ctxTargets = this.canvasTargets.getContext('2d');
        this.canvasTerrGroups = document.getElementById("terrorist-groups");
        this.ctxTerrGroups = this.canvasTerrGroups.getContext('2d');
        this.canvasAttacks = document.getElementById("attack-types");
        this.ctxAttacks = this.canvasAttacks.getContext('2d');
        this.pieChartTarg = new Chart(this.ctxTargets);
        this.pieChartTerr = new Chart(this.ctxTerrGroups);
        this.pieChartAttacks = new Chart(this.ctxAttacks);
        this.TargetsLabel = document.getElementById("targets_legend");
        this.TerrLabel = document.getElementById("terrorist_legend");
        this.attacksLabel = document.getElementById("attack_legend");
        this.SuccessElement = document.getElementById("success_failure");
    };
    return Stats;
}());
export default Stats;
//# sourceMappingURL=stats.js.map