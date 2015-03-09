/*
 * Referral implementations:
 *
 * @flux: http://git.io/pUlh
 */
import React from "react/addons";
import {GofluxMixin} from "goflux";

const ENTER_KEY_CODE = 13;

const MessageComposer = React.createClass({
  displayName: "MessageComposer",

  mixins: [GofluxMixin],

  propTypes: {
    threadID: React.PropTypes.string.isRequired,
  },

  getInitialState () {
    return {text: ""};
  },

  render () {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._on_change_}
        onKeyDown={this._on_key_down_}
      />
    );
  },

  _on_change_: function(event, value) {
    this.setState({text: event.target.value});
  },

  _on_key_down_: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      const text = this.state.text.trim();
      if (text) {
        /*
         * this.gofluxActions is a method provided by GofluxMixin.
         */
        this.gofluxActions("MessageActions").createMessage(text, this.props.threadID);
      }
      this.setState({text: ""});
    }
  },

});

export default MessageComposer;
