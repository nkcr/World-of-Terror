declare var Papa: any;

export default class Parser {

  constructor(script_path: string) {
    Papa.SCRIPT_PATH = script_path;
  }

  loadData(path: string, vm: any, resolve: any, reject: any) {
    Papa.parse(path, {
      worker: true, // Stream big file in worker thread
      download: true,
      complete: function (results: any, file: any) {
        vm.db = results.data;
        resolve("OK");
      },
      error: function (err: any, file :any, inputElem: any, reason: any) {
        reject(reason);
      }
    });
  }

  exportData(data: any, indexedInBounds: any[]) {
    console.log("Starting export");
    console.log("data", data);
    let csvContent = "data:text/csv;charset=utf-8,";
    indexedInBounds.forEach(function(i:any){
      let row = data[i].join(",");
      csvContent += row + "\r\n"; // add carriage return
    }); 
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

}