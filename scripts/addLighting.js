import * as THREE from 'three';

// Add lighting to the scene for visibility and shadows
export function addLighting(scene) {
  // Add soft ambient light for overall illumination
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  // Add directional light for shadows and highlights
  const directional = new THREE.DirectionalLight(0xffffff, 1);
  directional.position.set(5, 10, 7); // Position light above and to the side
  directional.castShadow = true;
  scene.add(directional);
}