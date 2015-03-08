import ActionsDescriptor from "./internals/ActionsDescriptor";
import StoreDescriptor from "./internals/StoreDescriptor";
import GofluxContext from "./internals/GofluxContext";

class Goflux {

  static defineActions (actionsName, actionsFactory) {
    return new ActionsDescriptor(actionsName, actionsFactory);
  }

  static defineStore (storeName, storeEventMethodMappings, storeFactory) {
    return new StoreDescriptor(storeName, storeEventMethodMappings, storeFactory);
  }

  constructor () {
    this._actionsBy = {};
    this._storeBy = {};
  }

  registerActionsDescriptor (actionsDescriptor) {
    this._actionsBy[actionsDescriptor.name] = actionsDescriptor;
  }

  registerStoreDescriptor (storeDescriptor) {
    this._storeBy[storeDescriptor.name] = storeDescriptor;
  }

  createContext () {
    const gofluxContext = new GofluxContext();
    gofluxContext._initialize_(this._actionsBy, this._storeBy);
    return gofluxContext._publicContext;
  }
}

export default Goflux;
