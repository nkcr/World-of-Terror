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
    return Parser;
}());
export default Parser;
//# sourceMappingURL=parser.js.map