/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUg1
 */
import {EventEmitter} from "event";
import Goflux from "goflux";

import CHANGE_EVENT from "../../../chat/src/utils/CHANGE_EVENT";

const RoutingStore = Goflux.defineStore("RoutingStore", {
  /*
   * Mapping for ACTION_NAME to handler name for RoutingStore instance.
   */
  "OPEN_THREAD_INDEX_PAGE": "_open_thread_index_page_",
  "OPEN_THREAD_SHOW_PAGE": "_open_thread_show_page_",
},
/*
 * A factory that can return a RoutingStore instance.
 * Of course, this can be an ES6 Class as well, but make sure you've extended
 * some implementation of EventEmitter.
 *
 * context.getStore("RoutingStore") will return this instance as well.
 */
class RoutingStore extends EventEmitter {

  constructor (context) {
    this._context = context;
    this._pageTitle = null;
  }

  getPageTitle () {
    return this._pageTitle;
  },
  /*
   * Below are private functions and some dispatch handlers
   * Special naming convention:
   *   underscored function name with prefix and postfix underscores
   */
  _emit_change_ () {
    this.emit(CHANGE_EVENT);
  },

  _open_thread_index_page_ () {
    this._pageTitle = "Thread Index";
    this._emit_change_();
    return true;
  },

  _open_thread_show_page_ ({id}) {
    this._pageTitle = `Thread Show : ${ id }`;
    this._emit_change_();
    return true;
  },
});

export default RoutingStore;
