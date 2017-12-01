import Particle from './Particle'

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
      particle.init(options) // Reset particle
    }

    // Otherwise create new particle
    else {
      particle = new Particle(this.ctx, options)
      this.particles.push(particle)
    }
  }

  removeParticle (particle) {
    // Disable particle and store reference for possible re-use
    particle.enabled = false
    this.disabledParticles.push(particle)
  }

  explode (numOfParticles, options) {
    if (!this.ctx) return // Return early if no canvas context passed in

    this.isExploding = true

    for (let i = 0; i < numOfParticles; i++) {
      this.createParticle(options)
    }
  }

  update () {
    // Check if all particles disabled
    if (this.particles.every(particle => !particle.enabled)) {
      this.isExploding = false
      return
    }

    // Update each particle
    this.particles.forEach(particle => {
      if (!particle.enabled) return // Skip if particle disabled

      particle.update()

      // Remove particle if disabled after update
      if (!particle.enabled) this.removeParticle(particle)
    })
  }
    
}

export default Emitter
