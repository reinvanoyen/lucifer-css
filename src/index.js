"use strict";

/**
 * @module lucifer-css
 * @author Rein Van Oyen
 */

class Lucifer {

  constructor(el, autorender = true) {

    this.el = el;
    this.computed = null;

    this.types = {};
    this.name = this.getName();
    this.defaults = this.getDefaults();
    this.rawValues = {};

    this.animFrame = null;

    this.processTypes();

    if (autorender) {
      this.refresh();
      this.start();
    }
  }

  processTypes() {
    for(let prop in this.defaults) {
      this.types[prop] = typeof this.defaults[prop];
    }
  }

  refresh() {
    this.computed = getComputedStyle(this.el);

    for (let prop in this.defaults) {
      this[prop] = this.getPropValue(prop);
    }
  }

  getPropValue(prop) {

    let val = this.computed.getPropertyValue('--' + this.name + '-' + prop);

    if (val) {

      if (val === this.rawValues[prop]) {
        return this[prop];
      }

      this.rawValues[prop] = val;
      val = val.trim();

      switch (this.types[prop]) {

        case 'number':
          val = Number(val);
          break;

        case 'boolean':
          val = (val === 'true');
          break;
      }

      this.onPropertyChange(prop, val);
      return val;
    }

    this.rawValues[prop] = val;

    val = this.defaults[prop];

    if (this[prop] && this[prop] !== val) {

        this.onPropertyChange(prop, val);
    }

    return val;
  }

  start() {

    this.animFrame = requestAnimationFrame(() => {
      this.start()
    });

    this.refresh();
    this.render(this.el);
  }

  stop() {
    cancelAnimationFrame(this.animFrame);
  }

  render() {}
  onPropertyChange(prop, val) {}
}

export default Lucifer;