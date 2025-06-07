import * as THREE from 'three';

// Create a chair product using basic geometries with a subtle rotation animation
export function createProduct() {
  // Group to hold all chair parts
  const group = new THREE.Group();

  // Material for the seat with a light cyan color
  const seatMaterial = new THREE.MeshStandardMaterial({ color: '#8AC' });

  // Chair seat (box geometry)
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 2), seatMaterial);
  seat.name = 'Seat';
  group.add(seat);

  // Material for the legs with a dark gray color
  const legMaterial = new THREE.MeshStandardMaterial({ color: '#555' });

  // Positions for the four legs
  const positions = [
    [-0.9, -1, -0.9],
    [0.9, -1, -0.9],
    [-0.9, -1, 0.9],
    [0.9, -1, 0.9]
  ];

  // Add each leg (cylinder geometry)
  positions.forEach((pos, i) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2), legMaterial);
    leg.position.set(...pos);
    leg.name = `Leg ${i + 1}`;
    group.add(leg);
  });

  // Lift the chair to position legs properly
  group.position.y = 1;

  // Animate the seat to rotate subtly around its Y-axis
  let time = 0;
  function animateSeat() {
    time += 0.02; // Increment time for smooth, slow rotation
    seat.rotation.y = 0.3 * Math.sin(time); // Gentle back-and-forth rotation
    requestAnimationFrame(animateSeat); // Continue animation
  }
  animateSeat(); // Start the seat animation

  return group;
}