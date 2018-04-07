# Particle Explosions

Create particle explosions on a HTML5 canvas element.

![Demo](demo.gif)

## Installation

```
npm install --save particle-explosions
```

## Usage

```javascript
import particleExplosions from 'particle-explosions'

const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')

// Create new particle emitter
const emitter = new particleExplosions.Emitter(ctx)

// Particle options
const options = {
  xPos         : 100,
  yPos         : 100,
  minSize      : 5,
  maxSize      : 30,
  minSpeed     : 50,
  maxSpeed     : 100,
  resistance   : 0.85,
  gravity      : 0.98,
  decay        : 0.9,
  sizeToRemove : 0.1,
  color        : '#000000'
}

// Explode with 250 particles
emitter.explode(250, options)

// Draw to canvas in loop
// ...or call emitter.update() in your existing loop
const loop = function() {
  if (emitter.isExploding) {
    requestAnimationFrame(loop)
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  emitter.update()
}

loop()
```

## Particle options

All particle options are optional as they have default values:

| Property     | Description                        | Default          |
| :----------- | :--------------------------------- | :--------------- |
| xPos         | Start x position of particles (px) | Center of canvas |
| yPos         | Start y position of particles (px) | Center of canvas |
| minSize      | Minimum size of particles (px)     | 25               |
| maxSize      | Maximum size of particles (px)     | 25               |
| minSpeed     | Minimum speed of particles         | 50               |
| maxSpeed     | Maximum speed of particles         | 100              |
| resistance   | Rate at which particles slow down  | 0.85             |
| gravity      | Rate at which particles fall       | 0                |
| decay        | Rate at which particles shrink     | 0.9              |
| sizeToRemove | Size at which particles disappear  | 0.1              |
| color        | Color of particles                 | '#000000'        |