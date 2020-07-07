import { gsap, TweenLite } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector(".hero");
const ogCursor = document.querySelector(".cursor");
const portrait = document.querySelector(".intro-portrait");
const svgs = gsap.utils.toArray(".section-title svg");
const projects = gsap.utils.toArray(".projects__item");
const resumeItems = gsap.utils.toArray(".resume__item");
const panes = gsap.utils.toArray(".pane");
const fixer = 0.0004;
ScrollTrigger.defaults({
	toggleActions: "restart pause resume none",
	horizontal: true,
	start: "top center",
	end: "+=500",
	scrub: 1,
});

function animatePortrait() {
	portrait.addEventListener("mousemove", handleParallax);
	portrait.addEventListener("mouseleave", handleParallax);
}

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
		TweenLite.to(item, 1.5, {
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

function animateSVG() {
	TweenLite.set(".projects .section-title svg", { x: "-100px" });
	svgs.forEach((svg) => {
		gsap
			.timeline({
				// defaults: { ease: "none" },
				scrollTrigger: {
					trigger: svg.closest(".section-inner"),
				},
			})
			.to(svg, { x: 0, fill: "#21BA0D" });
	});
}

function animateProjects() {
	gsap
		.timeline({
			scrollTrigger: {
				trigger: ".projects__item--1",
				start: "top 85%",
			},
		})
		.fromTo(
			".projects__item--1",
			{ y: "-50px", opacity: 0 },
			{ y: 0, opacity: 1 }
		);

	gsap
		.timeline({
			scrollTrigger: {
				trigger: ".projects__item--2",
				start: "top 50%",
			},
		})
		.fromTo(
			".projects__item--2",
			{ y: "100px", opacity: 0 },
			{ y: 0, opacity: 1 }
		);

	gsap
		.timeline({
			scrollTrigger: {
				trigger: ".projects__item--2",
				start: "bottom 85%",
			},
		})
		.fromTo(
			".projects__item--3",
			{ scale: 0.8, opacity: 0 },
			{ scale: 1, opacity: 1 }
		);
}

function animateResume() {
	TweenLite.set(resumeItems, { y: "-30px", opacity: 0 });

	resumeItems.forEach((item) => {
		gsap
			.timeline({
				// defaults: { ease: "none" },
				scrollTrigger: {
					trigger: item.closest(".section-inner"),
					start: "-40% 60%",
				},
			})
			.to(item, { y: 0, opacity: 1 });
	});
}

function handleCursor() {
	window.addEventListener("mousemove", function (e) {
		ogCursor.firstElementChild.style.top = `${e.pageY}px`;
		ogCursor.firstElementChild.style.left = `${e.pageX}px`;
		ogCursor.lastElementChild.style.top = `${e.pageY}px`;
		ogCursor.lastElementChild.style.left = `${e.pageX}px`;
	});
}

function init() {
	new SmoothScroll(document, 120, 12);
	animateSVG();
	animateResume();
	animatePortrait();
	animateProjects();
	// handleCursor();
	// generateCanvas();
}

init();
