class Particle {

  constructor (options = {}) {
    this.init(options) // Initialize particle
  }

  init (options = {}) {
    // Set properties, or defaults if not passed in
    this.xPos         = options.xPos         || 0
    this.yPos         = options.yPos         || 0
    this.minSize      = options.minSize      || 25
    this.maxSize      = options.maxSize      || 25
    this.minSpeed     = options.minSpeed     || 50
    this.maxSpeed     = options.maxSpeed     || 100
    this.resistance   = options.resistance   || 0.85 
    this.gravity      = options.gravity      || 0
    this.decay        = options.decay        || 0.9
    this.sizeToRemove = options.sizeToRemove || 0.1
    this.color        = options.color        || '#000000'

    // Generate random particle size betwen minimum and maximum
    this.size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1) + this.minSize)

    // Generate random particle speed betwen minimum and maximum
    this.speed = Math.floor(Math.random() * (this.maxSpeed - this.minSpeed + 1) + this.minSpeed)

    // Set initial velocity ensuring particles head in all directions
    this.xVel = Math.random() - 0.5
    this.yVel = Math.random() - 0.5

    // Apply particle speed
    this.xVel *= this.speed
    this.yVel *= this.speed

    // Enable particle
    this.enabled = true 
  }

  update () {
    // Apply resistance
    this.xVel *= this.resistance
    this.yVel *= this.resistance
    
    // Apply velocity
    this.xPos += this.xVel
    this.yPos += this.yVel

    // Apply gravity if specified - defaults to zero
    this.yPos += this.gravity
    
    // Apply decay to shrink particle
    this.size *= this.decay
      
    // Disable particle once decayed to specified size
    if (this.size <= this.sizeToRemove) {
        this.enabled = false
    }
  }

}

export default Particle
