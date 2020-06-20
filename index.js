import { gsap, TweenMax, TweenLite, Power1, Power4, Expo } from "gsap";
import Swiper from "swiper";

const myPage = new Swiper(".main", {
	slidesPerView: "auto",
	// spaceBetween: 30,
	freeMode: true,
	mousewheel: true,
	keyboard: {
		enabled: true,
	},
});

const hero = document.querySelector(".hero");
const portrait = document.querySelector(".intro-portrait");
let panes = gsap.utils.toArray(".pane");
var fixer = 0.0004; //experiment with the value

portrait.addEventListener("mousemove", handleParallax);
portrait.addEventListener("mouseleave", handleParallax);

function handleParallax(event) {
	let pageX = event.pageX - hero.offsetWidth * 0.5; //get the mouseX - negative on left, positive on right
	let pageY = event.pageY - hero.offsetHeight * 0.5; //same here, get the y. use console.log(pageY) to see the values
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
