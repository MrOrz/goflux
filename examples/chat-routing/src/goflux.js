/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUnC
 */
import Goflux from "goflux";

const goflux = new Goflux();

goflux.registerActionsDescriptor(require("./actions/MessageActions"));
goflux.registerActionsDescriptor(require("./actions/ServerActions"));
goflux.registerActionsDescriptor(require("./actions/ThreadActions"));
goflux.registerActionsDescriptor(require("./actions/RoutingActions"));

goflux.registerStoreDescriptor(require("./stores/MessageStore"));
goflux.registerStoreDescriptor(require("./stores/ThreadStore"));
goflux.registerStoreDescriptor(require("./stores/UnreadThreadStore"));
goflux.registerStoreDescriptor(require("./stores/RoutingStore"));

export default goflux;
