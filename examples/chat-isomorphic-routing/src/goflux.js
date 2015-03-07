/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUnC
 */
import goflux from "../../chat/src/goflux";

goflux.registerActionsDescriptor(require("./actions/RoutingActions"));

goflux.registerStoreDescriptor(require("./stores/RoutingStore"));

export default goflux;
