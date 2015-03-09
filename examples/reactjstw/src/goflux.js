import Goflux from "goflux";

const goflux = new Goflux();

goflux.registerActionsDescriptor(require("./actions/RoutingActions"));
goflux.registerActionsDescriptor(require("./actions/AdminUsersActions"));

goflux.registerStoreDescriptor(require("./stores/RoutingStore"));
goflux.registerStoreDescriptor(require("./stores/AdminUsersStore"));

export default goflux;
