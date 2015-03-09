class ActionsDescriptor {

  constructor (name, factory) {
    this._name = name;
    this._factory = factory;
  }

  get name () {
    return this._name;
  }

  _create_with_context_ (context) {
    return new this._factory(context);
  }
}

export default ActionsDescriptor;
