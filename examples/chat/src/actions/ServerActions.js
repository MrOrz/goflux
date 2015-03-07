/*
 * Referral implementations:
 *
 * @flux: http://git.io/pecu
 */
import Goflux from "goflux";

const ServerActions = Goflux.defineActions("ServerActions", function (context) {
  return {
    receiveAll (rawMessages) {
      return context.dispatch("RECEIVE_RAW_MESSAGES", {/* payload */
        rawMessages,
      });
    },

    receiveCreatedMessage (createdMessage) {
      return context.dispatch("RECEIVE_RAW_CREATED_MESSAGE", {/* payload */
        rawMessage: createdMessage,
      });
    },
  };
});

export default ServerActions;
