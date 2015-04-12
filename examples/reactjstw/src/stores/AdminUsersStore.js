import {EventEmitter} from "events";
import React from "react";
import Goflux from "goflux";

const AdminUsersStore = Goflux.defineStore("AdminUsersStore", {
  /*
   * Mapping for ACTION_NAME to handler name for AdminUsersStore instance.
   */
  "ADMIN_USERS_LIST_LOADED": "_admin_users_list_loaded_",
},
/*
 * A factory that can return a AdminUsersStore instance.
 * Of course, this can be an ES6 Class as well, but make sure you've extended
 * some implementation of EventEmitter.
 *
 * context.getStore("AdminUsersStore") will return this instance as well.
 */
class AdminUsersStore extends EventEmitter {

  constructor (context) {
    this._context = context;
    this._list = [];
  }
  /*
   * You must implement dehydrate/rehydrate methods pair in order to do
   * isomorphic app development. This ensures React can safely bootstrap
   * you app in correct state.
   */
  dehydrate () {
    return {
      _list: this._list,
    };
  }

  rehydrate (persistedState) {
    React.__spread(this, persistedState);
  }

  getList () {
    return this._list;
  }
  /*
   * Below are private functions and some dispatch handlers
   * Special naming convention:
   *   underscored function name with prefix and postfix underscores
   */
  _emit_change_ () {
    this.emit("change");
  }

  _admin_users_list_loaded_ ({list}) {
    this._list = list;

    this._emit_change_();
  }

});

export default AdminUsersStore;
