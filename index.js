import "./sass/main.scss";
import { gsap, TweenLite, TimelineMax } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
ScrollTrigger.defaults({
	toggleActions: "restart pause resume none",
	horizontal: true,
	start: "top center",
	end: "+=500",
	scrub: 1,
});

var isMobile = (function (a) {
	return (
		/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
			a
		) ||
		/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
			a.substr(0, 4)
		)
	);
})(navigator.userAgent || navigator.vendor || window.opera);

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
	target.addEventListener(
		"touchstart",
		function (e) {
			var startingY = e.touches[0].pageY;
			console.log(startingY);

			// target.addEventListener("touchmove", scrolled, { passive: false });
		},
		{ passive: false }
	);

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e);

		// console.log(e);

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
	new SmoothScroll(document, 120, 12);
	// animateSVG();
	// animateResume();
	// animatePortrait();
	// animateProjects();
	// handleScrollIcon();
	// handleCursor();
	// generateCanvas();
}

init();
