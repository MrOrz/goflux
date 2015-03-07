/*
 * Referral implementations:
 *
 * @flux: http://git.io/pUCl
 * @fluxxor:
 */
import React from "react/addons";
import {GofluxMixin, StoreWatchMixin} from "goflux";

import CHANGE_EVENT from "../utils/CHANGE_EVENT";

import MessageComposer from "./MessageComposer.react";
import MessageListItem from "./MessageListItem.react";

const MessageSection = React.createClass({
  displayName: "MessageSection",

  mixins: [GofluxMixin, StoreWatchMixin(["MessageStore", "ThreadStore"], CHANGE_EVENT, "_on_store_changed_")],

  _get_state_from_stores_ () {
    /*
     * this.gofluxStore is a method provided by GofluxMixin.
     */
    return {
      messages: this.gofluxStore("MessageStore").getAllForCurrentThread(),
      thread: this.gofluxStore("ThreadStore").getCurrent(),
    };
  },

  getInitialState () {
    return this._get_state_from_stores_();
  },

  componentDidMount () {
    this._scroll_to_bottom_();
  },

  render () {
    const messageListItems = this.state.messages.map((message) => {
      return (
        <MessageListItem
          key={message.id}
          message={message}
        />
      );
    });

    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{this.state.thread.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID={this.state.thread.id}/>
      </div>
    );
  },

  componentDidUpdate () {
    this._scroll_to_bottom_();
  },

  _scroll_to_bottom_ () {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  _on_store_changed_ () {
    this.setState(this._get_state_from_stores_());
  },

});

export default MessageSection;
