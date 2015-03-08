import Goflux from "goflux";

const goflux = new Goflux();

goflux.registerActionsDescriptor(require("./actions/RoutingActions"));

goflux.registerStoreDescriptor(require("./stores/RoutingStore"));

export default goflux;
