"use strict";

import Lucifer from '../src/index';

class Sticky extends Lucifer {

	getName() {
		return 'sticky';
	}

	getDefaults() {
		return {
			'position': false,
			'offset': 0
		};
	}

	render(el) {
		if(this.position) {
			let scrollDistance = window.pageYOffset - ( el.offsetTop - this.offset );
			if(scrollDistance > 0) {
				el.style.transform = 'translateY(' + scrollDistance + 'px)';
				return;
			}
		}

		el.style.transform = '';
	}
}

class MouseFollow extends Lucifer {

	constructor(el) {
		super(el);
		window.addEventListener('mousemove', e => {
			this.mousePosX = e.pageX;
			this.mousePosY = e.pageY;
		});
	}

	getName() {
		return 'mouse';
	}

	getDefaults() {
		return {
			'follow': false
		};
	}

	render(el) {
		if(this.follow) {
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

let stickies = document.querySelectorAll('*');
stickies.forEach(s => {
	new Sticky(s);
	new MouseFollow(s);
});

let test = document.querySelectorAll('.follow-mouse');
test.forEach(s => {
	new MouseFollow(s);
});