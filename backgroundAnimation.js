import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 3JS Template Used

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: "purple" });
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("/space.jpg");
scene.background = spaceTexture;

const williamTexture = new THREE.TextureLoader().load("/william.png");
const waterlooTexture = new THREE.TextureLoader().load("/UW_seal.png");

// Avatar

const waterlooCube = new THREE.Mesh(
  new THREE.BoxGeometry(7, 7, 7),
  new THREE.MeshBasicMaterial({ map: waterlooTexture })
);

scene.add(waterlooCube);

waterlooCube.position.z = -15;
waterlooCube.position.x = 12;

const william = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: williamTexture })
);

scene.add(william);

william.position.z = -2.94;
william.position.y = 0.17;
william.position.x = -0.04;

const earthTexture = new THREE.TextureLoader().load("/earth.jpg");
const normalTexture = new THREE.TextureLoader().load("/normal.jpg");
const moonTexture = new THREE.TextureLoader().load("/moon.jpg");
const marsTexture = new THREE.TextureLoader().load("/mars.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ map: moonTexture, texture: normalTexture })
);

scene.add(moon);

moon.position.z = 3.5;
moon.position.x = 0;

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshBasicMaterial({ map: marsTexture, texture: normalTexture })
);

scene.add(mars);

mars.position.z = -1;
mars.position.x = 5;

// earth

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);

scene.add(earth);

earth.position.z = -5;
earth.position.setX(-10);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // earth.rotation.x += 0.05;
  // earth.rotation.y += 0.075;
  // earth.rotation.z += 0.05;

  william.rotation.y = t * 0.003;
  william.rotation.z = t * 0.003;
  william.position.y = 0.17 + t * -0.008;
  william.position.x = -0.04 + t * 0.01;

  waterlooCube.rotation.y = t * -0.005;
  waterlooCube.rotation.z = t * -0.005;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  earth.rotation.y += 0.002;
  moon.rotation.y += 0.003;
  mars.rotation.y += 0.001;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
