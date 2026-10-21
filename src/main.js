// SPDX-FileCopyrightText: 2026 Thomas Steiner
// SPDX-License-Identifier: Apache-2.0

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x111111 );
scene.environment = new THREE.PMREMGenerator( renderer ).fromScene( new RoomEnvironment(), 0.04 ).texture;

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.set( 0, 1.5, 6 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

const geometry = new THREE.TorusKnotGeometry( 1, 0.35, 256, 32 );
const material = new THREE.MeshStandardMaterial( { color: 0x049ef4, metalness: 0.6, roughness: 0.2 } );

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const timer = new THREE.Timer();

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate( timestamp ) {

	timer.update( timestamp );

	const delta = timer.getDelta();

	mesh.rotation.x += delta * 0.3;
	mesh.rotation.y += delta * 0.5;

	controls.update();

	renderer.render( scene, camera );

}
