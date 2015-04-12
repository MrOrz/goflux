/*
 * Referral implementations:
 *
 * @flux: http://git.io/pewu
 */
import {EventEmitter} from "events";

import CHANGE_EVENT from "../utils/CHANGE_EVENT";
import ChatMessageUtils from "../utils/ChatMessageUtils";

/*
 * A factory that can return a ThreadStore instance.
 * Of course, this can be an ES6 Class as well, but make sure you've extended
 * some implementation of EventEmitter.
 *
 * context.getStore("ThreadStore") will return this instance as well.
 */
class ThreadStoreFactory extends EventEmitter {

  constructor (context) {
    this._context = context;
    this._threads = {};
    this._currentID = null;
  }

  /**
   * @param {string} id
   */
  get (id) {
    return this._threads[id];
  }

  getAll () {
    return this._threads;
  }

  getAllChrono () {
    const orderedThreads = [];
    for (var id in this._threads) {
      const thread = this._threads[id];
      orderedThreads.push(thread);
    }
    orderedThreads.sort(function(a, b) {
      if (a.lastMessage.date < b.lastMessage.date) {
        return -1;
      } else if (a.lastMessage.date > b.lastMessage.date) {
        return 1;
      }
      return 0;
    });
    return orderedThreads;
  }

  getCurrentID () {
    return this._currentID;
  }

  getCurrent () {
    return this.get(this.getCurrentID());
  }
  /*
   * Below are private functions and some dispatch handlers
   * Special naming convention:
   *   underscored function name with prefix and postfix underscores
   */
  _emit_change_ () {
    this.emit(CHANGE_EVENT);
  }

  _init_ (rawMessages) {
    rawMessages.forEach((message) => {
      const threadID = message.threadID;
      const thread = this._threads[threadID];
      if (thread && thread.lastTimestamp > message.timestamp) {
        return;
      }
      this._threads[threadID] = {
        id: threadID,
        name: message.threadName,
        lastMessage: ChatMessageUtils.convertRawMessage(message, this._currentID),
      };
    });

    if (!this._currentID) {
      const allChrono = this.getAllChrono();
      this._currentID = allChrono[allChrono.length - 1].id;
    }

    this._threads[this._currentID].lastMessage.isRead = true;
  }

  _click_thread_ (payload) {
    this._currentID = payload.threadID;
    this._threads[this._currentID].lastMessage.isRead = true;
    this._emit_change_();
  }

  _receive_raw_messages_ ({rawMessages}) {
    this._init_(rawMessages);
    this._emit_change_();
  }
}

export default ThreadStoreFactory;
