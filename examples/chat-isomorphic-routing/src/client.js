/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUny
 */
import React from "react/addons";

import goflux from "./goflux";
import IsomorphicApp from "./components/IsomorphicApp.react";

const context = goflux.rehydrate(window.IsomorphicApp);

// yes, full page rendering
React.render(<IsomorphicApp gofluxContext={context} />, document);
