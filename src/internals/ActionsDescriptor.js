class ActionsDescriptor {

  constructor (name, factory) {
    this._name = name;
    this._factory = factory;
  }

  get name () {
    return this._name;
  }
}

export default ActionsDescriptor;
