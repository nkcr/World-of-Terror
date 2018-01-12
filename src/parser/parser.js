var Parser = (function () {
    function Parser(script_path) {
        Papa.SCRIPT_PATH = script_path;
    }
    Parser.prototype.loadData = function (path, vm, resolve, reject) {
        Papa.parse(path, {
            worker: true,
            download: true,
            complete: function (results, file) {
                vm.db = results.data;
                resolve("OK");
            },
            error: function (err, file, inputElem, reason) {
                reject(reason);
            }
        });
    };
    Parser.prototype.exportData = function (data, indexedInBounds) {
        console.log("Starting export");
        console.log("data", data);
        var csvContent = "data:text/csv;charset=utf-8,";
        indexedInBounds.forEach(function (i) {
            var row = data[i].join(",");
            csvContent += row + "\r\n";
        });
        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    };
    return Parser;
}());
export default Parser;
//# sourceMappingURL=parser.js.map