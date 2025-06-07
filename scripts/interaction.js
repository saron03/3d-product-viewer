import * as THREE from 'three';

// Enable mouse click detection and feedback for the product
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let originalColor = null;

export function enableInteraction(renderer, scene, camera, group) {
  const infoPanel = document.getElementById('info-panel');

  // Handle mouse clicks
  window.addEventListener('click', (event) => {
    // Convert mouse coordinates to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    // Cast ray from camera through mouse position
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(group.children);

    // If a part is clicked
    if (hits.length > 0) {
      const obj = hits[0].object;

      // Store original color and highlight part in gold
      originalColor = obj.material.color.clone();
      obj.material.color.set('#FFD700');

      // Display part name in info panel
      infoPanel.innerText = obj.name;
      infoPanel.style.display = 'block';

      // Revert color and hide panel after 1 second
      setTimeout(() => {
        obj.material.color.copy(originalColor);
        infoPanel.style.display = 'none';
      }, 1000);
    }
  });
}