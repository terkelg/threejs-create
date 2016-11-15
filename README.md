# threejs-create
> A quick way to prototype three.js applications without spending time on boilerplate code

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

# License
MIT © [Terkel Gjervig](https://terkel.com)
