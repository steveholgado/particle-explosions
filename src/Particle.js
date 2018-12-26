class Particle {

  constructor (props = {}) {
    this.init(props)
  }

  get isActive () {
    return this._size > this._sizeToRemove
  }

  init (props = {}) {
    // Set properties (or defaults)
    this._xPos         = props.xPos         || null
    this._yPos         = props.yPos         || null
    this._minSize      = props.minSize      || 5
    this._maxSize      = props.maxSize      || 30
    this._minSpeed     = props.minSpeed     || 50
    this._maxSpeed     = props.maxSpeed     || 100
    this._resistance   = props.resistance   || 0.85 
    this._gravity      = props.gravity      || 0.98
    this._decay        = props.decay        || 0.9
    this._sizeToRemove = props.sizeToRemove || 0.1
    this._color        = props.color        || '#000000'

    // If color is array, select color at random
    if (Array.isArray(props.color)) {
      const randomIndex = Math.floor(Math.random() * props.color.length)
      this._color = props.color[randomIndex]
    }

    // Generate random particle size betwen minimum and maximum
    const sizeRange  = this._maxSize - this._minSize + 1
    const sizeRandom = Math.random() * sizeRange
    this._size = Math.floor(sizeRandom + this._minSize)

    // Generate random particle speed betwen minimum and maximum
    const speedRange  = this._maxSpeed - this._minSpeed + 1
    const speedRandom = Math.random() * speedRange
    this._speed = Math.floor(speedRandom + this._minSpeed)

    // Set initial velocity ensuring particles head in all directions
    this._xVel = Math.random() - 0.5
    this._yVel = Math.random() - 0.5

    // Apply particle speed
    this._xVel *= this._speed
    this._yVel *= this._speed
  }

  update () {
    // Apply resistance
    this._xVel *= this._resistance
    this._yVel *= this._resistance
    
    // Apply velocity
    this._xPos += this._xVel
    this._yPos += this._yVel

    // Apply gravity if specified - defaults to zero
    this._yPos += this._gravity
    
    // Apply decay to shrink particle
    this._size *= this._decay
  }

  draw (ctx) {
    if (!ctx || !this.isActive) return

    // If position not set, set to center of canvas
    if (this._xPos === null) this._xPos = ctx.canvas.width / 2
    if (this._yPos === null) this._yPos = ctx.canvas.height / 2

    // Draw particle on canvas
    ctx.fillStyle = this._color
    ctx.beginPath()
    ctx.arc(
      this._xPos, 
      this._yPos,
      this._size / 2,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }

}

module.exports = Particle
