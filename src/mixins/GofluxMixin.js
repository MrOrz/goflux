import invariant from "flux/lib/invariant";

function GofluxMixinFactory (React) {

  function getGofluxContext (componentRef) {
    return componentRef.props.gofluxContext || (componentRef.context && componentRef.context.gofluxContext);
  }

  return {
    componentWillMount () {
      if (getGofluxContext(this)) {
        return;
      }
      const namePart = this.constructor.displayName ? " of " + this.constructor.displayName : "";
      invariant("Could not find flux on this.props or this.context%s", namePart);
    },

    childContextTypes: {
      gofluxContext: React.PropTypes.object
    },

    contextTypes: {
      gofluxContext: React.PropTypes.object
    },

    getChildContext () {
      return {
        gofluxContext: getGofluxContext(this),
      };
    },

    gofluxActions (actionsName) {
      return getGofluxContext(this).getActions(actionsName);
    },

    gofluxStore (storeName) {
      return getGofluxContext(this).getStore(storeName);
    },
  };
}

GofluxMixinFactory.componentWillMount = function () {
  invariant(`GofluxMixin is a function that takes React as a parameter
    and returns the mixin, e.g.: mixins: [GofluxMixin(React)]
  `);
};

export default GofluxMixinFactory;
