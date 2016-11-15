import * as THREE from 'three'
import CreateControls from 'orbit-controls'
import defined from 'defined'
import WAGNER from '@superguigui/wagner'

const _bind = Symbol('bind')
const _updateControls = Symbol('updateControls')
const _render = Symbol('render')
const _addEventListeners = Symbol('addEventListeners')
const _setupPost = Symbol('setupPost')
const _resize = Symbol('resize')
const _usePost = Symbol('usePost')

class CreateApp {
  constructor (opt = {}) {
    // Scale for retina
    const dpr = Math.min(defined(opt.maxPixelRatio, 2), window.devicePixelRatio)

    // Our WebGL renderer with alpha and device-scaled
    this.renderer = new THREE.WebGLRenderer(Object.assign({
      antialias: true // default enabled
    }, opt))

    this.renderer.setPixelRatio(dpr)

    // Add the <canvas> to DOM body
    this.canvas = this.renderer.domElement
    document.body.appendChild(this.canvas)

    // Perspective camera (Custom Camera?)
    const near = 0.01
    const far = 1000
    const fieldOfView = 65
    this.camera = new THREE.PerspectiveCamera(fieldOfView, 1, near, far)
    this.target = new THREE.Vector3()

    // 3D scene
    this.scene = new THREE.Scene()

    // Slick 3D orbit controller with damping
    this.controls = CreateControls(Object.assign({
      canvas: this.canvas,
      distanceBounds: [1, 100],
      distance: 2.5,
      phi: 70 * Math.PI / 180
    }, opt))

    // Default to no post
    this[_usePost] = false

    // Bind
    this[_bind]()

    // Setup Event listeners
    this[_addEventListeners]()

    // Setup initial size & aspect ratio
    this[_resize]()
    this[_updateControls]()
  }

  /**
   * Public Render
   */
  render () {
    this[_updateControls]()
    this[_render]()
  }

  /**
   * post
   */
  set post (usePost = false) {
    this[_usePost] = usePost
    this[_setupPost]()
  }

  get post () {
    return this[_usePost]
  }

  /* --------- PRIVATE INTERFACE --------- */

  /**
   * Resize - Called on resize events
   */
  [_resize] () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    if (this[_usePost]) {
      this.composer.setSize(window.innerWidth, window.innerHeight)
    }
    this[_updateControls]()
  }

  /**
   * Bind Methods
   */
  [_bind] () {
    this[_resize] = this[_resize].bind(this)
    this.render = this.render.bind(this)
  }

  /**
   * Render
   */
  [_render] () {
    // choose render method here later
    if (this[_usePost]) {
      this.composer.reset()
      this.composer.render(this.scene, this.camera)
      this.passes.forEach((pass) => {
        this.composer.pass(pass)
      })
      this.composer.toScreen()
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }

  /**
   * UpdatControls
   */
  [_updateControls] () {
    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    // update camera controls
    this.controls.update()
    this.camera.position.fromArray(this.controls.position)
    this.camera.up.fromArray(this.controls.up)
    this.target.fromArray(this.controls.direction).add(this.camera.position)
    this.camera.lookAt(this.target)

    // Update camera matrices
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  /**
   * addEventListeners
   */
  [_addEventListeners] () {
    // Update renderer size
    window.addEventListener('resize', this[_resize])
  }

  /**
   * SetupPost - Setup Wagner for post processing
   */
  [_setupPost] () {
    if (!this[_usePost]) return

    this.passes = []
    this.composer = new WAGNER.Composer(this.renderer)
  }
}

export { CreateApp as default }
