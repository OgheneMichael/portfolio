import "./sass/main.scss";
import SmoothScroll from "./js/scroll";
import { gsap, TweenLite, TimelineMax } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.saveStyles(".projects__item");

ScrollTrigger.defaults({
	toggleActions: "restart pause resume none",
	horizontal: true,
	start: "top center",
	end: "+=500",
	scrub: 1,
});

const hero = document.querySelector(".hero");
const scrollIconContainer = document.querySelector(".scroll-indicator");
const scrollIcon = scrollIconContainer.querySelector("svg");
const ogCursor = document.querySelector(".cursor");
const portrait = document.querySelector(".intro-portrait");
const svgs = gsap.utils.toArray(".section-title svg");
const projects = gsap.utils.toArray(".projects__item");
const resumeItems = gsap.utils.toArray(".resume__item");
const panes = gsap.utils.toArray(".pane");
const fixer = 0.0004;

const animatePortrait = {
	desktop() {
		portrait.addEventListener("mousemove", handleParallax);
		portrait.addEventListener("mouseleave", handleParallax);
	},
	mobile() {
		const tl = new TimelineMax();

		tl.fromTo(".intro", 1, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }).fromTo(
			portrait,
			1,
			{ y: -50, opacity: 0 },
			{ y: 0, opacity: 1 },
			"-=1"
		);
	},
};

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

const animateSVG = {
	desktop() {
		TweenLite.set(".projects .section-title svg", { x: "-10rem" });
		svgs.forEach((svg) => {
			gsap
				.timeline({
					scrollTrigger: {
						trigger: svg.closest(".section-inner"),
					},
				})
				.to(svg, { x: 0, fill: "#21BA0D", duration: 1 });
		});
	},
	mobile() {
		const projectSvg = document.querySelector(".projects .section-title svg");
		const resumeSvg = document.querySelector(".resume .section-title svg");
		TweenLite.set(projectSvg, { x: 0 });

		gsap
			.timeline({
				scrollTrigger: {
					trigger: projectSvg.closest(".section-title"),
					start: "top 80%",
					horizontal: false,
					end: "+=100",
				},
			})
			.to(projectSvg, {
				fill: "#21BA0D",
				duration: 1,
			})
			.to(projectSvg.closest(".section-title"), { scale: 1 }, "-=1");

		gsap
			.timeline({
				scrollTrigger: {
					trigger: resumeSvg.closest(".section-title"),
					start: "bottom 180%",
					horizontal: false,
					end: "+=100",
				},
			})
			.to(resumeSvg, {
				fill: "#21BA0D",
				duration: 1,
			})
			.to(resumeSvg.closest(".section-title"), { scale: 2.55, y: 30 }, "-=1");
	},
};

const animateProjects = {
	desktop() {
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
					start: "top 80%",
				},
			})
			.fromTo(
				".projects__item--2",
				{ y: "3rem", opacity: 0, overflow: "hidden" },
				{ y: 0, opacity: 1, overflow: "visible" }
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
	},
	mobile() {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".projects__item--1",
					start: "top 90%",
					end: "+=150",
					horizontal: false,
				},
			})
			.fromTo(
				".projects__item--1",
				{ y: "50px", opacity: 0 },
				{ y: 0, opacity: 1 }
			);

		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".projects__item--2",
					start: "top 90%",
					end: "+=150",
					horizontal: false,
				},
			})
			.fromTo(
				".projects__item--2",
				{ x: "50px", opacity: 0 },
				{ x: 0, opacity: 1 }
			);
		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".projects__item--3",
					start: "top 90%",
					end: "+=150",
					horizontal: false,
				},
			})
			.fromTo(
				".projects__item--3",
				{ x: "-50px", opacity: 0 },
				{ x: 0, opacity: 1 }
			);
	},
};

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

		setTimeout(() => {
			ogCursor.lastElementChild.style.top = `${e.pageY}px`;
			ogCursor.lastElementChild.style.left = `${e.pageX}px`;
		}, 0);
	});
}

function handleScrollIconPath(scrollDirection) {
	scrollIcon.classList = "";
	if (scrollDirection === "forward") {
		scrollIcon.classList.add("forward");
	} else if (scrollDirection === "backward") {
		scrollIcon.classList.add("backward");
	} else {
		scrollIcon.classList.add("alternate");
	}
}

function handleScrollIcon() {
	const tl = new TimelineMax();

	tl.to(scrollIconContainer, {
		scrollTrigger: {
			trigger: scrollIconContainer,
			scrub: -2,
			start: "top left",
			endTrigger: ".contact__listing",
			snap: true,
			end: "top -128%",
			// markers: true,
			onEnter: () => handleScrollIconPath("alternate"),
			// onEnterBack: () => handleScrollIconPath(),
			// onLeave: () => handleScrollIconPath("backward"),
			onLeaveBack: () => handleScrollIconPath("forward"),
		},

		x: `${document.querySelector("main").offsetWidth * 4.033}px`,
		zIndex: 3000,
	});

	tl.to(scrollIcon, {
		scrollTrigger: {
			trigger: ".contact",
			start: "center 85%",
			end: "+=10",
			onEnter: () => handleScrollIconPath("backward"),
			onLeave: () => handleScrollIconPath("backward"),
			onEnterBack: () => handleScrollIconPath(),
			onLeaveBack: () => handleScrollIconPath(),
		},
	});
}

function init() {
	new SmoothScroll(document, 90, 12);

	ScrollTrigger.matchMedia({
		"(min-width: 56.25em)": function () {
			animateProjects.desktop();
			animateSVG.desktop();
			animatePortrait.desktop();
			handleScrollIcon();
		},
		"(max-width: 56.25em)": function () {
			animatePortrait.mobile();
			animateSVG.mobile();
			animateProjects.mobile();
		},
	});

	animateResume();

	// handleCursor();
}

init();
