"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var invariant = _interopRequire(require("flux/lib/invariant"));

function StoreWatchMixinFactory(storeNames, changeEventName, handlerName) {
  return {
    componentWillMount: function componentWillMount() {
      if ("gofluxStore" in this) {
        return;
      }
      invariant("StoreWatchMixin requires GofluxMixin to work");
    },

    componentDidMount: function componentDidMount() {
      var _this = this;

      storeNames.forEach(function (storeName) {
        _this.gofluxStore(storeName).on(changeEventName, _this[handlerName]);
      });
    },

    componentWillUnmount: function componentWillUnmount() {
      var _this = this;

      storeNames.forEach(function (storeName) {
        _this.gofluxStore(storeName).removeListener(changeEventName, _this[handlerName]);
      });
    } };
}

StoreWatchMixinFactory.componentWillMount = function () {
  invariant("StoreWatchMixin is a function that takes an array of store names,\n    change event name and handler function on component as parameters and\n    returns the mixin, e.g.: mixins:\n    [StoreWatchMixin([\"Store1\", \"Store2\"], \"change\", \"_handleChange\")]\n  ");
};

module.exports = StoreWatchMixinFactory;