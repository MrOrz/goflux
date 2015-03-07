import ActionDescriptor from "./internals/ActionDescriptor";
import StoreDescriptor from "./internals/StoreDescriptor";

class Goflux {

  static defineActions (actionName, actionFactory) {
    return new ActionDescriptor(actionName, actionFactory);
  }

  static defineStore (storeName, storeEventMethodMappings, storeFactory) {
    return new StoreDescriptor(storeName, storeEventMethodMappings, storeFactory);
  }

  constructor () {
    this._actionBy = {};
  }

  registerActionsDescriptor (actionDescriptor) {
    this._actionBy[actionDescriptor.name] = actionDescriptor;
  }
}

export default Goflux;
