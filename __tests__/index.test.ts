import { createEmitter } from '../src'
import { Emitter }  from '../src/Emitter'

test('does not throw on instantiation', () => {
  const ctx = {} as CanvasRenderingContext2D

  expect(() => createEmitter(ctx)).not.toThrow()
})

test('returns an "Emitter" instance when called', () => {
  const ctx = {} as CanvasRenderingContext2D
  const emitter = createEmitter(ctx)

  expect(emitter).toBeInstanceOf(Emitter)
})
