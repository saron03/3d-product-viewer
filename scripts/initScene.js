// Initialize the 3D scene, camera, controls, lighting, product, and animation
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { enableInteraction } from './interaction.js';
import { animateCamera } from './cameraAnimation.js';

let scene, camera, renderer, controls, productGroup;

export function initScene(THREE, OrbitControls) {
  // Create a new Three.js scene
  scene = new THREE.Scene();
  const canvas = document.getElementById('product-canvas');

  // Set up perspective camera with field of view, aspect ratio, near and far planes
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(5, 3, 5); // Position camera to view product

  // Initialize WebGL renderer with antialiasing
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('product-canvas'),
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Add OrbitControls for mouse-based rotation, zoom, and pan
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = true;
  controls.enableZoom = true;

  // Create and add the product (chair) to the scene
  productGroup = createProduct();
  scene.add(productGroup); // Positioned at (0, 0, 0)

  // Add lighting to the scene
  addLighting(scene);

  // Enable mouse click interactions with the product
  enableInteraction(renderer, scene, camera, productGroup);

  // Start the animation loop
  animate();

  // Handle window resizing to maintain aspect ratio
  window.addEventListener('resize', onWindowResize);
}

// Adjust camera and renderer on window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop to render the scene and update animations
function animate(time) {
  requestAnimationFrame(animate); // Loop on every frame
  animateCamera(camera, time); // Update camera auto-rotation
  renderer.render(scene, camera); // Render the scene
}