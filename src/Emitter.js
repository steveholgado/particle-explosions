const Particle = require('./Particle')

class Emitter {

  constructor (ctx) {
    this.ctx = ctx
    this.particles = []
    this.disabledParticles = [] // Store references to disabled particles
    this.isExploding = false
  }
    
  createParticle (options) {
    let particle
    
    // Re-use disabled particle if possible
    if (this.disabledParticles.length > 0) {
      particle = this.disabledParticles.shift()
      this.particles.push(particle)
      particle.init(options) // Re-initialize particle
    }

    // Otherwise create new particle
    else {
      particle = new Particle(options)
      this.particles.push(particle)
    }
  }

  removeParticle (index) {
    // Store reference for possible re-use
    let particle = this.particles.splice(index, 1)[0]
    this.disabledParticles.push(particle)
  }

  explode (numOfParticles, options = {}) {
    // Return early if no canvas context passed in
    if (!this.ctx) return

    // Set default position to canvas center
    options.xPos = options.xPos || this.ctx.canvas.width / 2
    options.yPos = options.yPos || this.ctx.canvas.height / 2

    // Flag that emitter has started exploding
    this.isExploding = true

    // Create particles
    for (let i = 0; i < numOfParticles; i++) {
      this.createParticle(options)
    }
  }

  update () {
    const allParticlesDisabled = this.particles.every(particle => !particle.enabled)

    // If all particles disabled, flag that emitter is no longer exploding
    if (allParticlesDisabled) {
      this.isExploding = false
      return
    }

    // Update each particle
    this.particles.forEach((particle, index) => {
      particle.update()

      // Remove particle if disabled after update
      if (!particle.enabled) {
        this.removeParticle(index)
      }
    })

    // Draw particles to canvas
    this.draw()
  }

  draw () {
    this.particles.forEach(particle => {
      this.ctx.fillStyle = particle.color

      const halfSize = particle.size / 2

      // Draw particle on canvas
      this.ctx.beginPath()
      this.ctx.arc(particle.xPos, particle.yPos, halfSize, 0, 2 * Math.PI)
      this.ctx.fill()
    })
  }
    
}

module.exports = Emitter
