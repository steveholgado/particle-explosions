import { ParticleFactory}  from '../src/ParticleFactory'
import Particle from '../src/Particle'

test('does not throw on instantiation', () => {
  expect(() => new ParticleFactory()).not.toThrow()
})

test('returns a "Particle" instance when the "create" method is called', () => {
  const particleFactory = new ParticleFactory()
  const particle = particleFactory.create()

  expect(particle).toBeInstanceOf(Particle)
})
