/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUg1
 */
import Goflux from "goflux";

import ChatWebAPIUtils from "../utils/ChatWebAPIUtils";
import router from "../utils/router";

const RoutingActions = Goflux.defineActions("RoutingActions", function (context) {
  return {
    route (url) {
      /*
       * Handle your routing logic here, please replace your favorate routing
       * libraries. Ex, routr, director, page.js ...
       *
       * If you want it runs isomorphic, make sure it does provide
       * implementations on browser and node.js.
       */
      const route = router.getRoute(url);
      const routeName = route && route.name || "list_threads_page";

      switch (routeName) {
        case "list_threads_page":
          context.dispatch("OPEN_THREAD_INDEX_PAGE", {/* payload */
          });

          ChatWebAPIUtils.getAllMessages().then((rawMessages) => {

            return context.getActions("ServerActions").receiveAll(rawMessages);
          });

          break;

        case "show_thread_page": {
            const {threadId} = route.params;

            context.dispatch("OPEN_THREAD_SHOW_PAGE", {/* payload */
              threadId,
            });

            ChatWebAPIUtils.getAllMessages().then((rawMessages) => {

              return context.getActions("ServerActions").receiveAll(rawMessages);
            }).then(() => {

              return context.getActions("ThreadActions").clickThread(threadId);
            });
          }
          break;
      }
      return Promise.resolve(true);
    },
  };
});

export default RoutingActions;
