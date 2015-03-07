"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ActionsDescriptor = (function () {
  function ActionsDescriptor(name, factory) {
    _classCallCheck(this, ActionsDescriptor);

    this._name = name;
    this._factory = factory;
  }

  _createClass(ActionsDescriptor, {
    name: {
      get: function () {
        return this._name;
      }
    },
    _create_with_context_: {
      value: function _create_with_context_(context) {
        return new this._factory(context);
      }
    }
  });

  return ActionsDescriptor;
})();

module.exports = ActionsDescriptor;