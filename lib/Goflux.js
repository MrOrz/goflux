"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var GofluxContext = _interopRequire(require("./internals/GofluxContext"));

var Goflux = (function () {
  function Goflux() {
    _classCallCheck(this, Goflux);

    this._actionsBy = {};
    this._storeBy = {};
  }

  _createClass(Goflux, {
    defineActions: {
      value: function defineActions(actionsName, actionsFactory) {
        this._actionsBy[actionsName] = {
          factory: actionsFactory };
        return this;
      }
    },
    defineStore: {
      value: function defineStore(storeName, storeEventMethodMappings, storeFactory) {
        this._storeBy[storeName] = {
          factory: storeFactory,
          eventMethodMappings: storeEventMethodMappings };
        return this;
      }
    },
    createContext: {
      value: function createContext() {
        var gofluxContext = new GofluxContext();
        gofluxContext._initialize_(this._actionsBy, this._storeBy);
        return gofluxContext._publicContext;
      }
    }
  });

  return Goflux;
})();

module.exports = Goflux;