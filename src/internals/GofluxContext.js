import Dispatcher from "flux/lib/Dispatcher";
import invariant from "flux/lib/invariant";

class GofluxContext {

  dispatch (eventName, payload) {
    this._dispatcher.dispatch({
      _event_name_: eventName,
      _payload_: payload,
    });
  }

  getActions (actionsName) {
    return this._actionsBy[actionsName];
  }

  waitFor (storeNames) {
    const dispatchTokens = storeNames.map((storeName) => this._dispatchTokenBy[storeName]);
    this._dispatcher.waitFor(dispatchTokens);
  }

  getStore (storeName) {
    return this._storesBy[storeName];
  }

  dehydrate () {
    const persistedStateBy = {};
    const {_storesBy} = this;

    for (var storeName in _storesBy) {
      persistedStateBy[storeName] = _storesBy[storeName].dehydrate();
    }
    return persistedStateBy;
  }

  rehydrate (persistedState) {
    const {_storesBy} = this;

    for (var storeName in persistedState) {
      _storesBy[storeName].rehydrate(persistedState[storeName]);
    }
    return this;
  }

  constructor () {
    this._publicContext = this._create_restricted_context_("public", {
      getActions: true,
      getStore: true,
      dehydrate: true,
      rehydrate: true,
    });

    this._actionsContext = this._create_restricted_context_("actions", {
      dispatch: true,
      getActions: true,
    });

    this._storeContext = this._create_restricted_context_("store", {
      waitFor: true,
      getStore: true,
    });

    this._actionsBy = {};
    this._storesBy = {};
    this._dispatchTokenBy = {};
    this._dispatcher = new Dispatcher();
  }

  _create_restricted_context_ (restrictedName, validMethodNameMappings) {
    const restrictDefinition = {
      value: function restrictFn () {
        invariant(false, "function called on restricted (%s) context.", restrictedName);
      },
    };

    const propertiesObject = {};

    PROTOTYPE_METHOD_NAMES.forEach((name) => {
      const shouldRestrictMethodAccess = !validMethodNameMappings[name];

      if (shouldRestrictMethodAccess) {
        propertiesObject[name] = restrictDefinition;
      }
    });

    return Object.create(this, propertiesObject);
  }

  _initialize_ (actionsDescriptorsMap, storeDescriptorsMap) {
    for (var actionsName in actionsDescriptorsMap) {
      const actionsDescriptor = actionsDescriptorsMap[actionsName];
      const actionsInstance = actionsDescriptor._create_with_context_(this._actionsContext);
      this._actionsBy[actionsName] = actionsInstance;
    }

    for (var storeName in storeDescriptorsMap) {
      const storeDescriptor = storeDescriptorsMap[storeName];
      const {storeInstance, dispatchHandler} = storeDescriptor._create_with_context_(this._storeContext);

      this._storesBy[storeName] = storeInstance;
      this._dispatchTokenBy[storeName] = this._dispatcher.register(dispatchHandler);
    }
  }

}

const PROTOTYPE_METHOD_NAMES = Object.getOwnPropertyNames(GofluxContext.prototype);

export default GofluxContext;
