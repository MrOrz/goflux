/*
 * Referral implementations:
 *
 * @flux: http://git.io/pUcu
 */
import React from "react/addons";
import {mixins} from "goflux";

import MessageSection from "./MessageSection.react";
import ThreadSection from "./ThreadSection.react";

const ChatApp = React.createClass({
  displayName: "ChatApp",

  mixins: [mixins.GofluxMixin(React)],

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
