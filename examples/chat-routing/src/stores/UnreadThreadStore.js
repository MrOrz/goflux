/*
 * Referral implementations:
 *
 * @flux: http://git.io/peiA
 */
import {EventEmitter} from "events";

import CHANGE_EVENT from "../utils/CHANGE_EVENT";

/*
 * A factory that can return a UnreadThreadStore instance.
 * Of course, this can be an ES6 Class as well, but make sure you've extended
 * some implementation of EventEmitter.
 *
 * context.getStore("UnreadThreadStore") will return this instance as well.
 */
class UnreadThreadStoreFactory extends EventEmitter {

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
  }
  /*
   * Below are private functions and some dispatch handlers
   * Special naming convention:
   *   underscored function name with prefix and postfix underscores
   */
  _emit_change_ () {
    this.emit(CHANGE_EVENT);
  }

  _click_thread_ () {
    this._context.waitFor(["ThreadStore", "MessageStore"]);

    this._emit_change_();
  }

  _receive_raw_messages_ () {
    this._context.waitFor(["ThreadStore", "MessageStore"]);

    this._emit_change_();
  }
}

export default UnreadThreadStoreFactory;
