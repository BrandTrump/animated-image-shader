import { ShaderMaterial } from "three";
import baseFragment from "./shaders/baseFragment.glsl";
import baseVertex from "./shaders/baseVertex.glsl";

export default class PlanesMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: baseVertex,
      fragmentShader: baseFragment,
    });
  }
}
