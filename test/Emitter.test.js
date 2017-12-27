const { test } = require('tap')
const Emitter = require('../src/Emitter')

const mockCanvasCtx = {
	canvas: {
		width: 500,
		height: 250
	},
	beginPath() {},
	arc() {},
	fill() {}
}

test('New Emitter object', t => {
  const emitter = new Emitter(mockCanvasCtx)

	t.deepEqual(emitter.particles, [], 'should initialise with zero particles')
	t.deepEqual(emitter.disabledParticles, [], 'should initialise with zero disabled particles')
	t.end()
})

test('Calling "explode" method', t => {
	const emitter = new Emitter(mockCanvasCtx)
  emitter.explode(100)

  t.equal(emitter.particles.length, 100, 'should create correct number of particles')

  const emitterNoCtx = new Emitter()
  emitterNoCtx.explode(100)

  t.deepEqual(emitterNoCtx.particles, [], 'should not create particles if no ctx argument')
  t.end()
})

test('Calling "update" method', t => {
	const emitter = new Emitter(mockCanvasCtx)
  emitter.explode(100)
  while (emitter.isExploding) {
  	emitter.update()
  }

  t.equal(emitter.particles.length, 0, 'should have empty "particles" array when explosion completes')
  t.equal(emitter.disabledParticles.length, 100, 'should have full "disabledParticles" array when explosion completes')

  emitter.explode(50)

  const particleState = emitter.particles.length == 50 && emitter.disabledParticles.length == 50
  t.equal(particleState, true, 'should re-use disabled particles if available')
	t.end()
})
