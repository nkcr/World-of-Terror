export default class Overlay {
  _events_counter: number;
  _overlay_frame: HTMLElement;
  _overlay_text: HTMLElement;

  constructor(dom_id_frame: string, dom_id_text_frame: string) {
    this._overlay_frame = document.getElementById(dom_id_frame);
    this._overlay_text = document.getElementById(dom_id_text_frame);
    this._events_counter = 0;
  }

  addEvent(description: string):string {
    if(this._events_counter == 0) {
      this._overlay_frame.style.display = "block";
    }
    var uuid = this.guidGenerator();
    var node = document.createElement("P");
    var textnode = document.createTextNode(description); 
    node.appendChild(textnode); 
    node.setAttribute("id", uuid);
    this._overlay_text.appendChild(node);
    this._events_counter = this._events_counter + 1;
    return uuid;
  }

  removeEvent(uuid: string) {
    document.getElementById(uuid).outerHTML='';
    if(this._events_counter > 0) {
      this._events_counter = this._events_counter - 1;
    }
    console.log("Number of events: ", this._events_counter);
    if(this._events_counter == 0) {
      this._overlay_frame.style.display = "none";
    }
  }

  guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }


}