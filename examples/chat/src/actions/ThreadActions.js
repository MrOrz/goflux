/*
 * Referral implementations:
 *
 * @flux: http://git.io/peWC
 */
import Goflux from "goflux";

const ThreadActions = Goflux.defineActions("ThreadActions", function (context) {
  return {
    clickThread (threadID) {
      context.dispatch("CLICK_THREAD", {/* payload */
        threadID,
      });
      return Promise.resolve(true);
    },
  };
});

export default ThreadActions;
