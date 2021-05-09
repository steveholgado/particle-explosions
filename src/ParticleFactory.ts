import Particle, { IParticle, ParticleOptions } from './Particle'

export interface IParticleFactory {
  create: (options?: ParticleOptions) => IParticle
}

export class ParticleFactory implements IParticleFactory {
  create(options = {}) {
    return new Particle(options)
  }
}
