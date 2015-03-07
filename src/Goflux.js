import ActionDescriptor from "./internals/ActionDescriptor";

class Goflux {

  static defineActions (actionName, actionFactory) {
    return new ActionDescriptor(actionName, actionFactory);
  }

  constructor () {
  }
}

export default Goflux;
