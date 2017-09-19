"use strict";

import Lucifer from '../src/index';

class Sticky extends Lucifer {

	getName() {
		return 'sticky';
	}

	getDefaults() {
		return {
			'enabled': false,
			'offset': 0
		};
	}

	onPropertyChange(prop, val) {
		console.log('change', prop, val);
	}

	getOffsetTop() {

		let el = this.el;
		let top = 0;

		do {
			top += el.offsetTop  || 0;
			el = el.offsetParent;
		} while( el );

		return top;
	}

	render(el) {
		if(this.enabled) {
			let scrollDistance = window.pageYOffset - ( this.getOffsetTop() - this.offset );
			if(scrollDistance > 0) {
				el.style.transform = 'translateY(' + scrollDistance + 'px)';
				return;
			}
		}

		el.style.transform = '';
	}
}

class MouseFollow extends Lucifer {

	getName() {
		return 'mouse-follow';
	}

	getDefaults() {
		return {
			'enabled': false
		};
	}

	onPropertyChange(prop, val) {
		if (prop === 'enabled') {
			if (! this.mouseMoveHandler) {
				this.mouseMoveHandler = this.mouseMove.bind(this);
			}
			if (val === true) {
				window.addEventListener('mousemove', this.mouseMoveHandler);
			} else {
				window.removeEventListener('mousemove', this.mouseMoveHandler);
			}
		}
	}

	mouseMove(e) {
		this.mousePosX = e.pageX;
		this.mousePosY = e.pageY;
	}

	render(el) {
		if(this.enabled) {
			el.style.position = 'absolute';
			el.style.top = this.mousePosY + 'px';
			el.style.left = this.mousePosX + 'px';
			return;
		}

		el.style.position = '';
		el.style.top = '';
		el.style.left = '';
	}
}

class Drag extends Lucifer {

	getName() {
		return 'drag';
	}

	getDefaults() {
		return {
			'enabled': false,
			'x': true,
			'y': true
		};
	}

	onPropertyChange(prop, val) {

		if (prop === 'enabled') {

			if (! this.initialised) {

				this.isDragging = false;
				this.mousePosX = null;
				this.mousePosY = null;
				this.mouseDownHandler = this.mouseDown.bind(this);
				this.mouseUpHandler = this.mouseUp.bind(this);
				this.mouseMoveHandler = this.mouseMove.bind(this);
				this.initialised = true;
			}

			if (val === true) {

				this.el.addEventListener('mousedown', this.mouseDownHandler);
				window.addEventListener('mousemove', this.mouseMoveHandler);
				window.addEventListener('mouseup', this.mouseUpHandler);

			} else {

				this.el.removeEventListener('mousedown', this.mouseDownHandler);
				window.removeEventListener('mousemove', this.mouseMoveHandler);
				window.removeEventListener('mouseup', this.mouseUpHandler);
			}
		}
	}

	mouseDown(e) {
		this.isDragging = true;
	}

	mouseUp(e) {
		this.isDragging = false;
	}

	mouseMove(e) {
		if (this.isDragging) {
			this.mousePosX = e.pageX;
			this.mousePosY = e.pageY;
		}
	}

	render(el) {

		if (this.enabled) {
			el.style.position = 'absolute';
			if (this.mousePosY && this.mousePosX) {
				if (this.y) {
					el.style.top = this.mousePosY + 'px';
				}
				if (this.x) {
					el.style.left = this.mousePosX + 'px';
				}
			}
			return;
		}

		el.style.position = '';
		el.style.top = '';
		el.style.left = '';
	}
}

let els = document.querySelectorAll('.lucifer');
for( let i = 0; i < els.length; i++ ) {
	new Sticky(els[i]);
}