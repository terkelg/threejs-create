import * as THREE from 'three'
import CreateLoop from 'raf-loop'
import CreateApp from '../src/index'

// Create app
// - import what you need, camera, scene, renderer etc.
const {
  scene,
  render
 } = new CreateApp()

// Use three.js as you're used to
let geometry = new THREE.IcosahedronGeometry(1, 1)
let material = new THREE.MeshBasicMaterial({ color: 0xfff999fff, wireframe: true })
let mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Render loop
CreateLoop(render).start()
