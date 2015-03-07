"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var StoreDescriptor = function StoreDescriptor(name, eventMethodMappings, factory) {
  _classCallCheck(this, StoreDescriptor);

  this._name = name;
  this._eventMethodMappings = eventMethodMappings;
  this._factory = factory;
};

module.exports = StoreDescriptor;