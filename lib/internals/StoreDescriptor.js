"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var EventEmitter = require("events").EventEmitter;

var EventEmitterPrototype = EventEmitter.prototype;

function createHandlerFn(storeInstance, eventMethodMappings) {
  return function (rawPayload) {
    var methodName = eventMethodMappings[rawPayload._event_name_];
    if (methodName) {
      storeInstance[methodName](rawPayload._payload_);
    }
  };
}

var StoreDescriptor = (function () {
  function StoreDescriptor(name, eventMethodMappings, factory) {
    _classCallCheck(this, StoreDescriptor);

    this._name = name;
    this._eventMethodMappings = eventMethodMappings;
    this._factory = factory;
  }

  _createClass(StoreDescriptor, {
    name: {
      get: function () {
        return this._name;
      }
    },
    _create_with_context_: {
      value: function _create_with_context_(context) {
        var storeInstance = new this._factory(context);

        for (var fnName in EventEmitterPrototype) {
          if (fnName in storeInstance) {
            continue;
          }
          storeInstance[fnName] = EventEmitterPrototype[fnName];
        }

        var dispatchHandler = createHandlerFn(storeInstance, this._eventMethodMappings);

        return { storeInstance: storeInstance, dispatchHandler: dispatchHandler };
      }
    }
  });

  return StoreDescriptor;
})();

module.exports = StoreDescriptor;