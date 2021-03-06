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
    //console.log("(add) Number of events: ", this._events_counter);
    if(this._events_counter == 0) {
      this._overlay_frame.style.visibility = "visible";
      this._overlay_frame.style.opacity = "1";
    }
    const uuid = this.guidGenerator();
    const node = document.createElement("P");
    const textnode = document.createTextNode(description); 
    node.appendChild(textnode); 
    node.setAttribute("id", uuid);
    this._overlay_text.appendChild(node);
    this._events_counter = this._events_counter + 1;
    return uuid;
  }

  removeEvent(uuid: string) {
    //console.log("(remove) Number of events: ", this._events_counter, ", id: ", uuid);
    let text = document.createTextNode("OK");
    setTimeout( ()=> {
      let node = document.getElementById(uuid);
      if(node != null) { node.appendChild(text) }
    }, 700);
    //if(this._events_counter > 0) {
      this._events_counter = this._events_counter - 1;
    //}
    if(this._events_counter == 0) {
      setTimeout( ()=> {
        this._overlay_text.innerHTML='';
        this._overlay_frame.style.visibility = "hidden";
        this._overlay_frame.style.opacity = "0";
      }, 1000);
    }
  }

  guidGenerator() {
    let S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }


}