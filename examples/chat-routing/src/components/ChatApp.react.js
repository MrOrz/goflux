/*
 * Referral implementations:
 *
 * @flux: http://git.io/pUcu
 */
import React from "react/addons";
import {mixins} from "goflux";

import CHANGE_EVENT from "../utils/CHANGE_EVENT";

import MessageSection from "./MessageSection.react";
import ThreadSection from "./ThreadSection.react";

const ChatApp = React.createClass({
  displayName: "ChatApp",

  mixins: [mixins.GofluxMixin(React), mixins.StoreWatchMixin(["RoutingStore"], CHANGE_EVENT, "_on_store_changed_")],

  getInitialState () {
    return this._get_state_from_stores_();
  },


  componentDidMount () {
    this._set_document_title_();
  },

  componentDidUpdate () {
    this._set_document_title_();
  },

  render () {
    return (
      <div className="chatapp">
        <ThreadSection />
        <MessageSection />
      </div>
    );
  },

  _get_state_from_stores_ () {
    return {
      pageTitle: this.gofluxStore("RoutingStore").getPageTitle(),
    };
  },

  _on_store_changed_ () {
    this.setState(this._get_state_from_stores_());
  },

  _set_document_title_ () {
    document.title = this.state.pageTitle;
  },

});

export default ChatApp;
