import { gsap, TweenMax, TweenLite, Power1, Power4, Expo } from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector(".hero");
const portrait = document.querySelector(".intro-portrait");
let panes = gsap.utils.toArray(".pane");
var fixer = 0.0004; //experiment with the value

portrait.addEventListener("mousemove", handleParallax);
portrait.addEventListener("mouseleave", handleParallax);

function handleParallax(event) {
	let pageX = event.clientX - hero.offsetWidth * 0.5; //get the mouseX - negative on left, positive on right
	let pageY = event.clientY - hero.offsetHeight * 0.5; //same here, get the y. use console.log(pageY) to see the values
	let xValue = 0,
		yValue = 0;

	panes.forEach((item) => {
		var speed = item.dataset.speed;
		if (event.type === "mousemove") {
			xValue = (item.offsetLeft + pageX * speed) * fixer; //calculate the new X based on mouse position * speed
			yValue = (item.offsetTop + pageY * speed) * fixer; //same here, calculate the new Y.
		}
		TweenLite.to(item, 0.5, {
			x: xValue,
			y: yValue,
		});
	});
}

function SmoothScroll(target, speed, smooth) {
	if (target === document)
		target =
			document.scrollingElement ||
			document.documentElement ||
			document.body.parentNode ||
			document.body; // cross browser support for document scrolling

	var moving = false;
	var pos = target.scrollLeft;
	var frame =
		target === document.body && document.documentElement
			? document.documentElement
			: target; // safari is the new IE

	target.addEventListener("mousewheel", scrolled, { passive: false });
	target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e);

		pos += -delta * speed;
		pos = Math.max(0, Math.min(pos, target.scrollWidth - frame.clientWidth)); // limit scrolling

		if (!moving) update();
	}

	function normalizeWheelDelta(e) {
		if (e.detail) {
			if (e.wheelDelta)
				return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
			// Opera
			else return -e.detail / 3; // Firefox
		} else return e.wheelDelta / 120; // IE,Safari,Chrome
	}

	function update() {
		moving = true;

		var delta = (pos - target.scrollLeft) / smooth;

		target.scrollLeft += delta;

		if (Math.abs(delta) > 0.5) requestFrame(update);
		else moving = false;
	}

	var requestFrame = (function () {
		// requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	})();
}

new SmoothScroll(document, 120, 12);

TweenLite.set(".projects .section-title", { x: "-100px" });

TweenLite.to(".projects .section-title", {
	scrollTrigger: {
		trigger: ".projects",
		// markers: true,
		horizontal: true,
		scrub: 1,
		start: "top center",
		end: "+=100",
		toggleActions: "restart pause reverse pause",
	},
	x: 0,
});

gsap.utils.toArray(".section-title svg").forEach((text) => {
	gsap
		.timeline({
			defaults: { ease: "none" },
			scrollTrigger: {
				// scroller: text.closest(".main"),
				horizontal: true,
				trigger: text.closest(".panel"),
				scrub: 1,
				// markers: true,
				start: "top center",
				end: "+=100",
			},
		})
		.to(text, { x: 0, fill: "#21BA0D" });
});
