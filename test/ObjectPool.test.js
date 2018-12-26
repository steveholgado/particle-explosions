const { test } = require('tap')
const ObjectPool = require('../src/ObjectPool')

test('Public interface', t => {
  class Constr {}
  const pool = new ObjectPool(Constr)

  t.type(pool.get, 'function', 'should have a public "get" method')
  t.type(pool.recycle, 'function', 'should have a public "recycle" method')
  t.end()
})

test('Instantiation', t => {
  class Constr {}
  const poolWithoutConstr = () => new ObjectPool()
  const poolWithConstr = () => new ObjectPool(Constr)

  t.throws(poolWithoutConstr, 'should throw if no constructor passed')
  t.doesNotThrow(poolWithConstr, 'should not throw if a constructor is passed')
  t.end()
})

test('Object retrieval', t => {
  class Constr {
    constructor(val) {
      this.val = val
    }
  }

  const pool = new ObjectPool(Constr)

  const obj1 = pool.get(1)
  t.equal(obj1.val, 1, 'should return new object if pool empty')

  pool.recycle(obj1)
  const obj2 = pool.get(2)
  t.equal(obj2.val, 1, 'should return recycled object if available')
  t.end()
})
