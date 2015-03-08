import React from "react";
import {GofluxMixin, StoreWatchMixin} from "goflux";


const IsomorphicApp = React.createClass({
  displayName: "IsomorphicApp",

  mixins: [GofluxMixin(React), StoreWatchMixin(["RoutingStore"], "change", "_on_store_changed_")],

  propTypes: {
    dehydratedScript: React.PropTypes.string,
  },

  _get_state_from_stores_ () {
    /*
     * this.gofluxStore is a method provided by GofluxMixin.
     */
    return {
      pageTitle: this.gofluxStore("RoutingStore").getPageTitle(),
    };
  },

  getInitialState () {
    return this._get_state_from_stores_();
  },

  render () {
    const persistedScript = `window.${ this.props.persistedNamespace } = ${
      this.props.persistedState
    };`;

    return (
      <html>
      <head>
        <meta charSet="utf-8" />
        <title>{this.state.pageTitle}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{__html: persistedScript}}></script>
        <script src="/assets/client.js" defer></script>
      </body>
      </html>
    );
  },

  _on_store_changed_ () {
    this.setState(this._get_state_from_stores_());
  },

});

export default IsomorphicApp;
