import React from "react";

import goflux from "./goflux";
import IsomorphicApp from "./components/IsomorphicApp.react";

function index (url, query) {
  // per request per context
  const context = goflux.createContext();

  return context.getActions("RoutingActions")
  .route(url, query)
  /*
   * The RoutingActions.route method will return a promise. When the promise
   * get resolved, we know it's ready to render the page
   *
   * Usually, the step inside route function will be
   * 1. Determine which handler for that url
   * 2. In the handler, it will,
   *    a. Check if current user can see this page. If not, reject the promise
   *    b. Fetch necessary data from server.
   *    c. Trigger corresponding ServerActions when we received respond from svr
   *    d. Return a promise waiting on those ServerActions to be all resolved.
   */
  .then(() => {

    const persistedState = JSON.stringify(context.dehydrate());

    const html = React.renderToString(
      <IsomorphicApp gofluxContext={context}
                      persistedState={persistedState}
                      persistedNamespace="IsomorphicApp" />
    );

    return html;

  });
}

export {index};
