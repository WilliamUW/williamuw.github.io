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

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

const williamTexture = new THREE.TextureLoader().load("william.JPG");
const waterlooTexture = new THREE.TextureLoader().load("images/UW_seal.png");

// Avatar

const william4 = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: waterlooTexture })
);

scene.add(william4);

william4.position.z = -10;
william4.position.x = 4;

const william = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: williamTexture })
);

scene.add(william);

william.position.z = -3;
william.position.x = 0;

const william2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: williamTexture })
);

scene.add(william2);

william2.position.z = 0;
william2.position.x = 0;

const william3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: williamTexture })
);

scene.add(william3);

william3.position.z = 5;
william3.position.x = 2;

// earth

const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture
  })
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

  william.rotation.y += 0.01;
  william.rotation.z += 0.01;

  william2.rotation.y += 0.01;
  william2.rotation.z += 0.01;

  william3.rotation.y += 0.01;
  william3.rotation.z += 0.01;

  william4.rotation.y -= 0.02;
  william4.rotation.z -= 0.02;

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

  earth.rotation.y += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
