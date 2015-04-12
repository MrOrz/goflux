/*
 * Referral implementations:
 *
 * @flux: http://git.io/pecu
 */

function ServerActionsFactory (context) {
  return {
    receiveAll (rawMessages) {
      context.dispatch("RECEIVE_RAW_MESSAGES", {/* payload */
        rawMessages,
      });
      return Promise.resolve(true);
    },

    receiveCreatedMessage (createdMessage) {
      context.dispatch("RECEIVE_RAW_CREATED_MESSAGE", {/* payload */
        rawMessage: createdMessage,
      });
      return Promise.resolve(true);
    },
  };
}

export default ServerActionsFactory;
