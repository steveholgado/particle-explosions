import { ICanvasRenderer } from './CanvasRenderer'
import { IParticleFactory } from './ParticleFactory'
import { IParticle, ParticleOptions } from './Particle'

export interface IEmitter {
  isExploding: boolean
  explode: (numOfParticles: number, particleOptions?: ParticleOptions) => void
  draw: () => void
}

export type EmitterOptions = {
  pause?: boolean
}

export class Emitter implements IEmitter {

  private _canvasRenderer: ICanvasRenderer
  private _particleFactory: IParticleFactory

  private _particles: IParticle[] = []
  private _isLooping: boolean = false
  private _pause: boolean = false

  constructor(canvasRenderer: ICanvasRenderer, particleFactory: IParticleFactory, options: EmitterOptions = {}) {
    this._canvasRenderer = canvasRenderer
    this._particleFactory = particleFactory
    this._pause = !!options.pause
  }

  get isExploding(): boolean {
    return !!this._particles.length
  }

  explode(numOfParticles: number, particleOptions = {}): void {
    if (!numOfParticles) return

    for (let i = 0; i < numOfParticles; i++) {
      this._createParticle(particleOptions)
    }
  
    if (!this._pause && !this._isLooping) {
      this._isLooping = true
      this._drawLoop()
    }
  }

  draw(): void {
    if (!this.isExploding) return
    if (!this._canvasRenderer) return

    this._canvasRenderer.clear()

    this._particles.forEach((particle, index) => {
      particle.update()

      const { isActive, size, xPos, yPos, color } = particle

      isActive
        ? this._canvasRenderer.drawFilledCircle(size, xPos, yPos, color)
        : this._removeParticle(index)
    })
  }

  private _drawLoop(): void {
    if (this.isExploding) {
      requestAnimationFrame(this._drawLoop.bind(this))
    }
    else {
      this._isLooping = false
    }

    this.draw()
  }

  private _createParticle(particleOptions: ParticleOptions = {}): void {
    if (typeof particleOptions.xPos !== 'number') {
      particleOptions.xPos = this._canvasRenderer.canvasWidth / 2
    }

    if (typeof particleOptions.yPos !== 'number') {
      particleOptions.yPos = this._canvasRenderer.canvasHeight / 2
    }

    const particle = this._particleFactory.create(particleOptions)
    this._particles.push(particle)
  }

  private _removeParticle(index: number): void {
    this._particles.splice(index, 1)
  }

}
