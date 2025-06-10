import * as THREE from 'three';

// This function creates a sci-fi energy core object composed of basic meshes.
export function createProduct() {
  // Create a group to hold all parts of the product
  const group = new THREE.Group();

  // === Glowing Core (Sphere) ===
  // Material with emissive properties to make the core glow
  const glowMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x00ffff,             // Cyan base color
    emissive: 0x00ffff,          // Same color for glow
    emissiveIntensity: 1.5,      // Glow brightness
    roughness: 0.3,              // Slightly rough surface for lighting
    metalness: 0.8,              // Metallic look
    transparent: true,           // Slightly transparent
    opacity: 0.8,                // 80% opaque
  });

  // Sphere geometry for the energy core
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), glowMaterial);
  core.name = 'Energy Core';
  group.add(core);

  // === Support Rings (Torus) ===
  // Material for metallic support rings
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,             // Light gray/silver
    metalness: 1,                // Very metallic
    roughness: 0.3,              // Some surface texture
  });

  // First torus ring, rotated to align with X-axis
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 16, 100), ringMaterial);
  ring1.rotation.x = Math.PI / 2;
  ring1.name = 'Support Ring X';
  group.add(ring1);

  // Clone the first ring and rotate around Y-axis
  const ring2 = ring1.clone();
  ring2.rotation.y = Math.PI / 2;
  ring2.name = 'Support Ring Y';
  group.add(ring2);

  // Clone again and rotate around Z-axis
  const ring3 = ring1.clone();
  ring3.rotation.z = Math.PI / 2;
  ring3.name = 'Support Ring Z';
  group.add(ring3);

  // === Base Cylinder (Stand) ===
  // Create a cylinder to act as the stand/base for the energy core
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32), ringMaterial);
  base.position.y = -1;         // Position it below the core
  base.name = 'Base Stand';
  group.add(base);

  // === Position Group ===
  // Lift the entire group so it's above the ground plane
  group.position.y = 1;

  // === Subtle Animation (rotation and pulsing of the core) ===
  let time = 0;
  function animateCore() {
    time += 0.02;                                  // Increment time
    core.rotation.y += 0.01;                       // Slowly rotate the core
    core.scale.setScalar(1 + 0.05 * Math.sin(time * 2)); // Pulsing scale effect
    requestAnimationFrame(animateCore);            // Continue animation on next frame
  }
  animateCore(); // Start the animation loop

  return group; // Return the completed product group to be added to the scene
}
