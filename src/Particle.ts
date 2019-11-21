export interface IParticle {
  isActive: boolean
  xPos?: number
  yPos?: number
  size: number
  color: string
  update: () => void
}

export type ParticleOptions = {
  xPos?: number
  yPos?: number
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  resistance?: number
  gravity?: number
  decay?: number
  sizeToRemove?: number
  color?: string | string[]
}

export default class Particle implements IParticle {

  // Set defaults
  public xPos: number           = 0
  public yPos: number           = 0
  public color: string          = '#000000'
  private _minSize: number      = 5
  private _maxSize: number      = 30
  private _minSpeed: number     = 50
  private _maxSpeed: number     = 100
  private _resistance: number   = .85
  private _gravity: number      = .98
  private _decay: number        = .9
  private _sizeToRemove: number = .1
  
  // Calculated in constructor
  public size: number
  private _speed: number

  // Set initial velocity ensuring particles head in all directions
  private _xVel: number = Math.random() - .5
  private _yVel: number = Math.random() - .5

  constructor(options: ParticleOptions = {}) {
    // Set properties, if provided
    if (typeof options.xPos === 'number')
      this.xPos = options.xPos

    if (typeof options.yPos === 'number')
      this.yPos = options.yPos

    if (typeof options.minSize === 'number')
      this._minSize = Math.max(options.minSize, .1)

    if (typeof options.maxSize === 'number')
      this._maxSize = options.maxSize

    if (typeof options.minSpeed === 'number')
      this._minSpeed = Math.max(options.minSpeed, .1)

    if (typeof options.maxSpeed === 'number')
      this._maxSpeed = options.maxSpeed

    if (typeof options.resistance === 'number')
      this._resistance = Math.max(options.resistance, 0)

    if (typeof options.gravity === 'number')
      this._gravity = Math.max(options.gravity, 0)

    if (typeof options.decay === 'number')
      this._decay = Math.max(options.decay, .1)

    if (typeof options.sizeToRemove === 'number')
      this._sizeToRemove = Math.max(options.sizeToRemove, .1)

    this.color = Array.isArray(options.color)
      ? this._getRandomArrayItem(options.color) // If array, select color at random
      : options.color

    // Generate random particle size
    this.size = this._randomNumFromRange(this._minSize, this._maxSize)

    // Generate random particle speed
    this._speed = this._randomNumFromRange(this._minSpeed, this._maxSpeed)

    // Apply particle speed
    this._xVel *= this._speed
    this._yVel *= this._speed
  }

  get isActive(): boolean {
    return this.size > this._sizeToRemove
  }

  update(): void {
    if (!this.isActive) return

    // Apply resistance
    this._xVel *= this._resistance
    this._yVel *= this._resistance

    // Apply decay to shrink particle
    this.size *= this._decay
    
    // Update position
    this.xPos += this._xVel
    this.yPos += this._yVel

    // Apply gravity to position
    this.yPos += this._gravity
  }

  _randomNumFromRange(min: number = 0, max: number = 0): number {
    const range  = max - min + 1
    const randomNum = Math.random() * range
    return Math.floor(randomNum + min)
  }

  _getRandomArrayItem(arr: any[]): any {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }

}
