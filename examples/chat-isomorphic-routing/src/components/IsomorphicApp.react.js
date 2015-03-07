/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUad
 */
import React from "react/addons";
import {GofluxMixin} from "goflux";

import ChatApp from "./ChatApp.react";

const IsomorphicApp = React.createClass({
  displayName: "IsomorphicApp",

  mixins: [GofluxMixin],

  propTypes: {
    dehydratedScript: React.PropTypes.string,
  },

  getInitialState () {
    /*
     * this.gofluxStore is a method provided by GofluxMixin.
     */
    return {
      pageTitle: this.gofluxStore("RoutingStore").getPageTitle(),
    };
  },

  render () {
    return (
      <html>
      <head>
        <meta charSet="utf-8" />
        <title>{this.state.pageTitle}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{__html: this.props.dehydratedScript}}></script>
        <script src="/public/js/client.js" defer></script>
      </body>
      </html>
    );
  },

});

export default IsomorphicApp;
