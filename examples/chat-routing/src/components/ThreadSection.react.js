/*
 * Referral implementations:
 *
 * @flux: http://git.io/pU8y
 */
import React from "react/addons";
import {mixins} from "goflux";

import CHANGE_EVENT from "../utils/CHANGE_EVENT";

import ThreadListItem from "./ThreadListItem.react";

const ThreadSection = React.createClass({
  displayName: "ThreadSection",

  mixins: [mixins.GofluxMixin(React), mixins.StoreWatchMixin(["ThreadStore", "UnreadThreadStore"], CHANGE_EVENT, "_on_store_changed_")],

  _get_state_from_stores_ () {
    /*
     * this.gofluxStore is a method provided by GofluxMixin.
     */
    return {
      threads: this.gofluxStore("ThreadStore").getAllChrono(),
      currentThreadID: this.gofluxStore("ThreadStore").getCurrentID(),
      unreadCount: this.gofluxStore("UnreadThreadStore").getCount(),
    };
  },

  getInitialState () {
    return this._get_state_from_stores_();
  },

  render () {
    const threadListItems = this.state.threads.map((thread) => {
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
        />
      );
    });
    const unread =
      0 === this.state.unreadCount ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;

    return (
      <div className="thread-section">
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
          {threadListItems}
          </ul>
      </div>
    );
  },

  _on_store_changed_ () {
    this.setState(this._get_state_from_stores_());
  },

});

export default ThreadSection;
