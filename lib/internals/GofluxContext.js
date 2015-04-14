"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Dispatcher = _interopRequire(require("flux/lib/Dispatcher"));

var invariant = _interopRequire(require("flux/lib/invariant"));

var REQUIRED_EVENT_EMITTER_METHOD_NAMES = ["addListener", "emit", "removeListener"];

var GofluxContext = (function () {
  function GofluxContext() {
    _classCallCheck(this, GofluxContext);

    this._publicContext = this._create_restricted_context_("public", {
      getActions: true,
      getStore: true,
      dehydrate: true,
      rehydrate: true });

    this._actionsContext = this._create_restricted_context_("actions", {
      dispatch: true,
      getActions: true,
      getStore: true });

    this._storeContext = this._create_restricted_context_("store", {
      waitFor: true,
      getStore: true });

    this._actionsBy = {};
    this._storesBy = {};
    this._dispatchTokenBy = {};
    this._dispatcher = new Dispatcher();
  }

  _createClass(GofluxContext, {
    dispatch: {
      value: function dispatch(eventName, payload) {
        this._dispatcher.dispatch({
          _event_name_: eventName,
          _payload_: payload });
      }
    },
    getActions: {
      value: function getActions(actionsName) {
        return this._actionsBy[actionsName];
      }
    },
    waitFor: {
      value: function waitFor(storeNames) {
        var _this = this;

        var dispatchTokens = storeNames.map(function (storeName) {
          return _this._dispatchTokenBy[storeName];
        });
        this._dispatcher.waitFor(dispatchTokens);
      }
    },
    getStore: {
      value: function getStore(storeName) {
        return this._storesBy[storeName];
      }
    },
    dehydrate: {
      value: function dehydrate() {
        var persistedStateBy = {};

        var _ref = this;

        var _storesBy = _ref._storesBy;

        for (var storeName in _storesBy) {
          persistedStateBy[storeName] = _storesBy[storeName].dehydrate();
        }
        return persistedStateBy;
      }
    },
    rehydrate: {
      value: function rehydrate(persistedState) {
        var _ref = this;

        var _storesBy = _ref._storesBy;

        for (var storeName in persistedState) {
          _storesBy[storeName].rehydrate(persistedState[storeName]);
        }
        return this;
      }
    },
    _create_restricted_context_: {
      value: function _create_restricted_context_(restrictedName, validMethodNameMappings) {
        var restrictDefinition = {
          value: function restrictFn() {
            invariant(false, "function called on restricted (%s) context.", restrictedName);
          } };

        var propertiesObject = {};

        PROTOTYPE_METHOD_NAMES.forEach(function (name) {
          var shouldRestrictMethodAccess = !validMethodNameMappings[name];

          if (shouldRestrictMethodAccess) {
            propertiesObject[name] = restrictDefinition;
          }
        });

        return Object.create(this, propertiesObject);
      }
    },
    _initialize_: {
      value: function _initialize_(actionsDescriptorsMap, storeDescriptorsMap) {
        for (var actionsName in actionsDescriptorsMap) {
          var actionsDescriptor = actionsDescriptorsMap[actionsName];
          this._create_actions_(actionsName, actionsDescriptor);
        }

        for (var storeName in storeDescriptorsMap) {
          var storeDescriptor = storeDescriptorsMap[storeName];
          this._create_store_(storeName, storeDescriptor);
        }
      }
    },
    _create_actions_: {
      value: function _create_actions_(actionsName, actionsDescriptor) {
        var actionsInstance = new actionsDescriptor.factory(this._actionsContext);
        this._actionsBy[actionsName] = actionsInstance;
      }
    },
    _create_store_: {
      value: function _create_store_(storeName, storeDescriptor) {
        var eventMethodMappings = storeDescriptor.eventMethodMappings;

        var storeInstance = new storeDescriptor.factory(this._storeContext);

        REQUIRED_EVENT_EMITTER_METHOD_NAMES.filter(function (fnName) {
          return !(fnName in storeInstance);
        }).forEach(function (fnName, index, array) {
          invariant(false, "\nThe store instance returned by %s factory should contains mixins of\nEventEmitter. Please 1. extend the factory from EventEmitter, or\n2. Manually mixin these methods (%s) from EventEmitter.prototype to your factory\n", storeName, array.join(","));
        });

        this._storesBy[storeName] = storeInstance;
        // Register handler
        this._dispatchTokenBy[storeName] = this._dispatcher.register(function (rawPayload) {
          var methodName = eventMethodMappings[rawPayload._event_name_];
          if (methodName) {
            storeInstance[methodName](rawPayload._payload_);
          }
        });
      }
    }
  });

  return GofluxContext;
})();

var PROTOTYPE_METHOD_NAMES = Object.getOwnPropertyNames(GofluxContext.prototype);

module.exports = GofluxContext;