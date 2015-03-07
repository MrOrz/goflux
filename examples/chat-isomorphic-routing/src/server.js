/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUzU
 */
import React from "react/addons";

import goflux from "./goflux";
import IsomorphicApp from "./components/IsomorphicApp.react";

function index (req, res, next) {
  // per request per context
  const context = goflux.createContext();

  context.gofluxAction("RoutingActions")
  .route(req.url, req.params)
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
    /*
     * Leave the implementation details of passing data down to client
     * to consumers. This use simple passing method by a global variable.
     */
    const dehydratedScript = `window.IsomorphicApp = ${
      JSON.stringify(goflux.dehydrate(context))
    };`;

    const html = React.renderToString(
      <IsomorphicApp gofluxContext={context} dehydratedScript={dehydratedScript} />
    );

    res.send(html);

  }, (err) => {

    next(err);

  });
}

export {index};
