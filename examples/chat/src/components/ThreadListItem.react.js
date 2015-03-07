/*
 * Referral implementations:
 *
 * @flux: http://git.io/pUB3
 */
import React from "react/addons";
import cx from "react/lib/cx";
import {GofluxMixin} from "goflux";

const ThreadListItem = React.createClass({
  displayName: "ThreadListItem",

  mixins: [GofluxMixin],

  propTypes: {
    thread: React.PropTypes.object,
    currentThreadID: React.PropTypes.string,
  },

  render () {
    const thread = this.props.thread;
    const lastMessage = thread.lastMessage;

    return (
      <li
        className={cx({
          "thread-list-item": true,
          "active": thread.id === this.props.currentThreadID,
        })}
        onClick={this._on_click_}>
        <h5 className="thread-name">{thread.name}</h5>
        <div className="thread-time">
          {lastMessage.date.toLocaleTimeString()}
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    );
  },

  _on_click_ () {
    /*
     * this.gofluxAction is a method provided by GofluxMixin.
     */
    this.gofluxAction("ThreadActions").clickThread(this.props.thread.id);
  },

});

export default ThreadListItem;
