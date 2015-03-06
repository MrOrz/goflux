/*
 * Referral implementations:
 *
 * @flux: http://git.io/peiA
 */
import {EventEmitter} from "event";
import Goflux from "goflux";

import CHANGE_EVENT from "../utils/CHANGE_EVENT";

const UnreadThreadStore = Goflux.defineStore("UnreadThreadStore", {
  /*
   * Mapping for ACTION_NAME to handler name for UnreadThreadStore instance.
   */
  "CLICK_THREAD": "_click_thread_",
  "RECEIVE_RAW_MESSAGES": "_receive_raw_messages_",
},
/*
 * A factory that can return a UnreadThreadStore instance.
 * Of course, this can be an ES6 Class as well, but make sure you've extended
 * some implementation of EventEmitter.
 *
 * context.getStore("UnreadThreadStore") will return this instance as well.
 */
class UnreadThreadStore extends EventEmitter {

  constructor (context) {
    this._context = context;
  }

  getCount () {
    const threads = this._context.getStore("ThreadStore").getAll();
    var unreadCount = 0;
    for (var id in threads) {
      if (!threads[id].lastMessage.isRead) {
        unreadCount++;
      }
    }
    return unreadCount;
  },
  /*
   * Below are private functions and some dispatch handlers
   * Special naming convention:
   *   underscored function name with prefix and postfix underscores
   */
  _emit_change_ () {
    this.emit(CHANGE_EVENT);
  },

  _click_thread_ () {
    return this._context.waitFor(["ThreadStore", "MessageStore"]).then(() => {
      this._emit_change_();
      return true;
    });
  },

  _receive_raw_messages_ () {
    return this._context.waitFor(["ThreadStore", "MessageStore"]).then(() => {
      this._emit_change_();
      return true;
    });
  },
});

export default UnreadThreadStore;
