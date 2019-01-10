const Emitter = require('./Emitter')
const Particle = require('./Particle')
const ObjectPool = require('./ObjectPool')

const particlePool = new ObjectPool(Particle)

const createEmitter = (ctx, options) => {
  return new Emitter(particlePool, ctx, options)
}

module.exports = { createEmitter }
