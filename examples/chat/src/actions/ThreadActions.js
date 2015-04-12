/*
 * Referral implementations:
 *
 * @flux: http://git.io/peWC
 */

function ThreadActionsFactory (context) {
  return {
    clickThread (threadID) {
      context.dispatch("CLICK_THREAD", {/* payload */
        threadID,
      });
      return Promise.resolve(true);
    },
  };
}

export default ThreadActionsFactory;
