import * as THREE from 'three'
import CreateLoop from 'raf-loop'
import CreateApp from '../src/index'

// Passes for post processing
import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass'
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass'

// You can extend CreateApp for total control
class App extends CreateApp {
  constructor () {
    super()

    // You can overwrite camera, etc. if you like
    // this.camera = new THREE.PerspectiveCamere....

    // Add post processing
    // It's already built in, you just add passes
    // to the passes array
    this.post = true
    this.passes = [
      new BloomPass({
        blurAmount: 3,
        zoomBlurStrength: 0.5
      }),
      new FXAAPass()
    ]

    // Create dummy object here in constructor
    let geometry = new THREE.IcosahedronGeometry(1, 1)
    let material = new THREE.MeshBasicMaterial({ color: 0xfff999fff, wireframe: true })
    let mesh = new THREE.Mesh(geometry, material)

    this.scene.add(mesh)

    // Add event listenrs
    this.addEventListeners()
  }

  start () {
    // Kick of loop
    CreateLoop(this.loop.bind(this)).start()
  }

  loop (dt) {
    this.time += dt / 1000
    this.render()
  }

  onMouseMove (event) {
    console.log('onMouseMove:')
  }

  onResize (event) {
    console.log('onResize:')
  }

  onKeyUp (event) {
    console.log('onKeyUp:')
  }

  onKeyPress (event) {
    console.log('onKeyPress:')
  }

  onKeyDown (event) {
    console.log('onKeyDown:')
  }

  addEventListeners () {
    // Events
    window.addEventListener('resize', this.onResize.bind(this))
    // KeyBoard
    window.addEventListener('keypress', this.onKeyPress.bind(this))
    window.addEventListener('keydown', this.onKeyDown.bind(this))
    window.addEventListener('keyup', this.onKeyUp.bind(this))
    // Mouse
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
  }
}

// Let's go!
let app = new App()
app.start()

