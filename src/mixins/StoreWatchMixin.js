import invariant from "flux/lib/invariant";

function StoreWatchMixinFactory (storeNames, changeEventName, handlerName) {
  return {
    componentWillMount () {
      if ("gofluxStore" in this) {
        return;
      }
      invariant("StoreWatchMixin requires GofluxMixin to work");
    },

    componentDidMount () {
      storeNames.forEach((storeName) => {
        this.gofluxStore(storeName).addListener(changeEventName, this[handlerName]);
      });
    },

    componentWillUnmount () {
      storeNames.forEach((storeName) => {
        this.gofluxStore(storeName).removeListener(changeEventName, this[handlerName]);
      });
    },

  };
}

StoreWatchMixinFactory.componentWillMount = function () {
  invariant(`StoreWatchMixin is a function that takes an array of store names,
    change event name and handler function on component as parameters and
    returns the mixin, e.g.: mixins:
    [StoreWatchMixin(["Store1", "Store2"], "change", "_handleChange")]
  `);
};

export default StoreWatchMixinFactory;

