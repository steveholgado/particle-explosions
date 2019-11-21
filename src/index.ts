import Emitter, { IEmitter, EmitterOptions } from './Emitter'
import ParticleFactory from './ParticleFactory'
import CanvasRenderer from './CanvasRenderer'

export function createEmitter(ctx: CanvasRenderingContext2D, options?: EmitterOptions): IEmitter {
  const canvasRenderer = new CanvasRenderer(ctx)
  const particleFactory = new ParticleFactory()

  return new Emitter(canvasRenderer, particleFactory, options)
}
