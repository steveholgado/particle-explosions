const { test } = require('tap')
const Particle = require('../src/Particle')

const options = {
  xPos: 100,
  yPos: 100,
  minSize: 5,
  maxSize: 30,
  minSpeed: 50,
  maxSpeed: 100,
  resistance: 0.85,
  gravity: 0.98,
  decay: 0.9,
  sizeToRemove: 0.1,
  color: '#000000'
}

const getExpectedState = (particle) => ({
  xPos: particle._xPos,
  yPos: particle._yPos,
  minSize: particle._minSize,
  maxSize: particle._maxSize,
  minSpeed: particle._minSpeed,
  maxSpeed: particle._maxSpeed,
  resistance: particle._resistance,
  gravity: particle._gravity,
  decay: particle._decay,
  sizeToRemove: particle._sizeToRemove,
  color: particle._color
})

test('Public interface', t => {
  const particle = new Particle()

  t.type(particle.init, 'function', 'should have a public "init" method')
  t.type(particle.update, 'function', 'should have a public "update" method')
  t.type(particle.draw, 'function', 'should have a public "draw" method')
  t.type(particle.isActive, 'boolean', 'should have a public "isActive" property')
  t.end()
})

test('Instantiation', t => {
  const particleWithOptions = new Particle(options)
  const particleWithoutOptions = new Particle()
  const particleWithIncorrectOption = new Particle({ incorrect: true })

  const expectedStateWithOptions = getExpectedState(particleWithOptions)
  const expectedStateWithoutOptions = getExpectedState(particleWithoutOptions)
  const allSetToDefault = Object.values(expectedStateWithoutOptions)
    .every(val => val !== undefined)

  t.deepEqual(expectedStateWithOptions, options, 'should initialise with passed options')
  t.equal(allSetToDefault, true, 'should initialise with default values if no options passed')
  t.equal(particleWithIncorrectOption.incorrect, undefined, 'should ignore incorrect options ')
  t.end()
})

test('Re-initialisation', t => {
  const particle = new Particle()
  
  const expectedStateBeforeInit = getExpectedState(particle)

  particle.init(options)
  const expectedStateAfterInit = getExpectedState(particle)

  t.notEqual(expectedStateBeforeInit, expectedStateAfterInit, 'should update props with new options')
  t.end()
})

test('Color setting', t => {
  const color = '#FF0000'
  const colorArr = ['#FF0000', '#00FF00', '0000FF']

  const particleColorString = new Particle({ color })
  const particleColorArray = new Particle({ color: colorArr })

  t.equal(particleColorString._color, color, 'should set string color correctly')
  t.equal(colorArr.includes(particleColorArray._color), true, 'should select color from array if passed')
  t.end()
})

test('Size reduction', t => {
  const particle = new Particle()

  const sizeBefore = particle._size
  particle.update()
  const sizeAfter = particle._size

  t.equal(sizeAfter < sizeBefore, true, 'should reduce particle size when "update" is called')
  t.end()
})

test('Drawing to canvas', t => {
  const ctx = {
    canvas: {
      width: 500,
      height: 250
    },
    accessed: false,
    clearRect () { this.accessed = true },
    beginPath () { this.accessed = true },
    arc () { this.accessed = true },
    fill () { this.accessed = true }
  }

  const particle = new Particle()
  particle.draw(ctx)

  t.equal(ctx.accessed, true, 'should draw to canvas when "draw" method called')
  t.end()
})
