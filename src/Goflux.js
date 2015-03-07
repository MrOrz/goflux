import ActionDescriptor from "./internals/ActionDescriptor";
import StoreDescriptor from "./internals/StoreDescriptor";
import GofluxContext from "./internals/GofluxContext";

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

  createContext () {
    const gofluxContext = new GofluxContext();
    gofluxContext._initialize_(this._actionBy, this._storeBy);
    return gofluxContext;
  }
}

export default Goflux;
