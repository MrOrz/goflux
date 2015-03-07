"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ActionDescriptor = _interopRequire(require("./internals/ActionDescriptor"));

var StoreDescriptor = _interopRequire(require("./internals/StoreDescriptor"));

var Goflux = (function () {
  function Goflux() {
    _classCallCheck(this, Goflux);

    this._actionBy = {};
  }

  _createClass(Goflux, {
    registerActionsDescriptor: {
      value: function registerActionsDescriptor(actionDescriptor) {
        this._actionBy[actionDescriptor.name] = actionDescriptor;
      }
    }
  }, {
    defineActions: {
      value: function defineActions(actionName, actionFactory) {
        return new ActionDescriptor(actionName, actionFactory);
      }
    },
    defineStore: {
      value: function defineStore(storeName, storeEventMethodMappings, storeFactory) {
        return new StoreDescriptor(storeName, storeEventMethodMappings, storeFactory);
      }
    }
  });

  return Goflux;
})();

module.exports = Goflux;