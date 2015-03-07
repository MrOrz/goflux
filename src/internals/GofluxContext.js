import invariant from "flux/lib/invariant";

class GofluxContext {

  dispatch (eventName, payload) {

  }

  getActions (actionsName) {

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

  }

}

export default GofluxContext;
