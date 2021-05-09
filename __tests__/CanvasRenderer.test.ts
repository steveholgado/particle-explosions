import { CanvasRenderer } from '../src/CanvasRenderer'

function createFakeCanvasCtx() {
  return {
    canvas: {
      width: 500,
      height: 250
    },
    fillStyle: undefined,
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn()
  }
}

test('does not throw on instantiation', () => {
  const ctx = createFakeCanvasCtx()
  expect(() => new CanvasRenderer(ctx as any)).not.toThrow()
})

test('returns the correct canvas dimensions', () => {
  const ctx = createFakeCanvasCtx()
  const canvasRenderer = new CanvasRenderer(ctx as any)

  expect(canvasRenderer.canvasWidth).toBe(ctx.canvas.width)
  expect(canvasRenderer.canvasHeight).toBe(ctx.canvas.height)
})

test('draws a circle to the canvas', () => {
  const ctx = createFakeCanvasCtx()
  const canvasRenderer = new CanvasRenderer(ctx as any)

  const xPos = 100
  const yPos = 100
  const size = 10
  const color = '#000000'

  canvasRenderer.drawFilledCircle(size, xPos, yPos, color)

  expect(ctx.beginPath).toBeCalledTimes(1)
  expect(ctx.arc).toBeCalledTimes(1)
  expect(ctx.arc).toBeCalledWith(xPos, yPos, size / 2, 0, 2 * Math.PI)
  expect(ctx.fillStyle).toBe(color)
  expect(ctx.fill).toBeCalledTimes(1)
})

test('draws a circle at the centre of the canvas if x and y positions are undefined', () => {
  const ctx = createFakeCanvasCtx()
  const canvasRenderer = new CanvasRenderer(ctx as any)

  const xPos = undefined
  const yPos = undefined
  const size = 10
  const color = '#000000'

  canvasRenderer.drawFilledCircle(size, xPos, yPos, color)

  expect(ctx.arc).toBeCalledWith(ctx.canvas.width / 2, ctx.canvas.height / 2, size / 2, 0, 2 * Math.PI)
})

test('does not set fill colour if no colour is given', () => {
  const ctx = createFakeCanvasCtx()
  const canvasRenderer = new CanvasRenderer(ctx as any)

  const xPos = 100
  const yPos = 100
  const size = 10

  canvasRenderer.drawFilledCircle(size, xPos, yPos)

  expect(ctx.fillStyle).toBeUndefined()
})

test('clears the canvas before drawing', () => {
  const ctx = createFakeCanvasCtx()
  const canvasRenderer = new CanvasRenderer(ctx as any)

  canvasRenderer.clear()

  expect(ctx.clearRect).toBeCalledTimes(1)
  expect(ctx.clearRect).toBeCalledWith(0, 0, ctx.canvas.width, ctx.canvas.height)
})
