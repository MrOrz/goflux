/*
 * Referral implementations:
 *
 * @flux: http://git.io/peWC
 */
import Goflux from "goflux";

const ThreadActions = Goflux.defineActions(function (context) {
  return {
    clickThread (threadID) {
      return context.dispatch("CLICK_THREAD", {/* payload */
        threadID,
      });
    },
  };
});

export default ThreadActions;
