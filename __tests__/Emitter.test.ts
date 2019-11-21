import Emitter from '../src/Emitter'

Object.defineProperty(window, 'requestAnimationFrame', {
  value: () => {}
})

function createCanvasRenderer() {
  return {
    drawFilledCircle: jest.fn(),
    clear: jest.fn(),
    canvasWidth: 500,
    canvasHeight: 250
  }
}

function createParticleFactory() {
  return {
    create: jest.fn().mockImplementation(() => ({
      isActive: true,
      xPos: undefined,
      yPos: undefined,
      size: 10,
      color: '#000000',
      update() {}
    }))
  }
}

test('does not throw on instantiation', () => {
  const canvasRenderer = createCanvasRenderer()
  const particleFactory = createParticleFactory()

  expect(() => new Emitter(canvasRenderer, particleFactory)).not.toThrow()
})

test('does not explode if number of particles not given', () => {
  const canvasRenderer = createCanvasRenderer()
  const particleFactory = createParticleFactory()
  const emitter = new Emitter(canvasRenderer, particleFactory)
  emitter.explode(0)

  expect(emitter.isExploding).not.toBe(true)
})

test('creates the given number of particles', () => {
  const canvasRenderer = createCanvasRenderer()
  const particleFactory = createParticleFactory()
  const emitter = new Emitter(canvasRenderer, particleFactory)
  emitter.explode(10)

  expect(particleFactory.create).toBeCalledTimes(10)
})

test('sets particle x and y positions to canvas center if no options given', () => {
  const canvasRenderer = createCanvasRenderer()
  const particleFactory = createParticleFactory()
  const emitter = new Emitter(canvasRenderer, particleFactory)
  emitter.explode(1)

  expect(particleFactory.create).toBeCalledWith(
    expect.objectContaining({
      xPos: canvasRenderer.canvasWidth / 2,
      yPos: canvasRenderer.canvasHeight/ 2
    })
  )
})

test('sets particle x and y positions to canvas center if positions given are not of type number', () => {
  const canvasRenderer = createCanvasRenderer()
  const particleFactory = createParticleFactory()
  const emitter = new Emitter(canvasRenderer, particleFactory)
  emitter.explode(1, {
    xPos: 'string',
    yPos: 'string'
  })

  expect(particleFactory.create).toBeCalledWith(
    expect.objectContaining({
      xPos: canvasRenderer.canvasWidth / 2,
      yPos: canvasRenderer.canvasHeight/ 2
    })
  )
})

test('draws particles to the canvas', () => {
  const canvasRenderer = createCanvasRenderer()
  const particleFactory = createParticleFactory()
  const emitter = new Emitter(canvasRenderer, particleFactory)
  emitter.explode(10)

  expect(canvasRenderer.drawFilledCircle).toBeCalled()
})

test('clears the canvas before each draw', () => {
  const canvasRenderer = createCanvasRenderer()
  const particleFactory = createParticleFactory()
  const emitter = new Emitter(canvasRenderer, particleFactory)
  emitter.explode(10)

  expect(canvasRenderer.clear).toBeCalled()
  expect(canvasRenderer.drawFilledCircle).toBeCalled()
})

test('does not draw to canvas if "pause" option is true', () => {
  const canvasRenderer = createCanvasRenderer()
  const particleFactory = createParticleFactory()
  const emitter = new Emitter(canvasRenderer, particleFactory, { pause: true })
  emitter.explode(10)

  expect(canvasRenderer.drawFilledCircle).not.toBeCalled()
})
