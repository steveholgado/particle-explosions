const { test } = require('tap')
const Particle = require('../src/Particle')

test('New Particle object', t => {
  const options = {
    xPos         : 100,
    yPos         : 100,
    minSize      : 5,
    maxSize      : 30,
    minSpeed     : 50,
    maxSpeed     : 100,
    resistance   : 0.85,
    gravity      : 0.98,
    decay        : 0.9,
    sizeToRemove : 0.1,
    color        : '#000000'
  }

  const particle = new Particle(options)
  const particleState = {
    xPos         : particle.xPos,
    yPos         : particle.yPos,
    minSize      : particle.minSize,
    maxSize      : particle.maxSize,
    minSpeed     : particle.minSpeed,
    maxSpeed     : particle.maxSpeed,
    resistance   : particle.resistance,
    gravity      : particle.gravity,
    decay        : particle.decay,
    sizeToRemove : particle.sizeToRemove,
    color        : particle.color
  }

  t.deepEqual(particle.enabled, true, 'should be enabled')
  t.deepEqual(particleState, options, 'should initialise with state equal to options')

  const particleNoOptions = new Particle()
  const particleNoOptionsState = {
    xPos         : particleNoOptions.xPos,
    yPos         : particleNoOptions.yPos,
    minSize      : particleNoOptions.minSize,
    maxSize      : particleNoOptions.maxSize,
    minSpeed     : particleNoOptions.minSpeed,
    maxSpeed     : particleNoOptions.maxSpeed,
    resistance   : particleNoOptions.resistance,
    gravity      : particleNoOptions.gravity,
    decay        : particleNoOptions.decay,
    sizeToRemove : particleNoOptions.sizeToRemove,
    color        : particleNoOptions.color
  }

  let outcome = true
  for (let key in particleNoOptionsState) {
    if (particleNoOptionsState[key] === undefined) {
      outcome = false
    }
  }

  t.deepEqual(outcome, true, 'should initialise with default state if no options passed')
  t.end()
})
