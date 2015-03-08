"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var invariant = _interopRequire(require("flux/lib/invariant"));

function GofluxMixinFactory(React) {

  function getGofluxContext(componentRef) {
    return componentRef.props.gofluxContext || componentRef.context && componentRef.context.gofluxContext;
  }

  return {
    componentWillMount: function componentWillMount() {
      if (getGofluxContext(this)) {
        return;
      }
      var namePart = this.constructor.displayName ? " of " + this.constructor.displayName : "";
      invariant("Could not find flux on this.props or this.context%s", namePart);
    },

    childContextTypes: {
      gofluxContext: React.PropTypes.object
    },

    contextTypes: {
      gofluxContext: React.PropTypes.object
    },

    getChildContext: function getChildContext() {
      return {
        gofluxContext: getGofluxContext(this) };
    },

    gofluxActions: function gofluxActions(actionsName) {
      return getGofluxContext(this).getActions(actionsName);
    },

    gofluxStore: function gofluxStore(storeName) {
      return getGofluxContext(this).getStore(storeName);
    } };
}

GofluxMixinFactory.componentWillMount = function () {
  invariant("GofluxMixin is a function that takes React as a parameter\n    and returns the mixin, e.g.: mixins: [GofluxMixin(React)]\n  ");
};

module.exports = GofluxMixinFactory;