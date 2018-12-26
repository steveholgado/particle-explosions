class Emitter {

  constructor (particlePool, ctx, options = {}) {
    if (!particlePool) throw 'No particle pool'
    if (!ctx) throw 'No canvas ctx'

    this._ctx = ctx
    this._particlePool = particlePool
    this._particles = []
    this._isLooping = false
    this._pause = options.pause
  }

  get isExploding () {
    return this._particles.length ? true : false
  }

  explode (numOfParticles, props = {}) {
    if (!numOfParticles) return

    for (let i = 0; i < numOfParticles; i++) {
      this._createParticle(props)
    }
  
    if (!this._pause && !this._isLooping) {
      this._isLooping = true
      this._drawLoop()
    }
  }

  draw () {
    if (!this.isExploding) return

    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)

    this._particles.forEach((particle, index) => {
      particle.update()
      particle.draw(this._ctx)

      // Remove particle if no longer active after update
      if (!particle.isActive) {
        this._removeParticle(index)
      }
    })
  }

  _drawLoop () {
    if (this.isExploding) {
      requestAnimationFrame(this._drawLoop.bind(this))
    } else {
      this._isLooping = false
    }

    this.draw()
  }

  _createParticle (props = {}) {
    const particle = this._particlePool.get()
    particle.init(props)
    this._particles.push(particle)
  }

  _removeParticle (index) {
    const particle = this._particles.splice(index, 1)[0]
    this._particlePool.recycle(particle)
  }

}

module.exports = Emitter
