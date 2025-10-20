import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
  MeshStandardMaterial,
} from "three";
import { getWorldPositionFromDOM } from "./utils";
import PlanesMaterial from "./planes-material";
import Effect from "./effect";

export default class Stage {
  constructor(container) {
    this.container = container;

    this.DOMElements = [...this.container.querySelectorAll("img")];

    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.classList.add("content_canvas");

    this.container.appendChild(this.renderer.domElement);

    this.scene = new Scene();

    const { innerWidth: width, innerHeight: height } = window;
    this.camera = new OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2
    );
    this.camera.position.z = 10;

    this.setUpPlanes();
    this.effect = this.initEffect();
  }

  initEffect() {
    return new Effect(this.scene, this.camera);
  }

  resize() {
    const { innerWidth: screenWidth, innerHeight: screenHeight } = window;

    this.camera.left = -screenWidth / 2;
    this.camera.right = screenWidth / 2;
    this.camera.top = screenHeight / 2;
    this.camera.bottom = -screenHeight / 2;
    this.camera.updateProjectionMatrix();

    this.DOMElements.forEach((image, i) => {
      const { width: imageWidth, height: imageHeight } =
        image.getBoundingClientRect();
      this.scene.children[i].scale.set(imageWidth, imageHeight, 1);
    });

    this.renderer.setSize(screenWidth, screenHeight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);

    this.DOMElements.forEach((image, i) => {
      this.scene.children[i].position.copy(
        getWorldPositionFromDOM(image, this.camera)
      );
    });
  }

  setUpPlanes() {
    this.DOMElements.forEach((image) => {
      this.scene.add(this.generatePlane(image));
    });
  }

  generatePlane(image) {
    const loader = new TextureLoader();
    const texture = loader.load(image.src);

    texture.colorSpace = SRGBColorSpace;
    const plane = new Mesh(
      new PlaneGeometry(1, 1, 50, 50),
      new PlanesMaterial(texture)
    );

    return plane;
  }
}
