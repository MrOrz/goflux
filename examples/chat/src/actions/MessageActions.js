/*
 * Referral implementations:
 *
 * @flux: http://git.io/peYg
 */
import Goflux from "goflux";

import ChatMessageUtils from "../utils/ChatMessageUtils";
import ChatWebAPIUtils from "../utils/ChatWebAPIUtils";

const MessageActions = Goflux.defineActions("MessageActions", function (context) {
  return {
    createMessage (text, currentThreadID) {
      context.dispatch("CREATE_MESSAGE", {/* payload */
        text,
        currentThreadID,
      });

      return Promise.resolve(true).then(() => {
        /*
         * Only after current tick, you're allowed to execute another action
         */
        const message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
        const promise = ChatWebAPIUtils.createMessage(message).then((createdMessage) => {
          return context.getActions("ServerActions").receiveCreatedMessage(createdMessage);
        });
        /*
         * Ignore promise here since we don't care.
         */
        return true;
      });
    },
  };
});

export default MessageActions;
