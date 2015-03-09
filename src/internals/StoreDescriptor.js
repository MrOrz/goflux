import {EventEmitter} from "events";

function createHandlerFn (storeInstance, eventMethodMappings) {
  return (rawPayload) => {
    const methodName = eventMethodMappings[rawPayload._event_name_];
    if (methodName) {
      storeInstance[methodName](rawPayload._payload_);
    }
  };
}

const EventEmitterPrototype = EventEmitter.prototype;
const REQUIRED_EVENT_EMITTER_METHOD_NAMES = ["addListener", "emit", "removeListener"];

class StoreDescriptor {

  constructor (name, eventMethodMappings, factory) {
    this._name = name;
    this._eventMethodMappings = eventMethodMappings;
    this._factory = factory;
  }

  get name () {
    return this._name;
  }

  _create_with_context_ (context) {
    const storeInstance = new this._factory(context);

    REQUIRED_EVENT_EMITTER_METHOD_NAMES.forEach((fnName) => {
      if (!fnName in storeInstance) {
        storeInstance[fnName] = EventEmitterPrototype[fnName];
      }
    });

    const dispatchHandler = createHandlerFn(storeInstance, this._eventMethodMappings);

    return {storeInstance, dispatchHandler};
  }
}

export default StoreDescriptor;
