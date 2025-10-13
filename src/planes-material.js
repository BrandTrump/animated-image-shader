import { ShaderMaterial } from "three";
import baseFragment from "./shaders/baseFragment.glsl";
import baseVertex from "./shaders/baseVertex.glsl";

export default class PlanesMaterial extends ShaderMaterial {
  constructor(texture) {
    super({
      vertexShader: baseVertex,
      fragmentShader: baseFragment,
      uniforms: {
        uTexture: { value: texture },
        uGrayscaleProgress: { value: 0 },
      },
    });
  }
}
