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
    this.name = this.getName();
    this.defaults = this.getDefaults();
    this.rawValues = {};

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
    let val = this.computed.getPropertyValue('--' + this.name + '-' + prop);
    if (val) {
      if( val === this.rawValues[prop]) {
        return this[prop];
      }
      val = val.trim();
      switch (this.types[prop]) {
        case 'number':
          return Number(val);
        case 'boolean':
          return (val === 'true');
        case 'string':
          return val;
        default:
          return val;
      }
    }

    this.rawValues[prop] = val;
    return this.getDefaults()[prop];
  }

  start() {
    requestAnimationFrame(() => this.start());
    this.refresh();
    this.render(this.el);
  }

  render() {}
}

export default Lucifer;