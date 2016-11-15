# threejs-create
> A quick way to prototype three.js applications without spending time on boilerplate code

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Install
```$ npm install --save threejs-create```

# Usage
You can either extend with ES6 classes or just take whatever you need, as in the following example:
```js
import * as THREE from 'three'
import CreateLoop from 'raf-loop'
import CreateApp from 'threejs-create'

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
```

# Features
- Built in post-processing with WAGNER
- Easy to extend with ES6 classes

# Credit
Based on [this](https://github.com/mattdesl/codevember16/blob/master/lib/createApp.js) code by [@mattdesl](https://github.com/mattdesl)

# License
MIT © [Terkel Gjervig](https://terkel.com)
