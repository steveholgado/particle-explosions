# explodeJS

Creates particle explosions on a HTML5 canvas element.

### How to use:

Include ***explode.min.js*** in your page and use like this:

```javascript
// Canvas context
var ctx = document.getElementById('canvas-id').getContext('2d');

// Particle options
var options = {
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
};

// Create new particle emitter
var emitter = new explodeJS.Emitter(ctx);

// Explode with 250 particles
emitter.explode(250, options);

// Draw to canvas in loop
// ...or call explosion.update() in your existing canvas render loop
var loop = function() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    emitter.update();
    requestAnimationFrame(loop);
}
loop();
```