class StoreDescriptor {

  constructor (name, eventMethodMappings, factory) {
    this._name = name;
    this._eventMethodMappings = eventMethodMappings;
    this._factory = factory;
  }
}

export default StoreDescriptor;
