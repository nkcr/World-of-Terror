export default class Overlay {
  _events_counter: number;
  _overlay_frame: HTMLElement;

  constructor(dom_id_frame: string) {
    this._overlay_frame = document.getElementById(dom_id_frame);
    this._events_counter = 0;
  }

  addEvent() {
    if(this._events_counter == 0) {
      this._overlay_frame.style.display = "block";
    }
    this._events_counter = this._events_counter + 1;
  }

  removeEvent() {
    if(this._events_counter > 0) {
      this._events_counter = this._events_counter - 1;
    }
    console.log("Number of events: ", this._events_counter);
    if(this._events_counter == 0) {
      this._overlay_frame.style.display = "none";
    }
  }


}