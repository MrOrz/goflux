import {EventEmitter} from "events";
import React from "react";
import Goflux from "goflux";

const RoutingStore = Goflux.defineStore("RoutingStore", {
  /*
   * Mapping for ACTION_NAME to handler name for RoutingStore instance.
   */
  "SET_PAGE_TITLE": "_set_page_title_",
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
  /*
   * You must implement dehydrate/rehydrate methods pair in order to do
   * isomorphic app development. This ensures React can safely bootstrap
   * you app in correct state.
   */
  dehydrate () {
    return {
      _pageTitle: this._pageTitle,
    };
  }

  rehydrate (persistedState) {
    React.__spread(this, persistedState);
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
    this.emit("change");
  }

  _set_page_title_ ({newPageTitle}) {
    this._pageTitle = newPageTitle;

    this._emit_change_();
  }

});

export default RoutingStore;
