import Stage from "./stage";
import { gsap } from "gsap";
import { debounce } from "./utils";

const carouselWrapper = document.querySelector(".content");
const stage = new Stage(carouselWrapper);

function reszie() {
  stage.resize();
}

console.log("hi");

gsap.ticker.add(stage.render.bind(stage));

window.addEventListener("load", reszie);
window.addEventListener("resize", debounce(reszie));
