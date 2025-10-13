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
    // Convert click coordinates to normalized device coordinates (-1 to 1)
    const normCoords = {
      x: (e.x / window.innerWidth) * 2 - 1,
      y: -(e.y / window.innerHeight) * 2 + 1,
    };

    // Set raycaster from the camera using the pointer's position
    this.raycaster.setFromCamera(normCoords, this.camera);

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
