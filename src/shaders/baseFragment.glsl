uniform sampler2D uTexture;
uniform float uGrayscaleProgress; // Our "switch" (0.0 or 1.0)
varying vec2 vUv;

vec3 toGrayscale(vec3 color) {
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  return vec3(gray);
}

void main() {
  float dist = distance(vUv, vec2(0.5));

  float mask = smoothstep(uGrayscaleProgress - 0.1, uGrayscaleProgress, dist);

  vec3 originalColor = texture2D(uTexture, vUv).rgb;
  vec3 grayscaleColor = toGrayscale(originalColor);
  
   vec3 finalColor = mix(originalColor, grayscaleColor, mask);
   gl_FragColor = vec4(finalColor, 1.0);
}