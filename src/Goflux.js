import ActionDescriptor from "./internals/ActionDescriptor";

class Goflux {

  static defineActions (actionName, actionFactory) {
    return new ActionDescriptor(actionName, actionFactory);
  }

  constructor () {
    this._actionBy = {};
  }

  registerActionsDescriptor (actionDescriptor) {
    this._actionBy[actionDescriptor.name] = actionDescriptor;
  }
}

export default Goflux;
