class ObjectPool {

  constructor (Constr) {
    if (!Constr) throw 'No constructor for particle instatiation'

    this._pool = []
    this._Constr = Constr
  }

  get (...props) {
    return this._pool.pop() || new this._Constr(...props)
  }

  recycle (obj) {
    if (obj && obj instanceof this._Constr) {
      this._pool.push(obj)
    }
  }

}

module.exports = ObjectPool
