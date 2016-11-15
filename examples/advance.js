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
    this.settings.post = true
    this.passes = [
      new BloomPass({
        blurAmount: 0.1,
        applyZoomBlur: true
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

    // Kick of loop
    CreateLoop(this.loop.bind(this)).start()
  }

  loop (dt) {
    this.time += dt / 1000

    this.render()
  }

  onMouseMove () {}

  onResize () {}

  onKeyUp () {}

  onKeyDown () {}

  addEventListeners () {
  }
}

