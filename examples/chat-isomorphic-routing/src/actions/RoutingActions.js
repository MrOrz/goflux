/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUg1
 */
import Goflux from "goflux";

import ChatWebAPIUtils from "../utils/ChatWebAPIUtils";

const RoutingActions = Goflux.defineActions("RoutingActions", function (context) {
  return {
    route (url, params) {
      /*
       * Handle your routing logic here, please replace your favorate routing
       * libraries. Ex, routr, director, page.js ...
       *
       * If you want it runs isomorphic, make sure it does provide
       * implementations on browser and node.js.
       */
      var matchedResult;
      if ("/threads" === url) {

        context.dispatch("OPEN_THREAD_INDEX_PAGE", {/* payload */
        });

        return ChatWebAPIUtils.getAllMessages().then((rawMessages) => {

          return context.gofluxAction("ServerActions").receiveAll(rawMessages);
        });

      } else if (matchedResult = url.match(/\/threads\/(\d+)/)) {
        const threadId = matchedResult[1];

        context.dispatch("OPEN_THREAD_SHOW_PAGE", {/* payload */
          id: threadId,
        });

        context.gofluxAction("ThreadActions").clickThread(threadId);

        return Promise.resolve(true);
      } else {
        return Promise.reject(404);
      }
    },
  };
});

export default RoutingActions;
