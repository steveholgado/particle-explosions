const { test } = require('tap')
const Emitter = require('../src/Emitter')

requestAnimationFrame = (fn) => setTimeout(fn, 0)

const particlePool = {
  get () {
    return {
      init () {},
      update () {},
      draw () {}
    }
  },
  recycle () {}
}

const ctx = {
  canvas: {
    width: 500,
    height: 250
  },
  clearRect () {},
  beginPath () {},
  arc () {},
  fill () {}
}

test('Public interface', t => {
  const emitter = new Emitter(particlePool, ctx)

  t.type(emitter.explode, 'function', 'should have a public "explode" method')
  t.type(emitter.draw, 'function', 'should have a public "draw" method')
  t.type(emitter.isExploding, 'boolean', 'should have a public "isExploding" property')
  t.end()
})

test('Instantiation', t => {
  const emitterWithoutParticlePool = () => new Emitter(undefined, ctx)
  const emitterWithoutCtx = () => new Emitter(particlePool, undefined)
  const emitterWithParticlePoolAndCtx = () => new Emitter(particlePool, ctx)

  t.throws(emitterWithoutParticlePool, 'should throw if no particle pool passed')
  t.throws(emitterWithoutCtx, 'should throw if no canvas ctx passed')
  t.doesNotThrow(emitterWithParticlePoolAndCtx, 'should not throw if a particle pool and canvas ctx are passed')
  t.end()
})

test('Particle creation', t => {
  const emitter = new Emitter(particlePool, ctx, { pause: true })
  emitter.explode()

  t.equal(emitter._particles.length, 0, 'should not create particles if no argument passed')
  
  emitter.explode(100)
  t.equal(emitter._particles.length, 100, 'should create correct number of particles')
  t.end()
})

test('Particle removal', t => {
  const emitter = new Emitter(particlePool, ctx, { pause: false })

  emitter.explode(100)
  while (emitter.isExploding) {
    emitter.draw()
  }

  t.equal(emitter._particles.length, 0, 'should have removed all particles once explosion completes')
  t.end()
})

test('Loop execution', t => {
  const emitter = new Emitter(particlePool, ctx)
  const emitterPaused = new Emitter(particlePool, ctx, { pause: true })

  emitter.explode(100)
  emitterPaused.explode(100)

  t.equal(emitter._isLooping, true, 'should execute draw loop if "pause" flag not set')
  t.equal(emitterPaused._isLooping, false, 'should not execute draw loop if "pause" flag set to true')
  t.end()
})
