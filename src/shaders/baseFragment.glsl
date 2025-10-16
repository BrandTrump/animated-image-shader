uniform sampler2D uTexture;
uniform float uGrayscaleProgress; // Our "switch" (0.0 or 1.0)
uniform vec2 uMouse;

varying vec2 vUv;

vec3 toGrayscale(vec3 color) {
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  return vec3(gray);
}

// Calculates the maximum distance from the given point to the 4 corners of the plane (in UV coordinates)
float getMaxDistFromCorners(vec2 coords) {
  float dist_bl = distance(coords, vec2(0.0, 0.0)); // Bottom-Left
  float dist_br = distance(coords, vec2(1.0, 0.0)); // Bottom-Right
  float dist_tl = distance(coords, vec2(0.0, 1.0)); // Top-Left
  float dist_tr = distance(coords, vec2(1.0, 1.0)); // Top-Right

  // Returns the largest of the four distances
  return max(dist_tl, max(dist_bl, max(dist_tr, dist_br)));
}

void main() {
  float dist = distance(vUv, uMouse);
  float maxDist = getMaxDistFromCorners(uMouse);

  float mask = smoothstep(uGrayscaleProgress - 0.1, uGrayscaleProgress, dist / maxDist);

  vec3 originalColor = texture2D(uTexture, vUv).rgb;
  vec3 grayscaleColor = toGrayscale(originalColor);
  
   vec3 finalColor = mix(originalColor, grayscaleColor, mask);
   gl_FragColor = vec4(finalColor, 1.0);
}