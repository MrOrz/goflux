(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["goflux"] = factory();
	else
		root["goflux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Goflux = _interopRequire(__webpack_require__(1));

	var GofluxMixin = _interopRequire(__webpack_require__(2));

	var StoreWatchMixin = _interopRequire(__webpack_require__(3));

	exports["default"] = Goflux;
	exports.GofluxMixin = GofluxMixin;
	exports.StoreWatchMixin = StoreWatchMixin;
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var ActionsDescriptor = _interopRequire(__webpack_require__(4));

	var StoreDescriptor = _interopRequire(__webpack_require__(5));

	var GofluxContext = _interopRequire(__webpack_require__(6));

	var Goflux = (function () {
	  function Goflux() {
	    _classCallCheck(this, Goflux);

	    this._actionsBy = {};
	    this._storeBy = {};
	  }

	  _createClass(Goflux, {
	    registerActionsDescriptor: {
	      value: function registerActionsDescriptor(actionsDescriptor) {
	        this._actionsBy[actionsDescriptor.name] = actionsDescriptor;
	      }
	    },
	    registerStoreDescriptor: {
	      value: function registerStoreDescriptor(storeDescriptor) {
	        this._storeBy[storeDescriptor.name] = storeDescriptor;
	      }
	    },
	    createContext: {
	      value: function createContext() {
	        var gofluxContext = new GofluxContext();
	        gofluxContext._initialize_(this._actionsBy, this._storeBy);
	        return gofluxContext._publicContext;
	      }
	    }
	  }, {
	    defineActions: {
	      value: function defineActions(actionsName, actionsFactory) {
	        return new ActionsDescriptor(actionsName, actionsFactory);
	      }
	    },
	    defineStore: {
	      value: function defineStore(storeName, storeEventMethodMappings, storeFactory) {
	        return new StoreDescriptor(storeName, storeEventMethodMappings, storeFactory);
	      }
	    }
	  });

	  return Goflux;
	})();

	module.exports = Goflux;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var invariant = _interopRequire(__webpack_require__(7));

	function GofluxMixinFactory(React) {

	  function getGofluxContext(componentRef) {
	    return componentRef.props.gofluxContext || componentRef.context && componentRef.context.gofluxContext;
	  }

	  return {
	    componentWillMount: function componentWillMount() {
	      if (getGofluxContext(this)) {
	        return;
	      }
	      var namePart = this.constructor.displayName ? " of " + this.constructor.displayName : "";
	      invariant("Could not find flux on this.props or this.context%s", namePart);
	    },

	    childContextTypes: {
	      gofluxContext: React.PropTypes.object
	    },

	    contextTypes: {
	      gofluxContext: React.PropTypes.object
	    },

	    getChildContext: function getChildContext() {
	      return {
	        gofluxContext: getGofluxContext(this) };
	    },

	    gofluxActions: function gofluxActions(actionsName) {
	      return getGofluxContext(this).getActions(actionsName);
	    },

	    gofluxStore: function gofluxStore(storeName) {
	      return getGofluxContext(this).getStore(storeName);
	    } };
	}

	GofluxMixinFactory.componentWillMount = function () {
	  invariant("GofluxMixin is a function that takes React as a parameter\n    and returns the mixin, e.g.: mixins: [GofluxMixin(React)]\n  ");
	};

	module.exports = GofluxMixinFactory;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var invariant = _interopRequire(__webpack_require__(7));

	function StoreWatchMixinFactory(storeNames, changeEventName, handlerName) {
	  return {
	    componentWillMount: function componentWillMount() {
	      if ("gofluxStore" in this) {
	        return;
	      }
	      invariant("StoreWatchMixin requires GofluxMixin to work");
	    },

	    componentDidMount: function componentDidMount() {
	      var _this = this;

	      storeNames.forEach(function (storeName) {
	        _this.gofluxStore(storeName).addListener(changeEventName, _this[handlerName]);
	      });
	    },

	    componentWillUnmount: function componentWillUnmount() {
	      var _this = this;

	      storeNames.forEach(function (storeName) {
	        _this.gofluxStore(storeName).removeListener(changeEventName, _this[handlerName]);
	      });
	    } };
	}

	StoreWatchMixinFactory.componentWillMount = function () {
	  invariant("StoreWatchMixin is a function that takes an array of store names,\n    change event name and handler function on component as parameters and\n    returns the mixin, e.g.: mixins:\n    [StoreWatchMixin([\"Store1\", \"Store2\"], \"change\", \"_handleChange\")]\n  ");
	};

	module.exports = StoreWatchMixinFactory;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var ActionsDescriptor = (function () {
	  function ActionsDescriptor(name, factory) {
	    _classCallCheck(this, ActionsDescriptor);

	    this._name = name;
	    this._factory = factory;
	  }

	  _createClass(ActionsDescriptor, {
	    name: {
	      get: function () {
	        return this._name;
	      }
	    },
	    _create_with_context_: {
	      value: function _create_with_context_(context) {
	        return new this._factory(context);
	      }
	    }
	  });

	  return ActionsDescriptor;
	})();

	module.exports = ActionsDescriptor;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var EventEmitter = __webpack_require__(9).EventEmitter;

	function createHandlerFn(storeInstance, eventMethodMappings) {
	  return function (rawPayload) {
	    var methodName = eventMethodMappings[rawPayload._event_name_];
	    if (methodName) {
	      storeInstance[methodName](rawPayload._payload_);
	    }
	  };
	}

	var EventEmitterPrototype = EventEmitter.prototype;
	var REQUIRED_EVENT_EMITTER_METHOD_NAMES = ["addListener", "emit", "removeListener"];

	var StoreDescriptor = (function () {
	  function StoreDescriptor(name, eventMethodMappings, factory) {
	    _classCallCheck(this, StoreDescriptor);

	    this._name = name;
	    this._eventMethodMappings = eventMethodMappings;
	    this._factory = factory;
	  }

	  _createClass(StoreDescriptor, {
	    name: {
	      get: function () {
	        return this._name;
	      }
	    },
	    _create_with_context_: {
	      value: function _create_with_context_(context) {
	        var storeInstance = new this._factory(context);

	        REQUIRED_EVENT_EMITTER_METHOD_NAMES.forEach(function (fnName) {
	          if (fnName in storeInstance) {
	            return;
	          }
	          storeInstance[fnName] = EventEmitterPrototype[fnName];
	        });

	        var dispatchHandler = createHandlerFn(storeInstance, this._eventMethodMappings);

	        return { storeInstance: storeInstance, dispatchHandler: dispatchHandler };
	      }
	    }
	  });

	  return StoreDescriptor;
	})();

	module.exports = StoreDescriptor;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Dispatcher = _interopRequire(__webpack_require__(8));

	var invariant = _interopRequire(__webpack_require__(7));

	var GofluxContext = (function () {
	  function GofluxContext() {
	    _classCallCheck(this, GofluxContext);

	    this._publicContext = this._create_restricted_context_("public", {
	      getActions: true,
	      getStore: true,
	      dehydrate: true,
	      rehydrate: true });

	    this._actionsContext = this._create_restricted_context_("actions", {
	      dispatch: true,
	      getActions: true });

	    this._storeContext = this._create_restricted_context_("store", {
	      waitFor: true,
	      getStore: true });

	    this._actionsBy = {};
	    this._storesBy = {};
	    this._dispatchTokenBy = {};
	    this._dispatcher = new Dispatcher();
	  }

	  _createClass(GofluxContext, {
	    dispatch: {
	      value: function dispatch(eventName, payload) {
	        this._dispatcher.dispatch({
	          _event_name_: eventName,
	          _payload_: payload });
	      }
	    },
	    getActions: {
	      value: function getActions(actionsName) {
	        return this._actionsBy[actionsName];
	      }
	    },
	    waitFor: {
	      value: function waitFor(storeNames) {
	        var _this = this;

	        var dispatchTokens = storeNames.map(function (storeName) {
	          return _this._dispatchTokenBy[storeName];
	        });
	        this._dispatcher.waitFor(dispatchTokens);
	      }
	    },
	    getStore: {
	      value: function getStore(storeName) {
	        return this._storesBy[storeName];
	      }
	    },
	    dehydrate: {
	      value: function dehydrate() {
	        var persistedStateBy = {};

	        var _ref = this;

	        var _storesBy = _ref._storesBy;

	        for (var storeName in _storesBy) {
	          persistedStateBy[storeName] = _storesBy[storeName].dehydrate();
	        }
	        return persistedStateBy;
	      }
	    },
	    rehydrate: {
	      value: function rehydrate(persistedState) {
	        var _ref = this;

	        var _storesBy = _ref._storesBy;

	        for (var storeName in persistedState) {
	          _storesBy[storeName].rehydrate(persistedState[storeName]);
	        }
	        return this;
	      }
	    },
	    _create_restricted_context_: {
	      value: function _create_restricted_context_(restrictedName, validMethodNameMappings) {
	        var restrictDefinition = {
	          value: function restrictFn() {
	            invariant(false, "function called on restricted (%s) context.", restrictedName);
	          } };

	        var propertiesObject = {};

	        PROTOTYPE_METHOD_NAMES.forEach(function (name) {
	          var shouldRestrictMethodAccess = !validMethodNameMappings[name];

	          if (shouldRestrictMethodAccess) {
	            propertiesObject[name] = restrictDefinition;
	          }
	        });

	        return Object.create(this, propertiesObject);
	      }
	    },
	    _initialize_: {
	      value: function _initialize_(actionsDescriptorsMap, storeDescriptorsMap) {
	        for (var actionsName in actionsDescriptorsMap) {
	          var actionsDescriptor = actionsDescriptorsMap[actionsName];
	          var actionsInstance = actionsDescriptor._create_with_context_(this._actionsContext);
	          this._actionsBy[actionsName] = actionsInstance;
	        }

	        for (var storeName in storeDescriptorsMap) {
	          var storeDescriptor = storeDescriptorsMap[storeName];

	          var _storeDescriptor$_create_with_context_ = storeDescriptor._create_with_context_(this._storeContext);

	          var storeInstance = _storeDescriptor$_create_with_context_.storeInstance;
	          var dispatchHandler = _storeDescriptor$_create_with_context_.dispatchHandler;

	          this._storesBy[storeName] = storeInstance;
	          this._dispatchTokenBy[storeName] = this._dispatcher.register(dispatchHandler);
	        }
	      }
	    }
	  });

	  return GofluxContext;
	})();

	var PROTOTYPE_METHOD_NAMES = Object.getOwnPropertyNames(GofluxContext.prototype);

	module.exports = GofluxContext;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(7);

	var _lastID = 1;
	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };


	module.exports = Dispatcher;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }
/******/ ])
});
;