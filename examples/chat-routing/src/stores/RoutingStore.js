/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUg1
 */
import {EventEmitter} from "events";

import CHANGE_EVENT from "../utils/CHANGE_EVENT";

/*
 * A factory that can return a RoutingStore instance.
 * Of course, this can be an ES6 Class as well, but make sure you've extended
 * some implementation of EventEmitter.
 *
 * context.getStore("RoutingStore") will return this instance as well.
 */
class RoutingStoreFactory extends EventEmitter {

  constructor (context) {
    this._context = context;
    this._pageTitle = null;
  }

  getPageTitle () {
    return this._pageTitle;
  }
  /*
   * Below are private functions and some dispatch handlers
   * Special naming convention:
   *   underscored function name with prefix and postfix underscores
   */
  _emit_change_ () {
    this.emit(CHANGE_EVENT);
  }

  _open_thread_index_page_ () {
    this._pageTitle = "Loading Thread Index";

    this._emit_change_();
  }

  _receive_raw_messages_ () {
    this._context.waitFor(["ThreadStore"]);
    
    const threadStore = this._context.getStore("ThreadStore");

    this._pageTitle = `Threads Index (${ threadStore.getCount() })`;

    this._emit_change_();
  }

  _open_thread_show_page_ ({id}) {
    this._pageTitle = `Loading Thread (${ id })`;

    this._emit_change_();
  }

  _click_thread_ () {
    this._context.waitFor(["ThreadStore"]);

    const threadStore = this._context.getStore("ThreadStore");
    const currentThread = threadStore.getCurrent();
    
    this._pageTitle = `Thread (${ currentThread.name })`;

    this._emit_change_();
  }

}

export default RoutingStoreFactory;
