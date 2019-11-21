import Particle from '../src/Particle'

test('does not throw on instantiation', () => {
  expect(() => new Particle()).not.toThrow()
})

test('sets x and y positions if supplied as options', () => {
  const xPos = 250
  const yPos = 125
  const particle = new Particle({ xPos, yPos })

  expect(particle.xPos).toBe(xPos)
  expect(particle.yPos).toBe(yPos)
})

test('respects min and max size if supplied as options', () => {
  const minSize = 5
  const maxSize = 30
  const particle = new Particle({ minSize, maxSize })

  expect(particle.size).toBeGreaterThanOrEqual(minSize)
  expect(particle.size).toBeLessThanOrEqual(maxSize)
})

test('sets colour if supplied as an option', () => {
  const color = '#FF0000'
  const particle = new Particle({ color })

  expect(particle.color).toBe(color)
})

test('selects random colour if array supplied as an option', () => {
  const colorsArr = ['#FF0000', '#00FF00', '0000FF']
  const particle = new Particle({ color: colorsArr })

  expect(colorsArr).toContain(particle.color)
})

test('is active if size is greater than size to remove', () => {
  const activeParticle = new Particle({ sizeToRemove: .1 })
  const inactiveParticle = new Particle({ sizeToRemove: .1 })
  activeParticle.size = .5
  inactiveParticle.size = .05

  expect(activeParticle.isActive).toBe(true)
  expect(inactiveParticle.isActive).toBe(false)
})

test('reduces size on update', () => {
  const particle = new Particle()

  const sizeBefore = particle.size
  particle.update()
  const sizeAfter = particle.size

  expect(sizeAfter).toBeLessThan(sizeBefore)
})
