/*
 * Referral implementations:
 *
 * @flux: http://git.io/pelB
 */
import Goflux from "goflux";

import CHANGE_EVENT from "../utils/CHANGE_EVENT";
import ChatMessageUtils from "../utils/ChatMessageUtils";

const MessageStore = Goflux.defineStore("MessageStore", {
  /*
   * Mapping for ACTION_NAME to handler name for MessageStore instance.
   */
  "CLICK_THREAD": "_click_thread_",
  "CREATE_MESSAGE": "_create_message_",
  "RECEIVE_RAW_MESSAGES": "_receive_raw_messages_",
},
/*
 * A factory that can return a MessageStore instance.
 *
 * context.getStore("MessageStore") will return this instance as well.
 */
function (context) {
  const _messages = {};

  return {
    get (id) {
      return _messages[id];
    },

    getAll () {
      return _messages;
    },

    /**
     * @param {string} threadID
     */
    getAllForThread (threadID) {
      const threadMessages = [];
      for (var id in _messages) {
        if (_messages[id].threadID === threadID) {
          threadMessages.push(_messages[id]);
        }
      }
      threadMessages.sort(function(a, b) {
        if (a.date < b.date) {
          return -1;
        } else if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
      return threadMessages;
    },

    getAllForCurrentThread () {
      return this.getAllForThread(
        context.getStore("ThreadStore").getCurrentID()
      );
    },
    /*
     * Below are private functions and some dispatch handlers
     * Special naming convention:
     *   underscored function name with prefix and postfix underscores
     */
    _emit_change_ () {
      this.emit(CHANGE_EVENT);
    },

    _add_messages_ (rawMessages) {
      rawMessages.forEach(function(message) {
        if (!_messages[message.id]) {
          _messages[message.id] = ChatMessageUtils.convertRawMessage(
            message,
            ThreadStore.getCurrentID(),
          );
        }
      });
    },

    _mark_all_in_thread_read_ (threadID) {
      for (var id in _messages) {
        if (_messages[id].threadID === threadID) {
          _messages[id].isRead = true;
        }
      }
    },

    _click_thread_ () {
      return context.waitFor(["ThreadStore"]).then(([threadStoreHandleResult]) => {
        this._mark_all_in_thread_read_(
          context.getStore("ThreadStore").getCurrentID()
        );
        this._emit_change_();
        return true;
      });
    },

    _create_message_ (payload) {
      const message = ChatMessageUtils.getCreatedMessageData(
        payload.text,
        payload.currentThreadID,
      );
      _messages[message.id] = message;
      this._emit_change_();
      return true;
    },

    _receive_raw_messages_ ({rawMessages}) {
      this._add_messages_(rawMessages);
      return context.waitFor(["ThreadStore"]).then(([threadStoreHandleResult]) => {
        this._mark_all_in_thread_read_(
          context.getStore("ThreadStore").getCurrentID()
        );
        this._emit_change_();
        return true;
      });
    },
  };
});

export default MessageStore;
