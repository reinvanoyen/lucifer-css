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

new Sticky(document.getElementById('sticky'));