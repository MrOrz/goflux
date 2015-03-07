import invariant from "flux/lib/invariant";

class GofluxContext {

  dispatch (eventName, payload) {

  }

  getActions (actionsName) {
    return this._actionsBy[actionsName];
  }

  waitFor (storeNames) {

  }

  getStore (storeName) {

  }

  constructor () {
    this._publicContext = this._create_restricted_context("public", {
      getActions: true,
    });

    this._actionsContext = this._create_restricted_context("actions", {
      dispatch: true,
      getActions: true,
    });

    this._storeContext = this._create_restricted_context("store", {
      waitFor: true,
      getStore: true,
    });

    this._actionsBy = {};
    this._storesBy = {};
  }

  _create_restricted_context (restrictedName, validMethodNameMappings) {
    function restrictFn () {
      invariant(false, "function called on restricted (%s) context.", restrictedName);
    }

    const propertiesObject = {};
    for (var name in GofluxContext.prototype) {
      if (validMethodNameMappings[name]) {
        continue;
      }
      propertiesObject[name] = {
        value: restrictFn,
      };
    }

    return Object.create(this, propertiesObject);
  }

  _initialize_ (actionsDescriptorsMap, storeDescriptorsMap) {
    for (var actionsName in actionsDescriptorsMap) {
      const actionsDescriptor = actionsDescriptorsMap[actionsName];
      const actionsInstance = actionsDescriptor._create_with_context_(this._actionsContext);
      this._actionsBy[actionsName] = actionsInstance;
    }
  }

}

export default GofluxContext;
