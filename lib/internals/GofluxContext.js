"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var invariant = _interopRequire(require("flux/lib/invariant"));

var GofluxContext = (function () {
  function GofluxContext() {
    _classCallCheck(this, GofluxContext);

    this._publicContext = this._create_restricted_context("public", {
      getActions: true });

    this._actionsContext = this._create_restricted_context("actions", {
      dispatch: true,
      getActions: true });

    this._storeContext = this._create_restricted_context("store", {
      waitFor: true,
      getStore: true });

    this._actionsBy = {};
    this._storesBy = {};
  }

  _createClass(GofluxContext, {
    dispatch: {
      value: function dispatch(eventName, payload) {}
    },
    getActions: {
      value: function getActions(actionsName) {
        return this._actionsBy[actionsName];
      }
    },
    waitFor: {
      value: function waitFor(storeNames) {}
    },
    getStore: {
      value: function getStore(storeName) {}
    },
    _create_restricted_context: {
      value: function _create_restricted_context(restrictedName, validMethodNameMappings) {
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
      }
    }
  });

  return GofluxContext;
})();

module.exports = GofluxContext;