// Handle automatic camera rotation around the product
let radius = 5;
let angle = 0;
let autoRotate = true;

export function animateCamera(camera, time) {
  if (!autoRotate) return; // Skip if auto-rotation is disabled
  // Update angle for smooth rotation
  angle = time * 0.0003;
  // Set camera position to orbit around the product
  camera.position.x = radius * Math.cos(angle);
  camera.position.z = radius * Math.sin(angle);
  // Keep camera focused on the product center
  camera.lookAt(0, 1, 0);
}