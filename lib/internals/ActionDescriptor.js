"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ActionDescriptor = function ActionDescriptor(name, factory) {
  _classCallCheck(this, ActionDescriptor);

  this._name = name;
  this._factory = factory;
};

module.exports = ActionDescriptor;