import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Import the scene initialization function
import { initScene } from './scripts/initScene.js';

// Initialize the 3D scene with Three.js and OrbitControls
initScene(THREE, OrbitControls);