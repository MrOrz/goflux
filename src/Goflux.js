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
    this._storeBy = {};
  }

  registerActionsDescriptor (actionDescriptor) {
    this._actionBy[actionDescriptor.name] = actionDescriptor;
  }

  registerStoreDescriptor (storeDescriptor) {
    this._storeBy[storeDescriptor.name] = storeDescriptor;
  }
}

export default Goflux;
