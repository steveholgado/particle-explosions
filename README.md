# explode.js

Creates particle explosions on a HTML5 canvas element.

### How to use:

Include ***explode.min.js*** in your page:
```
<script src="path/to/explode.min.js"></script>
```

Use like this:

```javascript
const canvas = document.getElementById('canvas-id')
const ctx = canvas.getContext('2d')

// Create new particle emitter
const emitter = new explodejs.Emitter(ctx)

// Particle options
const options = {
  xPos         : 100,       // Start x position of particles
  yPos         : 100,       // Start y position of particles
  minSize      : 5,         // Minimum size of particles
  maxSize      : 30,        // Maximum size of particles
  color        : '#000000', // Color of particles
  resistance   : 0.85,      // Rate at which particles slow down
  gravity      : 0.98,      // Rate at which particles fall
  decay        : 0.9,       // Rate at which particles shrink
  sizeToRemove : 0.1,       // Size at which particles disappear
  minSpeed     : 50,        // Minimum speed of particles
  maxSpeed     : 100        // Maximum speed of particles
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