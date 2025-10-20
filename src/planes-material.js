import { ShaderMaterial, Vector2 } from "three";
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
        uMouse: { value: new Vector2(0.5, 0.5) },
        uRippleProgress: { value: 0 },
        uTime: { value: 0 },
        uDirection: { value: 1 },
      },
    });
  }
}
