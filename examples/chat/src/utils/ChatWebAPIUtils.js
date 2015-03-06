/*
 * Referral implementations:
 *
 * @flux: http://git.io/pesS
 */
import ServerActions from "../actions/ServerActions";

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.
const ChatWebAPIUtils = {
  getAllMessages () {
    // simulate retrieving data from a database
    const rawMessages = JSON.parse(localStorage.getItem("messages"));

    // simulate success callback
    return ServerActions.receiveAll(rawMessages);
  },

  createMessage (message, threadName) {
    // simulate writing to a database
    const rawMessages = JSON.parse(localStorage.getItem("messages"));
    const timestamp = Date.now();
    const id = "m_" + timestamp;
    const threadID = message.threadID || ("t_" + Date.now());
    const createdMessage = {
      id,
      threadID,
      threadName,
      authorName: message.authorName,
      text,
      timestamp,
    };
    rawMessages.push(createdMessage);
    localStorage.setItem("messages", JSON.stringify(rawMessages));

    // simulate success callback
    return Promise.resolve(true).then(() => {
      return ServerActions.receiveCreatedMessage(createdMessage);
    });
  },
};

export default ChatWebAPIUtils;
