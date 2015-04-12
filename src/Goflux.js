import GofluxContext from "./internals/GofluxContext";

class Goflux {

  constructor () {
    this._actionsBy = {};
    this._storeBy = {};
  }

  defineActions (actionsName, actionsFactory) {
    this._actionsBy[actionsName] = {
      factory: actionsFactory,
    };
    return this;
  }

  defineStore (storeName, storeEventMethodMappings, storeFactory) {
    this._storeBy[storeName] = {
      factory: storeFactory,
      eventMethodMappings: storeEventMethodMappings,
    };
    return this;
  }

  createContext () {
    const gofluxContext = new GofluxContext();
    gofluxContext._initialize_(this._actionsBy, this._storeBy);
    return gofluxContext._publicContext;
  }

}

export default Goflux;
