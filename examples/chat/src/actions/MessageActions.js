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
      return context.dispatch("CREATE_MESSAGE", {/* payload */
        text,
        currentThreadID,
      }).then((dispatchedResult) => {
        // ignore dispatchResult for now.
        const message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
        ChatWebAPIUtils.createMessage(message);
        return dispatchResult;
      });
    },
  };
});

export default MessageActions;
