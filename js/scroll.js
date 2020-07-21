/**
 *
 *
 * @export
 * @class SmoothScroll
 */
export default class SmoothScroll {
	constructor(target, speed, smooth, vertical = false) {
		this.target = target;
		this.speed = speed;
		this.smooth = smooth;
		this.moving = false;
		this.frame = null;
		this.vertical = vertical;
		this.handleCrossPlatform(this.target);
		this.config();
		this.position = 0;
		this.startingY = 0;
	}

	handleCrossPlatform(target) {
		if (target === document) {
			this.target =
				document.scrollingElement ||
				document.documentElement ||
				document.body.parentNode ||
				document.body;
		}
	}

	config() {
		let { target, scrolled, vertical } = this;
		this.position =
			vertical || target.scrollHeight > target.scrollWidth
				? target.scrollTop
				: target.scrollLeft;
		this.frame =
			target === document.body && document.documentElement
				? document.documentElement
				: target;

		target.addEventListener("mousewheel", scrolled, { passive: false });
		target.addEventListener("DOMMouseScroll", scrolled, { passive: false });
		target.addEventListener("touchstart", this.touched, { passive: false });
	}

	touched = (e) => {
		if (e.touches[0].pageX > e.touches[0].pageY) {
			this.startingY = e.touches[0].pageX;
		} else {
			this.startingY = e.touches[0].pageY;
		}

		this.target.addEventListener("touchmove", this.scrolled, {
			passive: false,
		});
	};

	scrolled = (e) => {
		e.preventDefault(); // disable default scrolling
		let { moving, speed, frame, vertical, target } = this;
		let delta = this.normalizeWheelDelta(e);
		this.position += -delta * speed;
		if (vertical || target.scrollHeight > target.scrollWidth) {
			this.position = Math.max(
				0,
				Math.min(this.position, target.scrollHeight - frame.clientHeight)
			); // limit scrolling
		} else {
			this.position = Math.max(
				0,
				Math.min(this.position, target.scrollWidth - frame.clientWidth)
			); // limit scrolling
		}

		if (!moving) this.update();
	};

	normalizeWheelDelta = (e) => {
		if (e.detail) {
			if (e.wheelDelta) {
				return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1); // Opera
			} else {
				return -e.detail / 3; // Firefox
			}
		} else if (e.touches) {
			let currentY;
			if (e.touches[0].pageX > e.touches[0].pageY) {
				currentY = e.touches[0].pageX;
			} else {
				currentY = e.touches[0].pageY;
			}
			return (currentY - this.startingY) / 40; // Touch Devices
		} else {
			return e.wheelDelta / 120; // IE,Safari,Chrome
		}
	};

	update = () => {
		let { target, smooth, requestFrame, update, vertical } = this;
		this.moving = true;
		let delta;
		if (vertical || target.scrollHeight > target.scrollWidth) {
			delta = (this.position - target.scrollTop) / smooth;
			target.scrollTop += delta;
		} else {
			delta = (this.position - target.scrollLeft) / smooth;
			target.scrollLeft += delta;
		}

		if (Math.abs(delta) > 0.5) {
			requestFrame(update);
		} else {
			this.moving = false;
		}
	};

	requestFrame = (function () {
		// requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (cb) {
				window.setTimeout(cb, 1000 / 50);
			}
		);
	})();
}
