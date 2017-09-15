"use strict";

/**
 * @module lucifer-css
 * @author Rein Van Oyen
 */

class Lucifer {

  constructor(el) {

    this.el = el;
    this.computed = null;

    this.types = {};
    this.defaults = this.getDefaults();
    this.processTypes();

    this.refresh();
    this.start();
  }

  processTypes() {
    for(let prop in this.defaults) {
      this.types[ prop ] = typeof this.defaults[prop];
    }
  }

  refresh() {
    this.computed = getComputedStyle(this.el);
    for(let prop in this.defaults) {
      this[prop] = this.getPropValue(prop);
    }
  }

  getPropValue(prop) {
    let val = this.computed.getPropertyValue('--' + this.getName() + '-' + prop);
    if (val) {
      val = val.trim();
      let type = this.types[prop];
      if(type === 'number') {
        return Number(val);
      } else if( type === 'boolean' ) {
        return ( val === 'true' );
      } else if( type === 'string' ) {
        return String(val);
      }
    }
    return this.getDefaults()[prop];
  }

  start() {
    requestAnimationFrame(() => this.start());
    this.refresh();
    this.render(this.el);
  }
}

export default Lucifer;