import { gsap } from "gsap";
import { Observer } from "gsap/all";
import { Raycaster } from "three";

gsap.registerPlugin(Observer);

export default class Effect {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.activeObject = null;

    // Initialize the Three.js raycaster for detecting object intersections
    this.raycaster = new Raycaster();

    // Set up GSAP Observer to listen for click or touch interactions
    this.observer = Observer.create({
      target: document.querySelector(".content__carousel"),
      type: "touch,pointer",
      onClick: (e) => this.onClick(e),
    });
  }

  onClick(e) {
    console.log("clicked");

    const [intersection] = this.raycaster.intersectObjects(this.scene.children);

    if (intersection) {
      const { material, userData } = intersection.object;

      userData.isBw = !userData.isBw;

      gsap.set(material.uniforms.uGrayscaleProgress, {
        value: userData.isBw ? 1.0 : 0.0,
      });
    }
  }
}
