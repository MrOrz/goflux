/*
 * Referral implementations:
 *
 * @flux: http://git.io/pU8w
 */
import React from "react/addons";
import {mixins} from "goflux";

const MessageListItem = React.createClass({
  displayName: "MessageListItem",

  mixins: [mixins.GofluxMixin(React)],

  propTypes: {
    message: React.PropTypes.object,
  },

  render () {
    const message = this.props.message;

    return (
      <li className="message-list-item">
        <h5 className="message-author-name">{message.authorName}</h5>
        <div className="message-time">
          {message.date.toLocaleTimeString()}
        </div>
        <div className="message-text">{message.text}</div>
      </li>
    );
  },

});

export default MessageListItem;
