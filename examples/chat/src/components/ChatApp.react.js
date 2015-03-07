/*
 * Referral implementations:
 *
 * @flux: http://git.io/pUcu
 */
import React from "react/addons";
import {GofluxMixin} from "goflux";

import ChatWebAPIUtils from "../utils/ChatWebAPIUtils";

import MessageSection from "./MessageSection.react";
import ThreadSection from "./ThreadSection.react";

const ChatApp = React.createClass({
  displayName: "ChatApp",

  mixins: [GofluxMixin],

  componentDidMount () {
    ChatWebAPIUtils.getAllMessages().then((rawMessages) => {
      /*
       * this.gofluxAction is a method provided by GofluxMixin.
       */
      return this.gofluxAction("ServerActions").receiveAll(rawMessages);
    });
  },

  render () {
    return (
      <div className="chatapp">
        <ThreadSection />
        <MessageSection />
      </div>
    );
  },

});

export default ChatApp;
