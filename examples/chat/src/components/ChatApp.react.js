/*
 * Referral implementations:
 *
 * @flux: http://git.io/pUcu
 */
import React from "react/addons";
import {GofluxMixin} from "goflux";

import MessageSection from "./MessageSection.react";
import ThreadSection from "./ThreadSection.react";

const ChatApp = React.createClass({
  displayName: "ChatApp",

  mixins: [GofluxMixin],

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
