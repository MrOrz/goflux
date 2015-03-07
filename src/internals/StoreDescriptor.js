import {EventEmitter} from "events";
const EventEmitterPrototype = EventEmitter.prototype;

function createHandlerFn (storeInstance, eventMethodMappings) {
  return (rawPayload) => {
    const methodName = eventMethodMappings[rawPayload._event_name_];
    if (methodName) {
      storeInstance[methodName](rawPayload._payload_);
    }
  };
}

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

    for (var fnName in EventEmitterPrototype) {
      if (fnName in storeInstance) {
        continue;
      }
      storeInstance[fnName] = EventEmitterPrototype[fnName];
    }

    const dispatchHandler = createHandlerFn(storeInstance, this._eventMethodMappings);

    return {storeInstance, dispatchHandler};
  }
}

export default StoreDescriptor;
