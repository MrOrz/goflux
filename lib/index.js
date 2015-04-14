"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Goflux = _interopRequire(require("./Goflux"));

var GofluxMixin = _interopRequire(require("./mixins/GofluxMixin"));

var StoreWatchMixin = _interopRequire(require("./mixins/StoreWatchMixin"));

var mixins = {
  GofluxMixin: GofluxMixin,
  StoreWatchMixin: StoreWatchMixin };

exports.Goflux = Goflux;
exports.mixins = mixins;