# Particle Explosions

Create particle explosions on a HTML5 canvas element.

## Installation

```
npm install particle-explosions
```

## Usage

### Simple

```javascript
import { createEmitter } from 'particle-explosions'

const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')

const emitter = createEmitter(ctx)

emitter.explode(250) // 250 particles
```

### Multiple explosions

```javascript
import { createEmitter } from 'particle-explosions'

const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')

const emitter = createEmitter(ctx)

emitter.explode(250) // 250 particles

setTimeout(() => {
  emitter.explode(150) // 150 particles
}, 250)
```

### Particle properties

See table below for full details of particle properties.

```javascript
import { createEmitter } from 'particle-explosions'

const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')

const emitter = createEmitter(ctx)

emitter.explode(250, {
  xPos: 300,
  yPos: 300,
  minSize: 5,
  maxSize: 30,
  minSpeed: 50,
  maxSpeed: 100,
  resistance: 0.85,
  gravity: 0.98,
  decay: 0.9,
  sizeToRemove: 0.1,
  color: '#FF0000' // Also accepts array: ['#00FF00', '#0000FF']
})
```

### Custom execution

For more control, you can draw the particles to the canvas in your own loop by setting the **pause** option to **true** when creating your emitter:

```javascript
import { createEmitter } from 'particle-explosions'

const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')

const emitter = createEmitter(ctx, { pause: true }) // <-- Pause

emitter.explode(250) // <-- Does not automatically draw to canvas

// Draw to canvas in loop
const loop = () => {
  if (emitter.isExploding) {
    requestAnimationFrame(loop)
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  emitter.draw()
}

loop()
```

## Particle properties

All particle properties are optional as they have default values:

| Property     | Description                                       | Default          |
| :----------- | :------------------------------------------------ | :--------------- |
| xPos         | Start x position of particles (px)                | Center of canvas |
| yPos         | Start y position of particles (px)                | Center of canvas |
| minSize      | Minimum size of particles (px)                    | 25               |
| maxSize      | Maximum size of particles (px)                    | 25               |
| minSpeed     | Minimum speed of particles                        | 50               |
| maxSpeed     | Maximum speed of particles                        | 100              |
| resistance   | Rate at which particles slow down                 | 0.85             |
| gravity      | Rate at which particles fall                      | 0                |
| decay        | Rate at which particles shrink                    | 0.9              |
| sizeToRemove | Size at which particles disappear                 | 0.1              |
| color        | Color of particles (also accepts array of colors) | '#000000'        |
