"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Dispatcher = _interopRequire(require("flux/lib/Dispatcher"));

var invariant = _interopRequire(require("flux/lib/invariant"));

var GofluxContext = (function () {
  function GofluxContext() {
    _classCallCheck(this, GofluxContext);

    this._publicContext = this._create_restricted_context_("public", {
      getActions: true,
      getStore: true });

    this._actionsContext = this._create_restricted_context_("actions", {
      dispatch: true,
      getActions: true });

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
    _create_restricted_context_: {
      value: function _create_restricted_context_(restrictedName, validMethodNameMappings) {
        function restrictFn() {
          invariant(false, "function called on restricted (%s) context.", restrictedName);
        }

        var propertiesObject = {};
        for (var name in GofluxContext.prototype) {
          if (validMethodNameMappings[name]) {
            continue;
          }
          propertiesObject[name] = {
            value: restrictFn };
        }

        return Object.create(this, propertiesObject);
      }
    },
    _initialize_: {
      value: function _initialize_(actionsDescriptorsMap, storeDescriptorsMap) {
        for (var actionsName in actionsDescriptorsMap) {
          var actionsDescriptor = actionsDescriptorsMap[actionsName];
          var actionsInstance = actionsDescriptor._create_with_context_(this._actionsContext);
          this._actionsBy[actionsName] = actionsInstance;
        }

        for (var storeName in storeDescriptorsMap) {
          var storeDescriptor = storeDescriptorsMap[storeName];

          var _storeDescriptor$_create_with_context_ = storeDescriptor._create_with_context_(this._storeContext);

          var storeInstance = _storeDescriptor$_create_with_context_.storeInstance;
          var dispatchHandler = _storeDescriptor$_create_with_context_.dispatchHandler;

          this._storesBy[storeName] = storeInstance;
          this._dispatchTokenBy[storeName] = this._dispatcher.register(dispatchHandler);
        }
      }
    }
  });

  return GofluxContext;
})();

module.exports = GofluxContext;