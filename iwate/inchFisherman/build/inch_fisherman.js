
(function() {
var __main_module_name__ = "main";
var __resources__ = {};
var __remote_resources__ = {};
function __imageResource(data) { var img = new Image(); img.src = data; return img; };
var FLIP_Y_AXIS = false;
var ENABLE_WEB_GL = false;
var SHOW_REDRAW_REGIONS = false;

__resources__["/__builtin__/event.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*global module exports require*/
/*jslint white: true, undef: true, nomen: true, bitwise: true, regexp: true, newcap: true*/


/**
 * @namespace
 * Support for listening for and triggering events
 */
var event = {};

/**
 * @private
 * @ignore
 * Returns the event listener property of an object, creating it if it doesn't
 * already exist.
 *
 * @returns {Object}
 */
function getListeners(obj, eventName) {
    if (!obj.js_listeners_) {
        obj.js_listeners_ = {};
    }
    if (!eventName) {
        return obj.js_listeners_;
    }
    if (!obj.js_listeners_[eventName]) {
        obj.js_listeners_[eventName] = {};
    }
    return obj.js_listeners_[eventName];
}

/**
 * @private
 * @ignore
 * Keep track of the next ID for each new EventListener
 */
var eventID = 0;

/**
 * @class
 * Represents an event being listened to. You should not create instances of
 * this directly, it is instead returned by event.addListener
 *
 * @extends Object
 * 
 * @param {Object} source Object to listen to for an event
 * @param {String} eventName Name of the event to listen for
 * @param {Function} handler Callback to fire when the event triggers
 */
event.EventListener = function (source, eventName, handler) {
    /**
     * Object to listen to for an event
     * @type Object 
     */
    this.source = source;
    
    /**
     * Name of the event to listen for
     * @type String
     */
    this.eventName = eventName;

    /**
     * Callback to fire when the event triggers
     * @type Function
     */
    this.handler = handler;

    /**
     * Unique ID number for this instance
     * @type Integer 
     */
    this.id = ++eventID;

    getListeners(source, eventName)[this.id] = this;
};

/**
 * Register an event listener
 *
 * @param {Object} source Object to listen to for an event
 * @param {String} eventName Name of the event to listen for
 * @param {Function} handler Callback to fire when the event triggers
 *
 * @returns {event.EventListener} The event listener. Pass to removeListener to destroy it.
 */
event.addListener = function (source, eventName, handler) {
    return new event.EventListener(source, eventName, handler);
};

/**
 * Trigger an event. All listeners will be notified.
 *
 * @param {Object} source Object to trigger the event on
 * @param {String} eventName Name of the event to trigger
 */
event.trigger = function (source, eventName) {
    var listeners = getListeners(source, eventName),
        args = Array.prototype.slice.call(arguments, 2),
        eventID,
        l;

    for (eventID in listeners) {
        if (listeners.hasOwnProperty(eventID)) {
            l = listeners[eventID];
            if (l) {
                l.handler.apply(undefined, args);
            }
        }
    }
};

/**
 * Remove a previously registered event listener
 *
 * @param {event.EventListener} listener EventListener to remove, as returned by event.addListener
 */
event.removeListener = function (listener) {
    delete getListeners(listener.source, listener.eventName)[listener.eventID];
};

/**
 * Remove a all event listeners for a given event
 *
 * @param {Object} source Object to remove listeners from
 * @param {String} eventName Name of event to remove listeners from
 */
event.clearListeners = function (source, eventName) {
    var listeners = getListeners(source, eventName),
        eventID;


    for (eventID in listeners) {
        if (listeners.hasOwnProperty(eventID)) {
            var l = listeners[eventID];
            if (l) {
                event.removeListener(l);
            }
        }
    }
};

/**
 * Remove all event listeners on an object
 *
 * @param {Object} source Object to remove listeners from
 */
event.clearInstanceListeners = function (source, eventName) {
    var listeners = getListeners(source),
        eventID;

    for (eventName in listeners) {
        if (listeners.hasOwnProperty(eventName)) {
            var el = listeners[eventName];
            for (eventID in el) {
                if (el.hasOwnProperty(eventID)) {
                    var l = el[eventID];
                    if (l) {
                        event.removeListener(l);
                    }
                }
            }
        }
    }
};

module.exports = event;

}};
__resources__["/__builtin__/events.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*global module exports require*/
/*jslint white: true, undef: true, nomen: true, bitwise: true, regexp: true, newcap: true*/

/**
 * @namespace
 * Support for listening for and triggering events
 */
var events = {};

/**
 * @private
 * @ignore
 * Returns the event listener property of an object, creating it if it doesn't
 * already exist.
 *
 * @returns {Object}
 */
function getListeners(obj, eventName) {
    if (!obj.js_listeners_) {
        obj.js_listeners_ = {};
    }
    if (!eventName) {
        return obj.js_listeners_;
    }
    if (!obj.js_listeners_[eventName]) {
        obj.js_listeners_[eventName] = {};
    }
    return obj.js_listeners_[eventName];
}

/**
 * @private
 * @ignore
 * Keep track of the next ID for each new EventListener
 */
var eventID = 0;

/**
 * @class
 * Represents an event being listened to. You should not create instances of
 * this directly, it is instead returned by events.addListener
 *
 * @extends Object
 * 
 * @param {Object} source Object to listen to for an event
 * @param {String} eventName Name of the event to listen for
 * @param {Function} handler Callback to fire when the event triggers
 */
events.EventListener = function (source, eventName, handler) {
    /**
     * Object to listen to for an event
     * @type Object 
     */
    this.source = source;
    
    /**
     * Name of the event to listen for
     * @type String
     */
    this.eventName = eventName;

    /**
     * Callback to fire when the event triggers
     * @type Function
     */
    this.handler = handler;

    /**
     * Unique ID number for this instance
     * @type Integer 
     */
    this.id = ++eventID;

    getListeners(source, eventName)[this.id] = this;
};

/**
 * Register an event listener
 *
 * @param {Object} source Object to listen to for an event
 * @param {String|Stringp[} eventName Name or Array of names of the event(s) to listen for
 * @param {Function} handler Callback to fire when the event triggers
 *
 * @returns {events.EventListener|events.EventListener[]} The event listener(s). Pass to removeListener to destroy it.
 */
events.addListener = function (source, eventName, handler) {
    if (eventName instanceof Array) {
        var listeners = [];
        for (var i = 0, len = eventName.length; i < len; i++) {
            listeners.push(new events.EventListener(source, eventName[i], handler));
        }
        return listeners;
    } else {
        return new events.EventListener(source, eventName, handler);
    }
};

/**
 * Trigger an event. All listeners will be notified.
 *
 * @param {Object} source Object to trigger the event on
 * @param {String} eventName Name of the event to trigger
 */
events.trigger = function (source, eventName) {
    var listeners = getListeners(source, eventName),
        args = Array.prototype.slice.call(arguments, 2),
        eventID,
        l;

    for (eventID in listeners) {
        if (listeners.hasOwnProperty(eventID)) {
            l = listeners[eventID];
            if (l) {
                l.handler.apply(undefined, args);
            }
        }
    }
};

/**
 * Remove a previously registered event listener
 *
 * @param {events.EventListener} listener EventListener to remove, as returned by events.addListener
 */
events.removeListener = function (listener) {
    delete getListeners(listener.source, listener.eventName)[listener.eventID];
};

/**
 * Remove a all event listeners for a given event
 *
 * @param {Object} source Object to remove listeners from
 * @param {String} eventName Name of event to remove listeners from
 */
events.clearListeners = function (source, eventName) {
    var listeners = getListeners(source, eventName),
        eventID;


    for (eventID in listeners) {
        if (listeners.hasOwnProperty(eventID)) {
            var l = listeners[eventID];
            if (l) {
                events.removeListener(l);
            }
        }
    }
};

/**
 * Remove all event listeners on an object
 *
 * @param {Object} source Object to remove listeners from
 */
events.clearInstanceListeners = function (source) {
    var listeners = getListeners(source),
        eventID;

    for (var eventName in listeners) {
        if (listeners.hasOwnProperty(eventName)) {
            var el = listeners[eventName];
            for (eventID in el) {
                if (el.hasOwnProperty(eventID)) {
                    var l = el[eventID];
                    if (l) {
                        events.removeListener(l);
                    }
                }
            }
        }
    }
};

module.exports = events;

}};
__resources__["/__builtin__/global.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events');


/**
 * @ignore
 */
function getAccessors(obj) {
    if (!obj.js_accessors_) {
        obj.js_accessors_ = {};
    }
    return obj.js_accessors_;
}

/**
 * @ignore
 */
function getBindings(obj) {
    if (!obj.js_bindings_) {
        obj.js_bindings_ = {};
    }
    return obj.js_bindings_;
}

/**
 * @ignore
 */
function addAccessor(obj, key, target, targetKey, noNotify) {
    getAccessors(obj)[key] = {
        key: targetKey,
        target: target
    };

    if (!noNotify) {
        obj.triggerChanged(key);
    }
}


/**
 * @ignore
 */
var objectID = 0;

/**
 * @class
 * A bindable object. Allows observing and binding to its properties.
 */
var BObject = function () {};
BObject.prototype = util.extend(BObject.prototype, /** @lends BObject# */{
    /**
     * Unique ID
     * @type Integer
     */
    _id: 0,
    

    /**
     * The constructor for subclasses. Overwrite this for any initalisation you
     * need to do.
     * @ignore
     */
    init: function () {},

    /**
     * Get a property from the object. Always use this instead of trying to
     * access the property directly. This will ensure all bindings, setters and
     * getters work correctly.
     * 
     * @param {String} key Name of property to get or dot (.) separated path to a property
     * @returns {*} Value of the property
     */
    get: function (key) {
        var next = false
        if (~key.indexOf('.')) {
            var tokens = key.split('.');
            key = tokens.shift();
            next = tokens.join('.');
        }


        var accessor = getAccessors(this)[key],
            val;
        if (accessor) {
            val = accessor.target.get(accessor.key);
        } else {
            // Call getting function
            if (this['get_' + key]) {
                val = this['get_' + key]();
            } else {
                val = this[key];
            }
        }

        if (next) {
            return val.get(next);
        } else {
            return val;
        }
    },


    /**
     * Set a property on the object. Always use this instead of trying to
     * access the property directly. This will ensure all bindings, setters and
     * getters work correctly.
     * 
     * @param {String} key Name of property to get
     * @param {*} value New value for the property
     */
    set: function (key, value) {
        var accessor = getAccessors(this)[key],
            oldVal = this.get(key);


        this.triggerBeforeChanged(key, oldVal);

        if (accessor) {
            accessor.target.set(accessor.key, value);
        } else {

            if (this['set_' + key]) {
                this['set_' + key](value);
            } else {
                this[key] = value;
            }
        }
        this.triggerChanged(key, oldVal);
    },

    /**
     * Set multiple propertys in one go
     *
     * @param {Object} kvp An Object where the key is a property name and the value is the value to assign to the property
     *
     * @example
     * var props = {
     *   monkey: 'ook',
     *   cat: 'meow',
     *   dog: 'woof'
     * };
     * foo.setValues(props);
     * console.log(foo.get('cat')); // Logs 'meow'
     */
    setValues: function (kvp) {
        for (var x in kvp) {
            if (kvp.hasOwnProperty(x)) {
                this.set(x, kvp[x]);
            }
        }
    },

    changed: function (key) {
    },

    /**
     * @private
     */
    notify: function (key, oldVal) {
        var accessor = getAccessors(this)[key];
        if (accessor) {
            accessor.target.notify(accessor.key, oldVal);
        }
    },

    /**
     * @private
     */
    triggerBeforeChanged: function (key, oldVal) {
        events.trigger(this, key.toLowerCase() + '_before_changed', oldVal);
    },

    /**
     * @private
     */
    triggerChanged: function (key, oldVal) {
        events.trigger(this, key.toLowerCase() + '_changed', oldVal);
    },

    /**
     * Bind the value of a property on this object to that of another object so
     * they always have the same value. Setting the value on either object will update
     * the other too.
     *
     * @param {String} key Name of the property on this object that should be bound
     * @param {BOject} target Object to bind to
     * @param {String} [targetKey=key] Key on the target object to bind to
     * @param {Boolean} [noNotify=false] Set to true to prevent this object's property triggering a 'changed' event when adding the binding
     */
    bindTo: function (key, target, targetKey, noNotify) {
        targetKey = targetKey || key;
        var self = this;
        this.unbind(key);

        var oldVal = this.get(key);

        // When bound property changes, trigger a 'changed' event on this one too
        getBindings(this)[key] = events.addListener(target, targetKey.toLowerCase() + '_changed', function (oldVal) {
            self.triggerChanged(key, oldVal);
        });

        addAccessor(this, key, target, targetKey, noNotify);
    },

    /**
     * Remove binding from a property which set setup using BObject#bindTo.
     *
     * @param {String} key Name of the property on this object to unbind
     */
    unbind: function (key) {
        var binding = getBindings(this)[key];
        if (!binding) {
            return;
        }

        delete getBindings(this)[key];
        events.removeListener(binding);
        // Grab current value from bound property
        var val = this.get(key);
        delete getAccessors(this)[key];
        // Set bound value
        this[key] = val;
    },

    /**
     * Remove all bindings on this object
     */
    unbindAll: function () {
        var keys = [],
            bindings = getBindings(this);
        for (var k in bindings) {
            if (bindings.hasOwnProperty(k)) {
                this.unbind(k);
            }
        }
    },

    /**
     * Unique ID for this object
     * @getter id
     * @type Integer
     */
    get_id: function () {
        if (!this._id) {
            this._id = ++objectID;
        }

        return this._id;
    }
});


/**
 * Create a new instance of this object
 * @returns {BObject} New instance of this object
 */
BObject.create = function () {
    var ret = new this();
    ret.init.apply(ret, arguments);
    return ret;
};

/**
 * Create a new subclass by extending this one
 * @returns {Object} A new subclass of this object
 */
BObject.extend = function() {
    var newObj = function() {},
        args = [],
        i,
        x;

    // Copy 'class' methods
    for (x in this) {
        if (this.hasOwnProperty(x)) {
            newObj[x] = this[x];
        }
    }


    // Add given properties to the prototype
    newObj.prototype = util.beget(this.prototype);
    args.push(newObj.prototype);
    for (i = 0; i<arguments.length; i++) {
        args.push(arguments[i]);
    }
    util.extend.apply(null, args);

    newObj.superclass = this.prototype;
    // Create new instance
    return newObj;
};

/**
 * Get a property from the class. Always use this instead of trying to
 * access the property directly. This will ensure all bindings, setters and
 * getters work correctly.
 * 
 * @function
 * @param {String} key Name of property to get
 * @returns {*} Value of the property
 */
BObject.get = BObject.prototype.get;

/**
 * Set a property on the class. Always use this instead of trying to
 * access the property directly. This will ensure all bindings, setters and
 * getters work correctly.
 * 
 * @function
 * @param {String} key Name of property to get
 * @param {*} value New value for the property
 */
BObject.set = BObject.prototype.set;

var BArray = BObject.extend(/** @lends BArray# */{

    /**
     * @constructs 
     * A bindable array. Allows observing for changes made to its contents
     *
     * @extends BObject
     * @param {Array} [array=[]] A normal JS array to use for data
     */
    init: function (array) {
        this.array = array || [];
        this.set('length', this.array.length);
    },

    /**
     * Get an item
     *
     * @param {Integer} i Index to get item from
     * @returns {*} Value stored in the array at index 'i'
     */
    getAt: function (i) {
        return this.array[i];
    },

    /**
     * Set an item -- Overwrites any existing item at index
     *
     * @param {Integer} i Index to set item to
     * @param {*} value Value to assign to index
     */
    setAt: function (i, value) {
        var oldVal = this.array[i];
        this.array[i] = value;

        events.trigger(this, 'set_at', i, oldVal);
    },

    /**
     * Insert a new item into the array without overwriting anything
     *
     * @param {Integer} i Index to insert item at
     * @param {*} value Value to insert
     */
    insertAt: function (i, value) {
        this.array.splice(i, 0, value);
        this.set('length', this.array.length);
        events.trigger(this, 'insert_at', i);
    },

    /**
     * Remove item from the array and return it
     *
     * @param {Integer} i Index to remove
     * @returns {*} Value that was removed
     */
    removeAt: function (i) {
        var oldVal = this.array[i];
        this.array.splice(i, 1);
        this.set('length', this.array.length);
        events.trigger(this, 'remove_at', i, oldVal);

        return oldVal;
    },

    /**
     * Get the internal Javascript Array instance
     *
     * @returns {Array} Internal Javascript Array
     */
    getArray: function () {
        return this.array;
    },

    /**
     * Append a value to the end of the array and return its new length
     *
     * @param {*} value Value to append to the array
     * @returns {Integer} New length of the array
     */
    push: function (value) {
        this.insertAt(this.array.length, value);
        return this.array.length;
    },

    /**
     * Remove value from the end of the array and return it
     *
     * @returns {*} Value that was removed
     */
    pop: function () {
        return this.removeAt(this.array.length - 1);
    }
});

exports.BObject = BObject;
exports.BArray = BArray;

}};
__resources__["/__builtin__/libs/base64.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/**
 * Thin wrapper around JXG's Base64 utils
 */

/** @ignore */
var JXG = require('JXGUtil');

/** @namespace */
var base64 = {
    /**
     * Decode a base64 encoded string into a binary string
     *
     * @param {String} input Base64 encoded data
     * @returns {String} Binary string
     */
    decode: function(input) {
        return JXG.Util.Base64.decode(input);
    },

    /**
     * Decode a base64 encoded string into a byte array
     *
     * @param {String} input Base64 encoded data
     * @returns {Integer[]} Array of bytes
     */
    decodeAsArray: function(input, bytes) {
        bytes = bytes || 1;

        var dec = JXG.Util.Base64.decode(input),
            ar = [], i, j, len;

        for (i = 0, len = dec.length/bytes; i < len; i++){
            ar[i] = 0;
            for (j = bytes-1; j >= 0; --j){
                ar[i] += dec.charCodeAt((i *bytes) +j) << (j *8);
            }
        }
        return ar;
    },

    /**
     * Encode a binary string into base64
     *
     * @param {String} input Binary string
     * @returns {String} Base64 encoded data
     */
    encode: function(input) {
        return JXG.Util.Base64.encode(input);
    }
};

module.exports = base64;

}};
__resources__["/__builtin__/libs/box2d.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
function extend(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
}
function isInstanceOf(obj, _constructor) {
  while(typeof obj === "object") {
    if(obj.constructor === _constructor) {
      return true
    }
    obj = obj._super
  }
  return false
}
;var b2BoundValues = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2BoundValues.prototype.__constructor = function() {
  this.lowerValues = new Array;
  this.lowerValues[0] = 0;
  this.lowerValues[1] = 0;
  this.upperValues = new Array;
  this.upperValues[0] = 0;
  this.upperValues[1] = 0
};
b2BoundValues.prototype.__varz = function() {
};
b2BoundValues.prototype.lowerValues = null;
b2BoundValues.prototype.upperValues = null;var b2PairManager = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2PairManager.prototype.__constructor = function() {
  this.m_pairs = new Array;
  this.m_pairBuffer = new Array;
  this.m_pairCount = 0;
  this.m_pairBufferCount = 0;
  this.m_freePair = null
};
b2PairManager.prototype.__varz = function() {
};
b2PairManager.prototype.AddPair = function(proxy1, proxy2) {
  var pair = proxy1.pairs[proxy2];
  if(pair != null) {
    return pair
  }
  if(this.m_freePair == null) {
    this.m_freePair = new b2Pair;
    this.m_pairs.push(this.m_freePair)
  }
  pair = this.m_freePair;
  this.m_freePair = pair.next;
  pair.proxy1 = proxy1;
  pair.proxy2 = proxy2;
  pair.status = 0;
  pair.userData = null;
  pair.next = null;
  proxy1.pairs[proxy2] = pair;
  proxy2.pairs[proxy1] = pair;
  ++this.m_pairCount;
  return pair
};
b2PairManager.prototype.RemovePair = function(proxy1, proxy2) {
  var pair = proxy1.pairs[proxy2];
  if(pair == null) {
    return null
  }
  var userData = pair.userData;
  delete proxy1.pairs[proxy2];
  delete proxy2.pairs[proxy1];
  pair.next = this.m_freePair;
  pair.proxy1 = null;
  pair.proxy2 = null;
  pair.userData = null;
  pair.status = 0;
  this.m_freePair = pair;
  --this.m_pairCount;
  return userData
};
b2PairManager.prototype.Find = function(proxy1, proxy2) {
  return proxy1.pairs[proxy2]
};
b2PairManager.prototype.ValidateBuffer = function() {
};
b2PairManager.prototype.ValidateTable = function() {
};
b2PairManager.prototype.Initialize = function(broadPhase) {
  this.m_broadPhase = broadPhase
};
b2PairManager.prototype.AddBufferedPair = function(proxy1, proxy2) {
  var pair = this.AddPair(proxy1, proxy2);
  if(pair.IsBuffered() == false) {
    pair.SetBuffered();
    this.m_pairBuffer[this.m_pairBufferCount] = pair;
    ++this.m_pairBufferCount
  }
  pair.ClearRemoved();
  if(b2BroadPhase.s_validate) {
    this.ValidateBuffer()
  }
};
b2PairManager.prototype.RemoveBufferedPair = function(proxy1, proxy2) {
  var pair = this.Find(proxy1, proxy2);
  if(pair == null) {
    return
  }
  if(pair.IsBuffered() == false) {
    pair.SetBuffered();
    this.m_pairBuffer[this.m_pairBufferCount] = pair;
    ++this.m_pairBufferCount
  }
  pair.SetRemoved();
  if(b2BroadPhase.s_validate) {
    this.ValidateBuffer()
  }
};
b2PairManager.prototype.Commit = function(callback) {
  var i = 0;
  var removeCount = 0;
  for(i = 0;i < this.m_pairBufferCount;++i) {
    var pair = this.m_pairBuffer[i];
    pair.ClearBuffered();
    var proxy1 = pair.proxy1;
    var proxy2 = pair.proxy2;
    if(pair.IsRemoved()) {
    }else {
      if(pair.IsFinal() == false) {
        callback(proxy1.userData, proxy2.userData)
      }
    }
  }
  this.m_pairBufferCount = 0;
  if(b2BroadPhase.s_validate) {
    this.ValidateTable()
  }
};
b2PairManager.prototype.m_broadPhase = null;
b2PairManager.prototype.m_pairs = null;
b2PairManager.prototype.m_freePair = null;
b2PairManager.prototype.m_pairCount = 0;
b2PairManager.prototype.m_pairBuffer = null;
b2PairManager.prototype.m_pairBufferCount = 0;var b2TimeStep = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2TimeStep.prototype.__constructor = function() {
};
b2TimeStep.prototype.__varz = function() {
};
b2TimeStep.prototype.Set = function(step) {
  this.dt = step.dt;
  this.inv_dt = step.inv_dt;
  this.positionIterations = step.positionIterations;
  this.velocityIterations = step.velocityIterations;
  this.warmStarting = step.warmStarting
};
b2TimeStep.prototype.dt = null;
b2TimeStep.prototype.inv_dt = null;
b2TimeStep.prototype.dtRatio = null;
b2TimeStep.prototype.velocityIterations = 0;
b2TimeStep.prototype.positionIterations = 0;
b2TimeStep.prototype.warmStarting = null;var b2Controller = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Controller.prototype.__constructor = function() {
};
b2Controller.prototype.__varz = function() {
};
b2Controller.prototype.Step = function(step) {
};
b2Controller.prototype.Draw = function(debugDraw) {
};
b2Controller.prototype.AddBody = function(body) {
  var edge = new b2ControllerEdge;
  edge.controller = this;
  edge.body = body;
  edge.nextBody = m_bodyList;
  edge.prevBody = null;
  m_bodyList = edge;
  if(edge.nextBody) {
    edge.nextBody.prevBody = edge
  }
  m_bodyCount++;
  edge.nextController = body.m_controllerList;
  edge.prevController = null;
  body.m_controllerList = edge;
  if(edge.nextController) {
    edge.nextController.prevController = edge
  }
  body.m_controllerCount++
};
b2Controller.prototype.RemoveBody = function(body) {
  var edge = body.m_controllerList;
  while(edge && edge.controller != this) {
    edge = edge.nextController
  }
  if(edge.prevBody) {
    edge.prevBody.nextBody = edge.nextBody
  }
  if(edge.nextBody) {
    edge.nextBody.prevBody = edge.prevBody
  }
  if(edge.nextController) {
    edge.nextController.prevController = edge.prevController
  }
  if(edge.prevController) {
    edge.prevController.nextController = edge.nextController
  }
  if(m_bodyList == edge) {
    m_bodyList = edge.nextBody
  }
  if(body.m_controllerList == edge) {
    body.m_controllerList = edge.nextController
  }
  body.m_controllerCount--;
  m_bodyCount--
};
b2Controller.prototype.Clear = function() {
  while(m_bodyList) {
    this.RemoveBody(m_bodyList.body)
  }
};
b2Controller.prototype.GetNext = function() {
  return this.m_next
};
b2Controller.prototype.GetWorld = function() {
  return this.m_world
};
b2Controller.prototype.GetBodyList = function() {
  return m_bodyList
};
b2Controller.prototype.m_next = null;
b2Controller.prototype.m_prev = null;
b2Controller.prototype.m_world = null;var b2GravityController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2GravityController.prototype, b2Controller.prototype);
b2GravityController.prototype._super = b2Controller.prototype;
b2GravityController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2GravityController.prototype.__varz = function() {
};
b2GravityController.prototype.Step = function(step) {
  var i = null;
  var body1 = null;
  var p1 = null;
  var mass1 = 0;
  var j = null;
  var body2 = null;
  var p2 = null;
  var dx = 0;
  var dy = 0;
  var r2 = 0;
  var f = null;
  if(this.invSqr) {
    for(i = m_bodyList;i;i = i.nextBody) {
      body1 = i.body;
      p1 = body1.GetWorldCenter();
      mass1 = body1.GetMass();
      for(j = m_bodyList;j != i;j = j.nextBody) {
        body2 = j.body;
        p2 = body2.GetWorldCenter();
        dx = p2.x - p1.x;
        dy = p2.y - p1.y;
        r2 = dx * dx + dy * dy;
        if(r2 < Number.MIN_VALUE) {
          continue
        }
        f = new b2Vec2(dx, dy);
        f.Multiply(this.G / r2 / Math.sqrt(r2) * mass1 * body2.GetMass());
        if(body1.IsAwake()) {
          body1.ApplyForce(f, p1)
        }
        f.Multiply(-1);
        if(body2.IsAwake()) {
          body2.ApplyForce(f, p2)
        }
      }
    }
  }else {
    for(i = m_bodyList;i;i = i.nextBody) {
      body1 = i.body;
      p1 = body1.GetWorldCenter();
      mass1 = body1.GetMass();
      for(j = m_bodyList;j != i;j = j.nextBody) {
        body2 = j.body;
        p2 = body2.GetWorldCenter();
        dx = p2.x - p1.x;
        dy = p2.y - p1.y;
        r2 = dx * dx + dy * dy;
        if(r2 < Number.MIN_VALUE) {
          continue
        }
        f = new b2Vec2(dx, dy);
        f.Multiply(this.G / r2 * mass1 * body2.GetMass());
        if(body1.IsAwake()) {
          body1.ApplyForce(f, p1)
        }
        f.Multiply(-1);
        if(body2.IsAwake()) {
          body2.ApplyForce(f, p2)
        }
      }
    }
  }
};
b2GravityController.prototype.G = 1;
b2GravityController.prototype.invSqr = true;var b2DestructionListener = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DestructionListener.prototype.__constructor = function() {
};
b2DestructionListener.prototype.__varz = function() {
};
b2DestructionListener.prototype.SayGoodbyeJoint = function(joint) {
};
b2DestructionListener.prototype.SayGoodbyeFixture = function(fixture) {
};var b2ContactEdge = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactEdge.prototype.__constructor = function() {
};
b2ContactEdge.prototype.__varz = function() {
};
b2ContactEdge.prototype.other = null;
b2ContactEdge.prototype.contact = null;
b2ContactEdge.prototype.prev = null;
b2ContactEdge.prototype.next = null;var b2EdgeChainDef = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2EdgeChainDef.prototype.__constructor = function() {
  this.vertexCount = 0;
  this.isALoop = true;
  this.vertices = []
};
b2EdgeChainDef.prototype.__varz = function() {
};
b2EdgeChainDef.prototype.vertices = null;
b2EdgeChainDef.prototype.vertexCount = null;
b2EdgeChainDef.prototype.isALoop = null;var b2Vec2 = function(x_, y_) {
  if(arguments.length == 2) {
    this.x = x_;
    this.y = y_
  }
};
b2Vec2.Make = function(x_, y_) {
  return new b2Vec2(x_, y_)
};
b2Vec2.prototype.SetZero = function() {
  this.x = 0;
  this.y = 0
};
b2Vec2.prototype.Set = function(x_, y_) {
  this.x = x_;
  this.y = y_
};
b2Vec2.prototype.SetV = function(v) {
  this.x = v.x;
  this.y = v.y
};
b2Vec2.prototype.GetNegative = function() {
  return new b2Vec2(-this.x, -this.y)
};
b2Vec2.prototype.NegativeSelf = function() {
  this.x = -this.x;
  this.y = -this.y
};
b2Vec2.prototype.Copy = function() {
  return new b2Vec2(this.x, this.y)
};
b2Vec2.prototype.Add = function(v) {
  this.x += v.x;
  this.y += v.y
};
b2Vec2.prototype.Subtract = function(v) {
  this.x -= v.x;
  this.y -= v.y
};
b2Vec2.prototype.Multiply = function(a) {
  this.x *= a;
  this.y *= a
};
b2Vec2.prototype.MulM = function(A) {
  var tX = this.x;
  this.x = A.col1.x * tX + A.col2.x * this.y;
  this.y = A.col1.y * tX + A.col2.y * this.y
};
b2Vec2.prototype.MulTM = function(A) {
  var tX = b2Math.Dot(this, A.col1);
  this.y = b2Math.Dot(this, A.col2);
  this.x = tX
};
b2Vec2.prototype.CrossVF = function(s) {
  var tX = this.x;
  this.x = s * this.y;
  this.y = -s * tX
};
b2Vec2.prototype.CrossFV = function(s) {
  var tX = this.x;
  this.x = -s * this.y;
  this.y = s * tX
};
b2Vec2.prototype.MinV = function(b) {
  this.x = this.x < b.x ? this.x : b.x;
  this.y = this.y < b.y ? this.y : b.y
};
b2Vec2.prototype.MaxV = function(b) {
  this.x = this.x > b.x ? this.x : b.x;
  this.y = this.y > b.y ? this.y : b.y
};
b2Vec2.prototype.Abs = function() {
  if(this.x < 0) {
    this.x = -this.x
  }
  if(this.y < 0) {
    this.y = -this.y
  }
};
b2Vec2.prototype.Length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y)
};
b2Vec2.prototype.LengthSquared = function() {
  return this.x * this.x + this.y * this.y
};
b2Vec2.prototype.Normalize = function() {
  var length = Math.sqrt(this.x * this.x + this.y * this.y);
  if(length < Number.MIN_VALUE) {
    return 0
  }
  var invLength = 1 / length;
  this.x *= invLength;
  this.y *= invLength;
  return length
};
b2Vec2.prototype.IsValid = function() {
  return b2Math.IsValid(this.x) && b2Math.IsValid(this.y)
};
b2Vec2.prototype.x = 0;
b2Vec2.prototype.y = 0;var b2Vec3 = function(x, y, z) {
  if(arguments.length == 3) {
    this.x = x;
    this.y = y;
    this.z = z
  }
};
b2Vec3.prototype.SetZero = function() {
  this.x = this.y = this.z = 0
};
b2Vec3.prototype.Set = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z
};
b2Vec3.prototype.SetV = function(v) {
  this.x = v.x;
  this.y = v.y;
  this.z = v.z
};
b2Vec3.prototype.GetNegative = function() {
  return new b2Vec3(-this.x, -this.y, -this.z)
};
b2Vec3.prototype.NegativeSelf = function() {
  this.x = -this.x;
  this.y = -this.y;
  this.z = -this.z
};
b2Vec3.prototype.Copy = function() {
  return new b2Vec3(this.x, this.y, this.z)
};
b2Vec3.prototype.Add = function(v) {
  this.x += v.x;
  this.y += v.y;
  this.z += v.z
};
b2Vec3.prototype.Subtract = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  this.z -= v.z
};
b2Vec3.prototype.Multiply = function(a) {
  this.x *= a;
  this.y *= a;
  this.z *= a
};
b2Vec3.prototype.x = 0;
b2Vec3.prototype.y = 0;
b2Vec3.prototype.z = 0;var b2DistanceProxy = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DistanceProxy.prototype.__constructor = function() {
};
b2DistanceProxy.prototype.__varz = function() {
};
b2DistanceProxy.prototype.Set = function(shape) {
  switch(shape.GetType()) {
    case b2Shape.e_circleShape:
      var circle = shape;
      this.m_vertices = new Array(1);
      this.m_vertices[0] = circle.m_p;
      this.m_count = 1;
      this.m_radius = circle.m_radius;
      break;
    case b2Shape.e_polygonShape:
      var polygon = shape;
      this.m_vertices = polygon.m_vertices;
      this.m_count = polygon.m_vertexCount;
      this.m_radius = polygon.m_radius;
      break;
    default:
      b2Settings.b2Assert(false)
  }
};
b2DistanceProxy.prototype.GetSupport = function(d) {
  var bestIndex = 0;
  var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
  for(var i = 1;i < this.m_count;++i) {
    var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
    if(value > bestValue) {
      bestIndex = i;
      bestValue = value
    }
  }
  return bestIndex
};
b2DistanceProxy.prototype.GetSupportVertex = function(d) {
  var bestIndex = 0;
  var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
  for(var i = 1;i < this.m_count;++i) {
    var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
    if(value > bestValue) {
      bestIndex = i;
      bestValue = value
    }
  }
  return this.m_vertices[bestIndex]
};
b2DistanceProxy.prototype.GetVertexCount = function() {
  return this.m_count
};
b2DistanceProxy.prototype.GetVertex = function(index) {
  b2Settings.b2Assert(0 <= index && index < this.m_count);
  return this.m_vertices[index]
};
b2DistanceProxy.prototype.m_vertices = null;
b2DistanceProxy.prototype.m_count = 0;
b2DistanceProxy.prototype.m_radius = null;var b2ContactFactory = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactFactory.prototype.__constructor = function() {
};
b2ContactFactory.prototype.__varz = function() {
  this.InitializeRegisters()
};
b2ContactFactory.prototype.AddType = function(createFcn, destroyFcn, type1, type2) {
  this.m_registers[type1][type2].createFcn = createFcn;
  this.m_registers[type1][type2].destroyFcn = destroyFcn;
  this.m_registers[type1][type2].primary = true;
  if(type1 != type2) {
    this.m_registers[type2][type1].createFcn = createFcn;
    this.m_registers[type2][type1].destroyFcn = destroyFcn;
    this.m_registers[type2][type1].primary = false
  }
};
b2ContactFactory.prototype.InitializeRegisters = function() {
  this.m_registers = new Array(b2Shape.e_shapeTypeCount);
  for(var i = 0;i < b2Shape.e_shapeTypeCount;i++) {
    this.m_registers[i] = new Array(b2Shape.e_shapeTypeCount);
    for(var j = 0;j < b2Shape.e_shapeTypeCount;j++) {
      this.m_registers[i][j] = new b2ContactRegister
    }
  }
  this.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
  this.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_circleShape);
  this.AddType(b2PolygonContact.Create, b2PolygonContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_polygonShape);
  this.AddType(b2EdgeAndCircleContact.Create, b2EdgeAndCircleContact.Destroy, b2Shape.e_edgeShape, b2Shape.e_circleShape);
  this.AddType(b2PolyAndEdgeContact.Create, b2PolyAndEdgeContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_edgeShape)
};
b2ContactFactory.prototype.Create = function(fixtureA, fixtureB) {
  var type1 = fixtureA.GetType();
  var type2 = fixtureB.GetType();
  var reg = this.m_registers[type1][type2];
  var c;
  if(reg.pool) {
    c = reg.pool;
    reg.pool = c.m_next;
    reg.poolCount--;
    c.Reset(fixtureA, fixtureB);
    return c
  }
  var createFcn = reg.createFcn;
  if(createFcn != null) {
    if(reg.primary) {
      c = createFcn(this.m_allocator);
      c.Reset(fixtureA, fixtureB);
      return c
    }else {
      c = createFcn(this.m_allocator);
      c.Reset(fixtureB, fixtureA);
      return c
    }
  }else {
    return null
  }
};
b2ContactFactory.prototype.Destroy = function(contact) {
  if(contact.m_manifold.m_pointCount > 0) {
    contact.m_fixtureA.m_body.SetAwake(true);
    contact.m_fixtureB.m_body.SetAwake(true)
  }
  var type1 = contact.m_fixtureA.GetType();
  var type2 = contact.m_fixtureB.GetType();
  var reg = this.m_registers[type1][type2];
  if(true) {
    reg.poolCount++;
    contact.m_next = reg.pool;
    reg.pool = contact
  }
  var destroyFcn = reg.destroyFcn;
  destroyFcn(contact, this.m_allocator)
};
b2ContactFactory.prototype.m_registers = null;
b2ContactFactory.prototype.m_allocator = null;var b2ConstantAccelController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2ConstantAccelController.prototype, b2Controller.prototype);
b2ConstantAccelController.prototype._super = b2Controller.prototype;
b2ConstantAccelController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2ConstantAccelController.prototype.__varz = function() {
  this.A = new b2Vec2(0, 0)
};
b2ConstantAccelController.prototype.Step = function(step) {
  var smallA = new b2Vec2(this.A.x * step.dt, this.A.y * step.dt);
  for(var i = m_bodyList;i;i = i.nextBody) {
    var body = i.body;
    if(!body.IsAwake()) {
      continue
    }
    body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + smallA.x, body.GetLinearVelocity().y + smallA.y))
  }
};
b2ConstantAccelController.prototype.A = new b2Vec2(0, 0);var b2SeparationFunction = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2SeparationFunction.prototype.__constructor = function() {
};
b2SeparationFunction.prototype.__varz = function() {
  this.m_localPoint = new b2Vec2;
  this.m_axis = new b2Vec2
};
b2SeparationFunction.e_points = 1;
b2SeparationFunction.e_faceA = 2;
b2SeparationFunction.e_faceB = 4;
b2SeparationFunction.prototype.Initialize = function(cache, proxyA, transformA, proxyB, transformB) {
  this.m_proxyA = proxyA;
  this.m_proxyB = proxyB;
  var count = cache.count;
  b2Settings.b2Assert(0 < count && count < 3);
  var localPointA;
  var localPointA1;
  var localPointA2;
  var localPointB;
  var localPointB1;
  var localPointB2;
  var pointAX;
  var pointAY;
  var pointBX;
  var pointBY;
  var normalX;
  var normalY;
  var tMat;
  var tVec;
  var s;
  var sgn;
  if(count == 1) {
    this.m_type = b2SeparationFunction.e_points;
    localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
    localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
    tVec = localPointA;
    tMat = transformA.R;
    pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
    pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
    tVec = localPointB;
    tMat = transformB.R;
    pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
    pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
    this.m_axis.x = pointBX - pointAX;
    this.m_axis.y = pointBY - pointAY;
    this.m_axis.Normalize()
  }else {
    if(cache.indexB[0] == cache.indexB[1]) {
      this.m_type = b2SeparationFunction.e_faceA;
      localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
      localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
      localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
      this.m_localPoint.x = 0.5 * (localPointA1.x + localPointA2.x);
      this.m_localPoint.y = 0.5 * (localPointA1.y + localPointA2.y);
      this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1);
      this.m_axis.Normalize();
      tVec = this.m_axis;
      tMat = transformA.R;
      normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tVec = this.m_localPoint;
      tMat = transformA.R;
      pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tVec = localPointB;
      tMat = transformB.R;
      pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      s = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
      if(s < 0) {
        this.m_axis.NegativeSelf()
      }
    }else {
      if(cache.indexA[0] == cache.indexA[0]) {
        this.m_type = b2SeparationFunction.e_faceB;
        localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
        localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
        localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
        this.m_localPoint.x = 0.5 * (localPointB1.x + localPointB2.x);
        this.m_localPoint.y = 0.5 * (localPointB1.y + localPointB2.y);
        this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1);
        this.m_axis.Normalize();
        tVec = this.m_axis;
        tMat = transformB.R;
        normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        tVec = this.m_localPoint;
        tMat = transformB.R;
        pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        tVec = localPointA;
        tMat = transformA.R;
        pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        s = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
        if(s < 0) {
          this.m_axis.NegativeSelf()
        }
      }else {
        localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
        localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
        localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
        localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
        var pA = b2Math.MulX(transformA, localPointA);
        var dA = b2Math.MulMV(transformA.R, b2Math.SubtractVV(localPointA2, localPointA1));
        var pB = b2Math.MulX(transformB, localPointB);
        var dB = b2Math.MulMV(transformB.R, b2Math.SubtractVV(localPointB2, localPointB1));
        var a = dA.x * dA.x + dA.y * dA.y;
        var e = dB.x * dB.x + dB.y * dB.y;
        var r = b2Math.SubtractVV(dB, dA);
        var c = dA.x * r.x + dA.y * r.y;
        var f = dB.x * r.x + dB.y * r.y;
        var b = dA.x * dB.x + dA.y * dB.y;
        var denom = a * e - b * b;
        s = 0;
        if(denom != 0) {
          s = b2Math.Clamp((b * f - c * e) / denom, 0, 1)
        }
        var t = (b * s + f) / e;
        if(t < 0) {
          t = 0;
          s = b2Math.Clamp((b - c) / a, 0, 1)
        }
        localPointA = new b2Vec2;
        localPointA.x = localPointA1.x + s * (localPointA2.x - localPointA1.x);
        localPointA.y = localPointA1.y + s * (localPointA2.y - localPointA1.y);
        localPointB = new b2Vec2;
        localPointB.x = localPointB1.x + s * (localPointB2.x - localPointB1.x);
        localPointB.y = localPointB1.y + s * (localPointB2.y - localPointB1.y);
        if(s == 0 || s == 1) {
          this.m_type = b2SeparationFunction.e_faceB;
          this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1);
          this.m_axis.Normalize();
          this.m_localPoint = localPointB;
          tVec = this.m_axis;
          tMat = transformB.R;
          normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
          normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
          tVec = this.m_localPoint;
          tMat = transformB.R;
          pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          tVec = localPointA;
          tMat = transformA.R;
          pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          sgn = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
          if(s < 0) {
            this.m_axis.NegativeSelf()
          }
        }else {
          this.m_type = b2SeparationFunction.e_faceA;
          this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1);
          this.m_localPoint = localPointA;
          tVec = this.m_axis;
          tMat = transformA.R;
          normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
          normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
          tVec = this.m_localPoint;
          tMat = transformA.R;
          pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          tVec = localPointB;
          tMat = transformB.R;
          pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          sgn = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
          if(s < 0) {
            this.m_axis.NegativeSelf()
          }
        }
      }
    }
  }
};
b2SeparationFunction.prototype.Evaluate = function(transformA, transformB) {
  var axisA;
  var axisB;
  var localPointA;
  var localPointB;
  var pointA;
  var pointB;
  var seperation;
  var normal;
  switch(this.m_type) {
    case b2SeparationFunction.e_points:
      axisA = b2Math.MulTMV(transformA.R, this.m_axis);
      axisB = b2Math.MulTMV(transformB.R, this.m_axis.GetNegative());
      localPointA = this.m_proxyA.GetSupportVertex(axisA);
      localPointB = this.m_proxyB.GetSupportVertex(axisB);
      pointA = b2Math.MulX(transformA, localPointA);
      pointB = b2Math.MulX(transformB, localPointB);
      seperation = (pointB.x - pointA.x) * this.m_axis.x + (pointB.y - pointA.y) * this.m_axis.y;
      return seperation;
    case b2SeparationFunction.e_faceA:
      normal = b2Math.MulMV(transformA.R, this.m_axis);
      pointA = b2Math.MulX(transformA, this.m_localPoint);
      axisB = b2Math.MulTMV(transformB.R, normal.GetNegative());
      localPointB = this.m_proxyB.GetSupportVertex(axisB);
      pointB = b2Math.MulX(transformB, localPointB);
      seperation = (pointB.x - pointA.x) * normal.x + (pointB.y - pointA.y) * normal.y;
      return seperation;
    case b2SeparationFunction.e_faceB:
      normal = b2Math.MulMV(transformB.R, this.m_axis);
      pointB = b2Math.MulX(transformB, this.m_localPoint);
      axisA = b2Math.MulTMV(transformA.R, normal.GetNegative());
      localPointA = this.m_proxyA.GetSupportVertex(axisA);
      pointA = b2Math.MulX(transformA, localPointA);
      seperation = (pointA.x - pointB.x) * normal.x + (pointA.y - pointB.y) * normal.y;
      return seperation;
    default:
      b2Settings.b2Assert(false);
      return 0
  }
};
b2SeparationFunction.prototype.m_proxyA = null;
b2SeparationFunction.prototype.m_proxyB = null;
b2SeparationFunction.prototype.m_type = 0;
b2SeparationFunction.prototype.m_localPoint = new b2Vec2;
b2SeparationFunction.prototype.m_axis = new b2Vec2;var b2DynamicTreePair = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DynamicTreePair.prototype.__constructor = function() {
};
b2DynamicTreePair.prototype.__varz = function() {
};
b2DynamicTreePair.prototype.proxyA = null;
b2DynamicTreePair.prototype.proxyB = null;var b2ContactConstraintPoint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactConstraintPoint.prototype.__constructor = function() {
};
b2ContactConstraintPoint.prototype.__varz = function() {
  this.localPoint = new b2Vec2;
  this.rA = new b2Vec2;
  this.rB = new b2Vec2
};
b2ContactConstraintPoint.prototype.localPoint = new b2Vec2;
b2ContactConstraintPoint.prototype.rA = new b2Vec2;
b2ContactConstraintPoint.prototype.rB = new b2Vec2;
b2ContactConstraintPoint.prototype.normalImpulse = null;
b2ContactConstraintPoint.prototype.tangentImpulse = null;
b2ContactConstraintPoint.prototype.normalMass = null;
b2ContactConstraintPoint.prototype.tangentMass = null;
b2ContactConstraintPoint.prototype.equalizedMass = null;
b2ContactConstraintPoint.prototype.velocityBias = null;var b2ControllerEdge = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ControllerEdge.prototype.__constructor = function() {
};
b2ControllerEdge.prototype.__varz = function() {
};
b2ControllerEdge.prototype.controller = null;
b2ControllerEdge.prototype.body = null;
b2ControllerEdge.prototype.prevBody = null;
b2ControllerEdge.prototype.nextBody = null;
b2ControllerEdge.prototype.prevController = null;
b2ControllerEdge.prototype.nextController = null;var b2DistanceInput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DistanceInput.prototype.__constructor = function() {
};
b2DistanceInput.prototype.__varz = function() {
};
b2DistanceInput.prototype.proxyA = null;
b2DistanceInput.prototype.proxyB = null;
b2DistanceInput.prototype.transformA = null;
b2DistanceInput.prototype.transformB = null;
b2DistanceInput.prototype.useRadii = null;var b2Settings = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Settings.prototype.__constructor = function() {
};
b2Settings.prototype.__varz = function() {
};
b2Settings.b2MixFriction = function(friction1, friction2) {
  return Math.sqrt(friction1 * friction2)
};
b2Settings.b2MixRestitution = function(restitution1, restitution2) {
  return restitution1 > restitution2 ? restitution1 : restitution2
};
b2Settings.b2Assert = function(a) {
  if(!a) {
    throw"Assertion Failed";
  }
};
b2Settings.VERSION = "2.1alpha";
b2Settings.USHRT_MAX = 65535;
b2Settings.b2_pi = Math.PI;
b2Settings.b2_maxManifoldPoints = 2;
b2Settings.b2_aabbExtension = 0.1;
b2Settings.b2_aabbMultiplier = 2;
b2Settings.b2_polygonRadius = 2 * b2Settings.b2_linearSlop;
b2Settings.b2_linearSlop = 0.0050;
b2Settings.b2_angularSlop = 2 / 180 * b2Settings.b2_pi;
b2Settings.b2_toiSlop = 8 * b2Settings.b2_linearSlop;
b2Settings.b2_maxTOIContactsPerIsland = 32;
b2Settings.b2_maxTOIJointsPerIsland = 32;
b2Settings.b2_velocityThreshold = 1;
b2Settings.b2_maxLinearCorrection = 0.2;
b2Settings.b2_maxAngularCorrection = 8 / 180 * b2Settings.b2_pi;
b2Settings.b2_maxTranslation = 2;
b2Settings.b2_maxTranslationSquared = b2Settings.b2_maxTranslation * b2Settings.b2_maxTranslation;
b2Settings.b2_maxRotation = 0.5 * b2Settings.b2_pi;
b2Settings.b2_maxRotationSquared = b2Settings.b2_maxRotation * b2Settings.b2_maxRotation;
b2Settings.b2_contactBaumgarte = 0.2;
b2Settings.b2_timeToSleep = 0.5;
b2Settings.b2_linearSleepTolerance = 0.01;
b2Settings.b2_angularSleepTolerance = 2 / 180 * b2Settings.b2_pi;var b2Proxy = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Proxy.prototype.__constructor = function() {
};
b2Proxy.prototype.__varz = function() {
  this.lowerBounds = new Array(2);
  this.upperBounds = new Array(2);
  this.pairs = new Object
};
b2Proxy.prototype.IsValid = function() {
  return this.overlapCount != b2BroadPhase.b2_invalid
};
b2Proxy.prototype.lowerBounds = new Array(2);
b2Proxy.prototype.upperBounds = new Array(2);
b2Proxy.prototype.overlapCount = 0;
b2Proxy.prototype.timeStamp = 0;
b2Proxy.prototype.pairs = new Object;
b2Proxy.prototype.next = null;
b2Proxy.prototype.userData = null;var b2Point = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Point.prototype.__constructor = function() {
};
b2Point.prototype.__varz = function() {
  this.p = new b2Vec2
};
b2Point.prototype.Support = function(xf, vX, vY) {
  return this.p
};
b2Point.prototype.GetFirstVertex = function(xf) {
  return this.p
};
b2Point.prototype.p = new b2Vec2;var b2WorldManifold = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2WorldManifold.prototype.__constructor = function() {
  this.m_points = new Array(b2Settings.b2_maxManifoldPoints);
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i] = new b2Vec2
  }
};
b2WorldManifold.prototype.__varz = function() {
  this.m_normal = new b2Vec2
};
b2WorldManifold.prototype.Initialize = function(manifold, xfA, radiusA, xfB, radiusB) {
  if(manifold.m_pointCount == 0) {
    return
  }
  var i = 0;
  var tVec;
  var tMat;
  var normalX;
  var normalY;
  var planePointX;
  var planePointY;
  var clipPointX;
  var clipPointY;
  switch(manifold.m_type) {
    case b2Manifold.e_circles:
      tMat = xfA.R;
      tVec = manifold.m_localPoint;
      var pointAX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      var pointAY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = xfB.R;
      tVec = manifold.m_points[0].m_localPoint;
      var pointBX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      var pointBY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      var dX = pointBX - pointAX;
      var dY = pointBY - pointAY;
      var d2 = dX * dX + dY * dY;
      if(d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
        var d = Math.sqrt(d2);
        this.m_normal.x = dX / d;
        this.m_normal.y = dY / d
      }else {
        this.m_normal.x = 1;
        this.m_normal.y = 0
      }
      var cAX = pointAX + radiusA * this.m_normal.x;
      var cAY = pointAY + radiusA * this.m_normal.y;
      var cBX = pointBX - radiusB * this.m_normal.x;
      var cBY = pointBY - radiusB * this.m_normal.y;
      this.m_points[0].x = 0.5 * (cAX + cBX);
      this.m_points[0].y = 0.5 * (cAY + cBY);
      break;
    case b2Manifold.e_faceA:
      tMat = xfA.R;
      tVec = manifold.m_localPlaneNormal;
      normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = xfA.R;
      tVec = manifold.m_localPoint;
      planePointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      planePointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      this.m_normal.x = normalX;
      this.m_normal.y = normalY;
      for(i = 0;i < manifold.m_pointCount;i++) {
        tMat = xfB.R;
        tVec = manifold.m_points[i].m_localPoint;
        clipPointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        clipPointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        this.m_points[i].x = clipPointX + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalX;
        this.m_points[i].y = clipPointY + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalY
      }
      break;
    case b2Manifold.e_faceB:
      tMat = xfB.R;
      tVec = manifold.m_localPlaneNormal;
      normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = xfB.R;
      tVec = manifold.m_localPoint;
      planePointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      planePointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      this.m_normal.x = -normalX;
      this.m_normal.y = -normalY;
      for(i = 0;i < manifold.m_pointCount;i++) {
        tMat = xfA.R;
        tVec = manifold.m_points[i].m_localPoint;
        clipPointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        clipPointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        this.m_points[i].x = clipPointX + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalX;
        this.m_points[i].y = clipPointY + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalY
      }
      break
  }
};
b2WorldManifold.prototype.m_normal = new b2Vec2;
b2WorldManifold.prototype.m_points = null;var b2RayCastOutput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2RayCastOutput.prototype.__constructor = function() {
};
b2RayCastOutput.prototype.__varz = function() {
  this.normal = new b2Vec2
};
b2RayCastOutput.prototype.normal = new b2Vec2;
b2RayCastOutput.prototype.fraction = null;var b2ConstantForceController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2ConstantForceController.prototype, b2Controller.prototype);
b2ConstantForceController.prototype._super = b2Controller.prototype;
b2ConstantForceController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2ConstantForceController.prototype.__varz = function() {
  this.F = new b2Vec2(0, 0)
};
b2ConstantForceController.prototype.Step = function(step) {
  for(var i = m_bodyList;i;i = i.nextBody) {
    var body = i.body;
    if(!body.IsAwake()) {
      continue
    }
    body.ApplyForce(this.F, body.GetWorldCenter())
  }
};
b2ConstantForceController.prototype.F = new b2Vec2(0, 0);var b2MassData = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2MassData.prototype.__constructor = function() {
};
b2MassData.prototype.__varz = function() {
  this.center = new b2Vec2(0, 0)
};
b2MassData.prototype.mass = 0;
b2MassData.prototype.center = new b2Vec2(0, 0);
b2MassData.prototype.I = 0;var b2DynamicTree = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DynamicTree.prototype.__constructor = function() {
  this.m_root = null;
  this.m_freeList = null;
  this.m_path = 0;
  this.m_insertionCount = 0
};
b2DynamicTree.prototype.__varz = function() {
};
b2DynamicTree.prototype.AllocateNode = function() {
  if(this.m_freeList) {
    var node = this.m_freeList;
    this.m_freeList = node.parent;
    node.parent = null;
    node.child1 = null;
    node.child2 = null;
    return node
  }
  return new b2DynamicTreeNode
};
b2DynamicTree.prototype.FreeNode = function(node) {
  node.parent = this.m_freeList;
  this.m_freeList = node
};
b2DynamicTree.prototype.InsertLeaf = function(leaf) {
  ++this.m_insertionCount;
  if(this.m_root == null) {
    this.m_root = leaf;
    this.m_root.parent = null;
    return
  }
  var center = leaf.aabb.GetCenter();
  var sibling = this.m_root;
  if(sibling.IsLeaf() == false) {
    do {
      var child1 = sibling.child1;
      var child2 = sibling.child2;
      var norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
      var norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
      if(norm1 < norm2) {
        sibling = child1
      }else {
        sibling = child2
      }
    }while(sibling.IsLeaf() == false)
  }
  var node1 = sibling.parent;
  var node2 = this.AllocateNode();
  node2.parent = node1;
  node2.userData = null;
  node2.aabb.Combine(leaf.aabb, sibling.aabb);
  if(node1) {
    if(sibling.parent.child1 == sibling) {
      node1.child1 = node2
    }else {
      node1.child2 = node2
    }
    node2.child1 = sibling;
    node2.child2 = leaf;
    sibling.parent = node2;
    leaf.parent = node2;
    do {
      if(node1.aabb.Contains(node2.aabb)) {
        break
      }
      node1.aabb.Combine(node1.child1.aabb, node1.child2.aabb);
      node2 = node1;
      node1 = node1.parent
    }while(node1)
  }else {
    node2.child1 = sibling;
    node2.child2 = leaf;
    sibling.parent = node2;
    leaf.parent = node2;
    this.m_root = node2
  }
};
b2DynamicTree.prototype.RemoveLeaf = function(leaf) {
  if(leaf == this.m_root) {
    this.m_root = null;
    return
  }
  var node2 = leaf.parent;
  var node1 = node2.parent;
  var sibling;
  if(node2.child1 == leaf) {
    sibling = node2.child2
  }else {
    sibling = node2.child1
  }
  if(node1) {
    if(node1.child1 == node2) {
      node1.child1 = sibling
    }else {
      node1.child2 = sibling
    }
    sibling.parent = node1;
    this.FreeNode(node2);
    while(node1) {
      var oldAABB = node1.aabb;
      node1.aabb = b2AABB.Combine(node1.child1.aabb, node1.child2.aabb);
      if(oldAABB.Contains(node1.aabb)) {
        break
      }
      node1 = node1.parent
    }
  }else {
    this.m_root = sibling;
    sibling.parent = null;
    this.FreeNode(node2)
  }
};
b2DynamicTree.prototype.CreateProxy = function(aabb, userData) {
  var node = this.AllocateNode();
  var extendX = b2Settings.b2_aabbExtension;
  var extendY = b2Settings.b2_aabbExtension;
  node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
  node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
  node.aabb.upperBound.x = aabb.upperBound.x + extendX;
  node.aabb.upperBound.y = aabb.upperBound.y + extendY;
  node.userData = userData;
  this.InsertLeaf(node);
  return node
};
b2DynamicTree.prototype.DestroyProxy = function(proxy) {
  this.RemoveLeaf(proxy);
  this.FreeNode(proxy)
};
b2DynamicTree.prototype.MoveProxy = function(proxy, aabb, displacement) {
  b2Settings.b2Assert(proxy.IsLeaf());
  if(proxy.aabb.Contains(aabb)) {
    return false
  }
  this.RemoveLeaf(proxy);
  var extendX = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.x > 0 ? displacement.x : -displacement.x);
  var extendY = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.y > 0 ? displacement.y : -displacement.y);
  proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
  proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
  proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
  proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
  this.InsertLeaf(proxy);
  return true
};
b2DynamicTree.prototype.Rebalance = function(iterations) {
  if(this.m_root == null) {
    return
  }
  for(var i = 0;i < iterations;i++) {
    var node = this.m_root;
    var bit = 0;
    while(node.IsLeaf() == false) {
      node = this.m_path >> bit & 1 ? node.child2 : node.child1;
      bit = bit + 1 & 31
    }
    ++this.m_path;
    this.RemoveLeaf(node);
    this.InsertLeaf(node)
  }
};
b2DynamicTree.prototype.GetFatAABB = function(proxy) {
  return proxy.aabb
};
b2DynamicTree.prototype.GetUserData = function(proxy) {
  return proxy.userData
};
b2DynamicTree.prototype.Query = function(callback, aabb) {
  if(this.m_root == null) {
    return
  }
  var stack = new Array;
  var count = 0;
  stack[count++] = this.m_root;
  while(count > 0) {
    var node = stack[--count];
    if(node.aabb.TestOverlap(aabb)) {
      if(node.IsLeaf()) {
        var proceed = callback(node);
        if(!proceed) {
          return
        }
      }else {
        stack[count++] = node.child1;
        stack[count++] = node.child2
      }
    }
  }
};
b2DynamicTree.prototype.RayCast = function(callback, input) {
  if(this.m_root == null) {
    return
  }
  var p1 = input.p1;
  var p2 = input.p2;
  var r = b2Math.SubtractVV(p1, p2);
  r.Normalize();
  var v = b2Math.CrossFV(1, r);
  var abs_v = b2Math.AbsV(v);
  var maxFraction = input.maxFraction;
  var segmentAABB = new b2AABB;
  var tX;
  var tY;
  tX = p1.x + maxFraction * (p2.x - p1.x);
  tY = p1.y + maxFraction * (p2.y - p1.y);
  segmentAABB.lowerBound.x = Math.min(p1.x, tX);
  segmentAABB.lowerBound.y = Math.min(p1.y, tY);
  segmentAABB.upperBound.x = Math.max(p1.x, tX);
  segmentAABB.upperBound.y = Math.max(p1.y, tY);
  var stack = new Array;
  var count = 0;
  stack[count++] = this.m_root;
  while(count > 0) {
    var node = stack[--count];
    if(node.aabb.TestOverlap(segmentAABB) == false) {
      continue
    }
    var c = node.aabb.GetCenter();
    var h = node.aabb.GetExtents();
    var separation = Math.abs(v.x * (p1.x - c.x) + v.y * (p1.y - c.y)) - abs_v.x * h.x - abs_v.y * h.y;
    if(separation > 0) {
      continue
    }
    if(node.IsLeaf()) {
      var subInput = new b2RayCastInput;
      subInput.p1 = input.p1;
      subInput.p2 = input.p2;
      subInput.maxFraction = input.maxFraction;
      maxFraction = callback(subInput, node);
      if(maxFraction == 0) {
        return
      }
      tX = p1.x + maxFraction * (p2.x - p1.x);
      tY = p1.y + maxFraction * (p2.y - p1.y);
      segmentAABB.lowerBound.x = Math.min(p1.x, tX);
      segmentAABB.lowerBound.y = Math.min(p1.y, tY);
      segmentAABB.upperBound.x = Math.max(p1.x, tX);
      segmentAABB.upperBound.y = Math.max(p1.y, tY)
    }else {
      stack[count++] = node.child1;
      stack[count++] = node.child2
    }
  }
};
b2DynamicTree.prototype.m_root = null;
b2DynamicTree.prototype.m_freeList = null;
b2DynamicTree.prototype.m_path = 0;
b2DynamicTree.prototype.m_insertionCount = 0;var b2JointEdge = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2JointEdge.prototype.__constructor = function() {
};
b2JointEdge.prototype.__varz = function() {
};
b2JointEdge.prototype.other = null;
b2JointEdge.prototype.joint = null;
b2JointEdge.prototype.prev = null;
b2JointEdge.prototype.next = null;var b2RayCastInput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2RayCastInput.prototype.__constructor = function() {
};
b2RayCastInput.prototype.__varz = function() {
  this.p1 = new b2Vec2;
  this.p2 = new b2Vec2
};
b2RayCastInput.prototype.p1 = new b2Vec2;
b2RayCastInput.prototype.p2 = new b2Vec2;
b2RayCastInput.prototype.maxFraction = null;var Features = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
Features.prototype.__constructor = function() {
};
Features.prototype.__varz = function() {
};
Features.prototype.__defineGetter__("referenceEdge", function() {
  return this._referenceEdge
});
Features.prototype.__defineSetter__("referenceEdge", function(value) {
  this._referenceEdge = value;
  this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
});
Features.prototype.__defineGetter__("incidentEdge", function() {
  return this._incidentEdge
});
Features.prototype.__defineSetter__("incidentEdge", function(value) {
  this._incidentEdge = value;
  this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
});
Features.prototype.__defineGetter__("incidentVertex", function() {
  return this._incidentVertex
});
Features.prototype.__defineSetter__("incidentVertex", function(value) {
  this._incidentVertex = value;
  this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
});
Features.prototype.__defineGetter__("flip", function() {
  return this._flip
});
Features.prototype.__defineSetter__("flip", function(value) {
  this._flip = value;
  this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
});
Features.prototype._referenceEdge = 0;
Features.prototype._incidentEdge = 0;
Features.prototype._incidentVertex = 0;
Features.prototype._flip = 0;
Features.prototype._m_id = null;var b2FilterData = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2FilterData.prototype.__constructor = function() {
};
b2FilterData.prototype.__varz = function() {
  this.categoryBits = 1;
  this.maskBits = 65535
};
b2FilterData.prototype.Copy = function() {
  var copy = new b2FilterData;
  copy.categoryBits = this.categoryBits;
  copy.maskBits = this.maskBits;
  copy.groupIndex = this.groupIndex;
  return copy
};
b2FilterData.prototype.categoryBits = 1;
b2FilterData.prototype.maskBits = 65535;
b2FilterData.prototype.groupIndex = 0;var b2AABB = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2AABB.prototype.__constructor = function() {
};
b2AABB.prototype.__varz = function() {
  this.lowerBound = new b2Vec2;
  this.upperBound = new b2Vec2
};
b2AABB.Combine = function(aabb1, aabb2) {
  var aabb = new b2AABB;
  aabb.Combine(aabb1, aabb2);
  return aabb
};
b2AABB.prototype.IsValid = function() {
  var dX = this.upperBound.x - this.lowerBound.x;
  var dY = this.upperBound.y - this.lowerBound.y;
  var valid = dX >= 0 && dY >= 0;
  valid = valid && this.lowerBound.IsValid() && this.upperBound.IsValid();
  return valid
};
b2AABB.prototype.GetCenter = function() {
  return new b2Vec2((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
};
b2AABB.prototype.GetExtents = function() {
  return new b2Vec2((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
};
b2AABB.prototype.Contains = function(aabb) {
  var result = true && this.lowerBound.x <= aabb.lowerBound.x && this.lowerBound.y <= aabb.lowerBound.y && aabb.upperBound.x <= this.upperBound.x && aabb.upperBound.y <= this.upperBound.y;
  return result
};
b2AABB.prototype.RayCast = function(output, input) {
  var tmin = -Number.MAX_VALUE;
  var tmax = Number.MAX_VALUE;
  var pX = input.p1.x;
  var pY = input.p1.y;
  var dX = input.p2.x - input.p1.x;
  var dY = input.p2.y - input.p1.y;
  var absDX = Math.abs(dX);
  var absDY = Math.abs(dY);
  var normal = output.normal;
  var inv_d;
  var t1;
  var t2;
  var t3;
  var s;
  if(absDX < Number.MIN_VALUE) {
    if(pX < this.lowerBound.x || this.upperBound.x < pX) {
      return false
    }
  }else {
    inv_d = 1 / dX;
    t1 = (this.lowerBound.x - pX) * inv_d;
    t2 = (this.upperBound.x - pX) * inv_d;
    s = -1;
    if(t1 > t2) {
      t3 = t1;
      t1 = t2;
      t2 = t3;
      s = 1
    }
    if(t1 > tmin) {
      normal.x = s;
      normal.y = 0;
      tmin = t1
    }
    tmax = Math.min(tmax, t2);
    if(tmin > tmax) {
      return false
    }
  }
  if(absDY < Number.MIN_VALUE) {
    if(pY < this.lowerBound.y || this.upperBound.y < pY) {
      return false
    }
  }else {
    inv_d = 1 / dY;
    t1 = (this.lowerBound.y - pY) * inv_d;
    t2 = (this.upperBound.y - pY) * inv_d;
    s = -1;
    if(t1 > t2) {
      t3 = t1;
      t1 = t2;
      t2 = t3;
      s = 1
    }
    if(t1 > tmin) {
      normal.y = s;
      normal.x = 0;
      tmin = t1
    }
    tmax = Math.min(tmax, t2);
    if(tmin > tmax) {
      return false
    }
  }
  output.fraction = tmin;
  return true
};
b2AABB.prototype.TestOverlap = function(other) {
  var d1X = other.lowerBound.x - this.upperBound.x;
  var d1Y = other.lowerBound.y - this.upperBound.y;
  var d2X = this.lowerBound.x - other.upperBound.x;
  var d2Y = this.lowerBound.y - other.upperBound.y;
  if(d1X > 0 || d1Y > 0) {
    return false
  }
  if(d2X > 0 || d2Y > 0) {
    return false
  }
  return true
};
b2AABB.prototype.Combine = function(aabb1, aabb2) {
  this.lowerBound.x = Math.min(aabb1.lowerBound.x, aabb2.lowerBound.x);
  this.lowerBound.y = Math.min(aabb1.lowerBound.y, aabb2.lowerBound.y);
  this.upperBound.x = Math.max(aabb1.upperBound.x, aabb2.upperBound.x);
  this.upperBound.y = Math.max(aabb1.upperBound.y, aabb2.upperBound.y)
};
b2AABB.prototype.lowerBound = new b2Vec2;
b2AABB.prototype.upperBound = new b2Vec2;var b2Jacobian = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Jacobian.prototype.__constructor = function() {
};
b2Jacobian.prototype.__varz = function() {
  this.linearA = new b2Vec2;
  this.linearB = new b2Vec2
};
b2Jacobian.prototype.SetZero = function() {
  this.linearA.SetZero();
  this.angularA = 0;
  this.linearB.SetZero();
  this.angularB = 0
};
b2Jacobian.prototype.Set = function(x1, a1, x2, a2) {
  this.linearA.SetV(x1);
  this.angularA = a1;
  this.linearB.SetV(x2);
  this.angularB = a2
};
b2Jacobian.prototype.Compute = function(x1, a1, x2, a2) {
  return this.linearA.x * x1.x + this.linearA.y * x1.y + this.angularA * a1 + (this.linearB.x * x2.x + this.linearB.y * x2.y) + this.angularB * a2
};
b2Jacobian.prototype.linearA = new b2Vec2;
b2Jacobian.prototype.angularA = null;
b2Jacobian.prototype.linearB = new b2Vec2;
b2Jacobian.prototype.angularB = null;var b2Bound = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Bound.prototype.__constructor = function() {
};
b2Bound.prototype.__varz = function() {
};
b2Bound.prototype.IsLower = function() {
  return(this.value & 1) == 0
};
b2Bound.prototype.IsUpper = function() {
  return(this.value & 1) == 1
};
b2Bound.prototype.Swap = function(b) {
  var tempValue = this.value;
  var tempProxy = this.proxy;
  var tempStabbingCount = this.stabbingCount;
  this.value = b.value;
  this.proxy = b.proxy;
  this.stabbingCount = b.stabbingCount;
  b.value = tempValue;
  b.proxy = tempProxy;
  b.stabbingCount = tempStabbingCount
};
b2Bound.prototype.value = 0;
b2Bound.prototype.proxy = null;
b2Bound.prototype.stabbingCount = 0;var b2SimplexVertex = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2SimplexVertex.prototype.__constructor = function() {
};
b2SimplexVertex.prototype.__varz = function() {
};
b2SimplexVertex.prototype.Set = function(other) {
  this.wA.SetV(other.wA);
  this.wB.SetV(other.wB);
  this.w.SetV(other.w);
  this.a = other.a;
  this.indexA = other.indexA;
  this.indexB = other.indexB
};
b2SimplexVertex.prototype.wA = null;
b2SimplexVertex.prototype.wB = null;
b2SimplexVertex.prototype.w = null;
b2SimplexVertex.prototype.a = null;
b2SimplexVertex.prototype.indexA = 0;
b2SimplexVertex.prototype.indexB = 0;var b2Mat22 = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Mat22.prototype.__constructor = function() {
  this.col1.x = this.col2.y = 1
};
b2Mat22.prototype.__varz = function() {
  this.col1 = new b2Vec2;
  this.col2 = new b2Vec2
};
b2Mat22.FromAngle = function(angle) {
  var mat = new b2Mat22;
  mat.Set(angle);
  return mat
};
b2Mat22.FromVV = function(c1, c2) {
  var mat = new b2Mat22;
  mat.SetVV(c1, c2);
  return mat
};
b2Mat22.prototype.Set = function(angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  this.col1.x = c;
  this.col2.x = -s;
  this.col1.y = s;
  this.col2.y = c
};
b2Mat22.prototype.SetVV = function(c1, c2) {
  this.col1.SetV(c1);
  this.col2.SetV(c2)
};
b2Mat22.prototype.Copy = function() {
  var mat = new b2Mat22;
  mat.SetM(this);
  return mat
};
b2Mat22.prototype.SetM = function(m) {
  this.col1.SetV(m.col1);
  this.col2.SetV(m.col2)
};
b2Mat22.prototype.AddM = function(m) {
  this.col1.x += m.col1.x;
  this.col1.y += m.col1.y;
  this.col2.x += m.col2.x;
  this.col2.y += m.col2.y
};
b2Mat22.prototype.SetIdentity = function() {
  this.col1.x = 1;
  this.col2.x = 0;
  this.col1.y = 0;
  this.col2.y = 1
};
b2Mat22.prototype.SetZero = function() {
  this.col1.x = 0;
  this.col2.x = 0;
  this.col1.y = 0;
  this.col2.y = 0
};
b2Mat22.prototype.GetAngle = function() {
  return Math.atan2(this.col1.y, this.col1.x)
};
b2Mat22.prototype.GetInverse = function(out) {
  var a = this.col1.x;
  var b = this.col2.x;
  var c = this.col1.y;
  var d = this.col2.y;
  var det = a * d - b * c;
  if(det != 0) {
    det = 1 / det
  }
  out.col1.x = det * d;
  out.col2.x = -det * b;
  out.col1.y = -det * c;
  out.col2.y = det * a;
  return out
};
b2Mat22.prototype.Solve = function(out, bX, bY) {
  var a11 = this.col1.x;
  var a12 = this.col2.x;
  var a21 = this.col1.y;
  var a22 = this.col2.y;
  var det = a11 * a22 - a12 * a21;
  if(det != 0) {
    det = 1 / det
  }
  out.x = det * (a22 * bX - a12 * bY);
  out.y = det * (a11 * bY - a21 * bX);
  return out
};
b2Mat22.prototype.Abs = function() {
  this.col1.Abs();
  this.col2.Abs()
};
b2Mat22.prototype.col1 = new b2Vec2;
b2Mat22.prototype.col2 = new b2Vec2;var b2SimplexCache = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2SimplexCache.prototype.__constructor = function() {
};
b2SimplexCache.prototype.__varz = function() {
  this.indexA = new Array(3);
  this.indexB = new Array(3)
};
b2SimplexCache.prototype.metric = null;
b2SimplexCache.prototype.count = 0;
b2SimplexCache.prototype.indexA = new Array(3);
b2SimplexCache.prototype.indexB = new Array(3);var b2Shape = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Shape.prototype.__constructor = function() {
  this.m_type = b2Shape.e_unknownShape;
  this.m_radius = b2Settings.b2_linearSlop
};
b2Shape.prototype.__varz = function() {
};
b2Shape.TestOverlap = function(shape1, transform1, shape2, transform2) {
  var input = new b2DistanceInput;
  input.proxyA = new b2DistanceProxy;
  input.proxyA.Set(shape1);
  input.proxyB = new b2DistanceProxy;
  input.proxyB.Set(shape2);
  input.transformA = transform1;
  input.transformB = transform2;
  input.useRadii = true;
  var simplexCache = new b2SimplexCache;
  simplexCache.count = 0;
  var output = new b2DistanceOutput;
  b2Distance.Distance(output, simplexCache, input);
  return output.distance < 10 * Number.MIN_VALUE
};
b2Shape.e_hitCollide = 1;
b2Shape.e_missCollide = 0;
b2Shape.e_startsInsideCollide = -1;
b2Shape.e_unknownShape = -1;
b2Shape.e_circleShape = 0;
b2Shape.e_polygonShape = 1;
b2Shape.e_edgeShape = 2;
b2Shape.e_shapeTypeCount = 3;
b2Shape.prototype.Copy = function() {
  return null
};
b2Shape.prototype.Set = function(other) {
  this.m_radius = other.m_radius
};
b2Shape.prototype.GetType = function() {
  return this.m_type
};
b2Shape.prototype.TestPoint = function(xf, p) {
  return false
};
b2Shape.prototype.RayCast = function(output, input, transform) {
  return false
};
b2Shape.prototype.ComputeAABB = function(aabb, xf) {
};
b2Shape.prototype.ComputeMass = function(massData, density) {
};
b2Shape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
  return 0
};
b2Shape.prototype.m_type = 0;
b2Shape.prototype.m_radius = null;var b2Segment = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Segment.prototype.__constructor = function() {
};
b2Segment.prototype.__varz = function() {
  this.p1 = new b2Vec2;
  this.p2 = new b2Vec2
};
b2Segment.prototype.TestSegment = function(lambda, normal, segment, maxLambda) {
  var s = segment.p1;
  var rX = segment.p2.x - s.x;
  var rY = segment.p2.y - s.y;
  var dX = this.p2.x - this.p1.x;
  var dY = this.p2.y - this.p1.y;
  var nX = dY;
  var nY = -dX;
  var k_slop = 100 * Number.MIN_VALUE;
  var denom = -(rX * nX + rY * nY);
  if(denom > k_slop) {
    var bX = s.x - this.p1.x;
    var bY = s.y - this.p1.y;
    var a = bX * nX + bY * nY;
    if(0 <= a && a <= maxLambda * denom) {
      var mu2 = -rX * bY + rY * bX;
      if(-k_slop * denom <= mu2 && mu2 <= denom * (1 + k_slop)) {
        a /= denom;
        var nLen = Math.sqrt(nX * nX + nY * nY);
        nX /= nLen;
        nY /= nLen;
        lambda[0] = a;
        normal.Set(nX, nY);
        return true
      }
    }
  }
  return false
};
b2Segment.prototype.Extend = function(aabb) {
  this.ExtendForward(aabb);
  this.ExtendBackward(aabb)
};
b2Segment.prototype.ExtendForward = function(aabb) {
  var dX = this.p2.x - this.p1.x;
  var dY = this.p2.y - this.p1.y;
  var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p1.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p1.x) / dX : Number.POSITIVE_INFINITY, dY > 0 ? (aabb.upperBound.y - this.p1.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p1.y) / dY : Number.POSITIVE_INFINITY);
  this.p2.x = this.p1.x + dX * lambda;
  this.p2.y = this.p1.y + dY * lambda
};
b2Segment.prototype.ExtendBackward = function(aabb) {
  var dX = -this.p2.x + this.p1.x;
  var dY = -this.p2.y + this.p1.y;
  var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p2.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p2.x) / dX : Number.POSITIVE_INFINITY, dY > 0 ? (aabb.upperBound.y - this.p2.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p2.y) / dY : Number.POSITIVE_INFINITY);
  this.p1.x = this.p2.x + dX * lambda;
  this.p1.y = this.p2.y + dY * lambda
};
b2Segment.prototype.p1 = new b2Vec2;
b2Segment.prototype.p2 = new b2Vec2;var b2ContactRegister = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactRegister.prototype.__constructor = function() {
};
b2ContactRegister.prototype.__varz = function() {
};
b2ContactRegister.prototype.createFcn = null;
b2ContactRegister.prototype.destroyFcn = null;
b2ContactRegister.prototype.primary = null;
b2ContactRegister.prototype.pool = null;
b2ContactRegister.prototype.poolCount = 0;var b2DebugDraw = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DebugDraw.prototype.__constructor = function() {
  this.m_drawFlags = 0
};
b2DebugDraw.prototype.__varz = function() {
};
b2DebugDraw.e_shapeBit = 1;
b2DebugDraw.e_jointBit = 2;
b2DebugDraw.e_aabbBit = 4;
b2DebugDraw.e_pairBit = 8;
b2DebugDraw.e_centerOfMassBit = 16;
b2DebugDraw.e_controllerBit = 32;
b2DebugDraw.prototype.SetFlags = function(flags) {
  this.m_drawFlags = flags
};
b2DebugDraw.prototype.GetFlags = function() {
  return this.m_drawFlags
};
b2DebugDraw.prototype.AppendFlags = function(flags) {
  this.m_drawFlags |= flags
};
b2DebugDraw.prototype.ClearFlags = function(flags) {
  this.m_drawFlags &= ~flags
};
b2DebugDraw.prototype.SetSprite = function(sprite) {
  this.m_sprite = sprite
};
b2DebugDraw.prototype.GetSprite = function() {
  return this.m_sprite
};
b2DebugDraw.prototype.SetDrawScale = function(drawScale) {
  this.m_drawScale = drawScale
};
b2DebugDraw.prototype.GetDrawScale = function() {
  return this.m_drawScale
};
b2DebugDraw.prototype.SetLineThickness = function(lineThickness) {
  this.m_lineThickness = lineThickness
};
b2DebugDraw.prototype.GetLineThickness = function() {
  return this.m_lineThickness
};
b2DebugDraw.prototype.SetAlpha = function(alpha) {
  this.m_alpha = alpha
};
b2DebugDraw.prototype.GetAlpha = function() {
  return this.m_alpha
};
b2DebugDraw.prototype.SetFillAlpha = function(alpha) {
  this.m_fillAlpha = alpha
};
b2DebugDraw.prototype.GetFillAlpha = function() {
  return this.m_fillAlpha
};
b2DebugDraw.prototype.SetXFormScale = function(xformScale) {
  this.m_xformScale = xformScale
};
b2DebugDraw.prototype.GetXFormScale = function() {
  return this.m_xformScale
};
b2DebugDraw.prototype.Clear = function() {
  this.m_sprite.clearRect(0, 0, this.m_sprite.canvas.width, this.m_sprite.canvas.height)
};
b2DebugDraw.prototype.Y = function(y) {
  return this.m_sprite.canvas.height - y
};
b2DebugDraw.prototype.ToWorldPoint = function(localPoint) {
  return new b2Vec2(localPoint.x / this.m_drawScale, this.Y(localPoint.y) / this.m_drawScale)
};
b2DebugDraw.prototype.ColorStyle = function(color, alpha) {
  return"rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + alpha + ")"
};
b2DebugDraw.prototype.DrawPolygon = function(vertices, vertexCount, color) {
  this.m_sprite.graphics.lineStyle(this.m_lineThickness, color.color, this.m_alpha);
  this.m_sprite.graphics.moveTo(vertices[0].x * this.m_drawScale, vertices[0].y * this.m_drawScale);
  for(var i = 1;i < vertexCount;i++) {
    this.m_sprite.graphics.lineTo(vertices[i].x * this.m_drawScale, vertices[i].y * this.m_drawScale)
  }
  this.m_sprite.graphics.lineTo(vertices[0].x * this.m_drawScale, vertices[0].y * this.m_drawScale)
};
b2DebugDraw.prototype.DrawSolidPolygon = function(vertices, vertexCount, color) {
  this.m_sprite.strokeSyle = this.ColorStyle(color, this.m_alpha);
  this.m_sprite.lineWidth = this.m_lineThickness;
  this.m_sprite.fillStyle = this.ColorStyle(color, this.m_fillAlpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(vertices[0].x * this.m_drawScale, this.Y(vertices[0].y * this.m_drawScale));
  for(var i = 1;i < vertexCount;i++) {
    this.m_sprite.lineTo(vertices[i].x * this.m_drawScale, this.Y(vertices[i].y * this.m_drawScale))
  }
  this.m_sprite.lineTo(vertices[0].x * this.m_drawScale, this.Y(vertices[0].y * this.m_drawScale));
  this.m_sprite.fill();
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};
b2DebugDraw.prototype.DrawCircle = function(center, radius, color) {
  this.m_sprite.graphics.lineStyle(this.m_lineThickness, color.color, this.m_alpha);
  this.m_sprite.graphics.drawCircle(center.x * this.m_drawScale, center.y * this.m_drawScale, radius * this.m_drawScale)
};
b2DebugDraw.prototype.DrawSolidCircle = function(center, radius, axis, color) {
  this.m_sprite.strokeSyle = this.ColorStyle(color, this.m_alpha);
  this.m_sprite.lineWidth = this.m_lineThickness;
  this.m_sprite.fillStyle = this.ColorStyle(color, this.m_fillAlpha);
  this.m_sprite.beginPath();
  this.m_sprite.arc(center.x * this.m_drawScale, this.Y(center.y * this.m_drawScale), radius * this.m_drawScale, 0, Math.PI * 2, true);
  this.m_sprite.fill();
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};
b2DebugDraw.prototype.DrawSegment = function(p1, p2, color) {
  this.m_sprite.lineWidth = this.m_lineThickness;
  this.m_sprite.strokeSyle = this.ColorStyle(color, this.m_alpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(p1.x * this.m_drawScale, this.Y(p1.y * this.m_drawScale));
  this.m_sprite.lineTo(p2.x * this.m_drawScale, this.Y(p2.y * this.m_drawScale));
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};
b2DebugDraw.prototype.DrawTransform = function(xf) {
  this.m_sprite.lineWidth = this.m_lineThickness;
  this.m_sprite.strokeSyle = this.ColorStyle(new b2Color(255, 0, 0), this.m_alpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(xf.position.x * this.m_drawScale, this.Y(xf.position.y * this.m_drawScale));
  this.m_sprite.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * this.m_drawScale, this.Y((xf.position.y + this.m_xformScale * xf.R.col1.y) * this.m_drawScale));
  this.m_sprite.stroke();
  this.m_sprite.closePath();
  this.m_sprite.strokeSyle = this.ColorStyle(new b2Color(0, 255, 0), this.m_alpha);
  this.m_sprite.beginPath();
  this.m_sprite.moveTo(xf.position.x * this.m_drawScale, this.Y(xf.position.y * this.m_drawScale));
  this.m_sprite.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * this.m_drawScale, this.Y((xf.position.y + this.m_xformScale * xf.R.col2.y) * this.m_drawScale));
  this.m_sprite.stroke();
  this.m_sprite.closePath()
};
b2DebugDraw.prototype.m_drawFlags = 0;
b2DebugDraw.prototype.m_sprite = null;
b2DebugDraw.prototype.m_drawScale = 1;
b2DebugDraw.prototype.m_lineThickness = 1;
b2DebugDraw.prototype.m_alpha = 1;
b2DebugDraw.prototype.m_fillAlpha = 1;
b2DebugDraw.prototype.m_xformScale = 1;var b2Sweep = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Sweep.prototype.__constructor = function() {
};
b2Sweep.prototype.__varz = function() {
  this.localCenter = new b2Vec2;
  this.c0 = new b2Vec2;
  this.c = new b2Vec2
};
b2Sweep.prototype.Set = function(other) {
  this.localCenter.SetV(other.localCenter);
  this.c0.SetV(other.c0);
  this.c.SetV(other.c);
  this.a0 = other.a0;
  this.a = other.a;
  this.t0 = other.t0
};
b2Sweep.prototype.Copy = function() {
  var copy = new b2Sweep;
  copy.localCenter.SetV(this.localCenter);
  copy.c0.SetV(this.c0);
  copy.c.SetV(this.c);
  copy.a0 = this.a0;
  copy.a = this.a;
  copy.t0 = this.t0;
  return copy
};
b2Sweep.prototype.GetTransform = function(xf, alpha) {
  xf.position.x = (1 - alpha) * this.c0.x + alpha * this.c.x;
  xf.position.y = (1 - alpha) * this.c0.y + alpha * this.c.y;
  var angle = (1 - alpha) * this.a0 + alpha * this.a;
  xf.R.Set(angle);
  var tMat = xf.R;
  xf.position.x -= tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y;
  xf.position.y -= tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y
};
b2Sweep.prototype.Advance = function(t) {
  if(this.t0 < t && 1 - this.t0 > Number.MIN_VALUE) {
    var alpha = (t - this.t0) / (1 - this.t0);
    this.c0.x = (1 - alpha) * this.c0.x + alpha * this.c.x;
    this.c0.y = (1 - alpha) * this.c0.y + alpha * this.c.y;
    this.a0 = (1 - alpha) * this.a0 + alpha * this.a;
    this.t0 = t
  }
};
b2Sweep.prototype.localCenter = new b2Vec2;
b2Sweep.prototype.c0 = new b2Vec2;
b2Sweep.prototype.c = new b2Vec2;
b2Sweep.prototype.a0 = null;
b2Sweep.prototype.a = null;
b2Sweep.prototype.t0 = null;var b2DistanceOutput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DistanceOutput.prototype.__constructor = function() {
};
b2DistanceOutput.prototype.__varz = function() {
  this.pointA = new b2Vec2;
  this.pointB = new b2Vec2
};
b2DistanceOutput.prototype.pointA = new b2Vec2;
b2DistanceOutput.prototype.pointB = new b2Vec2;
b2DistanceOutput.prototype.distance = null;
b2DistanceOutput.prototype.iterations = 0;var b2Mat33 = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Mat33.prototype.__constructor = function(c1, c2, c3) {
  if(!c1 && !c2 && !c3) {
    this.col1.SetZero();
    this.col2.SetZero();
    this.col3.SetZero()
  }else {
    this.col1.SetV(c1);
    this.col2.SetV(c2);
    this.col3.SetV(c3)
  }
};
b2Mat33.prototype.__varz = function() {
  this.col1 = new b2Vec3;
  this.col2 = new b2Vec3;
  this.col3 = new b2Vec3
};
b2Mat33.prototype.SetVVV = function(c1, c2, c3) {
  this.col1.SetV(c1);
  this.col2.SetV(c2);
  this.col3.SetV(c3)
};
b2Mat33.prototype.Copy = function() {
  return new b2Mat33(this.col1, this.col2, this.col3)
};
b2Mat33.prototype.SetM = function(m) {
  this.col1.SetV(m.col1);
  this.col2.SetV(m.col2);
  this.col3.SetV(m.col3)
};
b2Mat33.prototype.AddM = function(m) {
  this.col1.x += m.col1.x;
  this.col1.y += m.col1.y;
  this.col1.z += m.col1.z;
  this.col2.x += m.col2.x;
  this.col2.y += m.col2.y;
  this.col2.z += m.col2.z;
  this.col3.x += m.col3.x;
  this.col3.y += m.col3.y;
  this.col3.z += m.col3.z
};
b2Mat33.prototype.SetIdentity = function() {
  this.col1.x = 1;
  this.col2.x = 0;
  this.col3.x = 0;
  this.col1.y = 0;
  this.col2.y = 1;
  this.col3.y = 0;
  this.col1.z = 0;
  this.col2.z = 0;
  this.col3.z = 1
};
b2Mat33.prototype.SetZero = function() {
  this.col1.x = 0;
  this.col2.x = 0;
  this.col3.x = 0;
  this.col1.y = 0;
  this.col2.y = 0;
  this.col3.y = 0;
  this.col1.z = 0;
  this.col2.z = 0;
  this.col3.z = 0
};
b2Mat33.prototype.Solve22 = function(out, bX, bY) {
  var a11 = this.col1.x;
  var a12 = this.col2.x;
  var a21 = this.col1.y;
  var a22 = this.col2.y;
  var det = a11 * a22 - a12 * a21;
  if(det != 0) {
    det = 1 / det
  }
  out.x = det * (a22 * bX - a12 * bY);
  out.y = det * (a11 * bY - a21 * bX);
  return out
};
b2Mat33.prototype.Solve33 = function(out, bX, bY, bZ) {
  var a11 = this.col1.x;
  var a21 = this.col1.y;
  var a31 = this.col1.z;
  var a12 = this.col2.x;
  var a22 = this.col2.y;
  var a32 = this.col2.z;
  var a13 = this.col3.x;
  var a23 = this.col3.y;
  var a33 = this.col3.z;
  var det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
  if(det != 0) {
    det = 1 / det
  }
  out.x = det * (bX * (a22 * a33 - a32 * a23) + bY * (a32 * a13 - a12 * a33) + bZ * (a12 * a23 - a22 * a13));
  out.y = det * (a11 * (bY * a33 - bZ * a23) + a21 * (bZ * a13 - bX * a33) + a31 * (bX * a23 - bY * a13));
  out.z = det * (a11 * (a22 * bZ - a32 * bY) + a21 * (a32 * bX - a12 * bZ) + a31 * (a12 * bY - a22 * bX));
  return out
};
b2Mat33.prototype.col1 = new b2Vec3;
b2Mat33.prototype.col2 = new b2Vec3;
b2Mat33.prototype.col3 = new b2Vec3;var b2PositionSolverManifold = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2PositionSolverManifold.prototype.__constructor = function() {
  this.m_normal = new b2Vec2;
  this.m_separations = new Array(b2Settings.b2_maxManifoldPoints);
  this.m_points = new Array(b2Settings.b2_maxManifoldPoints);
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i] = new b2Vec2
  }
};
b2PositionSolverManifold.prototype.__varz = function() {
};
b2PositionSolverManifold.circlePointA = new b2Vec2;
b2PositionSolverManifold.circlePointB = new b2Vec2;
b2PositionSolverManifold.prototype.Initialize = function(cc) {
  b2Settings.b2Assert(cc.pointCount > 0);
  var i = 0;
  var clipPointX;
  var clipPointY;
  var tMat;
  var tVec;
  var planePointX;
  var planePointY;
  switch(cc.type) {
    case b2Manifold.e_circles:
      tMat = cc.bodyA.m_xf.R;
      tVec = cc.localPoint;
      var pointAX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var pointAY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = cc.bodyB.m_xf.R;
      tVec = cc.points[0].localPoint;
      var pointBX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      var pointBY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      var dX = pointBX - pointAX;
      var dY = pointBY - pointAY;
      var d2 = dX * dX + dY * dY;
      if(d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
        var d = Math.sqrt(d2);
        this.m_normal.x = dX / d;
        this.m_normal.y = dY / d
      }else {
        this.m_normal.x = 1;
        this.m_normal.y = 0
      }
      this.m_points[0].x = 0.5 * (pointAX + pointBX);
      this.m_points[0].y = 0.5 * (pointAY + pointBY);
      this.m_separations[0] = dX * this.m_normal.x + dY * this.m_normal.y - cc.radius;
      break;
    case b2Manifold.e_faceA:
      tMat = cc.bodyA.m_xf.R;
      tVec = cc.localPlaneNormal;
      this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = cc.bodyA.m_xf.R;
      tVec = cc.localPoint;
      planePointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      planePointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = cc.bodyB.m_xf.R;
      for(i = 0;i < cc.pointCount;++i) {
        tVec = cc.points[i].localPoint;
        clipPointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        clipPointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
        this.m_points[i].x = clipPointX;
        this.m_points[i].y = clipPointY
      }
      break;
    case b2Manifold.e_faceB:
      tMat = cc.bodyB.m_xf.R;
      tVec = cc.localPlaneNormal;
      this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
      this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
      tMat = cc.bodyB.m_xf.R;
      tVec = cc.localPoint;
      planePointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      planePointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = cc.bodyA.m_xf.R;
      for(i = 0;i < cc.pointCount;++i) {
        tVec = cc.points[i].localPoint;
        clipPointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        clipPointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
        this.m_points[i].Set(clipPointX, clipPointY)
      }
      this.m_normal.x *= -1;
      this.m_normal.y *= -1;
      break
  }
};
b2PositionSolverManifold.prototype.m_normal = null;
b2PositionSolverManifold.prototype.m_points = null;
b2PositionSolverManifold.prototype.m_separations = null;var b2OBB = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2OBB.prototype.__constructor = function() {
};
b2OBB.prototype.__varz = function() {
  this.R = new b2Mat22;
  this.center = new b2Vec2;
  this.extents = new b2Vec2
};
b2OBB.prototype.R = new b2Mat22;
b2OBB.prototype.center = new b2Vec2;
b2OBB.prototype.extents = new b2Vec2;var b2Pair = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Pair.prototype.__constructor = function() {
};
b2Pair.prototype.__varz = function() {
};
b2Pair.b2_nullProxy = b2Settings.USHRT_MAX;
b2Pair.e_pairBuffered = 1;
b2Pair.e_pairRemoved = 2;
b2Pair.e_pairFinal = 4;
b2Pair.prototype.SetBuffered = function() {
  this.status |= b2Pair.e_pairBuffered
};
b2Pair.prototype.ClearBuffered = function() {
  this.status &= ~b2Pair.e_pairBuffered
};
b2Pair.prototype.IsBuffered = function() {
  return(this.status & b2Pair.e_pairBuffered) == b2Pair.e_pairBuffered
};
b2Pair.prototype.SetRemoved = function() {
  this.status |= b2Pair.e_pairRemoved
};
b2Pair.prototype.ClearRemoved = function() {
  this.status &= ~b2Pair.e_pairRemoved
};
b2Pair.prototype.IsRemoved = function() {
  return(this.status & b2Pair.e_pairRemoved) == b2Pair.e_pairRemoved
};
b2Pair.prototype.SetFinal = function() {
  this.status |= b2Pair.e_pairFinal
};
b2Pair.prototype.IsFinal = function() {
  return(this.status & b2Pair.e_pairFinal) == b2Pair.e_pairFinal
};
b2Pair.prototype.userData = null;
b2Pair.prototype.proxy1 = null;
b2Pair.prototype.proxy2 = null;
b2Pair.prototype.next = null;
b2Pair.prototype.status = 0;var b2FixtureDef = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2FixtureDef.prototype.__constructor = function() {
  this.shape = null;
  this.userData = null;
  this.friction = 0.2;
  this.restitution = 0;
  this.density = 0;
  this.filter.categoryBits = 1;
  this.filter.maskBits = 65535;
  this.filter.groupIndex = 0;
  this.isSensor = false
};
b2FixtureDef.prototype.__varz = function() {
  this.filter = new b2FilterData
};
b2FixtureDef.prototype.shape = null;
b2FixtureDef.prototype.userData = null;
b2FixtureDef.prototype.friction = null;
b2FixtureDef.prototype.restitution = null;
b2FixtureDef.prototype.density = null;
b2FixtureDef.prototype.isSensor = null;
b2FixtureDef.prototype.filter = new b2FilterData;var b2ContactID = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactID.prototype.__constructor = function() {
  this.features._m_id = this
};
b2ContactID.prototype.__varz = function() {
  this.features = new Features
};
b2ContactID.prototype.Set = function(id) {
  key = id._key
};
b2ContactID.prototype.Copy = function() {
  var id = new b2ContactID;
  id.key = key;
  return id
};
b2ContactID.prototype.__defineSetter__("key", function() {
  return this._key
});
b2ContactID.prototype.__defineSetter__("key", function(value) {
  this._key = value;
  this.features._referenceEdge = this._key & 255;
  this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
  this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
  this.features._flip = (this._key & 4278190080) >> 24 & 255
});
b2ContactID.prototype._key = 0;
b2ContactID.prototype.features = new Features;var b2Transform = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Transform.prototype.__constructor = function(pos, r) {
  if(pos) {
    this.position.SetV(pos);
    this.R.SetM(r)
  }
};
b2Transform.prototype.__varz = function() {
  this.position = new b2Vec2;
  this.R = new b2Mat22
};
b2Transform.prototype.Initialize = function(pos, r) {
  this.position.SetV(pos);
  this.R.SetM(r)
};
b2Transform.prototype.SetIdentity = function() {
  this.position.SetZero();
  this.R.SetIdentity()
};
b2Transform.prototype.Set = function(x) {
  this.position.SetV(x.position);
  this.R.SetM(x.R)
};
b2Transform.prototype.GetAngle = function() {
  return Math.atan2(this.R.col1.y, this.R.col1.x)
};
b2Transform.prototype.position = new b2Vec2;
b2Transform.prototype.R = new b2Mat22;var b2EdgeShape = function() {
  b2Shape.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2EdgeShape.prototype, b2Shape.prototype);
b2EdgeShape.prototype._super = b2Shape.prototype;
b2EdgeShape.prototype.__constructor = function(v1, v2) {
  this._super.__constructor.apply(this, []);
  this.m_type = b2Shape.e_edgeShape;
  this.m_prevEdge = null;
  this.m_nextEdge = null;
  this.m_v1 = v1;
  this.m_v2 = v2;
  this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
  this.m_length = this.m_direction.Normalize();
  this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
  this.m_coreV1.Set(-b2Settings.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -b2Settings.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
  this.m_coreV2.Set(-b2Settings.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -b2Settings.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
  this.m_cornerDir1 = this.m_normal;
  this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
};
b2EdgeShape.prototype.__varz = function() {
  this.s_supportVec = new b2Vec2;
  this.m_v1 = new b2Vec2;
  this.m_v2 = new b2Vec2;
  this.m_coreV1 = new b2Vec2;
  this.m_coreV2 = new b2Vec2;
  this.m_normal = new b2Vec2;
  this.m_direction = new b2Vec2;
  this.m_cornerDir1 = new b2Vec2;
  this.m_cornerDir2 = new b2Vec2
};
b2EdgeShape.prototype.SetPrevEdge = function(edge, core, cornerDir, convex) {
  this.m_prevEdge = edge;
  this.m_coreV1 = core;
  this.m_cornerDir1 = cornerDir;
  this.m_cornerConvex1 = convex
};
b2EdgeShape.prototype.SetNextEdge = function(edge, core, cornerDir, convex) {
  this.m_nextEdge = edge;
  this.m_coreV2 = core;
  this.m_cornerDir2 = cornerDir;
  this.m_cornerConvex2 = convex
};
b2EdgeShape.prototype.TestPoint = function(transform, p) {
  return false
};
b2EdgeShape.prototype.RayCast = function(output, input, transform) {
  var tMat;
  var rX = input.p2.x - input.p1.x;
  var rY = input.p2.y - input.p1.y;
  tMat = transform.R;
  var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
  var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
  var nX = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y) - v1Y;
  var nY = -(transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y) - v1X);
  var k_slop = 100 * Number.MIN_VALUE;
  var denom = -(rX * nX + rY * nY);
  if(denom > k_slop) {
    var bX = input.p1.x - v1X;
    var bY = input.p1.y - v1Y;
    var a = bX * nX + bY * nY;
    if(0 <= a && a <= input.maxFraction * denom) {
      var mu2 = -rX * bY + rY * bX;
      if(-k_slop * denom <= mu2 && mu2 <= denom * (1 + k_slop)) {
        a /= denom;
        output.fraction = a;
        var nLen = Math.sqrt(nX * nX + nY * nY);
        output.normal.x = nX / nLen;
        output.normal.y = nY / nLen;
        return true
      }
    }
  }
  return false
};
b2EdgeShape.prototype.ComputeAABB = function(aabb, transform) {
  var tMat = transform.R;
  var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
  var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
  var v2X = transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y);
  var v2Y = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y);
  if(v1X < v2X) {
    aabb.lowerBound.x = v1X;
    aabb.upperBound.x = v2X
  }else {
    aabb.lowerBound.x = v2X;
    aabb.upperBound.x = v1X
  }
  if(v1Y < v2Y) {
    aabb.lowerBound.y = v1Y;
    aabb.upperBound.y = v2Y
  }else {
    aabb.lowerBound.y = v2Y;
    aabb.upperBound.y = v1Y
  }
};
b2EdgeShape.prototype.ComputeMass = function(massData, density) {
  massData.mass = 0;
  massData.center.SetV(this.m_v1);
  massData.I = 0
};
b2EdgeShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
  var v0 = new b2Vec2(normal.x * offset, normal.y * offset);
  var v1 = b2Math.MulX(xf, this.m_v1);
  var v2 = b2Math.MulX(xf, this.m_v2);
  var d1 = b2Math.Dot(normal, v1) - offset;
  var d2 = b2Math.Dot(normal, v2) - offset;
  if(d1 > 0) {
    if(d2 > 0) {
      return 0
    }else {
      v1.x = -d2 / (d1 - d2) * v1.x + d1 / (d1 - d2) * v2.x;
      v1.y = -d2 / (d1 - d2) * v1.y + d1 / (d1 - d2) * v2.y
    }
  }else {
    if(d2 > 0) {
      v2.x = -d2 / (d1 - d2) * v1.x + d1 / (d1 - d2) * v2.x;
      v2.y = -d2 / (d1 - d2) * v1.y + d1 / (d1 - d2) * v2.y
    }else {
    }
  }
  c.x = (v0.x + v1.x + v2.x) / 3;
  c.y = (v0.y + v1.y + v2.y) / 3;
  return 0.5 * ((v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x))
};
b2EdgeShape.prototype.GetLength = function() {
  return this.m_length
};
b2EdgeShape.prototype.GetVertex1 = function() {
  return this.m_v1
};
b2EdgeShape.prototype.GetVertex2 = function() {
  return this.m_v2
};
b2EdgeShape.prototype.GetCoreVertex1 = function() {
  return this.m_coreV1
};
b2EdgeShape.prototype.GetCoreVertex2 = function() {
  return this.m_coreV2
};
b2EdgeShape.prototype.GetNormalVector = function() {
  return this.m_normal
};
b2EdgeShape.prototype.GetDirectionVector = function() {
  return this.m_direction
};
b2EdgeShape.prototype.GetCorner1Vector = function() {
  return this.m_cornerDir1
};
b2EdgeShape.prototype.GetCorner2Vector = function() {
  return this.m_cornerDir2
};
b2EdgeShape.prototype.Corner1IsConvex = function() {
  return this.m_cornerConvex1
};
b2EdgeShape.prototype.Corner2IsConvex = function() {
  return this.m_cornerConvex2
};
b2EdgeShape.prototype.GetFirstVertex = function(xf) {
  var tMat = xf.R;
  return new b2Vec2(xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y), xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y))
};
b2EdgeShape.prototype.GetNextEdge = function() {
  return this.m_nextEdge
};
b2EdgeShape.prototype.GetPrevEdge = function() {
  return this.m_prevEdge
};
b2EdgeShape.prototype.Support = function(xf, dX, dY) {
  var tMat = xf.R;
  var v1X = xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y);
  var v1Y = xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y);
  var v2X = xf.position.x + (tMat.col1.x * this.m_coreV2.x + tMat.col2.x * this.m_coreV2.y);
  var v2Y = xf.position.y + (tMat.col1.y * this.m_coreV2.x + tMat.col2.y * this.m_coreV2.y);
  if(v1X * dX + v1Y * dY > v2X * dX + v2Y * dY) {
    this.s_supportVec.x = v1X;
    this.s_supportVec.y = v1Y
  }else {
    this.s_supportVec.x = v2X;
    this.s_supportVec.y = v2Y
  }
  return this.s_supportVec
};
b2EdgeShape.prototype.s_supportVec = new b2Vec2;
b2EdgeShape.prototype.m_v1 = new b2Vec2;
b2EdgeShape.prototype.m_v2 = new b2Vec2;
b2EdgeShape.prototype.m_coreV1 = new b2Vec2;
b2EdgeShape.prototype.m_coreV2 = new b2Vec2;
b2EdgeShape.prototype.m_length = null;
b2EdgeShape.prototype.m_normal = new b2Vec2;
b2EdgeShape.prototype.m_direction = new b2Vec2;
b2EdgeShape.prototype.m_cornerDir1 = new b2Vec2;
b2EdgeShape.prototype.m_cornerDir2 = new b2Vec2;
b2EdgeShape.prototype.m_cornerConvex1 = null;
b2EdgeShape.prototype.m_cornerConvex2 = null;
b2EdgeShape.prototype.m_nextEdge = null;
b2EdgeShape.prototype.m_prevEdge = null;var b2BuoyancyController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2BuoyancyController.prototype, b2Controller.prototype);
b2BuoyancyController.prototype._super = b2Controller.prototype;
b2BuoyancyController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2BuoyancyController.prototype.__varz = function() {
  this.normal = new b2Vec2(0, -1);
  this.velocity = new b2Vec2(0, 0)
};
b2BuoyancyController.prototype.Step = function(step) {
  if(!m_bodyList) {
    return
  }
  if(this.useWorldGravity) {
    this.gravity = this.GetWorld().GetGravity().Copy()
  }
  for(var i = m_bodyList;i;i = i.nextBody) {
    var body = i.body;
    if(body.IsAwake() == false) {
      continue
    }
    var areac = new b2Vec2;
    var massc = new b2Vec2;
    var area = 0;
    var mass = 0;
    for(var fixture = body.GetFixtureList();fixture;fixture = fixture.GetNext()) {
      var sc = new b2Vec2;
      var sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
      area += sarea;
      areac.x += sarea * sc.x;
      areac.y += sarea * sc.y;
      var shapeDensity;
      if(this.useDensity) {
        shapeDensity = 1
      }else {
        shapeDensity = 1
      }
      mass += sarea * shapeDensity;
      massc.x += sarea * sc.x * shapeDensity;
      massc.y += sarea * sc.y * shapeDensity
    }
    areac.x /= area;
    areac.y /= area;
    massc.x /= mass;
    massc.y /= mass;
    if(area < Number.MIN_VALUE) {
      continue
    }
    var buoyancyForce = this.gravity.GetNegative();
    buoyancyForce.Multiply(this.density * area);
    body.ApplyForce(buoyancyForce, massc);
    var dragForce = body.GetLinearVelocityFromWorldPoint(areac);
    dragForce.Subtract(this.velocity);
    dragForce.Multiply(-this.linearDrag * area);
    body.ApplyForce(dragForce, areac);
    body.ApplyTorque(-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag)
  }
};
b2BuoyancyController.prototype.Draw = function(debugDraw) {
  var r = 1E3;
  var p1 = new b2Vec2;
  var p2 = new b2Vec2;
  p1.x = this.normal.x * this.offset + this.normal.y * r;
  p1.y = this.normal.y * this.offset - this.normal.x * r;
  p2.x = this.normal.x * this.offset - this.normal.y * r;
  p2.y = this.normal.y * this.offset + this.normal.x * r;
  var color = new b2Color(0, 0, 1);
  debugDraw.DrawSegment(p1, p2, color)
};
b2BuoyancyController.prototype.normal = new b2Vec2(0, -1);
b2BuoyancyController.prototype.offset = 0;
b2BuoyancyController.prototype.density = 0;
b2BuoyancyController.prototype.velocity = new b2Vec2(0, 0);
b2BuoyancyController.prototype.linearDrag = 2;
b2BuoyancyController.prototype.angularDrag = 1;
b2BuoyancyController.prototype.useDensity = false;
b2BuoyancyController.prototype.useWorldGravity = true;
b2BuoyancyController.prototype.gravity = null;var b2Body = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Body.prototype.__constructor = function(bd, world) {
  this.m_flags = 0;
  if(bd.bullet) {
    this.m_flags |= b2Body.e_bulletFlag
  }
  if(bd.fixedRotation) {
    this.m_flags |= b2Body.e_fixedRotationFlag
  }
  if(bd.allowSleep) {
    this.m_flags |= b2Body.e_allowSleepFlag
  }
  if(bd.awake) {
    this.m_flags |= b2Body.e_awakeFlag
  }
  if(bd.active) {
    this.m_flags |= b2Body.e_activeFlag
  }
  this.m_world = world;
  this.m_xf.position.SetV(bd.position);
  this.m_xf.R.Set(bd.angle);
  this.m_sweep.localCenter.SetZero();
  this.m_sweep.t0 = 1;
  this.m_sweep.a0 = this.m_sweep.a = bd.angle;
  var tMat = this.m_xf.R;
  var tVec = this.m_sweep.localCenter;
  this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
  this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
  this.m_sweep.c.x += this.m_xf.position.x;
  this.m_sweep.c.y += this.m_xf.position.y;
  this.m_sweep.c0.SetV(this.m_sweep.c);
  this.m_jointList = null;
  this.m_controllerList = null;
  this.m_contactList = null;
  this.m_controllerCount = 0;
  this.m_prev = null;
  this.m_next = null;
  this.m_linearVelocity.SetV(bd.linearVelocity);
  this.m_angularVelocity = bd.angularVelocity;
  this.m_linearDamping = bd.linearDamping;
  this.m_angularDamping = bd.angularDamping;
  this.m_force.Set(0, 0);
  this.m_torque = 0;
  this.m_sleepTime = 0;
  this.m_type = bd.type;
  if(this.m_type == b2Body.b2_dynamicBody) {
    this.m_mass = 1;
    this.m_invMass = 1
  }else {
    this.m_mass = 0;
    this.m_invMass = 0
  }
  this.m_I = 0;
  this.m_invI = 0;
  this.m_inertiaScale = bd.inertiaScale;
  this.m_userData = bd.userData;
  this.m_fixtureList = null;
  this.m_fixtureCount = 0
};
b2Body.prototype.__varz = function() {
  this.m_xf = new b2Transform;
  this.m_sweep = new b2Sweep;
  this.m_linearVelocity = new b2Vec2;
  this.m_force = new b2Vec2
};
b2Body.b2_staticBody = 0;
b2Body.b2_kinematicBody = 1;
b2Body.b2_dynamicBody = 2;
b2Body.s_xf1 = new b2Transform;
b2Body.e_islandFlag = 1;
b2Body.e_awakeFlag = 2;
b2Body.e_allowSleepFlag = 4;
b2Body.e_bulletFlag = 8;
b2Body.e_fixedRotationFlag = 16;
b2Body.e_activeFlag = 32;
b2Body.prototype.connectEdges = function(s1, s2, angle1) {
  var angle2 = Math.atan2(s2.GetDirectionVector().y, s2.GetDirectionVector().x);
  var coreOffset = Math.tan((angle2 - angle1) * 0.5);
  var core = b2Math.MulFV(coreOffset, s2.GetDirectionVector());
  core = b2Math.SubtractVV(core, s2.GetNormalVector());
  core = b2Math.MulFV(b2Settings.b2_toiSlop, core);
  core = b2Math.AddVV(core, s2.GetVertex1());
  var cornerDir = b2Math.AddVV(s1.GetDirectionVector(), s2.GetDirectionVector());
  cornerDir.Normalize();
  var convex = b2Math.Dot(s1.GetDirectionVector(), s2.GetNormalVector()) > 0;
  s1.SetNextEdge(s2, core, cornerDir, convex);
  s2.SetPrevEdge(s1, core, cornerDir, convex);
  return angle2
};
b2Body.prototype.SynchronizeFixtures = function() {
  var xf1 = b2Body.s_xf1;
  xf1.R.Set(this.m_sweep.a0);
  var tMat = xf1.R;
  var tVec = this.m_sweep.localCenter;
  xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  var f;
  var broadPhase = this.m_world.m_contactManager.m_broadPhase;
  for(f = this.m_fixtureList;f;f = f.m_next) {
    f.Synchronize(broadPhase, xf1, this.m_xf)
  }
};
b2Body.prototype.SynchronizeTransform = function() {
  this.m_xf.R.Set(this.m_sweep.a);
  var tMat = this.m_xf.R;
  var tVec = this.m_sweep.localCenter;
  this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y)
};
b2Body.prototype.ShouldCollide = function(other) {
  if(this.m_type != b2Body.b2_dynamicBody && other.m_type != b2Body.b2_dynamicBody) {
    return false
  }
  for(var jn = this.m_jointList;jn;jn = jn.next) {
    if(jn.other == other) {
      if(jn.joint.m_collideConnected == false) {
        return false
      }
    }
  }
  return true
};
b2Body.prototype.Advance = function(t) {
  this.m_sweep.Advance(t);
  this.m_sweep.c.SetV(this.m_sweep.c0);
  this.m_sweep.a = this.m_sweep.a0;
  this.SynchronizeTransform()
};
b2Body.prototype.CreateFixture = function(def) {
  if(this.m_world.IsLocked() == true) {
    return null
  }
  var fixture = new b2Fixture;
  fixture.Create(this, this.m_xf, def);
  if(this.m_flags & b2Body.e_activeFlag) {
    var broadPhase = this.m_world.m_contactManager.m_broadPhase;
    fixture.CreateProxy(broadPhase, this.m_xf)
  }
  fixture.m_next = this.m_fixtureList;
  this.m_fixtureList = fixture;
  ++this.m_fixtureCount;
  fixture.m_body = this;
  if(fixture.m_density > 0) {
    this.ResetMassData()
  }
  this.m_world.m_flags |= b2World.e_newFixture;
  return fixture
};
b2Body.prototype.CreateFixture2 = function(shape, density) {
  var def = new b2FixtureDef;
  def.shape = shape;
  def.density = density;
  return this.CreateFixture(def)
};
b2Body.prototype.DestroyFixture = function(fixture) {
  if(this.m_world.IsLocked() == true) {
    return
  }
  var node = this.m_fixtureList;
  var ppF = null;
  var found = false;
  while(node != null) {
    if(node == fixture) {
      if(ppF) {
        ppF.m_next = fixture.m_next
      }else {
        this.m_fixtureList = fixture.m_next
      }
      found = true;
      break
    }
    ppF = node;
    node = node.m_next
  }
  var edge = this.m_contactList;
  while(edge) {
    var c = edge.contact;
    edge = edge.next;
    var fixtureA = c.GetFixtureA();
    var fixtureB = c.GetFixtureB();
    if(fixture == fixtureA || fixture == fixtureB) {
      this.m_world.m_contactManager.Destroy(c)
    }
  }
  if(this.m_flags & b2Body.e_activeFlag) {
    var broadPhase = this.m_world.m_contactManager.m_broadPhase;
    fixture.DestroyProxy(broadPhase)
  }else {
  }
  fixture.Destroy();
  fixture.m_body = null;
  fixture.m_next = null;
  --this.m_fixtureCount;
  this.ResetMassData()
};
b2Body.prototype.SetPositionAndAngle = function(position, angle) {
  var f;
  if(this.m_world.IsLocked() == true) {
    return
  }
  this.m_xf.R.Set(angle);
  this.m_xf.position.SetV(position);
  var tMat = this.m_xf.R;
  var tVec = this.m_sweep.localCenter;
  this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
  this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
  this.m_sweep.c.x += this.m_xf.position.x;
  this.m_sweep.c.y += this.m_xf.position.y;
  this.m_sweep.c0.SetV(this.m_sweep.c);
  this.m_sweep.a0 = this.m_sweep.a = angle;
  var broadPhase = this.m_world.m_contactManager.m_broadPhase;
  for(f = this.m_fixtureList;f;f = f.m_next) {
    f.Synchronize(broadPhase, this.m_xf, this.m_xf)
  }
  this.m_world.m_contactManager.FindNewContacts()
};
b2Body.prototype.SetTransform = function(xf) {
  this.SetPositionAndAngle(xf.position, xf.GetAngle())
};
b2Body.prototype.GetTransform = function() {
  return this.m_xf
};
b2Body.prototype.GetPosition = function() {
  return this.m_xf.position
};
b2Body.prototype.SetPosition = function(position) {
  this.SetPositionAndAngle(position, this.GetAngle())
};
b2Body.prototype.GetAngle = function() {
  return this.m_sweep.a
};
b2Body.prototype.SetAngle = function(angle) {
  this.SetPositionAndAngle(this.GetPosition(), angle)
};
b2Body.prototype.GetWorldCenter = function() {
  return this.m_sweep.c
};
b2Body.prototype.GetLocalCenter = function() {
  return this.m_sweep.localCenter
};
b2Body.prototype.SetLinearVelocity = function(v) {
  if(this.m_type == b2Body.b2_staticBody) {
    return
  }
  this.m_linearVelocity.SetV(v)
};
b2Body.prototype.GetLinearVelocity = function() {
  return this.m_linearVelocity
};
b2Body.prototype.SetAngularVelocity = function(omega) {
  if(this.m_type == b2Body.b2_staticBody) {
    return
  }
  this.m_angularVelocity = omega
};
b2Body.prototype.GetAngularVelocity = function() {
  return this.m_angularVelocity
};
b2Body.prototype.GetDefinition = function() {
  var bd = new b2BodyDef;
  bd.type = this.GetType();
  bd.allowSleep = (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
  bd.angle = this.GetAngle();
  bd.angularDamping = this.m_angularDamping;
  bd.angularVelocity = this.m_angularVelocity;
  bd.fixedRotation = (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
  bd.bullet = (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
  bd.awake = (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
  bd.linearDamping = this.m_linearDamping;
  bd.linearVelocity.SetV(this.GetLinearVelocity());
  bd.position = this.GetPosition();
  bd.userData = this.GetUserData();
  return bd
};
b2Body.prototype.ApplyForce = function(force, point) {
  if(this.m_type != b2Body.b2_dynamicBody) {
    return
  }
  if(this.IsAwake() == false) {
    this.SetAwake(true)
  }
  this.m_force.x += force.x;
  this.m_force.y += force.y;
  this.m_torque += (point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x
};
b2Body.prototype.ApplyTorque = function(torque) {
  if(this.m_type != b2Body.b2_dynamicBody) {
    return
  }
  if(this.IsAwake() == false) {
    this.SetAwake(true)
  }
  this.m_torque += torque
};
b2Body.prototype.ApplyImpulse = function(impulse, point) {
  if(this.m_type != b2Body.b2_dynamicBody) {
    return
  }
  if(this.IsAwake() == false) {
    this.SetAwake(true)
  }
  this.m_linearVelocity.x += this.m_invMass * impulse.x;
  this.m_linearVelocity.y += this.m_invMass * impulse.y;
  this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x)
};
b2Body.prototype.Split = function(callback) {
  var linearVelocity = this.GetLinearVelocity().Copy();
  var angularVelocity = this.GetAngularVelocity();
  var center = this.GetWorldCenter();
  var body1 = this;
  var body2 = this.m_world.CreateBody(this.GetDefinition());
  var prev;
  for(var f = body1.m_fixtureList;f;) {
    if(callback(f)) {
      var next = f.m_next;
      if(prev) {
        prev.m_next = next
      }else {
        body1.m_fixtureList = next
      }
      body1.m_fixtureCount--;
      f.m_next = body2.m_fixtureList;
      body2.m_fixtureList = f;
      body2.m_fixtureCount++;
      f.m_body = body2;
      f = next
    }else {
      prev = f;
      f = f.m_next
    }
  }
  body1.ResetMassData();
  body2.ResetMassData();
  var center1 = body1.GetWorldCenter();
  var center2 = body2.GetWorldCenter();
  var velocity1 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center1, center)));
  var velocity2 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center2, center)));
  body1.SetLinearVelocity(velocity1);
  body2.SetLinearVelocity(velocity2);
  body1.SetAngularVelocity(angularVelocity);
  body2.SetAngularVelocity(angularVelocity);
  body1.SynchronizeFixtures();
  body2.SynchronizeFixtures();
  return body2
};
b2Body.prototype.Merge = function(other) {
  var f;
  for(f = other.m_fixtureList;f;) {
    var next = f.m_next;
    other.m_fixtureCount--;
    f.m_next = this.m_fixtureList;
    this.m_fixtureList = f;
    this.m_fixtureCount++;
    f.m_body = body2;
    f = next
  }
  body1.m_fixtureCount = 0;
  var body1 = this;
  var body2 = other;
  var center1 = body1.GetWorldCenter();
  var center2 = body2.GetWorldCenter();
  var velocity1 = body1.GetLinearVelocity().Copy();
  var velocity2 = body2.GetLinearVelocity().Copy();
  var angular1 = body1.GetAngularVelocity();
  var angular = body2.GetAngularVelocity();
  body1.ResetMassData();
  this.SynchronizeFixtures()
};
b2Body.prototype.GetMass = function() {
  return this.m_mass
};
b2Body.prototype.GetInertia = function() {
  return this.m_I
};
b2Body.prototype.GetMassData = function(data) {
  data.mass = this.m_mass;
  data.I = this.m_I;
  data.center.SetV(this.m_sweep.localCenter)
};
b2Body.prototype.SetMassData = function(massData) {
  b2Settings.b2Assert(this.m_world.IsLocked() == false);
  if(this.m_world.IsLocked() == true) {
    return
  }
  if(this.m_type != b2Body.b2_dynamicBody) {
    return
  }
  this.m_invMass = 0;
  this.m_I = 0;
  this.m_invI = 0;
  this.m_mass = massData.mass;
  if(this.m_mass <= 0) {
    this.m_mass = 1
  }
  this.m_invMass = 1 / this.m_mass;
  if(massData.I > 0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
    this.m_I = massData.I - this.m_mass * (massData.center.x * massData.center.x + massData.center.y * massData.center.y);
    this.m_invI = 1 / this.m_I
  }
  var oldCenter = this.m_sweep.c.Copy();
  this.m_sweep.localCenter.SetV(massData.center);
  this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
  this.m_sweep.c.SetV(this.m_sweep.c0);
  this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
  this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - oldCenter.x)
};
b2Body.prototype.ResetMassData = function() {
  this.m_mass = 0;
  this.m_invMass = 0;
  this.m_I = 0;
  this.m_invI = 0;
  this.m_sweep.localCenter.SetZero();
  if(this.m_type == b2Body.b2_staticBody || this.m_type == b2Body.b2_kinematicBody) {
    return
  }
  var center = b2Vec2.Make(0, 0);
  for(var f = this.m_fixtureList;f;f = f.m_next) {
    if(f.m_density == 0) {
      continue
    }
    var massData = f.GetMassData();
    this.m_mass += massData.mass;
    center.x += massData.center.x * massData.mass;
    center.y += massData.center.y * massData.mass;
    this.m_I += massData.I
  }
  if(this.m_mass > 0) {
    this.m_invMass = 1 / this.m_mass;
    center.x *= this.m_invMass;
    center.y *= this.m_invMass
  }else {
    this.m_mass = 1;
    this.m_invMass = 1
  }
  if(this.m_I > 0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
    this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
    this.m_I *= this.m_inertiaScale;
    b2Settings.b2Assert(this.m_I > 0);
    this.m_invI = 1 / this.m_I
  }else {
    this.m_I = 0;
    this.m_invI = 0
  }
  var oldCenter = this.m_sweep.c.Copy();
  this.m_sweep.localCenter.SetV(center);
  this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
  this.m_sweep.c.SetV(this.m_sweep.c0);
  this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
  this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - oldCenter.x)
};
b2Body.prototype.GetWorldPoint = function(localPoint) {
  var A = this.m_xf.R;
  var u = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
  u.x += this.m_xf.position.x;
  u.y += this.m_xf.position.y;
  return u
};
b2Body.prototype.GetWorldVector = function(localVector) {
  return b2Math.MulMV(this.m_xf.R, localVector)
};
b2Body.prototype.GetLocalPoint = function(worldPoint) {
  return b2Math.MulXT(this.m_xf, worldPoint)
};
b2Body.prototype.GetLocalVector = function(worldVector) {
  return b2Math.MulTMV(this.m_xf.R, worldVector)
};
b2Body.prototype.GetLinearVelocityFromWorldPoint = function(worldPoint) {
  return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x))
};
b2Body.prototype.GetLinearVelocityFromLocalPoint = function(localPoint) {
  var A = this.m_xf.R;
  var worldPoint = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
  worldPoint.x += this.m_xf.position.x;
  worldPoint.y += this.m_xf.position.y;
  return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x))
};
b2Body.prototype.GetLinearDamping = function() {
  return this.m_linearDamping
};
b2Body.prototype.SetLinearDamping = function(linearDamping) {
  this.m_linearDamping = linearDamping
};
b2Body.prototype.GetAngularDamping = function() {
  return this.m_angularDamping
};
b2Body.prototype.SetAngularDamping = function(angularDamping) {
  this.m_angularDamping = angularDamping
};
b2Body.prototype.SetType = function(type) {
  if(this.m_type == type) {
    return
  }
  this.m_type = type;
  this.ResetMassData();
  if(this.m_type == b2Body.b2_staticBody) {
    this.m_linearVelocity.SetZero();
    this.m_angularVelocity = 0
  }
  this.SetAwake(true);
  this.m_force.SetZero();
  this.m_torque = 0;
  for(var ce = this.m_contactList;ce;ce = ce.next) {
    ce.contact.FlagForFiltering()
  }
};
b2Body.prototype.GetType = function() {
  return this.m_type
};
b2Body.prototype.SetBullet = function(flag) {
  if(flag) {
    this.m_flags |= b2Body.e_bulletFlag
  }else {
    this.m_flags &= ~b2Body.e_bulletFlag
  }
};
b2Body.prototype.IsBullet = function() {
  return(this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag
};
b2Body.prototype.SetSleepingAllowed = function(flag) {
  if(flag) {
    this.m_flags |= b2Body.e_allowSleepFlag
  }else {
    this.m_flags &= ~b2Body.e_allowSleepFlag;
    this.SetAwake(true)
  }
};
b2Body.prototype.SetAwake = function(flag) {
  if(flag) {
    this.m_flags |= b2Body.e_awakeFlag;
    this.m_sleepTime = 0
  }else {
    this.m_flags &= ~b2Body.e_awakeFlag;
    this.m_sleepTime = 0;
    this.m_linearVelocity.SetZero();
    this.m_angularVelocity = 0;
    this.m_force.SetZero();
    this.m_torque = 0
  }
};
b2Body.prototype.IsAwake = function() {
  return(this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag
};
b2Body.prototype.SetFixedRotation = function(fixed) {
  if(fixed) {
    this.m_flags |= b2Body.e_fixedRotationFlag
  }else {
    this.m_flags &= ~b2Body.e_fixedRotationFlag
  }
  this.ResetMassData()
};
b2Body.prototype.IsFixedRotation = function() {
  return(this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag
};
b2Body.prototype.SetActive = function(flag) {
  if(flag == this.IsActive()) {
    return
  }
  var broadPhase;
  var f;
  if(flag) {
    this.m_flags |= b2Body.e_activeFlag;
    broadPhase = this.m_world.m_contactManager.m_broadPhase;
    for(f = this.m_fixtureList;f;f = f.m_next) {
      f.CreateProxy(broadPhase, this.m_xf)
    }
  }else {
    this.m_flags &= ~b2Body.e_activeFlag;
    broadPhase = this.m_world.m_contactManager.m_broadPhase;
    for(f = this.m_fixtureList;f;f = f.m_next) {
      f.DestroyProxy(broadPhase)
    }
    var ce = this.m_contactList;
    while(ce) {
      var ce0 = ce;
      ce = ce.next;
      this.m_world.m_contactManager.Destroy(ce0.contact)
    }
    this.m_contactList = null
  }
};
b2Body.prototype.IsActive = function() {
  return(this.m_flags & b2Body.e_activeFlag) == b2Body.e_activeFlag
};
b2Body.prototype.IsSleepingAllowed = function() {
  return(this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag
};
b2Body.prototype.GetFixtureList = function() {
  return this.m_fixtureList
};
b2Body.prototype.GetJointList = function() {
  return this.m_jointList
};
b2Body.prototype.GetControllerList = function() {
  return this.m_controllerList
};
b2Body.prototype.GetContactList = function() {
  return this.m_contactList
};
b2Body.prototype.GetNext = function() {
  return this.m_next
};
b2Body.prototype.GetUserData = function() {
  return this.m_userData
};
b2Body.prototype.SetUserData = function(data) {
  this.m_userData = data
};
b2Body.prototype.GetWorld = function() {
  return this.m_world
};
b2Body.prototype.m_flags = 0;
b2Body.prototype.m_type = 0;
b2Body.prototype.m_islandIndex = 0;
b2Body.prototype.m_xf = new b2Transform;
b2Body.prototype.m_sweep = new b2Sweep;
b2Body.prototype.m_linearVelocity = new b2Vec2;
b2Body.prototype.m_angularVelocity = null;
b2Body.prototype.m_force = new b2Vec2;
b2Body.prototype.m_torque = null;
b2Body.prototype.m_world = null;
b2Body.prototype.m_prev = null;
b2Body.prototype.m_next = null;
b2Body.prototype.m_fixtureList = null;
b2Body.prototype.m_fixtureCount = 0;
b2Body.prototype.m_controllerList = null;
b2Body.prototype.m_controllerCount = 0;
b2Body.prototype.m_jointList = null;
b2Body.prototype.m_contactList = null;
b2Body.prototype.m_mass = null;
b2Body.prototype.m_invMass = null;
b2Body.prototype.m_I = null;
b2Body.prototype.m_invI = null;
b2Body.prototype.m_inertiaScale = null;
b2Body.prototype.m_linearDamping = null;
b2Body.prototype.m_angularDamping = null;
b2Body.prototype.m_sleepTime = null;
b2Body.prototype.m_userData = null;var b2ContactImpulse = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactImpulse.prototype.__constructor = function() {
};
b2ContactImpulse.prototype.__varz = function() {
  this.normalImpulses = new Array(b2Settings.b2_maxManifoldPoints);
  this.tangentImpulses = new Array(b2Settings.b2_maxManifoldPoints)
};
b2ContactImpulse.prototype.normalImpulses = new Array(b2Settings.b2_maxManifoldPoints);
b2ContactImpulse.prototype.tangentImpulses = new Array(b2Settings.b2_maxManifoldPoints);var b2TensorDampingController = function() {
  b2Controller.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2TensorDampingController.prototype, b2Controller.prototype);
b2TensorDampingController.prototype._super = b2Controller.prototype;
b2TensorDampingController.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2TensorDampingController.prototype.__varz = function() {
  this.T = new b2Mat22
};
b2TensorDampingController.prototype.SetAxisAligned = function(xDamping, yDamping) {
  this.T.col1.x = -xDamping;
  this.T.col1.y = 0;
  this.T.col2.x = 0;
  this.T.col2.y = -yDamping;
  if(xDamping > 0 || yDamping > 0) {
    this.maxTimestep = 1 / Math.max(xDamping, yDamping)
  }else {
    this.maxTimestep = 0
  }
};
b2TensorDampingController.prototype.Step = function(step) {
  var timestep = step.dt;
  if(timestep <= Number.MIN_VALUE) {
    return
  }
  if(timestep > this.maxTimestep && this.maxTimestep > 0) {
    timestep = this.maxTimestep
  }
  for(var i = m_bodyList;i;i = i.nextBody) {
    var body = i.body;
    if(!body.IsAwake()) {
      continue
    }
    var damping = body.GetWorldVector(b2Math.MulMV(this.T, body.GetLocalVector(body.GetLinearVelocity())));
    body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + damping.x * timestep, body.GetLinearVelocity().y + damping.y * timestep))
  }
};
b2TensorDampingController.prototype.T = new b2Mat22;
b2TensorDampingController.prototype.maxTimestep = 0;var b2ManifoldPoint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ManifoldPoint.prototype.__constructor = function() {
  this.Reset()
};
b2ManifoldPoint.prototype.__varz = function() {
  this.m_localPoint = new b2Vec2;
  this.m_id = new b2ContactID
};
b2ManifoldPoint.prototype.Reset = function() {
  this.m_localPoint.SetZero();
  this.m_normalImpulse = 0;
  this.m_tangentImpulse = 0;
  this.m_id.key = 0
};
b2ManifoldPoint.prototype.Set = function(m) {
  this.m_localPoint.SetV(m.m_localPoint);
  this.m_normalImpulse = m.m_normalImpulse;
  this.m_tangentImpulse = m.m_tangentImpulse;
  this.m_id.Set(m.m_id)
};
b2ManifoldPoint.prototype.m_localPoint = new b2Vec2;
b2ManifoldPoint.prototype.m_normalImpulse = null;
b2ManifoldPoint.prototype.m_tangentImpulse = null;
b2ManifoldPoint.prototype.m_id = new b2ContactID;var b2PolygonShape = function() {
  b2Shape.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PolygonShape.prototype, b2Shape.prototype);
b2PolygonShape.prototype._super = b2Shape.prototype;
b2PolygonShape.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.m_type = b2Shape.e_polygonShape;
  this.m_centroid = new b2Vec2;
  this.m_vertices = new Array;
  this.m_normals = new Array
};
b2PolygonShape.prototype.__varz = function() {
};
b2PolygonShape.AsArray = function(vertices, vertexCount) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsArray(vertices, vertexCount);
  return polygonShape
};
b2PolygonShape.AsVector = function(vertices, vertexCount) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsVector(vertices, vertexCount);
  return polygonShape
};
b2PolygonShape.AsBox = function(hx, hy) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsBox(hx, hy);
  return polygonShape
};
b2PolygonShape.AsOrientedBox = function(hx, hy, center, angle) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsOrientedBox(hx, hy, center, angle);
  return polygonShape
};
b2PolygonShape.AsEdge = function(v1, v2) {
  var polygonShape = new b2PolygonShape;
  polygonShape.SetAsEdge(v1, v2);
  return polygonShape
};
b2PolygonShape.ComputeCentroid = function(vs, count) {
  var c = new b2Vec2;
  var area = 0;
  var p1X = 0;
  var p1Y = 0;
  var inv3 = 1 / 3;
  for(var i = 0;i < count;++i) {
    var p2 = vs[i];
    var p3 = i + 1 < count ? vs[parseInt(i + 1)] : vs[0];
    var e1X = p2.x - p1X;
    var e1Y = p2.y - p1Y;
    var e2X = p3.x - p1X;
    var e2Y = p3.y - p1Y;
    var D = e1X * e2Y - e1Y * e2X;
    var triangleArea = 0.5 * D;
    area += triangleArea;
    c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
    c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y)
  }
  c.x *= 1 / area;
  c.y *= 1 / area;
  return c
};
b2PolygonShape.ComputeOBB = function(obb, vs, count) {
  var i = 0;
  var p = new Array(count + 1);
  for(i = 0;i < count;++i) {
    p[i] = vs[i]
  }
  p[count] = p[0];
  var minArea = Number.MAX_VALUE;
  for(i = 1;i <= count;++i) {
    var root = p[parseInt(i - 1)];
    var uxX = p[i].x - root.x;
    var uxY = p[i].y - root.y;
    var length = Math.sqrt(uxX * uxX + uxY * uxY);
    uxX /= length;
    uxY /= length;
    var uyX = -uxY;
    var uyY = uxX;
    var lowerX = Number.MAX_VALUE;
    var lowerY = Number.MAX_VALUE;
    var upperX = -Number.MAX_VALUE;
    var upperY = -Number.MAX_VALUE;
    for(var j = 0;j < count;++j) {
      var dX = p[j].x - root.x;
      var dY = p[j].y - root.y;
      var rX = uxX * dX + uxY * dY;
      var rY = uyX * dX + uyY * dY;
      if(rX < lowerX) {
        lowerX = rX
      }
      if(rY < lowerY) {
        lowerY = rY
      }
      if(rX > upperX) {
        upperX = rX
      }
      if(rY > upperY) {
        upperY = rY
      }
    }
    var area = (upperX - lowerX) * (upperY - lowerY);
    if(area < 0.95 * minArea) {
      minArea = area;
      obb.R.col1.x = uxX;
      obb.R.col1.y = uxY;
      obb.R.col2.x = uyX;
      obb.R.col2.y = uyY;
      var centerX = 0.5 * (lowerX + upperX);
      var centerY = 0.5 * (lowerY + upperY);
      var tMat = obb.R;
      obb.center.x = root.x + (tMat.col1.x * centerX + tMat.col2.x * centerY);
      obb.center.y = root.y + (tMat.col1.y * centerX + tMat.col2.y * centerY);
      obb.extents.x = 0.5 * (upperX - lowerX);
      obb.extents.y = 0.5 * (upperY - lowerY)
    }
  }
};
b2PolygonShape.s_mat = new b2Mat22;
b2PolygonShape.prototype.Validate = function() {
  return false
};
b2PolygonShape.prototype.Reserve = function(count) {
  for(var i = this.m_vertices.length;i < count;i++) {
    this.m_vertices[i] = new b2Vec2;
    this.m_normals[i] = new b2Vec2
  }
};
b2PolygonShape.prototype.Copy = function() {
  var s = new b2PolygonShape;
  s.Set(this);
  return s
};
b2PolygonShape.prototype.Set = function(other) {
  this._super.Set.apply(this, [other]);
  if(isInstanceOf(other, b2PolygonShape)) {
    var other2 = other;
    this.m_centroid.SetV(other2.m_centroid);
    this.m_vertexCount = other2.m_vertexCount;
    this.Reserve(this.m_vertexCount);
    for(var i = 0;i < this.m_vertexCount;i++) {
      this.m_vertices[i].SetV(other2.m_vertices[i]);
      this.m_normals[i].SetV(other2.m_normals[i])
    }
  }
};
b2PolygonShape.prototype.SetAsArray = function(vertices, vertexCount) {
  var v = new Array;
  for(var i = 0, tVec = null;i < vertices.length, tVec = vertices[i];i++) {
    v.push(tVec)
  }
  this.SetAsVector(v, vertexCount)
};
b2PolygonShape.prototype.SetAsVector = function(vertices, vertexCount) {
  if(typeof vertexCount == "undefined") {
    vertexCount = vertices.length
  }
  b2Settings.b2Assert(2 <= vertexCount);
  this.m_vertexCount = vertexCount;
  this.Reserve(vertexCount);
  var i = 0;
  for(i = 0;i < this.m_vertexCount;i++) {
    this.m_vertices[i].SetV(vertices[i])
  }
  for(i = 0;i < this.m_vertexCount;++i) {
    var i1 = i;
    var i2 = i + 1 < this.m_vertexCount ? i + 1 : 0;
    var edge = b2Math.SubtractVV(this.m_vertices[i2], this.m_vertices[i1]);
    b2Settings.b2Assert(edge.LengthSquared() > Number.MIN_VALUE);
    this.m_normals[i].SetV(b2Math.CrossVF(edge, 1));
    this.m_normals[i].Normalize()
  }
  this.m_centroid = b2PolygonShape.ComputeCentroid(this.m_vertices, this.m_vertexCount)
};
b2PolygonShape.prototype.SetAsBox = function(hx, hy) {
  this.m_vertexCount = 4;
  this.Reserve(4);
  this.m_vertices[0].Set(-hx, -hy);
  this.m_vertices[1].Set(hx, -hy);
  this.m_vertices[2].Set(hx, hy);
  this.m_vertices[3].Set(-hx, hy);
  this.m_normals[0].Set(0, -1);
  this.m_normals[1].Set(1, 0);
  this.m_normals[2].Set(0, 1);
  this.m_normals[3].Set(-1, 0);
  this.m_centroid.SetZero()
};
b2PolygonShape.prototype.SetAsOrientedBox = function(hx, hy, center, angle) {
  this.m_vertexCount = 4;
  this.Reserve(4);
  this.m_vertices[0].Set(-hx, -hy);
  this.m_vertices[1].Set(hx, -hy);
  this.m_vertices[2].Set(hx, hy);
  this.m_vertices[3].Set(-hx, hy);
  this.m_normals[0].Set(0, -1);
  this.m_normals[1].Set(1, 0);
  this.m_normals[2].Set(0, 1);
  this.m_normals[3].Set(-1, 0);
  this.m_centroid = center;
  var xf = new b2Transform;
  xf.position = center;
  xf.R.Set(angle);
  for(var i = 0;i < this.m_vertexCount;++i) {
    this.m_vertices[i] = b2Math.MulX(xf, this.m_vertices[i]);
    this.m_normals[i] = b2Math.MulMV(xf.R, this.m_normals[i])
  }
};
b2PolygonShape.prototype.SetAsEdge = function(v1, v2) {
  this.m_vertexCount = 2;
  this.Reserve(2);
  this.m_vertices[0].SetV(v1);
  this.m_vertices[1].SetV(v2);
  this.m_centroid.x = 0.5 * (v1.x + v2.x);
  this.m_centroid.y = 0.5 * (v1.y + v2.y);
  this.m_normals[0] = b2Math.CrossVF(b2Math.SubtractVV(v2, v1), 1);
  this.m_normals[0].Normalize();
  this.m_normals[1].x = -this.m_normals[0].x;
  this.m_normals[1].y = -this.m_normals[0].y
};
b2PolygonShape.prototype.TestPoint = function(xf, p) {
  var tVec;
  var tMat = xf.R;
  var tX = p.x - xf.position.x;
  var tY = p.y - xf.position.y;
  var pLocalX = tX * tMat.col1.x + tY * tMat.col1.y;
  var pLocalY = tX * tMat.col2.x + tY * tMat.col2.y;
  for(var i = 0;i < this.m_vertexCount;++i) {
    tVec = this.m_vertices[i];
    tX = pLocalX - tVec.x;
    tY = pLocalY - tVec.y;
    tVec = this.m_normals[i];
    var dot = tVec.x * tX + tVec.y * tY;
    if(dot > 0) {
      return false
    }
  }
  return true
};
b2PolygonShape.prototype.RayCast = function(output, input, transform) {
  var lower = 0;
  var upper = input.maxFraction;
  var tX;
  var tY;
  var tMat;
  var tVec;
  tX = input.p1.x - transform.position.x;
  tY = input.p1.y - transform.position.y;
  tMat = transform.R;
  var p1X = tX * tMat.col1.x + tY * tMat.col1.y;
  var p1Y = tX * tMat.col2.x + tY * tMat.col2.y;
  tX = input.p2.x - transform.position.x;
  tY = input.p2.y - transform.position.y;
  tMat = transform.R;
  var p2X = tX * tMat.col1.x + tY * tMat.col1.y;
  var p2Y = tX * tMat.col2.x + tY * tMat.col2.y;
  var dX = p2X - p1X;
  var dY = p2Y - p1Y;
  var index = -1;
  for(var i = 0;i < this.m_vertexCount;++i) {
    tVec = this.m_vertices[i];
    tX = tVec.x - p1X;
    tY = tVec.y - p1Y;
    tVec = this.m_normals[i];
    var numerator = tVec.x * tX + tVec.y * tY;
    var denominator = tVec.x * dX + tVec.y * dY;
    if(denominator == 0) {
      if(numerator < 0) {
        return false
      }
    }else {
      if(denominator < 0 && numerator < lower * denominator) {
        lower = numerator / denominator;
        index = i
      }else {
        if(denominator > 0 && numerator < upper * denominator) {
          upper = numerator / denominator
        }
      }
    }
    if(upper < lower - Number.MIN_VALUE) {
      return false
    }
  }
  if(index >= 0) {
    output.fraction = lower;
    tMat = transform.R;
    tVec = this.m_normals[index];
    output.normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
    output.normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
    return true
  }
  return false
};
b2PolygonShape.prototype.ComputeAABB = function(aabb, xf) {
  var tMat = xf.R;
  var tVec = this.m_vertices[0];
  var lowerX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var lowerY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  var upperX = lowerX;
  var upperY = lowerY;
  for(var i = 1;i < this.m_vertexCount;++i) {
    tVec = this.m_vertices[i];
    var vX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
    var vY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
    lowerX = lowerX < vX ? lowerX : vX;
    lowerY = lowerY < vY ? lowerY : vY;
    upperX = upperX > vX ? upperX : vX;
    upperY = upperY > vY ? upperY : vY
  }
  aabb.lowerBound.x = lowerX - this.m_radius;
  aabb.lowerBound.y = lowerY - this.m_radius;
  aabb.upperBound.x = upperX + this.m_radius;
  aabb.upperBound.y = upperY + this.m_radius
};
b2PolygonShape.prototype.ComputeMass = function(massData, density) {
  if(this.m_vertexCount == 2) {
    massData.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
    massData.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
    massData.mass = 0;
    massData.I = 0;
    return
  }
  var centerX = 0;
  var centerY = 0;
  var area = 0;
  var I = 0;
  var p1X = 0;
  var p1Y = 0;
  var k_inv3 = 1 / 3;
  for(var i = 0;i < this.m_vertexCount;++i) {
    var p2 = this.m_vertices[i];
    var p3 = i + 1 < this.m_vertexCount ? this.m_vertices[parseInt(i + 1)] : this.m_vertices[0];
    var e1X = p2.x - p1X;
    var e1Y = p2.y - p1Y;
    var e2X = p3.x - p1X;
    var e2Y = p3.y - p1Y;
    var D = e1X * e2Y - e1Y * e2X;
    var triangleArea = 0.5 * D;
    area += triangleArea;
    centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
    centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
    var px = p1X;
    var py = p1Y;
    var ex1 = e1X;
    var ey1 = e1Y;
    var ex2 = e2X;
    var ey2 = e2Y;
    var intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
    var inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py;
    I += D * (intx2 + inty2)
  }
  massData.mass = density * area;
  centerX *= 1 / area;
  centerY *= 1 / area;
  massData.center.Set(centerX, centerY);
  massData.I = density * I
};
b2PolygonShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
  var normalL = b2Math.MulTMV(xf.R, normal);
  var offsetL = offset - b2Math.Dot(normal, xf.position);
  var depths = new Array;
  var diveCount = 0;
  var intoIndex = -1;
  var outoIndex = -1;
  var lastSubmerged = false;
  var i = 0;
  for(i = 0;i < this.m_vertexCount;++i) {
    depths[i] = b2Math.Dot(normalL, this.m_vertices[i]) - offsetL;
    var isSubmerged = depths[i] < -Number.MIN_VALUE;
    if(i > 0) {
      if(isSubmerged) {
        if(!lastSubmerged) {
          intoIndex = i - 1;
          diveCount++
        }
      }else {
        if(lastSubmerged) {
          outoIndex = i - 1;
          diveCount++
        }
      }
    }
    lastSubmerged = isSubmerged
  }
  switch(diveCount) {
    case 0:
      if(lastSubmerged) {
        var md = new b2MassData;
        this.ComputeMass(md, 1);
        c.SetV(b2Math.MulX(xf, md.center));
        return md.mass
      }else {
        return 0
      }
      break;
    case 1:
      if(intoIndex == -1) {
        intoIndex = this.m_vertexCount - 1
      }else {
        outoIndex = this.m_vertexCount - 1
      }
      break
  }
  var intoIndex2 = (intoIndex + 1) % this.m_vertexCount;
  var outoIndex2 = (outoIndex + 1) % this.m_vertexCount;
  var intoLamdda = (0 - depths[intoIndex]) / (depths[intoIndex2] - depths[intoIndex]);
  var outoLamdda = (0 - depths[outoIndex]) / (depths[outoIndex2] - depths[outoIndex]);
  var intoVec = new b2Vec2(this.m_vertices[intoIndex].x * (1 - intoLamdda) + this.m_vertices[intoIndex2].x * intoLamdda, this.m_vertices[intoIndex].y * (1 - intoLamdda) + this.m_vertices[intoIndex2].y * intoLamdda);
  var outoVec = new b2Vec2(this.m_vertices[outoIndex].x * (1 - outoLamdda) + this.m_vertices[outoIndex2].x * outoLamdda, this.m_vertices[outoIndex].y * (1 - outoLamdda) + this.m_vertices[outoIndex2].y * outoLamdda);
  var area = 0;
  var center = new b2Vec2;
  var p2 = this.m_vertices[intoIndex2];
  var p3;
  i = intoIndex2;
  while(i != outoIndex2) {
    i = (i + 1) % this.m_vertexCount;
    if(i == outoIndex2) {
      p3 = outoVec
    }else {
      p3 = this.m_vertices[i]
    }
    var triangleArea = 0.5 * ((p2.x - intoVec.x) * (p3.y - intoVec.y) - (p2.y - intoVec.y) * (p3.x - intoVec.x));
    area += triangleArea;
    center.x += triangleArea * (intoVec.x + p2.x + p3.x) / 3;
    center.y += triangleArea * (intoVec.y + p2.y + p3.y) / 3;
    p2 = p3
  }
  center.Multiply(1 / area);
  c.SetV(b2Math.MulX(xf, center));
  return area
};
b2PolygonShape.prototype.GetVertexCount = function() {
  return this.m_vertexCount
};
b2PolygonShape.prototype.GetVertices = function() {
  return this.m_vertices
};
b2PolygonShape.prototype.GetNormals = function() {
  return this.m_normals
};
b2PolygonShape.prototype.GetSupport = function(d) {
  var bestIndex = 0;
  var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
  for(var i = 1;i < this.m_vertexCount;++i) {
    var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
    if(value > bestValue) {
      bestIndex = i;
      bestValue = value
    }
  }
  return bestIndex
};
b2PolygonShape.prototype.GetSupportVertex = function(d) {
  var bestIndex = 0;
  var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
  for(var i = 1;i < this.m_vertexCount;++i) {
    var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
    if(value > bestValue) {
      bestIndex = i;
      bestValue = value
    }
  }
  return this.m_vertices[bestIndex]
};
b2PolygonShape.prototype.m_centroid = null;
b2PolygonShape.prototype.m_vertices = null;
b2PolygonShape.prototype.m_normals = null;
b2PolygonShape.prototype.m_vertexCount = 0;var b2Fixture = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Fixture.prototype.__constructor = function() {
  this.m_aabb = new b2AABB;
  this.m_userData = null;
  this.m_body = null;
  this.m_next = null;
  this.m_shape = null;
  this.m_density = 0;
  this.m_friction = 0;
  this.m_restitution = 0
};
b2Fixture.prototype.__varz = function() {
  this.m_filter = new b2FilterData
};
b2Fixture.prototype.Create = function(body, xf, def) {
  this.m_userData = def.userData;
  this.m_friction = def.friction;
  this.m_restitution = def.restitution;
  this.m_body = body;
  this.m_next = null;
  this.m_filter = def.filter.Copy();
  this.m_isSensor = def.isSensor;
  this.m_shape = def.shape.Copy();
  this.m_density = def.density
};
b2Fixture.prototype.Destroy = function() {
  this.m_shape = null
};
b2Fixture.prototype.CreateProxy = function(broadPhase, xf) {
  this.m_shape.ComputeAABB(this.m_aabb, xf);
  this.m_proxy = broadPhase.CreateProxy(this.m_aabb, this)
};
b2Fixture.prototype.DestroyProxy = function(broadPhase) {
  if(this.m_proxy == null) {
    return
  }
  broadPhase.DestroyProxy(this.m_proxy);
  this.m_proxy = null
};
b2Fixture.prototype.Synchronize = function(broadPhase, transform1, transform2) {
  if(!this.m_proxy) {
    return
  }
  var aabb1 = new b2AABB;
  var aabb2 = new b2AABB;
  this.m_shape.ComputeAABB(aabb1, transform1);
  this.m_shape.ComputeAABB(aabb2, transform2);
  this.m_aabb.Combine(aabb1, aabb2);
  var displacement = b2Math.SubtractVV(transform2.position, transform1.position);
  broadPhase.MoveProxy(this.m_proxy, this.m_aabb, displacement)
};
b2Fixture.prototype.GetType = function() {
  return this.m_shape.GetType()
};
b2Fixture.prototype.GetShape = function() {
  return this.m_shape
};
b2Fixture.prototype.SetSensor = function(sensor) {
  if(this.m_isSensor == sensor) {
    return
  }
  this.m_isSensor = sensor;
  if(this.m_body == null) {
    return
  }
  var edge = this.m_body.GetContactList();
  while(edge) {
    var contact = edge.contact;
    var fixtureA = contact.GetFixtureA();
    var fixtureB = contact.GetFixtureB();
    if(fixtureA == this || fixtureB == this) {
      contact.SetSensor(fixtureA.IsSensor() || fixtureB.IsSensor())
    }
    edge = edge.next
  }
};
b2Fixture.prototype.IsSensor = function() {
  return this.m_isSensor
};
b2Fixture.prototype.SetFilterData = function(filter) {
  this.m_filter = filter.Copy();
  if(this.m_body) {
    return
  }
  var edge = this.m_body.GetContactList();
  while(edge) {
    var contact = edge.contact;
    var fixtureA = contact.GetFixtureA();
    var fixtureB = contact.GetFixtureB();
    if(fixtureA == this || fixtureB == this) {
      contact.FlagForFiltering()
    }
    edge = edge.next
  }
};
b2Fixture.prototype.GetFilterData = function() {
  return this.m_filter.Copy()
};
b2Fixture.prototype.GetBody = function() {
  return this.m_body
};
b2Fixture.prototype.GetNext = function() {
  return this.m_next
};
b2Fixture.prototype.GetUserData = function() {
  return this.m_userData
};
b2Fixture.prototype.SetUserData = function(data) {
  this.m_userData = data
};
b2Fixture.prototype.TestPoint = function(p) {
  return this.m_shape.TestPoint(this.m_body.GetTransform(), p)
};
b2Fixture.prototype.RayCast = function(output, input) {
  return this.m_shape.RayCast(output, input, this.m_body.GetTransform())
};
b2Fixture.prototype.GetMassData = function(massData) {
  if(massData == null) {
    massData = new b2MassData
  }
  this.m_shape.ComputeMass(massData, this.m_density);
  return massData
};
b2Fixture.prototype.SetDensity = function(density) {
  this.m_density = density
};
b2Fixture.prototype.GetDensity = function() {
  return this.m_density
};
b2Fixture.prototype.GetFriction = function() {
  return this.m_friction
};
b2Fixture.prototype.SetFriction = function(friction) {
  this.m_friction = friction
};
b2Fixture.prototype.GetRestitution = function() {
  return this.m_restitution
};
b2Fixture.prototype.SetRestitution = function(restitution) {
  this.m_restitution = restitution
};
b2Fixture.prototype.GetAABB = function() {
  return this.m_aabb
};
b2Fixture.prototype.m_massData = null;
b2Fixture.prototype.m_aabb = null;
b2Fixture.prototype.m_density = null;
b2Fixture.prototype.m_next = null;
b2Fixture.prototype.m_body = null;
b2Fixture.prototype.m_shape = null;
b2Fixture.prototype.m_friction = null;
b2Fixture.prototype.m_restitution = null;
b2Fixture.prototype.m_proxy = null;
b2Fixture.prototype.m_filter = new b2FilterData;
b2Fixture.prototype.m_isSensor = null;
b2Fixture.prototype.m_userData = null;var b2DynamicTreeNode = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DynamicTreeNode.prototype.__constructor = function() {
};
b2DynamicTreeNode.prototype.__varz = function() {
  this.aabb = new b2AABB
};
b2DynamicTreeNode.prototype.IsLeaf = function() {
  return this.child1 == null
};
b2DynamicTreeNode.prototype.userData = null;
b2DynamicTreeNode.prototype.aabb = new b2AABB;
b2DynamicTreeNode.prototype.parent = null;
b2DynamicTreeNode.prototype.child1 = null;
b2DynamicTreeNode.prototype.child2 = null;var b2BodyDef = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2BodyDef.prototype.__constructor = function() {
  this.userData = null;
  this.position.Set(0, 0);
  this.angle = 0;
  this.linearVelocity.Set(0, 0);
  this.angularVelocity = 0;
  this.linearDamping = 0;
  this.angularDamping = 0;
  this.allowSleep = true;
  this.awake = true;
  this.fixedRotation = false;
  this.bullet = false;
  this.type = b2Body.b2_staticBody;
  this.active = true;
  this.inertiaScale = 1
};
b2BodyDef.prototype.__varz = function() {
  this.position = new b2Vec2;
  this.linearVelocity = new b2Vec2
};
b2BodyDef.prototype.type = 0;
b2BodyDef.prototype.position = new b2Vec2;
b2BodyDef.prototype.angle = null;
b2BodyDef.prototype.linearVelocity = new b2Vec2;
b2BodyDef.prototype.angularVelocity = null;
b2BodyDef.prototype.linearDamping = null;
b2BodyDef.prototype.angularDamping = null;
b2BodyDef.prototype.allowSleep = null;
b2BodyDef.prototype.awake = null;
b2BodyDef.prototype.fixedRotation = null;
b2BodyDef.prototype.bullet = null;
b2BodyDef.prototype.active = null;
b2BodyDef.prototype.userData = null;
b2BodyDef.prototype.inertiaScale = null;var b2DynamicTreeBroadPhase = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2DynamicTreeBroadPhase.prototype.__constructor = function() {
};
b2DynamicTreeBroadPhase.prototype.__varz = function() {
  this.m_tree = new b2DynamicTree;
  this.m_moveBuffer = new Array;
  this.m_pairBuffer = new Array
};
b2DynamicTreeBroadPhase.prototype.BufferMove = function(proxy) {
  this.m_moveBuffer[this.m_moveBuffer.length] = proxy
};
b2DynamicTreeBroadPhase.prototype.UnBufferMove = function(proxy) {
  var i = this.m_moveBuffer.indexOf(proxy);
  this.m_moveBuffer.splice(i, 1)
};
b2DynamicTreeBroadPhase.prototype.ComparePairs = function(pair1, pair2) {
  return 0
};
b2DynamicTreeBroadPhase.prototype.CreateProxy = function(aabb, userData) {
  var proxy = this.m_tree.CreateProxy(aabb, userData);
  ++this.m_proxyCount;
  this.BufferMove(proxy);
  return proxy
};
b2DynamicTreeBroadPhase.prototype.DestroyProxy = function(proxy) {
  this.UnBufferMove(proxy);
  --this.m_proxyCount;
  this.m_tree.DestroyProxy(proxy)
};
b2DynamicTreeBroadPhase.prototype.MoveProxy = function(proxy, aabb, displacement) {
  var buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
  if(buffer) {
    this.BufferMove(proxy)
  }
};
b2DynamicTreeBroadPhase.prototype.TestOverlap = function(proxyA, proxyB) {
  var aabbA = this.m_tree.GetFatAABB(proxyA);
  var aabbB = this.m_tree.GetFatAABB(proxyB);
  return aabbA.TestOverlap(aabbB)
};
b2DynamicTreeBroadPhase.prototype.GetUserData = function(proxy) {
  return this.m_tree.GetUserData(proxy)
};
b2DynamicTreeBroadPhase.prototype.GetFatAABB = function(proxy) {
  return this.m_tree.GetFatAABB(proxy)
};
b2DynamicTreeBroadPhase.prototype.GetProxyCount = function() {
  return this.m_proxyCount
};
b2DynamicTreeBroadPhase.prototype.UpdatePairs = function(callback) {
  this.m_pairCount = 0;
  for(var i = 0, queryProxy = null;i < this.m_moveBuffer.length, queryProxy = this.m_moveBuffer[i];i++) {
    var that = this;
    function QueryCallback(proxy) {
      if(proxy == queryProxy) {
        return true
      }
      if(that.m_pairCount == that.m_pairBuffer.length) {
        that.m_pairBuffer[that.m_pairCount] = new b2DynamicTreePair
      }
      var pair = that.m_pairBuffer[that.m_pairCount];
      pair.proxyA = proxy < queryProxy ? proxy : queryProxy;
      pair.proxyB = proxy >= queryProxy ? proxy : queryProxy;
      ++that.m_pairCount;
      return true
    }
    var fatAABB = this.m_tree.GetFatAABB(queryProxy);
    this.m_tree.Query(QueryCallback, fatAABB)
  }
  this.m_moveBuffer.length = 0;
  for(var i = 0;i < this.m_pairCount;) {
    var primaryPair = this.m_pairBuffer[i];
    var userDataA = this.m_tree.GetUserData(primaryPair.proxyA);
    var userDataB = this.m_tree.GetUserData(primaryPair.proxyB);
    callback(userDataA, userDataB);
    ++i;
    while(i < this.m_pairCount) {
      var pair = this.m_pairBuffer[i];
      if(pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) {
        break
      }
      ++i
    }
  }
};
b2DynamicTreeBroadPhase.prototype.Query = function(callback, aabb) {
  this.m_tree.Query(callback, aabb)
};
b2DynamicTreeBroadPhase.prototype.RayCast = function(callback, input) {
  this.m_tree.RayCast(callback, input)
};
b2DynamicTreeBroadPhase.prototype.Validate = function() {
};
b2DynamicTreeBroadPhase.prototype.Rebalance = function(iterations) {
  this.m_tree.Rebalance(iterations)
};
b2DynamicTreeBroadPhase.prototype.m_tree = new b2DynamicTree;
b2DynamicTreeBroadPhase.prototype.m_proxyCount = 0;
b2DynamicTreeBroadPhase.prototype.m_moveBuffer = new Array;
b2DynamicTreeBroadPhase.prototype.m_pairBuffer = new Array;
b2DynamicTreeBroadPhase.prototype.m_pairCount = 0;var b2BroadPhase = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2BroadPhase.prototype.__constructor = function(worldAABB) {
  var i = 0;
  this.m_pairManager.Initialize(this);
  this.m_worldAABB = worldAABB;
  this.m_proxyCount = 0;
  this.m_bounds = new Array;
  for(i = 0;i < 2;i++) {
    this.m_bounds[i] = new Array
  }
  var dX = worldAABB.upperBound.x - worldAABB.lowerBound.x;
  var dY = worldAABB.upperBound.y - worldAABB.lowerBound.y;
  this.m_quantizationFactor.x = b2Settings.USHRT_MAX / dX;
  this.m_quantizationFactor.y = b2Settings.USHRT_MAX / dY;
  this.m_timeStamp = 1;
  this.m_queryResultCount = 0
};
b2BroadPhase.prototype.__varz = function() {
  this.m_pairManager = new b2PairManager;
  this.m_proxyPool = new Array;
  this.m_querySortKeys = new Array;
  this.m_queryResults = new Array;
  this.m_quantizationFactor = new b2Vec2
};
b2BroadPhase.BinarySearch = function(bounds, count, value) {
  var low = 0;
  var high = count - 1;
  while(low <= high) {
    var mid = Math.round((low + high) / 2);
    var bound = bounds[mid];
    if(bound.value > value) {
      high = mid - 1
    }else {
      if(bound.value < value) {
        low = mid + 1
      }else {
        return parseInt(mid)
      }
    }
  }
  return parseInt(low)
};
b2BroadPhase.s_validate = false;
b2BroadPhase.b2_invalid = b2Settings.USHRT_MAX;
b2BroadPhase.b2_nullEdge = b2Settings.USHRT_MAX;
b2BroadPhase.prototype.ComputeBounds = function(lowerValues, upperValues, aabb) {
  var minVertexX = aabb.lowerBound.x;
  var minVertexY = aabb.lowerBound.y;
  minVertexX = b2Math.Min(minVertexX, this.m_worldAABB.upperBound.x);
  minVertexY = b2Math.Min(minVertexY, this.m_worldAABB.upperBound.y);
  minVertexX = b2Math.Max(minVertexX, this.m_worldAABB.lowerBound.x);
  minVertexY = b2Math.Max(minVertexY, this.m_worldAABB.lowerBound.y);
  var maxVertexX = aabb.upperBound.x;
  var maxVertexY = aabb.upperBound.y;
  maxVertexX = b2Math.Min(maxVertexX, this.m_worldAABB.upperBound.x);
  maxVertexY = b2Math.Min(maxVertexY, this.m_worldAABB.upperBound.y);
  maxVertexX = b2Math.Max(maxVertexX, this.m_worldAABB.lowerBound.x);
  maxVertexY = b2Math.Max(maxVertexY, this.m_worldAABB.lowerBound.y);
  lowerValues[0] = parseInt(this.m_quantizationFactor.x * (minVertexX - this.m_worldAABB.lowerBound.x)) & b2Settings.USHRT_MAX - 1;
  upperValues[0] = parseInt(this.m_quantizationFactor.x * (maxVertexX - this.m_worldAABB.lowerBound.x)) % 65535 | 1;
  lowerValues[1] = parseInt(this.m_quantizationFactor.y * (minVertexY - this.m_worldAABB.lowerBound.y)) & b2Settings.USHRT_MAX - 1;
  upperValues[1] = parseInt(this.m_quantizationFactor.y * (maxVertexY - this.m_worldAABB.lowerBound.y)) % 65535 | 1
};
b2BroadPhase.prototype.TestOverlapValidate = function(p1, p2) {
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var bound1 = bounds[p1.lowerBounds[axis]];
    var bound2 = bounds[p2.upperBounds[axis]];
    if(bound1.value > bound2.value) {
      return false
    }
    bound1 = bounds[p1.upperBounds[axis]];
    bound2 = bounds[p2.lowerBounds[axis]];
    if(bound1.value < bound2.value) {
      return false
    }
  }
  return true
};
b2BroadPhase.prototype.QueryAxis = function(lowerQueryOut, upperQueryOut, lowerValue, upperValue, bounds, boundCount, axis) {
  var lowerQuery = b2BroadPhase.BinarySearch(bounds, boundCount, lowerValue);
  var upperQuery = b2BroadPhase.BinarySearch(bounds, boundCount, upperValue);
  var bound;
  for(var j = lowerQuery;j < upperQuery;++j) {
    bound = bounds[j];
    if(bound.IsLower()) {
      this.IncrementOverlapCount(bound.proxy)
    }
  }
  if(lowerQuery > 0) {
    var i = lowerQuery - 1;
    bound = bounds[i];
    var s = bound.stabbingCount;
    while(s) {
      bound = bounds[i];
      if(bound.IsLower()) {
        var proxy = bound.proxy;
        if(lowerQuery <= proxy.upperBounds[axis]) {
          this.IncrementOverlapCount(bound.proxy);
          --s
        }
      }
      --i
    }
  }
  lowerQueryOut[0] = lowerQuery;
  upperQueryOut[0] = upperQuery
};
b2BroadPhase.prototype.IncrementOverlapCount = function(proxy) {
  if(proxy.timeStamp < this.m_timeStamp) {
    proxy.timeStamp = this.m_timeStamp;
    proxy.overlapCount = 1
  }else {
    proxy.overlapCount = 2;
    this.m_queryResults[this.m_queryResultCount] = proxy;
    ++this.m_queryResultCount
  }
};
b2BroadPhase.prototype.IncrementTimeStamp = function() {
  if(this.m_timeStamp == b2Settings.USHRT_MAX) {
    for(var i = 0;i < this.m_proxyPool.length;++i) {
      this.m_proxyPool[i].timeStamp = 0
    }
    this.m_timeStamp = 1
  }else {
    ++this.m_timeStamp
  }
};
b2BroadPhase.prototype.InRange = function(aabb) {
  var dX;
  var dY;
  var d2X;
  var d2Y;
  dX = aabb.lowerBound.x;
  dY = aabb.lowerBound.y;
  dX -= this.m_worldAABB.upperBound.x;
  dY -= this.m_worldAABB.upperBound.y;
  d2X = this.m_worldAABB.lowerBound.x;
  d2Y = this.m_worldAABB.lowerBound.y;
  d2X -= aabb.upperBound.x;
  d2Y -= aabb.upperBound.y;
  dX = b2Math.Max(dX, d2X);
  dY = b2Math.Max(dY, d2Y);
  return b2Math.Max(dX, dY) < 0
};
b2BroadPhase.prototype.CreateProxy = function(aabb, userData) {
  var index = 0;
  var proxy;
  var i = 0;
  var j = 0;
  if(!this.m_freeProxy) {
    this.m_freeProxy = this.m_proxyPool[this.m_proxyCount] = new b2Proxy;
    this.m_freeProxy.next = null;
    this.m_freeProxy.timeStamp = 0;
    this.m_freeProxy.overlapCount = b2BroadPhase.b2_invalid;
    this.m_freeProxy.userData = null;
    for(i = 0;i < 2;i++) {
      j = this.m_proxyCount * 2;
      this.m_bounds[i][j++] = new b2Bound;
      this.m_bounds[i][j] = new b2Bound
    }
  }
  proxy = this.m_freeProxy;
  this.m_freeProxy = proxy.next;
  proxy.overlapCount = 0;
  proxy.userData = userData;
  var boundCount = 2 * this.m_proxyCount;
  var lowerValues = new Array;
  var upperValues = new Array;
  this.ComputeBounds(lowerValues, upperValues, aabb);
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var lowerIndex = 0;
    var upperIndex = 0;
    var lowerIndexOut = new Array;
    lowerIndexOut.push(lowerIndex);
    var upperIndexOut = new Array;
    upperIndexOut.push(upperIndex);
    this.QueryAxis(lowerIndexOut, upperIndexOut, lowerValues[axis], upperValues[axis], bounds, boundCount, axis);
    lowerIndex = lowerIndexOut[0];
    upperIndex = upperIndexOut[0];
    bounds.splice(upperIndex, 0, bounds[bounds.length - 1]);
    bounds.length--;
    bounds.splice(lowerIndex, 0, bounds[bounds.length - 1]);
    bounds.length--;
    ++upperIndex;
    var tBound1 = bounds[lowerIndex];
    var tBound2 = bounds[upperIndex];
    tBound1.value = lowerValues[axis];
    tBound1.proxy = proxy;
    tBound2.value = upperValues[axis];
    tBound2.proxy = proxy;
    var tBoundAS3 = bounds[parseInt(lowerIndex - 1)];
    tBound1.stabbingCount = lowerIndex == 0 ? 0 : tBoundAS3.stabbingCount;
    tBoundAS3 = bounds[parseInt(upperIndex - 1)];
    tBound2.stabbingCount = tBoundAS3.stabbingCount;
    for(index = lowerIndex;index < upperIndex;++index) {
      tBoundAS3 = bounds[index];
      tBoundAS3.stabbingCount++
    }
    for(index = lowerIndex;index < boundCount + 2;++index) {
      tBound1 = bounds[index];
      var proxy2 = tBound1.proxy;
      if(tBound1.IsLower()) {
        proxy2.lowerBounds[axis] = index
      }else {
        proxy2.upperBounds[axis] = index
      }
    }
  }
  ++this.m_proxyCount;
  for(i = 0;i < this.m_queryResultCount;++i) {
    this.m_pairManager.AddBufferedPair(proxy, this.m_queryResults[i])
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  return proxy
};
b2BroadPhase.prototype.DestroyProxy = function(proxy_) {
  var proxy = proxy_;
  var tBound1;
  var tBound2;
  var boundCount = 2 * this.m_proxyCount;
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var lowerIndex = proxy.lowerBounds[axis];
    var upperIndex = proxy.upperBounds[axis];
    tBound1 = bounds[lowerIndex];
    var lowerValue = tBound1.value;
    tBound2 = bounds[upperIndex];
    var upperValue = tBound2.value;
    bounds.splice(upperIndex, 1);
    bounds.splice(lowerIndex, 1);
    bounds.push(tBound1);
    bounds.push(tBound2);
    var tEnd = boundCount - 2;
    for(var index = lowerIndex;index < tEnd;++index) {
      tBound1 = bounds[index];
      var proxy2 = tBound1.proxy;
      if(tBound1.IsLower()) {
        proxy2.lowerBounds[axis] = index
      }else {
        proxy2.upperBounds[axis] = index
      }
    }
    tEnd = upperIndex - 1;
    for(var index2 = lowerIndex;index2 < tEnd;++index2) {
      tBound1 = bounds[index2];
      tBound1.stabbingCount--
    }
    var ignore = new Array;
    this.QueryAxis(ignore, ignore, lowerValue, upperValue, bounds, boundCount - 2, axis)
  }
  for(var i = 0;i < this.m_queryResultCount;++i) {
    this.m_pairManager.RemoveBufferedPair(proxy, this.m_queryResults[i])
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  proxy.userData = null;
  proxy.overlapCount = b2BroadPhase.b2_invalid;
  proxy.lowerBounds[0] = b2BroadPhase.b2_invalid;
  proxy.lowerBounds[1] = b2BroadPhase.b2_invalid;
  proxy.upperBounds[0] = b2BroadPhase.b2_invalid;
  proxy.upperBounds[1] = b2BroadPhase.b2_invalid;
  proxy.next = this.m_freeProxy;
  this.m_freeProxy = proxy;
  --this.m_proxyCount
};
b2BroadPhase.prototype.MoveProxy = function(proxy_, aabb, displacement) {
  var proxy = proxy_;
  var as3arr;
  var as3int = 0;
  var axis = 0;
  var index = 0;
  var bound;
  var prevBound;
  var nextBound;
  var nextProxyId = 0;
  var nextProxy;
  if(proxy == null) {
    return
  }
  if(aabb.IsValid() == false) {
    return
  }
  var boundCount = 2 * this.m_proxyCount;
  var newValues = new b2BoundValues;
  this.ComputeBounds(newValues.lowerValues, newValues.upperValues, aabb);
  var oldValues = new b2BoundValues;
  for(axis = 0;axis < 2;++axis) {
    bound = this.m_bounds[axis][proxy.lowerBounds[axis]];
    oldValues.lowerValues[axis] = bound.value;
    bound = this.m_bounds[axis][proxy.upperBounds[axis]];
    oldValues.upperValues[axis] = bound.value
  }
  for(axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var lowerIndex = proxy.lowerBounds[axis];
    var upperIndex = proxy.upperBounds[axis];
    var lowerValue = newValues.lowerValues[axis];
    var upperValue = newValues.upperValues[axis];
    bound = bounds[lowerIndex];
    var deltaLower = lowerValue - bound.value;
    bound.value = lowerValue;
    bound = bounds[upperIndex];
    var deltaUpper = upperValue - bound.value;
    bound.value = upperValue;
    if(deltaLower < 0) {
      index = lowerIndex;
      while(index > 0 && lowerValue < bounds[parseInt(index - 1)].value) {
        bound = bounds[index];
        prevBound = bounds[parseInt(index - 1)];
        var prevProxy = prevBound.proxy;
        prevBound.stabbingCount++;
        if(prevBound.IsUpper() == true) {
          if(this.TestOverlapBound(newValues, prevProxy)) {
            this.m_pairManager.AddBufferedPair(proxy, prevProxy)
          }
          as3arr = prevProxy.upperBounds;
          as3int = as3arr[axis];
          as3int++;
          as3arr[axis] = as3int;
          bound.stabbingCount++
        }else {
          as3arr = prevProxy.lowerBounds;
          as3int = as3arr[axis];
          as3int++;
          as3arr[axis] = as3int;
          bound.stabbingCount--
        }
        as3arr = proxy.lowerBounds;
        as3int = as3arr[axis];
        as3int--;
        as3arr[axis] = as3int;
        bound.Swap(prevBound);
        --index
      }
    }
    if(deltaUpper > 0) {
      index = upperIndex;
      while(index < boundCount - 1 && bounds[parseInt(index + 1)].value <= upperValue) {
        bound = bounds[index];
        nextBound = bounds[parseInt(index + 1)];
        nextProxy = nextBound.proxy;
        nextBound.stabbingCount++;
        if(nextBound.IsLower() == true) {
          if(this.TestOverlapBound(newValues, nextProxy)) {
            this.m_pairManager.AddBufferedPair(proxy, nextProxy)
          }
          as3arr = nextProxy.lowerBounds;
          as3int = as3arr[axis];
          as3int--;
          as3arr[axis] = as3int;
          bound.stabbingCount++
        }else {
          as3arr = nextProxy.upperBounds;
          as3int = as3arr[axis];
          as3int--;
          as3arr[axis] = as3int;
          bound.stabbingCount--
        }
        as3arr = proxy.upperBounds;
        as3int = as3arr[axis];
        as3int++;
        as3arr[axis] = as3int;
        bound.Swap(nextBound);
        index++
      }
    }
    if(deltaLower > 0) {
      index = lowerIndex;
      while(index < boundCount - 1 && bounds[parseInt(index + 1)].value <= lowerValue) {
        bound = bounds[index];
        nextBound = bounds[parseInt(index + 1)];
        nextProxy = nextBound.proxy;
        nextBound.stabbingCount--;
        if(nextBound.IsUpper()) {
          if(this.TestOverlapBound(oldValues, nextProxy)) {
            this.m_pairManager.RemoveBufferedPair(proxy, nextProxy)
          }
          as3arr = nextProxy.upperBounds;
          as3int = as3arr[axis];
          as3int--;
          as3arr[axis] = as3int;
          bound.stabbingCount--
        }else {
          as3arr = nextProxy.lowerBounds;
          as3int = as3arr[axis];
          as3int--;
          as3arr[axis] = as3int;
          bound.stabbingCount++
        }
        as3arr = proxy.lowerBounds;
        as3int = as3arr[axis];
        as3int++;
        as3arr[axis] = as3int;
        bound.Swap(nextBound);
        index++
      }
    }
    if(deltaUpper < 0) {
      index = upperIndex;
      while(index > 0 && upperValue < bounds[parseInt(index - 1)].value) {
        bound = bounds[index];
        prevBound = bounds[parseInt(index - 1)];
        prevProxy = prevBound.proxy;
        prevBound.stabbingCount--;
        if(prevBound.IsLower() == true) {
          if(this.TestOverlapBound(oldValues, prevProxy)) {
            this.m_pairManager.RemoveBufferedPair(proxy, prevProxy)
          }
          as3arr = prevProxy.lowerBounds;
          as3int = as3arr[axis];
          as3int++;
          as3arr[axis] = as3int;
          bound.stabbingCount--
        }else {
          as3arr = prevProxy.upperBounds;
          as3int = as3arr[axis];
          as3int++;
          as3arr[axis] = as3int;
          bound.stabbingCount++
        }
        as3arr = proxy.upperBounds;
        as3int = as3arr[axis];
        as3int--;
        as3arr[axis] = as3int;
        bound.Swap(prevBound);
        index--
      }
    }
  }
};
b2BroadPhase.prototype.UpdatePairs = function(callback) {
  this.m_pairManager.Commit(callback)
};
b2BroadPhase.prototype.TestOverlap = function(proxyA, proxyB) {
  var proxyA_ = proxyA;
  var proxyB_ = proxyB;
  if(proxyA_.lowerBounds[0] > proxyB_.upperBounds[0]) {
    return false
  }
  if(proxyB_.lowerBounds[0] > proxyA_.upperBounds[0]) {
    return false
  }
  if(proxyA_.lowerBounds[1] > proxyB_.upperBounds[1]) {
    return false
  }
  if(proxyB_.lowerBounds[1] > proxyA_.upperBounds[1]) {
    return false
  }
  return true
};
b2BroadPhase.prototype.GetUserData = function(proxy) {
  return proxy.userData
};
b2BroadPhase.prototype.GetFatAABB = function(proxy_) {
  var aabb = new b2AABB;
  var proxy = proxy_;
  aabb.lowerBound.x = this.m_worldAABB.lowerBound.x + this.m_bounds[0][proxy.lowerBounds[0]].value / this.m_quantizationFactor.x;
  aabb.lowerBound.y = this.m_worldAABB.lowerBound.y + this.m_bounds[1][proxy.lowerBounds[1]].value / this.m_quantizationFactor.y;
  aabb.upperBound.x = this.m_worldAABB.lowerBound.x + this.m_bounds[0][proxy.upperBounds[0]].value / this.m_quantizationFactor.x;
  aabb.upperBound.y = this.m_worldAABB.lowerBound.y + this.m_bounds[1][proxy.upperBounds[1]].value / this.m_quantizationFactor.y;
  return aabb
};
b2BroadPhase.prototype.GetProxyCount = function() {
  return this.m_proxyCount
};
b2BroadPhase.prototype.Query = function(callback, aabb) {
  var lowerValues = new Array;
  var upperValues = new Array;
  this.ComputeBounds(lowerValues, upperValues, aabb);
  var lowerIndex = 0;
  var upperIndex = 0;
  var lowerIndexOut = new Array;
  lowerIndexOut.push(lowerIndex);
  var upperIndexOut = new Array;
  upperIndexOut.push(upperIndex);
  this.QueryAxis(lowerIndexOut, upperIndexOut, lowerValues[0], upperValues[0], this.m_bounds[0], 2 * this.m_proxyCount, 0);
  this.QueryAxis(lowerIndexOut, upperIndexOut, lowerValues[1], upperValues[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
  for(var i = 0;i < this.m_queryResultCount;++i) {
    var proxy = this.m_queryResults[i];
    if(!callback(proxy)) {
      break
    }
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp()
};
b2BroadPhase.prototype.Validate = function() {
  var pair;
  var proxy1;
  var proxy2;
  var overlap;
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var boundCount = 2 * this.m_proxyCount;
    var stabbingCount = 0;
    for(var i = 0;i < boundCount;++i) {
      var bound = bounds[i];
      if(bound.IsLower() == true) {
        stabbingCount++
      }else {
        stabbingCount--
      }
    }
  }
};
b2BroadPhase.prototype.Rebalance = function(iterations) {
};
b2BroadPhase.prototype.RayCast = function(callback, input) {
  var subInput = new b2RayCastInput;
  subInput.p1.SetV(input.p1);
  subInput.p2.SetV(input.p2);
  subInput.maxFraction = input.maxFraction;
  var dx = (input.p2.x - input.p1.x) * this.m_quantizationFactor.x;
  var dy = (input.p2.y - input.p1.y) * this.m_quantizationFactor.y;
  var sx = dx < -Number.MIN_VALUE ? -1 : dx > Number.MIN_VALUE ? 1 : 0;
  var sy = dy < -Number.MIN_VALUE ? -1 : dy > Number.MIN_VALUE ? 1 : 0;
  var p1x = this.m_quantizationFactor.x * (input.p1.x - this.m_worldAABB.lowerBound.x);
  var p1y = this.m_quantizationFactor.y * (input.p1.y - this.m_worldAABB.lowerBound.y);
  var startValues = new Array;
  var startValues2 = new Array;
  startValues[0] = parseInt(p1x) & b2Settings.USHRT_MAX - 1;
  startValues[1] = parseInt(p1y) & b2Settings.USHRT_MAX - 1;
  startValues2[0] = startValues[0] + 1;
  startValues2[1] = startValues[1] + 1;
  var startIndices = new Array;
  var xIndex = 0;
  var yIndex = 0;
  var proxy;
  var lowerIndex = 0;
  var upperIndex = 0;
  var lowerIndexOut = new Array;
  lowerIndexOut.push(lowerIndex);
  var upperIndexOut = new Array;
  upperIndexOut.push(upperIndex);
  this.QueryAxis(lowerIndexOut, upperIndexOut, startValues[0], startValues2[0], this.m_bounds[0], 2 * this.m_proxyCount, 0);
  if(sx >= 0) {
    xIndex = upperIndexOut[0] - 1
  }else {
    xIndex = lowerIndexOut[0]
  }
  this.QueryAxis(lowerIndexOut, upperIndexOut, startValues[1], startValues2[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
  if(sy >= 0) {
    yIndex = upperIndexOut[0] - 1
  }else {
    yIndex = lowerIndexOut[0]
  }
  for(var i = 0;i < this.m_queryResultCount;i++) {
    subInput.maxFraction = callback(this.m_queryResults[i], subInput)
  }
  for(;;) {
    var xProgress = 0;
    var yProgress = 0;
    xIndex += sx >= 0 ? 1 : -1;
    if(xIndex < 0 || xIndex >= this.m_proxyCount * 2) {
      break
    }
    if(sx != 0) {
      xProgress = (this.m_bounds[0][xIndex].value - p1x) / dx
    }
    yIndex += sy >= 0 ? 1 : -1;
    if(yIndex < 0 || yIndex >= this.m_proxyCount * 2) {
      break
    }
    if(sy != 0) {
      yProgress = (this.m_bounds[1][yIndex].value - p1y) / dy
    }
    for(;;) {
      if(sy == 0 || sx != 0 && xProgress < yProgress) {
        if(xProgress > subInput.maxFraction) {
          break
        }
        if(sx > 0 ? this.m_bounds[0][xIndex].IsLower() : this.m_bounds[0][xIndex].IsUpper()) {
          proxy = this.m_bounds[0][xIndex].proxy;
          if(sy >= 0) {
            if(proxy.lowerBounds[1] <= yIndex - 1 && proxy.upperBounds[1] >= yIndex) {
              subInput.maxFraction = callback(proxy, subInput)
            }
          }else {
            if(proxy.lowerBounds[1] <= yIndex && proxy.upperBounds[1] >= yIndex + 1) {
              subInput.maxFraction = callback(proxy, subInput)
            }
          }
        }
        if(subInput.maxFraction == 0) {
          break
        }
        if(sx > 0) {
          xIndex++;
          if(xIndex == this.m_proxyCount * 2) {
            break
          }
        }else {
          xIndex--;
          if(xIndex < 0) {
            break
          }
        }
        xProgress = (this.m_bounds[0][xIndex].value - p1x) / dx
      }else {
        if(yProgress > subInput.maxFraction) {
          break
        }
        if(sy > 0 ? this.m_bounds[1][yIndex].IsLower() : this.m_bounds[1][yIndex].IsUpper()) {
          proxy = this.m_bounds[1][yIndex].proxy;
          if(sx >= 0) {
            if(proxy.lowerBounds[0] <= xIndex - 1 && proxy.upperBounds[0] >= xIndex) {
              subInput.maxFraction = callback(proxy, subInput)
            }
          }else {
            if(proxy.lowerBounds[0] <= xIndex && proxy.upperBounds[0] >= xIndex + 1) {
              subInput.maxFraction = callback(proxy, subInput)
            }
          }
        }
        if(subInput.maxFraction == 0) {
          break
        }
        if(sy > 0) {
          yIndex++;
          if(yIndex == this.m_proxyCount * 2) {
            break
          }
        }else {
          yIndex--;
          if(yIndex < 0) {
            break
          }
        }
        yProgress = (this.m_bounds[1][yIndex].value - p1y) / dy
      }
    }
    break
  }
  this.m_queryResultCount = 0;
  this.IncrementTimeStamp();
  return
};
b2BroadPhase.prototype.TestOverlapBound = function(b, p) {
  for(var axis = 0;axis < 2;++axis) {
    var bounds = this.m_bounds[axis];
    var bound = bounds[p.upperBounds[axis]];
    if(b.lowerValues[axis] > bound.value) {
      return false
    }
    bound = bounds[p.lowerBounds[axis]];
    if(b.upperValues[axis] < bound.value) {
      return false
    }
  }
  return true
};
b2BroadPhase.prototype.m_pairManager = new b2PairManager;
b2BroadPhase.prototype.m_proxyPool = new Array;
b2BroadPhase.prototype.m_freeProxy = null;
b2BroadPhase.prototype.m_bounds = null;
b2BroadPhase.prototype.m_querySortKeys = new Array;
b2BroadPhase.prototype.m_queryResults = new Array;
b2BroadPhase.prototype.m_queryResultCount = 0;
b2BroadPhase.prototype.m_worldAABB = null;
b2BroadPhase.prototype.m_quantizationFactor = new b2Vec2;
b2BroadPhase.prototype.m_proxyCount = 0;
b2BroadPhase.prototype.m_timeStamp = 0;var b2Manifold = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Manifold.prototype.__constructor = function() {
  this.m_points = new Array(b2Settings.b2_maxManifoldPoints);
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i] = new b2ManifoldPoint
  }
  this.m_localPlaneNormal = new b2Vec2;
  this.m_localPoint = new b2Vec2
};
b2Manifold.prototype.__varz = function() {
};
b2Manifold.e_circles = 1;
b2Manifold.e_faceA = 2;
b2Manifold.e_faceB = 4;
b2Manifold.prototype.Reset = function() {
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i].Reset()
  }
  this.m_localPlaneNormal.SetZero();
  this.m_localPoint.SetZero();
  this.m_type = 0;
  this.m_pointCount = 0
};
b2Manifold.prototype.Set = function(m) {
  this.m_pointCount = m.m_pointCount;
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.m_points[i].Set(m.m_points[i])
  }
  this.m_localPlaneNormal.SetV(m.m_localPlaneNormal);
  this.m_localPoint.SetV(m.m_localPoint);
  this.m_type = m.m_type
};
b2Manifold.prototype.Copy = function() {
  var copy = new b2Manifold;
  copy.Set(this);
  return copy
};
b2Manifold.prototype.m_points = null;
b2Manifold.prototype.m_localPlaneNormal = null;
b2Manifold.prototype.m_localPoint = null;
b2Manifold.prototype.m_type = 0;
b2Manifold.prototype.m_pointCount = 0;var b2CircleShape = function() {
  b2Shape.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2CircleShape.prototype, b2Shape.prototype);
b2CircleShape.prototype._super = b2Shape.prototype;
b2CircleShape.prototype.__constructor = function(radius) {
  this._super.__constructor.apply(this, []);
  this.m_type = b2Shape.e_circleShape;
  this.m_radius = radius
};
b2CircleShape.prototype.__varz = function() {
  this.m_p = new b2Vec2
};
b2CircleShape.prototype.Copy = function() {
  var s = new b2CircleShape;
  s.Set(this);
  return s
};
b2CircleShape.prototype.Set = function(other) {
  this._super.Set.apply(this, [other]);
  if(isInstanceOf(other, b2CircleShape)) {
    var other2 = other;
    this.m_p.SetV(other2.m_p)
  }
};
b2CircleShape.prototype.TestPoint = function(transform, p) {
  var tMat = transform.R;
  var dX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
  var dY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
  dX = p.x - dX;
  dY = p.y - dY;
  return dX * dX + dY * dY <= this.m_radius * this.m_radius
};
b2CircleShape.prototype.RayCast = function(output, input, transform) {
  var tMat = transform.R;
  var positionX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
  var positionY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
  var sX = input.p1.x - positionX;
  var sY = input.p1.y - positionY;
  var b = sX * sX + sY * sY - this.m_radius * this.m_radius;
  var rX = input.p2.x - input.p1.x;
  var rY = input.p2.y - input.p1.y;
  var c = sX * rX + sY * rY;
  var rr = rX * rX + rY * rY;
  var sigma = c * c - rr * b;
  if(sigma < 0 || rr < Number.MIN_VALUE) {
    return false
  }
  var a = -(c + Math.sqrt(sigma));
  if(0 <= a && a <= input.maxFraction * rr) {
    a /= rr;
    output.fraction = a;
    output.normal.x = sX + a * rX;
    output.normal.y = sY + a * rY;
    output.normal.Normalize();
    return true
  }
  return false
};
b2CircleShape.prototype.ComputeAABB = function(aabb, transform) {
  var tMat = transform.R;
  var pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
  var pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
  aabb.lowerBound.Set(pX - this.m_radius, pY - this.m_radius);
  aabb.upperBound.Set(pX + this.m_radius, pY + this.m_radius)
};
b2CircleShape.prototype.ComputeMass = function(massData, density) {
  massData.mass = density * b2Settings.b2_pi * this.m_radius * this.m_radius;
  massData.center.SetV(this.m_p);
  massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
};
b2CircleShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
  var p = b2Math.MulX(xf, this.m_p);
  var l = -(b2Math.Dot(normal, p) - offset);
  if(l < -this.m_radius + Number.MIN_VALUE) {
    return 0
  }
  if(l > this.m_radius) {
    c.SetV(p);
    return Math.PI * this.m_radius * this.m_radius
  }
  var r2 = this.m_radius * this.m_radius;
  var l2 = l * l;
  var area = r2 * (Math.asin(l / this.m_radius) + Math.PI / 2) + l * Math.sqrt(r2 - l2);
  var com = -2 / 3 * Math.pow(r2 - l2, 1.5) / area;
  c.x = p.x + normal.x * com;
  c.y = p.y + normal.y * com;
  return area
};
b2CircleShape.prototype.GetLocalPosition = function() {
  return this.m_p
};
b2CircleShape.prototype.SetLocalPosition = function(position) {
  this.m_p.SetV(position)
};
b2CircleShape.prototype.GetRadius = function() {
  return this.m_radius
};
b2CircleShape.prototype.SetRadius = function(radius) {
  this.m_radius = radius
};
b2CircleShape.prototype.m_p = new b2Vec2;var b2Joint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Joint.prototype.__constructor = function(def) {
  b2Settings.b2Assert(def.bodyA != def.bodyB);
  this.m_type = def.type;
  this.m_prev = null;
  this.m_next = null;
  this.m_bodyA = def.bodyA;
  this.m_bodyB = def.bodyB;
  this.m_collideConnected = def.collideConnected;
  this.m_islandFlag = false;
  this.m_userData = def.userData
};
b2Joint.prototype.__varz = function() {
  this.m_edgeA = new b2JointEdge;
  this.m_edgeB = new b2JointEdge;
  this.m_localCenterA = new b2Vec2;
  this.m_localCenterB = new b2Vec2
};
b2Joint.Create = function(def, allocator) {
  var joint = null;
  switch(def.type) {
    case b2Joint.e_distanceJoint:
      joint = new b2DistanceJoint(def);
      break;
    case b2Joint.e_mouseJoint:
      joint = new b2MouseJoint(def);
      break;
    case b2Joint.e_prismaticJoint:
      joint = new b2PrismaticJoint(def);
      break;
    case b2Joint.e_revoluteJoint:
      joint = new b2RevoluteJoint(def);
      break;
    case b2Joint.e_pulleyJoint:
      joint = new b2PulleyJoint(def);
      break;
    case b2Joint.e_gearJoint:
      joint = new b2GearJoint(def);
      break;
    case b2Joint.e_lineJoint:
      joint = new b2LineJoint(def);
      break;
    case b2Joint.e_weldJoint:
      joint = new b2WeldJoint(def);
      break;
    case b2Joint.e_frictionJoint:
      joint = new b2FrictionJoint(def);
      break;
    default:
      break
  }
  return joint
};
b2Joint.Destroy = function(joint, allocator) {
};
b2Joint.e_unknownJoint = 0;
b2Joint.e_revoluteJoint = 1;
b2Joint.e_prismaticJoint = 2;
b2Joint.e_distanceJoint = 3;
b2Joint.e_pulleyJoint = 4;
b2Joint.e_mouseJoint = 5;
b2Joint.e_gearJoint = 6;
b2Joint.e_lineJoint = 7;
b2Joint.e_weldJoint = 8;
b2Joint.e_frictionJoint = 9;
b2Joint.e_inactiveLimit = 0;
b2Joint.e_atLowerLimit = 1;
b2Joint.e_atUpperLimit = 2;
b2Joint.e_equalLimits = 3;
b2Joint.prototype.InitVelocityConstraints = function(step) {
};
b2Joint.prototype.SolveVelocityConstraints = function(step) {
};
b2Joint.prototype.FinalizeVelocityConstraints = function() {
};
b2Joint.prototype.SolvePositionConstraints = function(baumgarte) {
  return false
};
b2Joint.prototype.GetType = function() {
  return this.m_type
};
b2Joint.prototype.GetAnchorA = function() {
  return null
};
b2Joint.prototype.GetAnchorB = function() {
  return null
};
b2Joint.prototype.GetReactionForce = function(inv_dt) {
  return null
};
b2Joint.prototype.GetReactionTorque = function(inv_dt) {
  return 0
};
b2Joint.prototype.GetBodyA = function() {
  return this.m_bodyA
};
b2Joint.prototype.GetBodyB = function() {
  return this.m_bodyB
};
b2Joint.prototype.GetNext = function() {
  return this.m_next
};
b2Joint.prototype.GetUserData = function() {
  return this.m_userData
};
b2Joint.prototype.SetUserData = function(data) {
  this.m_userData = data
};
b2Joint.prototype.IsActive = function() {
  return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
};
b2Joint.prototype.m_type = 0;
b2Joint.prototype.m_prev = null;
b2Joint.prototype.m_next = null;
b2Joint.prototype.m_edgeA = new b2JointEdge;
b2Joint.prototype.m_edgeB = new b2JointEdge;
b2Joint.prototype.m_bodyA = null;
b2Joint.prototype.m_bodyB = null;
b2Joint.prototype.m_islandFlag = null;
b2Joint.prototype.m_collideConnected = null;
b2Joint.prototype.m_userData = null;
b2Joint.prototype.m_localCenterA = new b2Vec2;
b2Joint.prototype.m_localCenterB = new b2Vec2;
b2Joint.prototype.m_invMassA = null;
b2Joint.prototype.m_invMassB = null;
b2Joint.prototype.m_invIA = null;
b2Joint.prototype.m_invIB = null;var b2LineJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2LineJoint.prototype, b2Joint.prototype);
b2LineJoint.prototype._super = b2Joint.prototype;
b2LineJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var tMat;
  var tX;
  var tY;
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_localXAxis1.SetV(def.localAxisA);
  this.m_localYAxis1.x = -this.m_localXAxis1.y;
  this.m_localYAxis1.y = this.m_localXAxis1.x;
  this.m_impulse.SetZero();
  this.m_motorMass = 0;
  this.m_motorImpulse = 0;
  this.m_lowerTranslation = def.lowerTranslation;
  this.m_upperTranslation = def.upperTranslation;
  this.m_maxMotorForce = def.maxMotorForce;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableLimit = def.enableLimit;
  this.m_enableMotor = def.enableMotor;
  this.m_limitState = b2Joint.e_inactiveLimit;
  this.m_axis.SetZero();
  this.m_perp.SetZero()
};
b2LineJoint.prototype.__varz = function() {
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_localXAxis1 = new b2Vec2;
  this.m_localYAxis1 = new b2Vec2;
  this.m_axis = new b2Vec2;
  this.m_perp = new b2Vec2;
  this.m_K = new b2Mat22;
  this.m_impulse = new b2Vec2
};
b2LineJoint.prototype.InitVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var tX;
  this.m_localCenterA.SetV(bA.GetLocalCenter());
  this.m_localCenterB.SetV(bB.GetLocalCenter());
  var xf1 = bA.GetTransform();
  var xf2 = bB.GetTransform();
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
  var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
  var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  this.m_invMassA = bA.m_invMass;
  this.m_invMassB = bB.m_invMass;
  this.m_invIA = bA.m_invI;
  this.m_invIB = bB.m_invI;
  this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
  this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
  this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
  this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
  this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
  this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
  this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
  this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
  var m1 = this.m_invMassA;
  var m2 = this.m_invMassB;
  var i1 = this.m_invIA;
  var i2 = this.m_invIB;
  this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
  this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
  this.m_K.col2.x = this.m_K.col1.y;
  this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
  if(this.m_enableLimit) {
    var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
    if(b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
      this.m_limitState = b2Joint.e_equalLimits
    }else {
      if(jointTransition <= this.m_lowerTranslation) {
        if(this.m_limitState != b2Joint.e_atLowerLimit) {
          this.m_limitState = b2Joint.e_atLowerLimit;
          this.m_impulse.y = 0
        }
      }else {
        if(jointTransition >= this.m_upperTranslation) {
          if(this.m_limitState != b2Joint.e_atUpperLimit) {
            this.m_limitState = b2Joint.e_atUpperLimit;
            this.m_impulse.y = 0
          }
        }else {
          this.m_limitState = b2Joint.e_inactiveLimit;
          this.m_impulse.y = 0
        }
      }
    }
  }else {
    this.m_limitState = b2Joint.e_inactiveLimit
  }
  if(this.m_enableMotor == false) {
    this.m_motorImpulse = 0
  }
  if(step.warmStarting) {
    this.m_impulse.x *= step.dtRatio;
    this.m_impulse.y *= step.dtRatio;
    this.m_motorImpulse *= step.dtRatio;
    var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
    var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
    var L1 = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
    var L2 = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
    bA.m_linearVelocity.x -= this.m_invMassA * PX;
    bA.m_linearVelocity.y -= this.m_invMassA * PY;
    bA.m_angularVelocity -= this.m_invIA * L1;
    bB.m_linearVelocity.x += this.m_invMassB * PX;
    bB.m_linearVelocity.y += this.m_invMassB * PY;
    bB.m_angularVelocity += this.m_invIB * L2
  }else {
    this.m_impulse.SetZero();
    this.m_motorImpulse = 0
  }
};
b2LineJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var v1 = bA.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var v2 = bB.m_linearVelocity;
  var w2 = bB.m_angularVelocity;
  var PX;
  var PY;
  var L1;
  var L2;
  if(this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
    var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
    var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
    var oldImpulse = this.m_motorImpulse;
    var maxImpulse = step.dt * this.m_maxMotorForce;
    this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
    impulse = this.m_motorImpulse - oldImpulse;
    PX = impulse * this.m_axis.x;
    PY = impulse * this.m_axis.y;
    L1 = impulse * this.m_a1;
    L2 = impulse * this.m_a2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }
  var Cdot1 = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
  if(this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
    var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
    var f1 = this.m_impulse.Copy();
    var df = this.m_K.Solve(new b2Vec2, -Cdot1, -Cdot2);
    this.m_impulse.Add(df);
    if(this.m_limitState == b2Joint.e_atLowerLimit) {
      this.m_impulse.y = b2Math.Max(this.m_impulse.y, 0)
    }else {
      if(this.m_limitState == b2Joint.e_atUpperLimit) {
        this.m_impulse.y = b2Math.Min(this.m_impulse.y, 0)
      }
    }
    var b = -Cdot1 - (this.m_impulse.y - f1.y) * this.m_K.col2.x;
    var f2r;
    if(this.m_K.col1.x != 0) {
      f2r = b / this.m_K.col1.x + f1.x
    }else {
      f2r = f1.x
    }
    this.m_impulse.x = f2r;
    df.x = this.m_impulse.x - f1.x;
    df.y = this.m_impulse.y - f1.y;
    PX = df.x * this.m_perp.x + df.y * this.m_axis.x;
    PY = df.x * this.m_perp.y + df.y * this.m_axis.y;
    L1 = df.x * this.m_s1 + df.y * this.m_a1;
    L2 = df.x * this.m_s2 + df.y * this.m_a2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }else {
    var df2;
    if(this.m_K.col1.x != 0) {
      df2 = -Cdot1 / this.m_K.col1.x
    }else {
      df2 = 0
    }
    this.m_impulse.x += df2;
    PX = df2 * this.m_perp.x;
    PY = df2 * this.m_perp.y;
    L1 = df2 * this.m_s1;
    L2 = df2 * this.m_s2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }
  bA.m_linearVelocity.SetV(v1);
  bA.m_angularVelocity = w1;
  bB.m_linearVelocity.SetV(v2);
  bB.m_angularVelocity = w2
};
b2LineJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var limitC;
  var oldLimitImpulse;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var c1 = bA.m_sweep.c;
  var a1 = bA.m_sweep.a;
  var c2 = bB.m_sweep.c;
  var a2 = bB.m_sweep.a;
  var tMat;
  var tX;
  var m1;
  var m2;
  var i1;
  var i2;
  var linearError = 0;
  var angularError = 0;
  var active = false;
  var C2 = 0;
  var R1 = b2Mat22.FromAngle(a1);
  var R2 = b2Mat22.FromAngle(a2);
  tMat = R1;
  var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
  var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = R2;
  var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
  var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = c2.x + r2X - c1.x - r1X;
  var dY = c2.y + r2Y - c1.y - r1Y;
  if(this.m_enableLimit) {
    this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
    this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
    this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
    var translation = this.m_axis.x * dX + this.m_axis.y * dY;
    if(b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
      C2 = b2Math.Clamp(translation, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
      linearError = b2Math.Abs(translation);
      active = true
    }else {
      if(translation <= this.m_lowerTranslation) {
        C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
        linearError = this.m_lowerTranslation - translation;
        active = true
      }else {
        if(translation >= this.m_upperTranslation) {
          C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection);
          linearError = translation - this.m_upperTranslation;
          active = true
        }
      }
    }
  }
  this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
  this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
  this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
  var impulse = new b2Vec2;
  var C1 = this.m_perp.x * dX + this.m_perp.y * dY;
  linearError = b2Math.Max(linearError, b2Math.Abs(C1));
  angularError = 0;
  if(active) {
    m1 = this.m_invMassA;
    m2 = this.m_invMassB;
    i1 = this.m_invIA;
    i2 = this.m_invIB;
    this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
    this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
    this.m_K.Solve(impulse, -C1, -C2)
  }else {
    m1 = this.m_invMassA;
    m2 = this.m_invMassB;
    i1 = this.m_invIA;
    i2 = this.m_invIB;
    var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
    var impulse1;
    if(k11 != 0) {
      impulse1 = -C1 / k11
    }else {
      impulse1 = 0
    }
    impulse.x = impulse1;
    impulse.y = 0
  }
  var PX = impulse.x * this.m_perp.x + impulse.y * this.m_axis.x;
  var PY = impulse.x * this.m_perp.y + impulse.y * this.m_axis.y;
  var L1 = impulse.x * this.m_s1 + impulse.y * this.m_a1;
  var L2 = impulse.x * this.m_s2 + impulse.y * this.m_a2;
  c1.x -= this.m_invMassA * PX;
  c1.y -= this.m_invMassA * PY;
  a1 -= this.m_invIA * L1;
  c2.x += this.m_invMassB * PX;
  c2.y += this.m_invMassB * PY;
  a2 += this.m_invIB * L2;
  bA.m_sweep.a = a1;
  bB.m_sweep.a = a2;
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
};
b2LineJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2LineJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2LineJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
};
b2LineJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.y
};
b2LineJoint.prototype.GetJointTranslation = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var p1 = bA.GetWorldPoint(this.m_localAnchor1);
  var p2 = bB.GetWorldPoint(this.m_localAnchor2);
  var dX = p2.x - p1.x;
  var dY = p2.y - p1.y;
  var axis = bA.GetWorldVector(this.m_localXAxis1);
  var translation = axis.x * dX + axis.y * dY;
  return translation
};
b2LineJoint.prototype.GetJointSpeed = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var p1X = bA.m_sweep.c.x + r1X;
  var p1Y = bA.m_sweep.c.y + r1Y;
  var p2X = bB.m_sweep.c.x + r2X;
  var p2Y = bB.m_sweep.c.y + r2Y;
  var dX = p2X - p1X;
  var dY = p2Y - p1Y;
  var axis = bA.GetWorldVector(this.m_localXAxis1);
  var v1 = bA.m_linearVelocity;
  var v2 = bB.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var w2 = bB.m_angularVelocity;
  var speed = dX * -w1 * axis.y + dY * w1 * axis.x + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
  return speed
};
b2LineJoint.prototype.IsLimitEnabled = function() {
  return this.m_enableLimit
};
b2LineJoint.prototype.EnableLimit = function(flag) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_enableLimit = flag
};
b2LineJoint.prototype.GetLowerLimit = function() {
  return this.m_lowerTranslation
};
b2LineJoint.prototype.GetUpperLimit = function() {
  return this.m_upperTranslation
};
b2LineJoint.prototype.SetLimits = function(lower, upper) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_lowerTranslation = lower;
  this.m_upperTranslation = upper
};
b2LineJoint.prototype.IsMotorEnabled = function() {
  return this.m_enableMotor
};
b2LineJoint.prototype.EnableMotor = function(flag) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_enableMotor = flag
};
b2LineJoint.prototype.SetMotorSpeed = function(speed) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_motorSpeed = speed
};
b2LineJoint.prototype.GetMotorSpeed = function() {
  return this.m_motorSpeed
};
b2LineJoint.prototype.SetMaxMotorForce = function(force) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_maxMotorForce = force
};
b2LineJoint.prototype.GetMaxMotorForce = function() {
  return this.m_maxMotorForce
};
b2LineJoint.prototype.GetMotorForce = function() {
  return this.m_motorImpulse
};
b2LineJoint.prototype.m_localAnchor1 = new b2Vec2;
b2LineJoint.prototype.m_localAnchor2 = new b2Vec2;
b2LineJoint.prototype.m_localXAxis1 = new b2Vec2;
b2LineJoint.prototype.m_localYAxis1 = new b2Vec2;
b2LineJoint.prototype.m_axis = new b2Vec2;
b2LineJoint.prototype.m_perp = new b2Vec2;
b2LineJoint.prototype.m_s1 = null;
b2LineJoint.prototype.m_s2 = null;
b2LineJoint.prototype.m_a1 = null;
b2LineJoint.prototype.m_a2 = null;
b2LineJoint.prototype.m_K = new b2Mat22;
b2LineJoint.prototype.m_impulse = new b2Vec2;
b2LineJoint.prototype.m_motorMass = null;
b2LineJoint.prototype.m_motorImpulse = null;
b2LineJoint.prototype.m_lowerTranslation = null;
b2LineJoint.prototype.m_upperTranslation = null;
b2LineJoint.prototype.m_maxMotorForce = null;
b2LineJoint.prototype.m_motorSpeed = null;
b2LineJoint.prototype.m_enableLimit = null;
b2LineJoint.prototype.m_enableMotor = null;
b2LineJoint.prototype.m_limitState = 0;var b2ContactSolver = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactSolver.prototype.__constructor = function() {
};
b2ContactSolver.prototype.__varz = function() {
  this.m_step = new b2TimeStep;
  this.m_constraints = new Array
};
b2ContactSolver.s_worldManifold = new b2WorldManifold;
b2ContactSolver.s_psm = new b2PositionSolverManifold;
b2ContactSolver.prototype.Initialize = function(step, contacts, contactCount, allocator) {
  var contact;
  this.m_step.Set(step);
  this.m_allocator = allocator;
  var i = 0;
  var tVec;
  var tMat;
  this.m_constraintCount = contactCount;
  while(this.m_constraints.length < this.m_constraintCount) {
    this.m_constraints[this.m_constraints.length] = new b2ContactConstraint
  }
  for(i = 0;i < contactCount;++i) {
    contact = contacts[i];
    var fixtureA = contact.m_fixtureA;
    var fixtureB = contact.m_fixtureB;
    var shapeA = fixtureA.m_shape;
    var shapeB = fixtureB.m_shape;
    var radiusA = shapeA.m_radius;
    var radiusB = shapeB.m_radius;
    var bodyA = fixtureA.m_body;
    var bodyB = fixtureB.m_body;
    var manifold = contact.GetManifold();
    var friction = b2Settings.b2MixFriction(fixtureA.GetFriction(), fixtureB.GetFriction());
    var restitution = b2Settings.b2MixRestitution(fixtureA.GetRestitution(), fixtureB.GetRestitution());
    var vAX = bodyA.m_linearVelocity.x;
    var vAY = bodyA.m_linearVelocity.y;
    var vBX = bodyB.m_linearVelocity.x;
    var vBY = bodyB.m_linearVelocity.y;
    var wA = bodyA.m_angularVelocity;
    var wB = bodyB.m_angularVelocity;
    b2Settings.b2Assert(manifold.m_pointCount > 0);
    b2ContactSolver.s_worldManifold.Initialize(manifold, bodyA.m_xf, radiusA, bodyB.m_xf, radiusB);
    var normalX = b2ContactSolver.s_worldManifold.m_normal.x;
    var normalY = b2ContactSolver.s_worldManifold.m_normal.y;
    var cc = this.m_constraints[i];
    cc.bodyA = bodyA;
    cc.bodyB = bodyB;
    cc.manifold = manifold;
    cc.normal.x = normalX;
    cc.normal.y = normalY;
    cc.pointCount = manifold.m_pointCount;
    cc.friction = friction;
    cc.restitution = restitution;
    cc.localPlaneNormal.x = manifold.m_localPlaneNormal.x;
    cc.localPlaneNormal.y = manifold.m_localPlaneNormal.y;
    cc.localPoint.x = manifold.m_localPoint.x;
    cc.localPoint.y = manifold.m_localPoint.y;
    cc.radius = radiusA + radiusB;
    cc.type = manifold.m_type;
    for(var k = 0;k < cc.pointCount;++k) {
      var cp = manifold.m_points[k];
      var ccp = cc.points[k];
      ccp.normalImpulse = cp.m_normalImpulse;
      ccp.tangentImpulse = cp.m_tangentImpulse;
      ccp.localPoint.SetV(cp.m_localPoint);
      var rAX = ccp.rA.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyA.m_sweep.c.x;
      var rAY = ccp.rA.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyA.m_sweep.c.y;
      var rBX = ccp.rB.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyB.m_sweep.c.x;
      var rBY = ccp.rB.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyB.m_sweep.c.y;
      var rnA = rAX * normalY - rAY * normalX;
      var rnB = rBX * normalY - rBY * normalX;
      rnA *= rnA;
      rnB *= rnB;
      var kNormal = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rnA + bodyB.m_invI * rnB;
      ccp.normalMass = 1 / kNormal;
      var kEqualized = bodyA.m_mass * bodyA.m_invMass + bodyB.m_mass * bodyB.m_invMass;
      kEqualized += bodyA.m_mass * bodyA.m_invI * rnA + bodyB.m_mass * bodyB.m_invI * rnB;
      ccp.equalizedMass = 1 / kEqualized;
      var tangentX = normalY;
      var tangentY = -normalX;
      var rtA = rAX * tangentY - rAY * tangentX;
      var rtB = rBX * tangentY - rBY * tangentX;
      rtA *= rtA;
      rtB *= rtB;
      var kTangent = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rtA + bodyB.m_invI * rtB;
      ccp.tangentMass = 1 / kTangent;
      ccp.velocityBias = 0;
      var tX = vBX + -wB * rBY - vAX - -wA * rAY;
      var tY = vBY + wB * rBX - vAY - wA * rAX;
      var vRel = cc.normal.x * tX + cc.normal.y * tY;
      if(vRel < -b2Settings.b2_velocityThreshold) {
        ccp.velocityBias += -cc.restitution * vRel
      }
    }
    if(cc.pointCount == 2) {
      var ccp1 = cc.points[0];
      var ccp2 = cc.points[1];
      var invMassA = bodyA.m_invMass;
      var invIA = bodyA.m_invI;
      var invMassB = bodyB.m_invMass;
      var invIB = bodyB.m_invI;
      var rn1A = ccp1.rA.x * normalY - ccp1.rA.y * normalX;
      var rn1B = ccp1.rB.x * normalY - ccp1.rB.y * normalX;
      var rn2A = ccp2.rA.x * normalY - ccp2.rA.y * normalX;
      var rn2B = ccp2.rB.x * normalY - ccp2.rB.y * normalX;
      var k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
      var k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
      var k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
      var k_maxConditionNumber = 100;
      if(k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
        cc.K.col1.Set(k11, k12);
        cc.K.col2.Set(k12, k22);
        cc.K.GetInverse(cc.normalMass)
      }else {
        cc.pointCount = 1
      }
    }
  }
};
b2ContactSolver.prototype.InitVelocityConstraints = function(step) {
  var tVec;
  var tVec2;
  var tMat;
  for(var i = 0;i < this.m_constraintCount;++i) {
    var c = this.m_constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var invMassA = bodyA.m_invMass;
    var invIA = bodyA.m_invI;
    var invMassB = bodyB.m_invMass;
    var invIB = bodyB.m_invI;
    var normalX = c.normal.x;
    var normalY = c.normal.y;
    var tangentX = normalY;
    var tangentY = -normalX;
    var tX;
    var j = 0;
    var tCount = 0;
    if(step.warmStarting) {
      tCount = c.pointCount;
      for(j = 0;j < tCount;++j) {
        var ccp = c.points[j];
        ccp.normalImpulse *= step.dtRatio;
        ccp.tangentImpulse *= step.dtRatio;
        var PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
        var PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
        bodyA.m_angularVelocity -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
        bodyA.m_linearVelocity.x -= invMassA * PX;
        bodyA.m_linearVelocity.y -= invMassA * PY;
        bodyB.m_angularVelocity += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
        bodyB.m_linearVelocity.x += invMassB * PX;
        bodyB.m_linearVelocity.y += invMassB * PY
      }
    }else {
      tCount = c.pointCount;
      for(j = 0;j < tCount;++j) {
        var ccp2 = c.points[j];
        ccp2.normalImpulse = 0;
        ccp2.tangentImpulse = 0
      }
    }
  }
};
b2ContactSolver.prototype.SolveVelocityConstraints = function() {
  var j = 0;
  var ccp;
  var rAX;
  var rAY;
  var rBX;
  var rBY;
  var dvX;
  var dvY;
  var vn;
  var vt;
  var lambda;
  var maxFriction;
  var newImpulse;
  var PX;
  var PY;
  var dX;
  var dY;
  var P1X;
  var P1Y;
  var P2X;
  var P2Y;
  var tMat;
  var tVec;
  for(var i = 0;i < this.m_constraintCount;++i) {
    var c = this.m_constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var wA = bodyA.m_angularVelocity;
    var wB = bodyB.m_angularVelocity;
    var vA = bodyA.m_linearVelocity;
    var vB = bodyB.m_linearVelocity;
    var invMassA = bodyA.m_invMass;
    var invIA = bodyA.m_invI;
    var invMassB = bodyB.m_invMass;
    var invIB = bodyB.m_invI;
    var normalX = c.normal.x;
    var normalY = c.normal.y;
    var tangentX = normalY;
    var tangentY = -normalX;
    var friction = c.friction;
    var tX;
    for(j = 0;j < c.pointCount;j++) {
      ccp = c.points[j];
      dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
      dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
      vt = dvX * tangentX + dvY * tangentY;
      lambda = ccp.tangentMass * -vt;
      maxFriction = friction * ccp.normalImpulse;
      newImpulse = b2Math.Clamp(ccp.tangentImpulse + lambda, -maxFriction, maxFriction);
      lambda = newImpulse - ccp.tangentImpulse;
      PX = lambda * tangentX;
      PY = lambda * tangentY;
      vA.x -= invMassA * PX;
      vA.y -= invMassA * PY;
      wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
      vB.x += invMassB * PX;
      vB.y += invMassB * PY;
      wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
      ccp.tangentImpulse = newImpulse
    }
    var tCount = c.pointCount;
    if(c.pointCount == 1) {
      ccp = c.points[0];
      dvX = vB.x + -wB * ccp.rB.y - vA.x - -wA * ccp.rA.y;
      dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
      vn = dvX * normalX + dvY * normalY;
      lambda = -ccp.normalMass * (vn - ccp.velocityBias);
      newImpulse = ccp.normalImpulse + lambda;
      newImpulse = newImpulse > 0 ? newImpulse : 0;
      lambda = newImpulse - ccp.normalImpulse;
      PX = lambda * normalX;
      PY = lambda * normalY;
      vA.x -= invMassA * PX;
      vA.y -= invMassA * PY;
      wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
      vB.x += invMassB * PX;
      vB.y += invMassB * PY;
      wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
      ccp.normalImpulse = newImpulse
    }else {
      var cp1 = c.points[0];
      var cp2 = c.points[1];
      var aX = cp1.normalImpulse;
      var aY = cp2.normalImpulse;
      var dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
      var dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
      var dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
      var dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
      var vn1 = dv1X * normalX + dv1Y * normalY;
      var vn2 = dv2X * normalX + dv2Y * normalY;
      var bX = vn1 - cp1.velocityBias;
      var bY = vn2 - cp2.velocityBias;
      tMat = c.K;
      bX -= tMat.col1.x * aX + tMat.col2.x * aY;
      bY -= tMat.col1.y * aX + tMat.col2.y * aY;
      var k_errorTol = 0.0010;
      for(;;) {
        tMat = c.normalMass;
        var xX = -(tMat.col1.x * bX + tMat.col2.x * bY);
        var xY = -(tMat.col1.y * bX + tMat.col2.y * bY);
        if(xX >= 0 && xY >= 0) {
          dX = xX - aX;
          dY = xY - aY;
          P1X = dX * normalX;
          P1Y = dX * normalY;
          P2X = dY * normalX;
          P2Y = dY * normalY;
          vA.x -= invMassA * (P1X + P2X);
          vA.y -= invMassA * (P1Y + P2Y);
          wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
          vB.x += invMassB * (P1X + P2X);
          vB.y += invMassB * (P1Y + P2Y);
          wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
          cp1.normalImpulse = xX;
          cp2.normalImpulse = xY;
          break
        }
        xX = -cp1.normalMass * bX;
        xY = 0;
        vn1 = 0;
        vn2 = c.K.col1.y * xX + bY;
        if(xX >= 0 && vn2 >= 0) {
          dX = xX - aX;
          dY = xY - aY;
          P1X = dX * normalX;
          P1Y = dX * normalY;
          P2X = dY * normalX;
          P2Y = dY * normalY;
          vA.x -= invMassA * (P1X + P2X);
          vA.y -= invMassA * (P1Y + P2Y);
          wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
          vB.x += invMassB * (P1X + P2X);
          vB.y += invMassB * (P1Y + P2Y);
          wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
          cp1.normalImpulse = xX;
          cp2.normalImpulse = xY;
          break
        }
        xX = 0;
        xY = -cp2.normalMass * bY;
        vn1 = c.K.col2.x * xY + bX;
        vn2 = 0;
        if(xY >= 0 && vn1 >= 0) {
          dX = xX - aX;
          dY = xY - aY;
          P1X = dX * normalX;
          P1Y = dX * normalY;
          P2X = dY * normalX;
          P2Y = dY * normalY;
          vA.x -= invMassA * (P1X + P2X);
          vA.y -= invMassA * (P1Y + P2Y);
          wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
          vB.x += invMassB * (P1X + P2X);
          vB.y += invMassB * (P1Y + P2Y);
          wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
          cp1.normalImpulse = xX;
          cp2.normalImpulse = xY;
          break
        }
        xX = 0;
        xY = 0;
        vn1 = bX;
        vn2 = bY;
        if(vn1 >= 0 && vn2 >= 0) {
          dX = xX - aX;
          dY = xY - aY;
          P1X = dX * normalX;
          P1Y = dX * normalY;
          P2X = dY * normalX;
          P2Y = dY * normalY;
          vA.x -= invMassA * (P1X + P2X);
          vA.y -= invMassA * (P1Y + P2Y);
          wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
          vB.x += invMassB * (P1X + P2X);
          vB.y += invMassB * (P1Y + P2Y);
          wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
          cp1.normalImpulse = xX;
          cp2.normalImpulse = xY;
          break
        }
        break
      }
    }
    bodyA.m_angularVelocity = wA;
    bodyB.m_angularVelocity = wB
  }
};
b2ContactSolver.prototype.FinalizeVelocityConstraints = function() {
  for(var i = 0;i < this.m_constraintCount;++i) {
    var c = this.m_constraints[i];
    var m = c.manifold;
    for(var j = 0;j < c.pointCount;++j) {
      var point1 = m.m_points[j];
      var point2 = c.points[j];
      point1.m_normalImpulse = point2.normalImpulse;
      point1.m_tangentImpulse = point2.tangentImpulse
    }
  }
};
b2ContactSolver.prototype.SolvePositionConstraints = function(baumgarte) {
  var minSeparation = 0;
  for(var i = 0;i < this.m_constraintCount;i++) {
    var c = this.m_constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var invMassA = bodyA.m_mass * bodyA.m_invMass;
    var invIA = bodyA.m_mass * bodyA.m_invI;
    var invMassB = bodyB.m_mass * bodyB.m_invMass;
    var invIB = bodyB.m_mass * bodyB.m_invI;
    b2ContactSolver.s_psm.Initialize(c);
    var normal = b2ContactSolver.s_psm.m_normal;
    for(var j = 0;j < c.pointCount;j++) {
      var ccp = c.points[j];
      var point = b2ContactSolver.s_psm.m_points[j];
      var separation = b2ContactSolver.s_psm.m_separations[j];
      var rAX = point.x - bodyA.m_sweep.c.x;
      var rAY = point.y - bodyA.m_sweep.c.y;
      var rBX = point.x - bodyB.m_sweep.c.x;
      var rBY = point.y - bodyB.m_sweep.c.y;
      minSeparation = minSeparation < separation ? minSeparation : separation;
      var C = b2Math.Clamp(baumgarte * (separation + b2Settings.b2_linearSlop), -b2Settings.b2_maxLinearCorrection, 0);
      var impulse = -ccp.equalizedMass * C;
      var PX = impulse * normal.x;
      var PY = impulse * normal.y;
      bodyA.m_sweep.c.x -= invMassA * PX;
      bodyA.m_sweep.c.y -= invMassA * PY;
      bodyA.m_sweep.a -= invIA * (rAX * PY - rAY * PX);
      bodyA.SynchronizeTransform();
      bodyB.m_sweep.c.x += invMassB * PX;
      bodyB.m_sweep.c.y += invMassB * PY;
      bodyB.m_sweep.a += invIB * (rBX * PY - rBY * PX);
      bodyB.SynchronizeTransform()
    }
  }
  return minSeparation > -1.5 * b2Settings.b2_linearSlop
};
b2ContactSolver.prototype.m_step = new b2TimeStep;
b2ContactSolver.prototype.m_allocator = null;
b2ContactSolver.prototype.m_constraints = new Array;
b2ContactSolver.prototype.m_constraintCount = 0;var b2Simplex = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Simplex.prototype.__constructor = function() {
  this.m_vertices[0] = this.m_v1;
  this.m_vertices[1] = this.m_v2;
  this.m_vertices[2] = this.m_v3
};
b2Simplex.prototype.__varz = function() {
  this.m_v1 = new b2SimplexVertex;
  this.m_v2 = new b2SimplexVertex;
  this.m_v3 = new b2SimplexVertex;
  this.m_vertices = new Array(3)
};
b2Simplex.prototype.ReadCache = function(cache, proxyA, transformA, proxyB, transformB) {
  b2Settings.b2Assert(0 <= cache.count && cache.count <= 3);
  var wALocal;
  var wBLocal;
  this.m_count = cache.count;
  var vertices = this.m_vertices;
  for(var i = 0;i < this.m_count;i++) {
    var v = vertices[i];
    v.indexA = cache.indexA[i];
    v.indexB = cache.indexB[i];
    wALocal = proxyA.GetVertex(v.indexA);
    wBLocal = proxyB.GetVertex(v.indexB);
    v.wA = b2Math.MulX(transformA, wALocal);
    v.wB = b2Math.MulX(transformB, wBLocal);
    v.w = b2Math.SubtractVV(v.wB, v.wA);
    v.a = 0
  }
  if(this.m_count > 1) {
    var metric1 = cache.metric;
    var metric2 = this.GetMetric();
    if(metric2 < 0.5 * metric1 || 2 * metric1 < metric2 || metric2 < Number.MIN_VALUE) {
      this.m_count = 0
    }
  }
  if(this.m_count == 0) {
    v = vertices[0];
    v.indexA = 0;
    v.indexB = 0;
    wALocal = proxyA.GetVertex(0);
    wBLocal = proxyB.GetVertex(0);
    v.wA = b2Math.MulX(transformA, wALocal);
    v.wB = b2Math.MulX(transformB, wBLocal);
    v.w = b2Math.SubtractVV(v.wB, v.wA);
    this.m_count = 1
  }
};
b2Simplex.prototype.WriteCache = function(cache) {
  cache.metric = this.GetMetric();
  cache.count = parseInt(this.m_count);
  var vertices = this.m_vertices;
  for(var i = 0;i < this.m_count;i++) {
    cache.indexA[i] = parseInt(vertices[i].indexA);
    cache.indexB[i] = parseInt(vertices[i].indexB)
  }
};
b2Simplex.prototype.GetSearchDirection = function() {
  switch(this.m_count) {
    case 1:
      return this.m_v1.w.GetNegative();
    case 2:
      var e12 = b2Math.SubtractVV(this.m_v2.w, this.m_v1.w);
      var sgn = b2Math.CrossVV(e12, this.m_v1.w.GetNegative());
      if(sgn > 0) {
        return b2Math.CrossFV(1, e12)
      }else {
        return b2Math.CrossVF(e12, 1)
      }
    ;
    default:
      b2Settings.b2Assert(false);
      return new b2Vec2
  }
};
b2Simplex.prototype.GetClosestPoint = function() {
  switch(this.m_count) {
    case 0:
      b2Settings.b2Assert(false);
      return new b2Vec2;
    case 1:
      return this.m_v1.w;
    case 2:
      return new b2Vec2(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
    default:
      b2Settings.b2Assert(false);
      return new b2Vec2
  }
};
b2Simplex.prototype.GetWitnessPoints = function(pA, pB) {
  switch(this.m_count) {
    case 0:
      b2Settings.b2Assert(false);
      break;
    case 1:
      pA.SetV(this.m_v1.wA);
      pB.SetV(this.m_v1.wB);
      break;
    case 2:
      pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
      pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
      pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
      pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
      break;
    case 3:
      pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
      pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
      break;
    default:
      b2Settings.b2Assert(false);
      break
  }
};
b2Simplex.prototype.GetMetric = function() {
  switch(this.m_count) {
    case 0:
      b2Settings.b2Assert(false);
      return 0;
    case 1:
      return 0;
    case 2:
      return b2Math.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
    case 3:
      return b2Math.CrossVV(b2Math.SubtractVV(this.m_v2.w, this.m_v1.w), b2Math.SubtractVV(this.m_v3.w, this.m_v1.w));
    default:
      b2Settings.b2Assert(false);
      return 0
  }
};
b2Simplex.prototype.Solve2 = function() {
  var w1 = this.m_v1.w;
  var w2 = this.m_v2.w;
  var e12 = b2Math.SubtractVV(w2, w1);
  var d12_2 = -(w1.x * e12.x + w1.y * e12.y);
  if(d12_2 <= 0) {
    this.m_v1.a = 1;
    this.m_count = 1;
    return
  }
  var d12_1 = w2.x * e12.x + w2.y * e12.y;
  if(d12_1 <= 0) {
    this.m_v2.a = 1;
    this.m_count = 1;
    this.m_v1.Set(this.m_v2);
    return
  }
  var inv_d12 = 1 / (d12_1 + d12_2);
  this.m_v1.a = d12_1 * inv_d12;
  this.m_v2.a = d12_2 * inv_d12;
  this.m_count = 2
};
b2Simplex.prototype.Solve3 = function() {
  var w1 = this.m_v1.w;
  var w2 = this.m_v2.w;
  var w3 = this.m_v3.w;
  var e12 = b2Math.SubtractVV(w2, w1);
  var w1e12 = b2Math.Dot(w1, e12);
  var w2e12 = b2Math.Dot(w2, e12);
  var d12_1 = w2e12;
  var d12_2 = -w1e12;
  var e13 = b2Math.SubtractVV(w3, w1);
  var w1e13 = b2Math.Dot(w1, e13);
  var w3e13 = b2Math.Dot(w3, e13);
  var d13_1 = w3e13;
  var d13_2 = -w1e13;
  var e23 = b2Math.SubtractVV(w3, w2);
  var w2e23 = b2Math.Dot(w2, e23);
  var w3e23 = b2Math.Dot(w3, e23);
  var d23_1 = w3e23;
  var d23_2 = -w2e23;
  var n123 = b2Math.CrossVV(e12, e13);
  var d123_1 = n123 * b2Math.CrossVV(w2, w3);
  var d123_2 = n123 * b2Math.CrossVV(w3, w1);
  var d123_3 = n123 * b2Math.CrossVV(w1, w2);
  if(d12_2 <= 0 && d13_2 <= 0) {
    this.m_v1.a = 1;
    this.m_count = 1;
    return
  }
  if(d12_1 > 0 && d12_2 > 0 && d123_3 <= 0) {
    var inv_d12 = 1 / (d12_1 + d12_2);
    this.m_v1.a = d12_1 * inv_d12;
    this.m_v2.a = d12_2 * inv_d12;
    this.m_count = 2;
    return
  }
  if(d13_1 > 0 && d13_2 > 0 && d123_2 <= 0) {
    var inv_d13 = 1 / (d13_1 + d13_2);
    this.m_v1.a = d13_1 * inv_d13;
    this.m_v3.a = d13_2 * inv_d13;
    this.m_count = 2;
    this.m_v2.Set(this.m_v3);
    return
  }
  if(d12_1 <= 0 && d23_2 <= 0) {
    this.m_v2.a = 1;
    this.m_count = 1;
    this.m_v1.Set(this.m_v2);
    return
  }
  if(d13_1 <= 0 && d23_1 <= 0) {
    this.m_v3.a = 1;
    this.m_count = 1;
    this.m_v1.Set(this.m_v3);
    return
  }
  if(d23_1 > 0 && d23_2 > 0 && d123_1 <= 0) {
    var inv_d23 = 1 / (d23_1 + d23_2);
    this.m_v2.a = d23_1 * inv_d23;
    this.m_v3.a = d23_2 * inv_d23;
    this.m_count = 2;
    this.m_v1.Set(this.m_v3);
    return
  }
  var inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
  this.m_v1.a = d123_1 * inv_d123;
  this.m_v2.a = d123_2 * inv_d123;
  this.m_v3.a = d123_3 * inv_d123;
  this.m_count = 3
};
b2Simplex.prototype.m_v1 = new b2SimplexVertex;
b2Simplex.prototype.m_v2 = new b2SimplexVertex;
b2Simplex.prototype.m_v3 = new b2SimplexVertex;
b2Simplex.prototype.m_vertices = new Array(3);
b2Simplex.prototype.m_count = 0;var b2WeldJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2WeldJoint.prototype, b2Joint.prototype);
b2WeldJoint.prototype._super = b2Joint.prototype;
b2WeldJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  this.m_localAnchorA.SetV(def.localAnchorA);
  this.m_localAnchorB.SetV(def.localAnchorB);
  this.m_referenceAngle = def.referenceAngle;
  this.m_impulse.SetZero();
  this.m_mass = new b2Mat33
};
b2WeldJoint.prototype.__varz = function() {
  this.m_localAnchorA = new b2Vec2;
  this.m_localAnchorB = new b2Vec2;
  this.m_impulse = new b2Vec3;
  this.m_mass = new b2Mat33
};
b2WeldJoint.prototype.InitVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
  this.m_mass.col2.x = -rAY * rAX * iA - rBY * rBX * iB;
  this.m_mass.col3.x = -rAY * iA - rBY * iB;
  this.m_mass.col1.y = this.m_mass.col2.x;
  this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
  this.m_mass.col3.y = rAX * iA + rBX * iB;
  this.m_mass.col1.z = this.m_mass.col3.x;
  this.m_mass.col2.z = this.m_mass.col3.y;
  this.m_mass.col3.z = iA + iB;
  if(step.warmStarting) {
    this.m_impulse.x *= step.dtRatio;
    this.m_impulse.y *= step.dtRatio;
    this.m_impulse.z *= step.dtRatio;
    bA.m_linearVelocity.x -= mA * this.m_impulse.x;
    bA.m_linearVelocity.y -= mA * this.m_impulse.y;
    bA.m_angularVelocity -= iA * (rAX * this.m_impulse.y - rAY * this.m_impulse.x + this.m_impulse.z);
    bB.m_linearVelocity.x += mB * this.m_impulse.x;
    bB.m_linearVelocity.y += mB * this.m_impulse.y;
    bB.m_angularVelocity += iB * (rBX * this.m_impulse.y - rBY * this.m_impulse.x + this.m_impulse.z)
  }else {
    this.m_impulse.SetZero()
  }
};
b2WeldJoint.prototype.SolveVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var vA = bA.m_linearVelocity;
  var wA = bA.m_angularVelocity;
  var vB = bB.m_linearVelocity;
  var wB = bB.m_angularVelocity;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var Cdot1X = vB.x - wB * rBY - vA.x + wA * rAY;
  var Cdot1Y = vB.y + wB * rBX - vA.y - wA * rAX;
  var Cdot2 = wB - wA;
  var impulse = new b2Vec3;
  this.m_mass.Solve33(impulse, -Cdot1X, -Cdot1Y, -Cdot2);
  this.m_impulse.Add(impulse);
  vA.x -= mA * impulse.x;
  vA.y -= mA * impulse.y;
  wA -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
  vB.x += mB * impulse.x;
  vB.y += mB * impulse.y;
  wB += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
  bA.m_angularVelocity = wA;
  bB.m_angularVelocity = wB
};
b2WeldJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  var C1X = bB.m_sweep.c.x + rBX - bA.m_sweep.c.x - rAX;
  var C1Y = bB.m_sweep.c.y + rBY - bA.m_sweep.c.y - rAY;
  var C2 = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
  var k_allowedStretch = 10 * b2Settings.b2_linearSlop;
  var positionError = Math.sqrt(C1X * C1X + C1Y * C1Y);
  var angularError = b2Math.Abs(C2);
  if(positionError > k_allowedStretch) {
    iA *= 1;
    iB *= 1
  }
  this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
  this.m_mass.col2.x = -rAY * rAX * iA - rBY * rBX * iB;
  this.m_mass.col3.x = -rAY * iA - rBY * iB;
  this.m_mass.col1.y = this.m_mass.col2.x;
  this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
  this.m_mass.col3.y = rAX * iA + rBX * iB;
  this.m_mass.col1.z = this.m_mass.col3.x;
  this.m_mass.col2.z = this.m_mass.col3.y;
  this.m_mass.col3.z = iA + iB;
  var impulse = new b2Vec3;
  this.m_mass.Solve33(impulse, -C1X, -C1Y, -C2);
  bA.m_sweep.c.x -= mA * impulse.x;
  bA.m_sweep.c.y -= mA * impulse.y;
  bA.m_sweep.a -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
  bB.m_sweep.c.x += mB * impulse.x;
  bB.m_sweep.c.y += mB * impulse.y;
  bB.m_sweep.a += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
};
b2WeldJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
};
b2WeldJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
};
b2WeldJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
};
b2WeldJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.z
};
b2WeldJoint.prototype.m_localAnchorA = new b2Vec2;
b2WeldJoint.prototype.m_localAnchorB = new b2Vec2;
b2WeldJoint.prototype.m_referenceAngle = null;
b2WeldJoint.prototype.m_impulse = new b2Vec3;
b2WeldJoint.prototype.m_mass = new b2Mat33;var b2Math = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Math.prototype.__constructor = function() {
};
b2Math.prototype.__varz = function() {
};
b2Math.IsValid = function(x) {
  return isFinite(x)
};
b2Math.Dot = function(a, b) {
  return a.x * b.x + a.y * b.y
};
b2Math.CrossVV = function(a, b) {
  return a.x * b.y - a.y * b.x
};
b2Math.CrossVF = function(a, s) {
  var v = new b2Vec2(s * a.y, -s * a.x);
  return v
};
b2Math.CrossFV = function(s, a) {
  var v = new b2Vec2(-s * a.y, s * a.x);
  return v
};
b2Math.MulMV = function(A, v) {
  var u = new b2Vec2(A.col1.x * v.x + A.col2.x * v.y, A.col1.y * v.x + A.col2.y * v.y);
  return u
};
b2Math.MulTMV = function(A, v) {
  var u = new b2Vec2(b2Math.Dot(v, A.col1), b2Math.Dot(v, A.col2));
  return u
};
b2Math.MulX = function(T, v) {
  var a = b2Math.MulMV(T.R, v);
  a.x += T.position.x;
  a.y += T.position.y;
  return a
};
b2Math.MulXT = function(T, v) {
  var a = b2Math.SubtractVV(v, T.position);
  var tX = a.x * T.R.col1.x + a.y * T.R.col1.y;
  a.y = a.x * T.R.col2.x + a.y * T.R.col2.y;
  a.x = tX;
  return a
};
b2Math.AddVV = function(a, b) {
  var v = new b2Vec2(a.x + b.x, a.y + b.y);
  return v
};
b2Math.SubtractVV = function(a, b) {
  var v = new b2Vec2(a.x - b.x, a.y - b.y);
  return v
};
b2Math.Distance = function(a, b) {
  var cX = a.x - b.x;
  var cY = a.y - b.y;
  return Math.sqrt(cX * cX + cY * cY)
};
b2Math.DistanceSquared = function(a, b) {
  var cX = a.x - b.x;
  var cY = a.y - b.y;
  return cX * cX + cY * cY
};
b2Math.MulFV = function(s, a) {
  var v = new b2Vec2(s * a.x, s * a.y);
  return v
};
b2Math.AddMM = function(A, B) {
  var C = b2Mat22.FromVV(b2Math.AddVV(A.col1, B.col1), b2Math.AddVV(A.col2, B.col2));
  return C
};
b2Math.MulMM = function(A, B) {
  var C = b2Mat22.FromVV(b2Math.MulMV(A, B.col1), b2Math.MulMV(A, B.col2));
  return C
};
b2Math.MulTMM = function(A, B) {
  var c1 = new b2Vec2(b2Math.Dot(A.col1, B.col1), b2Math.Dot(A.col2, B.col1));
  var c2 = new b2Vec2(b2Math.Dot(A.col1, B.col2), b2Math.Dot(A.col2, B.col2));
  var C = b2Mat22.FromVV(c1, c2);
  return C
};
b2Math.Abs = function(a) {
  return a > 0 ? a : -a
};
b2Math.AbsV = function(a) {
  var b = new b2Vec2(b2Math.Abs(a.x), b2Math.Abs(a.y));
  return b
};
b2Math.AbsM = function(A) {
  var B = b2Mat22.FromVV(b2Math.AbsV(A.col1), b2Math.AbsV(A.col2));
  return B
};
b2Math.Min = function(a, b) {
  return a < b ? a : b
};
b2Math.MinV = function(a, b) {
  var c = new b2Vec2(b2Math.Min(a.x, b.x), b2Math.Min(a.y, b.y));
  return c
};
b2Math.Max = function(a, b) {
  return a > b ? a : b
};
b2Math.MaxV = function(a, b) {
  var c = new b2Vec2(b2Math.Max(a.x, b.x), b2Math.Max(a.y, b.y));
  return c
};
b2Math.Clamp = function(a, low, high) {
  return a < low ? low : a > high ? high : a
};
b2Math.ClampV = function(a, low, high) {
  return b2Math.MaxV(low, b2Math.MinV(a, high))
};
b2Math.Swap = function(a, b) {
  var tmp = a[0];
  a[0] = b[0];
  b[0] = tmp
};
b2Math.Random = function() {
  return Math.random() * 2 - 1
};
b2Math.RandomRange = function(lo, hi) {
  var r = Math.random();
  r = (hi - lo) * r + lo;
  return r
};
b2Math.NextPowerOfTwo = function(x) {
  x |= x >> 1 & 2147483647;
  x |= x >> 2 & 1073741823;
  x |= x >> 4 & 268435455;
  x |= x >> 8 & 16777215;
  x |= x >> 16 & 65535;
  return x + 1
};
b2Math.IsPowerOfTwo = function(x) {
  var result = x > 0 && (x & x - 1) == 0;
  return result
};
b2Math.b2Vec2_zero = new b2Vec2(0, 0);
b2Math.b2Mat22_identity = b2Mat22.FromVV(new b2Vec2(1, 0), new b2Vec2(0, 1));
b2Math.b2Transform_identity = new b2Transform(b2Math.b2Vec2_zero, b2Math.b2Mat22_identity);var b2PulleyJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PulleyJoint.prototype, b2Joint.prototype);
b2PulleyJoint.prototype._super = b2Joint.prototype;
b2PulleyJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var tMat;
  var tX;
  var tY;
  this.m_ground = this.m_bodyA.m_world.m_groundBody;
  this.m_groundAnchor1.x = def.groundAnchorA.x - this.m_ground.m_xf.position.x;
  this.m_groundAnchor1.y = def.groundAnchorA.y - this.m_ground.m_xf.position.y;
  this.m_groundAnchor2.x = def.groundAnchorB.x - this.m_ground.m_xf.position.x;
  this.m_groundAnchor2.y = def.groundAnchorB.y - this.m_ground.m_xf.position.y;
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_ratio = def.ratio;
  this.m_constant = def.lengthA + this.m_ratio * def.lengthB;
  this.m_maxLength1 = b2Math.Min(def.maxLengthA, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
  this.m_maxLength2 = b2Math.Min(def.maxLengthB, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
  this.m_impulse = 0;
  this.m_limitImpulse1 = 0;
  this.m_limitImpulse2 = 0
};
b2PulleyJoint.prototype.__varz = function() {
  this.m_groundAnchor1 = new b2Vec2;
  this.m_groundAnchor2 = new b2Vec2;
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_u1 = new b2Vec2;
  this.m_u2 = new b2Vec2
};
b2PulleyJoint.b2_minPulleyLength = 2;
b2PulleyJoint.prototype.InitVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var p1X = bA.m_sweep.c.x + r1X;
  var p1Y = bA.m_sweep.c.y + r1Y;
  var p2X = bB.m_sweep.c.x + r2X;
  var p2Y = bB.m_sweep.c.y + r2Y;
  var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
  var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
  var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
  var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
  this.m_u1.Set(p1X - s1X, p1Y - s1Y);
  this.m_u2.Set(p2X - s2X, p2Y - s2Y);
  var length1 = this.m_u1.Length();
  var length2 = this.m_u2.Length();
  if(length1 > b2Settings.b2_linearSlop) {
    this.m_u1.Multiply(1 / length1)
  }else {
    this.m_u1.SetZero()
  }
  if(length2 > b2Settings.b2_linearSlop) {
    this.m_u2.Multiply(1 / length2)
  }else {
    this.m_u2.SetZero()
  }
  var C = this.m_constant - length1 - this.m_ratio * length2;
  if(C > 0) {
    this.m_state = b2Joint.e_inactiveLimit;
    this.m_impulse = 0
  }else {
    this.m_state = b2Joint.e_atUpperLimit
  }
  if(length1 < this.m_maxLength1) {
    this.m_limitState1 = b2Joint.e_inactiveLimit;
    this.m_limitImpulse1 = 0
  }else {
    this.m_limitState1 = b2Joint.e_atUpperLimit
  }
  if(length2 < this.m_maxLength2) {
    this.m_limitState2 = b2Joint.e_inactiveLimit;
    this.m_limitImpulse2 = 0
  }else {
    this.m_limitState2 = b2Joint.e_atUpperLimit
  }
  var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
  var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
  this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
  this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
  this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
  this.m_limitMass1 = 1 / this.m_limitMass1;
  this.m_limitMass2 = 1 / this.m_limitMass2;
  this.m_pulleyMass = 1 / this.m_pulleyMass;
  if(step.warmStarting) {
    this.m_impulse *= step.dtRatio;
    this.m_limitImpulse1 *= step.dtRatio;
    this.m_limitImpulse2 *= step.dtRatio;
    var P1X = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x;
    var P1Y = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y;
    var P2X = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x;
    var P2Y = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y;
    bA.m_linearVelocity.x += bA.m_invMass * P1X;
    bA.m_linearVelocity.y += bA.m_invMass * P1Y;
    bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
    bB.m_linearVelocity.x += bB.m_invMass * P2X;
    bB.m_linearVelocity.y += bB.m_invMass * P2Y;
    bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
  }else {
    this.m_impulse = 0;
    this.m_limitImpulse1 = 0;
    this.m_limitImpulse2 = 0
  }
};
b2PulleyJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var v1X;
  var v1Y;
  var v2X;
  var v2Y;
  var P1X;
  var P1Y;
  var P2X;
  var P2Y;
  var Cdot;
  var impulse;
  var oldImpulse;
  if(this.m_state == b2Joint.e_atUpperLimit) {
    v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
    v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
    v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
    v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
    Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
    impulse = this.m_pulleyMass * -Cdot;
    oldImpulse = this.m_impulse;
    this.m_impulse = b2Math.Max(0, this.m_impulse + impulse);
    impulse = this.m_impulse - oldImpulse;
    P1X = -impulse * this.m_u1.x;
    P1Y = -impulse * this.m_u1.y;
    P2X = -this.m_ratio * impulse * this.m_u2.x;
    P2Y = -this.m_ratio * impulse * this.m_u2.y;
    bA.m_linearVelocity.x += bA.m_invMass * P1X;
    bA.m_linearVelocity.y += bA.m_invMass * P1Y;
    bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
    bB.m_linearVelocity.x += bB.m_invMass * P2X;
    bB.m_linearVelocity.y += bB.m_invMass * P2Y;
    bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
  }
  if(this.m_limitState1 == b2Joint.e_atUpperLimit) {
    v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
    v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
    Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y);
    impulse = -this.m_limitMass1 * Cdot;
    oldImpulse = this.m_limitImpulse1;
    this.m_limitImpulse1 = b2Math.Max(0, this.m_limitImpulse1 + impulse);
    impulse = this.m_limitImpulse1 - oldImpulse;
    P1X = -impulse * this.m_u1.x;
    P1Y = -impulse * this.m_u1.y;
    bA.m_linearVelocity.x += bA.m_invMass * P1X;
    bA.m_linearVelocity.y += bA.m_invMass * P1Y;
    bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X)
  }
  if(this.m_limitState2 == b2Joint.e_atUpperLimit) {
    v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
    v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
    Cdot = -(this.m_u2.x * v2X + this.m_u2.y * v2Y);
    impulse = -this.m_limitMass2 * Cdot;
    oldImpulse = this.m_limitImpulse2;
    this.m_limitImpulse2 = b2Math.Max(0, this.m_limitImpulse2 + impulse);
    impulse = this.m_limitImpulse2 - oldImpulse;
    P2X = -impulse * this.m_u2.x;
    P2Y = -impulse * this.m_u2.y;
    bB.m_linearVelocity.x += bB.m_invMass * P2X;
    bB.m_linearVelocity.y += bB.m_invMass * P2Y;
    bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
  }
};
b2PulleyJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
  var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
  var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
  var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
  var r1X;
  var r1Y;
  var r2X;
  var r2Y;
  var p1X;
  var p1Y;
  var p2X;
  var p2Y;
  var length1;
  var length2;
  var C;
  var impulse;
  var oldImpulse;
  var oldLimitPositionImpulse;
  var tX;
  var linearError = 0;
  if(this.m_state == b2Joint.e_atUpperLimit) {
    tMat = bA.m_xf.R;
    r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
    r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
    r1X = tX;
    tMat = bB.m_xf.R;
    r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
    r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
    r2X = tX;
    p1X = bA.m_sweep.c.x + r1X;
    p1Y = bA.m_sweep.c.y + r1Y;
    p2X = bB.m_sweep.c.x + r2X;
    p2Y = bB.m_sweep.c.y + r2Y;
    this.m_u1.Set(p1X - s1X, p1Y - s1Y);
    this.m_u2.Set(p2X - s2X, p2Y - s2Y);
    length1 = this.m_u1.Length();
    length2 = this.m_u2.Length();
    if(length1 > b2Settings.b2_linearSlop) {
      this.m_u1.Multiply(1 / length1)
    }else {
      this.m_u1.SetZero()
    }
    if(length2 > b2Settings.b2_linearSlop) {
      this.m_u2.Multiply(1 / length2)
    }else {
      this.m_u2.SetZero()
    }
    C = this.m_constant - length1 - this.m_ratio * length2;
    linearError = b2Math.Max(linearError, -C);
    C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
    impulse = -this.m_pulleyMass * C;
    p1X = -impulse * this.m_u1.x;
    p1Y = -impulse * this.m_u1.y;
    p2X = -this.m_ratio * impulse * this.m_u2.x;
    p2Y = -this.m_ratio * impulse * this.m_u2.y;
    bA.m_sweep.c.x += bA.m_invMass * p1X;
    bA.m_sweep.c.y += bA.m_invMass * p1Y;
    bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
    bB.m_sweep.c.x += bB.m_invMass * p2X;
    bB.m_sweep.c.y += bB.m_invMass * p2Y;
    bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
    bA.SynchronizeTransform();
    bB.SynchronizeTransform()
  }
  if(this.m_limitState1 == b2Joint.e_atUpperLimit) {
    tMat = bA.m_xf.R;
    r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
    r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
    r1X = tX;
    p1X = bA.m_sweep.c.x + r1X;
    p1Y = bA.m_sweep.c.y + r1Y;
    this.m_u1.Set(p1X - s1X, p1Y - s1Y);
    length1 = this.m_u1.Length();
    if(length1 > b2Settings.b2_linearSlop) {
      this.m_u1.x *= 1 / length1;
      this.m_u1.y *= 1 / length1
    }else {
      this.m_u1.SetZero()
    }
    C = this.m_maxLength1 - length1;
    linearError = b2Math.Max(linearError, -C);
    C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
    impulse = -this.m_limitMass1 * C;
    p1X = -impulse * this.m_u1.x;
    p1Y = -impulse * this.m_u1.y;
    bA.m_sweep.c.x += bA.m_invMass * p1X;
    bA.m_sweep.c.y += bA.m_invMass * p1Y;
    bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
    bA.SynchronizeTransform()
  }
  if(this.m_limitState2 == b2Joint.e_atUpperLimit) {
    tMat = bB.m_xf.R;
    r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
    r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
    r2X = tX;
    p2X = bB.m_sweep.c.x + r2X;
    p2Y = bB.m_sweep.c.y + r2Y;
    this.m_u2.Set(p2X - s2X, p2Y - s2Y);
    length2 = this.m_u2.Length();
    if(length2 > b2Settings.b2_linearSlop) {
      this.m_u2.x *= 1 / length2;
      this.m_u2.y *= 1 / length2
    }else {
      this.m_u2.SetZero()
    }
    C = this.m_maxLength2 - length2;
    linearError = b2Math.Max(linearError, -C);
    C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
    impulse = -this.m_limitMass2 * C;
    p2X = -impulse * this.m_u2.x;
    p2Y = -impulse * this.m_u2.y;
    bB.m_sweep.c.x += bB.m_invMass * p2X;
    bB.m_sweep.c.y += bB.m_invMass * p2Y;
    bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
    bB.SynchronizeTransform()
  }
  return linearError < b2Settings.b2_linearSlop
};
b2PulleyJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2PulleyJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2PulleyJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse * this.m_u2.x, inv_dt * this.m_impulse * this.m_u2.y)
};
b2PulleyJoint.prototype.GetReactionTorque = function(inv_dt) {
  return 0
};
b2PulleyJoint.prototype.GetGroundAnchorA = function() {
  var a = this.m_ground.m_xf.position.Copy();
  a.Add(this.m_groundAnchor1);
  return a
};
b2PulleyJoint.prototype.GetGroundAnchorB = function() {
  var a = this.m_ground.m_xf.position.Copy();
  a.Add(this.m_groundAnchor2);
  return a
};
b2PulleyJoint.prototype.GetLength1 = function() {
  var p = this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
  var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
  var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
  var dX = p.x - sX;
  var dY = p.y - sY;
  return Math.sqrt(dX * dX + dY * dY)
};
b2PulleyJoint.prototype.GetLength2 = function() {
  var p = this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
  var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
  var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
  var dX = p.x - sX;
  var dY = p.y - sY;
  return Math.sqrt(dX * dX + dY * dY)
};
b2PulleyJoint.prototype.GetRatio = function() {
  return this.m_ratio
};
b2PulleyJoint.prototype.m_ground = null;
b2PulleyJoint.prototype.m_groundAnchor1 = new b2Vec2;
b2PulleyJoint.prototype.m_groundAnchor2 = new b2Vec2;
b2PulleyJoint.prototype.m_localAnchor1 = new b2Vec2;
b2PulleyJoint.prototype.m_localAnchor2 = new b2Vec2;
b2PulleyJoint.prototype.m_u1 = new b2Vec2;
b2PulleyJoint.prototype.m_u2 = new b2Vec2;
b2PulleyJoint.prototype.m_constant = null;
b2PulleyJoint.prototype.m_ratio = null;
b2PulleyJoint.prototype.m_maxLength1 = null;
b2PulleyJoint.prototype.m_maxLength2 = null;
b2PulleyJoint.prototype.m_pulleyMass = null;
b2PulleyJoint.prototype.m_limitMass1 = null;
b2PulleyJoint.prototype.m_limitMass2 = null;
b2PulleyJoint.prototype.m_impulse = null;
b2PulleyJoint.prototype.m_limitImpulse1 = null;
b2PulleyJoint.prototype.m_limitImpulse2 = null;
b2PulleyJoint.prototype.m_state = 0;
b2PulleyJoint.prototype.m_limitState1 = 0;
b2PulleyJoint.prototype.m_limitState2 = 0;var b2PrismaticJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PrismaticJoint.prototype, b2Joint.prototype);
b2PrismaticJoint.prototype._super = b2Joint.prototype;
b2PrismaticJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var tMat;
  var tX;
  var tY;
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_localXAxis1.SetV(def.localAxisA);
  this.m_localYAxis1.x = -this.m_localXAxis1.y;
  this.m_localYAxis1.y = this.m_localXAxis1.x;
  this.m_refAngle = def.referenceAngle;
  this.m_impulse.SetZero();
  this.m_motorMass = 0;
  this.m_motorImpulse = 0;
  this.m_lowerTranslation = def.lowerTranslation;
  this.m_upperTranslation = def.upperTranslation;
  this.m_maxMotorForce = def.maxMotorForce;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableLimit = def.enableLimit;
  this.m_enableMotor = def.enableMotor;
  this.m_limitState = b2Joint.e_inactiveLimit;
  this.m_axis.SetZero();
  this.m_perp.SetZero()
};
b2PrismaticJoint.prototype.__varz = function() {
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_localXAxis1 = new b2Vec2;
  this.m_localYAxis1 = new b2Vec2;
  this.m_axis = new b2Vec2;
  this.m_perp = new b2Vec2;
  this.m_K = new b2Mat33;
  this.m_impulse = new b2Vec3
};
b2PrismaticJoint.prototype.InitVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var tX;
  this.m_localCenterA.SetV(bA.GetLocalCenter());
  this.m_localCenterB.SetV(bB.GetLocalCenter());
  var xf1 = bA.GetTransform();
  var xf2 = bB.GetTransform();
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
  var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
  var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  this.m_invMassA = bA.m_invMass;
  this.m_invMassB = bB.m_invMass;
  this.m_invIA = bA.m_invI;
  this.m_invIB = bB.m_invI;
  this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
  this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
  this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
  this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
  if(this.m_motorMass > Number.MIN_VALUE) {
    this.m_motorMass = 1 / this.m_motorMass
  }
  this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
  this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
  this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
  var m1 = this.m_invMassA;
  var m2 = this.m_invMassB;
  var i1 = this.m_invIA;
  var i2 = this.m_invIB;
  this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
  this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
  this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
  this.m_K.col2.x = this.m_K.col1.y;
  this.m_K.col2.y = i1 + i2;
  this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
  this.m_K.col3.x = this.m_K.col1.z;
  this.m_K.col3.y = this.m_K.col2.z;
  this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
  if(this.m_enableLimit) {
    var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
    if(b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
      this.m_limitState = b2Joint.e_equalLimits
    }else {
      if(jointTransition <= this.m_lowerTranslation) {
        if(this.m_limitState != b2Joint.e_atLowerLimit) {
          this.m_limitState = b2Joint.e_atLowerLimit;
          this.m_impulse.z = 0
        }
      }else {
        if(jointTransition >= this.m_upperTranslation) {
          if(this.m_limitState != b2Joint.e_atUpperLimit) {
            this.m_limitState = b2Joint.e_atUpperLimit;
            this.m_impulse.z = 0
          }
        }else {
          this.m_limitState = b2Joint.e_inactiveLimit;
          this.m_impulse.z = 0
        }
      }
    }
  }else {
    this.m_limitState = b2Joint.e_inactiveLimit
  }
  if(this.m_enableMotor == false) {
    this.m_motorImpulse = 0
  }
  if(step.warmStarting) {
    this.m_impulse.x *= step.dtRatio;
    this.m_impulse.y *= step.dtRatio;
    this.m_motorImpulse *= step.dtRatio;
    var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
    var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
    var L1 = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
    var L2 = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
    bA.m_linearVelocity.x -= this.m_invMassA * PX;
    bA.m_linearVelocity.y -= this.m_invMassA * PY;
    bA.m_angularVelocity -= this.m_invIA * L1;
    bB.m_linearVelocity.x += this.m_invMassB * PX;
    bB.m_linearVelocity.y += this.m_invMassB * PY;
    bB.m_angularVelocity += this.m_invIB * L2
  }else {
    this.m_impulse.SetZero();
    this.m_motorImpulse = 0
  }
};
b2PrismaticJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var v1 = bA.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var v2 = bB.m_linearVelocity;
  var w2 = bB.m_angularVelocity;
  var PX;
  var PY;
  var L1;
  var L2;
  if(this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
    var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
    var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
    var oldImpulse = this.m_motorImpulse;
    var maxImpulse = step.dt * this.m_maxMotorForce;
    this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
    impulse = this.m_motorImpulse - oldImpulse;
    PX = impulse * this.m_axis.x;
    PY = impulse * this.m_axis.y;
    L1 = impulse * this.m_a1;
    L2 = impulse * this.m_a2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }
  var Cdot1X = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
  var Cdot1Y = w2 - w1;
  if(this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
    var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
    var f1 = this.m_impulse.Copy();
    var df = this.m_K.Solve33(new b2Vec3, -Cdot1X, -Cdot1Y, -Cdot2);
    this.m_impulse.Add(df);
    if(this.m_limitState == b2Joint.e_atLowerLimit) {
      this.m_impulse.z = b2Math.Max(this.m_impulse.z, 0)
    }else {
      if(this.m_limitState == b2Joint.e_atUpperLimit) {
        this.m_impulse.z = b2Math.Min(this.m_impulse.z, 0)
      }
    }
    var bX = -Cdot1X - (this.m_impulse.z - f1.z) * this.m_K.col3.x;
    var bY = -Cdot1Y - (this.m_impulse.z - f1.z) * this.m_K.col3.y;
    var f2r = this.m_K.Solve22(new b2Vec2, bX, bY);
    f2r.x += f1.x;
    f2r.y += f1.y;
    this.m_impulse.x = f2r.x;
    this.m_impulse.y = f2r.y;
    df.x = this.m_impulse.x - f1.x;
    df.y = this.m_impulse.y - f1.y;
    df.z = this.m_impulse.z - f1.z;
    PX = df.x * this.m_perp.x + df.z * this.m_axis.x;
    PY = df.x * this.m_perp.y + df.z * this.m_axis.y;
    L1 = df.x * this.m_s1 + df.y + df.z * this.m_a1;
    L2 = df.x * this.m_s2 + df.y + df.z * this.m_a2;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }else {
    var df2 = this.m_K.Solve22(new b2Vec2, -Cdot1X, -Cdot1Y);
    this.m_impulse.x += df2.x;
    this.m_impulse.y += df2.y;
    PX = df2.x * this.m_perp.x;
    PY = df2.x * this.m_perp.y;
    L1 = df2.x * this.m_s1 + df2.y;
    L2 = df2.x * this.m_s2 + df2.y;
    v1.x -= this.m_invMassA * PX;
    v1.y -= this.m_invMassA * PY;
    w1 -= this.m_invIA * L1;
    v2.x += this.m_invMassB * PX;
    v2.y += this.m_invMassB * PY;
    w2 += this.m_invIB * L2
  }
  bA.m_linearVelocity.SetV(v1);
  bA.m_angularVelocity = w1;
  bB.m_linearVelocity.SetV(v2);
  bB.m_angularVelocity = w2
};
b2PrismaticJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var limitC;
  var oldLimitImpulse;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var c1 = bA.m_sweep.c;
  var a1 = bA.m_sweep.a;
  var c2 = bB.m_sweep.c;
  var a2 = bB.m_sweep.a;
  var tMat;
  var tX;
  var m1;
  var m2;
  var i1;
  var i2;
  var linearError = 0;
  var angularError = 0;
  var active = false;
  var C2 = 0;
  var R1 = b2Mat22.FromAngle(a1);
  var R2 = b2Mat22.FromAngle(a2);
  tMat = R1;
  var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
  var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = R2;
  var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
  var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = c2.x + r2X - c1.x - r1X;
  var dY = c2.y + r2Y - c1.y - r1Y;
  if(this.m_enableLimit) {
    this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
    this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
    this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
    var translation = this.m_axis.x * dX + this.m_axis.y * dY;
    if(b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
      C2 = b2Math.Clamp(translation, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
      linearError = b2Math.Abs(translation);
      active = true
    }else {
      if(translation <= this.m_lowerTranslation) {
        C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
        linearError = this.m_lowerTranslation - translation;
        active = true
      }else {
        if(translation >= this.m_upperTranslation) {
          C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection);
          linearError = translation - this.m_upperTranslation;
          active = true
        }
      }
    }
  }
  this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
  this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
  this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
  var impulse = new b2Vec3;
  var C1X = this.m_perp.x * dX + this.m_perp.y * dY;
  var C1Y = a2 - a1 - this.m_refAngle;
  linearError = b2Math.Max(linearError, b2Math.Abs(C1X));
  angularError = b2Math.Abs(C1Y);
  if(active) {
    m1 = this.m_invMassA;
    m2 = this.m_invMassB;
    i1 = this.m_invIA;
    i2 = this.m_invIB;
    this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
    this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
    this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
    this.m_K.col2.x = this.m_K.col1.y;
    this.m_K.col2.y = i1 + i2;
    this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
    this.m_K.col3.x = this.m_K.col1.z;
    this.m_K.col3.y = this.m_K.col2.z;
    this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
    this.m_K.Solve33(impulse, -C1X, -C1Y, -C2)
  }else {
    m1 = this.m_invMassA;
    m2 = this.m_invMassB;
    i1 = this.m_invIA;
    i2 = this.m_invIB;
    var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
    var k12 = i1 * this.m_s1 + i2 * this.m_s2;
    var k22 = i1 + i2;
    this.m_K.col1.Set(k11, k12, 0);
    this.m_K.col2.Set(k12, k22, 0);
    var impulse1 = this.m_K.Solve22(new b2Vec2, -C1X, -C1Y);
    impulse.x = impulse1.x;
    impulse.y = impulse1.y;
    impulse.z = 0
  }
  var PX = impulse.x * this.m_perp.x + impulse.z * this.m_axis.x;
  var PY = impulse.x * this.m_perp.y + impulse.z * this.m_axis.y;
  var L1 = impulse.x * this.m_s1 + impulse.y + impulse.z * this.m_a1;
  var L2 = impulse.x * this.m_s2 + impulse.y + impulse.z * this.m_a2;
  c1.x -= this.m_invMassA * PX;
  c1.y -= this.m_invMassA * PY;
  a1 -= this.m_invIA * L1;
  c2.x += this.m_invMassB * PX;
  c2.y += this.m_invMassB * PY;
  a2 += this.m_invIB * L2;
  bA.m_sweep.a = a1;
  bB.m_sweep.a = a2;
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
};
b2PrismaticJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2PrismaticJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2PrismaticJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
};
b2PrismaticJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.y
};
b2PrismaticJoint.prototype.GetJointTranslation = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var p1 = bA.GetWorldPoint(this.m_localAnchor1);
  var p2 = bB.GetWorldPoint(this.m_localAnchor2);
  var dX = p2.x - p1.x;
  var dY = p2.y - p1.y;
  var axis = bA.GetWorldVector(this.m_localXAxis1);
  var translation = axis.x * dX + axis.y * dY;
  return translation
};
b2PrismaticJoint.prototype.GetJointSpeed = function() {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var p1X = bA.m_sweep.c.x + r1X;
  var p1Y = bA.m_sweep.c.y + r1Y;
  var p2X = bB.m_sweep.c.x + r2X;
  var p2Y = bB.m_sweep.c.y + r2Y;
  var dX = p2X - p1X;
  var dY = p2Y - p1Y;
  var axis = bA.GetWorldVector(this.m_localXAxis1);
  var v1 = bA.m_linearVelocity;
  var v2 = bB.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var w2 = bB.m_angularVelocity;
  var speed = dX * -w1 * axis.y + dY * w1 * axis.x + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
  return speed
};
b2PrismaticJoint.prototype.IsLimitEnabled = function() {
  return this.m_enableLimit
};
b2PrismaticJoint.prototype.EnableLimit = function(flag) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_enableLimit = flag
};
b2PrismaticJoint.prototype.GetLowerLimit = function() {
  return this.m_lowerTranslation
};
b2PrismaticJoint.prototype.GetUpperLimit = function() {
  return this.m_upperTranslation
};
b2PrismaticJoint.prototype.SetLimits = function(lower, upper) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_lowerTranslation = lower;
  this.m_upperTranslation = upper
};
b2PrismaticJoint.prototype.IsMotorEnabled = function() {
  return this.m_enableMotor
};
b2PrismaticJoint.prototype.EnableMotor = function(flag) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_enableMotor = flag
};
b2PrismaticJoint.prototype.SetMotorSpeed = function(speed) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_motorSpeed = speed
};
b2PrismaticJoint.prototype.GetMotorSpeed = function() {
  return this.m_motorSpeed
};
b2PrismaticJoint.prototype.SetMaxMotorForce = function(force) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_maxMotorForce = force
};
b2PrismaticJoint.prototype.GetMotorForce = function() {
  return this.m_motorImpulse
};
b2PrismaticJoint.prototype.m_localAnchor1 = new b2Vec2;
b2PrismaticJoint.prototype.m_localAnchor2 = new b2Vec2;
b2PrismaticJoint.prototype.m_localXAxis1 = new b2Vec2;
b2PrismaticJoint.prototype.m_localYAxis1 = new b2Vec2;
b2PrismaticJoint.prototype.m_refAngle = null;
b2PrismaticJoint.prototype.m_axis = new b2Vec2;
b2PrismaticJoint.prototype.m_perp = new b2Vec2;
b2PrismaticJoint.prototype.m_s1 = null;
b2PrismaticJoint.prototype.m_s2 = null;
b2PrismaticJoint.prototype.m_a1 = null;
b2PrismaticJoint.prototype.m_a2 = null;
b2PrismaticJoint.prototype.m_K = new b2Mat33;
b2PrismaticJoint.prototype.m_impulse = new b2Vec3;
b2PrismaticJoint.prototype.m_motorMass = null;
b2PrismaticJoint.prototype.m_motorImpulse = null;
b2PrismaticJoint.prototype.m_lowerTranslation = null;
b2PrismaticJoint.prototype.m_upperTranslation = null;
b2PrismaticJoint.prototype.m_maxMotorForce = null;
b2PrismaticJoint.prototype.m_motorSpeed = null;
b2PrismaticJoint.prototype.m_enableLimit = null;
b2PrismaticJoint.prototype.m_enableMotor = null;
b2PrismaticJoint.prototype.m_limitState = 0;var b2RevoluteJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2RevoluteJoint.prototype, b2Joint.prototype);
b2RevoluteJoint.prototype._super = b2Joint.prototype;
b2RevoluteJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_referenceAngle = def.referenceAngle;
  this.m_impulse.SetZero();
  this.m_motorImpulse = 0;
  this.m_lowerAngle = def.lowerAngle;
  this.m_upperAngle = def.upperAngle;
  this.m_maxMotorTorque = def.maxMotorTorque;
  this.m_motorSpeed = def.motorSpeed;
  this.m_enableLimit = def.enableLimit;
  this.m_enableMotor = def.enableMotor;
  this.m_limitState = b2Joint.e_inactiveLimit
};
b2RevoluteJoint.prototype.__varz = function() {
  this.K = new b2Mat22;
  this.K1 = new b2Mat22;
  this.K2 = new b2Mat22;
  this.K3 = new b2Mat22;
  this.impulse3 = new b2Vec3;
  this.impulse2 = new b2Vec2;
  this.reduced = new b2Vec2;
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_impulse = new b2Vec3;
  this.m_mass = new b2Mat33
};
b2RevoluteJoint.tImpulse = new b2Vec2;
b2RevoluteJoint.prototype.InitVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var tX;
  if(this.m_enableMotor || this.m_enableLimit) {
  }
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var m1 = bA.m_invMass;
  var m2 = bB.m_invMass;
  var i1 = bA.m_invI;
  var i2 = bB.m_invI;
  this.m_mass.col1.x = m1 + m2 + r1Y * r1Y * i1 + r2Y * r2Y * i2;
  this.m_mass.col2.x = -r1Y * r1X * i1 - r2Y * r2X * i2;
  this.m_mass.col3.x = -r1Y * i1 - r2Y * i2;
  this.m_mass.col1.y = this.m_mass.col2.x;
  this.m_mass.col2.y = m1 + m2 + r1X * r1X * i1 + r2X * r2X * i2;
  this.m_mass.col3.y = r1X * i1 + r2X * i2;
  this.m_mass.col1.z = this.m_mass.col3.x;
  this.m_mass.col2.z = this.m_mass.col3.y;
  this.m_mass.col3.z = i1 + i2;
  this.m_motorMass = 1 / (i1 + i2);
  if(this.m_enableMotor == false) {
    this.m_motorImpulse = 0
  }
  if(this.m_enableLimit) {
    var jointAngle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
    if(b2Math.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b2Settings.b2_angularSlop) {
      this.m_limitState = b2Joint.e_equalLimits
    }else {
      if(jointAngle <= this.m_lowerAngle) {
        if(this.m_limitState != b2Joint.e_atLowerLimit) {
          this.m_impulse.z = 0
        }
        this.m_limitState = b2Joint.e_atLowerLimit
      }else {
        if(jointAngle >= this.m_upperAngle) {
          if(this.m_limitState != b2Joint.e_atUpperLimit) {
            this.m_impulse.z = 0
          }
          this.m_limitState = b2Joint.e_atUpperLimit
        }else {
          this.m_limitState = b2Joint.e_inactiveLimit;
          this.m_impulse.z = 0
        }
      }
    }
  }else {
    this.m_limitState = b2Joint.e_inactiveLimit
  }
  if(step.warmStarting) {
    this.m_impulse.x *= step.dtRatio;
    this.m_impulse.y *= step.dtRatio;
    this.m_motorImpulse *= step.dtRatio;
    var PX = this.m_impulse.x;
    var PY = this.m_impulse.y;
    bA.m_linearVelocity.x -= m1 * PX;
    bA.m_linearVelocity.y -= m1 * PY;
    bA.m_angularVelocity -= i1 * (r1X * PY - r1Y * PX + this.m_motorImpulse + this.m_impulse.z);
    bB.m_linearVelocity.x += m2 * PX;
    bB.m_linearVelocity.y += m2 * PY;
    bB.m_angularVelocity += i2 * (r2X * PY - r2Y * PX + this.m_motorImpulse + this.m_impulse.z)
  }else {
    this.m_impulse.SetZero();
    this.m_motorImpulse = 0
  }
};
b2RevoluteJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var tMat;
  var tX;
  var newImpulse;
  var r1X;
  var r1Y;
  var r2X;
  var r2Y;
  var v1 = bA.m_linearVelocity;
  var w1 = bA.m_angularVelocity;
  var v2 = bB.m_linearVelocity;
  var w2 = bB.m_angularVelocity;
  var m1 = bA.m_invMass;
  var m2 = bB.m_invMass;
  var i1 = bA.m_invI;
  var i2 = bB.m_invI;
  if(this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
    var Cdot = w2 - w1 - this.m_motorSpeed;
    var impulse = this.m_motorMass * -Cdot;
    var oldImpulse = this.m_motorImpulse;
    var maxImpulse = step.dt * this.m_maxMotorTorque;
    this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
    impulse = this.m_motorImpulse - oldImpulse;
    w1 -= i1 * impulse;
    w2 += i2 * impulse
  }
  if(this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
    tMat = bA.m_xf.R;
    r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
    r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
    r1X = tX;
    tMat = bB.m_xf.R;
    r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
    r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
    r2X = tX;
    var Cdot1X = v2.x + -w2 * r2Y - v1.x - -w1 * r1Y;
    var Cdot1Y = v2.y + w2 * r2X - v1.y - w1 * r1X;
    var Cdot2 = w2 - w1;
    this.m_mass.Solve33(this.impulse3, -Cdot1X, -Cdot1Y, -Cdot2);
    if(this.m_limitState == b2Joint.e_equalLimits) {
      this.m_impulse.Add(this.impulse3)
    }else {
      if(this.m_limitState == b2Joint.e_atLowerLimit) {
        newImpulse = this.m_impulse.z + this.impulse3.z;
        if(newImpulse < 0) {
          this.m_mass.Solve22(this.reduced, -Cdot1X, -Cdot1Y);
          this.impulse3.x = this.reduced.x;
          this.impulse3.y = this.reduced.y;
          this.impulse3.z = -this.m_impulse.z;
          this.m_impulse.x += this.reduced.x;
          this.m_impulse.y += this.reduced.y;
          this.m_impulse.z = 0
        }
      }else {
        if(this.m_limitState == b2Joint.e_atUpperLimit) {
          newImpulse = this.m_impulse.z + this.impulse3.z;
          if(newImpulse > 0) {
            this.m_mass.Solve22(this.reduced, -Cdot1X, -Cdot1Y);
            this.impulse3.x = this.reduced.x;
            this.impulse3.y = this.reduced.y;
            this.impulse3.z = -this.m_impulse.z;
            this.m_impulse.x += this.reduced.x;
            this.m_impulse.y += this.reduced.y;
            this.m_impulse.z = 0
          }
        }
      }
    }
    v1.x -= m1 * this.impulse3.x;
    v1.y -= m1 * this.impulse3.y;
    w1 -= i1 * (r1X * this.impulse3.y - r1Y * this.impulse3.x + this.impulse3.z);
    v2.x += m2 * this.impulse3.x;
    v2.y += m2 * this.impulse3.y;
    w2 += i2 * (r2X * this.impulse3.y - r2Y * this.impulse3.x + this.impulse3.z)
  }else {
    tMat = bA.m_xf.R;
    r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
    r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
    r1X = tX;
    tMat = bB.m_xf.R;
    r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
    r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
    r2X = tX;
    var CdotX = v2.x + -w2 * r2Y - v1.x - -w1 * r1Y;
    var CdotY = v2.y + w2 * r2X - v1.y - w1 * r1X;
    this.m_mass.Solve22(this.impulse2, -CdotX, -CdotY);
    this.m_impulse.x += this.impulse2.x;
    this.m_impulse.y += this.impulse2.y;
    v1.x -= m1 * this.impulse2.x;
    v1.y -= m1 * this.impulse2.y;
    w1 -= i1 * (r1X * this.impulse2.y - r1Y * this.impulse2.x);
    v2.x += m2 * this.impulse2.x;
    v2.y += m2 * this.impulse2.y;
    w2 += i2 * (r2X * this.impulse2.y - r2Y * this.impulse2.x)
  }
  bA.m_linearVelocity.SetV(v1);
  bA.m_angularVelocity = w1;
  bB.m_linearVelocity.SetV(v2);
  bB.m_angularVelocity = w2
};
b2RevoluteJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var oldLimitImpulse;
  var C;
  var tMat;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var angularError = 0;
  var positionError = 0;
  var tX;
  var impulseX;
  var impulseY;
  if(this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
    var angle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
    var limitImpulse = 0;
    if(this.m_limitState == b2Joint.e_equalLimits) {
      C = b2Math.Clamp(angle - this.m_lowerAngle, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection);
      limitImpulse = -this.m_motorMass * C;
      angularError = b2Math.Abs(C)
    }else {
      if(this.m_limitState == b2Joint.e_atLowerLimit) {
        C = angle - this.m_lowerAngle;
        angularError = -C;
        C = b2Math.Clamp(C + b2Settings.b2_angularSlop, -b2Settings.b2_maxAngularCorrection, 0);
        limitImpulse = -this.m_motorMass * C
      }else {
        if(this.m_limitState == b2Joint.e_atUpperLimit) {
          C = angle - this.m_upperAngle;
          angularError = C;
          C = b2Math.Clamp(C - b2Settings.b2_angularSlop, 0, b2Settings.b2_maxAngularCorrection);
          limitImpulse = -this.m_motorMass * C
        }
      }
    }
    bA.m_sweep.a -= bA.m_invI * limitImpulse;
    bB.m_sweep.a += bB.m_invI * limitImpulse;
    bA.SynchronizeTransform();
    bB.SynchronizeTransform()
  }
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  var CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  var CLengthSquared = CX * CX + CY * CY;
  var CLength = Math.sqrt(CLengthSquared);
  positionError = CLength;
  var invMass1 = bA.m_invMass;
  var invMass2 = bB.m_invMass;
  var invI1 = bA.m_invI;
  var invI2 = bB.m_invI;
  var k_allowedStretch = 10 * b2Settings.b2_linearSlop;
  if(CLengthSquared > k_allowedStretch * k_allowedStretch) {
    var uX = CX / CLength;
    var uY = CY / CLength;
    var k = invMass1 + invMass2;
    var m = 1 / k;
    impulseX = m * -CX;
    impulseY = m * -CY;
    var k_beta = 0.5;
    bA.m_sweep.c.x -= k_beta * invMass1 * impulseX;
    bA.m_sweep.c.y -= k_beta * invMass1 * impulseY;
    bB.m_sweep.c.x += k_beta * invMass2 * impulseX;
    bB.m_sweep.c.y += k_beta * invMass2 * impulseY;
    CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
    CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y
  }
  this.K1.col1.x = invMass1 + invMass2;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = invMass1 + invMass2;
  this.K2.col1.x = invI1 * r1Y * r1Y;
  this.K2.col2.x = -invI1 * r1X * r1Y;
  this.K2.col1.y = -invI1 * r1X * r1Y;
  this.K2.col2.y = invI1 * r1X * r1X;
  this.K3.col1.x = invI2 * r2Y * r2Y;
  this.K3.col2.x = -invI2 * r2X * r2Y;
  this.K3.col1.y = -invI2 * r2X * r2Y;
  this.K3.col2.y = invI2 * r2X * r2X;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.AddM(this.K3);
  this.K.Solve(b2RevoluteJoint.tImpulse, -CX, -CY);
  impulseX = b2RevoluteJoint.tImpulse.x;
  impulseY = b2RevoluteJoint.tImpulse.y;
  bA.m_sweep.c.x -= bA.m_invMass * impulseX;
  bA.m_sweep.c.y -= bA.m_invMass * impulseY;
  bA.m_sweep.a -= bA.m_invI * (r1X * impulseY - r1Y * impulseX);
  bB.m_sweep.c.x += bB.m_invMass * impulseX;
  bB.m_sweep.c.y += bB.m_invMass * impulseY;
  bB.m_sweep.a += bB.m_invI * (r2X * impulseY - r2Y * impulseX);
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
};
b2RevoluteJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2RevoluteJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2RevoluteJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
};
b2RevoluteJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_impulse.z
};
b2RevoluteJoint.prototype.GetJointAngle = function() {
  return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
};
b2RevoluteJoint.prototype.GetJointSpeed = function() {
  return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
};
b2RevoluteJoint.prototype.IsLimitEnabled = function() {
  return this.m_enableLimit
};
b2RevoluteJoint.prototype.EnableLimit = function(flag) {
  this.m_enableLimit = flag
};
b2RevoluteJoint.prototype.GetLowerLimit = function() {
  return this.m_lowerAngle
};
b2RevoluteJoint.prototype.GetUpperLimit = function() {
  return this.m_upperAngle
};
b2RevoluteJoint.prototype.SetLimits = function(lower, upper) {
  this.m_lowerAngle = lower;
  this.m_upperAngle = upper
};
b2RevoluteJoint.prototype.IsMotorEnabled = function() {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  return this.m_enableMotor
};
b2RevoluteJoint.prototype.EnableMotor = function(flag) {
  this.m_enableMotor = flag
};
b2RevoluteJoint.prototype.SetMotorSpeed = function(speed) {
  this.m_bodyA.SetAwake(true);
  this.m_bodyB.SetAwake(true);
  this.m_motorSpeed = speed
};
b2RevoluteJoint.prototype.GetMotorSpeed = function() {
  return this.m_motorSpeed
};
b2RevoluteJoint.prototype.SetMaxMotorTorque = function(torque) {
  this.m_maxMotorTorque = torque
};
b2RevoluteJoint.prototype.GetMotorTorque = function() {
  return this.m_maxMotorTorque
};
b2RevoluteJoint.prototype.K = new b2Mat22;
b2RevoluteJoint.prototype.K1 = new b2Mat22;
b2RevoluteJoint.prototype.K2 = new b2Mat22;
b2RevoluteJoint.prototype.K3 = new b2Mat22;
b2RevoluteJoint.prototype.impulse3 = new b2Vec3;
b2RevoluteJoint.prototype.impulse2 = new b2Vec2;
b2RevoluteJoint.prototype.reduced = new b2Vec2;
b2RevoluteJoint.prototype.m_localAnchor1 = new b2Vec2;
b2RevoluteJoint.prototype.m_localAnchor2 = new b2Vec2;
b2RevoluteJoint.prototype.m_impulse = new b2Vec3;
b2RevoluteJoint.prototype.m_motorImpulse = null;
b2RevoluteJoint.prototype.m_mass = new b2Mat33;
b2RevoluteJoint.prototype.m_motorMass = null;
b2RevoluteJoint.prototype.m_enableMotor = null;
b2RevoluteJoint.prototype.m_maxMotorTorque = null;
b2RevoluteJoint.prototype.m_motorSpeed = null;
b2RevoluteJoint.prototype.m_enableLimit = null;
b2RevoluteJoint.prototype.m_referenceAngle = null;
b2RevoluteJoint.prototype.m_lowerAngle = null;
b2RevoluteJoint.prototype.m_upperAngle = null;
b2RevoluteJoint.prototype.m_limitState = 0;var b2JointDef = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2JointDef.prototype.__constructor = function() {
  this.type = b2Joint.e_unknownJoint;
  this.userData = null;
  this.bodyA = null;
  this.bodyB = null;
  this.collideConnected = false
};
b2JointDef.prototype.__varz = function() {
};
b2JointDef.prototype.type = 0;
b2JointDef.prototype.userData = null;
b2JointDef.prototype.bodyA = null;
b2JointDef.prototype.bodyB = null;
b2JointDef.prototype.collideConnected = null;var b2LineJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2LineJointDef.prototype, b2JointDef.prototype);
b2LineJointDef.prototype._super = b2JointDef.prototype;
b2LineJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_lineJoint;
  this.localAxisA.Set(1, 0);
  this.enableLimit = false;
  this.lowerTranslation = 0;
  this.upperTranslation = 0;
  this.enableMotor = false;
  this.maxMotorForce = 0;
  this.motorSpeed = 0
};
b2LineJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2;
  this.localAxisA = new b2Vec2
};
b2LineJointDef.prototype.Initialize = function(bA, bB, anchor, axis) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
  this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
  this.localAxisA = this.bodyA.GetLocalVector(axis)
};
b2LineJointDef.prototype.localAnchorA = new b2Vec2;
b2LineJointDef.prototype.localAnchorB = new b2Vec2;
b2LineJointDef.prototype.localAxisA = new b2Vec2;
b2LineJointDef.prototype.enableLimit = null;
b2LineJointDef.prototype.lowerTranslation = null;
b2LineJointDef.prototype.upperTranslation = null;
b2LineJointDef.prototype.enableMotor = null;
b2LineJointDef.prototype.maxMotorForce = null;
b2LineJointDef.prototype.motorSpeed = null;var b2DistanceJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2DistanceJoint.prototype, b2Joint.prototype);
b2DistanceJoint.prototype._super = b2Joint.prototype;
b2DistanceJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var tMat;
  var tX;
  var tY;
  this.m_localAnchor1.SetV(def.localAnchorA);
  this.m_localAnchor2.SetV(def.localAnchorB);
  this.m_length = def.length;
  this.m_frequencyHz = def.frequencyHz;
  this.m_dampingRatio = def.dampingRatio;
  this.m_impulse = 0;
  this.m_gamma = 0;
  this.m_bias = 0
};
b2DistanceJoint.prototype.__varz = function() {
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_u = new b2Vec2
};
b2DistanceJoint.prototype.InitVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  this.m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  this.m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  var length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
  if(length > b2Settings.b2_linearSlop) {
    this.m_u.Multiply(1 / length)
  }else {
    this.m_u.SetZero()
  }
  var cr1u = r1X * this.m_u.y - r1Y * this.m_u.x;
  var cr2u = r2X * this.m_u.y - r2Y * this.m_u.x;
  var invMass = bA.m_invMass + bA.m_invI * cr1u * cr1u + bB.m_invMass + bB.m_invI * cr2u * cr2u;
  this.m_mass = invMass != 0 ? 1 / invMass : 0;
  if(this.m_frequencyHz > 0) {
    var C = length - this.m_length;
    var omega = 2 * Math.PI * this.m_frequencyHz;
    var d = 2 * this.m_mass * this.m_dampingRatio * omega;
    var k = this.m_mass * omega * omega;
    this.m_gamma = step.dt * (d + step.dt * k);
    this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
    this.m_bias = C * step.dt * k * this.m_gamma;
    this.m_mass = invMass + this.m_gamma;
    this.m_mass = this.m_mass != 0 ? 1 / this.m_mass : 0
  }
  if(step.warmStarting) {
    this.m_impulse *= step.dtRatio;
    var PX = this.m_impulse * this.m_u.x;
    var PY = this.m_impulse * this.m_u.y;
    bA.m_linearVelocity.x -= bA.m_invMass * PX;
    bA.m_linearVelocity.y -= bA.m_invMass * PY;
    bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
    bB.m_linearVelocity.x += bB.m_invMass * PX;
    bB.m_linearVelocity.y += bB.m_invMass * PY;
    bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX)
  }else {
    this.m_impulse = 0
  }
};
b2DistanceJoint.prototype.SolveVelocityConstraints = function(step) {
  var tMat;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
  var v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
  var v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
  var v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
  var Cdot = this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y);
  var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
  this.m_impulse += impulse;
  var PX = impulse * this.m_u.x;
  var PY = impulse * this.m_u.y;
  bA.m_linearVelocity.x -= bA.m_invMass * PX;
  bA.m_linearVelocity.y -= bA.m_invMass * PY;
  bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
  bB.m_linearVelocity.x += bB.m_invMass * PX;
  bB.m_linearVelocity.y += bB.m_invMass * PY;
  bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX)
};
b2DistanceJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var tMat;
  if(this.m_frequencyHz > 0) {
    return true
  }
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
  var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
  var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
  r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
  r1X = tX;
  tMat = bB.m_xf.R;
  var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
  var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
  r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
  r2X = tX;
  var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
  var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
  var length = Math.sqrt(dX * dX + dY * dY);
  dX /= length;
  dY /= length;
  var C = length - this.m_length;
  C = b2Math.Clamp(C, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
  var impulse = -this.m_mass * C;
  this.m_u.Set(dX, dY);
  var PX = impulse * this.m_u.x;
  var PY = impulse * this.m_u.y;
  bA.m_sweep.c.x -= bA.m_invMass * PX;
  bA.m_sweep.c.y -= bA.m_invMass * PY;
  bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
  bB.m_sweep.c.x += bB.m_invMass * PX;
  bB.m_sweep.c.y += bB.m_invMass * PY;
  bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return b2Math.Abs(C) < b2Settings.b2_linearSlop
};
b2DistanceJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2DistanceJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2DistanceJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse * this.m_u.x, inv_dt * this.m_impulse * this.m_u.y)
};
b2DistanceJoint.prototype.GetReactionTorque = function(inv_dt) {
  return 0
};
b2DistanceJoint.prototype.GetLength = function() {
  return this.m_length
};
b2DistanceJoint.prototype.SetLength = function(length) {
  this.m_length = length
};
b2DistanceJoint.prototype.GetFrequency = function() {
  return this.m_frequencyHz
};
b2DistanceJoint.prototype.SetFrequency = function(hz) {
  this.m_frequencyHz = hz
};
b2DistanceJoint.prototype.GetDampingRatio = function() {
  return this.m_dampingRatio
};
b2DistanceJoint.prototype.SetDampingRatio = function(ratio) {
  this.m_dampingRatio = ratio
};
b2DistanceJoint.prototype.m_localAnchor1 = new b2Vec2;
b2DistanceJoint.prototype.m_localAnchor2 = new b2Vec2;
b2DistanceJoint.prototype.m_u = new b2Vec2;
b2DistanceJoint.prototype.m_frequencyHz = null;
b2DistanceJoint.prototype.m_dampingRatio = null;
b2DistanceJoint.prototype.m_gamma = null;
b2DistanceJoint.prototype.m_bias = null;
b2DistanceJoint.prototype.m_impulse = null;
b2DistanceJoint.prototype.m_mass = null;
b2DistanceJoint.prototype.m_length = null;var b2PulleyJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PulleyJointDef.prototype, b2JointDef.prototype);
b2PulleyJointDef.prototype._super = b2JointDef.prototype;
b2PulleyJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_pulleyJoint;
  this.groundAnchorA.Set(-1, 1);
  this.groundAnchorB.Set(1, 1);
  this.localAnchorA.Set(-1, 0);
  this.localAnchorB.Set(1, 0);
  this.lengthA = 0;
  this.maxLengthA = 0;
  this.lengthB = 0;
  this.maxLengthB = 0;
  this.ratio = 1;
  this.collideConnected = true
};
b2PulleyJointDef.prototype.__varz = function() {
  this.groundAnchorA = new b2Vec2;
  this.groundAnchorB = new b2Vec2;
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2PulleyJointDef.prototype.Initialize = function(bA, bB, gaA, gaB, anchorA, anchorB, r) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.groundAnchorA.SetV(gaA);
  this.groundAnchorB.SetV(gaB);
  this.localAnchorA = this.bodyA.GetLocalPoint(anchorA);
  this.localAnchorB = this.bodyB.GetLocalPoint(anchorB);
  var d1X = anchorA.x - gaA.x;
  var d1Y = anchorA.y - gaA.y;
  this.lengthA = Math.sqrt(d1X * d1X + d1Y * d1Y);
  var d2X = anchorB.x - gaB.x;
  var d2Y = anchorB.y - gaB.y;
  this.lengthB = Math.sqrt(d2X * d2X + d2Y * d2Y);
  this.ratio = r;
  var C = this.lengthA + this.ratio * this.lengthB;
  this.maxLengthA = C - this.ratio * b2PulleyJoint.b2_minPulleyLength;
  this.maxLengthB = (C - b2PulleyJoint.b2_minPulleyLength) / this.ratio
};
b2PulleyJointDef.prototype.groundAnchorA = new b2Vec2;
b2PulleyJointDef.prototype.groundAnchorB = new b2Vec2;
b2PulleyJointDef.prototype.localAnchorA = new b2Vec2;
b2PulleyJointDef.prototype.localAnchorB = new b2Vec2;
b2PulleyJointDef.prototype.lengthA = null;
b2PulleyJointDef.prototype.maxLengthA = null;
b2PulleyJointDef.prototype.lengthB = null;
b2PulleyJointDef.prototype.maxLengthB = null;
b2PulleyJointDef.prototype.ratio = null;var b2DistanceJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2DistanceJointDef.prototype, b2JointDef.prototype);
b2DistanceJointDef.prototype._super = b2JointDef.prototype;
b2DistanceJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_distanceJoint;
  this.length = 1;
  this.frequencyHz = 0;
  this.dampingRatio = 0
};
b2DistanceJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2DistanceJointDef.prototype.Initialize = function(bA, bB, anchorA, anchorB) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchorA));
  this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchorB));
  var dX = anchorB.x - anchorA.x;
  var dY = anchorB.y - anchorA.y;
  this.length = Math.sqrt(dX * dX + dY * dY);
  this.frequencyHz = 0;
  this.dampingRatio = 0
};
b2DistanceJointDef.prototype.localAnchorA = new b2Vec2;
b2DistanceJointDef.prototype.localAnchorB = new b2Vec2;
b2DistanceJointDef.prototype.length = null;
b2DistanceJointDef.prototype.frequencyHz = null;
b2DistanceJointDef.prototype.dampingRatio = null;var b2FrictionJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2FrictionJointDef.prototype, b2JointDef.prototype);
b2FrictionJointDef.prototype._super = b2JointDef.prototype;
b2FrictionJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_frictionJoint;
  this.maxForce = 0;
  this.maxTorque = 0
};
b2FrictionJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2FrictionJointDef.prototype.Initialize = function(bA, bB, anchor) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
  this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor))
};
b2FrictionJointDef.prototype.localAnchorA = new b2Vec2;
b2FrictionJointDef.prototype.localAnchorB = new b2Vec2;
b2FrictionJointDef.prototype.maxForce = null;
b2FrictionJointDef.prototype.maxTorque = null;var b2WeldJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2WeldJointDef.prototype, b2JointDef.prototype);
b2WeldJointDef.prototype._super = b2JointDef.prototype;
b2WeldJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_weldJoint;
  this.referenceAngle = 0
};
b2WeldJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2WeldJointDef.prototype.Initialize = function(bA, bB, anchor) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
  this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
  this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
};
b2WeldJointDef.prototype.localAnchorA = new b2Vec2;
b2WeldJointDef.prototype.localAnchorB = new b2Vec2;
b2WeldJointDef.prototype.referenceAngle = null;var b2GearJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2GearJointDef.prototype, b2JointDef.prototype);
b2GearJointDef.prototype._super = b2JointDef.prototype;
b2GearJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_gearJoint;
  this.joint1 = null;
  this.joint2 = null;
  this.ratio = 1
};
b2GearJointDef.prototype.__varz = function() {
};
b2GearJointDef.prototype.joint1 = null;
b2GearJointDef.prototype.joint2 = null;
b2GearJointDef.prototype.ratio = null;var b2Color = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Color.prototype.__constructor = function(rr, gg, bb) {
  this._r = parseInt(255 * b2Math.Clamp(rr, 0, 1));
  this._g = parseInt(255 * b2Math.Clamp(gg, 0, 1));
  this._b = parseInt(255 * b2Math.Clamp(bb, 0, 1))
};
b2Color.prototype.__varz = function() {
};
b2Color.prototype.Set = function(rr, gg, bb) {
  this._r = parseInt(255 * b2Math.Clamp(rr, 0, 1));
  this._g = parseInt(255 * b2Math.Clamp(gg, 0, 1));
  this._b = parseInt(255 * b2Math.Clamp(bb, 0, 1))
};
b2Color.prototype.__defineGetter__("r", function() {
  return this._r
});
b2Color.prototype.__defineSetter__("r", function(rr) {
  this._r = parseInt(255 * b2Math.Clamp(rr, 0, 1))
});
b2Color.prototype.__defineGetter__("g", function() {
  return this._g
});
b2Color.prototype.__defineSetter__("g", function(gg) {
  this._g = parseInt(255 * b2Math.Clamp(gg, 0, 1))
});
b2Color.prototype.__defineGetter__("b", function() {
  return this._g
});
b2Color.prototype.__defineSetter__("b", function(bb) {
  this._b = parseInt(255 * b2Math.Clamp(bb, 0, 1))
});
b2Color.prototype.__defineGetter__("color", function() {
  return this._r << 16 | this._g << 8 | this._b
});
b2Color.prototype._r = 0;
b2Color.prototype._g = 0;
b2Color.prototype._b = 0;var b2FrictionJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2FrictionJoint.prototype, b2Joint.prototype);
b2FrictionJoint.prototype._super = b2Joint.prototype;
b2FrictionJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  this.m_localAnchorA.SetV(def.localAnchorA);
  this.m_localAnchorB.SetV(def.localAnchorB);
  this.m_linearMass.SetZero();
  this.m_angularMass = 0;
  this.m_linearImpulse.SetZero();
  this.m_angularImpulse = 0;
  this.m_maxForce = def.maxForce;
  this.m_maxTorque = def.maxTorque
};
b2FrictionJoint.prototype.__varz = function() {
  this.m_localAnchorA = new b2Vec2;
  this.m_localAnchorB = new b2Vec2;
  this.m_linearImpulse = new b2Vec2;
  this.m_linearMass = new b2Mat22
};
b2FrictionJoint.prototype.InitVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  var K = new b2Mat22;
  K.col1.x = mA + mB;
  K.col2.x = 0;
  K.col1.y = 0;
  K.col2.y = mA + mB;
  K.col1.x += iA * rAY * rAY;
  K.col2.x += -iA * rAX * rAY;
  K.col1.y += -iA * rAX * rAY;
  K.col2.y += iA * rAX * rAX;
  K.col1.x += iB * rBY * rBY;
  K.col2.x += -iB * rBX * rBY;
  K.col1.y += -iB * rBX * rBY;
  K.col2.y += iB * rBX * rBX;
  K.GetInverse(this.m_linearMass);
  this.m_angularMass = iA + iB;
  if(this.m_angularMass > 0) {
    this.m_angularMass = 1 / this.m_angularMass
  }
  if(step.warmStarting) {
    this.m_linearImpulse.x *= step.dtRatio;
    this.m_linearImpulse.y *= step.dtRatio;
    this.m_angularImpulse *= step.dtRatio;
    var P = this.m_linearImpulse;
    bA.m_linearVelocity.x -= mA * P.x;
    bA.m_linearVelocity.y -= mA * P.y;
    bA.m_angularVelocity -= iA * (rAX * P.y - rAY * P.x + this.m_angularImpulse);
    bB.m_linearVelocity.x += mB * P.x;
    bB.m_linearVelocity.y += mB * P.y;
    bB.m_angularVelocity += iB * (rBX * P.y - rBY * P.x + this.m_angularImpulse)
  }else {
    this.m_linearImpulse.SetZero();
    this.m_angularImpulse = 0
  }
};
b2FrictionJoint.prototype.SolveVelocityConstraints = function(step) {
  var tMat;
  var tX;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var vA = bA.m_linearVelocity;
  var wA = bA.m_angularVelocity;
  var vB = bB.m_linearVelocity;
  var wB = bB.m_angularVelocity;
  var mA = bA.m_invMass;
  var mB = bB.m_invMass;
  var iA = bA.m_invI;
  var iB = bB.m_invI;
  tMat = bA.m_xf.R;
  var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
  var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
  tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
  rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
  rAX = tX;
  tMat = bB.m_xf.R;
  var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
  var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
  tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
  rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
  rBX = tX;
  var maxImpulse;
  var Cdot = wB - wA;
  var impulse = -this.m_angularMass * Cdot;
  var oldImpulse = this.m_angularImpulse;
  maxImpulse = step.dt * this.m_maxTorque;
  this.m_angularImpulse = b2Math.Clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
  impulse = this.m_angularImpulse - oldImpulse;
  wA -= iA * impulse;
  wB += iB * impulse;
  var CdotX = vB.x - wB * rBY - vA.x + wA * rAY;
  var CdotY = vB.y + wB * rBX - vA.y - wA * rAX;
  var impulseV = b2Math.MulMV(this.m_linearMass, new b2Vec2(-CdotX, -CdotY));
  var oldImpulseV = this.m_linearImpulse.Copy();
  this.m_linearImpulse.Add(impulseV);
  maxImpulse = step.dt * this.m_maxForce;
  if(this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
    this.m_linearImpulse.Normalize();
    this.m_linearImpulse.Multiply(maxImpulse)
  }
  impulseV = b2Math.SubtractVV(this.m_linearImpulse, oldImpulseV);
  vA.x -= mA * impulseV.x;
  vA.y -= mA * impulseV.y;
  wA -= iA * (rAX * impulseV.y - rAY * impulseV.x);
  vB.x += mB * impulseV.x;
  vB.y += mB * impulseV.y;
  wB += iB * (rBX * impulseV.y - rBY * impulseV.x);
  bA.m_angularVelocity = wA;
  bB.m_angularVelocity = wB
};
b2FrictionJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  return true
};
b2FrictionJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
};
b2FrictionJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
};
b2FrictionJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_linearImpulse.x, inv_dt * this.m_linearImpulse.y)
};
b2FrictionJoint.prototype.GetReactionTorque = function(inv_dt) {
  return inv_dt * this.m_angularImpulse
};
b2FrictionJoint.prototype.SetMaxForce = function(force) {
  this.m_maxForce = force
};
b2FrictionJoint.prototype.GetMaxForce = function() {
  return this.m_maxForce
};
b2FrictionJoint.prototype.SetMaxTorque = function(torque) {
  this.m_maxTorque = torque
};
b2FrictionJoint.prototype.GetMaxTorque = function() {
  return this.m_maxTorque
};
b2FrictionJoint.prototype.m_localAnchorA = new b2Vec2;
b2FrictionJoint.prototype.m_localAnchorB = new b2Vec2;
b2FrictionJoint.prototype.m_linearImpulse = new b2Vec2;
b2FrictionJoint.prototype.m_angularImpulse = null;
b2FrictionJoint.prototype.m_maxForce = null;
b2FrictionJoint.prototype.m_maxTorque = null;
b2FrictionJoint.prototype.m_linearMass = new b2Mat22;
b2FrictionJoint.prototype.m_angularMass = null;var b2Distance = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Distance.prototype.__constructor = function() {
};
b2Distance.prototype.__varz = function() {
};
b2Distance.Distance = function(output, cache, input) {
  ++b2Distance.b2_gjkCalls;
  var proxyA = input.proxyA;
  var proxyB = input.proxyB;
  var transformA = input.transformA;
  var transformB = input.transformB;
  var simplex = b2Distance.s_simplex;
  simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
  var vertices = simplex.m_vertices;
  var k_maxIters = 20;
  var saveA = b2Distance.s_saveA;
  var saveB = b2Distance.s_saveB;
  var saveCount = 0;
  var closestPoint = simplex.GetClosestPoint();
  var distanceSqr1 = closestPoint.LengthSquared();
  var distanceSqr2 = distanceSqr1;
  var i = 0;
  var p;
  var iter = 0;
  while(iter < k_maxIters) {
    saveCount = simplex.m_count;
    for(i = 0;i < saveCount;i++) {
      saveA[i] = vertices[i].indexA;
      saveB[i] = vertices[i].indexB
    }
    switch(simplex.m_count) {
      case 1:
        break;
      case 2:
        simplex.Solve2();
        break;
      case 3:
        simplex.Solve3();
        break;
      default:
        b2Settings.b2Assert(false)
    }
    if(simplex.m_count == 3) {
      break
    }
    p = simplex.GetClosestPoint();
    distanceSqr2 = p.LengthSquared();
    if(distanceSqr2 > distanceSqr1) {
    }
    distanceSqr1 = distanceSqr2;
    var d = simplex.GetSearchDirection();
    if(d.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) {
      break
    }
    var vertex = vertices[simplex.m_count];
    vertex.indexA = proxyA.GetSupport(b2Math.MulTMV(transformA.R, d.GetNegative()));
    vertex.wA = b2Math.MulX(transformA, proxyA.GetVertex(vertex.indexA));
    vertex.indexB = proxyB.GetSupport(b2Math.MulTMV(transformB.R, d));
    vertex.wB = b2Math.MulX(transformB, proxyB.GetVertex(vertex.indexB));
    vertex.w = b2Math.SubtractVV(vertex.wB, vertex.wA);
    ++iter;
    ++b2Distance.b2_gjkIters;
    var duplicate = false;
    for(i = 0;i < saveCount;i++) {
      if(vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
        duplicate = true;
        break
      }
    }
    if(duplicate) {
      break
    }
    ++simplex.m_count
  }
  b2Distance.b2_gjkMaxIters = b2Math.Max(b2Distance.b2_gjkMaxIters, iter);
  simplex.GetWitnessPoints(output.pointA, output.pointB);
  output.distance = b2Math.SubtractVV(output.pointA, output.pointB).Length();
  output.iterations = iter;
  simplex.WriteCache(cache);
  if(input.useRadii) {
    var rA = proxyA.m_radius;
    var rB = proxyB.m_radius;
    if(output.distance > rA + rB && output.distance > Number.MIN_VALUE) {
      output.distance -= rA + rB;
      var normal = b2Math.SubtractVV(output.pointB, output.pointA);
      normal.Normalize();
      output.pointA.x += rA * normal.x;
      output.pointA.y += rA * normal.y;
      output.pointB.x -= rB * normal.x;
      output.pointB.y -= rB * normal.y
    }else {
      p = new b2Vec2;
      p.x = 0.5 * (output.pointA.x + output.pointB.x);
      p.y = 0.5 * (output.pointA.y + output.pointB.y);
      output.pointA.x = output.pointB.x = p.x;
      output.pointA.y = output.pointB.y = p.y;
      output.distance = 0
    }
  }
};
b2Distance.b2_gjkCalls = 0;
b2Distance.b2_gjkIters = 0;
b2Distance.b2_gjkMaxIters = 0;
b2Distance.s_simplex = new b2Simplex;
b2Distance.s_saveA = new Array(3);
b2Distance.s_saveB = new Array(3);var b2MouseJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2MouseJoint.prototype, b2Joint.prototype);
b2MouseJoint.prototype._super = b2Joint.prototype;
b2MouseJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  this.m_target.SetV(def.target);
  var tX = this.m_target.x - this.m_bodyB.m_xf.position.x;
  var tY = this.m_target.y - this.m_bodyB.m_xf.position.y;
  var tMat = this.m_bodyB.m_xf.R;
  this.m_localAnchor.x = tX * tMat.col1.x + tY * tMat.col1.y;
  this.m_localAnchor.y = tX * tMat.col2.x + tY * tMat.col2.y;
  this.m_maxForce = def.maxForce;
  this.m_impulse.SetZero();
  this.m_frequencyHz = def.frequencyHz;
  this.m_dampingRatio = def.dampingRatio;
  this.m_beta = 0;
  this.m_gamma = 0
};
b2MouseJoint.prototype.__varz = function() {
  this.K = new b2Mat22;
  this.K1 = new b2Mat22;
  this.K2 = new b2Mat22;
  this.m_localAnchor = new b2Vec2;
  this.m_target = new b2Vec2;
  this.m_impulse = new b2Vec2;
  this.m_mass = new b2Mat22;
  this.m_C = new b2Vec2
};
b2MouseJoint.prototype.InitVelocityConstraints = function(step) {
  var b = this.m_bodyB;
  var mass = b.GetMass();
  var omega = 2 * Math.PI * this.m_frequencyHz;
  var d = 2 * mass * this.m_dampingRatio * omega;
  var k = mass * omega * omega;
  this.m_gamma = step.dt * (d + step.dt * k);
  this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
  this.m_beta = step.dt * k * this.m_gamma;
  var tMat;
  tMat = b.m_xf.R;
  var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
  var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
  var tX = tMat.col1.x * rX + tMat.col2.x * rY;
  rY = tMat.col1.y * rX + tMat.col2.y * rY;
  rX = tX;
  var invMass = b.m_invMass;
  var invI = b.m_invI;
  this.K1.col1.x = invMass;
  this.K1.col2.x = 0;
  this.K1.col1.y = 0;
  this.K1.col2.y = invMass;
  this.K2.col1.x = invI * rY * rY;
  this.K2.col2.x = -invI * rX * rY;
  this.K2.col1.y = -invI * rX * rY;
  this.K2.col2.y = invI * rX * rX;
  this.K.SetM(this.K1);
  this.K.AddM(this.K2);
  this.K.col1.x += this.m_gamma;
  this.K.col2.y += this.m_gamma;
  this.K.GetInverse(this.m_mass);
  this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
  this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
  b.m_angularVelocity *= 0.98;
  this.m_impulse.x *= step.dtRatio;
  this.m_impulse.y *= step.dtRatio;
  b.m_linearVelocity.x += invMass * this.m_impulse.x;
  b.m_linearVelocity.y += invMass * this.m_impulse.y;
  b.m_angularVelocity += invI * (rX * this.m_impulse.y - rY * this.m_impulse.x)
};
b2MouseJoint.prototype.SolveVelocityConstraints = function(step) {
  var b = this.m_bodyB;
  var tMat;
  var tX;
  var tY;
  tMat = b.m_xf.R;
  var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
  var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
  tX = tMat.col1.x * rX + tMat.col2.x * rY;
  rY = tMat.col1.y * rX + tMat.col2.y * rY;
  rX = tX;
  var CdotX = b.m_linearVelocity.x + -b.m_angularVelocity * rY;
  var CdotY = b.m_linearVelocity.y + b.m_angularVelocity * rX;
  tMat = this.m_mass;
  tX = CdotX + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
  tY = CdotY + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
  var impulseX = -(tMat.col1.x * tX + tMat.col2.x * tY);
  var impulseY = -(tMat.col1.y * tX + tMat.col2.y * tY);
  var oldImpulseX = this.m_impulse.x;
  var oldImpulseY = this.m_impulse.y;
  this.m_impulse.x += impulseX;
  this.m_impulse.y += impulseY;
  var maxImpulse = step.dt * this.m_maxForce;
  if(this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
    this.m_impulse.Multiply(maxImpulse / this.m_impulse.Length())
  }
  impulseX = this.m_impulse.x - oldImpulseX;
  impulseY = this.m_impulse.y - oldImpulseY;
  b.m_linearVelocity.x += b.m_invMass * impulseX;
  b.m_linearVelocity.y += b.m_invMass * impulseY;
  b.m_angularVelocity += b.m_invI * (rX * impulseY - rY * impulseX)
};
b2MouseJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  return true
};
b2MouseJoint.prototype.GetAnchorA = function() {
  return this.m_target
};
b2MouseJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
};
b2MouseJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
};
b2MouseJoint.prototype.GetReactionTorque = function(inv_dt) {
  return 0
};
b2MouseJoint.prototype.GetTarget = function() {
  return this.m_target
};
b2MouseJoint.prototype.SetTarget = function(target) {
  if(this.m_bodyB.IsAwake() == false) {
    this.m_bodyB.SetAwake(true)
  }
  this.m_target = target
};
b2MouseJoint.prototype.GetMaxForce = function() {
  return this.m_maxForce
};
b2MouseJoint.prototype.SetMaxForce = function(maxForce) {
  this.m_maxForce = maxForce
};
b2MouseJoint.prototype.GetFrequency = function() {
  return this.m_frequencyHz
};
b2MouseJoint.prototype.SetFrequency = function(hz) {
  this.m_frequencyHz = hz
};
b2MouseJoint.prototype.GetDampingRatio = function() {
  return this.m_dampingRatio
};
b2MouseJoint.prototype.SetDampingRatio = function(ratio) {
  this.m_dampingRatio = ratio
};
b2MouseJoint.prototype.K = new b2Mat22;
b2MouseJoint.prototype.K1 = new b2Mat22;
b2MouseJoint.prototype.K2 = new b2Mat22;
b2MouseJoint.prototype.m_localAnchor = new b2Vec2;
b2MouseJoint.prototype.m_target = new b2Vec2;
b2MouseJoint.prototype.m_impulse = new b2Vec2;
b2MouseJoint.prototype.m_mass = new b2Mat22;
b2MouseJoint.prototype.m_C = new b2Vec2;
b2MouseJoint.prototype.m_maxForce = null;
b2MouseJoint.prototype.m_frequencyHz = null;
b2MouseJoint.prototype.m_dampingRatio = null;
b2MouseJoint.prototype.m_beta = null;
b2MouseJoint.prototype.m_gamma = null;var b2PrismaticJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PrismaticJointDef.prototype, b2JointDef.prototype);
b2PrismaticJointDef.prototype._super = b2JointDef.prototype;
b2PrismaticJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_prismaticJoint;
  this.localAxisA.Set(1, 0);
  this.referenceAngle = 0;
  this.enableLimit = false;
  this.lowerTranslation = 0;
  this.upperTranslation = 0;
  this.enableMotor = false;
  this.maxMotorForce = 0;
  this.motorSpeed = 0
};
b2PrismaticJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2;
  this.localAxisA = new b2Vec2
};
b2PrismaticJointDef.prototype.Initialize = function(bA, bB, anchor, axis) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
  this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
  this.localAxisA = this.bodyA.GetLocalVector(axis);
  this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
};
b2PrismaticJointDef.prototype.localAnchorA = new b2Vec2;
b2PrismaticJointDef.prototype.localAnchorB = new b2Vec2;
b2PrismaticJointDef.prototype.localAxisA = new b2Vec2;
b2PrismaticJointDef.prototype.referenceAngle = null;
b2PrismaticJointDef.prototype.enableLimit = null;
b2PrismaticJointDef.prototype.lowerTranslation = null;
b2PrismaticJointDef.prototype.upperTranslation = null;
b2PrismaticJointDef.prototype.enableMotor = null;
b2PrismaticJointDef.prototype.maxMotorForce = null;
b2PrismaticJointDef.prototype.motorSpeed = null;var b2TimeOfImpact = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2TimeOfImpact.prototype.__constructor = function() {
};
b2TimeOfImpact.prototype.__varz = function() {
};
b2TimeOfImpact.TimeOfImpact = function(input) {
  ++b2TimeOfImpact.b2_toiCalls;
  var proxyA = input.proxyA;
  var proxyB = input.proxyB;
  var sweepA = input.sweepA;
  var sweepB = input.sweepB;
  b2Settings.b2Assert(sweepA.t0 == sweepB.t0);
  b2Settings.b2Assert(1 - sweepA.t0 > Number.MIN_VALUE);
  var radius = proxyA.m_radius + proxyB.m_radius;
  var tolerance = input.tolerance;
  var alpha = 0;
  var k_maxIterations = 1E3;
  var iter = 0;
  var target = 0;
  b2TimeOfImpact.s_cache.count = 0;
  b2TimeOfImpact.s_distanceInput.useRadii = false;
  for(;;) {
    sweepA.GetTransform(b2TimeOfImpact.s_xfA, alpha);
    sweepB.GetTransform(b2TimeOfImpact.s_xfB, alpha);
    b2TimeOfImpact.s_distanceInput.proxyA = proxyA;
    b2TimeOfImpact.s_distanceInput.proxyB = proxyB;
    b2TimeOfImpact.s_distanceInput.transformA = b2TimeOfImpact.s_xfA;
    b2TimeOfImpact.s_distanceInput.transformB = b2TimeOfImpact.s_xfB;
    b2Distance.Distance(b2TimeOfImpact.s_distanceOutput, b2TimeOfImpact.s_cache, b2TimeOfImpact.s_distanceInput);
    if(b2TimeOfImpact.s_distanceOutput.distance <= 0) {
      alpha = 1;
      break
    }
    b2TimeOfImpact.s_fcn.Initialize(b2TimeOfImpact.s_cache, proxyA, b2TimeOfImpact.s_xfA, proxyB, b2TimeOfImpact.s_xfB);
    var separation = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
    if(separation <= 0) {
      alpha = 1;
      break
    }
    if(iter == 0) {
      if(separation > radius) {
        target = b2Math.Max(radius - tolerance, 0.75 * radius)
      }else {
        target = b2Math.Max(separation - tolerance, 0.02 * radius)
      }
    }
    if(separation - target < 0.5 * tolerance) {
      if(iter == 0) {
        alpha = 1;
        break
      }
      break
    }
    var newAlpha = alpha;
    var x1 = alpha;
    var x2 = 1;
    var f1 = separation;
    sweepA.GetTransform(b2TimeOfImpact.s_xfA, x2);
    sweepB.GetTransform(b2TimeOfImpact.s_xfB, x2);
    var f2 = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
    if(f2 >= target) {
      alpha = 1;
      break
    }
    var rootIterCount = 0;
    for(;;) {
      var x;
      if(rootIterCount & 1) {
        x = x1 + (target - f1) * (x2 - x1) / (f2 - f1)
      }else {
        x = 0.5 * (x1 + x2)
      }
      sweepA.GetTransform(b2TimeOfImpact.s_xfA, x);
      sweepB.GetTransform(b2TimeOfImpact.s_xfB, x);
      var f = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
      if(b2Math.Abs(f - target) < 0.025 * tolerance) {
        newAlpha = x;
        break
      }
      if(f > target) {
        x1 = x;
        f1 = f
      }else {
        x2 = x;
        f2 = f
      }
      ++rootIterCount;
      ++b2TimeOfImpact.b2_toiRootIters;
      if(rootIterCount == 50) {
        break
      }
    }
    b2TimeOfImpact.b2_toiMaxRootIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxRootIters, rootIterCount);
    if(newAlpha < (1 + 100 * Number.MIN_VALUE) * alpha) {
      break
    }
    alpha = newAlpha;
    iter++;
    ++b2TimeOfImpact.b2_toiIters;
    if(iter == k_maxIterations) {
      break
    }
  }
  b2TimeOfImpact.b2_toiMaxIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxIters, iter);
  return alpha
};
b2TimeOfImpact.b2_toiCalls = 0;
b2TimeOfImpact.b2_toiIters = 0;
b2TimeOfImpact.b2_toiMaxIters = 0;
b2TimeOfImpact.b2_toiRootIters = 0;
b2TimeOfImpact.b2_toiMaxRootIters = 0;
b2TimeOfImpact.s_cache = new b2SimplexCache;
b2TimeOfImpact.s_distanceInput = new b2DistanceInput;
b2TimeOfImpact.s_xfA = new b2Transform;
b2TimeOfImpact.s_xfB = new b2Transform;
b2TimeOfImpact.s_fcn = new b2SeparationFunction;
b2TimeOfImpact.s_distanceOutput = new b2DistanceOutput;var b2GearJoint = function() {
  b2Joint.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2GearJoint.prototype, b2Joint.prototype);
b2GearJoint.prototype._super = b2Joint.prototype;
b2GearJoint.prototype.__constructor = function(def) {
  this._super.__constructor.apply(this, [def]);
  var type1 = def.joint1.m_type;
  var type2 = def.joint2.m_type;
  this.m_revolute1 = null;
  this.m_prismatic1 = null;
  this.m_revolute2 = null;
  this.m_prismatic2 = null;
  var coordinate1;
  var coordinate2;
  this.m_ground1 = def.joint1.GetBodyA();
  this.m_bodyA = def.joint1.GetBodyB();
  if(type1 == b2Joint.e_revoluteJoint) {
    this.m_revolute1 = def.joint1;
    this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
    this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
    coordinate1 = this.m_revolute1.GetJointAngle()
  }else {
    this.m_prismatic1 = def.joint1;
    this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
    this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
    coordinate1 = this.m_prismatic1.GetJointTranslation()
  }
  this.m_ground2 = def.joint2.GetBodyA();
  this.m_bodyB = def.joint2.GetBodyB();
  if(type2 == b2Joint.e_revoluteJoint) {
    this.m_revolute2 = def.joint2;
    this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
    this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
    coordinate2 = this.m_revolute2.GetJointAngle()
  }else {
    this.m_prismatic2 = def.joint2;
    this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
    this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
    coordinate2 = this.m_prismatic2.GetJointTranslation()
  }
  this.m_ratio = def.ratio;
  this.m_constant = coordinate1 + this.m_ratio * coordinate2;
  this.m_impulse = 0
};
b2GearJoint.prototype.__varz = function() {
  this.m_groundAnchor1 = new b2Vec2;
  this.m_groundAnchor2 = new b2Vec2;
  this.m_localAnchor1 = new b2Vec2;
  this.m_localAnchor2 = new b2Vec2;
  this.m_J = new b2Jacobian
};
b2GearJoint.prototype.InitVelocityConstraints = function(step) {
  var g1 = this.m_ground1;
  var g2 = this.m_ground2;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var ugX;
  var ugY;
  var rX;
  var rY;
  var tMat;
  var tVec;
  var crug;
  var tX;
  var K = 0;
  this.m_J.SetZero();
  if(this.m_revolute1) {
    this.m_J.angularA = -1;
    K += bA.m_invI
  }else {
    tMat = g1.m_xf.R;
    tVec = this.m_prismatic1.m_localXAxis1;
    ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
    ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
    tMat = bA.m_xf.R;
    rX = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
    rY = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
    tX = tMat.col1.x * rX + tMat.col2.x * rY;
    rY = tMat.col1.y * rX + tMat.col2.y * rY;
    rX = tX;
    crug = rX * ugY - rY * ugX;
    this.m_J.linearA.Set(-ugX, -ugY);
    this.m_J.angularA = -crug;
    K += bA.m_invMass + bA.m_invI * crug * crug
  }
  if(this.m_revolute2) {
    this.m_J.angularB = -this.m_ratio;
    K += this.m_ratio * this.m_ratio * bB.m_invI
  }else {
    tMat = g2.m_xf.R;
    tVec = this.m_prismatic2.m_localXAxis1;
    ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
    ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
    tMat = bB.m_xf.R;
    rX = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
    rY = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
    tX = tMat.col1.x * rX + tMat.col2.x * rY;
    rY = tMat.col1.y * rX + tMat.col2.y * rY;
    rX = tX;
    crug = rX * ugY - rY * ugX;
    this.m_J.linearB.Set(-this.m_ratio * ugX, -this.m_ratio * ugY);
    this.m_J.angularB = -this.m_ratio * crug;
    K += this.m_ratio * this.m_ratio * (bB.m_invMass + bB.m_invI * crug * crug)
  }
  this.m_mass = K > 0 ? 1 / K : 0;
  if(step.warmStarting) {
    bA.m_linearVelocity.x += bA.m_invMass * this.m_impulse * this.m_J.linearA.x;
    bA.m_linearVelocity.y += bA.m_invMass * this.m_impulse * this.m_J.linearA.y;
    bA.m_angularVelocity += bA.m_invI * this.m_impulse * this.m_J.angularA;
    bB.m_linearVelocity.x += bB.m_invMass * this.m_impulse * this.m_J.linearB.x;
    bB.m_linearVelocity.y += bB.m_invMass * this.m_impulse * this.m_J.linearB.y;
    bB.m_angularVelocity += bB.m_invI * this.m_impulse * this.m_J.angularB
  }else {
    this.m_impulse = 0
  }
};
b2GearJoint.prototype.SolveVelocityConstraints = function(step) {
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var Cdot = this.m_J.Compute(bA.m_linearVelocity, bA.m_angularVelocity, bB.m_linearVelocity, bB.m_angularVelocity);
  var impulse = -this.m_mass * Cdot;
  this.m_impulse += impulse;
  bA.m_linearVelocity.x += bA.m_invMass * impulse * this.m_J.linearA.x;
  bA.m_linearVelocity.y += bA.m_invMass * impulse * this.m_J.linearA.y;
  bA.m_angularVelocity += bA.m_invI * impulse * this.m_J.angularA;
  bB.m_linearVelocity.x += bB.m_invMass * impulse * this.m_J.linearB.x;
  bB.m_linearVelocity.y += bB.m_invMass * impulse * this.m_J.linearB.y;
  bB.m_angularVelocity += bB.m_invI * impulse * this.m_J.angularB
};
b2GearJoint.prototype.SolvePositionConstraints = function(baumgarte) {
  var linearError = 0;
  var bA = this.m_bodyA;
  var bB = this.m_bodyB;
  var coordinate1;
  var coordinate2;
  if(this.m_revolute1) {
    coordinate1 = this.m_revolute1.GetJointAngle()
  }else {
    coordinate1 = this.m_prismatic1.GetJointTranslation()
  }
  if(this.m_revolute2) {
    coordinate2 = this.m_revolute2.GetJointAngle()
  }else {
    coordinate2 = this.m_prismatic2.GetJointTranslation()
  }
  var C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
  var impulse = -this.m_mass * C;
  bA.m_sweep.c.x += bA.m_invMass * impulse * this.m_J.linearA.x;
  bA.m_sweep.c.y += bA.m_invMass * impulse * this.m_J.linearA.y;
  bA.m_sweep.a += bA.m_invI * impulse * this.m_J.angularA;
  bB.m_sweep.c.x += bB.m_invMass * impulse * this.m_J.linearB.x;
  bB.m_sweep.c.y += bB.m_invMass * impulse * this.m_J.linearB.y;
  bB.m_sweep.a += bB.m_invI * impulse * this.m_J.angularB;
  bA.SynchronizeTransform();
  bB.SynchronizeTransform();
  return linearError < b2Settings.b2_linearSlop
};
b2GearJoint.prototype.GetAnchorA = function() {
  return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
};
b2GearJoint.prototype.GetAnchorB = function() {
  return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
};
b2GearJoint.prototype.GetReactionForce = function(inv_dt) {
  return new b2Vec2(inv_dt * this.m_impulse * this.m_J.linearB.x, inv_dt * this.m_impulse * this.m_J.linearB.y)
};
b2GearJoint.prototype.GetReactionTorque = function(inv_dt) {
  var tMat = this.m_bodyB.m_xf.R;
  var rX = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x;
  var rY = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y;
  var tX = tMat.col1.x * rX + tMat.col2.x * rY;
  rY = tMat.col1.y * rX + tMat.col2.y * rY;
  rX = tX;
  var PX = this.m_impulse * this.m_J.linearB.x;
  var PY = this.m_impulse * this.m_J.linearB.y;
  return inv_dt * (this.m_impulse * this.m_J.angularB - rX * PY + rY * PX)
};
b2GearJoint.prototype.GetRatio = function() {
  return this.m_ratio
};
b2GearJoint.prototype.SetRatio = function(ratio) {
  this.m_ratio = ratio
};
b2GearJoint.prototype.m_ground1 = null;
b2GearJoint.prototype.m_ground2 = null;
b2GearJoint.prototype.m_revolute1 = null;
b2GearJoint.prototype.m_prismatic1 = null;
b2GearJoint.prototype.m_revolute2 = null;
b2GearJoint.prototype.m_prismatic2 = null;
b2GearJoint.prototype.m_groundAnchor1 = new b2Vec2;
b2GearJoint.prototype.m_groundAnchor2 = new b2Vec2;
b2GearJoint.prototype.m_localAnchor1 = new b2Vec2;
b2GearJoint.prototype.m_localAnchor2 = new b2Vec2;
b2GearJoint.prototype.m_J = new b2Jacobian;
b2GearJoint.prototype.m_constant = null;
b2GearJoint.prototype.m_ratio = null;
b2GearJoint.prototype.m_mass = null;
b2GearJoint.prototype.m_impulse = null;var b2TOIInput = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2TOIInput.prototype.__constructor = function() {
};
b2TOIInput.prototype.__varz = function() {
  this.proxyA = new b2DistanceProxy;
  this.proxyB = new b2DistanceProxy;
  this.sweepA = new b2Sweep;
  this.sweepB = new b2Sweep
};
b2TOIInput.prototype.proxyA = new b2DistanceProxy;
b2TOIInput.prototype.proxyB = new b2DistanceProxy;
b2TOIInput.prototype.sweepA = new b2Sweep;
b2TOIInput.prototype.sweepB = new b2Sweep;
b2TOIInput.prototype.tolerance = null;var b2RevoluteJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2RevoluteJointDef.prototype, b2JointDef.prototype);
b2RevoluteJointDef.prototype._super = b2JointDef.prototype;
b2RevoluteJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_revoluteJoint;
  this.localAnchorA.Set(0, 0);
  this.localAnchorB.Set(0, 0);
  this.referenceAngle = 0;
  this.lowerAngle = 0;
  this.upperAngle = 0;
  this.maxMotorTorque = 0;
  this.motorSpeed = 0;
  this.enableLimit = false;
  this.enableMotor = false
};
b2RevoluteJointDef.prototype.__varz = function() {
  this.localAnchorA = new b2Vec2;
  this.localAnchorB = new b2Vec2
};
b2RevoluteJointDef.prototype.Initialize = function(bA, bB, anchor) {
  this.bodyA = bA;
  this.bodyB = bB;
  this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
  this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
  this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
};
b2RevoluteJointDef.prototype.localAnchorA = new b2Vec2;
b2RevoluteJointDef.prototype.localAnchorB = new b2Vec2;
b2RevoluteJointDef.prototype.referenceAngle = null;
b2RevoluteJointDef.prototype.enableLimit = null;
b2RevoluteJointDef.prototype.lowerAngle = null;
b2RevoluteJointDef.prototype.upperAngle = null;
b2RevoluteJointDef.prototype.enableMotor = null;
b2RevoluteJointDef.prototype.motorSpeed = null;
b2RevoluteJointDef.prototype.maxMotorTorque = null;var b2MouseJointDef = function() {
  b2JointDef.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2MouseJointDef.prototype, b2JointDef.prototype);
b2MouseJointDef.prototype._super = b2JointDef.prototype;
b2MouseJointDef.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments);
  this.type = b2Joint.e_mouseJoint;
  this.maxForce = 0;
  this.frequencyHz = 5;
  this.dampingRatio = 0.7
};
b2MouseJointDef.prototype.__varz = function() {
  this.target = new b2Vec2
};
b2MouseJointDef.prototype.target = new b2Vec2;
b2MouseJointDef.prototype.maxForce = null;
b2MouseJointDef.prototype.frequencyHz = null;
b2MouseJointDef.prototype.dampingRatio = null;var b2Contact = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Contact.prototype.__constructor = function() {
};
b2Contact.prototype.__varz = function() {
  this.m_nodeA = new b2ContactEdge;
  this.m_nodeB = new b2ContactEdge;
  this.m_manifold = new b2Manifold;
  this.m_oldManifold = new b2Manifold
};
b2Contact.s_input = new b2TOIInput;
b2Contact.e_sensorFlag = 1;
b2Contact.e_continuousFlag = 2;
b2Contact.e_islandFlag = 4;
b2Contact.e_toiFlag = 8;
b2Contact.e_touchingFlag = 16;
b2Contact.e_enabledFlag = 32;
b2Contact.e_filterFlag = 64;
b2Contact.prototype.Reset = function(fixtureA, fixtureB) {
  this.m_flags = b2Contact.e_enabledFlag;
  if(!fixtureA || !fixtureB) {
    this.m_fixtureA = null;
    this.m_fixtureB = null;
    return
  }
  if(fixtureA.IsSensor() || fixtureB.IsSensor()) {
    this.m_flags |= b2Contact.e_sensorFlag
  }
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if(bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
    this.m_flags |= b2Contact.e_continuousFlag
  }
  this.m_fixtureA = fixtureA;
  this.m_fixtureB = fixtureB;
  this.m_manifold.m_pointCount = 0;
  this.m_prev = null;
  this.m_next = null;
  this.m_nodeA.contact = null;
  this.m_nodeA.prev = null;
  this.m_nodeA.next = null;
  this.m_nodeA.other = null;
  this.m_nodeB.contact = null;
  this.m_nodeB.prev = null;
  this.m_nodeB.next = null;
  this.m_nodeB.other = null
};
b2Contact.prototype.Update = function(listener) {
  var tManifold = this.m_oldManifold;
  this.m_oldManifold = this.m_manifold;
  this.m_manifold = tManifold;
  this.m_flags |= b2Contact.e_enabledFlag;
  var touching = false;
  var wasTouching = (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
  var bodyA = this.m_fixtureA.m_body;
  var bodyB = this.m_fixtureB.m_body;
  var aabbOverlap = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
  if(this.m_flags & b2Contact.e_sensorFlag) {
    if(aabbOverlap) {
      var shapeA = this.m_fixtureA.GetShape();
      var shapeB = this.m_fixtureB.GetShape();
      var xfA = bodyA.GetTransform();
      var xfB = bodyB.GetTransform();
      touching = b2Shape.TestOverlap(shapeA, xfA, shapeB, xfB)
    }
    this.m_manifold.m_pointCount = 0
  }else {
    if(bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
      this.m_flags |= b2Contact.e_continuousFlag
    }else {
      this.m_flags &= ~b2Contact.e_continuousFlag
    }
    if(aabbOverlap) {
      this.Evaluate();
      touching = this.m_manifold.m_pointCount > 0;
      for(var i = 0;i < this.m_manifold.m_pointCount;++i) {
        var mp2 = this.m_manifold.m_points[i];
        mp2.m_normalImpulse = 0;
        mp2.m_tangentImpulse = 0;
        var id2 = mp2.m_id;
        for(var j = 0;j < this.m_oldManifold.m_pointCount;++j) {
          var mp1 = this.m_oldManifold.m_points[j];
          if(mp1.m_id.key == id2.key) {
            mp2.m_normalImpulse = mp1.m_normalImpulse;
            mp2.m_tangentImpulse = mp1.m_tangentImpulse;
            break
          }
        }
      }
    }else {
      this.m_manifold.m_pointCount = 0
    }
    if(touching != wasTouching) {
      bodyA.SetAwake(true);
      bodyB.SetAwake(true)
    }
  }
  if(touching) {
    this.m_flags |= b2Contact.e_touchingFlag
  }else {
    this.m_flags &= ~b2Contact.e_touchingFlag
  }
  if(wasTouching == false && touching == true) {
    listener.BeginContact(this)
  }
  if(wasTouching == true && touching == false) {
    listener.EndContact(this)
  }
  if((this.m_flags & b2Contact.e_sensorFlag) == 0) {
    listener.PreSolve(this, this.m_oldManifold)
  }
};
b2Contact.prototype.Evaluate = function() {
};
b2Contact.prototype.ComputeTOI = function(sweepA, sweepB) {
  b2Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
  b2Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
  b2Contact.s_input.sweepA = sweepA;
  b2Contact.s_input.sweepB = sweepB;
  b2Contact.s_input.tolerance = b2Settings.b2_linearSlop;
  return b2TimeOfImpact.TimeOfImpact(b2Contact.s_input)
};
b2Contact.prototype.GetManifold = function() {
  return this.m_manifold
};
b2Contact.prototype.GetWorldManifold = function(worldManifold) {
  var bodyA = this.m_fixtureA.GetBody();
  var bodyB = this.m_fixtureB.GetBody();
  var shapeA = this.m_fixtureA.GetShape();
  var shapeB = this.m_fixtureB.GetShape();
  worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius)
};
b2Contact.prototype.IsTouching = function() {
  return(this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag
};
b2Contact.prototype.IsContinuous = function() {
  return(this.m_flags & b2Contact.e_continuousFlag) == b2Contact.e_continuousFlag
};
b2Contact.prototype.SetSensor = function(sensor) {
  if(sensor) {
    this.m_flags |= b2Contact.e_sensorFlag
  }else {
    this.m_flags &= ~b2Contact.e_sensorFlag
  }
};
b2Contact.prototype.IsSensor = function() {
  return(this.m_flags & b2Contact.e_sensorFlag) == b2Contact.e_sensorFlag
};
b2Contact.prototype.SetEnabled = function(flag) {
  if(flag) {
    this.m_flags |= b2Contact.e_enabledFlag
  }else {
    this.m_flags &= ~b2Contact.e_enabledFlag
  }
};
b2Contact.prototype.IsEnabled = function() {
  return(this.m_flags & b2Contact.e_enabledFlag) == b2Contact.e_enabledFlag
};
b2Contact.prototype.GetNext = function() {
  return this.m_next
};
b2Contact.prototype.GetFixtureA = function() {
  return this.m_fixtureA
};
b2Contact.prototype.GetFixtureB = function() {
  return this.m_fixtureB
};
b2Contact.prototype.FlagForFiltering = function() {
  this.m_flags |= b2Contact.e_filterFlag
};
b2Contact.prototype.m_flags = 0;
b2Contact.prototype.m_prev = null;
b2Contact.prototype.m_next = null;
b2Contact.prototype.m_nodeA = new b2ContactEdge;
b2Contact.prototype.m_nodeB = new b2ContactEdge;
b2Contact.prototype.m_fixtureA = null;
b2Contact.prototype.m_fixtureB = null;
b2Contact.prototype.m_manifold = new b2Manifold;
b2Contact.prototype.m_oldManifold = new b2Manifold;
b2Contact.prototype.m_toi = null;var b2ContactConstraint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactConstraint.prototype.__constructor = function() {
  this.points = new Array(b2Settings.b2_maxManifoldPoints);
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;i++) {
    this.points[i] = new b2ContactConstraintPoint
  }
};
b2ContactConstraint.prototype.__varz = function() {
  this.localPlaneNormal = new b2Vec2;
  this.localPoint = new b2Vec2;
  this.normal = new b2Vec2;
  this.normalMass = new b2Mat22;
  this.K = new b2Mat22
};
b2ContactConstraint.prototype.points = null;
b2ContactConstraint.prototype.localPlaneNormal = new b2Vec2;
b2ContactConstraint.prototype.localPoint = new b2Vec2;
b2ContactConstraint.prototype.normal = new b2Vec2;
b2ContactConstraint.prototype.normalMass = new b2Mat22;
b2ContactConstraint.prototype.K = new b2Mat22;
b2ContactConstraint.prototype.bodyA = null;
b2ContactConstraint.prototype.bodyB = null;
b2ContactConstraint.prototype.type = 0;
b2ContactConstraint.prototype.radius = null;
b2ContactConstraint.prototype.friction = null;
b2ContactConstraint.prototype.restitution = null;
b2ContactConstraint.prototype.pointCount = 0;
b2ContactConstraint.prototype.manifold = null;var b2ContactResult = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactResult.prototype.__constructor = function() {
};
b2ContactResult.prototype.__varz = function() {
  this.position = new b2Vec2;
  this.normal = new b2Vec2;
  this.id = new b2ContactID
};
b2ContactResult.prototype.shape1 = null;
b2ContactResult.prototype.shape2 = null;
b2ContactResult.prototype.position = new b2Vec2;
b2ContactResult.prototype.normal = new b2Vec2;
b2ContactResult.prototype.normalImpulse = null;
b2ContactResult.prototype.tangentImpulse = null;
b2ContactResult.prototype.id = new b2ContactID;var b2PolygonContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PolygonContact.prototype, b2Contact.prototype);
b2PolygonContact.prototype._super = b2Contact.prototype;
b2PolygonContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2PolygonContact.prototype.__varz = function() {
};
b2PolygonContact.Create = function(allocator) {
  return new b2PolygonContact
};
b2PolygonContact.Destroy = function(contact, allocator) {
};
b2PolygonContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.GetBody();
  var bB = this.m_fixtureB.GetBody();
  b2Collision.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2PolygonContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB])
};var ClipVertex = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
ClipVertex.prototype.__constructor = function() {
};
ClipVertex.prototype.__varz = function() {
  this.v = new b2Vec2;
  this.id = new b2ContactID
};
ClipVertex.prototype.Set = function(other) {
  this.v.SetV(other.v);
  this.id.Set(other.id)
};
ClipVertex.prototype.v = new b2Vec2;
ClipVertex.prototype.id = new b2ContactID;var b2ContactFilter = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactFilter.prototype.__constructor = function() {
};
b2ContactFilter.prototype.__varz = function() {
};
b2ContactFilter.b2_defaultFilter = new b2ContactFilter;
b2ContactFilter.prototype.ShouldCollide = function(fixtureA, fixtureB) {
  var filter1 = fixtureA.GetFilterData();
  var filter2 = fixtureB.GetFilterData();
  if(filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) {
    return filter1.groupIndex > 0
  }
  var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
  return collide
};
b2ContactFilter.prototype.RayCollide = function(userData, fixture) {
  if(!userData) {
    return true
  }
  return this.ShouldCollide(userData, fixture)
};var b2NullContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2NullContact.prototype, b2Contact.prototype);
b2NullContact.prototype._super = b2Contact.prototype;
b2NullContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2NullContact.prototype.__varz = function() {
};
b2NullContact.prototype.Evaluate = function() {
};var b2ContactListener = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactListener.prototype.__constructor = function() {
};
b2ContactListener.prototype.__varz = function() {
};
b2ContactListener.b2_defaultListener = new b2ContactListener;
b2ContactListener.prototype.BeginContact = function(contact) {
};
b2ContactListener.prototype.EndContact = function(contact) {
};
b2ContactListener.prototype.PreSolve = function(contact, oldManifold) {
};
b2ContactListener.prototype.PostSolve = function(contact, impulse) {
};var b2Island = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Island.prototype.__constructor = function() {
  this.m_bodies = new Array;
  this.m_contacts = new Array;
  this.m_joints = new Array
};
b2Island.prototype.__varz = function() {
};
b2Island.s_impulse = new b2ContactImpulse;
b2Island.prototype.Initialize = function(bodyCapacity, contactCapacity, jointCapacity, allocator, listener, contactSolver) {
  var i = 0;
  this.m_bodyCapacity = bodyCapacity;
  this.m_contactCapacity = contactCapacity;
  this.m_jointCapacity = jointCapacity;
  this.m_bodyCount = 0;
  this.m_contactCount = 0;
  this.m_jointCount = 0;
  this.m_allocator = allocator;
  this.m_listener = listener;
  this.m_contactSolver = contactSolver;
  for(i = this.m_bodies.length;i < bodyCapacity;i++) {
    this.m_bodies[i] = null
  }
  for(i = this.m_contacts.length;i < contactCapacity;i++) {
    this.m_contacts[i] = null
  }
  for(i = this.m_joints.length;i < jointCapacity;i++) {
    this.m_joints[i] = null
  }
};
b2Island.prototype.Clear = function() {
  this.m_bodyCount = 0;
  this.m_contactCount = 0;
  this.m_jointCount = 0
};
b2Island.prototype.Solve = function(step, gravity, allowSleep) {
  var i = 0;
  var j = 0;
  var b;
  var joint;
  for(i = 0;i < this.m_bodyCount;++i) {
    b = this.m_bodies[i];
    if(b.GetType() != b2Body.b2_dynamicBody) {
      continue
    }
    b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
    b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
    b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
    b.m_linearVelocity.Multiply(b2Math.Clamp(1 - step.dt * b.m_linearDamping, 0, 1));
    b.m_angularVelocity *= b2Math.Clamp(1 - step.dt * b.m_angularDamping, 0, 1)
  }
  this.m_contactSolver.Initialize(step, this.m_contacts, this.m_contactCount, this.m_allocator);
  var contactSolver = this.m_contactSolver;
  contactSolver.InitVelocityConstraints(step);
  for(i = 0;i < this.m_jointCount;++i) {
    joint = this.m_joints[i];
    joint.InitVelocityConstraints(step)
  }
  for(i = 0;i < step.velocityIterations;++i) {
    for(j = 0;j < this.m_jointCount;++j) {
      joint = this.m_joints[j];
      joint.SolveVelocityConstraints(step)
    }
    contactSolver.SolveVelocityConstraints()
  }
  for(i = 0;i < this.m_jointCount;++i) {
    joint = this.m_joints[i];
    joint.FinalizeVelocityConstraints()
  }
  contactSolver.FinalizeVelocityConstraints();
  for(i = 0;i < this.m_bodyCount;++i) {
    b = this.m_bodies[i];
    if(b.GetType() == b2Body.b2_staticBody) {
      continue
    }
    var translationX = step.dt * b.m_linearVelocity.x;
    var translationY = step.dt * b.m_linearVelocity.y;
    if(translationX * translationX + translationY * translationY > b2Settings.b2_maxTranslationSquared) {
      b.m_linearVelocity.Normalize();
      b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * step.inv_dt;
      b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * step.inv_dt
    }
    var rotation = step.dt * b.m_angularVelocity;
    if(rotation * rotation > b2Settings.b2_maxRotationSquared) {
      if(b.m_angularVelocity < 0) {
        b.m_angularVelocity = -b2Settings.b2_maxRotation * step.inv_dt
      }else {
        b.m_angularVelocity = b2Settings.b2_maxRotation * step.inv_dt
      }
    }
    b.m_sweep.c0.SetV(b.m_sweep.c);
    b.m_sweep.a0 = b.m_sweep.a;
    b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
    b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
    b.m_sweep.a += step.dt * b.m_angularVelocity;
    b.SynchronizeTransform()
  }
  for(i = 0;i < step.positionIterations;++i) {
    var contactsOkay = contactSolver.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
    var jointsOkay = true;
    for(j = 0;j < this.m_jointCount;++j) {
      joint = this.m_joints[j];
      var jointOkay = joint.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
      jointsOkay = jointsOkay && jointOkay
    }
    if(contactsOkay && jointsOkay) {
      break
    }
  }
  this.Report(contactSolver.m_constraints);
  if(allowSleep) {
    var minSleepTime = Number.MAX_VALUE;
    var linTolSqr = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
    var angTolSqr = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
    for(i = 0;i < this.m_bodyCount;++i) {
      b = this.m_bodies[i];
      if(b.GetType() == b2Body.b2_staticBody) {
        continue
      }
      if((b.m_flags & b2Body.e_allowSleepFlag) == 0) {
        b.m_sleepTime = 0;
        minSleepTime = 0
      }
      if((b.m_flags & b2Body.e_allowSleepFlag) == 0 || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || b2Math.Dot(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr) {
        b.m_sleepTime = 0;
        minSleepTime = 0
      }else {
        b.m_sleepTime += step.dt;
        minSleepTime = b2Math.Min(minSleepTime, b.m_sleepTime)
      }
    }
    if(minSleepTime >= b2Settings.b2_timeToSleep) {
      for(i = 0;i < this.m_bodyCount;++i) {
        b = this.m_bodies[i];
        b.SetAwake(false)
      }
    }
  }
};
b2Island.prototype.SolveTOI = function(subStep) {
  var i = 0;
  var j = 0;
  this.m_contactSolver.Initialize(subStep, this.m_contacts, this.m_contactCount, this.m_allocator);
  var contactSolver = this.m_contactSolver;
  for(i = 0;i < this.m_jointCount;++i) {
    this.m_joints[i].InitVelocityConstraints(subStep)
  }
  for(i = 0;i < subStep.velocityIterations;++i) {
    contactSolver.SolveVelocityConstraints();
    for(j = 0;j < this.m_jointCount;++j) {
      this.m_joints[j].SolveVelocityConstraints(subStep)
    }
  }
  for(i = 0;i < this.m_bodyCount;++i) {
    var b = this.m_bodies[i];
    if(b.GetType() == b2Body.b2_staticBody) {
      continue
    }
    var translationX = subStep.dt * b.m_linearVelocity.x;
    var translationY = subStep.dt * b.m_linearVelocity.y;
    if(translationX * translationX + translationY * translationY > b2Settings.b2_maxTranslationSquared) {
      b.m_linearVelocity.Normalize();
      b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * subStep.inv_dt;
      b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * subStep.inv_dt
    }
    var rotation = subStep.dt * b.m_angularVelocity;
    if(rotation * rotation > b2Settings.b2_maxRotationSquared) {
      if(b.m_angularVelocity < 0) {
        b.m_angularVelocity = -b2Settings.b2_maxRotation * subStep.inv_dt
      }else {
        b.m_angularVelocity = b2Settings.b2_maxRotation * subStep.inv_dt
      }
    }
    b.m_sweep.c0.SetV(b.m_sweep.c);
    b.m_sweep.a0 = b.m_sweep.a;
    b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
    b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
    b.m_sweep.a += subStep.dt * b.m_angularVelocity;
    b.SynchronizeTransform()
  }
  var k_toiBaumgarte = 0.75;
  for(i = 0;i < subStep.positionIterations;++i) {
    var contactsOkay = contactSolver.SolvePositionConstraints(k_toiBaumgarte);
    var jointsOkay = true;
    for(j = 0;j < this.m_jointCount;++j) {
      var jointOkay = this.m_joints[j].SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
      jointsOkay = jointsOkay && jointOkay
    }
    if(contactsOkay && jointsOkay) {
      break
    }
  }
  this.Report(contactSolver.m_constraints)
};
b2Island.prototype.Report = function(constraints) {
  if(this.m_listener == null) {
    return
  }
  for(var i = 0;i < this.m_contactCount;++i) {
    var c = this.m_contacts[i];
    var cc = constraints[i];
    for(var j = 0;j < cc.pointCount;++j) {
      b2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
      b2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse
    }
    this.m_listener.PostSolve(c, b2Island.s_impulse)
  }
};
b2Island.prototype.AddBody = function(body) {
  body.m_islandIndex = this.m_bodyCount;
  this.m_bodies[this.m_bodyCount++] = body
};
b2Island.prototype.AddContact = function(contact) {
  this.m_contacts[this.m_contactCount++] = contact
};
b2Island.prototype.AddJoint = function(joint) {
  this.m_joints[this.m_jointCount++] = joint
};
b2Island.prototype.m_allocator = null;
b2Island.prototype.m_listener = null;
b2Island.prototype.m_contactSolver = null;
b2Island.prototype.m_bodies = null;
b2Island.prototype.m_contacts = null;
b2Island.prototype.m_joints = null;
b2Island.prototype.m_bodyCount = 0;
b2Island.prototype.m_jointCount = 0;
b2Island.prototype.m_contactCount = 0;
b2Island.prototype.m_bodyCapacity = 0;
b2Island.prototype.m_contactCapacity = 0;
b2Island.prototype.m_jointCapacity = 0;var b2PolyAndEdgeContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PolyAndEdgeContact.prototype, b2Contact.prototype);
b2PolyAndEdgeContact.prototype._super = b2Contact.prototype;
b2PolyAndEdgeContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2PolyAndEdgeContact.prototype.__varz = function() {
};
b2PolyAndEdgeContact.Create = function(allocator) {
  return new b2PolyAndEdgeContact
};
b2PolyAndEdgeContact.Destroy = function(contact, allocator) {
};
b2PolyAndEdgeContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.GetBody();
  var bB = this.m_fixtureB.GetBody();
  this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2PolyAndEdgeContact.prototype.b2CollidePolyAndEdge = function(manifold, polygon, xf1, edge, xf2) {
};
b2PolyAndEdgeContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB]);
  b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
  b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_edgeShape)
};var b2Collision = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2Collision.prototype.__constructor = function() {
};
b2Collision.prototype.__varz = function() {
};
b2Collision.MakeClipPointVector = function() {
  var r = new Array(2);
  r[0] = new ClipVertex;
  r[1] = new ClipVertex;
  return r
};
b2Collision.ClipSegmentToLine = function(vOut, vIn, normal, offset) {
  var cv;
  var numOut = 0;
  cv = vIn[0];
  var vIn0 = cv.v;
  cv = vIn[1];
  var vIn1 = cv.v;
  var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
  var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
  if(distance0 <= 0) {
    vOut[numOut++].Set(vIn[0])
  }
  if(distance1 <= 0) {
    vOut[numOut++].Set(vIn[1])
  }
  if(distance0 * distance1 < 0) {
    var interp = distance0 / (distance0 - distance1);
    cv = vOut[numOut];
    var tVec = cv.v;
    tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
    tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
    cv = vOut[numOut];
    var cv2;
    if(distance0 > 0) {
      cv2 = vIn[0];
      cv.id = cv2.id
    }else {
      cv2 = vIn[1];
      cv.id = cv2.id
    }
    ++numOut
  }
  return numOut
};
b2Collision.EdgeSeparation = function(poly1, xf1, edge1, poly2, xf2) {
  var count1 = poly1.m_vertexCount;
  var vertices1 = poly1.m_vertices;
  var normals1 = poly1.m_normals;
  var count2 = poly2.m_vertexCount;
  var vertices2 = poly2.m_vertices;
  var tMat;
  var tVec;
  tMat = xf1.R;
  tVec = normals1[edge1];
  var normal1WorldX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
  var normal1WorldY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
  tMat = xf2.R;
  var normal1X = tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY;
  var normal1Y = tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY;
  var index = 0;
  var minDot = Number.MAX_VALUE;
  for(var i = 0;i < count2;++i) {
    tVec = vertices2[i];
    var dot = tVec.x * normal1X + tVec.y * normal1Y;
    if(dot < minDot) {
      minDot = dot;
      index = i
    }
  }
  tVec = vertices1[edge1];
  tMat = xf1.R;
  var v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tVec = vertices2[index];
  tMat = xf2.R;
  var v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  v2X -= v1X;
  v2Y -= v1Y;
  var separation = v2X * normal1WorldX + v2Y * normal1WorldY;
  return separation
};
b2Collision.FindMaxSeparation = function(edgeIndex, poly1, xf1, poly2, xf2) {
  var count1 = poly1.m_vertexCount;
  var normals1 = poly1.m_normals;
  var tVec;
  var tMat;
  tMat = xf2.R;
  tVec = poly2.m_centroid;
  var dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tMat = xf1.R;
  tVec = poly1.m_centroid;
  dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  var dLocal1X = dX * xf1.R.col1.x + dY * xf1.R.col1.y;
  var dLocal1Y = dX * xf1.R.col2.x + dY * xf1.R.col2.y;
  var edge = 0;
  var maxDot = -Number.MAX_VALUE;
  for(var i = 0;i < count1;++i) {
    tVec = normals1[i];
    var dot = tVec.x * dLocal1X + tVec.y * dLocal1Y;
    if(dot > maxDot) {
      maxDot = dot;
      edge = i
    }
  }
  var s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
  var prevEdge = edge - 1 >= 0 ? edge - 1 : count1 - 1;
  var sPrev = b2Collision.EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
  var nextEdge = edge + 1 < count1 ? edge + 1 : 0;
  var sNext = b2Collision.EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
  var bestEdge = 0;
  var bestSeparation;
  var increment = 0;
  if(sPrev > s && sPrev > sNext) {
    increment = -1;
    bestEdge = prevEdge;
    bestSeparation = sPrev
  }else {
    if(sNext > s) {
      increment = 1;
      bestEdge = nextEdge;
      bestSeparation = sNext
    }else {
      edgeIndex[0] = edge;
      return s
    }
  }
  while(true) {
    if(increment == -1) {
      edge = bestEdge - 1 >= 0 ? bestEdge - 1 : count1 - 1
    }else {
      edge = bestEdge + 1 < count1 ? bestEdge + 1 : 0
    }
    s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
    if(s > bestSeparation) {
      bestEdge = edge;
      bestSeparation = s
    }else {
      break
    }
  }
  edgeIndex[0] = bestEdge;
  return bestSeparation
};
b2Collision.FindIncidentEdge = function(c, poly1, xf1, edge1, poly2, xf2) {
  var count1 = poly1.m_vertexCount;
  var normals1 = poly1.m_normals;
  var count2 = poly2.m_vertexCount;
  var vertices2 = poly2.m_vertices;
  var normals2 = poly2.m_normals;
  var tMat;
  var tVec;
  tMat = xf1.R;
  tVec = normals1[edge1];
  var normal1X = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
  var normal1Y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
  tMat = xf2.R;
  var tX = tMat.col1.x * normal1X + tMat.col1.y * normal1Y;
  normal1Y = tMat.col2.x * normal1X + tMat.col2.y * normal1Y;
  normal1X = tX;
  var index = 0;
  var minDot = Number.MAX_VALUE;
  for(var i = 0;i < count2;++i) {
    tVec = normals2[i];
    var dot = normal1X * tVec.x + normal1Y * tVec.y;
    if(dot < minDot) {
      minDot = dot;
      index = i
    }
  }
  var tClip;
  var i1 = index;
  var i2 = i1 + 1 < count2 ? i1 + 1 : 0;
  tClip = c[0];
  tVec = vertices2[i1];
  tMat = xf2.R;
  tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tClip.id.features.referenceEdge = edge1;
  tClip.id.features.incidentEdge = i1;
  tClip.id.features.incidentVertex = 0;
  tClip = c[1];
  tVec = vertices2[i2];
  tMat = xf2.R;
  tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tClip.id.features.referenceEdge = edge1;
  tClip.id.features.incidentEdge = i2;
  tClip.id.features.incidentVertex = 1
};
b2Collision.CollidePolygons = function(manifold, polyA, xfA, polyB, xfB) {
  var cv;
  manifold.m_pointCount = 0;
  var totalRadius = polyA.m_radius + polyB.m_radius;
  var edgeA = 0;
  b2Collision.s_edgeAO[0] = edgeA;
  var separationA = b2Collision.FindMaxSeparation(b2Collision.s_edgeAO, polyA, xfA, polyB, xfB);
  edgeA = b2Collision.s_edgeAO[0];
  if(separationA > totalRadius) {
    return
  }
  var edgeB = 0;
  b2Collision.s_edgeBO[0] = edgeB;
  var separationB = b2Collision.FindMaxSeparation(b2Collision.s_edgeBO, polyB, xfB, polyA, xfA);
  edgeB = b2Collision.s_edgeBO[0];
  if(separationB > totalRadius) {
    return
  }
  var poly1;
  var poly2;
  var xf1;
  var xf2;
  var edge1 = 0;
  var flip = 0;
  var k_relativeTol = 0.98;
  var k_absoluteTol = 0.0010;
  var tMat;
  if(separationB > k_relativeTol * separationA + k_absoluteTol) {
    poly1 = polyB;
    poly2 = polyA;
    xf1 = xfB;
    xf2 = xfA;
    edge1 = edgeB;
    manifold.m_type = b2Manifold.e_faceB;
    flip = 1
  }else {
    poly1 = polyA;
    poly2 = polyB;
    xf1 = xfA;
    xf2 = xfB;
    edge1 = edgeA;
    manifold.m_type = b2Manifold.e_faceA;
    flip = 0
  }
  var incidentEdge = b2Collision.s_incidentEdge;
  b2Collision.FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
  var count1 = poly1.m_vertexCount;
  var vertices1 = poly1.m_vertices;
  var local_v11 = vertices1[edge1];
  var local_v12;
  if(edge1 + 1 < count1) {
    local_v12 = vertices1[parseInt(edge1 + 1)]
  }else {
    local_v12 = vertices1[0]
  }
  var localTangent = b2Collision.s_localTangent;
  localTangent.Set(local_v12.x - local_v11.x, local_v12.y - local_v11.y);
  localTangent.Normalize();
  var localNormal = b2Collision.s_localNormal;
  localNormal.x = localTangent.y;
  localNormal.y = -localTangent.x;
  var planePoint = b2Collision.s_planePoint;
  planePoint.Set(0.5 * (local_v11.x + local_v12.x), 0.5 * (local_v11.y + local_v12.y));
  var tangent = b2Collision.s_tangent;
  tMat = xf1.R;
  tangent.x = tMat.col1.x * localTangent.x + tMat.col2.x * localTangent.y;
  tangent.y = tMat.col1.y * localTangent.x + tMat.col2.y * localTangent.y;
  var tangent2 = b2Collision.s_tangent2;
  tangent2.x = -tangent.x;
  tangent2.y = -tangent.y;
  var normal = b2Collision.s_normal;
  normal.x = tangent.y;
  normal.y = -tangent.x;
  var v11 = b2Collision.s_v11;
  var v12 = b2Collision.s_v12;
  v11.x = xf1.position.x + (tMat.col1.x * local_v11.x + tMat.col2.x * local_v11.y);
  v11.y = xf1.position.y + (tMat.col1.y * local_v11.x + tMat.col2.y * local_v11.y);
  v12.x = xf1.position.x + (tMat.col1.x * local_v12.x + tMat.col2.x * local_v12.y);
  v12.y = xf1.position.y + (tMat.col1.y * local_v12.x + tMat.col2.y * local_v12.y);
  var frontOffset = normal.x * v11.x + normal.y * v11.y;
  var sideOffset1 = -tangent.x * v11.x - tangent.y * v11.y + totalRadius;
  var sideOffset2 = tangent.x * v12.x + tangent.y * v12.y + totalRadius;
  var clipPoints1 = b2Collision.s_clipPoints1;
  var clipPoints2 = b2Collision.s_clipPoints2;
  var np = 0;
  np = b2Collision.ClipSegmentToLine(clipPoints1, incidentEdge, tangent2, sideOffset1);
  if(np < 2) {
    return
  }
  np = b2Collision.ClipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2);
  if(np < 2) {
    return
  }
  manifold.m_localPlaneNormal.SetV(localNormal);
  manifold.m_localPoint.SetV(planePoint);
  var pointCount = 0;
  for(var i = 0;i < b2Settings.b2_maxManifoldPoints;++i) {
    cv = clipPoints2[i];
    var separation = normal.x * cv.v.x + normal.y * cv.v.y - frontOffset;
    if(separation <= totalRadius) {
      var cp = manifold.m_points[pointCount];
      tMat = xf2.R;
      var tX = cv.v.x - xf2.position.x;
      var tY = cv.v.y - xf2.position.y;
      cp.m_localPoint.x = tX * tMat.col1.x + tY * tMat.col1.y;
      cp.m_localPoint.y = tX * tMat.col2.x + tY * tMat.col2.y;
      cp.m_id.Set(cv.id);
      cp.m_id.features.flip = flip;
      ++pointCount
    }
  }
  manifold.m_pointCount = pointCount
};
b2Collision.CollideCircles = function(manifold, circle1, xf1, circle2, xf2) {
  manifold.m_pointCount = 0;
  var tMat;
  var tVec;
  tMat = xf1.R;
  tVec = circle1.m_p;
  var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  tMat = xf2.R;
  tVec = circle2.m_p;
  var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  var dX = p2X - p1X;
  var dY = p2Y - p1Y;
  var distSqr = dX * dX + dY * dY;
  var radius = circle1.m_radius + circle2.m_radius;
  if(distSqr > radius * radius) {
    return
  }
  manifold.m_type = b2Manifold.e_circles;
  manifold.m_localPoint.SetV(circle1.m_p);
  manifold.m_localPlaneNormal.SetZero();
  manifold.m_pointCount = 1;
  manifold.m_points[0].m_localPoint.SetV(circle2.m_p);
  manifold.m_points[0].m_id.key = 0
};
b2Collision.CollidePolygonAndCircle = function(manifold, polygon, xf1, circle, xf2) {
  manifold.m_pointCount = 0;
  var tPoint;
  var dX;
  var dY;
  var positionX;
  var positionY;
  var tVec;
  var tMat;
  tMat = xf2.R;
  tVec = circle.m_p;
  var cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
  var cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
  dX = cX - xf1.position.x;
  dY = cY - xf1.position.y;
  tMat = xf1.R;
  var cLocalX = dX * tMat.col1.x + dY * tMat.col1.y;
  var cLocalY = dX * tMat.col2.x + dY * tMat.col2.y;
  var dist;
  var normalIndex = 0;
  var separation = -Number.MAX_VALUE;
  var radius = polygon.m_radius + circle.m_radius;
  var vertexCount = polygon.m_vertexCount;
  var vertices = polygon.m_vertices;
  var normals = polygon.m_normals;
  for(var i = 0;i < vertexCount;++i) {
    tVec = vertices[i];
    dX = cLocalX - tVec.x;
    dY = cLocalY - tVec.y;
    tVec = normals[i];
    var s = tVec.x * dX + tVec.y * dY;
    if(s > radius) {
      return
    }
    if(s > separation) {
      separation = s;
      normalIndex = i
    }
  }
  var vertIndex1 = normalIndex;
  var vertIndex2 = vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0;
  var v1 = vertices[vertIndex1];
  var v2 = vertices[vertIndex2];
  if(separation < Number.MIN_VALUE) {
    manifold.m_pointCount = 1;
    manifold.m_type = b2Manifold.e_faceA;
    manifold.m_localPlaneNormal.SetV(normals[normalIndex]);
    manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
    manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
    manifold.m_points[0].m_localPoint.SetV(circle.m_p);
    manifold.m_points[0].m_id.key = 0;
    return
  }
  var u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
  var u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
  if(u1 <= 0) {
    if((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) {
      return
    }
    manifold.m_pointCount = 1;
    manifold.m_type = b2Manifold.e_faceA;
    manifold.m_localPlaneNormal.x = cLocalX - v1.x;
    manifold.m_localPlaneNormal.y = cLocalY - v1.y;
    manifold.m_localPlaneNormal.Normalize();
    manifold.m_localPoint.SetV(v1);
    manifold.m_points[0].m_localPoint.SetV(circle.m_p);
    manifold.m_points[0].m_id.key = 0
  }else {
    if(u2 <= 0) {
      if((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) {
        return
      }
      manifold.m_pointCount = 1;
      manifold.m_type = b2Manifold.e_faceA;
      manifold.m_localPlaneNormal.x = cLocalX - v2.x;
      manifold.m_localPlaneNormal.y = cLocalY - v2.y;
      manifold.m_localPlaneNormal.Normalize();
      manifold.m_localPoint.SetV(v2);
      manifold.m_points[0].m_localPoint.SetV(circle.m_p);
      manifold.m_points[0].m_id.key = 0
    }else {
      var faceCenterX = 0.5 * (v1.x + v2.x);
      var faceCenterY = 0.5 * (v1.y + v2.y);
      separation = (cLocalX - faceCenterX) * normals[vertIndex1].x + (cLocalY - faceCenterY) * normals[vertIndex1].y;
      if(separation > radius) {
        return
      }
      manifold.m_pointCount = 1;
      manifold.m_type = b2Manifold.e_faceA;
      manifold.m_localPlaneNormal.x = normals[vertIndex1].x;
      manifold.m_localPlaneNormal.y = normals[vertIndex1].y;
      manifold.m_localPlaneNormal.Normalize();
      manifold.m_localPoint.Set(faceCenterX, faceCenterY);
      manifold.m_points[0].m_localPoint.SetV(circle.m_p);
      manifold.m_points[0].m_id.key = 0
    }
  }
};
b2Collision.TestOverlap = function(a, b) {
  var t1 = b.lowerBound;
  var t2 = a.upperBound;
  var d1X = t1.x - t2.x;
  var d1Y = t1.y - t2.y;
  t1 = a.lowerBound;
  t2 = b.upperBound;
  var d2X = t1.x - t2.x;
  var d2Y = t1.y - t2.y;
  if(d1X > 0 || d1Y > 0) {
    return false
  }
  if(d2X > 0 || d2Y > 0) {
    return false
  }
  return true
};
b2Collision.b2_nullFeature = 255;
b2Collision.s_incidentEdge = b2Collision.MakeClipPointVector();
b2Collision.s_clipPoints1 = b2Collision.MakeClipPointVector();
b2Collision.s_clipPoints2 = b2Collision.MakeClipPointVector();
b2Collision.s_edgeAO = new Array(1);
b2Collision.s_edgeBO = new Array(1);
b2Collision.s_localTangent = new b2Vec2;
b2Collision.s_localNormal = new b2Vec2;
b2Collision.s_planePoint = new b2Vec2;
b2Collision.s_normal = new b2Vec2;
b2Collision.s_tangent = new b2Vec2;
b2Collision.s_tangent2 = new b2Vec2;
b2Collision.s_v11 = new b2Vec2;
b2Collision.s_v12 = new b2Vec2;
b2Collision.b2CollidePolyTempVec = new b2Vec2;var b2PolyAndCircleContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2PolyAndCircleContact.prototype, b2Contact.prototype);
b2PolyAndCircleContact.prototype._super = b2Contact.prototype;
b2PolyAndCircleContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2PolyAndCircleContact.prototype.__varz = function() {
};
b2PolyAndCircleContact.Create = function(allocator) {
  return new b2PolyAndCircleContact
};
b2PolyAndCircleContact.Destroy = function(contact, allocator) {
};
b2PolyAndCircleContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.m_body;
  var bB = this.m_fixtureB.m_body;
  b2Collision.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2PolyAndCircleContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB]);
  b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
  b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_circleShape)
};var b2ContactPoint = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactPoint.prototype.__constructor = function() {
};
b2ContactPoint.prototype.__varz = function() {
  this.position = new b2Vec2;
  this.velocity = new b2Vec2;
  this.normal = new b2Vec2;
  this.id = new b2ContactID
};
b2ContactPoint.prototype.shape1 = null;
b2ContactPoint.prototype.shape2 = null;
b2ContactPoint.prototype.position = new b2Vec2;
b2ContactPoint.prototype.velocity = new b2Vec2;
b2ContactPoint.prototype.normal = new b2Vec2;
b2ContactPoint.prototype.separation = null;
b2ContactPoint.prototype.friction = null;
b2ContactPoint.prototype.restitution = null;
b2ContactPoint.prototype.id = new b2ContactID;var b2CircleContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2CircleContact.prototype, b2Contact.prototype);
b2CircleContact.prototype._super = b2Contact.prototype;
b2CircleContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2CircleContact.prototype.__varz = function() {
};
b2CircleContact.Create = function(allocator) {
  return new b2CircleContact
};
b2CircleContact.Destroy = function(contact, allocator) {
};
b2CircleContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.GetBody();
  var bB = this.m_fixtureB.GetBody();
  b2Collision.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2CircleContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB])
};var b2EdgeAndCircleContact = function() {
  b2Contact.prototype.__varz.call(this);
  this.__varz();
  this.__constructor.apply(this, arguments)
};
extend(b2EdgeAndCircleContact.prototype, b2Contact.prototype);
b2EdgeAndCircleContact.prototype._super = b2Contact.prototype;
b2EdgeAndCircleContact.prototype.__constructor = function() {
  this._super.__constructor.apply(this, arguments)
};
b2EdgeAndCircleContact.prototype.__varz = function() {
};
b2EdgeAndCircleContact.Create = function(allocator) {
  return new b2EdgeAndCircleContact
};
b2EdgeAndCircleContact.Destroy = function(contact, allocator) {
};
b2EdgeAndCircleContact.prototype.Evaluate = function() {
  var bA = this.m_fixtureA.GetBody();
  var bB = this.m_fixtureB.GetBody();
  this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape(), bA.m_xf, this.m_fixtureB.GetShape(), bB.m_xf)
};
b2EdgeAndCircleContact.prototype.b2CollideEdgeAndCircle = function(manifold, edge, xf1, circle, xf2) {
};
b2EdgeAndCircleContact.prototype.Reset = function(fixtureA, fixtureB) {
  this._super.Reset.apply(this, [fixtureA, fixtureB])
};var b2ContactManager = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2ContactManager.prototype.__constructor = function() {
  this.m_world = null;
  this.m_contactCount = 0;
  this.m_contactFilter = b2ContactFilter.b2_defaultFilter;
  this.m_contactListener = b2ContactListener.b2_defaultListener;
  this.m_contactFactory = new b2ContactFactory(this.m_allocator);
  this.m_broadPhase = new b2DynamicTreeBroadPhase
};
b2ContactManager.prototype.__varz = function() {
};
b2ContactManager.s_evalCP = new b2ContactPoint;
b2ContactManager.prototype.AddPair = function(proxyUserDataA, proxyUserDataB) {
  var fixtureA = proxyUserDataA;
  var fixtureB = proxyUserDataB;
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if(bodyA == bodyB) {
    return
  }
  var edge = bodyB.GetContactList();
  while(edge) {
    if(edge.other == bodyA) {
      var fA = edge.contact.GetFixtureA();
      var fB = edge.contact.GetFixtureB();
      if(fA == fixtureA && fB == fixtureB) {
        return
      }
      if(fA == fixtureB && fB == fixtureA) {
        return
      }
    }
    edge = edge.next
  }
  if(bodyB.ShouldCollide(bodyA) == false) {
    return
  }
  if(this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
    return
  }
  var c = this.m_contactFactory.Create(fixtureA, fixtureB);
  fixtureA = c.GetFixtureA();
  fixtureB = c.GetFixtureB();
  bodyA = fixtureA.m_body;
  bodyB = fixtureB.m_body;
  c.m_prev = null;
  c.m_next = this.m_world.m_contactList;
  if(this.m_world.m_contactList != null) {
    this.m_world.m_contactList.m_prev = c
  }
  this.m_world.m_contactList = c;
  c.m_nodeA.contact = c;
  c.m_nodeA.other = bodyB;
  c.m_nodeA.prev = null;
  c.m_nodeA.next = bodyA.m_contactList;
  if(bodyA.m_contactList != null) {
    bodyA.m_contactList.prev = c.m_nodeA
  }
  bodyA.m_contactList = c.m_nodeA;
  c.m_nodeB.contact = c;
  c.m_nodeB.other = bodyA;
  c.m_nodeB.prev = null;
  c.m_nodeB.next = bodyB.m_contactList;
  if(bodyB.m_contactList != null) {
    bodyB.m_contactList.prev = c.m_nodeB
  }
  bodyB.m_contactList = c.m_nodeB;
  ++this.m_world.m_contactCount;
  return
};
b2ContactManager.prototype.FindNewContacts = function() {
  var that = this;
  this.m_broadPhase.UpdatePairs(function(a, b) {
    return that.AddPair(a, b)
  })
};
b2ContactManager.prototype.Destroy = function(c) {
  var fixtureA = c.GetFixtureA();
  var fixtureB = c.GetFixtureB();
  var bodyA = fixtureA.GetBody();
  var bodyB = fixtureB.GetBody();
  if(c.IsTouching()) {
    this.m_contactListener.EndContact(c)
  }
  if(c.m_prev) {
    c.m_prev.m_next = c.m_next
  }
  if(c.m_next) {
    c.m_next.m_prev = c.m_prev
  }
  if(c == this.m_world.m_contactList) {
    this.m_world.m_contactList = c.m_next
  }
  if(c.m_nodeA.prev) {
    c.m_nodeA.prev.next = c.m_nodeA.next
  }
  if(c.m_nodeA.next) {
    c.m_nodeA.next.prev = c.m_nodeA.prev
  }
  if(c.m_nodeA == bodyA.m_contactList) {
    bodyA.m_contactList = c.m_nodeA.next
  }
  if(c.m_nodeB.prev) {
    c.m_nodeB.prev.next = c.m_nodeB.next
  }
  if(c.m_nodeB.next) {
    c.m_nodeB.next.prev = c.m_nodeB.prev
  }
  if(c.m_nodeB == bodyB.m_contactList) {
    bodyB.m_contactList = c.m_nodeB.next
  }
  this.m_contactFactory.Destroy(c);
  --this.m_contactCount
};
b2ContactManager.prototype.Collide = function() {
  var c = this.m_world.m_contactList;
  while(c) {
    var fixtureA = c.GetFixtureA();
    var fixtureB = c.GetFixtureB();
    var bodyA = fixtureA.GetBody();
    var bodyB = fixtureB.GetBody();
    if(bodyA.IsAwake() == false && bodyB.IsAwake() == false) {
      c = c.GetNext();
      continue
    }
    if(c.m_flags & b2Contact.e_filterFlag) {
      if(bodyB.ShouldCollide(bodyA) == false) {
        var cNuke = c;
        c = cNuke.GetNext();
        this.Destroy(cNuke);
        continue
      }
      if(this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
        cNuke = c;
        c = cNuke.GetNext();
        this.Destroy(cNuke);
        continue
      }
      c.m_flags &= ~b2Contact.e_filterFlag
    }
    var proxyA = fixtureA.m_proxy;
    var proxyB = fixtureB.m_proxy;
    var overlap = this.m_broadPhase.TestOverlap(proxyA, proxyB);
    if(overlap == false) {
      cNuke = c;
      c = cNuke.GetNext();
      this.Destroy(cNuke);
      continue
    }
    c.Update(this.m_contactListener);
    c = c.GetNext()
  }
};
b2ContactManager.prototype.m_world = null;
b2ContactManager.prototype.m_broadPhase = null;
b2ContactManager.prototype.m_contactList = null;
b2ContactManager.prototype.m_contactCount = 0;
b2ContactManager.prototype.m_contactFilter = null;
b2ContactManager.prototype.m_contactListener = null;
b2ContactManager.prototype.m_contactFactory = null;
b2ContactManager.prototype.m_allocator = null;var b2World = function() {
  this.__varz();
  this.__constructor.apply(this, arguments)
};
b2World.prototype.__constructor = function(gravity, doSleep) {
  this.m_destructionListener = null;
  this.m_debugDraw = null;
  this.m_bodyList = null;
  this.m_contactList = null;
  this.m_jointList = null;
  this.m_controllerList = null;
  this.m_bodyCount = 0;
  this.m_contactCount = 0;
  this.m_jointCount = 0;
  this.m_controllerCount = 0;
  b2World.m_warmStarting = true;
  b2World.m_continuousPhysics = true;
  this.m_allowSleep = doSleep;
  this.m_gravity = gravity;
  this.m_inv_dt0 = 0;
  this.m_contactManager.m_world = this;
  var bd = new b2BodyDef;
  this.m_groundBody = this.CreateBody(bd)
};
b2World.prototype.__varz = function() {
  this.s_stack = new Array;
  this.m_contactManager = new b2ContactManager;
  this.m_contactSolver = new b2ContactSolver;
  this.m_island = new b2Island
};
b2World.s_timestep2 = new b2TimeStep;
b2World.s_backupA = new b2Sweep;
b2World.s_backupB = new b2Sweep;
b2World.s_timestep = new b2TimeStep;
b2World.s_queue = new Array;
b2World.e_newFixture = 1;
b2World.e_locked = 2;
b2World.s_xf = new b2Transform;
b2World.s_jointColor = new b2Color(0.5, 0.8, 0.8);
b2World.m_warmStarting = null;
b2World.m_continuousPhysics = null;
b2World.prototype.Solve = function(step) {
  var b;
  for(var controller = this.m_controllerList;controller;controller = controller.m_next) {
    controller.Step(step)
  }
  var island = this.m_island;
  island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
  for(b = this.m_bodyList;b;b = b.m_next) {
    b.m_flags &= ~b2Body.e_islandFlag
  }
  for(var c = this.m_contactList;c;c = c.m_next) {
    c.m_flags &= ~b2Contact.e_islandFlag
  }
  for(var j = this.m_jointList;j;j = j.m_next) {
    j.m_islandFlag = false
  }
  var stackSize = this.m_bodyCount;
  var stack = this.s_stack;
  for(var seed = this.m_bodyList;seed;seed = seed.m_next) {
    if(seed.m_flags & b2Body.e_islandFlag) {
      continue
    }
    if(seed.IsAwake() == false || seed.IsActive() == false) {
      continue
    }
    if(seed.GetType() == b2Body.b2_staticBody) {
      continue
    }
    island.Clear();
    var stackCount = 0;
    stack[stackCount++] = seed;
    seed.m_flags |= b2Body.e_islandFlag;
    while(stackCount > 0) {
      b = stack[--stackCount];
      island.AddBody(b);
      if(b.IsAwake() == false) {
        b.SetAwake(true)
      }
      if(b.GetType() == b2Body.b2_staticBody) {
        continue
      }
      var other;
      for(var ce = b.m_contactList;ce;ce = ce.next) {
        if(ce.contact.m_flags & b2Contact.e_islandFlag) {
          continue
        }
        if(ce.contact.IsSensor() == true || ce.contact.IsEnabled() == false || ce.contact.IsTouching() == false) {
          continue
        }
        island.AddContact(ce.contact);
        ce.contact.m_flags |= b2Contact.e_islandFlag;
        other = ce.other;
        if(other.m_flags & b2Body.e_islandFlag) {
          continue
        }
        stack[stackCount++] = other;
        other.m_flags |= b2Body.e_islandFlag
      }
      for(var jn = b.m_jointList;jn;jn = jn.next) {
        if(jn.joint.m_islandFlag == true) {
          continue
        }
        other = jn.other;
        if(other.IsActive() == false) {
          continue
        }
        island.AddJoint(jn.joint);
        jn.joint.m_islandFlag = true;
        if(other.m_flags & b2Body.e_islandFlag) {
          continue
        }
        stack[stackCount++] = other;
        other.m_flags |= b2Body.e_islandFlag
      }
    }
    island.Solve(step, this.m_gravity, this.m_allowSleep);
    for(var i = 0;i < island.m_bodyCount;++i) {
      b = island.m_bodies[i];
      if(b.GetType() == b2Body.b2_staticBody) {
        b.m_flags &= ~b2Body.e_islandFlag
      }
    }
  }
  for(i = 0;i < stack.length;++i) {
    if(!stack[i]) {
      break
    }
    stack[i] = null
  }
  for(b = this.m_bodyList;b;b = b.m_next) {
    if(b.IsAwake() == false || b.IsActive() == false) {
      continue
    }
    if(b.GetType() == b2Body.b2_staticBody) {
      continue
    }
    b.SynchronizeFixtures()
  }
  this.m_contactManager.FindNewContacts()
};
b2World.prototype.SolveTOI = function(step) {
  var b;
  var fA;
  var fB;
  var bA;
  var bB;
  var cEdge;
  var j;
  var island = this.m_island;
  island.Initialize(this.m_bodyCount, b2Settings.b2_maxTOIContactsPerIsland, b2Settings.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
  var queue = b2World.s_queue;
  for(b = this.m_bodyList;b;b = b.m_next) {
    b.m_flags &= ~b2Body.e_islandFlag;
    b.m_sweep.t0 = 0
  }
  var c;
  for(c = this.m_contactList;c;c = c.m_next) {
    c.m_flags &= ~(b2Contact.e_toiFlag | b2Contact.e_islandFlag)
  }
  for(j = this.m_jointList;j;j = j.m_next) {
    j.m_islandFlag = false
  }
  for(;;) {
    var minContact = null;
    var minTOI = 1;
    for(c = this.m_contactList;c;c = c.m_next) {
      if(c.IsSensor() == true || c.IsEnabled() == false || c.IsContinuous() == false) {
        continue
      }
      var toi = 1;
      if(c.m_flags & b2Contact.e_toiFlag) {
        toi = c.m_toi
      }else {
        fA = c.m_fixtureA;
        fB = c.m_fixtureB;
        bA = fA.m_body;
        bB = fB.m_body;
        if((bA.GetType() != b2Body.b2_dynamicBody || bA.IsAwake() == false) && (bB.GetType() != b2Body.b2_dynamicBody || bB.IsAwake() == false)) {
          continue
        }
        var t0 = bA.m_sweep.t0;
        if(bA.m_sweep.t0 < bB.m_sweep.t0) {
          t0 = bB.m_sweep.t0;
          bA.m_sweep.Advance(t0)
        }else {
          if(bB.m_sweep.t0 < bA.m_sweep.t0) {
            t0 = bA.m_sweep.t0;
            bB.m_sweep.Advance(t0)
          }
        }
        toi = c.ComputeTOI(bA.m_sweep, bB.m_sweep);
        b2Settings.b2Assert(0 <= toi && toi <= 1);
        if(toi > 0 && toi < 1) {
          toi = (1 - toi) * t0 + toi;
          if(toi > 1) {
            toi = 1
          }
        }
        c.m_toi = toi;
        c.m_flags |= b2Contact.e_toiFlag
      }
      if(Number.MIN_VALUE < toi && toi < minTOI) {
        minContact = c;
        minTOI = toi
      }
    }
    if(minContact == null || 1 - 100 * Number.MIN_VALUE < minTOI) {
      break
    }
    fA = minContact.m_fixtureA;
    fB = minContact.m_fixtureB;
    bA = fA.m_body;
    bB = fB.m_body;
    b2World.s_backupA.Set(bA.m_sweep);
    b2World.s_backupB.Set(bB.m_sweep);
    bA.Advance(minTOI);
    bB.Advance(minTOI);
    minContact.Update(this.m_contactManager.m_contactListener);
    minContact.m_flags &= ~b2Contact.e_toiFlag;
    if(minContact.IsSensor() == true || minContact.IsEnabled() == false) {
      bA.m_sweep.Set(b2World.s_backupA);
      bB.m_sweep.Set(b2World.s_backupB);
      bA.SynchronizeTransform();
      bB.SynchronizeTransform();
      continue
    }
    if(minContact.IsTouching() == false) {
      continue
    }
    var seed = bA;
    if(seed.GetType() != b2Body.b2_dynamicBody) {
      seed = bB
    }
    island.Clear();
    var queueStart = 0;
    var queueSize = 0;
    queue[queueStart + queueSize++] = seed;
    seed.m_flags |= b2Body.e_islandFlag;
    while(queueSize > 0) {
      b = queue[queueStart++];
      --queueSize;
      island.AddBody(b);
      if(b.IsAwake() == false) {
        b.SetAwake(true)
      }
      if(b.GetType() != b2Body.b2_dynamicBody) {
        continue
      }
      for(cEdge = b.m_contactList;cEdge;cEdge = cEdge.next) {
        if(island.m_contactCount == island.m_contactCapacity) {
          break
        }
        if(cEdge.contact.m_flags & b2Contact.e_islandFlag) {
          continue
        }
        if(cEdge.contact.IsSensor() == true || cEdge.contact.IsEnabled() == false || cEdge.contact.IsTouching() == false) {
          continue
        }
        island.AddContact(cEdge.contact);
        cEdge.contact.m_flags |= b2Contact.e_islandFlag;
        var other = cEdge.other;
        if(other.m_flags & b2Body.e_islandFlag) {
          continue
        }
        if(other.GetType() != b2Body.b2_staticBody) {
          other.Advance(minTOI);
          other.SetAwake(true)
        }
        queue[queueStart + queueSize] = other;
        ++queueSize;
        other.m_flags |= b2Body.e_islandFlag
      }
      for(var jEdge = b.m_jointList;jEdge;jEdge = jEdge.next) {
        if(island.m_jointCount == island.m_jointCapacity) {
          continue
        }
        if(jEdge.joint.m_islandFlag == true) {
          continue
        }
        other = jEdge.other;
        if(other.IsActive() == false) {
          continue
        }
        island.AddJoint(jEdge.joint);
        jEdge.joint.m_islandFlag = true;
        if(other.m_flags & b2Body.e_islandFlag) {
          continue
        }
        if(other.GetType() != b2Body.b2_staticBody) {
          other.Advance(minTOI);
          other.SetAwake(true)
        }
        queue[queueStart + queueSize] = other;
        ++queueSize;
        other.m_flags |= b2Body.e_islandFlag
      }
    }
    var subStep = b2World.s_timestep;
    subStep.warmStarting = false;
    subStep.dt = (1 - minTOI) * step.dt;
    subStep.inv_dt = 1 / subStep.dt;
    subStep.dtRatio = 0;
    subStep.velocityIterations = step.velocityIterations;
    subStep.positionIterations = step.positionIterations;
    island.SolveTOI(subStep);
    var i = 0;
    for(i = 0;i < island.m_bodyCount;++i) {
      b = island.m_bodies[i];
      b.m_flags &= ~b2Body.e_islandFlag;
      if(b.IsAwake() == false) {
        continue
      }
      if(b.GetType() != b2Body.b2_dynamicBody) {
        continue
      }
      b.SynchronizeFixtures();
      for(cEdge = b.m_contactList;cEdge;cEdge = cEdge.next) {
        cEdge.contact.m_flags &= ~b2Contact.e_toiFlag
      }
    }
    for(i = 0;i < island.m_contactCount;++i) {
      c = island.m_contacts[i];
      c.m_flags &= ~(b2Contact.e_toiFlag | b2Contact.e_islandFlag)
    }
    for(i = 0;i < island.m_jointCount;++i) {
      j = island.m_joints[i];
      j.m_islandFlag = false
    }
    this.m_contactManager.FindNewContacts()
  }
};
b2World.prototype.DrawJoint = function(joint) {
  var b1 = joint.GetBodyA();
  var b2 = joint.GetBodyB();
  var xf1 = b1.m_xf;
  var xf2 = b2.m_xf;
  var x1 = xf1.position;
  var x2 = xf2.position;
  var p1 = joint.GetAnchorA();
  var p2 = joint.GetAnchorB();
  var color = b2World.s_jointColor;
  switch(joint.m_type) {
    case b2Joint.e_distanceJoint:
      this.m_debugDraw.DrawSegment(p1, p2, color);
      break;
    case b2Joint.e_pulleyJoint:
      var pulley = joint;
      var s1 = pulley.GetGroundAnchorA();
      var s2 = pulley.GetGroundAnchorB();
      this.m_debugDraw.DrawSegment(s1, p1, color);
      this.m_debugDraw.DrawSegment(s2, p2, color);
      this.m_debugDraw.DrawSegment(s1, s2, color);
      break;
    case b2Joint.e_mouseJoint:
      this.m_debugDraw.DrawSegment(p1, p2, color);
      break;
    default:
      if(b1 != this.m_groundBody) {
        this.m_debugDraw.DrawSegment(x1, p1, color)
      }
      this.m_debugDraw.DrawSegment(p1, p2, color);
      if(b2 != this.m_groundBody) {
        this.m_debugDraw.DrawSegment(x2, p2, color)
      }
  }
};
b2World.prototype.DrawShape = function(shape, xf, color) {
  switch(shape.m_type) {
    case b2Shape.e_circleShape:
      var circle = shape;
      var center = b2Math.MulX(xf, circle.m_p);
      var radius = circle.m_radius;
      var axis = xf.R.col1;
      this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
      break;
    case b2Shape.e_polygonShape:
      var i = 0;
      var poly = shape;
      var vertexCount = poly.GetVertexCount();
      var localVertices = poly.GetVertices();
      var vertices = new Array(vertexCount);
      for(i = 0;i < vertexCount;++i) {
        vertices[i] = b2Math.MulX(xf, localVertices[i])
      }
      this.m_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
      break;
    case b2Shape.e_edgeShape:
      var edge = shape;
      this.m_debugDraw.DrawSegment(b2Math.MulX(xf, edge.GetVertex1()), b2Math.MulX(xf, edge.GetVertex2()), color);
      break
  }
};
b2World.prototype.SetDestructionListener = function(listener) {
  this.m_destructionListener = listener
};
b2World.prototype.SetContactFilter = function(filter) {
  this.m_contactManager.m_contactFilter = filter
};
b2World.prototype.SetContactListener = function(listener) {
  this.m_contactManager.m_contactListener = listener
};
b2World.prototype.SetDebugDraw = function(debugDraw) {
  this.m_debugDraw = debugDraw
};
b2World.prototype.SetBroadPhase = function(broadPhase) {
  var oldBroadPhase = this.m_contactManager.m_broadPhase;
  this.m_contactManager.m_broadPhase = broadPhase;
  for(var b = this.m_bodyList;b;b = b.m_next) {
    for(var f = b.m_fixtureList;f;f = f.m_next) {
      f.m_proxy = broadPhase.CreateProxy(oldBroadPhase.GetFatAABB(f.m_proxy), f)
    }
  }
};
b2World.prototype.Validate = function() {
  this.m_contactManager.m_broadPhase.Validate()
};
b2World.prototype.GetProxyCount = function() {
  return this.m_contactManager.m_broadPhase.GetProxyCount()
};
b2World.prototype.CreateBody = function(def) {
  if(this.IsLocked() == true) {
    return null
  }
  var b = new b2Body(def, this);
  b.m_prev = null;
  b.m_next = this.m_bodyList;
  if(this.m_bodyList) {
    this.m_bodyList.m_prev = b
  }
  this.m_bodyList = b;
  ++this.m_bodyCount;
  return b
};
b2World.prototype.DestroyBody = function(b) {
  if(this.IsLocked() == true) {
    return
  }
  var jn = b.m_jointList;
  while(jn) {
    var jn0 = jn;
    jn = jn.next;
    if(this.m_destructionListener) {
      this.m_destructionListener.SayGoodbyeJoint(jn0.joint)
    }
    this.DestroyJoint(jn0.joint)
  }
  var coe = b.m_controllerList;
  while(coe) {
    var coe0 = coe;
    coe = coe.nextController;
    coe0.controller.RemoveBody(b)
  }
  var ce = b.m_contactList;
  while(ce) {
    var ce0 = ce;
    ce = ce.next;
    this.m_contactManager.Destroy(ce0.contact)
  }
  b.m_contactList = null;
  var f = b.m_fixtureList;
  while(f) {
    var f0 = f;
    f = f.m_next;
    if(this.m_destructionListener) {
      this.m_destructionListener.SayGoodbyeFixture(f0)
    }
    f0.DestroyProxy(this.m_contactManager.m_broadPhase);
    f0.Destroy()
  }
  b.m_fixtureList = null;
  b.m_fixtureCount = 0;
  if(b.m_prev) {
    b.m_prev.m_next = b.m_next
  }
  if(b.m_next) {
    b.m_next.m_prev = b.m_prev
  }
  if(b == this.m_bodyList) {
    this.m_bodyList = b.m_next
  }
  --this.m_bodyCount
};
b2World.prototype.CreateJoint = function(def) {
  var j = b2Joint.Create(def, null);
  j.m_prev = null;
  j.m_next = this.m_jointList;
  if(this.m_jointList) {
    this.m_jointList.m_prev = j
  }
  this.m_jointList = j;
  ++this.m_jointCount;
  j.m_edgeA.joint = j;
  j.m_edgeA.other = j.m_bodyB;
  j.m_edgeA.prev = null;
  j.m_edgeA.next = j.m_bodyA.m_jointList;
  if(j.m_bodyA.m_jointList) {
    j.m_bodyA.m_jointList.prev = j.m_edgeA
  }
  j.m_bodyA.m_jointList = j.m_edgeA;
  j.m_edgeB.joint = j;
  j.m_edgeB.other = j.m_bodyA;
  j.m_edgeB.prev = null;
  j.m_edgeB.next = j.m_bodyB.m_jointList;
  if(j.m_bodyB.m_jointList) {
    j.m_bodyB.m_jointList.prev = j.m_edgeB
  }
  j.m_bodyB.m_jointList = j.m_edgeB;
  var bodyA = def.bodyA;
  var bodyB = def.bodyB;
  if(def.collideConnected == false) {
    var edge = bodyB.GetContactList();
    while(edge) {
      if(edge.other == bodyA) {
        edge.contact.FlagForFiltering()
      }
      edge = edge.next
    }
  }
  return j
};
b2World.prototype.DestroyJoint = function(j) {
  var collideConnected = j.m_collideConnected;
  if(j.m_prev) {
    j.m_prev.m_next = j.m_next
  }
  if(j.m_next) {
    j.m_next.m_prev = j.m_prev
  }
  if(j == this.m_jointList) {
    this.m_jointList = j.m_next
  }
  var bodyA = j.m_bodyA;
  var bodyB = j.m_bodyB;
  bodyA.SetAwake(true);
  bodyB.SetAwake(true);
  if(j.m_edgeA.prev) {
    j.m_edgeA.prev.next = j.m_edgeA.next
  }
  if(j.m_edgeA.next) {
    j.m_edgeA.next.prev = j.m_edgeA.prev
  }
  if(j.m_edgeA == bodyA.m_jointList) {
    bodyA.m_jointList = j.m_edgeA.next
  }
  j.m_edgeA.prev = null;
  j.m_edgeA.next = null;
  if(j.m_edgeB.prev) {
    j.m_edgeB.prev.next = j.m_edgeB.next
  }
  if(j.m_edgeB.next) {
    j.m_edgeB.next.prev = j.m_edgeB.prev
  }
  if(j.m_edgeB == bodyB.m_jointList) {
    bodyB.m_jointList = j.m_edgeB.next
  }
  j.m_edgeB.prev = null;
  j.m_edgeB.next = null;
  b2Joint.Destroy(j, null);
  --this.m_jointCount;
  if(collideConnected == false) {
    var edge = bodyB.GetContactList();
    while(edge) {
      if(edge.other == bodyA) {
        edge.contact.FlagForFiltering()
      }
      edge = edge.next
    }
  }
};
b2World.prototype.AddController = function(c) {
  c.m_next = this.m_controllerList;
  c.m_prev = null;
  this.m_controllerList = c;
  c.m_world = this;
  this.m_controllerCount++;
  return c
};
b2World.prototype.RemoveController = function(c) {
  if(c.m_prev) {
    c.m_prev.m_next = c.m_next
  }
  if(c.m_next) {
    c.m_next.m_prev = c.m_prev
  }
  if(this.m_controllerList == c) {
    this.m_controllerList = c.m_next
  }
  this.m_controllerCount--
};
b2World.prototype.CreateController = function(controller) {
  if(controller.m_world != this) {
    throw new Error("Controller can only be a member of one world");
  }
  controller.m_next = this.m_controllerList;
  controller.m_prev = null;
  if(this.m_controllerList) {
    this.m_controllerList.m_prev = controller
  }
  this.m_controllerList = controller;
  ++this.m_controllerCount;
  controller.m_world = this;
  return controller
};
b2World.prototype.DestroyController = function(controller) {
  controller.Clear();
  if(controller.m_next) {
    controller.m_next.m_prev = controller.m_prev
  }
  if(controller.m_prev) {
    controller.m_prev.m_next = controller.m_next
  }
  if(controller == this.m_controllerList) {
    this.m_controllerList = controller.m_next
  }
  --this.m_controllerCount
};
b2World.prototype.SetWarmStarting = function(flag) {
  b2World.m_warmStarting = flag
};
b2World.prototype.SetContinuousPhysics = function(flag) {
  b2World.m_continuousPhysics = flag
};
b2World.prototype.GetBodyCount = function() {
  return this.m_bodyCount
};
b2World.prototype.GetJointCount = function() {
  return this.m_jointCount
};
b2World.prototype.GetContactCount = function() {
  return this.m_contactCount
};
b2World.prototype.SetGravity = function(gravity) {
  this.m_gravity = gravity
};
b2World.prototype.GetGravity = function() {
  return this.m_gravity
};
b2World.prototype.GetGroundBody = function() {
  return this.m_groundBody
};
b2World.prototype.Step = function(dt, velocityIterations, positionIterations) {
  if(this.m_flags & b2World.e_newFixture) {
    this.m_contactManager.FindNewContacts();
    this.m_flags &= ~b2World.e_newFixture
  }
  this.m_flags |= b2World.e_locked;
  var step = b2World.s_timestep2;
  step.dt = dt;
  step.velocityIterations = velocityIterations;
  step.positionIterations = positionIterations;
  if(dt > 0) {
    step.inv_dt = 1 / dt
  }else {
    step.inv_dt = 0
  }
  step.dtRatio = this.m_inv_dt0 * dt;
  step.warmStarting = b2World.m_warmStarting;
  this.m_contactManager.Collide();
  if(step.dt > 0) {
    this.Solve(step)
  }
  if(b2World.m_continuousPhysics && step.dt > 0) {
    this.SolveTOI(step)
  }
  if(step.dt > 0) {
    this.m_inv_dt0 = step.inv_dt
  }
  this.m_flags &= ~b2World.e_locked
};
b2World.prototype.ClearForces = function() {
  for(var body = this.m_bodyList;body;body = body.m_next) {
    body.m_force.SetZero();
    body.m_torque = 0
  }
};
b2World.prototype.DrawDebugData = function() {
  if(this.m_debugDraw == null) {
    return
  }
  this.m_debugDraw.Clear();
  var flags = this.m_debugDraw.GetFlags();
  var i = 0;
  var b;
  var f;
  var s;
  var j;
  var bp;
  var invQ = new b2Vec2;
  var x1 = new b2Vec2;
  var x2 = new b2Vec2;
  var xf;
  var b1 = new b2AABB;
  var b2 = new b2AABB;
  var vs = [new b2Vec2, new b2Vec2, new b2Vec2, new b2Vec2];
  var color = new b2Color(0, 0, 0);
  if(flags & b2DebugDraw.e_shapeBit) {
    for(b = this.m_bodyList;b;b = b.m_next) {
      xf = b.m_xf;
      for(f = b.GetFixtureList();f;f = f.m_next) {
        s = f.GetShape();
        if(b.IsActive() == false) {
          color.Set(0.5, 0.5, 0.3);
          this.DrawShape(s, xf, color)
        }else {
          if(b.GetType() == b2Body.b2_staticBody) {
            color.Set(0.5, 0.9, 0.5);
            this.DrawShape(s, xf, color)
          }else {
            if(b.GetType() == b2Body.b2_kinematicBody) {
              color.Set(0.5, 0.5, 0.9);
              this.DrawShape(s, xf, color)
            }else {
              if(b.IsAwake() == false) {
                color.Set(0.6, 0.6, 0.6);
                this.DrawShape(s, xf, color)
              }else {
                color.Set(0.9, 0.7, 0.7);
                this.DrawShape(s, xf, color)
              }
            }
          }
        }
      }
    }
  }
  if(flags & b2DebugDraw.e_jointBit) {
    for(j = this.m_jointList;j;j = j.m_next) {
      this.DrawJoint(j)
    }
  }
  if(flags & b2DebugDraw.e_controllerBit) {
    for(var c = this.m_controllerList;c;c = c.m_next) {
      c.Draw(this.m_debugDraw)
    }
  }
  if(flags & b2DebugDraw.e_pairBit) {
    color.Set(0.3, 0.9, 0.9);
    for(var contact = this.m_contactManager.m_contactList;contact;contact = contact.GetNext()) {
      var fixtureA = contact.GetFixtureA();
      var fixtureB = contact.GetFixtureB();
      var cA = fixtureA.GetAABB().GetCenter();
      var cB = fixtureB.GetAABB().GetCenter();
      this.m_debugDraw.DrawSegment(cA, cB, color)
    }
  }
  if(flags & b2DebugDraw.e_aabbBit) {
    bp = this.m_contactManager.m_broadPhase;
    vs = [new b2Vec2, new b2Vec2, new b2Vec2, new b2Vec2];
    for(b = this.m_bodyList;b;b = b.GetNext()) {
      if(b.IsActive() == false) {
        continue
      }
      for(f = b.GetFixtureList();f;f = f.GetNext()) {
        var aabb = bp.GetFatAABB(f.m_proxy);
        vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
        vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
        vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
        vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
        this.m_debugDraw.DrawPolygon(vs, 4, color)
      }
    }
  }
  if(flags & b2DebugDraw.e_centerOfMassBit) {
    for(b = this.m_bodyList;b;b = b.m_next) {
      xf = b2World.s_xf;
      xf.R = b.m_xf.R;
      xf.position = b.GetWorldCenter();
      this.m_debugDraw.DrawTransform(xf)
    }
  }
};
b2World.prototype.QueryAABB = function(callback, aabb) {
  var broadPhase = this.m_contactManager.m_broadPhase;
  function WorldQueryWrapper(proxy) {
    return callback(broadPhase.GetUserData(proxy))
  }
  broadPhase.Query(WorldQueryWrapper, aabb)
};
b2World.prototype.QueryShape = function(callback, shape, transform) {
  if(transform == null) {
    transform = new b2Transform;
    transform.SetIdentity()
  }
  var broadPhase = this.m_contactManager.m_broadPhase;
  function WorldQueryWrapper(proxy) {
    var fixture = broadPhase.GetUserData(proxy);
    if(b2Shape.TestOverlap(shape, transform, fixture.GetShape(), fixture.GetBody().GetTransform())) {
      return callback(fixture)
    }
    return true
  }
  var aabb = new b2AABB;
  shape.ComputeAABB(aabb, transform);
  broadPhase.Query(WorldQueryWrapper, aabb)
};
b2World.prototype.QueryPoint = function(callback, p) {
  var broadPhase = this.m_contactManager.m_broadPhase;
  function WorldQueryWrapper(proxy) {
    var fixture = broadPhase.GetUserData(proxy);
    if(fixture.TestPoint(p)) {
      return callback(fixture)
    }
    return true
  }
  var aabb = new b2AABB;
  aabb.lowerBound.Set(p.x - b2Settings.b2_linearSlop, p.y - b2Settings.b2_linearSlop);
  aabb.upperBound.Set(p.x + b2Settings.b2_linearSlop, p.y + b2Settings.b2_linearSlop);
  broadPhase.Query(WorldQueryWrapper, aabb)
};
b2World.prototype.RayCast = function(callback, point1, point2) {
  var broadPhase = this.m_contactManager.m_broadPhase;
  var output = new b2RayCastOutput;
  function RayCastWrapper(input, proxy) {
    var userData = broadPhase.GetUserData(proxy);
    var fixture = userData;
    var hit = fixture.RayCast(output, input);
    if(hit) {
      var fraction = output.fraction;
      var point = new b2Vec2((1 - fraction) * point1.x + fraction * point2.x, (1 - fraction) * point1.y + fraction * point2.y);
      return callback(fixture, point, output.normal, fraction)
    }
    return input.maxFraction
  }
  var input = new b2RayCastInput(point1, point2);
  broadPhase.RayCast(RayCastWrapper, input)
};
b2World.prototype.RayCastOne = function(point1, point2) {
  var result;
  function RayCastOneWrapper(fixture, point, normal, fraction) {
    result = fixture;
    return fraction
  }
  this.RayCast(RayCastOneWrapper, point1, point2);
  return result
};
b2World.prototype.RayCastAll = function(point1, point2) {
  var result = new Array;
  function RayCastAllWrapper(fixture, point, normal, fraction) {
    result[result.length] = fixture;
    return 1
  }
  this.RayCast(RayCastAllWrapper, point1, point2);
  return result
};
b2World.prototype.GetBodyList = function() {
  return this.m_bodyList
};
b2World.prototype.GetJointList = function() {
  return this.m_jointList
};
b2World.prototype.GetContactList = function() {
  return this.m_contactList
};
b2World.prototype.IsLocked = function() {
  return(this.m_flags & b2World.e_locked) > 0
};
b2World.prototype.s_stack = new Array;
b2World.prototype.m_flags = 0;
b2World.prototype.m_contactManager = new b2ContactManager;
b2World.prototype.m_contactSolver = new b2ContactSolver;
b2World.prototype.m_island = new b2Island;
b2World.prototype.m_bodyList = null;
b2World.prototype.m_jointList = null;
b2World.prototype.m_contactList = null;
b2World.prototype.m_bodyCount = 0;
b2World.prototype.m_contactCount = 0;
b2World.prototype.m_jointCount = 0;
b2World.prototype.m_controllerList = null;
b2World.prototype.m_controllerCount = 0;
b2World.prototype.m_gravity = null;
b2World.prototype.m_allowSleep = null;
b2World.prototype.m_groundBody = null;
b2World.prototype.m_destructionListener = null;
b2World.prototype.m_debugDraw = null;
b2World.prototype.m_inv_dt0 = null;if(typeof exports !== "undefined") {
  exports.b2BoundValues = b2BoundValues;
  exports.b2Math = b2Math;
  exports.b2DistanceOutput = b2DistanceOutput;
  exports.b2Mat33 = b2Mat33;
  exports.b2ContactPoint = b2ContactPoint;
  exports.b2PairManager = b2PairManager;
  exports.b2PositionSolverManifold = b2PositionSolverManifold;
  exports.b2OBB = b2OBB;
  exports.b2CircleContact = b2CircleContact;
  exports.b2PulleyJoint = b2PulleyJoint;
  exports.b2Pair = b2Pair;
  exports.b2TimeStep = b2TimeStep;
  exports.b2FixtureDef = b2FixtureDef;
  exports.b2World = b2World;
  exports.b2PrismaticJoint = b2PrismaticJoint;
  exports.b2Controller = b2Controller;
  exports.b2ContactID = b2ContactID;
  exports.b2RevoluteJoint = b2RevoluteJoint;
  exports.b2JointDef = b2JointDef;
  exports.b2Transform = b2Transform;
  exports.b2GravityController = b2GravityController;
  exports.b2EdgeAndCircleContact = b2EdgeAndCircleContact;
  exports.b2EdgeShape = b2EdgeShape;
  exports.b2BuoyancyController = b2BuoyancyController;
  exports.b2LineJointDef = b2LineJointDef;
  exports.b2Contact = b2Contact;
  exports.b2DistanceJoint = b2DistanceJoint;
  exports.b2Body = b2Body;
  exports.b2DestructionListener = b2DestructionListener;
  exports.b2PulleyJointDef = b2PulleyJointDef;
  exports.b2ContactEdge = b2ContactEdge;
  exports.b2ContactConstraint = b2ContactConstraint;
  exports.b2ContactImpulse = b2ContactImpulse;
  exports.b2DistanceJointDef = b2DistanceJointDef;
  exports.b2ContactResult = b2ContactResult;
  exports.b2EdgeChainDef = b2EdgeChainDef;
  exports.b2Vec2 = b2Vec2;
  exports.b2Vec3 = b2Vec3;
  exports.b2DistanceProxy = b2DistanceProxy;
  exports.b2FrictionJointDef = b2FrictionJointDef;
  exports.b2PolygonContact = b2PolygonContact;
  exports.b2TensorDampingController = b2TensorDampingController;
  exports.b2ContactFactory = b2ContactFactory;
  exports.b2WeldJointDef = b2WeldJointDef;
  exports.b2ConstantAccelController = b2ConstantAccelController;
  exports.b2GearJointDef = b2GearJointDef;
  exports.ClipVertex = ClipVertex;
  exports.b2SeparationFunction = b2SeparationFunction;
  exports.b2ManifoldPoint = b2ManifoldPoint;
  exports.b2Color = b2Color;
  exports.b2PolygonShape = b2PolygonShape;
  exports.b2DynamicTreePair = b2DynamicTreePair;
  exports.b2ContactConstraintPoint = b2ContactConstraintPoint;
  exports.b2FrictionJoint = b2FrictionJoint;
  exports.b2ContactFilter = b2ContactFilter;
  exports.b2ControllerEdge = b2ControllerEdge;
  exports.b2Distance = b2Distance;
  exports.b2Fixture = b2Fixture;
  exports.b2DynamicTreeNode = b2DynamicTreeNode;
  exports.b2MouseJoint = b2MouseJoint;
  exports.b2DistanceInput = b2DistanceInput;
  exports.b2BodyDef = b2BodyDef;
  exports.b2DynamicTreeBroadPhase = b2DynamicTreeBroadPhase;
  exports.b2Settings = b2Settings;
  exports.b2Proxy = b2Proxy;
  exports.b2Point = b2Point;
  exports.b2BroadPhase = b2BroadPhase;
  exports.b2Manifold = b2Manifold;
  exports.b2WorldManifold = b2WorldManifold;
  exports.b2PrismaticJointDef = b2PrismaticJointDef;
  exports.b2RayCastOutput = b2RayCastOutput;
  exports.b2ConstantForceController = b2ConstantForceController;
  exports.b2TimeOfImpact = b2TimeOfImpact;
  exports.b2CircleShape = b2CircleShape;
  exports.b2MassData = b2MassData;
  exports.b2Joint = b2Joint;
  exports.b2GearJoint = b2GearJoint;
  exports.b2DynamicTree = b2DynamicTree;
  exports.b2JointEdge = b2JointEdge;
  exports.b2LineJoint = b2LineJoint;
  exports.b2NullContact = b2NullContact;
  exports.b2ContactListener = b2ContactListener;
  exports.b2RayCastInput = b2RayCastInput;
  exports.b2TOIInput = b2TOIInput;
  exports.Features = Features;
  exports.b2FilterData = b2FilterData;
  exports.b2Island = b2Island;
  exports.b2ContactManager = b2ContactManager;
  exports.b2ContactSolver = b2ContactSolver;
  exports.b2Simplex = b2Simplex;
  exports.b2AABB = b2AABB;
  exports.b2Jacobian = b2Jacobian;
  exports.b2Bound = b2Bound;
  exports.b2RevoluteJointDef = b2RevoluteJointDef;
  exports.b2PolyAndEdgeContact = b2PolyAndEdgeContact;
  exports.b2SimplexVertex = b2SimplexVertex;
  exports.b2WeldJoint = b2WeldJoint;
  exports.b2Collision = b2Collision;
  exports.b2Mat22 = b2Mat22;
  exports.b2SimplexCache = b2SimplexCache;
  exports.b2PolyAndCircleContact = b2PolyAndCircleContact;
  exports.b2MouseJointDef = b2MouseJointDef;
  exports.b2Shape = b2Shape;
  exports.b2Segment = b2Segment;
  exports.b2ContactRegister = b2ContactRegister;
  exports.b2DebugDraw = b2DebugDraw;
  exports.b2Sweep = b2Sweep
}
;

}};
__resources__["/__builtin__/libs/cocos2d/ActionManager.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    console = require('system').console,
    Timer = require('./Scheduler').Timer,
    Scheduler = require('./Scheduler').Scheduler;

var ActionManager = BObject.extend(/** @lends cocos.ActionManager# */{
    targets: null,
    currentTarget: null,
    currentTargetSalvaged: null,

    /**
     * <p>A singleton that manages all the actions. Normally you
     * won't need to use this singleton directly. 99% of the cases you will use the
     * cocos.nodes.Node interface, which uses this singleton. But there are some cases where
     * you might need to use this singleton. Examples:</p>
     *
     * <ul>
     * <li>When you want to run an action where the target is different from a cocos.nodes.Node</li>
     * <li>When you want to pause / resume the actions</li>
     * </ul>
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     */
    init: function () {
        ActionManager.superclass.init.call(this);

        Scheduler.get('sharedScheduler').scheduleUpdate({target: this, priority: 0, paused: false});
        this.targets = [];
    },

    /**
     * Adds an action with a target. If the target is already present, then the
     * action will be added to the existing target. If the target is not
     * present, a new instance of this target will be created either paused or
     * paused, and the action will be added to the newly created target. When
     * the target is paused, the queued actions won't be 'ticked'.
     *
     * @opt {cocos.nodes.Node} target Node to run the action on
     */
    addAction: function (opts) {

        var targetID = opts.target.get('id');
        var element = this.targets[targetID];

        if (!element) {
            element = this.targets[targetID] = {
                paused: false,
                target: opts.target,
                actions: []
            };
        }

        element.actions.push(opts.action);

        opts.action.startWithTarget(opts.target);
    },

    /**
     * Remove an action
     *
     * @param {cocos.actions.Action} action Action to remove
     */
    removeAction: function (action) {
        var targetID = action.originalTarget.get('id'),
            element = this.targets[targetID];

        if (!element) {
            return;
        }

        var actionIndex = element.actions.indexOf(action);

        if (actionIndex == -1) {
            return;
        }

        if (this.currentTarget == element) {
            element.currentActionSalvaged = true;
        } 
        
        element.actions[actionIndex] = null;
        element.actions.splice(actionIndex, 1); // Delete array item

        if (element.actions.length === 0) {
            if (this.currentTarget == element) {
                this.set('currentTargetSalvaged', true);
            }
        }
            
    },

    /**
     * Fetch an action belonging to a cocos.nodes.Node
     *
     * @returns {cocos.actions.Action}
     *
     * @opts {cocos.nodes.Node} target Target of the action
     * @opts {String} tag Tag of the action
     */
    getActionFromTarget: function(opts) {
        var tag = opts.tag,
            targetID = opts.target.get('id');

        var element = this.targets[targetID];
        if (!element) {
            return null;
        }
        for (var i = 0; i < element.actions.length; i++ ) {
            if (element.actions[i] && 
                (element.actions[i].get('tag') === tag)) {
                return element.actions[i];
            }
        }
        // Not found
        return null;
    },
     
    /**
     * Remove all actions for a cocos.nodes.Node
     *
     * @param {cocos.nodes.Node} target Node to remove all actions for
     */
    removeAllActionsFromTarget: function (target) {
        var targetID = target.get('id');

        var element = this.targets[targetID];
        if (!element) {
            return;
        }
        // Delete everything in array but don't replace it incase something else has a reference
        element.actions.splice(0, element.actions.length);
    },

    /**
     * @private
     */
    update: function (dt) {
        var self = this;
        util.each(this.targets, function (currentTarget, i) {

            if (!currentTarget) {
                return;
            }
            self.currentTarget = currentTarget;

            if (!currentTarget.paused) {
                util.each(currentTarget.actions, function (currentAction, j) {
                    if (!currentAction) {
                        return;
                    }

                    currentTarget.currentAction = currentAction;
                    currentTarget.currentActionSalvaged = false;

                    currentTarget.currentAction.step(dt);

                    if (currentTarget.currentAction.get('isDone')) {
                        currentTarget.currentAction.stop();

                        var a = currentTarget.currentAction;
                        currentTarget.currentAction = null;
                        self.removeAction(a);
                    }

                    currentTarget.currentAction = null;

                });
            }

            if (self.currentTargetSalvaged && currentTarget.actions.length === 0) {
                self.targets[i] = null;
                delete self.targets[i];
            }
        });
    },

    pauseTarget: function (target) {
    },

    resumeTarget: function (target) {
        // TODO
    }
});

util.extend(ActionManager, /** @lends cocos.ActionManager */{
    /**
     * Singleton instance of cocos.ActionManager
     * @getter sharedManager
     * @type cocos.ActionManager
     */
    get_sharedManager: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});

exports.ActionManager = ActionManager;

}};
__resources__["/__builtin__/libs/cocos2d/actions/Action.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    console = require('system').console,
    geo = require('geometry'),
    ccp = geo.ccp;

/** 
 * @memberOf cocos.actions
 * @class Base class for Actions
 * @extends BObject
 * @constructor
 */
var Action = BObject.extend(/** @lends cocos.actions.Action# */{
    /**
     * The Node the action is being performed on
     * @type cocos.nodes.Node
     */
    target: null,
    originalTarget: null,
    
    /**
     * Unique tag to identify the action
     * @type *
     */
    tag: null,
    
    /**
     * Called every frame with it's delta time.
     *
     * @param {Float} dt The delta time
     */
    step: function (dt) {
        window.console.warn("Action.step() Override me");
    },

    /**
     * Called once per frame.
     *
     * @param {Float} time How much of the animation has played. 0.0 = just started, 1.0 just finished.
     */
    update: function (time) {
        window.console.warn("Action.update() Override me");
    },

    /**
     * Called before the action start. It will also set the target.
     *
     * @param {cocos.nodes.Node} target The Node to run the action on
     */
    startWithTarget: function (target) {
        this.target = this.originalTarget = target;
    },

    /**
     * Called after the action has finished. It will set the 'target' to nil.
     * <strong>Important</strong>: You should never call cocos.actions.Action#stop manually.
     * Instead, use cocos.nodes.Node#stopAction(action)
     */
    stop: function () {
        this.target = null;
    },

    /**
     * @getter isDone
     * @type {Boolean} 
     */
    get_isDone: function (key) {
        return true;
    },


    /**
     * Returns a copy of this Action but in reverse
     *
     * @returns {cocos.actions.Action} A new Action in reverse
     */
    reverse: function () {
    }
});

var RepeatForever = Action.extend(/** @lends cocos.actions.RepeatForever# */{
    other: null,

    /**
     * @memberOf cocos.actions
     * @class Repeats an action forever. To repeat the an action for a limited
     * number of times use the cocos.Repeat action.
     * @extends cocos.actions.Action
     * @param {cocos.actions.Action} action An action to repeat forever
     * @constructs
     */
    init: function (action) {
        RepeatForever.superclass.init(this, action);

        this.other = action;
    },

    startWithTarget: function (target) {
        RepeatForever.superclass.startWithTarget.call(this, target);

        this.other.startWithTarget(this.target);
    },

    step: function (dt) {
        this.other.step(dt);
        if (this.other.get('isDone')) {
            var diff = dt - this.other.get('duration') - this.other.get('elapsed');
            this.other.startWithTarget(this.target);

            this.other.step(diff);
        }
    },

    get_isDone: function () {
        return false;
    },

    reverse: function () {
        return RepeatForever.create(this.other.reverse());
    },

    copy: function () {
        return RepeatForever.create(this.other.copy());
    }
});

var FiniteTimeAction = Action.extend(/** @lends cocos.actions.FiniteTimeAction# */{
    /**
     * Number of seconds to run the Action for
     * @type Float
     */
    duration: 2,

    /** 
     * Repeats an action a number of times. To repeat an action forever use the
     * cocos.RepeatForever action.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.Action
     */
    init: function () {
        FiniteTimeAction.superclass.init.call(this);
    },

    /** @ignore */
    reverse: function () {
        console.log('FiniteTimeAction.reverse() Override me');
    }
});

var Speed = Action.extend(/** @lends cocos.actions.Speed# */{
    other: null,
    
    /** 
     * speed of the inner function
     * @type Float
     */
    speed: 1.0,
    
    /** 
     * Changes the speed of an action, making it take longer (speed>1)
     * or less (speed<1) time.
     * Useful to simulate 'slow motion' or 'fast forward' effect.
     * @warning This action can't be Sequenceable because it is not an IntervalAction
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.Action
     */
    init: function(opts) {
        Speed.superclass.init.call(this, opts);
        
        this.other = opts.action;
        this.speed = opts.speed;
    },
    
    startWithTarget: function(target) {
        Speed.superclass.startWithTarget.call(this, target);
        this.other.startWithTarget(this.target);
    },
    
    setSpeed: function(speed) {
        this.speed = speed;
    },
    
    stop: function() {
        this.other.stop();
        Speed.superclass.stop.call(this);
    },
    
    step: function(dt) {
        this.other.step(dt * this.speed);
    },
    
    get_isDone: function() {
        return this.other.get_isDone();
    },
    
    copy: function() {
        return Speed.create({action: this.other.copy(), speed: this.speed});
    },
    
    reverse: function() {
        return Speed.create({action: this.other.reverse(), speed: this.speed});
    }
});

var Follow = Action.extend(/** @lends cocos.actions.Follow# */{
    /**
     * node to follow
     */
    followedNode: null,
    
    /**
     * whether camera should be limited to certain area
     * @type {Boolean}
     */
    boundarySet: false,
    
    /**
     * if screensize is bigger than the boundary - update not needed 
     * @type {Boolean}
     */
    boundaryFullyCovered: false,
    
    /**
     * fast access to the screen dimensions 
     * @type {geometry.Point}
     */
    halfScreenSize: null,
    fullScreenSize: null,
    
    /**
     * world boundaries
     * @type {Float}
     */
    leftBoundary: 0,
    rightBoundary: 0,
    topBoundary: 0,
    bottomBoundary: 0,
    
    /** 
     * @class Follow an action that "follows" a node.
     *
     * Eg:
     * layer.runAction(cocos.actions.Follow.create({target: hero}))
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.Action
     *
     * @opt {cocos.nodes.Node} target
     * @opt {geometry.Rect} worldBoundary
     */
    init: function(opts) {
        Follow.superclass.init.call(this, opts);
        
        this.followedNode = opts.target;
        
        var s = require('../Director').Director.get('sharedDirector').get('winSize');
        this.fullScreenSize = geo.ccp(s.width, s.height);
        this.halfScreenSize = geo.ccpMult(this.fullScreenSize, geo.ccp(0.5, 0.5));
        
        if (opts.worldBoundary !== undefined) {
            this.boundarySet = true;
            this.leftBoundary = -((opts.worldBoundary.origin.x + opts.worldBoundary.size.width) - this.fullScreenSize.x);
            this.rightBoundary = -opts.worldBoundary.origin.x;
            this.topBoundary = -opts.worldBoundary.origin.y;
            this.bottomBoundary = -((opts.worldBoundary.origin.y+opts.worldBoundary.size.height) - this.fullScreenSize.y);
            
            if (this.rightBoundary < this.leftBoundary) {
                // screen width is larger than world's boundary width
                //set both in the middle of the world
                this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2;
            }
            if (this.topBoundary < this.bottomBoundary)
            {
                // screen width is larger than world's boundary width
                //set both in the middle of the world
                this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2;
            }
            if ((this.topBoundary == this.bottomBoundary) && (this.leftBoundary == this.rightBoundary)) {
                this.boundaryFullyCovered = true;
            }
        }
    },
    
    step: function(dt) {
        if (this.boundarySet) {
            // whole map fits inside a single screen, no need to modify the position - unless map boundaries are increased
            if (this.boundaryFullyCovered) {
                return;
            }
            var tempPos = geo.ccpSub(this.halfScreenSize, this.followedNode.get('position'));
            this.target.set('position', ccp(
                Math.min(Math.max(tempPos.x, this.leftBoundary), this.rightBoundary),
                Math.min(Math.max(tempPos.y, this.bottomBoundary), this.topBoundary))
            );
        } else {
            this.target.set('position', geo.ccpSub(this.halfScreenSize, this.followedNode.get('position')));
        }
    },
    
    get_isDone: function() {
        return !this.followedNode.get('isRunning');
    }
});


exports.Action = Action;
exports.RepeatForever = RepeatForever;
exports.FiniteTimeAction = FiniteTimeAction;
exports.Speed = Speed;
exports.Follow = Follow;

}};
__resources__["/__builtin__/libs/cocos2d/actions/ActionEase.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    ActionInterval = require('./ActionInterval').ActionInterval,
    geo = require('geometry'),
    ccp = geo.ccp;

var ActionEase = ActionInterval.extend(/** @lends cocos.actions.ActionEase# */{
    other: null,
    
    /**
     * @class Base class for Easing actions
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {cocos.actions.ActionInterval} action
     */
    init: function(opts) {
        if (!opts.action) {
            throw "Ease: action argument must be non-nil";
        }
        ActionEase.superclass.init.call(this, {duration: opts.action.duration});
        
        this.other = opts.action;
    },
    
    startWithTarget: function(target) {
        ActionEase.superclass.startWithTarget.call(this, target);
        this.other.startWithTarget(this.target);
    },
    
    stop: function() {
        this.other.stop();
        ActionEase.superclass.stop.call(this);
    },
    /*
    update: function(t) {
        this.other.update(t);
    },
    */
    copy: function() {
        return ActionEase.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return ActionEase.create({action: this.other.reverse()});
    }
});

var EaseRate = ActionEase.extend(/** @lends cocos.actions.EaseRate# */{
    /**
     * rate value for the actions 
     * @type {Float} 
     */
    rate: 0,
    
    /**
    * @class Base class for Easing actions with rate parameter
    *
    * @memberOf cocos.actions
    * @constructs
    * @extends cocos.actions.ActionEase
    *
    * @opt {cocos.actions.ActionInterval} action
    * @opt {Float} rate
    */
    init: function(opts) {
        EaseRate.superclass.init.call(this, opts);

        this.rate = opts.rate;
    },
    
    copy: function() {
        return EaseRate.create({action: this.other.copy(), rate: this.rate});
    },
    
    reverse: function() {
        return EaseRate.create({action: this.other.reverse(), rate: 1 / this.rate});
    }
});

/**
 * @class EaseIn action with a rate
 */
var EaseIn = EaseRate.extend(/** @lends cocos.actions.EaseIn# */{
    update: function(t) {
        this.other.update(Math.pow(t, this.rate));
    },
    
    copy: function() {
        return EaseIn.create({action: this.other.copy(), rate: this.rate});
    },
    
    reverse: function() {
        return EaseIn.create({action: this.other.reverse(), rate: 1 / this.rate});
    }
});

/**
 * @class EaseOut action with a rate
 */
var EaseOut = EaseRate.extend(/** @lends cocos.actions.EaseOut# */{
    update: function(t) {
        this.other.update(Math.pow(t, 1/this.rate));
    },
    
    copy: function() {
        return EaseOut.create({action: this.other.copy(), rate: this.rate});
    },
    
    reverse: function() {
        return EaseOut.create({action: this.other.reverse(), rate: 1 / this.rate});
    }
});

/**
 * @class EaseInOut action with a rate
 */
var EaseInOut = EaseRate.extend(/** @lends cocos.actions.EaseInOut# */{
    update: function(t) {
        var sign = 1;
        var r = Math.floor(this.rate);
        if (r % 2 == 0) {
            sign = -1;
        }
        t *= 2;
        if (t < 1) {
            this.other.update(0.5 * Math.pow(t, this.rate));
        } else {
            this.other.update(sign * 0.5 * (Math.pow(t-2, this.rate) + sign * 2));
        }
    },
    
    copy: function() {
        return EaseInOut.create({action: this.other.copy(), rate: this.rate});
    },
    
    reverse: function() {
        return EaseInOut.create({action: this.other.reverse(), rate: this.rate});
    }
});

/**
 * @class EaseExponentialIn action
 */
var EaseExponentialIn = ActionEase.extend(/** @lends cocos.actions.EaseExponentialIn# */{
    update: function(t) {
        this.other.update((t == 0) ? 0 : (Math.pow(2, 10 * (t/1 - 1)) - 1 * 0.001));
    },
    
    copy: function() {
        return EaseExponentialIn.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseExponentialOut.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseExponentialOut action
 */
var EaseExponentialOut = ActionEase.extend(/** @lends cocos.actions.EaseExponentialOut# */{
    update: function(t) {
        this.other.update((t == 1) ? 1 : (-Math.pow(2, -10 * t/1) + 1));
    },
    
    copy: function() {
        return EaseExponentialOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseExponentialIn.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseExponentialInOut action
 */
var EaseExponentialInOut = ActionEase.extend(/** @lends cocos.actions.EaseExponentialInOut# */{
    update: function(t) {
        t /= 0.5;
        if (t < 1) {
            t = 0.5 * Math.pow(2, 10 * (t - 1));
        } else {
            t = 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
        }
        this.other.update(t);
    },
    
    copy: function() {
        return EaseExponentialInOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return EaseExponentialInOut.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseSineIn action
 */
var EaseSineIn = ActionEase.extend(/** @lends cocos.actions.EaseSineIn# */{
    update: function(t) {
        this.other.update(-1 * Math.cos(t * Math.PI_2) + 1);
    },
    
    copy: function() {
        return EaseSineIn.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseSineOut.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseSineOut action
 */
var EaseSineOut = ActionEase.extend(/** @lends cocos.actions.EaseSineOut# */{
    update: function(t) {
        this.other.update(Math.sin(t * Math.PI_2));
    },
    
    copy: function() {
        return EaseSineOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseSineIn.create({action: this.other.reverse()});
    }
});

/**
 * @class EaseSineInOut action
 */
var EaseSineInOut = ActionEase.extend(/** @lends cocos.actions.EaseSineInOut# */{
    update: function(t) {
        this.other.update(-0.5 * (Math.cos(t * Math.PI) - 1));
    },
    
    copy: function() {
        return EaseSineInOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return EaseSineInOut.create({action: this.other.reverse()});
    }
});

var EaseElastic = ActionEase.extend(/** @lends cocos.actions.EaseElastic# */{
    /**
    * period of the wave in radians. default is 0.3
    * @type {Float}
    */
    period: 0.3,

    /**
    * @class EaseElastic Ease Elastic abstract class
    *
    * @memberOf cocos.actions
    * @constructs
    * @extends cocos.actions.ActionEase
    *
    * @opt {cocos.actions.ActionInterval} action
    * @opt {Float} period
    */
    init: function(opts) {
        EaseElastic.superclass.init.call(this, {action: opts.action});

        if (opts.period !== undefined) {
            this.period = opts.period;
        }
    },

    copy: function() {
        return EaseElastic.create({action: this.other.copy(), period: this.period});
    },

    reverse: function() {
        window.console.warn("EaseElastic reverse(): Override me");
        return null;
    }
});

var EaseElasticIn = EaseElastic.extend(/** @lends cocos.actions.EaseElasticIn# */{
    /** 
     * @class EaseElasticIn Ease Elastic In action
     */
    update: function(t) {
        var newT = 0;
        if (t == 0 || t == 1) {
            newT = t;
        } else {
            var s = this.period / 4;
            t -= 1;
            newT = -Math.pow(2, 10 * t) * Math.sin((t - s) * Math.PI*2 / this.period);
        }
        this.other.update(newT);
    },
    
    // Wish we could use base class's copy
    copy: function() {
        return EaseElasticIn.create({action: this.other.copy(), period: this.period});
    },
    
    reverse: function() {
        return exports.EaseElasticOut.create({action: this.other.reverse(), period: this.period});
    }
});

var EaseElasticOut = EaseElastic.extend(/** @lends cocos.actions.EaseElasticOut# */{
    /** 
     * @class EaseElasticOut Ease Elastic Out action
     */
    update: function(t) {
        var newT = 0;
        if (t == 0 || t == 1) {
            newT = t;
        } else {
            var s = this.period / 4;
            newT = Math.pow(2, -10 * t) * Math.sin((t - s) * Math.PI*2 / this.period) + 1;
        }
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseElasticOut.create({action: this.other.copy(), period: this.period});
    },
    
    reverse: function() {
        return exports.EaseElasticIn.create({action: this.other.reverse(), period: this.period});
    }
});

var EaseElasticInOut = EaseElastic.extend(/** @lends cocos.actions.EaseElasticInOut# */{
    /** 
     * @class EaseElasticInOut Ease Elastic InOut action
     */
    update: function(t) {
        var newT = 0;
        if (t == 0 || t == 1) {
            newT = t;
        } else {
            t *= 2;
            if (this.period == 0) {
                this.period = 0.3 * 1.5;
            }
            var s = this.period / 4;
            
            t -= 1;
            if (t < 0) {
                newT = -0.5 * Math.pow(2, 10 * t) * Math.sin((t - s) * Math.PI*2 / this.period);
            } else {
                newT = Math.pow(2, -10 * t) * Math.sin((t - s) * Math.PI*2 / this.period) * 0.5 + 1;
            }
        }
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseElasticInOut.create({action: this.other.copy(), period: this.period});
    },
    
    reverse: function() {
        return EaseElasticInOut.create({action: this.other.reverse(), period: this.period});
    }
});

var EaseBounce = ActionEase.extend(/** @lends cocos.actions.EaseBounce# */{
    /** 
     * @class EaseBounce abstract class
     */
    bounceTime: function(t) {
        // Direct cut & paste from CCActionEase.m, obviously.
        // Glad someone else figured out all this math...
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        }
        else if (t < 2 / 2.75) {
            t -= 1.5 / 2.75;
            return 7.5625 * t * t + 0.75;
        }
        else if (t < 2.5 / 2.75) {
            t -= 2.25 / 2.75;
            return 7.5625 * t * t + 0.9375;
        }

        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    }
});

var EaseBounceIn = EaseBounce.extend(/** @lends cocos.actions.EaseBounceIn# */{
    /** 
     * @class EaseBounceIn EaseBounceIn action
     */
    update: function(t) {
        var newT = 1 - this.bounceTime(1-t);
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseBounceIn.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseBounceOut.create({action: this.other.reverse()});
    }
});

var EaseBounceOut = EaseBounce.extend(/** @lends cocos.actions.EaseBounceOut# */{
    /** 
     * @class EaseBounceOut EaseBounceOut action
     */
    update: function(t) {
        var newT = this.bounceTime(t);
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseBounceOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseBounceIn.create({action: this.other.reverse()});
    }
});

var EaseBounceInOut = EaseBounce.extend(/** @lends cocos.actions.EaseBounceInOut# */{
    /** 
     * @class EaseBounceInOut EaseBounceInOut action
     */
    update: function(t) {
        var newT = 0;
        if (t < 0.5) {
            t *= 2;
            newT = (1 - this.bounceTime(1 - t)) * 0.5;
        } else {
            newT = this.bounceTime(t * 2 - 1) * 0.5 + 0.5;
        }
        this.other.update(newT);
    },
    
    copy: function() {
        return EaseBounceInOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return EaseBounceInOut.create({action: this.other.reverse()});
    }
});

var EaseBackIn = ActionEase.extend(/** @lends cocos.actions.EaseBackIn# */{
    /** 
     * @class EaseBackIn EaseBackIn action
     */
    update: function(t) {
        var overshoot = 1.70158;
        this.other.update(t * t * ((overshoot + 1) * t - overshoot));
    },
    
    copy: function() {
        return EaseBackIn.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseBackOut.create({action: this.other.reverse()});
    }
});

var EaseBackOut = ActionEase.extend(/** @lends cocos.actions.EaseBackOut# */{
    /** 
     * @class EaseBackOut EaseBackOut action
     */
    update: function(t) {
        var overshoot = 1.70158;
        t -= 1;
        this.other.update(t * t * ((overshoot + 1) * t + overshoot) + 1);
    },
    
    copy: function() {
        return EaseBackOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return exports.EaseBackIn.create({action: this.other.reverse()});
    }
});

var EaseBackInOut = ActionEase.extend(/** @lends cocos.actions.EaseBackInOut# */{
    /** 
     * @class EaseBackInOut EaseBackInOut action
     */
    update: function(t) {
        // Where do these constants come from?
        var overshoot = 1.70158 * 1.525;
        t *= 2;
        if (t < 1) {
            this.other.update((t * t * ((overshoot + 1) * t - overshoot)) / 2);
        } else {
            t -= 2;
            this.other.update((t * t * ((overshoot + 1) * t + overshoot)) / 2 + 1);
        }
    },
    
    copy: function() {
        return EaseBackInOut.create({action: this.other.copy()});
    },
    
    reverse: function() {
        return EaseBackInOut.create({action: this.other.reverse()});
    }
});

exports.ActionEase = ActionEase;
exports.EaseRate = EaseRate;
exports.EaseIn = EaseIn;
exports.EaseOut = EaseOut;
exports.EaseInOut = EaseInOut;
exports.EaseExponentialIn = EaseExponentialIn;
exports.EaseExponentialOut = EaseExponentialOut;
exports.EaseExponentialInOut = EaseExponentialInOut;
exports.EaseSineIn = EaseSineIn;
exports.EaseSineOut = EaseSineOut;
exports.EaseSineInOut = EaseSineInOut;
exports.EaseElastic = EaseElastic;
exports.EaseElasticIn = EaseElasticIn;
exports.EaseElasticOut = EaseElasticOut;
exports.EaseElasticInOut = EaseElasticInOut;
exports.EaseBounce = EaseBounce;
exports.EaseBounceIn = EaseBounceIn;
exports.EaseBounceOut = EaseBounceOut;
exports.EaseBounceInOut = EaseBounceInOut;
exports.EaseBackIn = EaseBackIn;
exports.EaseBackOut = EaseBackOut;
exports.EaseBackInOut = EaseBackInOut;


}};
__resources__["/__builtin__/libs/cocos2d/actions/ActionInstant.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    act = require('./Action'),
    ccp = require('geometry').ccp;

var ActionInstant = act.FiniteTimeAction.extend(/** @lends cocos.actions.ActionInstant */{
    /**
     * @class Base class for actions that triggers instantly. They have no duration.
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.FiniteTimeAction
     * @constructs
     */
    init: function (opts) {
        ActionInstant.superclass.init.call(this, opts);

        this.duration = 0;
    },
    
    get_isDone: function () {
        return true;
    },
    
    step: function (dt) {
        this.update(1);
    },
    
    update: function (t) {
        // ignore
    },
    
    copy: function() {
        return this;
    },
    
    reverse: function () {
        return this.copy();
    }
});

var Show = ActionInstant.extend(/** @lends cocos.actions.Show# */{
    /** 
    * @class Show Show the node
    **/
    startWithTarget: function(target) {
        Show.superclass.startWithTarget.call(this, target);
        this.target.set('visible', true);
    },

    copy: function() {
        return Show.create();
    },
    
    reverse: function() {
        return exports.Hide.create();
    }
});

var Hide = ActionInstant.extend(/** @lends cocos.actions.Hide# */{
    /** 
    * @class Hide Hide the node
    **/
    startWithTarget: function(target) {
        Show.superclass.startWithTarget.call(this, target);
        this.target.set('visible', false);
    },

    copy: function() {
        return Hide.create();
    },
    
    reverse: function() {
        return exports.Show.create();
    }
});

var ToggleVisibility = ActionInstant.extend(/** @lends cocos.actions.ToggleVisibility# */{
    /** 
    * @class ToggleVisibility Toggles the visibility of a node
    **/
    startWithTarget: function(target) {
        ToggleVisibility.superclass.startWithTarget.call(this, target);
        var vis = this.target.get('visible');
        this.target.set('visible', !vis);
    },
    
    copy: function() {
        return ToggleVisibility.create();
    }
});

var FlipX = ActionInstant.extend(/** @lends cocos.actions.FlipX# */{
    flipX: false,

    /**
     * @class FlipX Flips a sprite horizontally
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {Boolean} flipX Should the sprite be flipped
     */
    init: function (opts) {
        FlipX.superclass.init.call(this, opts);

        this.flipX = opts.flipX;
    },
    
    startWithTarget: function (target) {
        FlipX.superclass.startWithTarget.call(this, target);

        target.set('flipX', this.flipX);
    },
    
    reverse: function () {
        return FlipX.create({flipX: !this.flipX});
    },
    
    copy: function () {
        return FlipX.create({flipX: this.flipX});
    }
});

var FlipY = ActionInstant.extend(/** @lends cocos.actions.FlipY# */{
    flipY: false,

    /**
     * @class FlipY Flips a sprite vertically
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {Boolean} flipY Should the sprite be flipped
     */
    init: function (opts) {
        FlipY.superclass.init.call(this, opts);

        this.flipY = opts.flipY;
    },
    
    startWithTarget: function (target) {
        FlipY.superclass.startWithTarget.call(this, target);

        target.set('flipY', this.flipY);
    },
    
    reverse: function () {
        return FlipY.create({flipY: !this.flipY});
    },
    
    copy: function () {
        return FlipY.create({flipY: this.flipY});
    }
});

var Place = ActionInstant.extend(/** @lends cocos.actions.Place# */{
    position: null,
    
    /**
	 * @class Place Places the node in a certain position
	 *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {geometry.Point} position
     */
    init: function(opts) {
        Place.superclass.init.call(this, opts);
        this.set('position', util.copy(opts.position));
    },
    
    startWithTarget: function(target) {
        Place.superclass.startWithTarget.call(this, target);
        this.target.set('position', this.position);
    },
    
    copy: function() {
        return Place.create({position: this.position});
    }
});

var CallFunc = ActionInstant.extend(/** @lends cocos.actions.CallFunc# */{
	callback: null,
    target: null,
    method: null,
    
	/**
	 * @class CallFunc Calls a 'callback'
	 *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {BObject} target
     * @opt {String|Function} method
     */
	init: function(opts) {
		CallFunc.superclass.init.call(this, opts);
		
		// Save target & method so that copy() can recreate callback
		this.target = opts.target;
		this.method = opts.method;
		this.callback = util.callback(this.target, this.method);
	},
	
	startWithTarget: function(target) {
		CallFunc.superclass.startWithTarget.call(this, target);
		this.execute(target);
	},
	
	execute: function(target) {
	    // Pass target to callback
		this.callback.call(this, target);
	},
	
	copy: function() {
	    return CallFunc.create({target: this.target, method: this.method});
	}
});

exports.ActionInstant = ActionInstant;
exports.Show = Show;
exports.Hide = Hide;
exports.ToggleVisibility = ToggleVisibility;
exports.FlipX = FlipX;
exports.FlipY = FlipY;
exports.Place = Place;
exports.CallFunc = CallFunc;


}};
__resources__["/__builtin__/libs/cocos2d/actions/ActionInterval.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    act = require('./Action'),
    geo = require('geometry'),
    ccp = geo.ccp;


var ActionInterval = act.FiniteTimeAction.extend(/** @lends cocos.actions.ActionInterval# */{
    /**
     * Number of seconds that have elapsed
     * @type Float
     */
    elapsed: 0.0,

    _firstTick: true,

    /**
     * Base class actions that do have a finite time duration.
     *
     * Possible actions:
     *
     * - An action with a duration of 0 seconds
     * - An action with a duration of 35.5 seconds Infinite time actions are valid
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.FiniteTimeAction
     *
     * @opt {Float} duration Number of seconds to run action for
     */
    init: function (opts) {
        ActionInterval.superclass.init.call(this, opts);

        var dur = opts.duration || 0;
        if (dur === 0) {
            dur = 0.0000001;
        }

        this.set('duration', dur);
        this.set('elapsed', 0);
        this._firstTick = true;
    },

    get_isDone: function () {
        return (this.elapsed >= this.duration);
    },

    step: function (dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }

        this.update(Math.min(1, this.elapsed / this.duration));
    },

    startWithTarget: function (target) {
        ActionInterval.superclass.startWithTarget.call(this, target);

        this.elapsed = 0.0;
        this._firstTick = true;
    },

    copy: function() {
        throw "copy() not implemented";
    },
    
    reverse: function () {
        throw "Reverse Action not implemented";
    }
});

var DelayTime = ActionInterval.extend(/** @lends cocos.actions.DelayTime# */{
    /**
     * @class DelayTime Delays the action a certain amount of seconds
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     */
    update: function (t) {
        if (t === 1.0) {
            this.stop();
        }
    },

    copy: function () {
        return DelayTime.create({duration: this.get('duration')});
    },

    reverse: function () {
        return DelayTime.create({duration: this.get('duration')});
    }
});


var ScaleTo = ActionInterval.extend(/** @lends cocos.actions.ScaleTo# */{
    /**
     * Current X Scale
     * @type Float
     */
    scaleX: 1,

    /**
     * Current Y Scale
     * @type Float
     */
    scaleY: 1,

    /**
     * Initial X Scale
     * @type Float
     */
    startScaleX: 1,

    /**
     * Initial Y Scale
     * @type Float
     */
    startScaleY: 1,

    /**
     * Final X Scale
     * @type Float
     */
    endScaleX: 1,

    /**
     * Final Y Scale
     * @type Float
     */
    endScaleY: 1,

    /**
     * Delta X Scale
     * @type Float
     * @private
     */
    deltaX: 0.0,

    /**
     * Delta Y Scale
     * @type Float
     * @private
     */
    deltaY: 0.0,

    /**
     * @class ScaleTo Scales a cocos.Node object to a zoom factor by modifying it's scale attribute.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {Float} [scale] Size to scale Node to
     * @opt {Float} [scaleX] Size to scale width of Node to
     * @opt {Float} [scaleY] Size to scale height of Node to
     */
    init: function (opts) {
        ScaleTo.superclass.init.call(this, opts);

        if (opts.scale !== undefined) {
            this.endScaleX = this.endScaleY = opts.scale;
        } else {
            this.endScaleX = opts.scaleX;
            this.endScaleY = opts.scaleY;
        }


    },

    startWithTarget: function (target) {
        ScaleTo.superclass.startWithTarget.call(this, target);

        this.startScaleX = this.target.get('scaleX');
        this.startScaleY = this.target.get('scaleY');
        this.deltaX = this.endScaleX - this.startScaleX;
        this.deltaY = this.endScaleY - this.startScaleY;
    },

    update: function (t) {
        if (!this.target) {
            return;
        }

        this.target.set('scaleX', this.startScaleX + this.deltaX * t);
        this.target.set('scaleY', this.startScaleY + this.deltaY * t);
    },

    copy: function () {
        return ScaleTo.create({duration: this.get('duration'),
                                 scaleX: this.get('endScaleX'),
                                 scaleY: this.get('endScaleY')});
    }
});

var ScaleBy = ScaleTo.extend(/** @lends cocos.actions.ScaleBy# */{
    /**
     * @class ScaleBy Scales a cocos.Node object to a zoom factor by modifying it's scale attribute.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ScaleTo
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {Float} [scale] Size to scale Node by
     * @opt {Float} [scaleX] Size to scale width of Node by
     * @opt {Float} [scaleY] Size to scale height of Node by
     */
    init: function (opts) {
        ScaleBy.superclass.init.call(this, opts);
    },

    startWithTarget: function (target) {
        ScaleBy.superclass.startWithTarget.call(this, target);

        this.deltaX = this.startScaleX * this.endScaleX - this.startScaleX;
        this.deltaY = this.startScaleY * this.endScaleY - this.startScaleY;
    },

    reverse: function () {
        return ScaleBy.create({duration: this.get('duration'), scaleX: 1 / this.endScaleX, scaleY: 1 / this.endScaleY});
    }
});


var RotateTo = ActionInterval.extend(/** @lends cocos.actions.RotateTo# */{
    /**
     * Final angle
     * @type Float
     */
    dstAngle: 0,

    /**
     * Initial angle
     * @type Float
     */
    startAngle: 0,

    /**
     * Angle delta
     * @type Float
     */
    diffAngle: 0,

    /**
     * @class RotateTo Rotates a cocos.Node object to a certain angle by modifying its rotation
     * attribute. The direction will be decided by the shortest angle.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {Float} angle Angle in degrees to rotate to
     */
    init: function (opts) {
        RotateTo.superclass.init.call(this, opts);

        this.dstAngle = opts.angle;
    },

    startWithTarget: function (target) {
        RotateTo.superclass.startWithTarget.call(this, target);

        this.startAngle = target.get('rotation');

        if (this.startAngle > 0) {
            this.startAngle = (this.startAngle % 360);
        } else {
            this.startAngle = (this.startAngle % -360);
        }

        this.diffAngle = this.dstAngle - this.startAngle;
        if (this.diffAngle > 180) {
            this.diffAngle -= 360;
        } else if (this.diffAngle < -180) {
            this.diffAngle += 360;
        }
    },

    update: function (t) {
        this.target.set('rotation', this.startAngle + this.diffAngle * t);
    },

    copy: function () {
        return RotateTo.create({duration: this.get('duration'), angle: this.get('dstAngle')});
    }
});

var RotateBy = RotateTo.extend(/** @lends cocos.actions.RotateBy# */{
    /**
     * Number of degrees to rotate by
     * @type Float
     */
    angle: 0,

    /**
     * @class RotateBy Rotates a cocos.Node object to a certain angle by modifying its rotation
     * attribute. The direction will be decided by the shortest angle.
     *
     * @memberOf cocos.action
     * @constructs
     * @extends cocos.actions.RotateTo
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {Float} angle Angle in degrees to rotate by
     */
    init: function (opts) {
        RotateBy.superclass.init.call(this, opts);

        this.angle = opts.angle;
    },

    startWithTarget: function (target) {
        RotateBy.superclass.startWithTarget.call(this, target);

        this.startAngle = this.target.get('rotation');
    },

    update: function (t) {
        this.target.set('rotation', this.startAngle + this.angle * t);
    },

    copy: function () {
        return RotateBy.create({duration: this.get('duration'), angle: this.angle});
    },
    
    reverse: function () {
        return RotateBy.create({duration: this.get('duration'), angle: -this.angle});
    }
});

var MoveTo = ActionInterval.extend(/** @lends cocos.actions.MoveTo# */{
    delta: null,
    startPosition: null,
    endPosition: null,

    /**
     * @class MoveTo Animates moving a cocos.nodes.Node object to a another point.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {geometry.Point} position Destination position
     */
    init: function (opts) {
        MoveTo.superclass.init.call(this, opts);

        this.set('endPosition', util.copy(opts.position));
    },

    startWithTarget: function (target) {
        MoveTo.superclass.startWithTarget.call(this, target);

        this.set('startPosition', util.copy(target.get('position')));
        this.set('delta', geo.ccpSub(this.get('endPosition'), this.get('startPosition')));
    },

    update: function (t) {
        var startPosition = this.get('startPosition'),
            delta = this.get('delta');
        this.target.set('position', ccp(startPosition.x + delta.x * t, startPosition.y + delta.y * t));
    },
    
    copy: function() {
        return MoveTo.create({duration: this.get('duration'), position: this.get('endPosition')});
    }
});

var MoveBy = MoveTo.extend(/** @lends cocos.actions.MoveBy# */{
    /**
     * @class MoveBy Animates moving a cocos.node.Node object by a given number of pixels
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.MoveTo
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {geometry.Point} position Number of pixels to move by
     */
    init: function (opts) {
        MoveBy.superclass.init.call(this, opts);

        this.set('delta', util.copy(opts.position));
    },

    startWithTarget: function (target) {
        var dTmp = this.get('delta');
        MoveBy.superclass.startWithTarget.call(this, target);
        this.set('delta', dTmp);
    },
    
    copy: function() {
         return MoveBy.create({duration: this.get('duration'), position: this.get('delta')});
    },
    
    reverse: function() {
        var delta = this.get('delta');
        return MoveBy.create({duration: this.get('duration'), position: geo.ccp(-delta.x, -delta.y)});
    }
});

var JumpBy = ActionInterval.extend(/** @lends cocos.actions.JumpBy# */{
    /**
     * Number of pixels to jump by
     * @type geometry.Point
     */
    delta: null,
    
    /**
     * Height of jump
     * @type Float
     */
    height: 0,
    
    /**
     * Number of times to jump
     * @type Integer
     */
    jumps: 0,
    
    /**
     * Starting point
     * @type geometry.Point
     */
    startPosition: null,
    
    /**
     * @class JumpBy Moves a CCNode object simulating a parabolic jump movement by modifying it's position attribute.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {geometry.Point} startPosition Point at which jump starts
     * @opt {geometry.Point} delta Number of pixels to jump by
     * @opt {Float} height Height of jump
     * @opt {Int} jumps Number of times to repeat
     */
    init: function(opts) {
        JumpBy.superclass.init.call(this, opts);
        
        this.delta  = util.copy(opts.delta);
        this.height = opts.height;
        this.jumps  = opts.jumps;
    },
    
    copy: function() {
        return JumpBy.create({duration: this.duration, 
                                 delta: this.delta,
                                height: this.height,
                                 jumps: this.jumps});
    },
    
    startWithTarget: function(target) {
        JumpBy.superclass.startWithTarget.call(this, target);
        this.set('startPosition', target.get('position'));
    },
    
    update: function(t) {
        // parabolic jump
        var frac = (t * this.jumps) % 1.0;
        var y = this.height * 4 * frac * (1 - frac);
        y += this.delta.y * t;
        var x = this.delta.x * t;
        this.target.set('position', geo.ccp(this.startPosition.x + x, this.startPosition.y + y));
    },
    
    reverse: function() {
        return JumpBy.create({duration: this.duration,
                                 delta: geo.ccp(-this.delta.x, -this.delta.y),
                                height: this.height,
                                 jumps: this.jumps});
    }
});

var JumpTo = JumpBy.extend(/** @lends cocos.actions.JumpTo# */{
    /**
     * @class JumpTo Moves a Node object to a parabolic position simulating a jump 
     * movement by modifying it's position attribute.
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.JumpBy
     */
    startWithTarget: function(target) {
        JumpTo.superclass.startWithTarget.call(this, target);
        this.delta = geo.ccp(this.delta.x - this.startPosition.x, this.delta.y - this.startPosition.y);
    }
});

var BezierBy = ActionInterval.extend(/** @lends cocos.actions.BezierBy# */{
    /**
     * @type {geometry.BezierConfig}
     */
    config: null,
    
    startPosition: null,
    
    /**
     * @class BezierBy An action that moves the target with a cubic Bezier curve by a certain distance.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opts {geometry.BezierConfig} bezier Bezier control points object
     * @opts {Float} duration
     */
    init: function(opts) {
        BezierBy.superclass.init.call(this, opts);
        
        this.config = util.copy(opts.bezier);
    },
    
    startWithTarget: function(target) {
        BezierBy.superclass.startWithTarget.call(this, target);
        this.set('startPosition', this.target.get('position'));
    },
    
    update: function(t) {
        var c = this.get('config');
        var xa = 0,
            xb = c.controlPoint1.x,
            xc = c.controlPoint2.x,
            xd = c.endPosition.x,
            ya = 0,
            yb = c.controlPoint1.y,
            yc = c.controlPoint2.y,
            yd = c.endPosition.y;
        
        var x = BezierBy.bezierat(xa, xb, xc, xd, t);
        var y = BezierBy.bezierat(ya, yb, yc, yd, t);
        
        this.target.set('position', geo.ccpAdd(this.get('startPosition'), geo.ccp(x, y)));
    },
    
    copy: function() {
        return BezierBy.create({bezier: this.get('config'), duration: this.get('duration')});
    },
    
    reverse: function() {
        var c = this.get('config'),
            bc = new geo.BezierConfig();
            
        bc.endPosition = geo.ccpNeg(c.endPosition);
        bc.controlPoint1 = geo.ccpAdd(c.controlPoint2, geo.ccpNeg(c.endPosition));
        bc.controlPoint2 = geo.ccpAdd(c.controlPoint1, geo.ccpNeg(c.endPosition));
        
        return BezierBy.create({bezier: bc, duration: this.get('duration')});
    }
});

util.extend(BezierBy, {
    /**
     * Bezier cubic formula
     * ((1 - t) + t)3 = 1 
     */
    bezierat: function(a, b, c, d, t) {
       return Math.pow(1-t, 3) * a + 
            3 * t * Math.pow(1-t, 2) * b +
            3 * Math.pow(t, 2) * (1 - t) * c +
            Math.pow(t, 3) * d;
    }
});

var BezierTo = BezierBy.extend(/** @lends cocos.actions.BezierTo# */{
    /**
     * @class BezierTo An action that moves the target with a cubic Bezier curve to a destination point.
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.BezierBy
     */
    startWithTarget: function(target) {
        BezierTo.superclass.startWithTarget.call(this, target);
        
        var c = this.get('config');
        c.controlPoint1 = geo.ccpSub(c.controlPoint1, this.get('startPosition'));
        c.controlPoint2 = geo.ccpSub(c.controlPoint2, this.get('startPosition'));
        c.endPosition = geo.ccpSub(c.endPosition, this.get('startPosition'));
    }
});

var Blink = ActionInterval.extend(/** @lends cocos.actions.Blink# */{
    /**
     * @type {Integer}
     */
    times: 1,
    
    /**
     * @class Blink Blinks a Node object by modifying it's visible attribute
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opts {Integer} blinks Number of times to blink
     * @opts {Float} duration
     */
    init: function(opts) {
        Blink.superclass.init.call(this, opts);
        this.times = opts.blinks;
    },
    
    update: function(t) {
        if (! this.get_isDone()) {
            var slice = 1 / this.times;
            var m = t % slice;
            this.target.set('visible', (m > slice/2));
        }
    },
    
    copy: function() {
        return Blink.create({duration: this.get('duration'), blinks: this.get('times')});
    },
    
    reverse: function() {
        return this.copy();
    }
});

var FadeOut = ActionInterval.extend(/** @lends cocos.actions.FadeOut# */{
   /**
    * @class FadeOut Fades out a cocos.nodes.Node to zero opacity
    *
    * @memberOf cocos.actions
    * @extends cocos.actions.ActionInterval
    */     
    update: function (t) {
        var target = this.get('target');
        if (!target) return;
        target.set('opacity', 255 - (255 * t));
    },

    copy: function () {
        return FadeOut.create({duration: this.get('duration')});
    },
    
    reverse: function () {
        return exports.FadeIn.create({duration: this.get('duration')});
    }
});


var FadeIn = ActionInterval.extend(/** @lends cocos.actions.FadeIn# */{
    /**
     * @class FadeIn Fades in a cocos.nodes.Node to 100% opacity
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInterval
     */
    update: function (t) {
        var target = this.get('target');
        if (!target) return;
        target.set('opacity', t * 255);
    },

    copy: function () {
        return FadeIn.create({duration: this.get('duration')});
    },
    
    reverse: function () {
        return exports.FadeOut.create({duration: this.get('duration')});
    }
});

var FadeTo = ActionInterval.extend(/** @lends cocos.actions.FadeTo# */{
    /**
     * The final opacity
     * @type Float
     */
    toOpacity: null,

    /**
     * The initial opacity
     * @type Float
     */
    fromOpacity: null,

    /**
     * @class FadeTo Fades a cocos.nodes.Node to a given opacity
     *
     * @memberOf cocos.actions
     * @constructor
     * @extends cocos.actions.ActionInterval
     */
    init: function (opts) {
        FadeTo.superclass.init.call(this, opts);
        this.set('toOpacity', opts.toOpacity);
    },

    startWithTarget: function (target) {
        FadeTo.superclass.startWithTarget.call(this, target);
        this.set('fromOpacity', this.target.get('opacity'));
    },

    update: function (t) {
        var target = this.get('target');
        if (!target) return;

        target.set('opacity', this.fromOpacity + ( this.toOpacity - this.fromOpacity ) * t);
    },
    
    copy: function() {
        return FadeTo.create({duration: this.get('duration'), toOpacity: this.get('toOpacity')});
    }
});

var Sequence = ActionInterval.extend(/** @lends cocos.actions.Sequence# */{
    /**
     * Array of actions to run
     * @type cocos.nodes.Node[]
     */
    actions: null,

    split: 0,
    last: 0,
    
    /**
     * Runs a pair of actions sequentially, one after another
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {cocos.actions.FiniteTimeAction} one 1st action to run
     * @opt {cocos.actions.FiniteTimeAction} two 2nd action to run
     */
    init: function (opts) {
        if (!opts.one) {
            throw "Sequence argument one must be non-nil";
        }
        if (!opts.two) {
            throw "Sequence argument two must be non-nil";
        }
        this.actions = [];
        
        var d = opts.one.get('duration') + opts.two.get('duration');
        
        Sequence.superclass.init.call(this, {duration: d});
        
        this.actions[0] = opts.one;
        this.actions[1] = opts.two;
    },
    
    startWithTarget: function (target) {
        Sequence.superclass.startWithTarget.call(this, target);
        this.split = this.actions[0].get('duration') / this.get('duration');
        this.last = -1;
    },

    stop: function () {
        this.actions[0].stop();
        this.actions[1].stop();
        Sequence.superclass.stop.call(this);
    },

    update: function (t) {
        // This is confusing but will hopefully work better in conjunction
        // with modifer actions like Repeat & Spawn...
        var found = 0;
        var new_t = 0;
        
        if (t >= this.split) {
            found = 1;
            if (this.split == 1) {
                new_t = 1;
            } else {
                new_t = (t - this.split) / (1 - this.split);
            }
        } else {
            found = 0;
            if (this.split != 0) {
                new_t = t / this.split;
            } else {
                new_t = 1;
            }
        }
        if (this.last == -1 && found == 1) {
            this.actions[0].startWithTarget(this.target);
            this.actions[0].update(1);
            this.actions[0].stop();
        }
        if (this.last != found) {
            if (this.last != -1) {
                this.actions[this.last].update(1);
                this.actions[this.last].stop();
            }
            this.actions[found].startWithTarget(this.target);
        }
        this.actions[found].update(new_t);
        this.last = found;
    },

    copy: function () {
        // Constructor will copy actions 
        return Sequence.create({actions: this.get('actions')});
    },

    reverse: function() {
        return Sequence.create({actions: [this.actions[1].reverse(), this.actions[0].reverse()]});
    }
});

util.extend(Sequence, {
    /** 
     * Override BObject.create in order to implement recursive construction
     * of actions array
     */
    create: function() {
        // Don't copy actions array, copy the actions
        var actions = arguments[0].actions;
        var prev = actions[0].copy();
        
        // Recursively create Sequence with pair of actions
        for (var i=1; i<actions.length; i++) {
            var now = actions[i].copy();
            if (now) {
                prev = this.initFromPair(prev, now);
            } else {
                break;
            }
        }
        return prev;
    },
    
    /** 
     * Create sequence object from a pair of actions
     */
    initFromPair: function(a1, a2) {
        var ret = new this();
        ret.init.apply(ret, [{one: a1, two: a2}]);
        return ret;
    }
});

var Repeat = ActionInterval.extend(/** @lends cocos.actions.Repeat# */{
    times: 1,
    total: 0,
    other: null,
    
    /**
     * @class Repeat Repeats an action a number of times.
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {cocos.actions.FiniteTimeAction} action Action to repeat
     * @opt {Number} times Number of times to repeat
     */
     init: function(opts) {
         var d = opts.action.get('duration') * opts.times;

         Repeat.superclass.init.call(this, {duration: d});
         
         this.times = opts.times;
         this.other = opts.action.copy();
         this.total = 0;
     },
     
     startWithTarget: function(target) {
         this.total = 0;
         Repeat.superclass.startWithTarget.call(this, target);
         this.other.startWithTarget(target);
     },
     
     stop: function() {
         this.other.stop();
         Repeat.superclass.stop.call(this);
     },
     
     update: function(dt) {
         var t = dt * this.times;
         
         if (t > (this.total+1)) {
             this.other.update(1);
             this.total += 1;
             this.other.stop();
             this.other.startWithTarget(this.target);
             
             // If repeat is over
             if (this.total == this.times) {
                 // set it in the original position
                 this.other.update(0);
             } else {
                 // otherwise start next repeat
                 this.other.update(t - this.total);
             }
         } else {
             var r = t % 1.0;
             
             // fix last repeat position otherwise it could be 0
             if (dt == 1) {
                 r = 1;
                 this.total += 1;
             }
             this.other.update(Math.min(r, 1));
         }
     },
     
     get_isDone: function() {
         return this.total == this.times;
     },
     
     copy: function() {
         // Constructor copies action
         return Repeat.create({action: this.other, times: this.times});
     },
     
     reverse: function() {
         return Repeat.create({action: this.other.reverse(), times: this.times});
     }
});

var Spawn = ActionInterval.extend(/** @lends cocos.actions.Spawn# */{
    one: null,
    two: null,

    /**
     * @class Spawn Executes multiple actions simultaneously
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {cocos.actions.FiniteTimeAction} one: first action to spawn
     * @opt {cocos.actions.FiniteTimeAction} two: second action to spawn
     */
    init: function (opts) {
        var action1 = opts.one, 
            action2 = opts.two;
            
        if (!action1 || !action2) {
            throw "cocos.actions.Spawn: required actions missing";
        }
        var d1 = action1.get('duration'), 
            d2 = action2.get('duration');
        
        Spawn.superclass.init.call(this, {duration: Math.max(d1, d2)});
        
        this.set('one', action1);
        this.set('two', action2);
        
        if (d1 > d2) {
            this.set('two', Sequence.create({actions: [
                action2, 
                DelayTime.create({duration: d1-d2})
            ]}));
        } else if (d1 < d2) {
            this.set('one', Sequence.create({actions: [
                action1,
                DelayTime.create({duration: d2-d1})
            ]}));
        }
    },
    
    startWithTarget: function (target) {
        Spawn.superclass.startWithTarget.call(this, target);
        this.get('one').startWithTarget(this.target);
        this.get('two').startWithTarget(this.target);
    },
    
    stop: function () {
        this.get('one').stop();
        this.get('two').stop();
        Spawn.superclass.stop.call(this);
    },
    
    step: function (dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }
        this.get('one').step(dt);
        this.get('two').step(dt);
    },
    
    update: function (t) {
        this.get('one').update(t);
        this.get('two').update(t);
    },
    
    copy: function () {
        return Spawn.create({one: this.get('one').copy(), two: this.get('two').copy()});
    },
    
    reverse: function () {
        return Spawn.create({one: this.get('one').reverse(), two: this.get('two').reverse()});
    }
});

util.extend(Spawn, {
    /**
     * Helper class function to create Spawn object from array of actions
     *
     * @opt {Array} actions: list of actions to run simultaneously
     */
    initWithActions: function (opts) {
        var now, prev = opts.actions.shift();
        while (opts.actions.length > 0) {
            now = opts.actions.shift();
            if (now) {
                prev = this.create({one: prev, two: now});
            } else {
                break;
            }
        }
        return prev;
    }
});

var Animate = ActionInterval.extend(/** @lends cocos.actions.Animate# */{
    animation: null,
    restoreOriginalFrame: true,
    origFrame: null,


    /**
     * Animates a sprite given the name of an Animation
     *
     * @memberOf cocos.actions
     * @constructs
     * @extends cocos.actions.ActionInterval
     *
     * @opt {Float} duration Number of seconds to run action for
     * @opt {cocos.Animation} animation Animation to run
     * @opt {Boolean} [restoreOriginalFrame=true] Return to first frame when finished
     */
    init: function (opts) {
        this.animation = opts.animation;
        this.restoreOriginalFrame = opts.restoreOriginalFrame !== false;
        opts.duration = this.animation.frames.length * this.animation.delay;

        Animate.superclass.init.call(this, opts);
    },

    startWithTarget: function (target) {
        Animate.superclass.startWithTarget.call(this, target);

        if (this.restoreOriginalFrame) {
            this.set('origFrame', this.target.get('displayedFrame'));
        }
    },

    stop: function () {
        if (this.target && this.restoreOriginalFrame) {
            var sprite = this.target;
            sprite.set('displayFrame', this.origFrame);
        }

        Animate.superclass.stop.call(this);
    },

    update: function (t) {
        var frames = this.animation.get('frames'),
            numberOfFrames = frames.length,
            idx = Math.floor(t * numberOfFrames);

        if (idx >= numberOfFrames) {
            idx = numberOfFrames - 1;
        }

        var sprite = this.target;
        if (!sprite.isFrameDisplayed(frames[idx])) {
            sprite.set('displayFrame', frames[idx]);
        }
    },

    copy: function () {
        return Animate.create({animation: this.animation, restoreOriginalFrame: this.restoreOriginalFrame});
    }

});

exports.ActionInterval = ActionInterval;
exports.DelayTime = DelayTime;
exports.ScaleTo = ScaleTo;
exports.ScaleBy = ScaleBy;
exports.RotateTo = RotateTo;
exports.RotateBy = RotateBy;
exports.MoveTo = MoveTo;
exports.MoveBy = MoveBy;
exports.JumpBy = JumpBy;
exports.JumpTo = JumpTo;
exports.BezierBy = BezierBy;
exports.BezierTo = BezierTo;
exports.Blink = Blink;
exports.FadeIn = FadeIn;
exports.FadeOut = FadeOut;
exports.FadeTo = FadeTo;
exports.Spawn = Spawn;
exports.Sequence = Sequence;
exports.Repeat = Repeat;
exports.Animate = Animate;

}};
__resources__["/__builtin__/libs/cocos2d/actions/index.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    path = require('path');

var modules = 'Action ActionInterval ActionInstant ActionEase'.w();

/**
 * @memberOf cocos
 * @namespace Actions used to animate or change a Node
 */
var actions = {};

util.each(modules, function (mod, i) {
    util.extend(actions, require('./' + mod));
});

module.exports = actions;

}};
__resources__["/__builtin__/libs/cocos2d/Animation.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util');

var Animation = BObject.extend(/** @lends cocos.Animation# */{
    name: null,
    delay: 0.0,
    frames: null,

    /** 
     * A cocos.Animation object is used to perform animations on the Sprite objects.
     * 
     * The Animation object contains cocos.SpriteFrame objects, and a possible delay between the frames.
     * You can animate a cocos.Animation object by using the cocos.actions.Animate action.
     * 
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {cocos.SpriteFrame[]} frames Frames to animate
     * @opt {Float} [delay=0.0] Delay between each frame
     * 
     * @example
     * var animation = cocos.Animation.create({frames: [f1, f2, f3], delay: 0.1});
     * sprite.runAction(cocos.actions.Animate.create({animation: animation}));
     */
    init: function (opts) {
        Animation.superclass.init.call(this, opts);

        this.frames = opts.frames || [];
        this.delay  = opts.delay  || 0.0;
    }
});

exports.Animation = Animation;

}};
__resources__["/__builtin__/libs/cocos2d/AnimationCache.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    Plist = require('Plist').Plist;

var AnimationCache = BObject.extend(/** @lends cocos.AnimationCache# */{
    /**
     * Cached animations
     * @type Object
     */
    animations: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     */
    init: function () {
        AnimationCache.superclass.init.call(this);

        this.set('animations', {});
    },

    /**
     * Add an animation to the cache
     *
     * @opt {String} name Unique name of the animation
     * @opt {cocos.Animcation} animation Animation to cache
     */
    addAnimation: function (opts) {
        var name = opts.name,
            animation = opts.animation;

        this.get('animations')[name] = animation;
    },

    /**
     * Remove an animation from the cache
     *
     * @opt {String} name Unique name of the animation
     */
    removeAnimation: function (opts) {
        var name = opts.name;

        delete this.get('animations')[name];
    },

    /**
     * Get an animation from the cache
     *
     * @opt {String} name Unique name of the animation
     * @returns {cocos.Animation} Cached animation
     */
    getAnimation: function (opts) {
        var name = opts.name;

        return this.get('animations')[name];
    }
});

/**
 * Class methods
 */
util.extend(AnimationCache, /** @lends cocos.AnimationCache */{
    /**
     * @getter sharedAnimationCache
     * @type cocos.AnimationCache
     */
    get_sharedAnimationCache: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});

exports.AnimationCache = AnimationCache;

}};
__resources__["/__builtin__/libs/cocos2d/Director.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS SHOW_REDRAW_REGIONS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry'),
    ccp = geo.ccp,
    events    = require('events'),
    Scheduler = require('./Scheduler').Scheduler,
    EventDispatcher = require('./EventDispatcher').EventDispatcher,
    Scene = require('./nodes/Scene').Scene;


/**
 * requestAnimationFrame for smart animating
 * @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
window.requestAnimFrame = (function (){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function (callback) {
                window.setTimeout(callback, 1000 / 30);
            };
})();

var Director = BObject.extend(/** @lends cocos.Director# */{
    backgroundColor: 'rgb(0, 0, 0)',
    canvas: null,
    context: null,
    sceneStack: null,
    winSize: null,
    isPaused: false,
    maxFrameRate: 30,
    displayFPS: false,
    preloadScene: null,
    isReady: false,

    // Time delta
    dt: 0,
    nextDeltaTimeZero: false,
    lastUpdate: 0,

    _nextScene: null,

    /**
     * <p>Creates and handles the main view and manages how and when to execute the
     * Scenes.</p>
     *
     * <p>This class is a singleton so don't instantiate it yourself, instead use
     * cocos.Director.get('sharedDirector') to return the instance.</p>
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     */
    init: function () {
        Director.superclass.init.call(this);

        this.set('sceneStack', []);
    },

    /**
     * Append to a HTML element. It will create a canvas tag
     *
     * @param {HTMLElement} view Any HTML element to add the application to
     */
    attachInView: function (view) {
        if (!view.tagName) {
            throw "Director.attachInView must be given a HTML DOM Node";
        }

        while (view.firstChild) {
            view.removeChild(view.firstChild);
        }


        var canvas = document.createElement('canvas');
        this.set('canvas', canvas);
        canvas.setAttribute('width', view.clientWidth);
        canvas.setAttribute('height', view.clientHeight);

        var context = canvas.getContext('2d');
        this.set('context', context);

        if (FLIP_Y_AXIS) {
            context.translate(0, view.clientHeight);
            context.scale(1, -1);
        }

        view.appendChild(canvas);

        this.set('winSize', {width: view.clientWidth, height: view.clientHeight});


        // Setup event handling

        // Mouse events
        var eventDispatcher = EventDispatcher.get('sharedDispatcher');
        var self = this;
        function mouseDown(evt) {
            evt.locationInWindow = ccp(evt.clientX, evt.clientY);
            evt.locationInCanvas = self.convertEventToCanvas(evt);

            function mouseDragged(evt) {
                evt.locationInWindow = ccp(evt.clientX, evt.clientY);
                evt.locationInCanvas = self.convertEventToCanvas(evt);

                eventDispatcher.mouseDragged(evt);
            }
            function mouseUp(evt) {
                evt.locationInWindow = ccp(evt.clientX, evt.clientY);
                evt.locationInCanvas = self.convertEventToCanvas(evt);

                document.body.removeEventListener('mousemove', mouseDragged, false);
                document.body.removeEventListener('mouseup',   mouseUp,   false);


                eventDispatcher.mouseUp(evt);
            }

            document.body.addEventListener('mousemove', mouseDragged, false);
            document.body.addEventListener('mouseup',   mouseUp,   false);

            eventDispatcher.mouseDown(evt);
        }
        function mouseMoved(evt) {
            evt.locationInWindow = ccp(evt.clientX, evt.clientY);
            evt.locationInCanvas = self.convertEventToCanvas(evt);

            eventDispatcher.mouseMoved(evt);
        }
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mousemove', mouseMoved, false);

        // Keyboard events
        function keyDown(evt) {
            this._keysDown = this._keysDown || {};
            eventDispatcher.keyDown(evt);
        }
        function keyUp(evt) {
            eventDispatcher.keyUp(evt);
        }

        document.documentElement.addEventListener('keydown', keyDown, false);
        document.documentElement.addEventListener('keyup', keyUp, false);
    },

    runPreloadScene: function () {
        var preloader = this.get('preloadScene');
        if (!preloader) {
            var PreloadScene = require('./nodes/PreloadScene').PreloadScene;
            preloader = PreloadScene.create();
            this.set('preloadScene', preloader);
        }

        events.addListener(preloader, 'complete', util.callback(this, function (preloader) {
            this.isReady = true;
            events.trigger(this, 'ready', this);
        }));

        this.pushScene(preloader);
        this.startAnimation();
    },

    /**
     * Enters the Director's main loop with the given Scene. Call it to run
     * only your FIRST scene. Don't call it if there is already a running
     * scene.
     *
     * @param {cocos.Scene} scene The scene to start
     */
    runWithScene: function (scene) {
        if (!(scene instanceof Scene)) {
            throw "Director.runWithScene must be given an instance of Scene";
        }

        if (this._runningScene) {
            throw "You can't run a Scene if another Scene is already running. Use replaceScene or pushScene instead";
        }

        this.pushScene(scene);
        this.startAnimation();
    },

    /**
     * Replaces the running scene with a new one. The running scene is
     * terminated. ONLY call it if there is a running scene.
     *
     * @param {cocos.Scene} scene The scene to replace with
     */
    replaceScene: function (scene) {
        var index = this.sceneStack.length;

        this._sendCleanupToScene = true;
        this.sceneStack.pop();
        this.sceneStack.push(scene);
        this._nextScene = scene;
    },

    /**
     * Pops out a scene from the queue. This scene will replace the running
     * one. The running scene will be deleted. If there are no more scenes in
     * the stack the execution is terminated. ONLY call it if there is a
     * running scene.
     */
    popScene: function () {
    },

    /**
     * Suspends the execution of the running scene, pushing it on the stack of
     * suspended scenes. The new scene will be executed. Try to avoid big
     * stacks of pushed scenes to reduce memory allocation. ONLY call it if
     * there is a running scene.
     *
     * @param {cocos.Scene} scene The scene to add to the stack
     */
    pushScene: function (scene) {
        this._nextScene = scene;
    },

    /**
     * The main loop is triggered again. Call this function only if
     * cocos.Directory#stopAnimation was called earlier.
     */
    startAnimation: function () {
        this.animate();
    },

    animate: function() {
        this.drawScene();
        window.requestAnimFrame(util.callback(this, 'animate'), this.canvas);
    },

    /**
     * Stops the animation. Nothing will be drawn. The main loop won't be
     * triggered anymore. If you want to pause your animation call
     * cocos.Directory#pause instead.
     */
    stopAnimation: function () {
        if (this._animationTimer) {
            clearInterval(this._animationTimer);
            this._animationTimer = null;
        }
    },

    /**
     * Calculate time since last call
     * @private
     */
    calculateDeltaTime: function () {
        var now = (new Date()).getTime() / 1000;

        if (this.nextDeltaTimeZero) {
            this.dt = 0;
            this.nextDeltaTimeZero = false;
        }

        this.dt = Math.max(0, now - this.lastUpdate);

        this.lastUpdate = now;
    },

    /**
     * The main run loop
     * @private
     */
    drawScene: function () {
        this.calculateDeltaTime();
        
        if (!this.isPaused) {
            Scheduler.get('sharedScheduler').tick(this.dt);
        }


        var context = this.get('context');
        context.fillStyle = this.get('backgroundColor');
        context.fillRect(0, 0, this.winSize.width, this.winSize.height);
        //this.canvas.width = this.canvas.width


        if (this._nextScene) {
            this.setNextScene();
        }

        var rect = new geo.Rect(0, 0, this.winSize.width, this.winSize.height);

        if (rect) {
            context.beginPath();
            context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
            context.clip();
            context.closePath();
        }

        this._runningScene.visit(context, rect);

        if (SHOW_REDRAW_REGIONS) {
            if (rect) {
                context.beginPath();
                context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                context.fillStyle = "rgba(255, 0, 0, 0.5)";
                //context.fill();
                context.closePath();
            }
        }

        if (this.get('displayFPS')) {
            this.showFPS();
        }
    },

    /**
     * Initialises the next scene
     * @private
     */
    setNextScene: function () {
        // TODO transitions

        if (this._runningScene) {
            this._runningScene.onExit();
            if (this._sendCleanupToScene) {
                this._runningScene.cleanup();
            }
        }

        this._runningScene = this._nextScene;

        this._nextScene = null;

        this._runningScene.onEnter();
    },

    convertEventToCanvas: function (evt) {
        var x = this.canvas.offsetLeft - document.documentElement.scrollLeft,
            y = this.canvas.offsetTop - document.documentElement.scrollTop;

        var o = this.canvas;
        while ((o = o.offsetParent)) {
            x += o.offsetLeft - o.scrollLeft;
            y += o.offsetTop - o.scrollTop;
        }

        var p = geo.ccpSub(evt.locationInWindow, ccp(x, y));
        if (FLIP_Y_AXIS) {
            p.y = this.canvas.height - p.y;
        }

        return p;
    },

    showFPS: function () {
        if (!this._fpsLabel) {
            var Label = require('./nodes/Label').Label;
            this._fpsLabel = Label.create({string: '', fontSize: 16});
            this._fpsLabel.set('anchorPoint', ccp(0, 1));
            this._frames = 0;
            this._accumDt = 0;
        }


        this._frames++;
        this._accumDt += this.get('dt');
        
        if (this._accumDt > 1.0 / 3.0)  {
            var frameRate = this._frames / this._accumDt;
            this._frames = 0;
            this._accumDt = 0;

            this._fpsLabel.set('string', 'FPS: ' + (Math.round(frameRate * 100) / 100).toString());
        }


        var s = this.get('winSize');
        this._fpsLabel.set('position', ccp(10, s.height - 10));

        this._fpsLabel.visit(this.get('context'));
    }

});

/**
 * Class methods
 */
util.extend(Director, /** @lends cocos.Director */{
    /**
     * A shared singleton instance of cocos.Director
     *
     * @getter sharedDirector
     * @type cocos.Director
     */
    get_sharedDirector: function (key) {
        if (!Director._instance) {
            Director._instance = this.create();
        }

        return Director._instance;
    }
});

/**
 * @memberOf cocos
 * @class Pretends to run at a constant frame rate even if it slows down
 * @extends cocos.Director
 */
var DirectorFixedSpeed = Director.extend(/** @lends cocos.DirectorFixedSpeed */{
    /**
     * Frames per second to draw.
     * @type Integer
     */
    frameRate: 60,

    /**
     * Calculate time since last call
     * @private
     */
    calculateDeltaTime: function () {
        if (this.nextDeltaTimeZero) {
            this.dt = 0;
            this.nextDeltaTimeZero = false;
        }

        this.dt = 1.0 / this.get('frameRate');
    },

    /**
     * The main loop is triggered again. Call this function only if
     * cocos.Directory#stopAnimation was called earlier.
     */
    startAnimation: function () {
        this._animationTimer = setInterval(util.callback(this, 'drawScene'), 1000 / this.get('frameRate'));
        this.drawScene();
    }

});

exports.Director = Director;
exports.DirectorFixedSpeed = DirectorFixedSpeed;

}};
__resources__["/__builtin__/libs/cocos2d/EventDispatcher.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry');

var EventDispatcher = BObject.extend(/** @lends cocos.EventDispatcher# */{
    dispatchEvents: true,
    keyboardDelegates: null,
    mouseDelegates: null,
    _keysDown: null,
    
    /**
     * This singleton is responsible for dispatching Mouse and Keyboard events.
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     */
    init: function () {
        EventDispatcher.superclass.init.call(this);

        this.keyboardDelegates = [];
        this.mouseDelegates = [];

        this._keysDown = {};
    },

    addDelegate: function (opts) {
        var delegate = opts.delegate,
            priority = opts.priority,
            flags    = opts.flags,
            list     = opts.list;

        var listElement = {
            delegate: delegate,
            priority: priority,
            flags: flags
        };

        var added = false;
        for (var i = 0; i < list.length; i++) {
            var elem = list[i];
            if (priority < elem.priority) {
                // Priority is lower, so insert before elem
                list.splice(i, 0, listElement);
                added = true;
                break;
            }
        }

        // High priority; append to array
        if (!added) {
            list.push(listElement);
        }
    },

    removeDelegate: function (opts) {
        var delegate = opts.delegate,
            list = opts.list;

        var idx = -1,
            i;
        for (i = 0; i < list.length; i++) {
            var l = list[i];
            if (l.delegate == delegate) {
                idx = i;
                break;
            }
        }
        if (idx == -1) {
            return;
        }
        list.splice(idx, 1);
    },
    removeAllDelegates: function (opts) {
        var list = opts.list;

        list.splice(0, list.length - 1);
    },

    addMouseDelegate: function (opts) {
        var delegate = opts.delegate,
            priority = opts.priority;

        var flags = 0;

        // TODO flags

        this.addDelegate({delegate: delegate, priority: priority, flags: flags, list: this.mouseDelegates});
    },

    removeMouseDelegate: function (opts) {
        var delegate = opts.delegate;

        this.removeDelegate({delegate: delegate, list: this.mouseDelegates});
    },

    removeAllMouseDelegate: function () {
        this.removeAllDelegates({list: this.mouseDelegates});
    },

    addKeyboardDelegate: function (opts) {
        var delegate = opts.delegate,
            priority = opts.priority;

        var flags = 0;

        // TODO flags

        this.addDelegate({delegate: delegate, priority: priority, flags: flags, list: this.keyboardDelegates});
    },

    removeKeyboardDelegate: function (opts) {
        var delegate = opts.delegate;

        this.removeDelegate({delegate: delegate, list: this.keyboardDelegates});
    },

    removeAllKeyboardDelegate: function () {
        this.removeAllDelegates({list: this.keyboardDelegates});
    },



    // Mouse Events

    mouseDown: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        this._previousMouseMovePosition = geo.ccp(evt.clientX, evt.clientY);
        this._previousMouseDragPosition = geo.ccp(evt.clientX, evt.clientY);

        for (var i = 0; i < this.mouseDelegates.length; i++) {
            var entry = this.mouseDelegates[i];
            if (entry.delegate.mouseDown) {
                var swallows = entry.delegate.mouseDown(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },
    mouseMoved: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        if (this._previousMouseMovePosition) {
            evt.deltaX = evt.clientX - this._previousMouseMovePosition.x;
            evt.deltaY = evt.clientY - this._previousMouseMovePosition.y;
            if (FLIP_Y_AXIS) {
                evt.deltaY *= -1;
            }
        } else {
            evt.deltaX = 0;
            evt.deltaY = 0;
        }
        this._previousMouseMovePosition = geo.ccp(evt.clientX, evt.clientY);

        for (var i = 0; i < this.mouseDelegates.length; i++) {
            var entry = this.mouseDelegates[i];
            if (entry.delegate.mouseMoved) {
                var swallows = entry.delegate.mouseMoved(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },
    mouseDragged: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        if (this._previousMouseDragPosition) {
            evt.deltaX = evt.clientX - this._previousMouseDragPosition.x;
            evt.deltaY = evt.clientY - this._previousMouseDragPosition.y;
            if (FLIP_Y_AXIS) {
                evt.deltaY *= -1;
            }
        } else {
            evt.deltaX = 0;
            evt.deltaY = 0;
        }
        this._previousMouseDragPosition = geo.ccp(evt.clientX, evt.clientY);

        for (var i = 0; i < this.mouseDelegates.length; i++) {
            var entry = this.mouseDelegates[i];
            if (entry.delegate.mouseDragged) {
                var swallows = entry.delegate.mouseDragged(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },
    mouseUp: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        for (var i = 0; i < this.mouseDelegates.length; i++) {
            var entry = this.mouseDelegates[i];
            if (entry.delegate.mouseUp) {
                var swallows = entry.delegate.mouseUp(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },

    // Keyboard events
    keyDown: function (evt) {
        var kc = evt.keyCode;
        if (!this.dispatchEvents || this._keysDown[kc]) {
            return;
        }

        this._keysDown[kc] = true;

        for (var i = 0; i < this.keyboardDelegates.length; i++) {
            var entry = this.keyboardDelegates[i];
            if (entry.delegate.keyDown) {
                var swallows = entry.delegate.keyDown(evt);
                if (swallows) {
                    break;
                }
            }
        }
    },

    keyUp: function (evt) {
        if (!this.dispatchEvents) {
            return;
        }

        var kc = evt.keyCode;
        if (this._keysDown[kc]) {
            delete this._keysDown[kc];
        }

        for (var i = 0; i < this.keyboardDelegates.length; i++) {
            var entry = this.keyboardDelegates[i];
            if (entry.delegate.keyUp) {
                var swallows = entry.delegate.keyUp(evt);
                if (swallows) {
                    break;
                }
            }
        }
    }

});

/**
 * Class methods
 */
util.extend(EventDispatcher, /** @lends cocos.EventDispatcher */{
    /**
     * A shared singleton instance of cocos.EventDispatcher
     *
     * @getter sharedDispatcher
     * @type cocos.EventDispatcher
     */
    get_sharedDispatcher: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});
exports.EventDispatcher = EventDispatcher;

}};
__resources__["/__builtin__/libs/cocos2d/index.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    path = require('path');

var modules = 'TextureAtlas Texture2D Preloader RemoteImage RemoteResource SpriteFrame SpriteFrameCache Director Animation AnimationCache Scheduler ActionManager TMXXMLParser'.w();

/**
 * @namespace All cocos2d objects live in this namespace
 */
var cocos = {
    nodes: require('./nodes'),
    actions: require('./actions')
};

util.each(modules, function (mod, i) {
    util.extend(cocos, require('./' + mod));
});

module.exports = cocos;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/AtlasNode.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var SpriteBatchNode = require('./BatchNode').SpriteBatchNode,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    geo   = require('geometry');

var AtlasNode = SpriteBatchNode.extend(/** @lends cocos.AtlasNode# */{
    /**
     * Characters per row
     * @type Integer
     */
    itemsPerRow: 0,

    /**
     * Characters per column
     * @type Integer
     */
    itemsPerColumn: 0,

    /**
     * Width of a character
     * @type Integer
     */
    itemWidth: 0,

    /**
     * Height of a character
     * @type Integer
     */
    itemHeight: 0,


    /**
     * @type cocos.TextureAtlas
     */
     textureAtlas: null,

    /**
     * @class
     * It knows how to render a TextureAtlas object. If you are going to
     * render a TextureAtlas consider subclassing cocos.nodes.AtlasNode (or a
     * subclass of cocos.nodes.AtlasNode)
     * @memberOf cocos
     * @extends cocos.nodes.SpriteBatchNode
     * @constructs
     *
     * @opt {String} file Path to Atals image
     * @opt {Integer} itemWidth Character width
     * @opt {Integer} itemHeight Character height
     * @opt {Integer} itemsToRender Quantity of items to render
     */
    init: function (opts) {
        AtlasNode.superclass.init.call(this, opts);

        this.itemWidth = opts.itemWidth;
        this.itemHeight = opts.itemHeight;
        
        this.textureAtlas = TextureAtlas.create({file: opts.file, capacity: opts.itemsToRender});


        this._calculateMaxItems();
    },

    updateAtlasValues: function () {
        throw "cocos.nodes.AtlasNode:Abstract - updateAtlasValue not overriden";
    },

    _calculateMaxItems: function () {
        var s = this.textureAtlas.get('texture.contentSize');
        this.itemsPerColumn = s.height / this.itemHeight;
        this.itemsPerRow = s.width / this.itemWidth;
    }
});

exports.AtlasNode = AtlasNode;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/BatchNode.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray SHOW_REDRAW_REGIONS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    evt = require('events'),
    geo = require('geometry'),
    ccp = geo.ccp,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    RenderTexture = require('./RenderTexture').RenderTexture,
    Node = require('./Node').Node;

var BatchNode = Node.extend(/** @lends cocos.nodes.BatchNode# */{
    partialDraw: false,
    contentRect: null,
    renderTexture: null,
    dirty: true,

    /**
     * Region to redraw
     * @type geometry.Rect
     */
    dirtyRegion: null,
    dynamicResize: false,

    /** @private
     * Areas that need redrawing
     *
     * Not implemented
     */
    _dirtyRects: null,


    /**
     * Draws all children to an in-memory canvas and only redraws when something changes
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {geometry.Size} size The size of the in-memory canvas used for drawing to
     * @opt {Boolean} [partialDraw=false] Draw only the area visible on screen. Small maps may be slower in some browsers if this is true.
     */
    init: function (opts) {
        BatchNode.superclass.init.call(this, opts);

        var size = opts.size || geo.sizeMake(1, 1);
        this.set('partialDraw', opts.partialDraw);

        evt.addListener(this, 'contentsize_changed', util.callback(this, this._resizeCanvas));
        
        this._dirtyRects = [];
        this.set('contentRect', geo.rectMake(0, 0, size.width, size.height));
        this.renderTexture = RenderTexture.create(size);
        this.renderTexture.sprite.set('isRelativeAnchorPoint', false);
        this.addChild({child: this.renderTexture});
    },

    addChild: function (opts) {
        BatchNode.superclass.addChild.call(this, opts);

        var child = opts.child,
            z     = opts.z;

        if (child == this.renderTexture) {
            return;
        }

        // TODO handle texture resize

        // Watch for changes in child
        var watchEvents = ['position_before_changed',
                           'scalex_before_changed',
                           'scaley_before_changed',
                           'rotation_before_changed',
                           'anchorpoint_before_changed',
                           'opacity_before_changed',
                           'visible_before_changed'];
        evt.addListener(child, watchEvents, util.callback(this, function () {
            this.addDirtyRegion(child.get('boundingBox'));
        }));

        this.addDirtyRegion(child.get('boundingBox'));
    },

    removeChild: function (opts) {
        BatchNode.superclass.removeChild.call(this, opts);

        // TODO remove istransformdirty_changed and visible_changed listeners

        this.set('dirty', true);
    },

    addDirtyRegion: function (rect) {
        // Increase rect slightly to compensate for subpixel artifacts
        rect = util.copy(rect);
        rect.origin.x -= 2;
        rect.origin.y -= 2;
        rect.size.width += 4;
        rect.size.height += 4;

        var region = this.get('dirtyRegion');
        if (!region) {
            region = rect;
        } else {
            region = geo.rectUnion(region, rect);
        }

        this.set('dirtyRegion', region);
        this.set('dirty', true);
    },

    _resizeCanvas: function (oldSize) {
        var size = this.get('contentSize');

        if (geo.sizeEqualToSize(size, oldSize)) {
            return; // No change
        }


        this.renderTexture.set('contentSize', size);
        this.set('dirty', true);
    },

    update: function () {

    },

    visit: function (context) {
        if (!this.visible) {
            return;
        }

        context.save();

        this.transform(context);

        var rect = this.get('dirtyRegion');
        // Only redraw if something changed
        if (this.dirty) {

            if (rect) {
                if (this.get('partialDraw')) {
                    // Clip region to visible area
                    var s = require('../Director').Director.get('sharedDirector').get('winSize'),
                        p = this.get('position');
                    var r = new geo.Rect(
                        0, 0,
                        s.width, s.height
                    );
                    r = geo.rectApplyAffineTransform(r, this.worldToNodeTransform());
                    rect = geo.rectIntersection(r, rect);
                }

                this.renderTexture.clear(rect);

                this.renderTexture.context.save();
                this.renderTexture.context.beginPath();
                this.renderTexture.context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                this.renderTexture.context.clip();
                this.renderTexture.context.closePath();
            } else {
                this.renderTexture.clear();
            }

            for (var i = 0, childLen = this.children.length; i < childLen; i++) {
                var c = this.children[i];
                if (c == this.renderTexture) {
                    continue;
                }

                // Draw children inside rect
                if (!rect || geo.rectOverlapsRect(c.get('boundingBox'), rect)) {
                    c.visit(this.renderTexture.context, rect);
                }
            }

            if (SHOW_REDRAW_REGIONS) {
                if (rect) {
                    this.renderTexture.context.beginPath();
                    this.renderTexture.context.rect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
                    this.renderTexture.context.fillStyle = "rgba(0, 0, 255, 0.5)";
                    this.renderTexture.context.fill();
                    this.renderTexture.context.closePath();
                }
            }

            if (rect) {
                this.renderTexture.context.restore();
            }

            this.set('dirty', false);
            this.set('dirtyRegion', null);
        }

        this.renderTexture.visit(context);

        context.restore();
    },

    draw: function (ctx) {
    },

    onEnter: function () {
        if (this.get('partialDraw')) {
            evt.addListener(this.get('parent'), 'istransformdirty_changed', util.callback(this, function () {
                var box = this.get('visibleRect');
                this.addDirtyRegion(box);
            }));
        }
    }
});

var SpriteBatchNode = BatchNode.extend(/** @lends cocos.nodes.SpriteBatchNode# */{
    textureAtlas: null,

    /**
     * @memberOf cocos.nodes
     * @class A BatchNode that accepts only Sprite using the same texture
     * @extends cocos.nodes.BatchNode
     * @constructs
     *
     * @opt {String} file (Optional) Path to image to use as sprite atlas
     * @opt {Texture2D} texture (Optional) Texture to use as sprite atlas
     * @opt {cocos.TextureAtlas} textureAtlas (Optional) TextureAtlas to use as sprite atlas
     */
    init: function (opts) {
        SpriteBatchNode.superclass.init.call(this, opts);

        var file         = opts.file,
            textureAtlas = opts.textureAtlas,
            texture      = opts.texture;

        if (file || texture) {
            textureAtlas = TextureAtlas.create({file: file, texture: texture});
        }

        this.set('textureAtlas', textureAtlas);
    },

    /**
     * @getter texture
     * @type cocos.Texture2D
     */
    get_texture: function () {
        return this.textureAtlas ? this.textureAtlas.texture : null;
    },

    set_opacity: function (newOpacity) {
        this.opacity = newOpacity;
        for (var i = 0, len = this.children.length; i < len; i++) {
            var child = this.children[i];
            child.set('opacity', newOpacity);
        }
    }

});

exports.BatchNode = BatchNode;
exports.SpriteBatchNode = SpriteBatchNode;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/index.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    path = require('path');

var modules = 'AtlasNode LabelAtlas ProgressBar PreloadScene Node Layer Scene Label Sprite TMXTiledMap BatchNode RenderTexture Menu MenuItem Transition'.w();

/** 
 * @memberOf cocos
 * @namespace All cocos2d nodes. i.e. anything that can be added to a Scene
 */
var nodes = {};

util.each(modules, function (mod, i) {
    util.extend(nodes, require('./' + mod));
});

module.exports = nodes;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Label.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    console = require('system').console,
    Director = require('../Director').Director,
    Node = require('./Node').Node,
    ccp = require('geometry').ccp;

var Label = Node.extend(/** @lends cocos.nodes.Label# */{
    string:   '',
    fontName: 'Helvetica',
    fontSize: 16,
    fontColor: 'white',

    /**
     * Renders a simple text label
     *
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {String} [string=""] The text string to draw
     * @opt {Float} [fontSize=16] The size of the font
     * @opt {String} [fontName="Helvetica"] The name of the font to use
     * @opt {String} [fontColor="white"] The color of the text
     */
    init: function (opts) {
        Label.superclass.init.call(this, opts);

        util.each('fontSize fontName fontColor string'.w(), util.callback(this, function (name) {
            // Set property on init
            if (opts[name]) {
                this.set(name, opts[name]);
            }

            // Update content size
            this._updateLabelContentSize();
        }));
    },

    /** 
     * String of the font name and size to use in a format &lt;canvas&gt; understands
     *
     * @getter font
     * @type String
     */
    get_font: function (key) {
        return this.get('fontSize') + 'px ' + this.get('fontName');
    },

    draw: function (context) {
        if (FLIP_Y_AXIS) {
            context.save();

            // Flip Y axis
            context.scale(1, -1);
            context.translate(0, -this.get('fontSize'));
        }


        context.fillStyle = this.get('fontColor');
        context.font = this.get('font');
        context.textBaseline = 'top';
        if (context.fillText) {
            context.fillText(this.get('string'), 0, 0);
        } else if (context.mozDrawText) {
            context.mozDrawText(this.get('string'));
        }

        if (FLIP_Y_AXIS) {
            context.restore();
        }
    },

    /**
     * @private
     */
    _updateLabelContentSize: function () {
        var ctx = Director.get('sharedDirector').get('context');
        var size = {width: 0, height: this.get('fontSize')};

        var prevFont = ctx.font;
        ctx.font = this.get('font');

        if (ctx.measureText) {
            var txtSize = ctx.measureText(this.get('string'));
            size.width = txtSize.width;
        } else if (ctx.mozMeasureText) {
            size.width = ctx.mozMeasureText(this.get('string'));
        }

        ctx.font = prevFont;

        this.set('contentSize', size);
    }
});

module.exports.Label = Label;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/LabelAtlas.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var AtlasNode = require('./AtlasNode').AtlasNode,
    Sprite = require('./Sprite').Sprite,
    geo   = require('geometry');

var LabelAtlas = AtlasNode.extend(/** @lends cocos.nodes.LabelAtlas# */{
    string: '',

    mapStartChar: '',

    /**
     * @memberOf cocos.nodes
     * @extends cocos.nodes.BatchNode
     * @constructs
     *
     * @opt {String} [string=] Initial text to draw
     * @opt {String} charMapFile
     * @opt {Integer} itemWidth
     * @opt {Integer} itemHeight
     * @opt {String} startCharMap Single character
     */
    init: function (opts) {
        LabelAtlas.superclass.init.call(this, {
            file: opts.charMapFile,
            itemWidth: opts.itemWidth,
            itemHeight: opts.itemHeight,
            itemsToRender: opts.string.length,
            size: new geo.Size(opts.itemWidth * opts.string.length, opts.itemHeight)
        });


        this.mapStartChar = opts.startCharMap.charCodeAt(0);
        this.set('string', opts.string);
    },

    updateAtlasValue: function () {
        var n = this.string.length,
            s = this.get('string');
    
        // FIXME this should reuse children to improve performance
        while (this.children.length > 0) {
            this.removeChild(this.children[0]);
        }
        for (var i = 0; i < n; i++) {
            var a = s.charCodeAt(i) - this.mapStartChar,
                row = (a % this.itemsPerRow),
                col = Math.floor(a / this.itemsPerRow);
    
            var left = row * this.itemWidth,
                top  = col * this.itemHeight;

            var tile = Sprite.create({rect: new geo.Rect(left, top, this.itemWidth, this.itemHeight),
                              textureAtlas: this.textureAtlas});

            tile.set('position', new geo.Point(i * this.itemWidth, 0));
            tile.set('anchorPoint', new geo.Point(0, 0));
            tile.set('opacity', this.get('opacity'));
            
            this.addChild({child: tile});
        }
    },

    set_string: function (newString) {
        this.string = newString;

        this.updateAtlasValue();
    }
});


exports.LabelAtlas = LabelAtlas;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Layer.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var Node = require('./Node').Node,
    util = require('util'),
    evt = require('events'),
    Director = require('../Director').Director,
    ccp    = require('geometry').ccp,
    EventDispatcher = require('../EventDispatcher').EventDispatcher;

var Layer = Node.extend(/** @lends cocos.nodes.Layer# */{
    isMouseEnabled: false,
    isKeyboardEnabled: false,
    mouseDelegatePriority: 0,
    keyboardDelegatePriority: 0,

    /** 
     * A fullscreen Node. You need at least 1 layer in your app to add other nodes to.
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     */
    init: function () {
        Layer.superclass.init.call(this);

        var s = Director.get('sharedDirector').get('winSize');

        this.set('isRelativeAnchorPoint', false);
        this.anchorPoint = ccp(0.5, 0.5);
        this.set('contentSize', s);

        evt.addListener(this, 'ismouseenabled_changed', util.callback(this, function () {
            if (this.isRunning) {
                if (this.isMouseEnabled) {
                    EventDispatcher.get('sharedDispatcher').addMouseDelegate({delegate: this, priority: this.get('mouseDelegatePriority')});
                } else {
                    EventDispatcher.get('sharedDispatcher').removeMouseDelegate({delegate: this});
                }
            }
        }));


        evt.addListener(this, 'iskeyboardenabled_changed', util.callback(this, function () {
            if (this.isRunning) {
                if (this.isKeyboardEnabled) {
                    EventDispatcher.get('sharedDispatcher').addKeyboardDelegate({delegate: this, priority: this.get('keyboardDelegatePriority')});
                } else {
                    EventDispatcher.get('sharedDispatcher').removeKeyboardDelegate({delegate: this});
                }
            }
        }));
    },

    onEnter: function () {
        if (this.isMouseEnabled) {
            EventDispatcher.get('sharedDispatcher').addMouseDelegate({delegate: this, priority: this.get('mouseDelegatePriority')});
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.get('sharedDispatcher').addKeyboardDelegate({delegate: this, priority: this.get('keyboardDelegatePriority')});
        }
				
        Layer.superclass.onEnter.call(this);
    },

    onExit: function () {
        if (this.isMouseEnabled) {
            EventDispatcher.get('sharedDispatcher').removeMouseDelegate({delegate: this});
        }
        if (this.isKeyboardEnabled) {
            EventDispatcher.get('sharedDispatcher').removeKeyboardDelegate({delegate: this});
        }

        Layer.superclass.onExit.call(this);
    }
});

module.exports.Layer = Layer;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Menu.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    Layer = require('./Layer').Layer,
    Director = require('../Director').Director,
    MenuItem = require('./MenuItem').MenuItem,
    geom = require('geometry'), ccp = geom.ccp;

/**
 * @private
 * @constant
 */
var kMenuStateWaiting = 0;

/**
 * @private
 * @constant
 */
var kMenuStateTrackingTouch = 1;
    

var Menu = Layer.extend(/** @lends cocos.nodes.Menu# */{
    mouseDelegatePriority: (-Number.MAX_VALUE + 1),
    state: kMenuStateWaiting,
    selectedItem: null,
    color: null,

    /**
     * A fullscreen node used to render a selection of menu options
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Layer
     *
     * @opt {cocos.nodes.MenuItem[]} items An array of MenuItems to draw on the menu
     */
    init: function (opts) {
        Menu.superclass.init.call(this, opts);

        var items = opts.items;

        this.set('isMouseEnabled', true);
        
        var s = Director.get('sharedDirector').get('winSize');

        this.set('isRelativeAnchorPoint', false);
        this.anchorPoint = ccp(0.5, 0.5);
        this.set('contentSize', s);

        this.set('position', ccp(s.width / 2, s.height / 2));


        if (items) {
            var z = 0;
            util.each(items, util.callback(this, function (item) {
                this.addChild({child: item, z: z++});
            }));
        }

        
    },

    addChild: function (opts) {
        if (!opts.child instanceof MenuItem) {
            throw "Menu only supports MenuItem objects as children";
        }

        Menu.superclass.addChild.call(this, opts);
    },

    itemForMouseEvent: function (event) {
        var location = event.locationInCanvas;

        var children = this.get('children');
        for (var i = 0, len = children.length; i < len; i++) {
            var item = children[i];

            if (item.get('visible') && item.get('isEnabled')) {
                var local = item.convertToNodeSpace(location);
                
                var r = item.get('rect');
                r.origin = ccp(0, 0);

                if (geom.rectContainsPoint(r, local)) {
                    return item;
                }

            }
        }

        return null;
    },

    mouseUp: function (event) {
        var selItem = this.get('selectedItem');

        if (selItem) {
            selItem.unselected();
            selItem.activate();
        }

        if (this.state != kMenuStateWaiting) {
            this.set('state', kMenuStateWaiting);
        }
        if (selItem) {
            return true;
        }
        return false;

    },
    mouseDown: function (event) {
        if (this.state != kMenuStateWaiting || !this.visible) {
            return false;
        }

        var selectedItem = this.itemForMouseEvent(event);
        this.set('selectedItem', selectedItem);
        if (selectedItem) {
            selectedItem.selected()
            this.set('state', kMenuStateTrackingTouch);

            return true;
        }

        return false;
    },

    mouseDragged: function (event) {
        var currentItem = this.itemForMouseEvent(event);

        if (currentItem != this.selectedItem) {
            if (this.selectedItem) {
                this.selectedItem.unselected();
            }
            this.set('selectedItem', currentItem);
            if (this.selectedItem) {
                this.selectedItem.selected();
            }
        }

        if (currentItem && this.state == kMenuStateTrackingTouch) {
            return true;
        }

        return false;
        
    }

});

exports.Menu = Menu;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/MenuItem.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    Node = require('./Node').Node,
    Sprite = require('./Sprite').Sprite,
    rectMake = require('geometry').rectMake,
    ccp = require('geometry').ccp;

var MenuItem = Node.extend(/** @lends cocos.nodes.MenuItem# */{
    isEnabled: true,
    isSelected: false,
    callback: null,

    /**
     * Base class for any buttons or options in a menu
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {Function} callback Function to call when menu item is activated
     */
    init: function (opts) {
        MenuItem.superclass.init.call(this, opts);

        var callback = opts.callback;

        this.set('anchorPoint', ccp(0.5, 0.5));
        this.set('callback', callback);
    },

    activate: function () {
        if (this.isEnabled && this.callback) {
            this.callback(this);
        }
    },

    /**
     * @getter rect
     * @type geometry.Rect
     */
    get_rect: function () {
        return rectMake(
            this.position.x - this.contentSize.width  * this.anchorPoint.x,
            this.position.y - this.contentSize.height * this.anchorPoint.y,
            this.contentSize.width,
            this.contentSize.height
        );
    },

    selected: function () {
        this.isSelected = true;
    },

    unselected: function () {
        this.isSelected = false;
    }
});

var MenuItemSprite = MenuItem.extend(/** @lends cocos.nodes.MenuItemSprite# */{
    normalImage: null,
    selectedImage: null,
    disabledImage: null,

    /**
     * A menu item that accepts any cocos.nodes.Node
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.MenuItem
     *
     * @opt {cocos.nodes.Node} normalImage Main Node to draw
     * @opt {cocos.nodes.Node} selectedImage Node to draw when menu item is selected
     * @opt {cocos.nodes.Node} disabledImage Node to draw when menu item is disabled
     */
    init: function (opts) {
        MenuItemSprite.superclass.init.call(this, opts);

        var normalImage   = opts.normalImage,
            selectedImage = opts.selectedImage,
            disabledImage = opts.disabledImage;

        this.set('normalImage', normalImage);
        this.set('selectedImage', selectedImage);
        this.set('disabledImage', disabledImage);

        this.set('contentSize', normalImage.get('contentSize'));
    },

    set_normalImage: function (image) {
        if (image != this.normalImage) {
            image.set('anchorPoint', ccp(0, 0));
            image.set('visible', true);
            this.removeChild({child: this.normalImage, cleanup: true});
            this.addChild(image);

            this.normalImage = image;
        }
    },

    set_selectedImage: function (image) {
        if (image != this.selectedImage) {
            image.set('anchorPoint', ccp(0, 0));
            image.set('visible', false);
            this.removeChild({child: this.selectedImage, cleanup: true});
            this.addChild(image);

            this.selectedImage = image;
        }
    },

    set_disabledImage: function (image) {
        if (image != this.disabledImage) {
            image.set('anchorPoint', ccp(0, 0));
            image.set('visible', false);
            this.removeChild({child: this.disabledImage, cleanup: true});
            this.addChild(image);

            this.disabledImage = image;
        }
    },

    selected: function () {
        MenuItemSprite.superclass.selected.call(this);

        if (this.selectedImage) {
            this.normalImage.set('visible',   false);
            this.selectedImage.set('visible', true);
            if (this.disabledImage) this.disabledImage.set('visible', false);
        } else {
            this.normalImage.set('visible',   true);
            if (this.disabledImage) this.disabledImage.set('visible', false);
        }
    },

    unselected: function () {
        MenuItemSprite.superclass.unselected.call(this);

        this.normalImage.set('visible',   true);
        if (this.selectedImage) this.selectedImage.set('visible', false);
        if (this.disabledImage) this.disabledImage.set('visible', false);
    },

    set_isEnabled: function (enabled) {
        this.isEnabled = enabled;

        if (enabled) {
            this.normalImage.set('visible',   true);
            if (this.selectedImage) this.selectedImage.set('visible', false);
            if (this.disabledImage) this.disabledImage.set('visible', false);
        } else {
            if (this.disabledImage) {
                this.normalImage.set('visible',   false);
                if (this.selectedImage) this.selectedImage.set('visible', false);
                this.disabledImage.set('visible', true);
            } else {
                this.normalImage.set('visible',   true);
                if (this.selectedImage) this.selectedImage.set('visible', false);
            }
        }
    }

});

var MenuItemImage = MenuItemSprite.extend(/** @lends cocos.nodes.MenuItemImage# */{

    /**
     * MenuItem that accepts image files
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.MenuItemSprite
     *
     * @opt {String} normalImage Main image file to draw
     * @opt {String} selectedImage Image file to draw when menu item is selected
     * @opt {String} disabledImage Image file to draw when menu item is disabled
     */
    init: function (opts) {
        var normalI   = opts.normalImage,
            selectedI = opts.selectedImage,
            disabledI = opts.disabledImage,
            callback  = opts.callback;

        var normalImage = Sprite.create({file: normalI}),
            selectedImage = Sprite.create({file: selectedI}),
            disabledImage = null;

        if (disabledI) {
            disabledImage = Sprite.create({file: disabledI});
        }

        return MenuItemImage.superclass.init.call(this, {normalImage: normalImage, selectedImage: selectedImage, disabledImage: disabledImage, callback: callback});
    }
});

exports.MenuItem = MenuItem;
exports.MenuItemImage = MenuItemImage;
exports.MenuItemSprite = MenuItemSprite;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Node.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    evt = require('events'),
    Scheduler = require('../Scheduler').Scheduler,
    ActionManager = require('../ActionManager').ActionManager,
    geo = require('geometry'), ccp = geo.ccp;

var Node = BObject.extend(/** @lends cocos.nodes.Node# */{
    isCocosNode: true,

    /**
     * Is the node visible
     * @type boolean
     */
    visible: true,

    /**
     * Position relative to parent node
     * @type geometry.Point
     */
    position: null,

    /**
     * Parent node
     * @type cocos.nodes.Node
     */
    parent: null,

    /**
     * Unique tag to identify the node
     * @type *
     */
    tag: null,

    /**
     * Size of the node
     * @type geometry.Size
     */
    contentSize: null,

    /**
     * Nodes Z index. i.e. draw order
     * @type Integer
     */
    zOrder: 0,

    /**
     * Anchor point for scaling and rotation. 0x0 is top left and 1x1 is bottom right
     * @type geometry.Point
     */
    anchorPoint: null,

    /**
     * Anchor point for scaling and rotation in pixels from top left
     * @type geometry.Point
     */
    anchorPointInPixels: null,

    /**
     * Rotation angle in degrees
     * @type Float
     */
    rotation: 0,

    /**
     * X scale factor
     * @type Float
     */
    scaleX: 1,

    /**
     * Y scale factor
     * @type Float
     */
    scaleY: 1,

    /**
     * Opacity of the Node. 0 is totally transparent, 255 is totally opaque
     * @type Float
     */
    opacity: 255,

    isRunning: false,
    isRelativeAnchorPoint: true,

    isTransformDirty: true,
    isInverseDirty: true,
    inverse: null,
    transformMatrix: null,

    /**
     * The child Nodes
     * @type cocos.nodes.Node[]
     */
    children: null,

    /**
     * @memberOf cocos.nodes
     * @class The base class all visual elements extend from
     * @extends BObject
     * @constructs
     */
    init: function () {
        Node.superclass.init.call(this);
        this.set('contentSize', {width: 0, height: 0});
        this.anchorPoint = ccp(0.5, 0.5);
        this.anchorPointInPixels = ccp(0, 0);
        this.position = ccp(0, 0);
        this.children = [];

        util.each(['scaleX', 'scaleY', 'rotation', 'position', 'anchorPoint', 'contentSize', 'isRelativeAnchorPoint'], util.callback(this, function (key) {
            evt.addListener(this, key.toLowerCase() + '_changed', util.callback(this, this._dirtyTransform));
        }));
        evt.addListener(this, 'anchorpoint_changed', util.callback(this, this._updateAnchorPointInPixels));
        evt.addListener(this, 'contentsize_changed', util.callback(this, this._updateAnchorPointInPixels));
    },

    /**
     * Calculates the anchor point in pixels and updates the
     * anchorPointInPixels property
     * @private
     */
    _updateAnchorPointInPixels: function () {
        var ap = this.get('anchorPoint'),
            cs = this.get('contentSize');
        this.set('anchorPointInPixels', ccp(cs.width * ap.x, cs.height * ap.y));
    },

    /**
     * Add a child Node
     *
     * @opt {cocos.nodes.Node} child The child node to add
     * @opt {Integer} [z] Z Index for the child
     * @opt {Integer|String} [tag] A tag to reference the child with
     * @returns {cocos.nodes.Node} The node the child was added to. i.e. 'this'
     */
    addChild: function (opts) {
        if (opts.isCocosNode) {
            return this.addChild({child: opts});
        }

        var child = opts.child,
            z = opts.z,
            tag = opts.tag;

        if (z === undefined || z === null) {
            z = child.get('zOrder');
        }

        //this.insertChild({child: child, z:z});
        var added = false;


        for (var i = 0, childLen = this.children.length; i < childLen; i++) {
            var c = this.children[i];
            if (c.zOrder > z) {
                added = true;
                this.children.splice(i, 0, child);
                break;
            }
        }

        if (!added) {
            this.children.push(child);
        }

        child.set('tag', tag);
        child.set('zOrder', z);
        child.set('parent', this);

        if (this.isRunning) {
            child.onEnter();
        }

        return this;
    },
    getChild: function (opts) {
        var tag = opts.tag;

        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].tag == tag) {
                return this.children[i];
            }
        }

        return null;
    },

    removeChild: function (opts) {
        if (opts.isCocosNode) {
            return this.removeChild({child: opts});
        }

        var child = opts.child,
            cleanup = opts.cleanup;

        if (!child) {
            return;
        }

        var children = this.get('children'),
            idx = children.indexOf(child);

        if (idx > -1) {
            this.detatchChild({child: child, cleanup: cleanup});
        }
    },

    removeChildren: function(opts) {
        var children = this.get('children'),
            isRunning = this.get('isRunning');
        
        // Perform cleanup on each child but can't call removeChild() 
        // due to Array.splice's destructive nature during iteration.
        for (var i = 0; i < children.length; i++) {
            if (opts.cleanup) {
                children[i].cleanup();
            }
            if (isRunning) {
                children[i].onExit();
            }
            children[i].set('parent', null);
        }
        // Now safe to empty children list
        this.children = [];
    },
    
    detatchChild: function (opts) {
        var child = opts.child,
            cleanup = opts.cleanup;

        var children = this.get('children'),
            isRunning = this.get('isRunning'),
            idx = children.indexOf(child);

        if (isRunning) {
            child.onExit();
        }

        if (cleanup) {
            child.cleanup();
        }

        child.set('parent', null);
        children.splice(idx, 1);
    },

    reorderChild: function (opts) {
        var child = opts.child,
            z     = opts.z;

        var pos = this.children.indexOf(child);
        if (pos == -1) {
            throw "Node isn't a child of this node";
        }

        child.set('zOrder', z);

        // Remove child
        this.children.splice(pos, 1);

        // Add child back at correct location
        var added = false;
        for (var i = 0, childLen = this.children.length; i < childLen; i++) {
            var c = this.children[i];
            if (c.zOrder > z) {
                added = true;
                this.children.splice(i, 0, child);
                break;
            }
        }

        if (!added) {
            this.children.push(child);
        }
    },

    /**
     * Draws the node. Override to do custom drawing. If it's less efficient to
     * draw only the area inside the rect then don't bother. The result will be
     * clipped to that area anyway.
     *
     * @param {CanvasRenderingContext2D|WebGLRenderingContext} context Canvas rendering context
     * @param {geometry.Rect} rect Rectangular region that needs redrawing. Limit drawing to this area only if it's more efficient to do so.
     */
    draw: function (context, rect) {
        // All draw code goes here
    },

    /**
     * @getter scale
     * @type Float
     */
    get_scale: function () {
        if (this.scaleX != this.scaleY) {
            throw "scaleX and scaleY aren't identical";
        }

        return this.scaleX;
    },

    /**
     * @setter scale
     * @type Float
     */
    set_scale: function (val) {
        this.set('scaleX', val);
        this.set('scaleY', val);
    },
		
    scheduleUpdate: function (opts) {
        opts = opts || {};
        var priority = opts.priority || 0;

        Scheduler.get('sharedScheduler').scheduleUpdate({target: this, priority: priority, paused: !this.get('isRunning')});
    },

    /**
     * Triggered when the node is added to a scene
     *
     * @event
     */
    onEnter: function () {
        util.each(this.children, function (child) {
            child.onEnter();
        });

        this.resumeSchedulerAndActions();
        this.set('isRunning', true);
    },

    /**
     * Triggered when the node is removed from a scene
     *
     * @event
     */
    onExit: function () {
        this.pauseSchedulerAndActions();
        this.set('isRunning', false);

        util.each(this.children, function (child) {
            child.onExit();
        });
    },

    cleanup: function () {
        this.stopAllActions();
        this.unscheduleAllSelectors();
        util.each(this.children, function (child) {
            child.cleanup();
        });
    },

    resumeSchedulerAndActions: function () {
        Scheduler.get('sharedScheduler').resumeTarget(this);
        ActionManager.get('sharedManager').resumeTarget(this);
    },
    pauseSchedulerAndActions: function () {
        Scheduler.get('sharedScheduler').pauseTarget(this);
        ActionManager.get('sharedManager').pauseTarget(this);
    },
    unscheduleSelector: function (selector) {
        Scheduler.get('sharedScheduler').unschedule({target: this, method: selector});
    },
    unscheduleAllSelectors: function () {
        Scheduler.get('sharedScheduler').unscheduleAllSelectorsForTarget(this);
    },
    stopAllActions: function () {
        ActionManager.get('sharedManager').removeAllActionsFromTarget(this);
    },

    visit: function (context, rect) {
        if (!this.visible) {
            return;
        }

        context.save();

        this.transform(context);

        // Set alpha value (global only for now)
        context.globalAlpha = this.get('opacity') / 255.0;
        
        // Adjust redraw region by nodes position
        if (rect) {
            var pos = this.get('position');
            rect = new geo.Rect(rect.origin.x - pos.x, rect.origin.y - pos.y, rect.size.width, rect.size.height);
        }

        // Draw background nodes
        util.each(this.children, function (child, i) {
            if (child.zOrder < 0) {
                child.visit(context, rect);
            }
        });
        
        this.draw(context, rect);

        // Draw foreground nodes
        util.each(this.children, function (child, i) {
            if (child.zOrder >= 0) {
                child.visit(context, rect);
            }
        });

        context.restore();
    },
    transform: function (context) {
        // Translate
        if (this.isRelativeAnchorPoint && (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0)) {
            context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
        }

        if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
            context.translate(Math.round(this.position.x + this.anchorPointInPixels.x), Math.round(this.position.y + this.anchorPointInPixels.y));
        } else {
            context.translate(Math.round(this.position.x), Math.round(this.position.y));
        }

        // Rotate
        context.rotate(geo.degreesToRadians(this.get('rotation')));

        // Scale
        context.scale(this.scaleX, this.scaleY);

        if (this.anchorPointInPixels.x !== 0 || this.anchorPointInPixels.y !== 0) {
            context.translate(Math.round(-this.anchorPointInPixels.x), Math.round(-this.anchorPointInPixels.y));
        }
    },

    runAction: function (action) {
        ActionManager.get('sharedManager').addAction({action: action, target: this, paused: this.get('isRunning')});
    },
    
    /**
     * @opts {String} tag Tag of the action to return
     */
    getAction: function(opts) {
        return ActionManager.get('sharedManager').getActionFromTarget({target: this, tag: opts.tag});
    },
    
    nodeToParentTransform: function () {
        if (this.isTransformDirty) {
            this.transformMatrix = geo.affineTransformIdentity();

            if (!this.isRelativeAnchorPoint && !geo.pointEqualToPoint(this.anchorPointInPixels, ccp(0, 0))) {
                this.transformMatrix = geo.affineTransformTranslate(this.transformMatrix, this.anchorPointInPixels.x, this.anchorPointInPixels.y);
            }

            if (!geo.pointEqualToPoint(this.position, ccp(0, 0))) {
                this.transformMatrix = geo.affineTransformTranslate(this.transformMatrix, this.position.x, this.position.y);
            }

            if (this.rotation !== 0) {
                this.transformMatrix = geo.affineTransformRotate(this.transformMatrix, -geo.degreesToRadians(this.rotation));
            }
            if (!(this.scaleX == 1 && this.scaleY == 1)) {
                this.transformMatrix = geo.affineTransformScale(this.transformMatrix, this.scaleX, this.scaleY);
            }

            if (!geo.pointEqualToPoint(this.anchorPointInPixels, ccp(0, 0))) {
                this.transformMatrix = geo.affineTransformTranslate(this.transformMatrix, -this.anchorPointInPixels.x, -this.anchorPointInPixels.y);
            }

            this.set('isTransformDirty', false);

        }

        return this.transformMatrix;
    },

    parentToNodeTransform: function () {
        // TODO
    },

    nodeToWorldTransform: function () {
        var t = this.nodeToParentTransform();

        var p;
        for (p = this.get('parent'); p; p = p.get('parent')) {
            t = geo.affineTransformConcat(t, p.nodeToParentTransform());
        }

        return t;
    },

    worldToNodeTransform: function () {
        return geo.affineTransformInvert(this.nodeToWorldTransform());
    },

    convertToNodeSpace: function (worldPoint) {
        return geo.pointApplyAffineTransform(worldPoint, this.worldToNodeTransform());
    },

    /**
     * @getter boundingBox
     * @type geometry.Rect
     */
    get_boundingBox: function () {
        var cs = this.get('contentSize');
        var rect = geo.rectMake(0, 0, cs.width, cs.height);
        rect = geo.rectApplyAffineTransform(rect, this.nodeToParentTransform());
        return rect;
    },

    /**
     * @getter worldBoundingBox
     * @type geometry.Rect
     */
    get_worldBoundingBox: function () {
        var cs = this.get('contentSize');

        var rect = geo.rectMake(0, 0, cs.width, cs.height);
        rect = geo.rectApplyAffineTransform(rect, this.nodeToWorldTransform());
        return rect;
    },

    /**
     * The area of the node currently visible on screen. Returns an rect even
     * if visible is false.
     *
     * @getter visibleRect
     * @type geometry.Rect
     */
    get_visibleRect: function () {
        var s = require('../Director').Director.get('sharedDirector').get('winSize');
        var rect = new geo.Rect(
            0, 0,
            s.width, s.height
        );

        return geo.rectApplyAffineTransform(rect, this.worldToNodeTransform());
    },

    /**
     * @private
     */
    _dirtyTransform: function () {
        this.set('isTransformDirty', true);
    },

    /**
     * Schedules a custom method with an interval time in seconds.
     * If time is 0 it will be ticked every frame.
     * If time is 0, it is recommended to use 'scheduleUpdate' instead.
     * 
     * If the method is already scheduled, then the interval parameter will
     * be updated without scheduling it again.
     *
     * @opt {String|Function} method Function of method name to schedule
     * @opt {Float} [interval=0] Interval in seconds
     */
    schedule: function (opts) {
        if (typeof opts == 'string') {
            return this.schedule({method: opts, interval: 0});
        }

        opts.interval = opts.interval || 0;

        Scheduler.get('sharedScheduler').schedule({target: this, method: opts.method, interval: opts.interval, paused: this.isRunning});
    },

    /**
     * Unschedules a custom method
     *
     * @param {String|Function} method
     */
    unschedule: function (method) {
        if (!method) {
            return;
        }

        if (typeof method == 'string') {
            method = this[method];
        }
        
        Scheduler.get('sharedScheduler').unschedule({target: this, method: method});
    }

});

module.exports.Node = Node;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/PreloadScene.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var Scene       = require('./Scene').Scene,
    Director    = require('../Director').Director,
    Label       = require('./Label').Label,
    ProgressBar = require('./ProgressBar').ProgressBar,
    Preloader   = require('../Preloader').Preloader,
    RemoteResource = require('../RemoteResource').RemoteResource,
    geo         = require('geometry'),
    util        = require('util'),
    events      = require('events');

var PreloadScene = Scene.extend(/** @lends cocos.nodes.PreloadScene# */{
    progressBar: null,
    label: null,
    preloader: null,
    isReady: false, // True when both progress bar images have loaded
    emptyImage: "/__builtin__/libs/cocos2d/resources/progress-bar-empty.png",
    fullImage:  "/__builtin__/libs/cocos2d/resources/progress-bar-full.png",

    /**
     * @memberOf cocos.nodes
     * @extends cocos.nodes.Scene
     * @constructs
     */
    init: function (opts) {
        PreloadScene.superclass.init.call(this, opts);
        var size = Director.get('sharedDirector').get('winSize');

        // Setup 'please wait' label
        var label = Label.create({
            fontSize: 14,
            fontName: 'Helvetica',
            fontColor: '#ffffff',
            string: 'Please wait...'
        });
        label.set('position', new geo.Point(size.width / 2, (size.height / 2) + 32));
        this.set('label', label);
        this.addChild({child: label});

        // Setup preloader
        var preloader = Preloader.create();
        this.set('preloader', preloader);
        var self = this;

        // Listen for preload events
        events.addListener(preloader, 'load', function (uri, preloader) {
            var loaded = preloader.get('loaded'),
                count = preloader.get('count');
            //console.log("Loaded: %d%% -- %d of %d -- %s", (loaded / count) * 100, loaded, count, uri);
            events.trigger(self, 'load', uri, preloader);
        });

        events.addListener(preloader, 'complete', function (preloader) {
            events.trigger(self, 'complete', preloader);
        });


        // Load the images used by the progress bar
        var emptyImage = resource(this.get('emptyImage')),
            fullImage  = resource(this.get('fullImage'));


        var loaded = 0;
        function imageLoaded() {
            if (loaded == 2) {
                this.isReady = true;
                this.createProgressBar();
                if (this.get('isRunning')) {
                    preloader.load();
                }
            }
        }

        if (emptyImage instanceof RemoteResource) {
            events.addListener(emptyImage, 'load', util.callback(this, function() {
                loaded++;
                imageLoaded.call(this);
            }));
            emptyImage.load();
        } else {
            loaded++;
            imageLoaded.call(this);
        }
        if (fullImage instanceof RemoteResource) {
            events.addListener(fullImage, 'load', util.callback(this, function() {
                loaded++;
                imageLoaded.call(this);
            }));
            fullImage.load();
        } else {
            loaded++;
            imageLoaded.call(this);
        }

    },

    createProgressBar: function () {
        var preloader = this.get('preloader'),
            size = Director.get('sharedDirector').get('winSize');

        var progressBar = ProgressBar.create({
            emptyImage: "/__builtin__/libs/cocos2d/resources/progress-bar-empty.png",
            fullImage:  "/__builtin__/libs/cocos2d/resources/progress-bar-full.png"
        });

        progressBar.set('position', new geo.Point(size.width / 2, size.height / 2));

        this.set('progressBar', progressBar);
        this.addChild({child: progressBar});

        progressBar.bindTo('maxValue', preloader, 'count');
        progressBar.bindTo('value',    preloader, 'loaded');
    },

    onEnter: function () {
        PreloadScene.superclass.onEnter.call(this);
        var preloader = this.get('preloader');

        // Preload everything
        if (this.isReady) {
            preloader.load();
        }
    }
});

exports.PreloadScene = PreloadScene;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/ProgressBar.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var Node   = require('./Node').Node,
    util   = require('util'),
    geo    = require('geometry'),
    events = require('events'),
    Sprite = require('./Sprite').Sprite;

var ProgressBar = Node.extend(/** @lends cocos.nodes.ProgressBar# */{
    emptySprite: null,
    fullSprite: null,
    maxValue: 100,
    value: 0,

    /**
     * @memberOf cocos.nodes
     * @extends cocos.nodes.Node
     * @constructs
     */
    init: function (opts) {
        ProgressBar.superclass.init.call(this, opts);
        var size = new geo.Size(272, 32);
        this.set('contentSize', size);

        var s;
        if (opts.emptyImage) {
            s = Sprite.create({file: opts.emptyImage, rect: new geo.Rect(0, 0, size.width, size.height)});
            s.set('anchorPoint', new geo.Point(0, 0));
            this.set('emptySprite', s);
            this.addChild({child: s});
        }
        if (opts.fullImage) {
            s = Sprite.create({file: opts.fullImage, rect: new geo.Rect(0, 0, 0, size.height)});
            s.set('anchorPoint', new geo.Point(0, 0));
            this.set('fullSprite', s);
            this.addChild({child: s});
        }

        events.addListener(this, 'maxvalue_changed', util.callback(this, 'updateImages'));
        events.addListener(this, 'value_changed', util.callback(this, 'updateImages'));

        this.updateImages();
    },

    updateImages: function () {
        var empty = this.get('emptySprite'),
            full  = this.get('fullSprite'),
            value = this.get('value'),
            size  = this.get('contentSize'),
            maxValue = this.get('maxValue'),
            ratio = (value / maxValue);

        var diff = Math.round(size.width * ratio);
        if (diff === 0) {
            full.set('visible', false);
        } else {
            full.set('visible', true);
            full.set('rect', new geo.Rect(0, 0, diff, size.height));
            full.set('contentSize', new geo.Size(diff, size.height));
        }

        if ((size.width - diff) === 0) {
            empty.set('visible', false);
        } else {
            empty.set('visible', true);
            empty.set('rect', new geo.Rect(diff, 0, size.width - diff, size.height));
            empty.set('position', new geo.Point(diff, 0));
            empty.set('contentSize', new geo.Size(size.width - diff, size.height));
        }
    }
});

exports.ProgressBar = ProgressBar;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/RenderTexture.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    evt = require('events'),
    Node = require('./Node').Node,
    geo = require('geometry'),
    Sprite = require('./Sprite').Sprite,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    ccp = geo.ccp;

var RenderTexture = Node.extend(/** @lends cocos.nodes.RenderTexture# */{
    canvas: null,
    context: null,
    sprite: null,

    /** 
     * An in-memory canvas which can be drawn to in the background before drawing on screen
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {Integer} width The width of the canvas
     * @opt {Integer} height The height of the canvas
     */
    init: function (opts) {
        RenderTexture.superclass.init.call(this, opts);

        var width = opts.width,
            height = opts.height;

        evt.addListener(this, 'contentsize_changed', util.callback(this, this._resizeCanvas));

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        var atlas = TextureAtlas.create({canvas: this.canvas});
        this.sprite = Sprite.create({textureAtlas: atlas, rect: {origin: ccp(0, 0), size: {width: width, height: height}}});

        this.set('contentSize', geo.sizeMake(width, height));
        this.addChild(this.sprite);
        this.set('anchorPoint', ccp(0, 0));
        this.sprite.set('anchorPoint', ccp(0, 0));

    },

    /**
     * @private
     */
    _resizeCanvas: function () {
        var size = this.get('contentSize'),
            canvas = this.get('canvas');

        canvas.width  = size.width;
        canvas.height = size.height;
        if (FLIP_Y_AXIS) {
            this.context.scale(1, -1);
            this.context.translate(0, -canvas.height);
        }

        var s = this.get('sprite');
        if (s) {
            s.set('textureRect', {rect: geo.rectMake(0, 0, size.width, size.height)});
        }
    },

    /**
     * Clear the canvas
     */
    clear: function (rect) {
        if (rect) {
            this.context.clearRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
        } else {
            this.canvas.width = this.canvas.width;
            if (FLIP_Y_AXIS) {
                this.context.scale(1, -1);
                this.context.translate(0, -this.canvas.height);
            }
        }
    }
});

module.exports.RenderTexture = RenderTexture;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Scene.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var Node = require('./Node').Node,
    geo = require('geometry');

var Scene = Node.extend(/** @lends cocos.nodes.Scene */{
    /**
     * Everything in your view will be a child of this object. You need at least 1 scene per app.
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     */
    init: function () {
        Scene.superclass.init.call(this);


        var Director = require('../Director').Director;
        var s = Director.get('sharedDirector').get('winSize');
        this.set('isRelativeAnchorPoint', false);
        this.anchorPoint = new geo.Point(0.5, 0.5);
        this.set('contentSize', s);
    }

});

module.exports.Scene = Scene;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/Sprite.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    evt = require('events'),
    Director = require('../Director').Director,
    TextureAtlas = require('../TextureAtlas').TextureAtlas,
    Node = require('./Node').Node,
    geo = require('geometry'),
    ccp = geo.ccp;

var Sprite = Node.extend(/** @lends cocos.nodes.Sprite# */{
    textureAtlas: null,
    rect: null,
    dirty: true,
    recursiveDirty: true,
    quad: null,
    flipX: false,
    flipY: false,
    offsetPosition: null,
    unflippedOffsetPositionFromCenter: null,
    untrimmedSize: null,

    /**
     * A small 2D graphics than can be animated
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {String} file Path to image to use as sprite atlas
     * @opt {Rect} [rect] The rect in the sprite atlas image file to use as the sprite
     */
    init: function (opts) {
        Sprite.superclass.init.call(this, opts);

        opts = opts || {};

        var file         = opts.file,
            textureAtlas = opts.textureAtlas,
            texture      = opts.texture,
            frame        = opts.frame,
            spritesheet  = opts.spritesheet,
            rect         = opts.rect;

        this.set('offsetPosition', ccp(0, 0));
        this.set('unflippedOffsetPositionFromCenter', ccp(0, 0));


        if (frame) {
            texture = frame.get('texture');
            rect    = frame.get('rect');
        }

        util.each(['scale', 'scaleX', 'scaleY', 'rect', 'flipX', 'flipY', 'contentSize'], util.callback(this, function (key) {
            evt.addListener(this, key.toLowerCase() + '_changed', util.callback(this, this._updateQuad));
        }));
        evt.addListener(this, 'textureatlas_changed', util.callback(this, this._updateTextureQuad));

        if (file || texture) {
            textureAtlas = TextureAtlas.create({file: file, texture: texture});
        } else if (spritesheet) {
            textureAtlas = spritesheet.get('textureAtlas');
            this.set('useSpriteSheet', true);
        } else if (!textureAtlas) {
            //throw "Sprite has no texture";
        }

        if (!rect && textureAtlas) {
            rect = {origin: ccp(0, 0), size: {width: textureAtlas.texture.size.width, height: textureAtlas.texture.size.height}};
        }

        if (rect) {
            this.set('rect', rect);
            this.set('contentSize', rect.size);

            this.quad = {
                drawRect: {origin: ccp(0, 0), size: rect.size},
                textureRect: rect
            };
        }

        this.set('textureAtlas', textureAtlas);

        if (frame) {
            this.set('displayFrame', frame);
        }
    },

    /**
     * @private
     */
    _updateTextureQuad: function (obj, key, texture, oldTexture) {
        if (oldTexture) {
            oldTexture.removeQuad({quad: this.get('quad')});
        }

        if (texture) {
            texture.insertQuad({quad: this.get('quad')});
        }
    },

    /**
     * @setter textureCoords
     * @type geometry.Rect
     */
    set_textureCoords: function (rect) {
        var quad = this.get('quad');
        if (!quad) {
            quad = {
                drawRect: geo.rectMake(0, 0, 0, 0), 
                textureRect: geo.rectMake(0, 0, 0, 0)
            };
        }

        quad.textureRect = util.copy(rect);

        this.set('quad', quad);
    },

    /**
     * @setter textureRect
     * @type geometry.Rect
     */
    set_textureRect: function (opts) {
        var rect = opts.rect,
            rotated = !!opts.rotated,
            untrimmedSize = opts.untrimmedSize || rect.size;

        this.set('contentSize', untrimmedSize);
        this.set('rect', util.copy(rect));
        this.set('textureCoords', rect);

        var quad = this.get('quad');

        var relativeOffset = util.copy(this.get('unflippedOffsetPositionFromCenter'));

        if (this.get('flipX')) {
            relativeOffset.x = -relativeOffset.x;
        }
        if (this.get('flipY')) {
            relativeOffset.y = -relativeOffset.y;
        }

        var offsetPosition = util.copy(this.get('offsetPosition'));
        offsetPosition.x =  relativeOffset.x + (this.get('contentSize').width  - rect.size.width) / 2;
        offsetPosition.y = -relativeOffset.y + (this.get('contentSize').height - rect.size.height) / 2;

        quad.drawRect.origin = util.copy(offsetPosition);
        quad.drawRect.size = util.copy(rect.size);
        if (this.flipX) {
            quad.drawRect.size.width *= -1;
            quad.drawRect.origin.x = -rect.size.width;
        }
        if (this.flipY) {
            quad.drawRect.size.height *= -1;
            quad.drawRect.origin.y = -rect.size.height;
        }

        this.set('quad', quad);
    },

    /**
     * @private
     */
    _updateQuad: function () {
        if (!this.get('rect')) {
            return;
        }
        if (!this.quad) {
            this.quad = {
                drawRect: geo.rectMake(0, 0, 0, 0), 
                textureRect: geo.rectMake(0, 0, 0, 0)
            };
        }

        var relativeOffset = util.copy(this.get('unflippedOffsetPositionFromCenter'));

        if (this.get('flipX')) {
            relativeOffset.x = -relativeOffset.x;
        }
        if (this.get('flipY')) {
            relativeOffset.y = -relativeOffset.y;
        }

        var offsetPosition = util.copy(this.get('offsetPosition'));
        offsetPosition.x = relativeOffset.x + (this.get('contentSize').width  - this.get('rect').size.width) / 2;
        offsetPosition.y = relativeOffset.y + (this.get('contentSize').height - this.get('rect').size.height) / 2;

        this.quad.textureRect = util.copy(this.rect);
        this.quad.drawRect.origin = util.copy(offsetPosition);
        this.quad.drawRect.size = util.copy(this.rect.size);

        if (this.flipX) {
            this.quad.drawRect.size.width *= -1;
            this.quad.drawRect.origin.x = -this.rect.size.width;
        }
        if (this.flipY) {
            this.quad.drawRect.size.height *= -1;
            this.quad.drawRect.origin.y = -this.rect.size.height;
        }
    },

    updateTransform: function (ctx) {
        if (!this.useSpriteSheet) {
            throw "updateTransform is only valid when Sprite is being rendered using a SpriteSheet";
        }

        if (!this.visible) {
            this.set('dirty', false);
            this.set('recursiveDirty', false);
            return;
        }

        // TextureAtlas has hard reference to this quad so we can just update it directly
        this.quad.drawRect.origin = {
            x: this.position.x - this.anchorPointInPixels.x * this.scaleX,
            y: this.position.y - this.anchorPointInPixels.y * this.scaleY
        };
        this.quad.drawRect.size = {
            width: this.rect.size.width * this.scaleX,
            height: this.rect.size.height * this.scaleY
        };

        this.set('dirty', false);
        this.set('recursiveDirty', false);
    },

    draw: function (ctx) {
        if (!this.quad) {
            return;
        }
        this.get('textureAtlas').drawQuad(ctx, this.quad);
    },

    isFrameDisplayed: function (frame) {
        if (!this.rect || !this.textureAtlas) {
            return false;
        }
        return (frame.texture === this.textureAtlas.texture && geo.rectEqualToRect(frame.rect, this.rect));
    },


    /**
     * @setter displayFrame
     * @type cocos.SpriteFrame
     */
    set_displayFrame: function (frame) {
        if (!frame) {
            delete this.quad;
            return;
        }
        this.set('unflippedOffsetPositionFromCenter', util.copy(frame.offset));


        // change texture
        if (!this.textureAtlas || frame.texture !== this.textureAtlas.texture) {
            this.set('textureAtlas', TextureAtlas.create({texture: frame.texture}));
        }

        this.set('textureRect', {rect: frame.rect, rotated: frame.rotated, untrimmedSize: frame.originalSize});
    }
});

module.exports.Sprite = Sprite;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/TMXLayer.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    SpriteBatchNode = require('./BatchNode').SpriteBatchNode,
    Sprite = require('./Sprite').Sprite,
    TMXOrientationOrtho = require('../TMXOrientation').TMXOrientationOrtho,
    TMXOrientationHex   = require('../TMXOrientation').TMXOrientationHex,
    TMXOrientationIso   = require('../TMXOrientation').TMXOrientationIso,
    geo    = require('geometry'),
    ccp    = geo.ccp,
    Node = require('./Node').Node;

var TMXLayer = SpriteBatchNode.extend(/** @lends cocos.nodes.TMXLayer# */{
    layerSize: null,
    layerName: '',
    tiles: null,
    tilset: null,
    layerOrientation: 0,
    mapTileSize: null,
    properties: null,

    /** 
     * A tile map layer loaded from a TMX file. This will probably automatically be made by cocos.TMXTiledMap
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.SpriteBatchNode
     *
     * @opt {cocos.TMXTilesetInfo} tilesetInfo
     * @opt {cocos.TMXLayerInfo} layerInfo
     * @opt {cocos.TMXMapInfo} mapInfo
     */
    init: function (opts) {
        var tilesetInfo = opts.tilesetInfo,
            layerInfo = opts.layerInfo,
            mapInfo = opts.mapInfo;

        var size = layerInfo.get('layerSize'),
            totalNumberOfTiles = size.width * size.height;

        var tex = null;
        if (tilesetInfo) {
            tex = tilesetInfo.sourceImage;
        }

        TMXLayer.superclass.init.call(this, {file: tex});

        this.set('anchorPoint', ccp(0, 0));

        this.layerName = layerInfo.get('name');
        this.layerSize = layerInfo.get('layerSize');
        this.tiles = layerInfo.get('tiles');
        this.minGID = layerInfo.get('minGID');
        this.maxGID = layerInfo.get('maxGID');
        this.opacity = layerInfo.get('opacity');
        this.properties = util.copy(layerInfo.properties);

        this.tileset = tilesetInfo;
        this.mapTileSize = mapInfo.get('tileSize');
        this.layerOrientation = mapInfo.get('orientation');

        var offset = this.calculateLayerOffset(layerInfo.get('offset'));
        this.set('position', offset);

        this.set('contentSize', geo.sizeMake(this.layerSize.width * this.mapTileSize.width, (this.layerSize.height * (this.mapTileSize.height - 1)) + this.tileset.tileSize.height));
    },

    calculateLayerOffset: function (pos) {
        var ret = ccp(0, 0);

        switch (this.layerOrientation) {
        case TMXOrientationOrtho:
            ret = ccp(pos.x * this.mapTileSize.width, pos.y * this.mapTileSize.height);
            break;
        case TMXOrientationIso:
            // TODO
            break;
        case TMXOrientationHex:
            // TODO
            break;
        }

        return ret;
    },

    setupTiles: function () {
        this.tileset.bindTo('imageSize', this.get('texture'), 'contentSize');


        for (var y = 0; y < this.layerSize.height; y++) {
            for (var x = 0; x < this.layerSize.width; x++) {
                
                var pos = x + this.layerSize.width * y,
                    gid = this.tiles[pos];
                
                if (gid !== 0) {
                    this.appendTile({gid: gid, position: ccp(x, y)});
                    
                    // Optimization: update min and max GID rendered by the layer
                    this.minGID = Math.min(gid, this.minGID);
                    this.maxGID = Math.max(gid, this.maxGID);
                }
            }
        }
    },
    appendTile: function (opts) {
        var gid = opts.gid,
            pos = opts.position;

        var z = pos.x + pos.y * this.layerSize.width;
            
        var rect = this.tileset.rectForGID(gid);
        var tile = Sprite.create({rect: rect, textureAtlas: this.textureAtlas});
        tile.set('position', this.positionAt(pos));
        tile.set('anchorPoint', ccp(0, 0));
        tile.set('opacity', this.get('opacity'));
        
        this.addChild({child: tile, z: 0, tag: z});
    },
    positionAt: function (pos) {
        switch (this.layerOrientation) {
        case TMXOrientationOrtho:
            return this.positionForOrthoAt(pos);
        case TMXOrientationIso:
            return this.positionForIsoAt(pos);
        /*
        case TMXOrientationHex:
            // TODO
        */
        default:
            return ccp(0, 0);
        }
    },
    positionForOrthoAt: function (pos) {
        var overlap = this.mapTileSize.height - this.tileset.tileSize.height;
        var x = Math.floor(pos.x * this.mapTileSize.width + 0.49);
        var y;
        if (FLIP_Y_AXIS) {
            y = Math.floor((this.get('layerSize').height - pos.y - 1) * this.mapTileSize.height + 0.49);
        } else {
            y = Math.floor(pos.y * this.mapTileSize.height + 0.49) + overlap;
        }
        return ccp(x, y);
    },

    positionForIsoAt: function (pos) {
        var mapTileSize = this.get('mapTileSize'),
            layerSize = this.get('layerSize');

        if (FLIP_Y_AXIS) {
            return ccp(
                mapTileSize.width  / 2 * (layerSize.width + pos.x - pos.y - 1),
                mapTileSize.height / 2 * ((layerSize.height * 2 - pos.x - pos.y) - 2)
            );
        } else {
            throw "Isometric tiles without FLIP_Y_AXIS is currently unsupported";
        }
    },

    /**
     * Get the tile at a specifix tile coordinate
     *
     * @param {geometry.Point} pos Position of tile to get in tile coordinates (not pixels)
     * @returns {cocos.nodes.Sprite} The tile
     */
    tileAt: function (pos) {
        var layerSize = this.get('layerSize'),
            tiles = this.get('tiles');

        if (pos.x < 0 || pos.y < 0 || pos.x >= layerSize.width || pos.y >= layerSize.height) {
            throw "TMX Layer: Invalid position";
        }

        var tile,
            gid = this.tileGIDAt(pos);

        // if GID is 0 then no tile exists at that point
        if (gid) {
            var z = pos.x + pos.y * layerSize.width;
            tile = this.getChild({tag: z});
        }

        return tile;
    },


    tileGID: function (pos) {
        var tilesPerRow = this.get('layerSize').width,
            tilePos = pos.x + (pos.y * tilesPerRow);

        return this.tiles[tilePos];
    },
    tileGIDAt: function (pos) {
        return this.tileGID(pos);
    },

    removeTile: function (pos) {
        var gid = this.tileGID(pos);
        if (gid === 0) {
            // Tile is already blank
            return;
        }

        var tiles = this.get('tiles'),
            tilesPerRow = this.get('layerSize').width,
            tilePos = pos.x + (pos.y * tilesPerRow);


        tiles[tilePos] = 0;

        var sprite = this.getChild({tag: tilePos});
        if (sprite) {
            this.removeChild({child: sprite});
        }
    }
});

exports.TMXLayer = TMXLayer;

}};
__resources__["/__builtin__/libs/cocos2d/nodes/TMXTiledMap.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray console*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry'),
    ccp = geo.ccp,
    Node = require('./Node').Node,
    TMXOrientationOrtho = require('../TMXOrientation').TMXOrientationOrtho,
    TMXOrientationHex   = require('../TMXOrientation').TMXOrientationHex,
    TMXOrientationIso   = require('../TMXOrientation').TMXOrientationIso,
    TMXLayer   = require('./TMXLayer').TMXLayer,
    TMXMapInfo = require('../TMXXMLParser').TMXMapInfo;

var TMXTiledMap = Node.extend(/** @lends cocos.nodes.TMXTiledMap# */{
    mapSize: null,
    tileSize: null,
    mapOrientation: 0,
    objectGroups: null,
    properties: null,
    tileProperties: null,

    /**
     * A TMX Map loaded from a .tmx file
     *
     * @memberOf cocos.nodes
     * @constructs
     * @extends cocos.nodes.Node
     *
     * @opt {String} file The file path of the TMX map to load
     */
    init: function (opts) {
        TMXTiledMap.superclass.init.call(this, opts);

        this.set('anchorPoint', ccp(0, 0));

        var mapInfo = TMXMapInfo.create(opts.file);

        this.mapSize        = mapInfo.get('mapSize');
        this.tileSize       = mapInfo.get('tileSize');
        this.mapOrientation = mapInfo.get('orientation');
        this.objectGroups   = mapInfo.get('objectGroups');
        this.properties     = mapInfo.get('properties');
        this.tileProperties = mapInfo.get('tileProperties');

        // Add layers to map
        var idx = 0;
        util.each(mapInfo.layers, util.callback(this, function (layerInfo) {
            if (layerInfo.get('visible')) {
                var child = this.parseLayer({layerInfo: layerInfo, mapInfo: mapInfo});
                this.addChild({child: child, z: idx, tag: idx});

                var childSize   = child.get('contentSize');
                var currentSize = this.get('contentSize');
                currentSize.width  = Math.max(currentSize.width,  childSize.width);
                currentSize.height = Math.max(currentSize.height, childSize.height);
                this.set('contentSize', currentSize);

                idx++;
            }
        }));
    },
    
    parseLayer: function (opts) {
        var tileset = this.tilesetForLayer(opts);
        var layer = TMXLayer.create({tilesetInfo: tileset, layerInfo: opts.layerInfo, mapInfo: opts.mapInfo});

        layer.setupTiles();

        return layer;
    },

    tilesetForLayer: function (opts) {
        var layerInfo = opts.layerInfo,
            mapInfo = opts.mapInfo,
            size = layerInfo.get('layerSize');

        // Reverse loop
        var tileset;
        for (var i = mapInfo.tilesets.length - 1; i >= 0; i--) {
            tileset = mapInfo.tilesets[i];

            for (var y = 0; y < size.height; y++) {
                for (var x = 0; x < size.width; x++) {
                    var pos = x + size.width * y, 
                        gid = layerInfo.tiles[pos];

                    if (gid !== 0 && gid >= tileset.firstGID) {
                        return tileset;
                    }
                } // for (var x
            } // for (var y
        } // for (var i

        //console.log("cocos2d: Warning: TMX Layer '%s' has no tiles", layerInfo.name);
        return tileset;
    },

    /**
     * Get a layer
     *
     * @opt {String} name The name of the layer to get
     * @returns {cocos.nodes.TMXLayer} The layer requested
     */
    getLayer: function (opts) {
        var layerName = opts.name,
            layer = null;

        this.get('children').forEach(function (item) {
            if (item instanceof TMXLayer && item.layerName == layerName) {
                layer = item;
            }
        });
        if (layer !== null) {
            return layer;
        }
    },
    
    /**
     * Return the ObjectGroup for the secific group
     *
     * @opt {String} name The object group name
     * @returns {cocos.TMXObjectGroup} The object group
     */
    getObjectGroup: function (opts) {
        var objectGroupName = opts.name,
            objectGroup = null;

        this.objectGroups.forEach(function (item) {
            if (item.name == objectGroupName) {
                objectGroup = item;
            }
        });
        if (objectGroup !== null) {
            return objectGroup;
        }
    },

    /**
     * @deprected Since v0.2. You should now use cocos.TMXTiledMap#getObjectGroup.
     */
    objectGroupNamed: function (opts) {
        console.warn('TMXTiledMap#objectGroupNamed is deprected. Use TMXTiledMap#getObjectGroup instread');
        return this.getObjectGroup(opts);
    }
});

exports.TMXTiledMap = TMXTiledMap;


}};
__resources__["/__builtin__/libs/cocos2d/nodes/Transition.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var geo             = require('geometry'),
    util            = require('util'),
    actions         = require('../actions'),
    Scene           = require('./Scene').Scene,
    Director        = require('../Director').Director,
    EventDispatcher = require('../EventDispatcher').EventDispatcher,
    Scheduler       = require('../Scheduler').Scheduler;

/** Orientation Type used by some transitions
 */
var tOrientation = {
    kOrientationLeftOver: 0,
    kOrientationRightOver: 1,
    kOrientationUpOver: 0,
    kOrientationDownOver: 1
};

/**
 */
var TransitionScene = Scene.extend(/** @lends cocos.nodes.TransitionScene */{
    /**
     * Incoming scene
     * @type {cocos.nodes.Scene}
     */
    inScene: null,

    /**
     * Outgoing (current) scene
     * @type {cocos.nodes.Scene}
     */
    outScene: null,

    /**
     * transition duration
     * @type Float
     */
    duration: null,

    inSceneOnTop: null,
    sendCleanupToScene: null,

    /**
     * @class Base class for Transition scenes
     * @memberOf cocos.nodes
     * @extends cocos.nodes.Scene
     * @constructs
     *
     * @opt {Float} duration How long the transition should last
     * @opt {cocos.nodes.Scene} scene Income scene
     */
    init: function (opts) {
        TransitionScene.superclass.init.call(this, opts);

        this.set('duration', opts.duration);
        if (!opts.scene) {
            throw "TransitionScene requires scene property";
        }
        this.set('inScene', opts.scene);
        this.set('outScene', Director.get('sharedDirector')._runningScene);

        if (this.inScene == this.outScene) {
            throw "Incoming scene must be different from the outgoing scene";
        }
        EventDispatcher.get('sharedDispatcher').set('dispatchEvents', false);
        this.sceneOrder();
    },

    /**
     * Called after the transition finishes
     */
    finish: function () {
        var is = this.get('inScene'),
            os = this.get('outScene');

        /* clean up */
        is.set('visible', true);
        is.set('position', geo.PointZero());
        is.set('scale', 1.0);
        is.set('rotation', 0);

        os.set('visible', false);
        os.set('position', geo.PointZero());
        os.set('scale', 1.0);
        os.set('rotation', 0);

        Scheduler.get('sharedScheduler').schedule({
            target: this,
            method: this.setNewScene,
            interval: 0
        });
    },

    /**
     * Used by some transitions to hide the outer scene
     */
    hideOutShowIn: function () {
        this.get('inScene').set('visible', true);
        this.get('outScene').set('visible', false);
    },
    
    setNewScene: function (dt) {
        var dir = Director.get('sharedDirector');
        
        this.unscheduleSelector(this.setNewScene);
        // Save 'send cleanup to scene'
        // Not sure if it's cool to be accessing all these Director privates like this...
        this.set('sendCleanupToScene', dir._sendCleanupToScene);
        
        dir.replaceScene(this.get('inScene'));
        
        // enable events while transitions
        EventDispatcher.get('sharedDispatcher').set('dispatchEvents', true);

        // issue #267 
        this.get('outScene').set('visible', true);
    },

    sceneOrder: function () {
        this.set('inSceneOnTop', true);
    },

    draw: function (context, rect) {
        if (this.get('inSceneOnTop')) {
            this.get('outScene').visit(context, rect);
            this.get('inScene').visit(context, rect);
        } else {
            this.get('inScene').visit(context, rect);
            this.get('outScene').visit(context, rect);
        }
    },
    
    onEnter: function () {
        TransitionScene.superclass.onEnter.call(this);
        this.get('inScene').onEnter();
        // outScene_ should not receive the onEnter callback
    },

    onExit: function () {
        TransitionScene.superclass.onExit.call(this);
        this.get('outScene').onExit();
        // inScene_ should not receive the onExit callback
        // only the onEnterTransitionDidFinish
        if (this.get('inScene').hasOwnProperty('onEnterTransitionDidFinish')) {
            this.get('inScene').onEnterTransitionDidFinish();
        }
    },

    cleanup: function () {
        TransitionScene.superclass.cleanup.call(this);

        if (this.get('sendCleanupToScene')) {
            this.get('outScene').cleanup();
        }
    }
});

/**
 * @class Rotate and zoom out the outgoing scene, and then rotate and zoom in the incoming 
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionScene
 */
var TransitionRotoZoom = TransitionScene.extend(/** @lends cocos.nodes.TransitionRotoZoom */{
    onEnter: function() {
        TransitionRotoZoom.superclass.onEnter.call(this);
        
        var dur = this.get('duration');
        this.get('inScene').set('scale', 0.001);
        this.get('outScene').set('scale', 1.0);
        
        this.get('inScene').set('anchorPoint', geo.ccp(0.5, 0.5));
        this.get('outScene').set('anchorPoint', geo.ccp(0.5, 0.5));
        
        var outzoom = [
            actions.Spawn.initWithActions({actions: [
                actions.ScaleBy.create({scale: 0.001, duration: dur/2}),
                actions.RotateBy.create({angle: 360*2, duration: dur/2})
                ]}),
            actions.DelayTime.create({duration: dur/2})];
        
        // Can't nest sequences or reverse them very easily, so incoming scene actions must be put 
        // together manually for now...
        var inzoom = [
            actions.DelayTime.create({duration: dur/2}),
            
            actions.Spawn.initWithActions({actions: [
                actions.ScaleTo.create({scale: 1.0, duration: dur/2}),
                actions.RotateBy.create({angle: -360*2, duration: dur/2})
                ]}),
            actions.CallFunc.create({
                target: this,
                method: this.finish
            })
        ];
        
        // Sequence init() copies actions
        this.get('outScene').runAction(actions.Sequence.create({actions: outzoom}));
        this.get('inScene').runAction(actions.Sequence.create({actions: inzoom}));
    }
});

/**
 * @class Move in from to the left the incoming scene.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionScene
 */
var TransitionMoveInL = TransitionScene.extend(/** @lends cocos.nodes.TransitionMoveInL */{
    onEnter: function () {
        TransitionMoveInL.superclass.onEnter.call(this);

        this.initScenes();

        this.get('inScene').runAction(actions.Sequence.create({actions: [
            this.action(),
            actions.CallFunc.create({
                target: this,
                method: this.finish
            })]
        }));
    },
    
    action: function () {
        return actions.MoveTo.create({
            position: geo.ccp(0, 0),
            duration: this.get('duration')
        });
    },
    
    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(-s.width, 0));
    }
});
    
/**
 * @class Move in from to the right the incoming scene.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionMoveInL
 */
var TransitionMoveInR = TransitionMoveInL.extend(/** @lends cocos.nodes.TransitionMoveInR */{
    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(s.width, 0));
    }
});

/**
 * @class Move the incoming scene in from the top.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionMoveInL
 */
var TransitionMoveInT = TransitionMoveInL.extend(/** @lends cocos.nodes.TransitionMoveInT */{
    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(0, s.height));
    }
});

/**
 * @class Move the incoming scene in from the bottom.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionMoveInL
 */
var TransitionMoveInB = TransitionMoveInL.extend(/** @lends cocos.nodes.TransitionMoveInB */{
    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(0, -s.height));
    }
});

/**
 * @class Slide in the incoming scene from the left.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionScene
 */
var TransitionSlideInL = TransitionScene.extend(/** @lends cocos.nodes.TransitionSlideInL */{
    onEnter: function () {
        TransitionSlideInL.superclass.onEnter.call(this);

        this.initScenes();

        var movein = this.action();
        var moveout = this.action();
        var outAction = actions.Sequence.create({
            actions: [
            moveout, 
            actions.CallFunc.create({
                target: this,
                method: this.finish
            })]
        });
        this.get('inScene').runAction(movein);
        this.get('outScene').runAction(outAction);
    },

    sceneOrder: function () {
        this.set('inSceneOnTop', false);
    },

    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(-s.width, 0));
    },
    
    action: function () {
        var s = Director.get('sharedDirector').get('winSize');
        return actions.MoveBy.create({
            position: geo.ccp(s.width, 0),
            duration: this.get('duration')
        });
    }
});

/** 
 * @class Slide in the incoming scene from the right.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionSlideInL
 */
var TransitionSlideInR = TransitionSlideInL.extend(/** @lends cocos.nodes.TransitionSlideInR */{
    sceneOrder: function () {
        this.set('inSceneOnTop', true);
    },

    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(s.width, 0));
    },
    
    action: function () {
        var s = Director.get('sharedDirector').get('winSize');
        return actions.MoveBy.create({
            position: geo.ccp(-s.width, 0),
            duration: this.get('duration')
        });
    }
});

/**
 * @class Slide in the incoming scene from the top.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionSlideInL
 */
var TransitionSlideInT = TransitionSlideInL.extend(/** @lends cocos.nodes.TransitionSlideInT */{
    sceneOrder: function () {
        this.set('inSceneOnTop', false);
    },

    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(0, s.height));
    },
    
    action: function () {
        var s = Director.get('sharedDirector').get('winSize');
        return actions.MoveBy.create({
            position: geo.ccp(0, -s.height),
            duration: this.get('duration')
        });
    }
});

/**
 * @class Slide in the incoming scene from the bottom.
 * @memberOf cocos.nodes
 * @extends cocos.nodes.TransitionSlideInL
 */
var TransitionSlideInB = TransitionSlideInL.extend(/** @lends cocos.nodes.TransitionSlideInB */{
    sceneOrder: function () {
        this.set('inSceneOnTop', true);
    },

    initScenes: function () {
        var s = Director.get('sharedDirector').get('winSize');
        this.get('inScene').set('position', geo.ccp(0, -s.height));
    },
    
    action: function () {
        var s = Director.get('sharedDirector').get('winSize');
        return actions.MoveBy.create({
            position: geo.ccp(0, s.height),
            duration: this.get('duration')
        });
    }
});

exports.TransitionScene = TransitionScene;
exports.TransitionRotoZoom = TransitionRotoZoom;
exports.TransitionMoveInL = TransitionMoveInL;
exports.TransitionMoveInR = TransitionMoveInR;
exports.TransitionMoveInT = TransitionMoveInT;
exports.TransitionMoveInB = TransitionMoveInB;
exports.TransitionSlideInL = TransitionSlideInL;
exports.TransitionSlideInR = TransitionSlideInR;
exports.TransitionSlideInT = TransitionSlideInT;
exports.TransitionSlideInB = TransitionSlideInB;

}};
__resources__["/__builtin__/libs/cocos2d/Preloader.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events');

var Preloader = BObject.extend(/** @lends cocos.Preloader# */{
    /**
     * Total number of resources.
     * @type Integer
     */
    count: -1,

    /**
     * Number of resources that have finished loading
     * @type Integer
     */
    loaded: 0,

    _listeners: null,

    /**
     * @class Preloads all remote resources
     * @memberOf cocos
     * @extends BObject
     * @constructs
     */
    init: function (opts) {
        Preloader.superclass.init.call(this, opts);

        this._listeners = {};
        this.set('count', Object.keys(__remote_resources__).length);
    },

    load: function() {
        this.set('loaded', 0);
        this.set('count', Object.keys(__remote_resources__).length);

        for (var uri in __remote_resources__) {
            if (__remote_resources__.hasOwnProperty(uri)) {
                if (__resources__[uri]) {
                    // Already loaded
                    this.didLoadResource(uri);
                    continue;
                }
                var file = resource(uri);

                // Notify when a resource has loaded
                this._listeners[uri] = events.addListener(file, 'load', util.callback(this, (function(uri) {
                    return function () { this.didLoadResource(uri); };
                })(uri)));

                file.load()
            }
        }
    },
    
    didLoadResource: function(uri) {
        this.set('loaded', this.get('loaded') +1);
        if (this._listeners[uri]) {
            events.removeListener(this._listeners[uri]);
        }
        events.trigger(this, 'load', uri, this);

        if (this.get('loaded') >= this.get('count')) {
            events.trigger(this, 'complete', this);
        }
    }
});

exports.Preloader = Preloader;

}};
__resources__["/__builtin__/libs/cocos2d/RemoteImage.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events'),
    RemoteResource = require('./RemoteResource').RemoteResource;

var RemoteImage = RemoteResource.extend(/** @lends cocos.RemoteImage# */{
    /**
     * @memberOf cocos
     * @extends cocos.RemoteResource
     * @constructs
     */
    init: function (opts) {
        RemoteImage.superclass.init.call(this, opts);
    },

    /**
     * Load a remote image
     * @returns Image
     */
    load: function () {
        var img = new Image();
        var self = this;
        img.onload = function () {
            var path = self.get('path');

            var r = __remote_resources__[path];
            __resources__[path] = util.copy(r);
            __resources__[path].data = img;
            __resources__[path].meta.remote = true;

            events.trigger(self, 'load', self);
        };
        
        img.src = this.get('url');

        return img;
    }
});

exports.RemoteImage = RemoteImage;

}};
__resources__["/__builtin__/libs/cocos2d/RemoteResource.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events');

var RemoteResource = BObject.extend(/** @lends cocos.RemoteResource# */{
    /**
     * The URL to the remote resource
     * @type String
     */
    url: null,

    /**
     * The path used to reference the resource in the app
     * @type String
     */
    path: null,

    /**
     * @memberOf cocos
     * @extends BObject
     * @constructs
     */
    init: function (opts) {
        RemoteResource.superclass.init.call(this, opts);

        this.set('url', opts.url);
        this.set('path', opts.path);
        
    },

    /**
     * Load the remote resource via ajax
     */
    load: function () {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var path = self.get('path');

                var r = __remote_resources__[path];
                __resources__[path] = util.copy(r);
                __resources__[path].data = xhr.responseText;
                __resources__[path].meta.remote = true;

                events.trigger(self, 'load', self);
            }
        };

        xhr.open('GET', this.get('url'), true);  
        xhr.send(null);
    }
});


exports.RemoteResource = RemoteResource;

}};
__resources__["/__builtin__/libs/cocos2d/resources/progress-bar-empty.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAAAgCAYAAADaBycMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwRJREFUeNrsnbFLW1EUxm9cpP0HLDgUC4JDhoJuOggdBYcg7Sw4BSl0K0inItSpUMSp4NxSHAqOBQfdInTIIAQMDoX4D7TNlJ6PnGtOg76mwUXf7wcf5N28LAfy8d6593630uv10ojMmhZNC6aqacY0ZZpMAHBX6ZouTW1T09QwnZhao/y4MoKBLJtqplXTY+oNcO+5MH01HZiOxjWQJ6YN07rpETUFKB0d077po+n8fwzkmemVaSWM6cZvpmPTqenM9MO/+0WtAe4kD0zTpjnTvGnJ//+VcM+h6b3///9pIHpVeZP6vY7MZ9Mnf6QBgPuNWhYvTM/DmHojb/3V5kYDkfO8C+ahx5Zd017qN1sAoBxocqRu2kz9dkY2kdfxSSQaiG76EF5bvpu2TV+oJUBpWTNtmZ6G15mX/nCRJsKNG8E8zjEPAHAP2E6DJuqKe0WKBrKc+rMtmV3MAwCCieyG63X3jCsDUdMkT9WqYbpHzQAgsOfekNwratlAtMJ01b9QQ0SzLTRMASDSdW/ITVN5xqwMRMvT8wpTdVeZqgWA6zhIgxkYecaiDCSu9zimRgBQQPSIBRlINQycUh8AKCB6RFUGMhMGzqgPABQQPWJGC8l+p8GW/IeJfS0AcDPaO/PTP3cnqAcAjIsM5DJcT1MSACggesSlDKQdBuaoDwAUED2iLQNphoF56gMABUSPaMpAGmFgifoAQAHRIxoyEAWoXviA8kBq1AgArqHmHpHcM05kIEpfzilDijFTEhFJ6wAQmXRvyFGH8oxWnsbVGveOf1aMWZ16AUCgngYRhx33jKvt/Eepn76cUYzZGjUDAPeCzXC9757xVyKZotsP/bPiDbcwEQDMw70g56IeulekYQNRZJmi2/OsjDIQd1L/eAd6IgDlYtL/+ztpkIfacI+4OiOGYx0AYJixj3XIcLAUQDm49YOlMhxtCVBuxj7aMrKcOFwboEzcyuHawyh8Wfmp6o0oxUxBRFOJBivAXUZhydqRr0212henXodWp7dG+fEfAQYAt2e24R/QqdsAAAAASUVORK5CYII=")};
__resources__["/__builtin__/libs/cocos2d/resources/progress-bar-full.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAAAgCAYAAADaBycMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5lJREFUeNrsnT9IlVEYxo8uUdTSYmAQBoKDQ6KTf0BocAgcLpKrgjSIBC1mRVNU6hKEOISgaxENQUNDIKh3UmxwEARFKNClpaicbs/D9x6/t4vR9eJy73l+8MDx3O9zeOE8nO8957ynoVQqhQpphXqgLqgdaoGaoHNBCFGrHEGH0B60Ba1Da9BOJS83VGAg/VABGoSuKd5C1D370HvoHbRcrYFch8agUeiKYipEchxAi9ACtHsaA7kJ3YNuuT4++AlahTagbeir/fZLsRaiJjkPNUNtUCfUa+O/wT3zAXph4/+/BsJPlcchy3VE3kCvbUojhKhvmLIYhm67PuZGntinzT8NhM4z7cyD05Y5aD5kyRYhRBpwcWQcmghZOiOayJSfiXgD4UMv3WfLZ+gp9Nb906vQANQHddg7FxVrIWqWHzZR2IRWoI/QF/f7EPQIuuE+Z+7aO38ZyDPogZt53Hfmwe8hJlRHoG7FXIi6pQgthSxxWnImMuNmIs+hh2w0Wkd/yFZbInPOPC7bZ80rmYcQdU+3jfVpG/vBvGDOPTNqnnFsIEyaxKVaJkzn3cyDM5FJxVWIpJi0sR9XY+bNG4J5RSEaCHeYDtoPnLJwtSUmTMdkHkIkbSJj1j4yb4ifNfSMVhoIt6fHHabMrsalWiZMRxRDIZJmxLwgmDfEFRh6Rg8NxO/3WHXtgaCchxCp021ecJJHdNFA2l3Hhmv3KXZCiDIv8B7RTgNpcR3brt2huAkhyrzAe0QL94H8DvmR/AshP9fyPWiTmBAi22x2ydo8O/PT2keNio0QolpoIIfu72bX3lV4hBBlXuA94pAGsuc62lx7U3ETQpR5gfeIPRrIluvodO0VxU0IUeYF3iO2aCDrrqPXtXkqr6jYCZE0RfOCkzxinQbCAqr71sF6IAVr80jvkuInRNIshfx4f8E8IphnrNFAWH05VhniwRlWIorLujzSO6sYCpEks+YBwTxhOOSH6+gZO3EZl3vcD6zNMmbj1ubBmRmZiBBJmsdMyA/PjYe8xOGBecbxcf7lkFVfjrCM2ZC1v4WsjNmdoJyIEPVO0cb6lI39YF4w4Z5ZNM9QSUMhEufMShoSFVUWQpBTF1WO6FoHIdKm6msd/ExEF0sJUf+c+cVSEV1tKUTaVH21pac/6HJtIVLiTC7XLofFl1k/lbkRVjFjIaKmkG86E0LUHlwc4Yl8HqrluTjmOrg7faeSl/8IMABgRvK9Q/ireQAAAABJRU5ErkJggg==")};
__resources__["/__builtin__/libs/cocos2d/Scheduler.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util');

/** @ignore */
function HashUpdateEntry() {
    this.timers = [];
    this.timerIndex = 0;
    this.currentTimer = null;
    this.currentTimerSalvaged = false;
    this.paused = false;
}

/** @ignore */
function HashMethodEntry() {
    this.timers = [];
    this.timerIndex = 0;
    this.currentTimer = null;
    this.currentTimerSalvaged = false;
    this.paused = false;
}

var Timer = BObject.extend(/** @lends cocos.Timer# */{
    callback: null,
    interval: 0,
    elapsed: -1,

    /**
     * Runs a function repeatedly at a fixed interval
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {Function} callback The function to run at each interval
     * @opt {Float} interval Number of milliseconds to wait between each exectuion of callback
     */
    init: function (opts) {
        Timer.superclass.init(this, opts);

        this.set('callback', opts.callback);
        this.set('interval', opts.interval || 0);
        this.set('elapsed', -1);
    },

    /**
     * @private
     */
    update: function (dt) {
        if (this.elapsed == -1) {
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }

        if (this.elapsed >= this.interval) {
            this.callback(this.elapsed);
            this.elapsed = 0;
        }
    }
});


var Scheduler = BObject.extend(/** @lends cocos.Scheduler# */{
    updates0: null,
    updatesNeg: null,
    updatesPos: null,
    hashForUpdates: null,
    hashForMethods: null,
    timeScale: 1.0,

    /**
     * Runs the timers
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     * @singleton
     * @private
     */
    init: function () {
        this.updates0 = [];
        this.updatesNeg = [];
        this.updatesPos = [];
        this.hashForUpdates = {};
        this.hashForMethods = {};
    },

    /**
     * The scheduled method will be called every 'interval' seconds.
     * If paused is YES, then it won't be called until it is resumed.
     * If 'interval' is 0, it will be called every frame, but if so, it recommened to use 'scheduleUpdateForTarget:' instead.
     * If the selector is already scheduled, then only the interval parameter will be updated without re-scheduling it again.
     */
    schedule: function (opts) {
        var target   = opts.target,
            method   = opts.method,
            interval = opts.interval,
            paused   = opts.paused || false;

        var element = this.hashForMethods[target.get('id')];

        if (!element) {
            element = new HashMethodEntry();
            this.hashForMethods[target.get('id')] = element;
            element.target = target;
            element.paused = paused;
        } else if (element.paused != paused) {
            throw "cocos.Scheduler. Trying to schedule a method with a pause value different than the target";
        }

        var timer = Timer.create({callback: util.callback(target, method), interval: interval});
        element.timers.push(timer);
    },

    /**
     * Schedules the 'update' selector for a given target with a given priority.
     * The 'update' selector will be called every frame.
     * The lower the priority, the earlier it is called.
     */
    scheduleUpdate: function (opts) {
        var target   = opts.target,
            priority = opts.priority,
            paused   = opts.paused;

        var i, len;
        var entry = {target: target, priority: priority, paused: paused};
        var added = false;

        if (priority === 0) {
            this.updates0.push(entry);
        } else if (priority < 0) {
            for (i = 0, len = this.updatesNeg.length; i < len; i++) {
                if (priority < this.updatesNeg[i].priority) {
                    this.updatesNeg.splice(i, 0, entry);
                    added = true;
                    break;
                }
            }

            if (!added) {
                this.updatesNeg.push(entry);
            }
        } else /* priority > 0 */{
            for (i = 0, len = this.updatesPos.length; i < len; i++) {
                if (priority < this.updatesPos[i].priority) {
                    this.updatesPos.splice(i, 0, entry);
                    added = true;
                    break;
                }
            }

            if (!added) {
                this.updatesPos.push(entry);
            }
        }

        this.hashForUpdates[target.get('id')] = entry;
    },

    /**
     * 'tick' the scheduler.
     * You should NEVER call this method, unless you know what you are doing.
     */
    tick: function (dt) {
        var i, len, x;
        if (this.timeScale != 1.0) {
            dt *= this.timeScale;
        }

        var entry;
        for (i = 0, len = this.updatesNeg.length; i < len; i++) {
            entry = this.updatesNeg[i];
            if (entry && !entry.paused) {
                entry.target.update(dt);
            }
        }

        for (i = 0, len = this.updates0.length; i < len; i++) {
            entry = this.updates0[i];
            if (entry && !entry.paused) {
                entry.target.update(dt);
            }
        }

        for (i = 0, len = this.updatesPos.length; i < len; i++) {
            entry = this.updatesPos[i];
            if (entry && !entry.paused) {
                entry.target.update(dt);
            }
        }

        for (x in this.hashForMethods) {
            if (this.hashForMethods.hasOwnProperty(x)) {
                entry = this.hashForMethods[x];

                if (entry) {
                    for (i = 0, len = entry.timers.length; i < len; i++) {
                        var timer = entry.timers[i];
                        if (timer) {
                            timer.update(dt);
                        }
                    }
                }
            }
        }

    },

    /**
     * Unshedules a selector for a given target.
     * If you want to unschedule the "update", use unscheduleUpdateForTarget.
     */
    unschedule: function (opts) {
        if (!opts.target || !opts.method) {
            return;
        }
        var element = this.hashForMethods[opts.target.get('id')];
        if (element) {
            for (var i=0; i<element.timers.length; i++) {
                // Compare callback function
                if (element.timers[i].callback == util.callback(opts.target, opts.method)) {
                    var timer = element.timers.splice(i, 1);
                    timer = null;
                }
            }
        }
    },

    /**
     * Unschedules the update selector for a given target
     */
    unscheduleUpdateForTarget: function (target) {
        if (!target) {
            return;
        }
        var id = target.get('id'),
            elementUpdate = this.hashForUpdates[id];
        if (elementUpdate) {
            // Remove from updates list
            if (elementUpdate.priority === 0) {
                this.updates0.splice(this.updates0.indexOf(elementUpdate), 1);
            } else if (elementUpdate.priority < 0) {
                this.updatesNeg.splice(this.updatesNeg.indexOf(elementUpdate), 1);
            } else /* priority > 0 */{
                this.updatesPos.splice(this.updatesPos.indexOf(elementUpdate), 1);
            }
        }
        // Release HashMethodEntry object
        this.hashForUpdates[id] = null;
    },

    /**
     * Unschedules all selectors from all targets.
     * You should NEVER call this method, unless you know what you are doing.
     */
    unscheduleAllSelectors: function () {
        var i, x, entry;

        // Custom selectors
        for (x in this.hashForMethods) {
            if (this.hashForMethods.hasOwnProperty(x)) {
                entry = this.hashForMethods[x];
                this.unscheduleAllSelectorsForTarget(entry.target);
            }
        }
        // Updates selectors
        for (i = 0, len = this.updatesNeg.length; i < len; i++) {
            entry = this.updatesNeg[i];
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target);
            }
        }

        for (i = 0, len = this.updates0.length; i < len; i++) {
            entry = this.updates0[i];
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target);
            }
        }

        for (i = 0, len = this.updatesPos.length; i < len; i++) {
            entry = this.updatesPos[i];
            if (entry) {
                this.unscheduleUpdateForTarget(entry.target);
            }
        }
    },

    /**
     * Unschedules all selectors for a given target.
     * This also includes the "update" selector.
     */
    unscheduleAllSelectorsForTarget: function (target) {
        if (!target) {
            return;
        }
        // Custom selector
        var element = this.hashForMethods[target.get('id')];
        if (element) {
            element.paused = true;
            element.timers = []; // Clear all timers
        }
        // Release HashMethodEntry object
        this.hashForMethods[target.get('id')] = null;

        // Update selector
        this.unscheduleUpdateForTarget(target);
    },

    /**
     * Pauses the target.
     * All scheduled selectors/update for a given target won't be 'ticked' until the target is resumed.
     * If the target is not present, nothing happens.
     */

    pauseTarget: function (target) {
        var element = this.hashForMethods[target.get('id')];
        if (element) {
            element.paused = true;
        }

        var elementUpdate = this.hashForUpdates[target.get('id')];
        if (elementUpdate) {
            elementUpdate.paused = true;
        }
    },

    /**
     * Resumes the target.
     * The 'target' will be unpaused, so all schedule selectors/update will be 'ticked' again.
     * If the target is not present, nothing happens.
     */

    resumeTarget: function (target) {
        var element = this.hashForMethods[target.get('id')];
        if (element) {
            element.paused = false;
        }

        var elementUpdate = this.hashForUpdates[target.get('id')];
        //console.log('foo', target.get('id'), elementUpdate);
        if (elementUpdate) {
            elementUpdate.paused = false;
        }
    }
});

util.extend(Scheduler, /** @lends cocos.Scheduler */{
    /**
     * A shared singleton instance of cocos.Scheduler
     * @getter sharedScheduler 
     * @type cocos.Scheduler
     */
    get_sharedScheduler: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});

exports.Timer = Timer;
exports.Scheduler = Scheduler;

}};
__resources__["/__builtin__/libs/cocos2d/SpriteFrame.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry'),
    ccp = geo.ccp;

var SpriteFrame = BObject.extend(/** @lends cocos.SpriteFrame# */{
    rect: null,
    rotated: false,
    offset: null,
    originalSize: null,
    texture: null,

    /**
     * Represents a single frame of animation for a cocos.Sprite
     *
     * <p>A SpriteFrame has:<br>
     * - texture: A Texture2D that will be used by the Sprite<br>
     * - rectangle: A rectangle of the texture</p>
     *
     * <p>You can modify the frame of a Sprite by doing:</p>
     * 
     * <code>var frame = SpriteFrame.create({texture: texture, rect: rect});
     * sprite.set('displayFrame', frame);</code>
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {cocos.Texture2D} texture The texture to draw this frame using
     * @opt {geometry.Rect} rect The rectangle inside the texture to draw
     */
    init: function (opts) {
        SpriteFrame.superclass.init(this, opts);

        this.texture      = opts.texture;
        this.rect         = opts.rect;
        this.rotated      = !!opts.rotate;
        this.offset       = opts.offset || ccp(0, 0);
        this.originalSize = opts.originalSize || util.copy(this.rect.size);
    },

    /**
     * @ignore
     */
    toString: function () {
        return "[object SpriteFrame | TextureName=" + this.texture.get('name') + ", Rect = (" + this.rect.origin.x + ", " + this.rect.origin.y + ", " + this.rect.size.width + ", " + this.rect.size.height + ")]";
    },

    /**
     * Make a copy of this frame
     *
     * @returns {cocos.SpriteFrame} Exact copy of this object
     */
    copy: function () {
        return SpriteFrame.create({rect: this.rect, rotated: this.rotated, offset: this.offset, originalSize: this.originalSize, texture: this.texture});
    }

});

exports.SpriteFrame = SpriteFrame;

}};
__resources__["/__builtin__/libs/cocos2d/SpriteFrameCache.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    geo = require('geometry'),
    Plist = require('Plist').Plist,
    SpriteFrame = require('./SpriteFrame').SpriteFrame,
    Texture2D = require('./Texture2D').Texture2D;

var SpriteFrameCache = BObject.extend(/** @lends cocos.SpriteFrameCache# */{
    /**
     * List of sprite frames
     * @type Object
     */
    spriteFrames: null,

    /**
     * List of sprite frame aliases
     * @type Object
     */
    spriteFrameAliases: null,


    /**
     * @memberOf cocos
     * @extends BObject
     * @constructs
     * @singleton
     */
    init: function () {
        SpriteFrameCache.superclass.init.call(this);

        this.set('spriteFrames', {});
        this.set('spriteFrameAliases', {});
    },

    /**
     * Add SpriteFrame(s) to the cache
     *
     * @param {String} opts.file The filename of a Zwoptex .plist containing the frame definiitons.
     */
    addSpriteFrames: function (opts) {
        var plistPath = opts.file,
            plist = Plist.create({file: plistPath}),
            plistData = plist.get('data');


        var metaDataDict = plistData.metadata,
            framesDict = plistData.frames;

        var format = 0,
            texturePath = null;

        if (metaDataDict) {
            format = metaDataDict.format;
            // Get texture path from meta data
            texturePath = metaDataDict.textureFileName;
        }

        if (!texturePath) {
            // No texture path so assuming it's the same name as the .plist but ending in .png
            texturePath = plistPath.replace(/\.plist$/i, '.png');
        }


        var texture = Texture2D.create({file: texturePath});

        // Add frames
        for (var frameDictKey in framesDict) {
            if (framesDict.hasOwnProperty(frameDictKey)) {
                var frameDict = framesDict[frameDictKey],
                    spriteFrame = null;

                switch (format) {
                case 0:
                    var x = frameDict.x,
                        y =  frameDict.y,
                        w =  frameDict.width,
                        h =  frameDict.height,
                        ox = frameDict.offsetX,
                        oy = frameDict.offsetY,
                        ow = frameDict.originalWidth,
                        oh = frameDict.originalHeight;

                    // check ow/oh
                    if (!ow || !oh) {
                        //console.log("cocos2d: WARNING: originalWidth/Height not found on the CCSpriteFrame. AnchorPoint won't work as expected. Regenerate the .plist");
                    }

                    if (FLIP_Y_AXIS) {
                        oy *= -1;
                    }

                    // abs ow/oh
                    ow = Math.abs(ow);
                    oh = Math.abs(oh);

                    // create frame
                    spriteFrame = SpriteFrame.create({texture: texture,
                                                         rect: geo.rectMake(x, y, w, h),
                                                       rotate: false,
                                                       offset: geo.ccp(ox, oy),
                                                 originalSize: geo.sizeMake(ow, oh)});
                    break;

                case 1:
                case 2:
                    var frame      = geo.rectFromString(frameDict.frame),
                        rotated    = !!frameDict.rotated,
                        offset     = geo.pointFromString(frameDict.offset),
                        sourceSize = geo.sizeFromString(frameDict.sourceSize);

                    if (FLIP_Y_AXIS) {
                        offset.y *= -1;
                    }


                    // create frame
                    spriteFrame = SpriteFrame.create({texture: texture,
                                                         rect: frame,
                                                       rotate: rotated,
                                                       offset: offset,
                                                 originalSize: sourceSize});
                    break;

                case 3:
                    var spriteSize       = geo.sizeFromString(frameDict.spriteSize),
                        spriteOffset     = geo.pointFromString(frameDict.spriteOffset),
                        spriteSourceSize = geo.sizeFromString(frameDict.spriteSourceSize),
                        textureRect      = geo.rectFromString(frameDict.textureRect),
                        textureRotated   = frameDict.textureRotated;
                    

                    if (FLIP_Y_AXIS) {
                        spriteOffset.y *= -1;
                    }

                    // get aliases
                    var aliases = frameDict.aliases;
                    for (var i = 0, len = aliases.length; i < len; i++) {
                        var alias = aliases[i];
                        this.get('spriteFrameAliases')[frameDictKey] = alias;
                    }
                    
                    // create frame
                    spriteFrame = SpriteFrame.create({texture: texture,
                                                         rect: geo.rectMake(textureRect.origin.x, textureRect.origin.y, spriteSize.width, spriteSize.height),
                                                       rotate: textureRotated,
                                                       offset: spriteOffset,
                                                 originalSize: spriteSourceSize});
                    break;

                default:
                    throw "Unsupported Zwoptex format: " + format;
                }

                // Add sprite frame
                this.get('spriteFrames')[frameDictKey] = spriteFrame;
            }
        }
    },

    /**
     * Get a single SpriteFrame
     *
     * @param {String} opts.name The name of the sprite frame
     * @returns {cocos.SpriteFrame} The sprite frame
     */
    getSpriteFrame: function (opts) {
        var name = opts.name;

        var frame = this.get('spriteFrames')[name];

        if (!frame) {
            // No frame, look for an alias
            var key = this.get('spriteFrameAliases')[name];

            if (key) {
                frame = this.get('spriteFrames')[key];
            }

            if (!frame) {
                throw "Unable to find frame: " + name;
            }
        }

        return frame;
    }
});

/**
 * Class methods
 */
util.extend(SpriteFrameCache, /** @lends cocos.SpriteFrameCache */{
    /**
     * @field
     * @name cocos.SpriteFrameCache.sharedSpriteFrameCache
     * @type cocos.SpriteFrameCache
     */
    get_sharedSpriteFrameCache: function (key) {
        if (!this._instance) {
            this._instance = this.create();
        }

        return this._instance;
    }
});

exports.SpriteFrameCache = SpriteFrameCache;

}};
__resources__["/__builtin__/libs/cocos2d/Texture2D.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    events = require('events'),
    RemoteResource = require('./RemoteResource').RemoteResource;

var Texture2D = BObject.extend(/** @lends cocos.Texture2D# */{
    imgElement: null,
    size: null,
    name: null,
    isLoaded: false,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {String} [file] The file path of the image to use as a texture
     * @opt {Texture2D|HTMLImageElement} [data] Image data to read from
     */
    init: function (opts) {
        var file = opts.file,
            data = opts.data,
            texture = opts.texture;

        if (file) {
            this.name = file;
            data = resource(file);
        } else if (texture) {
            this.name = texture.get('name');
            data = texture.get('imgElement');
        }

        this.size = {width: 0, height: 0};

        if (data instanceof RemoteResource) {
            events.addListener(data, 'load', util.callback(this, this.dataDidLoad));
            this.set('imgElement', data.load());
        } else {
            this.set('imgElement', data);
            this.dataDidLoad(data);
        }
    },

    dataDidLoad: function (data) {
        this.isLoaded = true;
        this.set('size', {width: this.imgElement.width, height: this.imgElement.height});
        events.trigger(self, 'load', self);
    },

    drawAtPoint: function (ctx, point) {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement, point.x, point.y);
    },
    drawInRect: function (ctx, rect) {
        if (!this.isLoaded) {
            return;
        }
        ctx.drawImage(this.imgElement,
            rect.origin.x, rect.origin.y,
            rect.size.width, rect.size.height
        );
    },

    /**
     * @getter data
     * @type {String} Base64 encoded image data
     */
    get_data: function () {
        return this.imgElement ? this.imgElement.src : null;
    },

    /**
     * @getter contentSize
     * @type {geometry.Size} Size of the texture
     */
    get_contentSize: function () {
        return this.size;
    },

    get_pixelsWide: function () {
        return this.size.width;
    },

    get_pixelsHigh: function () {
        return this.size.height;
    }
});

exports.Texture2D = Texture2D;

}};
__resources__["/__builtin__/libs/cocos2d/TextureAtlas.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray FLIP_Y_AXIS*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    Texture2D = require('./Texture2D').Texture2D;


/* QUAD STRUCTURE
 quad = {
     drawRect: <rect>, // Where the quad is drawn to
     textureRect: <rect>  // The slice of the texture to draw in drawRect
 }
*/

var TextureAtlas = BObject.extend(/** @lends cocos.TextureAtlas# */{
    quads: null,
    imgElement: null,
    texture: null,

    /**
     * A single texture that can represent lots of smaller images
     *
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @opt {String} file The file path of the image to use as a texture
     * @opt {Texture2D|HTMLImageElement} [data] Image data to read from
     * @opt {CanvasElement} [canvas] A canvas to use as a texture
     */
    init: function (opts) {
        var file = opts.file,
            data = opts.data,
            texture = opts.texture,
            canvas = opts.canvas;

        if (canvas) {
            // If we've been given a canvas element then we'll use that for our image
            this.imgElement = canvas;
        } else {
            texture = Texture2D.create({texture: texture, file: file, data: data});
            this.set('texture', texture);
            this.imgElement = texture.get('imgElement');
        }

        this.quads = [];
    },

    insertQuad: function (opts) {
        var quad = opts.quad,
            index = opts.index || 0;

        this.quads.splice(index, 0, quad);
    },
    removeQuad: function (opts) {
        var index = opts.index;

        this.quads.splice(index, 1);
    },


    drawQuads: function (ctx) {
        util.each(this.quads, util.callback(this, function (quad) {
            if (!quad) {
                return;
            }

            this.drawQuad(ctx, quad);
        }));
    },

    drawQuad: function (ctx, quad) {
        var sx = quad.textureRect.origin.x,
            sy = quad.textureRect.origin.y,
            sw = quad.textureRect.size.width, 
            sh = quad.textureRect.size.height;

        var dx = quad.drawRect.origin.x,
            dy = quad.drawRect.origin.y,
            dw = quad.drawRect.size.width, 
            dh = quad.drawRect.size.height;


        var scaleX = 1;
        var scaleY = 1;

        if (FLIP_Y_AXIS) {
            dy -= dh;
            dh *= -1;
        }

            
        if (dw < 0) {
            dw *= -1;
            scaleX = -1;
        }
            
        if (dh < 0) {
            dh *= -1;
            scaleY = -1;
        }

        ctx.scale(scaleX, scaleY);

        var img = this.get('imgElement');
        ctx.drawImage(img, 
            sx, sy, // Draw slice from x,y
            sw, sh, // Draw slice size
            dx, dy, // Draw at 0, 0
            dw, dh  // Draw size
        );
        ctx.scale(1, 1);
    }
});

exports.TextureAtlas = TextureAtlas;

}};
__resources__["/__builtin__/libs/cocos2d/TMXOrientation.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

/**
 * @memberOf cocos
 * @namespace
 */
var TMXOrientation = /** @lends cocos.TMXOrientation */{
    /**
     * Orthogonal orientation
     * @constant
     */
    TMXOrientationOrtho: 1,

    /**
     * Hexagonal orientation
     * @constant
     */
    TMXOrientationHex: 2,

    /**
     * Isometric orientation
     * @constant
     */
    TMXOrientationIso: 3
};

module.exports = TMXOrientation;

}};
__resources__["/__builtin__/libs/cocos2d/TMXXMLParser.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray DOMParser console*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    path = require('path'),
    ccp = require('geometry').ccp,
    base64 = require('base64'),
    gzip   = require('gzip'),
    TMXOrientationOrtho = require('./TMXOrientation').TMXOrientationOrtho,
    TMXOrientationHex = require('./TMXOrientation').TMXOrientationHex,
    TMXOrientationIso = require('./TMXOrientation').TMXOrientationIso;

var TMXTilesetInfo = BObject.extend(/** @lends cocos.TMXTilesetInfo# */{
    name: '',
    firstGID: 0,
    tileSize: null,
    spacing: 0,
    margin: 0,
    sourceImage: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     */
    init: function () {
        TMXTilesetInfo.superclass.init.call(this);
    },

    rectForGID: function (gid) {
        var rect = {size: {}, origin: ccp(0, 0)};
        rect.size = util.copy(this.tileSize);
        
        gid = gid - this.firstGID;

        var imgSize = this.get('imageSize');
        
        var maxX = Math.floor((imgSize.width - this.margin * 2 + this.spacing) / (this.tileSize.width + this.spacing));
        
        rect.origin.x = (gid % maxX) * (this.tileSize.width + this.spacing) + this.margin;
        rect.origin.y = Math.floor(gid / maxX) * (this.tileSize.height + this.spacing) + this.margin;
        
        return rect;
    }
});

var TMXLayerInfo = BObject.extend(/** @lends cocos.TMXLayerInfo# */{
    name: '',
    layerSize: null,
    tiles: null,
    visible: true,
    opacity: 255,
    minGID: 100000,
    maxGID: 0,
    properties: null,
    offset: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     */
    init: function () {
        TMXLayerInfo.superclass.init.call(this);

        this.properties = {};
        this.offset = ccp(0, 0);
    }
});

var TMXObjectGroup = BObject.extend(/** @lends cocos.TMXObjectGroup# */{
    name: '',
    properties: null,
    offset: null,
    objects: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     */
    init: function () {
        TMXObjectGroup.superclass.init.call(this);

        this.properties = {};
        this.objects = {};
        this.offset = ccp(0, 0);
    },

    /**
     * Get the value for the specific property name
     *
     * @opt {String} name Property name
     * @returns {String} Property value
     */
    getProperty: function (opts) {
        var propertyName = opts.name;
        return this.properties[propertyName];
    },

    /**
     * @deprected Since v0.2. You should now use cocos.TMXObjectGroup#getProperty
     */
    propertyNamed: function (opts) {
        console.warn('TMXObjectGroup#propertyNamed is deprected. Use TMXTiledMap#getProperty instread');
        return this.getProperty(opts);
    },

    /**
     * Get the object for the specific object name. It will return the 1st
     * object found on the array for the given name.
     *
     * @opt {String} name Object name
     * @returns {Object} Object
     */
    getObject: function (opts) {
        var objectName = opts.name;
        var object = null;
        
        this.objects.forEach(function (item) {
            if (item.name == objectName) {
                object = item;
            }
        });
        if (object !== null) {
            return object;
        }
    },

    /**
     * @deprected Since v0.2. You should now use cocos.TMXObjectGroup#getProperty
     */
    objectNamed: function (opts) {
        console.warn('TMXObjectGroup#objectNamed is deprected. Use TMXObjectGroup#getObject instread');
        return this.getObject(opts);
    }
});

var TMXMapInfo = BObject.extend(/** @lends cocos.TMXMapInfo# */{
    filename: '',
    orientation: 0,
    mapSize: null,
    tileSize: null,
    layer: null,
    tilesets: null,
    objectGroups: null,
    properties: null,
    tileProperties: null,

    /**
     * @memberOf cocos
     * @constructs
     * @extends BObject
     *
     * @param {String} tmxFile The file path of the TMX file to load
     */
    init: function (tmxFile) {
        TMXMapInfo.superclass.init.call(this, tmxFile);

        this.tilesets = [];
        this.layers = [];
        this.objectGroups = [];
        this.properties = {};
        this.tileProperties = {};
        this.filename = tmxFile;

        this.parseXMLFile(tmxFile);
    },

    parseXMLFile: function (xmlFile) {
        var parser = new DOMParser(),
            doc = parser.parseFromString(resource(xmlFile), 'text/xml');

        // PARSE <map>
        var map = doc.documentElement;

        // Set Orientation
        switch (map.getAttribute('orientation')) {
        case 'orthogonal':
            this.orientation = TMXOrientationOrtho;
            break;
        case 'isometric':
            this.orientation = TMXOrientationIso;
            break;
        case 'hexagonal':
            this.orientation = TMXOrientationHex;
            break;
        default:
            throw "cocos2d: TMXFomat: Unsupported orientation: " + map.getAttribute('orientation');
        }
        this.mapSize = {width: parseInt(map.getAttribute('width'), 10), height: parseInt(map.getAttribute('height'), 10)};
        this.tileSize = {width: parseInt(map.getAttribute('tilewidth'), 10), height: parseInt(map.getAttribute('tileheight'), 10)};


        // PARSE <tilesets>
        var tilesets = map.getElementsByTagName('tileset');
        var i, j, len, jen, s;
        for (i = 0, len = tilesets.length; i < len; i++) {
            var t = tilesets[i];

            var tileset = TMXTilesetInfo.create();
            tileset.set('name', t.getAttribute('name'));
            tileset.set('firstGID', parseInt(t.getAttribute('firstgid'), 10));
            if (t.getAttribute('spacing')) {
                tileset.set('spacing', parseInt(t.getAttribute('spacing'), 10));
            }
            if (t.getAttribute('margin')) {
                tileset.set('margin', parseInt(t.getAttribute('margin'), 10));
            }

            s = {};
            s.width = parseInt(t.getAttribute('tilewidth'), 10);
            s.height = parseInt(t.getAttribute('tileheight'), 10);
            tileset.set('tileSize', s);

            // PARSE <image> We assume there's only 1
            var image = t.getElementsByTagName('image')[0];
            tileset.set('sourceImage', path.join(path.dirname(this.filename), image.getAttribute('source')));

            this.tilesets.push(tileset);
        }

        // PARSE <layers>
        var layers = map.getElementsByTagName('layer');
        for (i = 0, len = layers.length; i < len; i++) {
            var l = layers[i];
            var data = l.getElementsByTagName('data')[0];
            var layer = TMXLayerInfo.create();

            layer.set('name', l.getAttribute('name'));
            if (l.getAttribute('visible') !== false) {
                layer.set('visible', true);
            } else {
                layer.set('visible', !!parseInt(l.getAttribute('visible'), 10));
            }

            s = {};
            s.width = parseInt(l.getAttribute('width'), 10);
            s.height = parseInt(l.getAttribute('height'), 10);
            layer.set('layerSize', s);

            var opacity = l.getAttribute('opacity');
            if (!opacity && opacity !== 0) {
                layer.set('opacity', 255);
            } else {
                layer.set('opacity', 255 * parseFloat(opacity));
            }

            var x = parseInt(l.getAttribute('x'), 10),
                y = parseInt(l.getAttribute('y'), 10);
            if (isNaN(x)) {
                x = 0;
            }
            if (isNaN(y)) {
                y = 0;
            }
            layer.set('offset', ccp(x, y));


            // Firefox has a 4KB limit on node values. It will split larger
            // nodes up into multiple nodes. So, we'll stitch them back
            // together.
            var nodeValue = '';
            for (j = 0, jen = data.childNodes.length; j < jen; j++) {
                nodeValue += data.childNodes[j].nodeValue;
            }

            // Unpack the tilemap data
            var compression = data.getAttribute('compression');
            switch (compression) {
            case 'gzip':
                layer.set('tiles', gzip.unzipBase64AsArray(nodeValue, 4));
                break;
                
            // Uncompressed
            case null:
            case '': 
                layer.set('tiles', base64.decodeAsArray(nodeValue, 4));
                break;

            default: 
                throw "Unsupported TMX Tile Map compression: " + compression;
            }

            this.layers.push(layer);
        }

        // TODO PARSE <tile>

        // PARSE <objectgroup>
        var objectgroups = map.getElementsByTagName('objectgroup');
        for (i = 0, len = objectgroups.length; i < len; i++) {
            var g = objectgroups[i],
                objectGroup = TMXObjectGroup.create();

            objectGroup.set('name', g.getAttribute('name'));
            
            var properties = g.querySelectorAll('objectgroup > properties property'),
                propertiesValue = {},
                property;
            
            for (j = 0; j < properties.length; j++) {
                property = properties[j];
                if (property.getAttribute('name')) {
                    propertiesValue[property.getAttribute('name')] = property.getAttribute('value');
                }
            }
           
            objectGroup.set('properties', propertiesValue);

            var objectsArray = [],
                objects = g.querySelectorAll('object');

            for (j = 0; j < objects.length; j++) {
                var object = objects[j];
                var objectValue = {
                    x       : parseInt(object.getAttribute('x'), 10),
                    y       : parseInt(object.getAttribute('y'), 10),
                    width   : parseInt(object.getAttribute('width'), 10),
                    height  : parseInt(object.getAttribute('height'), 10)
                };
                if (object.getAttribute('name')) {
                    objectValue.name = object.getAttribute('name');
                }
                if (object.getAttribute('type')) {
                    objectValue.type = object.getAttribute('type');
                }
                properties = object.querySelectorAll('property');
                for (var k = 0; k < properties.length; k++) {
                    property = properties[k];
                    if (property.getAttribute('name')) {
                        objectValue[property.getAttribute('name')] = property.getAttribute('value');
                    }
                }
                objectsArray.push(objectValue);

            }
            objectGroup.set('objects', objectsArray);
            this.objectGroups.push(objectGroup);
        }


        // PARSE <map><property>
        var properties = doc.querySelectorAll('map > properties > property');

        for (i = 0; i < properties.length; i++) {
            var property = properties[i];
            if (property.getAttribute('name')) {
                this.properties[property.getAttribute('name')] = property.getAttribute('value');
            }
        }
    }
});

exports.TMXMapInfo = TMXMapInfo;
exports.TMXLayerInfo = TMXLayerInfo;
exports.TMXTilesetInfo = TMXTilesetInfo;
exports.TMXObjectGroup = TMXObjectGroup;

}};
__resources__["/__builtin__/libs/geometry.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util');

var RE_PAIR = /\{\s*([\d.\-]+)\s*,\s*([\d.\-]+)\s*\}/,
    RE_DOUBLE_PAIR = /\{\s*(\{[\s\d,.\-]+\})\s*,\s*(\{[\s\d,.\-]+\})\s*\}/;

Math.PI_2 = 1.57079632679489661923132169163975144     /* pi/2 */

/** @namespace */
var geometry = {
    /**
     * @class
     * A 2D point in space
     *
     * @param {Float} x X value
     * @param {Float} y Y value
     */
    Point: function (x, y) {
        /**
         * X coordinate
         * @type Float
         */
        this.x = x;

        /**
         * Y coordinate
         * @type Float
         */
        this.y = y;
    },

    /**
     * @class
     * A 2D size
     *
     * @param {Float} w Width
     * @param {Float} h Height
     */
    Size: function (w, h) {
        /**
         * Width
         * @type Float
         */
        this.width = w;

        /**
         * Height
         * @type Float
         */
        this.height = h;
    },

    /**
     * @class
     * A rectangle
     *
     * @param {Float} x X value
     * @param {Float} y Y value
     * @param {Float} w Width
     * @param {Float} h Height
     */
    Rect: function (x, y, w, h) {
        /**
         * Coordinate in 2D space
         * @type {geometry.Point}
         */
        this.origin = new geometry.Point(x, y);

        /**
         * Size in 2D space
         * @type {geometry.Size}
         */
        this.size   = new geometry.Size(w, h);
    },

    /**
     * @class
     * Transform matrix
     *
     * @param {Float} a
     * @param {Float} b
     * @param {Float} c
     * @param {Float} d
     * @param {Float} tx
     * @param {Float} ty
     */
    TransformMatrix: function (a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    },

    /**
     * @class 
     * Bezier curve control object
     *
     * @param {geometry.Point} controlPoint1
     * @param {geometry.Point} controlPoint2
     * @param {geometry.Point} endPoint
     */
    BezierConfig: function(p1, p2, ep) {
        this.controlPoint1 = util.copy(p1);
        this.controlPoint2 = util.copy(p2);
        this.endPosition = util.copy(ep);
    },
    
    /**
     * Creates a geometry.Point instance
     *
     * @param {Float} x X coordinate
     * @param {Float} y Y coordinate
     * @returns {geometry.Point} 
     */
    ccp: function (x, y) {
        return module.exports.pointMake(x, y);
    },

    /**
     * Add the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    ccpAdd: function (p1, p2) {
        return geometry.ccp(p1.x + p2.x, p1.y + p2.y);
    },

    /**
     * Subtract the values of two points
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    ccpSub: function (p1, p2) {
        return geometry.ccp(p1.x - p2.x, p1.y - p2.y);
    },

    /**
     * Muliply the values of two points together
     *
     * @param {geometry.Point} p1 First point
     * @param {geometry.Point} p2 Second point
     * @returns {geometry.Point} New point
     */
    ccpMult: function (p1, p2) {
        return geometry.ccp(p1.x * p2.x, p1.y * p2.y);
    },


    /**
     * Invert the values of a geometry.Point
     *
     * @param {geometry.Point} p Point to invert
     * @returns {geometry.Point} New point
     */
    ccpNeg: function (p) {
        return geometry.ccp(-p.x, -p.y);
    },

    /**
     * Round values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    ccpRound: function (p) {
        return geometry.ccp(Math.round(p.x), Math.round(p.y));
    },

    /**
     * Round up values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    ccpCeil: function (p) {
        return geometry.ccp(Math.ceil(p.x), Math.ceil(p.y));
    },

    /**
     * Round down values on a geometry.Point to whole numbers
     *
     * @param {geometry.Point} p Point to round
     * @returns {geometry.Point} New point
     */
    ccpFloor: function (p) {
        return geometry.ccp(Math.floor(p.x), Math.floor(p.y));
    },

    /**
     * A point at 0x0
     *
     * @returns {geometry.Point} New point at 0x0
     */
    PointZero: function () {
        return geometry.ccp(0, 0);
    },

    /**
     * @returns {geometry.Rect}
     */
    rectMake: function (x, y, w, h) {
        return new geometry.Rect(x, y, w, h);
    },

    /**
     * @returns {geometry.Rect}
     */
    rectFromString: function (str) {
        var matches = str.match(RE_DOUBLE_PAIR),
            p = geometry.pointFromString(matches[1]),
            s = geometry.sizeFromString(matches[2]);

        return geometry.rectMake(p.x, p.y, s.width, s.height);
    },

    /**
     * @returns {geometry.Size}
     */
    sizeMake: function (w, h) {
        return new geometry.Size(w, h);
    },

    /**
     * @returns {geometry.Size}
     */
    sizeFromString: function (str) {
        var matches = str.match(RE_PAIR),
            w = parseFloat(matches[1]),
            h = parseFloat(matches[2]);

        return geometry.sizeMake(w, h);
    },

    /**
     * @returns {geometry.Point}
     */
    pointMake: function (x, y) {
        return new geometry.Point(x, y);
    },

    /**
     * @returns {geometry.Point}
     */
    pointFromString: function (str) {
        var matches = str.match(RE_PAIR),
            x = parseFloat(matches[1]),
            y = parseFloat(matches[2]);

        return geometry.pointMake(x, y);
    },

    /**
     * @returns {Boolean}
     */
    rectContainsPoint: function (r, p) {
        return ((p.x >= r.origin.x && p.x <= r.origin.x + r.size.width) &&
                (p.y >= r.origin.y && p.y <= r.origin.y + r.size.height));
    },

    /**
     * Returns the smallest rectangle that contains the two source rectangles.
     *
     * @param {geometry.Rect} r1
     * @param {geometry.Rect} r2
     * @returns {geometry.Rect}
     */
    rectUnion: function (r1, r2) {
        var rect = new geometry.Rect(0, 0, 0, 0);

        rect.origin.x = Math.min(r1.origin.x, r2.origin.x);
        rect.origin.y = Math.min(r1.origin.y, r2.origin.y);
        rect.size.width = Math.max(r1.origin.x + r1.size.width, r2.origin.x + r2.size.width) - rect.origin.x;
        rect.size.height = Math.max(r1.origin.y + r1.size.height, r2.origin.y + r2.size.height) - rect.origin.y;

        return rect;
    },

    /**
     * @returns {Boolean}
     */
    rectOverlapsRect: function (r1, r2) {
        if (r1.origin.x + r1.size.width < r2.origin.x) {
            return false;
        }
        if (r2.origin.x + r2.size.width < r1.origin.x) {
            return false;
        }
        if (r1.origin.y + r1.size.height < r2.origin.y) {
            return false;
        }
        if (r2.origin.y + r2.size.height < r1.origin.y) {
            return false;
        }

        return true;
    },

    /**
     * Returns the overlapping portion of 2 rectangles
     *
     * @param {geometry.Rect} lhsRect First rectangle
     * @param {geometry.Rect} rhsRect Second rectangle
     * @returns {geometry.Rect} The overlapping portion of the 2 rectangles
     */
    rectIntersection: function (lhsRect, rhsRect) {

        var intersection = new geometry.Rect(
            Math.max(geometry.rectGetMinX(lhsRect), geometry.rectGetMinX(rhsRect)),
            Math.max(geometry.rectGetMinY(lhsRect), geometry.rectGetMinY(rhsRect)),
            0,
            0
        );

        intersection.size.width = Math.min(geometry.rectGetMaxX(lhsRect), geometry.rectGetMaxX(rhsRect)) - geometry.rectGetMinX(intersection);
        intersection.size.height = Math.min(geometry.rectGetMaxY(lhsRect), geometry.rectGetMaxY(rhsRect)) - geometry.rectGetMinY(intersection);

        return intersection;
    },

    /**
     * @returns {Boolean}
     */
    pointEqualToPoint: function (point1, point2) {
        return (point1.x == point2.x && point1.y == point2.y);
    },

    /**
     * @returns {Boolean}
     */
    sizeEqualToSize: function (size1, size2) {
        return (size1.width == size2.width && size1.height == size2.height);
    },

    /**
     * @returns {Boolean}
     */
    rectEqualToRect: function (rect1, rect2) {
        return (module.exports.sizeEqualToSize(rect1.size, rect2.size) && module.exports.pointEqualToPoint(rect1.origin, rect2.origin));
    },

    /**
     * @returns {Float}
     */
    rectGetMinX: function (rect) {
        return rect.origin.x;
    },

    /**
     * @returns {Float}
     */
    rectGetMinY: function (rect) {
        return rect.origin.y;
    },

    /**
     * @returns {Float}
     */
    rectGetMaxX: function (rect) {
        return rect.origin.x + rect.size.width;
    },

    /**
     * @returns {Float}
     */
    rectGetMaxY: function (rect) {
        return rect.origin.y + rect.size.height;
    },

    boundingRectMake: function (p1, p2, p3, p4) {
        var minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        var minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        var maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        var maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

        return new geometry.Rect(minX, minY, (maxX - minX), (maxY - minY));
    },

    /**
     * @returns {geometry.Point}
     */
    pointApplyAffineTransform: function (point, t) {

        /*
        aPoint.x * aTransform.a + aPoint.y * aTransform.c + aTransform.tx,
        aPoint.x * aTransform.b + aPoint.y * aTransform.d + aTransform.ty
        */

        return new geometry.Point(t.a * point.x + t.c * point.y + t.tx, t.b * point.x + t.d * point.y + t.ty);

    },

    /**
     * Apply a transform matrix to a rectangle
     *
     * @param {geometry.Rect} rect Rectangle to transform
     * @param {geometry.TransformMatrix} trans TransformMatrix to apply to rectangle
     * @returns {geometry.Rect} A new transformed rectangle
     */
    rectApplyAffineTransform: function (rect, trans) {

        var p1 = geometry.ccp(geometry.rectGetMinX(rect), geometry.rectGetMinY(rect));
        var p2 = geometry.ccp(geometry.rectGetMaxX(rect), geometry.rectGetMinY(rect));
        var p3 = geometry.ccp(geometry.rectGetMinX(rect), geometry.rectGetMaxY(rect));
        var p4 = geometry.ccp(geometry.rectGetMaxX(rect), geometry.rectGetMaxY(rect));

        p1 = geometry.pointApplyAffineTransform(p1, trans);
        p2 = geometry.pointApplyAffineTransform(p2, trans);
        p3 = geometry.pointApplyAffineTransform(p3, trans);
        p4 = geometry.pointApplyAffineTransform(p4, trans);

        return geometry.boundingRectMake(p1, p2, p3, p4);
    },

    /**
     * Inverts a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to invert
     * @returns {geometry.TransformMatrix} New transform matrix
     */
    affineTransformInvert: function (trans) {
        var determinant = 1 / (trans.a * trans.d - trans.b * trans.c);

        return new geometry.TransformMatrix(
            determinant * trans.d,
            -determinant * trans.b,
            -determinant * trans.c,
            determinant * trans.a,
            determinant * (trans.c * trans.ty - trans.d * trans.tx),
            determinant * (trans.b * trans.tx - trans.a * trans.ty)
        );
    },

    /**
     * Multiply 2 transform matrices together
     * @param {geometry.TransformMatrix} lhs Left matrix
     * @param {geometry.TransformMatrix} rhs Right matrix
     * @returns {geometry.TransformMatrix} New transform matrix
     */
    affineTransformConcat: function (lhs, rhs) {
        return new geometry.TransformMatrix(
            lhs.a * rhs.a + lhs.b * rhs.c,
            lhs.a * rhs.b + lhs.b * rhs.d,
            lhs.c * rhs.a + lhs.d * rhs.c,
            lhs.c * rhs.b + lhs.d * rhs.d,
            lhs.tx * rhs.a + lhs.ty * rhs.c + rhs.tx,
            lhs.tx * rhs.b + lhs.ty * rhs.d + rhs.ty
        );
    },

    /**
     * @returns {Float}
     */
    degreesToRadians: function (angle) {
        return angle / 180.0 * Math.PI;
    },

    /**
     * @returns {Float}
     */
    radiansToDegrees: function (angle) {
        return angle * (180.0 / Math.PI);
    },

    /**
     * Translate (move) a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to translate
     * @param {Float} tx Amount to translate along X axis
     * @param {Float} ty Amount to translate along Y axis
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    affineTransformTranslate: function (trans, tx, ty) {
        var newTrans = util.copy(trans);
        newTrans.tx = trans.tx + trans.a * tx + trans.c * ty;
        newTrans.ty = trans.ty + trans.b * tx + trans.d * ty;
        return newTrans;
    },

    /**
     * Rotate a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to rotate
     * @param {Float} angle Angle in radians
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    affineTransformRotate: function (trans, angle) {
        var sin = Math.sin(angle),
            cos = Math.cos(angle);

        return new geometry.TransformMatrix(
            trans.a * cos + trans.c * sin,
            trans.b * cos + trans.d * sin,
            trans.c * cos - trans.a * sin,
            trans.d * cos - trans.b * sin,
            trans.tx,
            trans.ty
        );
    },

    /**
     * Scale a transform matrix
     *
     * @param {geometry.TransformMatrix} trans TransformMatrix to scale
     * @param {Float} sx X scale factor
     * @param {Float} [sy=sx] Y scale factor
     * @returns {geometry.TransformMatrix} A new TransformMatrix
     */
    affineTransformScale: function (trans, sx, sy) {
        if (sy === undefined) {
            sy = sx;
        }

        return new geometry.TransformMatrix(trans.a * sx, trans.b * sx, trans.c * sy, trans.d * sy, trans.tx, trans.ty);
    },

    /**
     * @returns {geometry.TransformMatrix} identity matrix
     */
    affineTransformIdentity: function () {
        return new geometry.TransformMatrix(1, 0, 0, 1, 0, 0);
    }
};

module.exports = geometry;

}};
__resources__["/__builtin__/libs/gzip.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/**
 * @fileoverview 
 */

/** @ignore */
var JXG = require('./JXGUtil');

/**
 * @namespace
 * Wrappers around JXG's GZip utils
 * @see JXG.Util
 */
var gzip = {
    /**
     * Unpack a gzipped byte array
     *
     * @param {Integer[]} input Byte array
     * @returns {String} Unpacked byte string
     */
    unzip: function(input) {
        return (new JXG.Util.Unzip(input)).unzip()[0][0];
    },

    /**
     * Unpack a gzipped byte string encoded as base64
     *
     * @param {String} input Byte string encoded as base64
     * @returns {String} Unpacked byte string
     */
    unzipBase64: function(input) {
        return (new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(input))).unzip()[0][0];
    },

    /**
     * Unpack a gzipped byte string encoded as base64
     *
     * @param {String} input Byte string encoded as base64
     * @param {Integer} bytes Bytes per array item
     * @returns {Integer[]} Unpacked byte array
     */
    unzipBase64AsArray: function(input, bytes) {
        bytes = bytes || 1;

        var dec = this.unzipBase64(input),
            ar = [], i, j, len;
        for (i = 0, len = dec.length/bytes; i < len; i++){
            ar[i] = 0;
            for (j = bytes-1; j >= 0; --j){
                ar[i] += dec.charCodeAt((i *bytes) +j) << (j *8);
            }
        }
        return ar;
    },

    /**
     * Unpack a gzipped byte array
     *
     * @param {Integer[]} input Byte array
     * @param {Integer} bytes Bytes per array item
     * @returns {Integer[]} Unpacked byte array
     */
    unzipAsArray: function (input, bytes) {
        bytes = bytes || 1;

        var dec = this.unzip(input),
            ar = [], i, j, len;
        for (i = 0, len = dec.length/bytes; i < len; i++){
            ar[i] = 0;
            for (j = bytes-1; j >= 0; --j){
                ar[i] += dec.charCodeAt((i *bytes) +j) << (j *8);
            }
        }
        return ar;
    }

};

module.exports = gzip;

}};
__resources__["/__builtin__/libs/JXGUtil.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*
    Copyright 2008,2009
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with JSXGraph.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @fileoverview Utilities for uncompressing and base64 decoding
 */

/** @namespace */
var JXG = {};

/**
  * @class Util class
  * Class for gunzipping, unzipping and base64 decoding of files.
  * It is used for reading GEONExT, Geogebra and Intergeo files.
  *
  * Only Huffman codes are decoded in gunzip.
  * The code is based on the source code for gunzip.c by Pasi Ojala 
  * @see <a href="http://www.cs.tut.fi/~albert/Dev/gunzip/gunzip.c">http://www.cs.tut.fi/~albert/Dev/gunzip/gunzip.c</a>
  * @see <a href="http://www.cs.tut.fi/~albert">http://www.cs.tut.fi/~albert</a>
  */
JXG.Util = {};
                                 
/**
 * Unzip zip files
 */
JXG.Util.Unzip = function (barray){
    var outputArr = [],
        output = "",
        debug = false,
        gpflags,
        files = 0,
        unzipped = [],
        crc,
        buf32k = new Array(32768),
        bIdx = 0,
        modeZIP=false,

        CRC, SIZE,
    
        bitReverse = [
        0x00, 0x80, 0x40, 0xc0, 0x20, 0xa0, 0x60, 0xe0,
        0x10, 0x90, 0x50, 0xd0, 0x30, 0xb0, 0x70, 0xf0,
        0x08, 0x88, 0x48, 0xc8, 0x28, 0xa8, 0x68, 0xe8,
        0x18, 0x98, 0x58, 0xd8, 0x38, 0xb8, 0x78, 0xf8,
        0x04, 0x84, 0x44, 0xc4, 0x24, 0xa4, 0x64, 0xe4,
        0x14, 0x94, 0x54, 0xd4, 0x34, 0xb4, 0x74, 0xf4,
        0x0c, 0x8c, 0x4c, 0xcc, 0x2c, 0xac, 0x6c, 0xec,
        0x1c, 0x9c, 0x5c, 0xdc, 0x3c, 0xbc, 0x7c, 0xfc,
        0x02, 0x82, 0x42, 0xc2, 0x22, 0xa2, 0x62, 0xe2,
        0x12, 0x92, 0x52, 0xd2, 0x32, 0xb2, 0x72, 0xf2,
        0x0a, 0x8a, 0x4a, 0xca, 0x2a, 0xaa, 0x6a, 0xea,
        0x1a, 0x9a, 0x5a, 0xda, 0x3a, 0xba, 0x7a, 0xfa,
        0x06, 0x86, 0x46, 0xc6, 0x26, 0xa6, 0x66, 0xe6,
        0x16, 0x96, 0x56, 0xd6, 0x36, 0xb6, 0x76, 0xf6,
        0x0e, 0x8e, 0x4e, 0xce, 0x2e, 0xae, 0x6e, 0xee,
        0x1e, 0x9e, 0x5e, 0xde, 0x3e, 0xbe, 0x7e, 0xfe,
        0x01, 0x81, 0x41, 0xc1, 0x21, 0xa1, 0x61, 0xe1,
        0x11, 0x91, 0x51, 0xd1, 0x31, 0xb1, 0x71, 0xf1,
        0x09, 0x89, 0x49, 0xc9, 0x29, 0xa9, 0x69, 0xe9,
        0x19, 0x99, 0x59, 0xd9, 0x39, 0xb9, 0x79, 0xf9,
        0x05, 0x85, 0x45, 0xc5, 0x25, 0xa5, 0x65, 0xe5,
        0x15, 0x95, 0x55, 0xd5, 0x35, 0xb5, 0x75, 0xf5,
        0x0d, 0x8d, 0x4d, 0xcd, 0x2d, 0xad, 0x6d, 0xed,
        0x1d, 0x9d, 0x5d, 0xdd, 0x3d, 0xbd, 0x7d, 0xfd,
        0x03, 0x83, 0x43, 0xc3, 0x23, 0xa3, 0x63, 0xe3,
        0x13, 0x93, 0x53, 0xd3, 0x33, 0xb3, 0x73, 0xf3,
        0x0b, 0x8b, 0x4b, 0xcb, 0x2b, 0xab, 0x6b, 0xeb,
        0x1b, 0x9b, 0x5b, 0xdb, 0x3b, 0xbb, 0x7b, 0xfb,
        0x07, 0x87, 0x47, 0xc7, 0x27, 0xa7, 0x67, 0xe7,
        0x17, 0x97, 0x57, 0xd7, 0x37, 0xb7, 0x77, 0xf7,
        0x0f, 0x8f, 0x4f, 0xcf, 0x2f, 0xaf, 0x6f, 0xef,
        0x1f, 0x9f, 0x5f, 0xdf, 0x3f, 0xbf, 0x7f, 0xff
    ],
    
    cplens = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
        35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
    ],

    cplext = [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
        3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99
    ], /* 99==invalid */

    cpdist = [
        0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0007, 0x0009, 0x000d,
        0x0011, 0x0019, 0x0021, 0x0031, 0x0041, 0x0061, 0x0081, 0x00c1,
        0x0101, 0x0181, 0x0201, 0x0301, 0x0401, 0x0601, 0x0801, 0x0c01,
        0x1001, 0x1801, 0x2001, 0x3001, 0x4001, 0x6001
    ],

    cpdext = [
        0,  0,  0,  0,  1,  1,  2,  2,
        3,  3,  4,  4,  5,  5,  6,  6,
        7,  7,  8,  8,  9,  9, 10, 10,
        11, 11, 12, 12, 13, 13
    ],
    
    border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    
    bA = barray,

    bytepos=0,
    bitpos=0,
    bb = 1,
    bits=0,
    
    NAMEMAX = 256,
    
    nameBuf = [],
    
    fileout;
    
    function readByte(){
        bits+=8;
        if (bytepos<bA.length){
            //if (debug)
            //    document.write(bytepos+": "+bA[bytepos]+"<br>");
            return bA[bytepos++];
        } else
            return -1;
    };

    function byteAlign(){
        bb = 1;
    };
    
    function readBit(){
        var carry;
        bits++;
        carry = (bb & 1);
        bb >>= 1;
        if (bb==0){
            bb = readByte();
            carry = (bb & 1);
            bb = (bb>>1) | 0x80;
        }
        return carry;
    };

    function readBits(a) {
        var res = 0,
            i = a;
    
        while(i--) {
            res = (res<<1) | readBit();
        }
        if(a) {
            res = bitReverse[res]>>(8-a);
        }
        return res;
    };
        
    function flushBuffer(){
        //document.write('FLUSHBUFFER:'+buf32k);
        bIdx = 0;
    };
    function addBuffer(a){
        SIZE++;
        //CRC=updcrc(a,crc);
        buf32k[bIdx++] = a;
        outputArr.push(String.fromCharCode(a));
        //output+=String.fromCharCode(a);
        if(bIdx==0x8000){
            //document.write('ADDBUFFER:'+buf32k);
            bIdx=0;
        }
    };
    
    function HufNode() {
        this.b0=0;
        this.b1=0;
        this.jump = null;
        this.jumppos = -1;
    };

    var LITERALS = 288;
    
    var literalTree = new Array(LITERALS);
    var distanceTree = new Array(32);
    var treepos=0;
    var Places = null;
    var Places2 = null;
    
    var impDistanceTree = new Array(64);
    var impLengthTree = new Array(64);
    
    var len = 0;
    var fpos = new Array(17);
    fpos[0]=0;
    var flens;
    var fmax;
    
    function IsPat() {
        while (1) {
            if (fpos[len] >= fmax)
                return -1;
            if (flens[fpos[len]] == len)
                return fpos[len]++;
            fpos[len]++;
        }
    };

    function Rec() {
        var curplace = Places[treepos];
        var tmp;
        if (debug)
    		document.write("<br>len:"+len+" treepos:"+treepos);
        if(len==17) { //war 17
            return -1;
        }
        treepos++;
        len++;
    	
        tmp = IsPat();
        if (debug)
        	document.write("<br>IsPat "+tmp);
        if(tmp >= 0) {
            curplace.b0 = tmp;    /* leaf cell for 0-bit */
            if (debug)
            	document.write("<br>b0 "+curplace.b0);
        } else {
        /* Not a Leaf cell */
        curplace.b0 = 0x8000;
        if (debug)
        	document.write("<br>b0 "+curplace.b0);
        if(Rec())
            return -1;
        }
        tmp = IsPat();
        if(tmp >= 0) {
            curplace.b1 = tmp;    /* leaf cell for 1-bit */
            if (debug)
            	document.write("<br>b1 "+curplace.b1);
            curplace.jump = null;    /* Just for the display routine */
        } else {
            /* Not a Leaf cell */
            curplace.b1 = 0x8000;
            if (debug)
            	document.write("<br>b1 "+curplace.b1);
            curplace.jump = Places[treepos];
            curplace.jumppos = treepos;
            if(Rec())
                return -1;
        }
        len--;
        return 0;
    };

    function CreateTree(currentTree, numval, lengths, show) {
        var i;
        /* Create the Huffman decode tree/table */
        //document.write("<br>createtree<br>");
        if (debug)
        	document.write("currentTree "+currentTree+" numval "+numval+" lengths "+lengths+" show "+show);
        Places = currentTree;
        treepos=0;
        flens = lengths;
        fmax  = numval;
        for (i=0;i<17;i++)
            fpos[i] = 0;
        len = 0;
        if(Rec()) {
            //fprintf(stderr, "invalid huffman tree\n");
            if (debug)
            	alert("invalid huffman tree\n");
            return -1;
        }
        if (debug){
        	document.write('<br>Tree: '+Places.length);
        	for (var a=0;a<32;a++){
            	document.write("Places["+a+"].b0="+Places[a].b0+"<br>");
            	document.write("Places["+a+"].b1="+Places[a].b1+"<br>");
        	}
        }

        return 0;
    };
    
    function DecodeValue(currentTree) {
        var len, i,
            xtreepos=0,
            X = currentTree[xtreepos],
            b;

        /* decode one symbol of the data */
        while(1) {
            b=readBit();
            if (debug)
            	document.write("b="+b);
            if(b) {
                if(!(X.b1 & 0x8000)){
                	if (debug)
                    	document.write("ret1");
                    return X.b1;    /* If leaf node, return data */
                }
                X = X.jump;
                len = currentTree.length;
                for (i=0;i<len;i++){
                    if (currentTree[i]===X){
                        xtreepos=i;
                        break;
                    }
                }
                //xtreepos++;
            } else {
                if(!(X.b0 & 0x8000)){
                	if (debug)
                    	document.write("ret2");
                    return X.b0;    /* If leaf node, return data */
                }
                //X++; //??????????????????
                xtreepos++;
                X = currentTree[xtreepos];
            }
        }
        if (debug)
        	document.write("ret3");
        return -1;
    };
    
    function DeflateLoop() {
    var last, c, type, i, len;

    do {
        /*if((last = readBit())){
            fprintf(errfp, "Last Block: ");
        } else {
            fprintf(errfp, "Not Last Block: ");
        }*/
        last = readBit();
        type = readBits(2);
        switch(type) {
            case 0:
            	if (debug)
                	alert("Stored\n");
                break;
            case 1:
            	if (debug)
                	alert("Fixed Huffman codes\n");
                break;
            case 2:
            	if (debug)
                	alert("Dynamic Huffman codes\n");
                break;
            case 3:
            	if (debug)
                	alert("Reserved block type!!\n");
                break;
            default:
            	if (debug)
                	alert("Unexpected value %d!\n", type);
                break;
        }

        if(type==0) {
            var blockLen, cSum;

            // Stored 
            byteAlign();
            blockLen = readByte();
            blockLen |= (readByte()<<8);

            cSum = readByte();
            cSum |= (readByte()<<8);

            if(((blockLen ^ ~cSum) & 0xffff)) {
                document.write("BlockLen checksum mismatch\n");
            }
            while(blockLen--) {
                c = readByte();
                addBuffer(c);
            }
        } else if(type==1) {
            var j;

            /* Fixed Huffman tables -- fixed decode routine */
            while(1) {
            /*
                256    0000000        0
                :   :     :
                279    0010111        23
                0   00110000    48
                :    :      :
                143    10111111    191
                280 11000000    192
                :    :      :
                287 11000111    199
                144    110010000    400
                :    :       :
                255    111111111    511
    
                Note the bit order!
                */

            j = (bitReverse[readBits(7)]>>1);
            if(j > 23) {
                j = (j<<1) | readBit();    /* 48..255 */

                if(j > 199) {    /* 200..255 */
                    j -= 128;    /*  72..127 */
                    j = (j<<1) | readBit();        /* 144..255 << */
                } else {        /*  48..199 */
                    j -= 48;    /*   0..151 */
                    if(j > 143) {
                        j = j+136;    /* 280..287 << */
                        /*   0..143 << */
                    }
                }
            } else {    /*   0..23 */
                j += 256;    /* 256..279 << */
            }
            if(j < 256) {
                addBuffer(j);
                //document.write("out:"+String.fromCharCode(j));
                /*fprintf(errfp, "@%d %02x\n", SIZE, j);*/
            } else if(j == 256) {
                /* EOF */
                break;
            } else {
                var len, dist;

                j -= 256 + 1;    /* bytes + EOF */
                len = readBits(cplext[j]) + cplens[j];

                j = bitReverse[readBits(5)]>>3;
                if(cpdext[j] > 8) {
                    dist = readBits(8);
                    dist |= (readBits(cpdext[j]-8)<<8);
                } else {
                    dist = readBits(cpdext[j]);
                }
                dist += cpdist[j];

                /*fprintf(errfp, "@%d (l%02x,d%04x)\n", SIZE, len, dist);*/
                for(j=0;j<len;j++) {
                    var c = buf32k[(bIdx - dist) & 0x7fff];
                    addBuffer(c);
                }
            }
            } // while
        } else if(type==2) {
            var j, n, literalCodes, distCodes, lenCodes;
            var ll = new Array(288+32);    // "static" just to preserve stack
    
            // Dynamic Huffman tables 
    
            literalCodes = 257 + readBits(5);
            distCodes = 1 + readBits(5);
            lenCodes = 4 + readBits(4);
            //document.write("<br>param: "+literalCodes+" "+distCodes+" "+lenCodes+"<br>");
            for(j=0; j<19; j++) {
                ll[j] = 0;
            }
    
            // Get the decode tree code lengths
    
            //document.write("<br>");
            for(j=0; j<lenCodes; j++) {
                ll[border[j]] = readBits(3);
                //document.write(ll[border[j]]+" ");
            }
            //fprintf(errfp, "\n");
            //document.write('<br>ll:'+ll);
            len = distanceTree.length;
            for (i=0; i<len; i++)
                distanceTree[i]=new HufNode();
            if(CreateTree(distanceTree, 19, ll, 0)) {
                flushBuffer();
                return 1;
            }
            if (debug){
            	document.write("<br>distanceTree");
            	for(var a=0;a<distanceTree.length;a++){
                	document.write("<br>"+distanceTree[a].b0+" "+distanceTree[a].b1+" "+distanceTree[a].jump+" "+distanceTree[a].jumppos);
                	/*if (distanceTree[a].jumppos!=-1)
                    	document.write(" "+distanceTree[a].jump.b0+" "+distanceTree[a].jump.b1);
                	*/
            	}
            }
            //document.write('<BR>tree created');
    
            //read in literal and distance code lengths
            n = literalCodes + distCodes;
            i = 0;
            var z=-1;
            if (debug)
            	document.write("<br>n="+n+" bits: "+bits+"<br>");
            while(i < n) {
                z++;
                j = DecodeValue(distanceTree);
                if (debug)
                	document.write("<br>"+z+" i:"+i+" decode: "+j+"    bits "+bits+"<br>");
                if(j<16) {    // length of code in bits (0..15)
                       ll[i++] = j;
                } else if(j==16) {    // repeat last length 3 to 6 times 
                       var l;
                    j = 3 + readBits(2);
                    if(i+j > n) {
                        flushBuffer();
                        return 1;
                    }
                    l = i ? ll[i-1] : 0;
                    while(j--) {
                        ll[i++] = l;
                    }
                } else {
                    if(j==17) {        // 3 to 10 zero length codes
                        j = 3 + readBits(3);
                    } else {        // j == 18: 11 to 138 zero length codes 
                        j = 11 + readBits(7);
                    }
                    if(i+j > n) {
                        flushBuffer();
                        return 1;
                    }
                    while(j--) {
                        ll[i++] = 0;
                    }
                }
            }
            /*for(j=0; j<literalCodes+distCodes; j++) {
                //fprintf(errfp, "%d ", ll[j]);
                if ((j&7)==7)
                    fprintf(errfp, "\n");
            }
            fprintf(errfp, "\n");*/
            // Can overwrite tree decode tree as it is not used anymore
            len = literalTree.length;
            for (i=0; i<len; i++)
                literalTree[i]=new HufNode();
            if(CreateTree(literalTree, literalCodes, ll, 0)) {
                flushBuffer();
                return 1;
            }
            len = literalTree.length;
            for (i=0; i<len; i++)
                distanceTree[i]=new HufNode();
            var ll2 = new Array();
            for (i=literalCodes; i <ll.length; i++){
                ll2[i-literalCodes]=ll[i];
            }    
            if(CreateTree(distanceTree, distCodes, ll2, 0)) {
                flushBuffer();
                return 1;
            }
            if (debug)
           		document.write("<br>literalTree");
            while(1) {
                j = DecodeValue(literalTree);
                if(j >= 256) {        // In C64: if carry set
                    var len, dist;
                    j -= 256;
                    if(j == 0) {
                        // EOF
                        break;
                    }
                    j--;
                    len = readBits(cplext[j]) + cplens[j];
    
                    j = DecodeValue(distanceTree);
                    if(cpdext[j] > 8) {
                        dist = readBits(8);
                        dist |= (readBits(cpdext[j]-8)<<8);
                    } else {
                        dist = readBits(cpdext[j]);
                    }
                    dist += cpdist[j];
                    while(len--) {
                        var c = buf32k[(bIdx - dist) & 0x7fff];
                        addBuffer(c);
                    }
                } else {
                    addBuffer(j);
                }
            }
        }
    } while(!last);
    flushBuffer();

    byteAlign();
    return 0;
};

JXG.Util.Unzip.prototype.unzipFile = function(name) {
    var i;
	this.unzip();
	//alert(unzipped[0][1]);
	for (i=0;i<unzipped.length;i++){
		if(unzipped[i][1]==name) {
			return unzipped[i][0];
		}
	}
	
  };
    
    
JXG.Util.Unzip.prototype.unzip = function() {
	//convertToByteArray(input);
	if (debug)
		alert(bA);
	/*for (i=0;i<bA.length*8;i++){
		document.write(readBit());
		if ((i+1)%8==0)
			document.write(" ");
	}*/
	/*for (i=0;i<bA.length;i++){
		document.write(readByte()+" ");
		if ((i+1)%8==0)
			document.write(" ");
	}
	for (i=0;i<bA.length;i++){
		document.write(bA[i]+" ");
		if ((i+1)%16==0)
			document.write("<br>");
	}	
	*/
	//alert(bA);
	nextFile();
	return unzipped;
  };
    
 function nextFile(){
 	if (debug)
 		alert("NEXTFILE");
 	outputArr = [];
 	var tmp = [];
 	modeZIP = false;
	tmp[0] = readByte();
	tmp[1] = readByte();
	if (debug)
		alert("type: "+tmp[0]+" "+tmp[1]);
	if (tmp[0] == parseInt("78",16) && tmp[1] == parseInt("da",16)){ //GZIP
		if (debug)
			alert("GEONExT-GZIP");
		DeflateLoop();
		if (debug)
			alert(outputArr.join(''));
		unzipped[files] = new Array(2);
    	unzipped[files][0] = outputArr.join('');
    	unzipped[files][1] = "geonext.gxt";
    	files++;
	}
	if (tmp[0] == parseInt("1f",16) && tmp[1] == parseInt("8b",16)){ //GZIP
		if (debug)
			alert("GZIP");
		//DeflateLoop();
		skipdir();
		if (debug)
			alert(outputArr.join(''));
		unzipped[files] = new Array(2);
    	unzipped[files][0] = outputArr.join('');
    	unzipped[files][1] = "file";
    	files++;
	}
	if (tmp[0] == parseInt("50",16) && tmp[1] == parseInt("4b",16)){ //ZIP
		modeZIP = true;
		tmp[2] = readByte();
		tmp[3] = readByte();
		if (tmp[2] == parseInt("3",16) && tmp[3] == parseInt("4",16)){
			//MODE_ZIP
			tmp[0] = readByte();
			tmp[1] = readByte();
			if (debug)
				alert("ZIP-Version: "+tmp[1]+" "+tmp[0]/10+"."+tmp[0]%10);
			
			gpflags = readByte();
			gpflags |= (readByte()<<8);
			if (debug)
				alert("gpflags: "+gpflags);
			
			var method = readByte();
			method |= (readByte()<<8);
			if (debug)
				alert("method: "+method);
			
			readByte();
			readByte();
			readByte();
			readByte();
			
			var crc = readByte();
			crc |= (readByte()<<8);
			crc |= (readByte()<<16);
			crc |= (readByte()<<24);
			
			var compSize = readByte();
			compSize |= (readByte()<<8);
			compSize |= (readByte()<<16);
			compSize |= (readByte()<<24);
			
			var size = readByte();
			size |= (readByte()<<8);
			size |= (readByte()<<16);
			size |= (readByte()<<24);
			
			if (debug)
				alert("local CRC: "+crc+"\nlocal Size: "+size+"\nlocal CompSize: "+compSize);
			
			var filelen = readByte();
			filelen |= (readByte()<<8);
			
			var extralen = readByte();
			extralen |= (readByte()<<8);
			
			if (debug)
				alert("filelen "+filelen);
			i = 0;
			nameBuf = [];
			while (filelen--){ 
				var c = readByte();
				if (c == "/" | c ==":"){
					i = 0;
				} else if (i < NAMEMAX-1)
					nameBuf[i++] = String.fromCharCode(c);
			}
			if (debug)
				alert("nameBuf: "+nameBuf);
			
			//nameBuf[i] = "\0";
			if (!fileout)
				fileout = nameBuf;
			
			var i = 0;
			while (i < extralen){
				c = readByte();
				i++;
			}
				
			CRC = 0xffffffff;
			SIZE = 0;
			
			if (size = 0 && fileOut.charAt(fileout.length-1)=="/"){
				//skipdir
				if (debug)
					alert("skipdir");
			}
			if (method == 8){
				DeflateLoop();
				if (debug)
					alert(outputArr.join(''));
				unzipped[files] = new Array(2);
				unzipped[files][0] = outputArr.join('');
    			unzipped[files][1] = nameBuf.join('');
    			files++;
				//return outputArr.join('');
			}
			skipdir();
		}
	}
 };
	
function skipdir(){
    var crc, 
        tmp = [],
        compSize, size, os, i, c;
    
	if ((gpflags & 8)) {
		tmp[0] = readByte();
		tmp[1] = readByte();
		tmp[2] = readByte();
		tmp[3] = readByte();
		
		if (tmp[0] == parseInt("50",16) && 
            tmp[1] == parseInt("4b",16) && 
            tmp[2] == parseInt("07",16) && 
            tmp[3] == parseInt("08",16))
        {
            crc = readByte();
            crc |= (readByte()<<8);
            crc |= (readByte()<<16);
            crc |= (readByte()<<24);
		} else {
			crc = tmp[0] | (tmp[1]<<8) | (tmp[2]<<16) | (tmp[3]<<24);
		}
		
		compSize = readByte();
		compSize |= (readByte()<<8);
		compSize |= (readByte()<<16);
		compSize |= (readByte()<<24);
		
		size = readByte();
		size |= (readByte()<<8);
		size |= (readByte()<<16);
		size |= (readByte()<<24);
		
		if (debug)
			alert("CRC:");
	}

	if (modeZIP)
		nextFile();
	
	tmp[0] = readByte();
	if (tmp[0] != 8) {
		if (debug)
			alert("Unknown compression method!");
        return 0;	
	}
	
	gpflags = readByte();
	if (debug){
		if ((gpflags & ~(parseInt("1f",16))))
			alert("Unknown flags set!");
	}
	
	readByte();
	readByte();
	readByte();
	readByte();
	
	readByte();
	os = readByte();
	
	if ((gpflags & 4)){
		tmp[0] = readByte();
		tmp[2] = readByte();
		len = tmp[0] + 256*tmp[1];
		if (debug)
			alert("Extra field size: "+len);
		for (i=0;i<len;i++)
			readByte();
	}
	
	if ((gpflags & 8)){
		i=0;
		nameBuf=[];
		while (c=readByte()){
			if(c == "7" || c == ":")
				i=0;
			if (i<NAMEMAX-1)
				nameBuf[i++] = c;
		}
		//nameBuf[i] = "\0";
		if (debug)
			alert("original file name: "+nameBuf);
	}
		
	if ((gpflags & 16)){
		while (c=readByte()){
			//FILE COMMENT
		}
	}
	
	if ((gpflags & 2)){
		readByte();
		readByte();
	}
	
	DeflateLoop();
	
	crc = readByte();
	crc |= (readByte()<<8);
	crc |= (readByte()<<16);
	crc |= (readByte()<<24);
	
	size = readByte();
	size |= (readByte()<<8);
	size |= (readByte()<<16);
	size |= (readByte()<<24);
	
	if (modeZIP)
		nextFile();
	
};

};

/**
*  Base64 encoding / decoding
*  @see <a href="http://www.webtoolkit.info/">http://www.webtoolkit.info/</A>
*/
JXG.Util.Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = [],
            chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            i = 0;

        input = JXG.Util.Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output.push([this._keyStr.charAt(enc1),
                         this._keyStr.charAt(enc2),
                         this._keyStr.charAt(enc3),
                         this._keyStr.charAt(enc4)].join(''));
        }

        return output.join('');
    },

    // public method for decoding
    decode : function (input, utf8) {
        var output = [],
            chr1, chr2, chr3,
            enc1, enc2, enc3, enc4,
            i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output.push(String.fromCharCode(chr1));

            if (enc3 != 64) {
                output.push(String.fromCharCode(chr2));
            }
            if (enc4 != 64) {
                output.push(String.fromCharCode(chr3));
            }
        }
        
        output = output.join(''); 
        
        if (utf8) {
            output = JXG.Util.Base64._utf8_decode(output);
        }
        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = [],
            i = 0,
            c = 0, c2 = 0, c3 = 0;

        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string.push(String.fromCharCode(c));
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string.push(String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
                i += 3;
            }
        }
        return string.join('');
    },
    
    _destrip: function (stripped, wrap){
        var lines = [], lineno, i,
            destripped = [];
        
        if (wrap==null) 
            wrap = 76;
            
        stripped.replace(/ /g, "");
        lineno = stripped.length / wrap;
        for (i = 0; i < lineno; i++)
            lines[i]=stripped.substr(i * wrap, wrap);
        if (lineno != stripped.length / wrap)
            lines[lines.length]=stripped.substr(lineno * wrap, stripped.length-(lineno * wrap));
            
        for (i = 0; i < lines.length; i++)
            destripped.push(lines[i]);
        return destripped.join('\n');
    },
    
    decodeAsArray: function (input){
        var dec = this.decode(input),
            ar = [], i;
        for (i=0;i<dec.length;i++){
            ar[i]=dec.charCodeAt(i);
        }
        return ar;
    },
    
    decodeGEONExT : function (input) {
        return decodeAsArray(destrip(input),false);
    }
};

/**
 * @private
 */
JXG.Util.asciiCharCodeAt = function(str,i){
	var c = str.charCodeAt(i);
	if (c>255){
    	switch (c) {
			case 8364: c=128;
	    	break;
	    	case 8218: c=130;
	    	break;
	    	case 402: c=131;
	    	break;
	    	case 8222: c=132;
	    	break;
	    	case 8230: c=133;
	    	break;
	    	case 8224: c=134;
	    	break;
	    	case 8225: c=135;
	    	break;
	    	case 710: c=136;
	    	break;
	    	case 8240: c=137;
	    	break;
	    	case 352: c=138;
	    	break;
	    	case 8249: c=139;
	    	break;
	    	case 338: c=140;
	    	break;
	    	case 381: c=142;
	    	break;
	    	case 8216: c=145;
	    	break;
	    	case 8217: c=146;
	    	break;
	    	case 8220: c=147;
	    	break;
	    	case 8221: c=148;
	    	break;
	    	case 8226: c=149;
	    	break;
	    	case 8211: c=150;
	    	break;
	    	case 8212: c=151;
	    	break;
	    	case 732: c=152;
	    	break;
	    	case 8482: c=153;
	    	break;
	    	case 353: c=154;
	    	break;
	    	case 8250: c=155;
	    	break;
	    	case 339: c=156;
	    	break;
	    	case 382: c=158;
	    	break;
	    	case 376: c=159;
	    	break;
	    	default:
	    	break;
	    }
	}
	return c;
};

/**
 * Decoding string into utf-8
 * @param {String} string to decode
 * @return {String} utf8 decoded string
 */
JXG.Util.utf8Decode = function(utftext) {
  var string = [];
  var i = 0;
  var c = 0, c1 = 0, c2 = 0;

  while ( i < utftext.length ) {
    c = utftext.charCodeAt(i);

    if (c < 128) {
      string.push(String.fromCharCode(c));
      i++;
    } else if((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i+1);
      string.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i+1);
      c3 = utftext.charCodeAt(i+2);
      string.push(String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
      i += 3;
    }
  };
  return string.join('');
};

// Added to exports for Cocos2d
module.exports = JXG;

}};
__resources__["/__builtin__/libs/Plist.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/**
 * XML Node types
 */
var ELEMENT_NODE                = 1,
    ATTRIBUTE_NODE              = 2,
    TEXT_NODE                   = 3,
    CDATA_SECTION_NODE          = 4,
    ENTITY_REFERENCE_NODE       = 5,
    ENTITY_NODE                 = 6,
    PROCESSING_INSTRUCTION_NODE = 7,
    COMMENT_NODE                = 8,
    DOCUMENT_NODE               = 9,
    DOCUMENT_TYPE_NODE          = 10,
    DOCUMENT_FRAGMENT_NODE      = 11,
    NOTATION_NODE               = 12;


var Plist = BObject.extend (/** @lends Plist# */{
    /**
     * The unserialized data inside the Plist file
     * @type Object
     */
    data: null,

    /**
     * An object representation of an XML Property List file
     *
     * @constructs
     * @extends BObject
     * @param {Options} opts Options
     * @config {String} [file] The path to a .plist file
     * @config {String} [data] The contents of a .plist file
     */
    init: function(opts) {
        var file = opts['file'],
            data = opts['data'];

        if (file && !data) {
            data = resource(file);
        }


        var parser = new DOMParser(),
            doc = parser.parseFromString(data, 'text/xml'),
            plist = doc.documentElement;

        if (plist.tagName != 'plist') {
            throw "Not a plist file";
        }


        // Get first real node
        var node = null;
        for (var i = 0, len = plist.childNodes.length; i < len; i++) {
            node = plist.childNodes[i];
            if (node.nodeType == ELEMENT_NODE) {
                break;
            }
        }

        this.set('data', this.parseNode_(node));
    },


    /**
     * @private
     * Parses an XML node inside the Plist file
     * @returns {Object/Array/String/Integer/Float} A JS representation of the node value
     */
    parseNode_: function(node) {
        var data = null;
        switch(node.tagName) {
        case 'dict':
            data = this.parseDict_(node); 
            break;
        case 'array':
            data = this.parseArray_(node); 
            break;
        case 'string':
            // FIXME - This needs to handle Firefox's 4KB nodeValue limit
            data = node.firstChild.nodeValue;
            break
        case 'false':
            data = false;
            break
        case 'true':
            data = true;
            break
        case 'real':
            data = parseFloat(node.firstChild.nodeValue);
            break
        case 'integer':
            data = parseInt(node.firstChild.nodeValue, 10);
            break
        }

        return data;
    },

    /**
     * @private
     * Parses a <dict> node in a plist file
     *
     * @param {XMLElement}
     * @returns {Object} A simple key/value JS Object representing the <dict>
     */
    parseDict_: function(node) {
        var data = {};

        var key = null;
        for (var i = 0, len = node.childNodes.length; i < len; i++) {
            var child = node.childNodes[i];
            if (child.nodeType != ELEMENT_NODE) {
                continue;
            }

            // Grab the key, next noe should be the value
            if (child.tagName == 'key') {
                key = child.firstChild.nodeValue;
            } else {
                // Parse the value node
                data[key] = this.parseNode_(child);
            }
        }


        return data;
    },

    /**
     * @private
     * Parses an <array> node in a plist file
     *
     * @param {XMLElement}
     * @returns {Array} A simple JS Array representing the <array>
     */
    parseArray_: function(node) {
        var data = [];

        for (var i = 0, len = node.childNodes.length; i < len; i++) {
            var child = node.childNodes[i];
            if (child.nodeType != ELEMENT_NODE) {
                continue;
            }

            data.push(this.parseNode_(child));
        }

        return data;
    }
});


exports.Plist = Plist;

}};
__resources__["/__builtin__/libs/qunit.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/*
 * QUnit - A JavaScript Unit Testing Framework
 * 
 * http://docs.jquery.com/QUnit
 *
 * Copyright (c) 2011 John Resig, Jörn Zaefferer
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * or GPL (GPL-LICENSE.txt) licenses.
 */

(function(window) {

var defined = {
	setTimeout: typeof window.setTimeout !== "undefined",
	sessionStorage: (function() {
		try {
			return !!sessionStorage.getItem;
		} catch(e){
			return false;
		}
  })()
}

var testId = 0;

var Test = function(name, testName, expected, testEnvironmentArg, async, callback) {
	this.name = name;
	this.testName = testName;
	this.expected = expected;
	this.testEnvironmentArg = testEnvironmentArg;
	this.async = async;
	this.callback = callback;
	this.assertions = [];
};
Test.prototype = {
	init: function() {
		var tests = id("qunit-tests");
		if (tests) {
			var b = document.createElement("strong");
				b.innerHTML = "Running " + this.name;
			var li = document.createElement("li");
				li.appendChild( b );
				li.id = this.id = "test-output" + testId++;
			tests.appendChild( li );
		}
	},
	setup: function() {
		if (this.module != config.previousModule) {
			if ( config.previousModule ) {
				QUnit.moduleDone( {
					name: config.previousModule,
					failed: config.moduleStats.bad,
					passed: config.moduleStats.all - config.moduleStats.bad,
					total: config.moduleStats.all
				} );
			}
			config.previousModule = this.module;
			config.moduleStats = { all: 0, bad: 0 };
			QUnit.moduleStart( {
				name: this.module
			} );
		}

		config.current = this;
		this.testEnvironment = extend({
			setup: function() {},
			teardown: function() {}
		}, this.moduleTestEnvironment);
		if (this.testEnvironmentArg) {
			extend(this.testEnvironment, this.testEnvironmentArg);
		}

		QUnit.testStart( {
			name: this.testName
		} );

		// allow utility functions to access the current test environment
		// TODO why??
		QUnit.current_testEnvironment = this.testEnvironment;
		
		try {
			if ( !config.pollution ) {
				saveGlobal();
			}

			this.testEnvironment.setup.call(this.testEnvironment);
		} catch(e) {
			QUnit.ok( false, "Setup failed on " + this.testName + ": " + e.message );
		}
	},
	run: function() {
		if ( this.async ) {
			QUnit.stop();
		}

		if ( config.notrycatch ) {
			this.callback.call(this.testEnvironment);
			return;
		}
		try {
			this.callback.call(this.testEnvironment);
		} catch(e) {
			fail("Test " + this.testName + " died, exception and test follows", e, this.callback);
			QUnit.ok( false, "Died on test #" + (this.assertions.length + 1) + ": " + e.message + " - " + QUnit.jsDump.parse(e) );
			// else next test will carry the responsibility
			saveGlobal();

			// Restart the tests if they're blocking
			if ( config.blocking ) {
				start();
			}
		}
	},
	teardown: function() {
		try {
			checkPollution();
			this.testEnvironment.teardown.call(this.testEnvironment);
		} catch(e) {
			QUnit.ok( false, "Teardown failed on " + this.testName + ": " + e.message );
		}
	},
	finish: function() {
		if ( this.expected && this.expected != this.assertions.length ) {
			QUnit.ok( false, "Expected " + this.expected + " assertions, but " + this.assertions.length + " were run" );
		}
		
		var good = 0, bad = 0,
			tests = id("qunit-tests");

		config.stats.all += this.assertions.length;
		config.moduleStats.all += this.assertions.length;

		if ( tests ) {
			var ol  = document.createElement("ol");

			for ( var i = 0; i < this.assertions.length; i++ ) {
				var assertion = this.assertions[i];

				var li = document.createElement("li");
				li.className = assertion.result ? "pass" : "fail";
				li.innerHTML = assertion.message || (assertion.result ? "okay" : "failed");
				ol.appendChild( li );

				if ( assertion.result ) {
					good++;
				} else {
					bad++;
					config.stats.bad++;
					config.moduleStats.bad++;
				}
			}

			// store result when possible
			defined.sessionStorage && sessionStorage.setItem("qunit-" + this.testName, bad);

			if (bad == 0) {
				ol.style.display = "none";
			}

			var b = document.createElement("strong");
			b.innerHTML = this.name + " <b class='counts'>(<b class='failed'>" + bad + "</b>, <b class='passed'>" + good + "</b>, " + this.assertions.length + ")</b>";
			
			addEvent(b, "click", function() {
				var next = b.nextSibling, display = next.style.display;
				next.style.display = display === "none" ? "block" : "none";
			});
			
			addEvent(b, "dblclick", function(e) {
				var target = e && e.target ? e.target : window.event.srcElement;
				if ( target.nodeName.toLowerCase() == "span" || target.nodeName.toLowerCase() == "b" ) {
					target = target.parentNode;
				}
				if ( window.location && target.nodeName.toLowerCase() === "strong" ) {
					window.location.search = "?" + encodeURIComponent(getText([target]).replace(/\(.+\)$/, "").replace(/(^\s*|\s*$)/g, ""));
				}
			});

			var li = id(this.id);
			li.className = bad ? "fail" : "pass";
			li.style.display = resultDisplayStyle(!bad);
			li.removeChild( li.firstChild );
			li.appendChild( b );
			li.appendChild( ol );

		} else {
			for ( var i = 0; i < this.assertions.length; i++ ) {
				if ( !this.assertions[i].result ) {
					bad++;
					config.stats.bad++;
					config.moduleStats.bad++;
				}
			}
		}

		try {
			QUnit.reset();
		} catch(e) {
			fail("reset() failed, following Test " + this.testName + ", exception and reset fn follows", e, QUnit.reset);
		}

		QUnit.testDone( {
			name: this.testName,
			failed: bad,
			passed: this.assertions.length - bad,
			total: this.assertions.length
		} );
	},
	
	queue: function() {
		var test = this;
		synchronize(function() {
			test.init();
		});
		function run() {
			// each of these can by async
			synchronize(function() {
				test.setup();
			});
			synchronize(function() {
				test.run();
			});
			synchronize(function() {
				test.teardown();
			});
			synchronize(function() {
				test.finish();
			});
		}
		// defer when previous test run passed, if storage is available
		var bad = defined.sessionStorage && +sessionStorage.getItem("qunit-" + this.testName);
		if (bad) {
			run();
		} else {
			synchronize(run);
		};
	}
	
}

var QUnit = {

	// call on start of module test to prepend name to all tests
	module: function(name, testEnvironment) {
		config.currentModule = name;
		config.currentModuleTestEnviroment = testEnvironment;
	},

	asyncTest: function(testName, expected, callback) {
		if ( arguments.length === 2 ) {
			callback = expected;
			expected = 0;
		}

		QUnit.test(testName, expected, callback, true);
	},
	
	test: function(testName, expected, callback, async) {
		var name = '<span class="test-name">' + testName + '</span>', testEnvironmentArg;

		if ( arguments.length === 2 ) {
			callback = expected;
			expected = null;
		}
		// is 2nd argument a testEnvironment?
		if ( expected && typeof expected === 'object') {
			testEnvironmentArg =  expected;
			expected = null;
		}

		if ( config.currentModule ) {
			name = '<span class="module-name">' + config.currentModule + "</span>: " + name;
		}

		if ( !validTest(config.currentModule + ": " + testName) ) {
			return;
		}
		
		var test = new Test(name, testName, expected, testEnvironmentArg, async, callback);
		test.module = config.currentModule;
		test.moduleTestEnvironment = config.currentModuleTestEnviroment;
		test.queue();
	},
	
	/**
	 * Specify the number of expected assertions to gurantee that failed test (no assertions are run at all) don't slip through.
	 */
	expect: function(asserts) {
		config.current.expected = asserts;
	},

	/**
	 * Asserts true.
	 * @example ok( "asdfasdf".length > 5, "There must be at least 5 chars" );
	 */
	ok: function(a, msg) {
		a = !!a;
		var details = {
			result: a,
			message: msg
		};
		msg = escapeHtml(msg);
		QUnit.log(details);
		config.current.assertions.push({
			result: a,
			message: msg
		});
	},

	/**
	 * Checks that the first two arguments are equal, with an optional message.
	 * Prints out both actual and expected values.
	 *
	 * Prefered to ok( actual == expected, message )
	 *
	 * @example equal( format("Received {0} bytes.", 2), "Received 2 bytes." );
	 *
	 * @param Object actual
	 * @param Object expected
	 * @param String message (optional)
	 */
	equal: function(actual, expected, message) {
		QUnit.push(expected == actual, actual, expected, message);
	},

	notEqual: function(actual, expected, message) {
		QUnit.push(expected != actual, actual, expected, message);
	},
	
	deepEqual: function(actual, expected, message) {
		QUnit.push(QUnit.equiv(actual, expected), actual, expected, message);
	},

	notDeepEqual: function(actual, expected, message) {
		QUnit.push(!QUnit.equiv(actual, expected), actual, expected, message);
	},

	strictEqual: function(actual, expected, message) {
		QUnit.push(expected === actual, actual, expected, message);
	},

	notStrictEqual: function(actual, expected, message) {
		QUnit.push(expected !== actual, actual, expected, message);
	},

	raises: function(block, expected, message) {
		var actual, ok = false;
	
		if (typeof expected === 'string') {
			message = expected;
			expected = null;
		}
	
		try {
			block();
		} catch (e) {
			actual = e;
		}
	
		if (actual) {
			// we don't want to validate thrown error
			if (!expected) {
				ok = true;
			// expected is a regexp	
			} else if (QUnit.objectType(expected) === "regexp") {
				ok = expected.test(actual);
			// expected is a constructor	
			} else if (actual instanceof expected) {
				ok = true;
			// expected is a validation function which returns true is validation passed	
			} else if (expected.call({}, actual) === true) {
				ok = true;
			}
		}
			
		QUnit.ok(ok, message);
	},

	start: function() {
		config.semaphore--;
		if (config.semaphore > 0) {
			// don't start until equal number of stop-calls
			return;
		}
		if (config.semaphore < 0) {
			// ignore if start is called more often then stop
			config.semaphore = 0;
		}
		// A slight delay, to avoid any current callbacks
		if ( defined.setTimeout ) {
			window.setTimeout(function() {
				if ( config.timeout ) {
					clearTimeout(config.timeout);
				}

				config.blocking = false;
				process();
			}, 13);
		} else {
			config.blocking = false;
			process();
		}
	},
	
	stop: function(timeout) {
		config.semaphore++;
		config.blocking = true;

		if ( timeout && defined.setTimeout ) {
			clearTimeout(config.timeout);
			config.timeout = window.setTimeout(function() {
				QUnit.ok( false, "Test timed out" );
				QUnit.start();
			}, timeout);
		}
	}

};

// Backwards compatibility, deprecated
QUnit.equals = QUnit.equal;
QUnit.same = QUnit.deepEqual;

// Maintain internal state
var config = {
	// The queue of tests to run
	queue: [],

	// block until document ready
	blocking: true
};

// Load paramaters
(function() {
	var location = window.location || { search: "", protocol: "file:" },
		GETParams = location.search.slice(1).split('&');

	for ( var i = 0; i < GETParams.length; i++ ) {
		GETParams[i] = decodeURIComponent( GETParams[i] );
		if ( GETParams[i] === "noglobals" ) {
			GETParams.splice( i, 1 );
			i--;
			config.noglobals = true;
		} else if ( GETParams[i] === "notrycatch" ) {
			GETParams.splice( i, 1 );
			i--;
			config.notrycatch = true;
		} else if ( GETParams[i].search('=') > -1 ) {
			GETParams.splice( i, 1 );
			i--;
		}
	}
	
	// restrict modules/tests by get parameters
	config.filters = GETParams;
	
	// Figure out if we're running the tests from a server or not
	QUnit.isLocal = !!(location.protocol === 'file:');
})();

// Expose the API as global variables, unless an 'exports'
// object exists, in that case we assume we're in CommonJS
if ( typeof exports === "undefined" || typeof require === "undefined" ) {
	extend(window, QUnit);
	window.QUnit = QUnit;
} else {
	extend(exports, QUnit);
	exports.QUnit = QUnit;
}

// define these after exposing globals to keep them in these QUnit namespace only
extend(QUnit, {
	config: config,

	// Initialize the configuration options
	init: function() {
		extend(config, {
			stats: { all: 0, bad: 0 },
			moduleStats: { all: 0, bad: 0 },
			started: +new Date,
			updateRate: 1000,
			blocking: false,
			autostart: true,
			autorun: false,
			filters: [],
			queue: [],
			semaphore: 0
		});

		var tests = id("qunit-tests"),
			banner = id("qunit-banner"),
			result = id("qunit-testresult");

		if ( tests ) {
			tests.innerHTML = "";
		}

		if ( banner ) {
			banner.className = "";
		}

		if ( result ) {
			result.parentNode.removeChild( result );
		}
	},
	
	/**
	 * Resets the test setup. Useful for tests that modify the DOM.
	 * 
	 * If jQuery is available, uses jQuery's html(), otherwise just innerHTML.
	 */
	reset: function() {
		if ( window.jQuery ) {
			jQuery( "#main, #qunit-fixture" ).html( config.fixture );
		} else {
			var main = id( 'main' ) || id( 'qunit-fixture' );
			if ( main ) {
				main.innerHTML = config.fixture;
			}
		}
	},
	
	/**
	 * Trigger an event on an element.
	 *
	 * @example triggerEvent( document.body, "click" );
	 *
	 * @param DOMElement elem
	 * @param String type
	 */
	triggerEvent: function( elem, type, event ) {
		if ( document.createEvent ) {
			event = document.createEvent("MouseEvents");
			event.initMouseEvent(type, true, true, elem.ownerDocument.defaultView,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			elem.dispatchEvent( event );

		} else if ( elem.fireEvent ) {
			elem.fireEvent("on"+type);
		}
	},
	
	// Safe object type checking
	is: function( type, obj ) {
		return QUnit.objectType( obj ) == type;
	},
	
	objectType: function( obj ) {
		if (typeof obj === "undefined") {
				return "undefined";

		// consider: typeof null === object
		}
		if (obj === null) {
				return "null";
		}

		var type = Object.prototype.toString.call( obj )
			.match(/^\[object\s(.*)\]$/)[1] || '';

		switch (type) {
				case 'Number':
						if (isNaN(obj)) {
								return "nan";
						} else {
								return "number";
						}
				case 'String':
				case 'Boolean':
				case 'Array':
				case 'Date':
				case 'RegExp':
				case 'Function':
						return type.toLowerCase();
		}
		if (typeof obj === "object") {
				return "object";
		}
		return undefined;
	},
	
	push: function(result, actual, expected, message) {
		var details = {
			result: result,
			message: message,
			actual: actual,
			expected: expected
		};
		
		message = escapeHtml(message) || (result ? "okay" : "failed");
		message = '<span class="test-message">' + message + "</span>";
		expected = escapeHtml(QUnit.jsDump.parse(expected));
		actual = escapeHtml(QUnit.jsDump.parse(actual));
		var output = message + '<table><tr class="test-expected"><th>Expected: </th><td><pre>' + expected + '</pre></td></tr>';
		if (actual != expected) {
			output += '<tr class="test-actual"><th>Result: </th><td><pre>' + actual + '</pre></td></tr>';
			output += '<tr class="test-diff"><th>Diff: </th><td><pre>' + QUnit.diff(expected, actual) +'</pre></td></tr>';
		}
		if (!result) {
			var source = sourceFromStacktrace();
			if (source) {
				details.source = source;
				output += '<tr class="test-source"><th>Source: </th><td><pre>' + source +'</pre></td></tr>';
			}
		}
		output += "</table>";
		
		QUnit.log(details);
		
		config.current.assertions.push({
			result: !!result,
			message: output
		});
	},
	
	// Logging callbacks; all receive a single argument with the listed properties
	// run test/logs.html for any related changes
	begin: function() {},
	// done: { failed, passed, total, runtime }
	done: function() {},
	// log: { result, actual, expected, message }
	log: function() {},
	// testStart: { name }
	testStart: function() {},
	// testDone: { name, failed, passed, total }
	testDone: function() {},
	// moduleStart: { name }
	moduleStart: function() {},
	// moduleDone: { name, failed, passed, total }
	moduleDone: function() {}
});

if ( typeof document === "undefined" || document.readyState === "complete" ) {
	config.autorun = true;
}

addEvent(window, "load", function() {
	QUnit.begin({});
	
	// Initialize the config, saving the execution queue
	var oldconfig = extend({}, config);
	QUnit.init();
	extend(config, oldconfig);

	config.blocking = false;

	var userAgent = id("qunit-userAgent");
	if ( userAgent ) {
		userAgent.innerHTML = navigator.userAgent;
	}
	var banner = id("qunit-header");
	if ( banner ) {
		var paramsIndex = location.href.lastIndexOf(location.search);
		if ( paramsIndex > -1 ) {
			var mainPageLocation = location.href.slice(0, paramsIndex);
			if ( mainPageLocation == location.href ) {
				banner.innerHTML = '<a href=""> ' + banner.innerHTML + '</a> ';
			} else {
				var testName = decodeURIComponent(location.search.slice(1));
				banner.innerHTML = '<a href="' + mainPageLocation + '">' + banner.innerHTML + '</a> &#8250; <a href="">' + testName + '</a>';
			}
		}
	}
	
	var toolbar = id("qunit-testrunner-toolbar");
	if ( toolbar ) {
		var filter = document.createElement("input");
		filter.type = "checkbox";
		filter.id = "qunit-filter-pass";
		addEvent( filter, "click", function() {
			var li = document.getElementsByTagName("li");
			for ( var i = 0; i < li.length; i++ ) {
				if ( li[i].className.indexOf("pass") > -1 ) {
					li[i].style.display = filter.checked ? "none" : "";
				}
			}
			if ( defined.sessionStorage ) {
				sessionStorage.setItem("qunit-filter-passed-tests", filter.checked ? "true" : "");
			}
		});
		if ( defined.sessionStorage && sessionStorage.getItem("qunit-filter-passed-tests") ) {
			filter.checked = true;
		}
		toolbar.appendChild( filter );

		var label = document.createElement("label");
		label.setAttribute("for", "qunit-filter-pass");
		label.innerHTML = "Hide passed tests";
		toolbar.appendChild( label );
	}

	var main = id('main') || id('qunit-fixture');
	if ( main ) {
		config.fixture = main.innerHTML;
	}

	if (config.autostart) {
		QUnit.start();
	}
});

function done() {
	config.autorun = true;

	// Log the last module results
	if ( config.currentModule ) {
		QUnit.moduleDone( {
			name: config.currentModule,
			failed: config.moduleStats.bad,
			passed: config.moduleStats.all - config.moduleStats.bad,
			total: config.moduleStats.all
		} );
	}

	var banner = id("qunit-banner"),
		tests = id("qunit-tests"),
		runtime = +new Date - config.started,
		passed = config.stats.all - config.stats.bad,
		html = [
			'Tests completed in ',
			runtime,
			' milliseconds.<br/>',
			'<span class="passed">',
			passed,
			'</span> tests of <span class="total">',
			config.stats.all,
			'</span> passed, <span class="failed">',
			config.stats.bad,
			'</span> failed.'
		].join('');

	if ( banner ) {
		banner.className = (config.stats.bad ? "qunit-fail" : "qunit-pass");
	}

	if ( tests ) {	
		var result = id("qunit-testresult");

		if ( !result ) {
			result = document.createElement("p");
			result.id = "qunit-testresult";
			result.className = "result";
			tests.parentNode.insertBefore( result, tests.nextSibling );
		}

		result.innerHTML = html;
	}

	QUnit.done( {
		failed: config.stats.bad,
		passed: passed, 
		total: config.stats.all,
		runtime: runtime
	} );
}

function validTest( name ) {
	var i = config.filters.length,
		run = false;

	if ( !i ) {
		return true;
	}
	
	while ( i-- ) {
		var filter = config.filters[i],
			not = filter.charAt(0) == '!';

		if ( not ) {
			filter = filter.slice(1);
		}

		if ( name.indexOf(filter) !== -1 ) {
			return !not;
		}

		if ( not ) {
			run = true;
		}
	}

	return run;
}

// so far supports only Firefox, Chrome and Opera (buggy)
// could be extended in the future to use something like https://github.com/csnover/TraceKit
function sourceFromStacktrace() {
	try {
		throw new Error();
	} catch ( e ) {
		if (e.stacktrace) {
			// Opera
			return e.stacktrace.split("\n")[6];
		} else if (e.stack) {
			// Firefox, Chrome
			return e.stack.split("\n")[4];
		}
	}
}

function resultDisplayStyle(passed) {
	return passed && id("qunit-filter-pass") && id("qunit-filter-pass").checked ? 'none' : '';
}

function escapeHtml(s) {
	if (!s) {
		return "";
	}
	s = s + "";
	return s.replace(/[\&"<>\\]/g, function(s) {
		switch(s) {
			case "&": return "&amp;";
			case "\\": return "\\\\";
			case '"': return '\"';
			case "<": return "&lt;";
			case ">": return "&gt;";
			default: return s;
		}
	});
}

function synchronize( callback ) {
	config.queue.push( callback );

	if ( config.autorun && !config.blocking ) {
		process();
	}
}

function process() {
	var start = (new Date()).getTime();

	while ( config.queue.length && !config.blocking ) {
		if ( config.updateRate <= 0 || (((new Date()).getTime() - start) < config.updateRate) ) {
			config.queue.shift()();
		} else {
			window.setTimeout( process, 13 );
			break;
		}
	}
  if (!config.blocking && !config.queue.length) {
    done();
  }
}

function saveGlobal() {
	config.pollution = [];
	
	if ( config.noglobals ) {
		for ( var key in window ) {
			config.pollution.push( key );
		}
	}
}

function checkPollution( name ) {
	var old = config.pollution;
	saveGlobal();
	
	var newGlobals = diff( old, config.pollution );
	if ( newGlobals.length > 0 ) {
		ok( false, "Introduced global variable(s): " + newGlobals.join(", ") );
		config.current.expected++;
	}

	var deletedGlobals = diff( config.pollution, old );
	if ( deletedGlobals.length > 0 ) {
		ok( false, "Deleted global variable(s): " + deletedGlobals.join(", ") );
		config.current.expected++;
	}
}

// returns a new Array with the elements that are in a but not in b
function diff( a, b ) {
	var result = a.slice();
	for ( var i = 0; i < result.length; i++ ) {
		for ( var j = 0; j < b.length; j++ ) {
			if ( result[i] === b[j] ) {
				result.splice(i, 1);
				i--;
				break;
			}
		}
	}
	return result;
}

function fail(message, exception, callback) {
	if ( typeof console !== "undefined" && console.error && console.warn ) {
		console.error(message);
		console.error(exception);
		console.warn(callback.toString());

	} else if ( window.opera && opera.postError ) {
		opera.postError(message, exception, callback.toString);
	}
}

function extend(a, b) {
	for ( var prop in b ) {
		a[prop] = b[prop];
	}

	return a;
}

function addEvent(elem, type, fn) {
	if ( elem.addEventListener ) {
		elem.addEventListener( type, fn, false );
	} else if ( elem.attachEvent ) {
		elem.attachEvent( "on" + type, fn );
	} else {
		fn();
	}
}

function id(name) {
	return !!(typeof document !== "undefined" && document && document.getElementById) &&
		document.getElementById( name );
}

// Test for equality any JavaScript type.
// Discussions and reference: http://philrathe.com/articles/equiv
// Test suites: http://philrathe.com/tests/equiv
// Author: Philippe Rathé <prathe@gmail.com>
QUnit.equiv = function () {

    var innerEquiv; // the real equiv function
    var callers = []; // stack to decide between skip/abort functions
    var parents = []; // stack to avoiding loops from circular referencing

    // Call the o related callback with the given arguments.
    function bindCallbacks(o, callbacks, args) {
        var prop = QUnit.objectType(o);
        if (prop) {
            if (QUnit.objectType(callbacks[prop]) === "function") {
                return callbacks[prop].apply(callbacks, args);
            } else {
                return callbacks[prop]; // or undefined
            }
        }
    }
    
    var callbacks = function () {

        // for string, boolean, number and null
        function useStrictEquality(b, a) {
            if (b instanceof a.constructor || a instanceof b.constructor) {
                // to catch short annotaion VS 'new' annotation of a declaration
                // e.g. var i = 1;
                //      var j = new Number(1);
                return a == b;
            } else {
                return a === b;
            }
        }

        return {
            "string": useStrictEquality,
            "boolean": useStrictEquality,
            "number": useStrictEquality,
            "null": useStrictEquality,
            "undefined": useStrictEquality,

            "nan": function (b) {
                return isNaN(b);
            },

            "date": function (b, a) {
                return QUnit.objectType(b) === "date" && a.valueOf() === b.valueOf();
            },

            "regexp": function (b, a) {
                return QUnit.objectType(b) === "regexp" &&
                    a.source === b.source && // the regex itself
                    a.global === b.global && // and its modifers (gmi) ...
                    a.ignoreCase === b.ignoreCase &&
                    a.multiline === b.multiline;
            },

            // - skip when the property is a method of an instance (OOP)
            // - abort otherwise,
            //   initial === would have catch identical references anyway
            "function": function () {
                var caller = callers[callers.length - 1];
                return caller !== Object &&
                        typeof caller !== "undefined";
            },

            "array": function (b, a) {
                var i, j, loop;
                var len;

                // b could be an object literal here
                if ( ! (QUnit.objectType(b) === "array")) {
                    return false;
                }   
                
                len = a.length;
                if (len !== b.length) { // safe and faster
                    return false;
                }
                
                //track reference to avoid circular references
                parents.push(a);
                for (i = 0; i < len; i++) {
                    loop = false;
                    for(j=0;j<parents.length;j++){
                        if(parents[j] === a[i]){
                            loop = true;//dont rewalk array
                        }
                    }
                    if (!loop && ! innerEquiv(a[i], b[i])) {
                        parents.pop();
                        return false;
                    }
                }
                parents.pop();
                return true;
            },

            "object": function (b, a) {
                var i, j, loop;
                var eq = true; // unless we can proove it
                var aProperties = [], bProperties = []; // collection of strings

                // comparing constructors is more strict than using instanceof
                if ( a.constructor !== b.constructor) {
                    return false;
                }

                // stack constructor before traversing properties
                callers.push(a.constructor);
                //track reference to avoid circular references
                parents.push(a);
                
                for (i in a) { // be strict: don't ensures hasOwnProperty and go deep
                    loop = false;
                    for(j=0;j<parents.length;j++){
                        if(parents[j] === a[i])
                            loop = true; //don't go down the same path twice
                    }
                    aProperties.push(i); // collect a's properties

                    if (!loop && ! innerEquiv(a[i], b[i])) {
                        eq = false;
                        break;
                    }
                }

                callers.pop(); // unstack, we are done
                parents.pop();

                for (i in b) {
                    bProperties.push(i); // collect b's properties
                }

                // Ensures identical properties name
                return eq && innerEquiv(aProperties.sort(), bProperties.sort());
            }
        };
    }();

    innerEquiv = function () { // can take multiple arguments
        var args = Array.prototype.slice.apply(arguments);
        if (args.length < 2) {
            return true; // end transition
        }

        return (function (a, b) {
            if (a === b) {
                return true; // catch the most you can
            } else if (a === null || b === null || typeof a === "undefined" || typeof b === "undefined" || QUnit.objectType(a) !== QUnit.objectType(b)) {
                return false; // don't lose time with error prone cases
            } else {
                return bindCallbacks(a, callbacks, [b, a]);
            }

        // apply transition with (1..n) arguments
        })(args[0], args[1]) && arguments.callee.apply(this, args.splice(1, args.length -1));
    };

    return innerEquiv;

}();

/**
 * jsDump
 * Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Licensed under BSD (http://www.opensource.org/licenses/bsd-license.php)
 * Date: 5/15/2008
 * @projectDescription Advanced and extensible data dumping for Javascript.
 * @version 1.0.0
 * @author Ariel Flesler
 * @link {http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html}
 */
QUnit.jsDump = (function() {
	function quote( str ) {
		return '"' + str.toString().replace(/"/g, '\\"') + '"';
	};
	function literal( o ) {
		return o + '';	
	};
	function join( pre, arr, post ) {
		var s = jsDump.separator(),
			base = jsDump.indent(),
			inner = jsDump.indent(1);
		if ( arr.join )
			arr = arr.join( ',' + s + inner );
		if ( !arr )
			return pre + post;
		return [ pre, inner + arr, base + post ].join(s);
	};
	function array( arr ) {
		var i = arr.length,	ret = Array(i);					
		this.up();
		while ( i-- )
			ret[i] = this.parse( arr[i] );				
		this.down();
		return join( '[', ret, ']' );
	};
	
	var reName = /^function (\w+)/;
	
	var jsDump = {
		parse:function( obj, type ) { //type is used mostly internally, you can fix a (custom)type in advance
			var	parser = this.parsers[ type || this.typeOf(obj) ];
			type = typeof parser;			
			
			return type == 'function' ? parser.call( this, obj ) :
				   type == 'string' ? parser :
				   this.parsers.error;
		},
		typeOf:function( obj ) {
			var type;
			if ( obj === null ) {
				type = "null";
			} else if (typeof obj === "undefined") {
				type = "undefined";
			} else if (QUnit.is("RegExp", obj)) {
				type = "regexp";
			} else if (QUnit.is("Date", obj)) {
				type = "date";
			} else if (QUnit.is("Function", obj)) {
				type = "function";
			} else if (typeof obj.setInterval !== undefined && typeof obj.document !== "undefined" && typeof obj.nodeType === "undefined") {
				type = "window";
			} else if (obj.nodeType === 9) {
				type = "document";
			} else if (obj.nodeType) {
				type = "node";
			} else if (typeof obj === "object" && typeof obj.length === "number" && obj.length >= 0) {
				type = "array";
			} else {
				type = typeof obj;
			}
			return type;
		},
		separator:function() {
			return this.multiline ?	this.HTML ? '<br />' : '\n' : this.HTML ? '&nbsp;' : ' ';
		},
		indent:function( extra ) {// extra can be a number, shortcut for increasing-calling-decreasing
			if ( !this.multiline )
				return '';
			var chr = this.indentChar;
			if ( this.HTML )
				chr = chr.replace(/\t/g,'   ').replace(/ /g,'&nbsp;');
			return Array( this._depth_ + (extra||0) ).join(chr);
		},
		up:function( a ) {
			this._depth_ += a || 1;
		},
		down:function( a ) {
			this._depth_ -= a || 1;
		},
		setParser:function( name, parser ) {
			this.parsers[name] = parser;
		},
		// The next 3 are exposed so you can use them
		quote:quote, 
		literal:literal,
		join:join,
		//
		_depth_: 1,
		// This is the list of parsers, to modify them, use jsDump.setParser
		parsers:{
			window: '[Window]',
			document: '[Document]',
			error:'[ERROR]', //when no parser is found, shouldn't happen
			unknown: '[Unknown]',
			'null':'null',
			undefined:'undefined',
			'function':function( fn ) {
				var ret = 'function',
					name = 'name' in fn ? fn.name : (reName.exec(fn)||[])[1];//functions never have name in IE
				if ( name )
					ret += ' ' + name;
				ret += '(';
				
				ret = [ ret, QUnit.jsDump.parse( fn, 'functionArgs' ), '){'].join('');
				return join( ret, QUnit.jsDump.parse(fn,'functionCode'), '}' );
			},
			array: array,
			nodelist: array,
			arguments: array,
			object:function( map ) {
				var ret = [ ];
				QUnit.jsDump.up();
				for ( var key in map )
					ret.push( QUnit.jsDump.parse(key,'key') + ': ' + QUnit.jsDump.parse(map[key]) );
				QUnit.jsDump.down();
				return join( '{', ret, '}' );
			},
			node:function( node ) {
				var open = QUnit.jsDump.HTML ? '&lt;' : '<',
					close = QUnit.jsDump.HTML ? '&gt;' : '>';
					
				var tag = node.nodeName.toLowerCase(),
					ret = open + tag;
					
				for ( var a in QUnit.jsDump.DOMAttrs ) {
					var val = node[QUnit.jsDump.DOMAttrs[a]];
					if ( val )
						ret += ' ' + a + '=' + QUnit.jsDump.parse( val, 'attribute' );
				}
				return ret + close + open + '/' + tag + close;
			},
			functionArgs:function( fn ) {//function calls it internally, it's the arguments part of the function
				var l = fn.length;
				if ( !l ) return '';				
				
				var args = Array(l);
				while ( l-- )
					args[l] = String.fromCharCode(97+l);//97 is 'a'
				return ' ' + args.join(', ') + ' ';
			},
			key:quote, //object calls it internally, the key part of an item in a map
			functionCode:'[code]', //function calls it internally, it's the content of the function
			attribute:quote, //node calls it internally, it's an html attribute value
			string:quote,
			date:quote,
			regexp:literal, //regex
			number:literal,
			'boolean':literal
		},
		DOMAttrs:{//attributes to dump from nodes, name=>realName
			id:'id',
			name:'name',
			'class':'className'
		},
		HTML:false,//if true, entities are escaped ( <, >, \t, space and \n )
		indentChar:'  ',//indentation unit
		multiline:true //if true, items in a collection, are separated by a \n, else just a space.
	};

	return jsDump;
})();

// from Sizzle.js
function getText( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += getText( elem.childNodes );
		}
	}

	return ret;
};

/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 *  
 * Usage: QUnit.diff(expected, actual)
 * 
 * QUnit.diff("the quick brown fox jumped over", "the quick fox jumps over") == "the  quick <del>brown </del> fox <del>jumped </del><ins>jumps </ins> over"
 */
QUnit.diff = (function() {
	function diff(o, n){
		var ns = new Object();
		var os = new Object();
		
		for (var i = 0; i < n.length; i++) {
			if (ns[n[i]] == null) 
				ns[n[i]] = {
					rows: new Array(),
					o: null
				};
			ns[n[i]].rows.push(i);
		}
		
		for (var i = 0; i < o.length; i++) {
			if (os[o[i]] == null) 
				os[o[i]] = {
					rows: new Array(),
					n: null
				};
			os[o[i]].rows.push(i);
		}
		
		for (var i in ns) {
			if (ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1) {
				n[ns[i].rows[0]] = {
					text: n[ns[i].rows[0]],
					row: os[i].rows[0]
				};
				o[os[i].rows[0]] = {
					text: o[os[i].rows[0]],
					row: ns[i].rows[0]
				};
			}
		}
		
		for (var i = 0; i < n.length - 1; i++) {
			if (n[i].text != null && n[i + 1].text == null && n[i].row + 1 < o.length && o[n[i].row + 1].text == null &&
			n[i + 1] == o[n[i].row + 1]) {
				n[i + 1] = {
					text: n[i + 1],
					row: n[i].row + 1
				};
				o[n[i].row + 1] = {
					text: o[n[i].row + 1],
					row: i + 1
				};
			}
		}
		
		for (var i = n.length - 1; i > 0; i--) {
			if (n[i].text != null && n[i - 1].text == null && n[i].row > 0 && o[n[i].row - 1].text == null &&
			n[i - 1] == o[n[i].row - 1]) {
				n[i - 1] = {
					text: n[i - 1],
					row: n[i].row - 1
				};
				o[n[i].row - 1] = {
					text: o[n[i].row - 1],
					row: i - 1
				};
			}
		}
		
		return {
			o: o,
			n: n
		};
	}
	
	return function(o, n){
		o = o.replace(/\s+$/, '');
		n = n.replace(/\s+$/, '');
		var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/));

		var str = "";
		
		var oSpace = o.match(/\s+/g);
		if (oSpace == null) {
			oSpace = [" "];
		}
		else {
			oSpace.push(" ");
		}
		var nSpace = n.match(/\s+/g);
		if (nSpace == null) {
			nSpace = [" "];
		}
		else {
			nSpace.push(" ");
		}
		
		if (out.n.length == 0) {
			for (var i = 0; i < out.o.length; i++) {
				str += '<del>' + out.o[i] + oSpace[i] + "</del>";
			}
		}
		else {
			if (out.n[0].text == null) {
				for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
					str += '<del>' + out.o[n] + oSpace[n] + "</del>";
				}
			}
			
			for (var i = 0; i < out.n.length; i++) {
				if (out.n[i].text == null) {
					str += '<ins>' + out.n[i] + nSpace[i] + "</ins>";
				}
				else {
					var pre = "";
					
					for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++) {
						pre += '<del>' + out.o[n] + oSpace[n] + "</del>";
					}
					str += " " + out.n[i].text + nSpace[i] + pre;
				}
			}
		}
		
		return str;
	};
})();

})(this);

}};
__resources__["/__builtin__/libs/util.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
var path = require('path');

/**
 * @namespace
 * Useful utility functions
 */
var util = {
    /**
     * Merge two or more objects and return the result.
     *
     * @param {Object} firstObject First object to merge with
     * @param {Object} secondObject Second object to merge with
     * @param {Object} [...] More objects to merge
     * @returns {Object} A new object containing the properties of all the objects passed in
     */
    merge: function(firstObject, secondObject) {
        var result = {};

        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];

            for (var x in obj) {
                if (!obj.hasOwnProperty(x)) {
                    continue;
                }

                result[x] = obj[x];
            }
        };

        return result;
    },

    /**
     * Creates a deep copy of an object
     *
     * @param {Object} obj The Object to copy
     * @returns {Object} A copy of the original Object
     */
    copy: function(obj) {
        if (obj === null) {
            return null;
        }

        var copy;

        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = arguments.callee(obj[i]);
            }
        } else if (typeof(obj) == 'object') {
            if (typeof(obj.copy) == 'function') {
                copy = obj.copy();
            } else {
                copy = {};

                var o, x;
                for (x in obj) {
                    copy[x] = arguments.callee(obj[x]);
                }
            }
        } else {
            // Primative type. Doesn't need copying
            copy = obj;
        }

        return copy;
    },

    /**
     * Iterates over an array and calls a function for each item.
     *
     * @param {Array} arr An Array to iterate over
     * @param {Function} func A function to call for each item in the array
     * @returns {Array} The original array
     */
    each: function(arr, func) {
        var i = 0,
            len = arr.length;
        for (i = 0; i < len; i++) {
            func(arr[i], i);
        }

        return arr;
    },

    /**
     * Iterates over an array, calls a function for each item and returns the results.
     *
     * @param {Array} arr An Array to iterate over
     * @param {Function} func A function to call for each item in the array
     * @returns {Array} The return values from each function call
     */
    map: function(arr, func) {
        var i = 0,
            len = arr.length,
            result = [];

        for (i = 0; i < len; i++) {
            result.push(func(arr[i], i));
        }

        return result;
    },

    extend: function(target, ext) {
        if (arguments.length < 2) {
            throw "You must provide at least a target and 1 object to extend from"
        }

        var i, j, obj, key, val;

        for (i = 1; i < arguments.length; i++) {
            obj = arguments[i];
            for (key in obj) {
                // Don't copy built-ins
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }

                val = obj[key];
                // Don't copy undefineds or references to target (would cause infinite loop)
                if (val === undefined || val === target) {
                    continue;
                }

                // Replace existing function and store reference to it in .base
                if (val instanceof Function && target[key] && val !== target[key]) {
                    val.base = target[key];
                    val._isProperty = val.base._isProperty;
                }
                target[key] = val;

                if (val instanceof Function) {
                    // If this function observes make a reference to it so we can set
                    // them up when this get instantiated
                    if (val._observing) {
                        // Force a COPY of the array or we will probably end up with various
                        // classes sharing the same one.
                        if (!target._observingFunctions) {
                            target._observingFunctions = [];
                        } else {
                            target._observingFunctions = target._observingFunctions.slice(0);
                        }


                        for (j = 0; j<val._observing.length; j++) {
                            target._observingFunctions.push({property:val._observing[j], method: key});
                        }
                    } // if (val._observing)

                    // If this is a computer property then add it to the list so get/set know where to look
                    if (val._isProperty) {
                        if (!target._computedProperties) {
                            target._computedProperties = [];
                        } else {
                            target._computedProperties = target._computedProperties.slice(0);
                        }

                        target._computedProperties.push(key)
                    }
                }
        
            }
        }


        return target;
    },

    beget: function(o) {
        var F = function(){};
        F.prototype = o;
        var ret  = new F();
        F.prototype = null;
        return ret;
    },

    callback: function(target, method) {
        if (typeof(method) == 'string') {
            var methodName = method;
            method = target[method];
            if (!method) {
                throw "Callback to undefined method: " + methodName;
            }
        }
        if (!method) {
            throw "Callback with no method to call";
        }

        return function() {
            method.apply(target, arguments);
        }
    },

    domReady: function() {
        if (this._isReady) {
            return;
        }

        if (!document.body) {
            setTimeout(function() { util.domReady(); }, 13);
        }

        window.__isReady = true;

        if (window.__readyList) {
            var fn, i = 0;
            while ( (fn = window.__readyList[ i++ ]) ) {
                fn.call(document);
            }

            window.__readyList = null;
            delete window.__readyList;
        }
    },


    /**
     * Adapted from jQuery
     * @ignore
     */
    bindReady: function() {

        if (window.__readyBound) {
            return;
        }

        window.__readyBound = true;

        // Catch cases where $(document).ready() is called after the
        // browser event has already occurred.
        if ( document.readyState === "complete" ) {
            return util.domReady();
        }

        // Mozilla, Opera and webkit nightlies currently support this event
        if ( document.addEventListener ) {
            // Use the handy event callback
            //document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            
            // A fallback to window.onload, that will always work
            window.addEventListener( "load", util.domReady, false );

        // If IE event model is used
        } else if ( document.attachEvent ) {
            // ensure firing before onload,
            // maybe late but safe also for iframes
            //document.attachEvent("onreadystatechange", DOMContentLoaded);
            
            // A fallback to window.onload, that will always work
            window.attachEvent( "onload", util.domReady );

            // If IE and not a frame
            /*
            // continually check to see if the document is ready
            var toplevel = false;

            try {
                toplevel = window.frameElement == null;
            } catch(e) {}

            if ( document.documentElement.doScroll && toplevel ) {
                doScrollCheck();
            }
            */
        }
    },



    ready: function(func) {
        if (window.__isReady) {
            func()
        } else {
            if (!window.__readyList) {
                window.__readyList = [];
            }
            window.__readyList.push(func);
        }

        util.bindReady();
    },


    /**
     * Tests if a given object is an Array
     *
     * @param {Array} ar The object to test
     *
     * @returns {Boolean} True if it is an Array, otherwise false
     */
    isArray: function(ar) {
      return ar instanceof Array
          || (ar && ar !== Object.prototype && util.isArray(ar.__proto__));
    },


    /**
     * Tests if a given object is a RegExp
     *
     * @param {RegExp} ar The object to test
     *
     * @returns {Boolean} True if it is an RegExp, otherwise false
     */
    isRegExp: function(re) {
      var s = ""+re;
      return re instanceof RegExp // easy case
          || typeof(re) === "function" // duck-type for context-switching evalcx case
          && re.constructor.name === "RegExp"
          && re.compile
          && re.test
          && re.exec
          && s.charAt(0) === "/"
          && s.substr(-1) === "/";
    },


    /**
     * Tests if a given object is a Date
     *
     * @param {Date} ar The object to test
     *
     * @returns {Boolean} True if it is an Date, otherwise false
     */
    isDate: function(d) {
        if (d instanceof Date) return true;
        if (typeof d !== "object") return false;
        var properties = Date.prototype && Object.getOwnPropertyNames(Date.prototype);
        var proto = d.__proto__ && Object.getOwnPropertyNames(d.__proto__);
        return JSON.stringify(proto) === JSON.stringify(properties);
    },

    /**
     * Utility to populate a namespace's index with its modules
     *
     * @param {Object} parent The module the namespace lives in. parent.exports will be populated automatically
     * @param {String} modules A space separated string of all the module names
     *
     * @returns {Object} The index namespace
     */
    populateIndex: function(parent, modules) {
        var namespace = {};
        modules = modules.split(' ');

        util.each(modules, function(mod, i) {
            // Use the global 'require' which allows overriding the parent module
            util.extend(namespace, window.require('./' + mod, parent));
        });

        util.extend(parent.exports, namespace);

        return namespace;
    }


}

util.extend(String.prototype, /** @scope String.prototype */ {
    /**
     * Create an array of words from a string
     *
     * @returns {String[]} Array of the words in the string
     */
    w: function() {
        return this.split(' ');
    }
});




module.exports = util;

}};
__resources__["/__builtin__/path.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/** @namespace */
var path = {
    /**
     * Returns full directory path for the filename given. The path must be formed using forward slashes '/'.
     *
     * @param {String} path Path to return the directory name of
     * @returns {String} Directory name
     */
    dirname: function(path) {
        var tokens = path.split('/');
        tokens.pop();
        return tokens.join('/');
    },

    /**
     * Returns just the filename portion of a path.
     *
     * @param {String} path Path to return the filename portion of
     * @returns {String} Filename
     */
    basename: function(path) {
        var tokens = path.split('/');
        return tokens[tokens.length-1];
    },

    /**
     * Joins multiple paths together to form a single path
     * @param {String} ... Any number of string arguments to join together
     * @returns {String} The joined path
     */
    join: function () {
        return module.exports.normalize(Array.prototype.join.call(arguments, "/"));
    },

    /**
     * Tests if a path exists
     *
     * @param {String} path Path to test
     * @returns {Boolean} True if the path exists, false if not
     */
    exists: function(path) {
        return (__resources__[path] !== undefined);
    },

    /**
     * @private
     */
    normalizeArray: function (parts, keepBlanks) {
      var directories = [], prev;
      for (var i = 0, l = parts.length - 1; i <= l; i++) {
        var directory = parts[i];

        // if it's blank, but it's not the first thing, and not the last thing, skip it.
        if (directory === "" && i !== 0 && i !== l && !keepBlanks) continue;

        // if it's a dot, and there was some previous dir already, then skip it.
        if (directory === "." && prev !== undefined) continue;

        // if it starts with "", and is a . or .., then skip it.
        if (directories.length === 1 && directories[0] === "" && (
            directory === "." || directory === "..")) continue;

        if (
          directory === ".."
          && directories.length
          && prev !== ".."
          && prev !== "."
          && prev !== undefined
          && (prev !== "" || keepBlanks)
        ) {
          directories.pop();
          prev = directories.slice(-1)[0]
        } else {
          if (prev === ".") directories.pop();
          directories.push(directory);
          prev = directory;
        }
      }
      return directories;
    },

    /**
     * Returns the real path by expanding any '.' and '..' portions
     *
     * @param {String} path Path to normalize
     * @param {Boolean} [keepBlanks=false] Whether to keep blanks. i.e. double slashes in a path
     * @returns {String} Normalized path
     */
    normalize: function (path, keepBlanks) {
      return module.exports.normalizeArray(path.split("/"), keepBlanks).join("/");
    }
};

module.exports = path;

}};
__resources__["/__builtin__/system.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
/** @namespace */
var system = {
    /** @namespace */
    stdio: {
        /**
         * Print text and objects to the debug console if the browser has one
         * 
         * @param {*} Any value to output
         */
        print: function() {
            if (console) {
                console.log.apply(console, arguments);
            } else {
                // TODO
            }
        }
    }
};

if (window.console) {
    system.console = window.console
} else {
    system.console = {
        log: function(){}
    }
}

}};
__resources__["/Constant.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
﻿var Constant = function(){
    var waveArray = [{startAngle:-15,diffAngle:30,position:-0.25},{startAngle:15,diffAngle:-30,position:0.25}];
    var fishArray = [
                     {id:0,name:"イワシ",exp:1,length:20,weight:120,hp:2,attack:1,defence:0,size:1,file:'iwashi'},
                     {id:1,name:"キス",exp:1,length:30,weight:120,hp:2,attack:1,defence:0,size:1,file:'kiss'},
                     {id:2,name:"アジ",exp:1,length:30,weight:150,hp:4,attack:1,defence:0,size:1,file:'aji'},
                     {id:3,name:"サバ",exp:1,length:35,weight:350,hp:4,attack:1,defence:0,size:3,file:'saba'},
                     {id:4,name:"サンマ",exp:1,length:40,weight:150,hp:4,attack:1,defence:0,size:2,file:'sanma'},
                     {id:5,name:"サワラ",exp:2,length:80,weight:1500,hp:8,attack:1,defence:0,size:4,file:'sawara'},
                     {id:6,name:"スズキ",exp:3,length:80,weight:3000,hp:8,attack:1,defence:0,size:4,file:'suzuki'},
                     {id:7,name:"サケ",exp:2,length:80,weight:2000,hp:8,attack:1,defence:0,size:4,file:'sake'},
                     {id:8,name:"カツオ",exp:2,length:80,weight:4000,hp:8,attack:1,defence:0,size:5,file:'katsuo'},
                     {id:9,name:"ヒラメ",exp:3,length:100,weight:6000,hp:10,attack:1,defence:0,size:5,file:'hirame'},
                     {id:10,name:"タイ",exp:2,length:60,weight:1200,hp:10,attack:1,defence:0,size:4,file:'tai'},
                     {id:11,name:"マグロ",exp:4,length:300,weight:400000,hp:15,attack:1,defence:0,size:10,file:'maguro'},
                     {id:12,name:"ダイオウイカ",length:20000,weight:5000000,hp:1000,attack:1,defence:0,size:1000,file:'ika'}
                    ];
    var boatArray = [{name:'おわん',size:10,file:'owan.png'},{name:'どんぶり',size:20,file:'donburi.png'},{name:'土鍋',size:30,file:'donabe.png'}];
    var harpoonArray = [{name:'はり',attack:1,amount:10,file:'hari.png'},{name:'フォーク',attack:2,amount:8,file:'fork.png'},{name:'ナイフ',attack:3,amount:6,file:'knife.png'}];
    var chumArray = [{name:'オキアミ',attribute:0,power:1,file:'komase.png'},{name:'イワシ',attribute:1,power:1,file:'iwashi.png'},{name:'アジ',attribute:1,power:2,file:'aji.png'}];
    return {
        waveInitDatas: function(index){
            return waveArray[index];
        },
        fishStatusDatas: function(index){
            return fishArray[index];
        },
        boatDatas: function(index){
            return boatArray[index];
        },
        harpoonDatas: function(index){
            return harpoonArray[index];
        },
        chumDatas: function(index){
            return chumArray[index];
        },
        boatArray:function(){
            return boatArray;
        },
        harpoonArray: function(){
            return harpoonArray;
        },
        chumArray: function(){
            return chumArray;
        }
    };
}();

exports.Constant = Constant;
}};
__resources__["/Dive.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
﻿var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Dive = cocos.nodes.Node.extend({
	elapsedTime:0,
	init: function() {
        Dive.superclass.init.call(this);
        var sprite = cocos.nodes.Sprite.create({
                        file: '/resources/dive.png',
                        rect: new geom.Rect(0, 0, 100, 45)
                    });
        sprite.set('anchorPoint', new geom.Point(0.5, 0.5));
        this.addChild({child: sprite});
        this.set('contentSize',sprite.get('contentSize'));
        this.scheduleUpdate();
	},
	update: function(dt) {
        var et  = util.copy(this.get('elapsedTime'));
        
        et += dt;
		this.set('elapsedTime',et);
		
		if(et>0.5){
			var parent = this.get('parent');
			parent.removeChild({child:this,cleanup:true});
		}
    },
    setPosition: function(pos){
    	var Pos = new geom.Point(pos.x+50,pos.y+22.5);
    	this.set('position',Pos);
    }
});

exports.Dive = Dive;
}};
__resources__["/Fish.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
﻿var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Fish = cocos.nodes.Node.extend({
    label:null,
    funclist:[],
    status:null,
    velocity:null,
    elapsedTime:null,
    defaultPosition:null,
    status:null,
    hit:0,
    dir:0,
	init: function(no) {
        Fish.superclass.init.call(this);
        var sts = constant.fishStatusDatas(no);
        
        var img = cocos.nodes.MenuItemImage.create({normalImage: "/resources/fishs/"+sts.file+".png",
                                                    selectedImage:"/resources/fishs/"+sts.file+".png",
                                                   callback: util.callback(this, 'clickCallback')});
        
                                               
        var menu = cocos.nodes.Menu.create({items: [img]});
        menu.set('position', ccp(0, 0));
        this.addChild({child: menu, z: 0});
        this.set('contentSize',img.get('contentSize'));
        
        this.set('elapsedTime',0);

        var initData = constant.waveInitDatas(1);
        var action, actionBack, seq;
        img.set('rotation',initData.startAngle);
        action = actions.RotateBy.create({duration: 5, angle: initData.diffAngle});
        actionBack = action.reverse();
        seq = actions.Sequence.create({actions: [action, actionBack]});
        img.runAction(actions.RepeatForever.create(seq));
        
        var rand = Math.random();
        this.set('dir',(rand>0.5)?1:-1);
        this.set('velocity',{x:Math.random()*90+10,y:0})
        
        sts.length = (Math.random()+0.5)*sts.length;
        var scale = sts.length/100;
        if(scale<0.5) scale = 0.5;
        this.set('scaleX',scale);
        this.set('scaleY',scale);
        
        this.addCallback(util.callback(this,'hitCallback'));
        
        this.scheduleUpdate();
        
        this.set('status',sts);
	},
	update: function(dt) {
        var pos = util.copy(this.get('position')),
            v = util.copy(this.get('velocity')),
            z = util.copy(this.get('zOrder')),
            et  = util.copy(this.get('elapsedTime'));
            
        et+=dt;
        v.y = 100*Math.cos(et)*this.get('dir');
        pos.x += v.x*dt;
        pos.y += v.y*dt;
        
        
        var s = cocos.Director.get('sharedDirector').get('winSize');
        if(pos.x>s.width+200){
                pos.x = 2*(s.width+200)-pos.x;
                v.x = -v.x;
            }
        else if(pos.x<-0){
                pos.x = -pos.x;
                v.x = -v.x;
            }
 
        this.set('position', pos);
        this.set('velocity',v);
        this.set('elapsedTime',et);
    },
    setPosition: function(pos){
        var size = this.get('contentSize');
    	var Pos = new geom.Point(pos.x+size.width/2,pos.y+size.height/2);
    	this.set('position',Pos);
    },
    clickCallback: function(){
        var list = util.copy(this.get('funclist'));
        for(var i=0;i<list.length;i++){
            list[i](this);
        }
    },
    addCallback: function(func){
        var list = util.copy(this.get('funclist'));
        list.push(func);
        this.set('funclist',list);
    },
    hitCallback: function(){
        var hit = util.copy(this.get('hit'));
        var sts = util.copy(this.get('status'));
        hit++;
        if(sts.attack>3);
        this.set('hit',hit);
    }
});

exports.Fish = Fish;
}};
__resources__["/main.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
﻿// Import the cocos2d module
var cocos = require('cocos2d'),
// Import the geometry module
    geo = require('geometry');
var Wave = require('Wave').Wave;
var util = require('util');
var Fish = require('Fish').Fish;
var Dive = require('Dive').Dive;
var Player = require('Player').Player;
var constant = require('Constant').Constant;
var ScrollView = require('ScrollView');

var p = [[1,3,5],[2,4],[1,3,5]];

// Create a new layer
var Breakout = cocos.nodes.Layer.extend({
    label:null,
    wave: null,
    hit:null,
    player:null,
    hpBar:null,
    boatBar:null,
    boatSize:0,
    harpoon:null,
    harpoonAmount:null,
    charBoard:null,
    popup:null,
    init: function(player) {
        // You must always call the super class version of init
        Breakout.superclass.init.call(this);
        var s = cocos.Director.get('sharedDirector').get('winSize');
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                var wave = Wave.create((j+i)%2);
                wave.setPosition( new geo.Point(s.width/6*p[i][j], s.height/4*(i+1)));
                this.addChild({child: wave,z:2*(i+1)});
            }
        }

        
		
        player.setPosition(new geo.Point(s.width/2, s.height-70));
        this.addChild({child: player,z:8});
        this.set('player',player);
        
        
        var left = cocos.nodes.MenuItemImage.create({normalImage: "/resources/button.png",
                                                    selectedImage:"/resources/button.png",
                                                    callback: util.callback(this, 'moveLeft')});
        var right = cocos.nodes.MenuItemImage.create({normalImage: "/resources/button.png",
                                                    selectedImage:"/resources/button.png",
                                                    callback: util.callback(this, 'moveRight')});
        left.set('position',new geo.Point(50, s.height-50)); 
        right.set('position',new geo.Point(s.width/2, s.height-50));                                       
        var menu = cocos.nodes.Menu.create({items: [left,right]});
        menu.set('position', new geo.Point(s.width/4,0));
        this.addChild({child: menu, z: 8});
        
        
        var sprite = cocos.nodes.Sprite.create({ file: '/resources/bar.png' });
        sprite.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: sprite,z:10});
        sprite = cocos.nodes.Sprite.create({ file: '/resources/bar_back.png'});
        sprite.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: sprite,z:8});
        var l = cocos.nodes.Label.create({string: player.get('items').harpoon.amount.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 12,
                                       fontColor: '#502d16'});
        l.set('position', new geo.Point(32, 161));
        this.addChild({child: l, z: 11});
        var l = cocos.nodes.Label.create({string: player.get('items').harpoon.amount.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 12,
                                       fontColor: '#502d16'});
        l.set('position', new geo.Point(20, 148));
        this.addChild({child: l, z: 11});
        this.set('harpoon',l);
        this.set('harpoonAmount',player.get('items').harpoon.amount);
        
        sprite = cocos.nodes.Sprite.create({ file: '/resources/hp_bar.png' });
        sprite.set('anchorPoint', new geo.Point(0,1));
        sprite.set('position',new geo.Point(0,60));
        this.addChild({child: sprite,z:9});
        this.set('hpBar',sprite);
        
        sprite = cocos.nodes.Sprite.create({ file: '/resources/boat_bar.png' });
        sprite.set('anchorPoint', new geo.Point(0,1));
        sprite.set('position',new geo.Point(0,107));
        this.addChild({child: sprite,z:9});
        this.set('boatBar',sprite);
        
        this.scheduleUpdate();
		this.set('isMouseEnabled',true);
        
        var button = cocos.nodes.MenuItemImage.create({normalImage: '/resources/next.png',
                                                    selectedImage:'/resources/next.png',
                                                    callback: util.callback(this, 'buttonCallback')});
        button.set('scaleX',0.5);button.set('scaleY',0.5);
        button.set('anchorPoint',new geo.Point(0,1));
        var menu = cocos.nodes.Menu.create({items: [button]});
        menu.set('position', new geo.Point(0,s.height-10));
        this.addChild({child: menu, z: 9});
        
        var cb = [];
        var sprite = cocos.nodes.Sprite.create({ file: '/resources/char_back.png' });
        sprite.set('position', new geo.Point(s.width/2+25,s.height/2+80));
        sprite.set('scaleX',1.5);sprite.set('scaleY',1.5);
        this.addChild({child: sprite,z:20});
        cb.push(sprite);
        var size = sprite.get('contentSize');
        var l = cocos.nodes.Label.create({string: player.get('items').chum.name + 'をまいた...',
                                        fontName: "Thonburi",
                                        fontSize: 12,
                                       fontColor: '#502d16'});
        l.set('position', new geo.Point(size.width/2,size.height/2));
        sprite.addChild({child: l, z: 0});
        this.set('charBoard',cb);
        window.setTimeout(
            util.callback(this, 'removeCharBoard'),1500
        );
        window.setTimeout(
            util.callback(this, 'createFishs'),3000
        );
    },
    createFishs: function(){
        var power = this.get('player').get('items').chum.power;
        for(var i=0;i<2+power;i++){
            this.createFish(i);
        }
    },
    createFish: function(i){
        var attribute = this.get('player').get('items').chum.attribute;
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var type = Math.floor( Math.random() * 12 );
        switch(attribute){
            case 0:
                break;
            case 1:
                if(type<5) type = 5+Math.floor( Math.random() * 7 );;
                break;
            default:
                break;
        }
        var fish = Fish.create(type);
        fish.addCallback(util.callback(this,'hitCallback'));
        fish.setPosition( new geo.Point(s.width*Math.floor(Math.random()*100), s.height/4*((i%3)+1)));
        this.addChild({child: fish,z:2*i+1});
    },
    update: function(){
        var p = this.get('player');
        var sts = p.get('status');
        var b = this.get('hpBar');
        b.set('scaleY',sts.hp / sts.HP);
        var s = this.get('boatSize');
        var S = p.get('items').boat.size;
        var b = this.get('boatBar');
        b.set('scaleY',s / S);
    },
    moveLeft: function(){
        var player = this.get('player');
        var pos = util.copy(player.get('defaultPosition'));
        if(pos.x>100)
        player.set('defaultPosition',new geo.Point(pos.x - 50, pos.y));
    },
    moveRight: function(){
        var player = this.get('player');
        var pos = util.copy(player.get('defaultPosition'));
        if(pos.x<430)
        player.set('defaultPosition',new geo.Point(pos.x + 50, pos.y));
    },
	mouseUp: function (event) {
        
        if(event.button == 0){
            var h = this.get('harpoonAmount');
            h--;
            if(h<0)h=0
            else{
                this.removeChild({child:this.get('harpoon'),cleanup:true});
                var l = cocos.nodes.Label.create({string: h.toString(),
                                                fontName: "Thonburi",
                                                fontSize: 12,
                                               fontColor: '#502d16'});
                l.set('position', new geo.Point(20, 148));
                this.addChild({child: l, z: 11});
                this.set('harpoon',l);
                this.set('harpoonAmount',h);
                var s = cocos.Director.get('sharedDirector').get('winSize');
                try{
                    this.removeChild({child:this.get('hit'),cleanup:true});
                }catch(e){}
                var l = cocos.nodes.Label.create({string: 'MISS!',
                                                fontName: "Thonburi",
                                                fontSize: 64,
                                               fontColor: '#FF0000'});
                l.set('position', new geo.Point(s.width-80, s.height-50));
                this.set('hit',l);
                this.addChild({child: l, z: 8});
                window.setTimeout(
                    util.callback(this, 'removeHitLabel'),500
                );
            }
        }
                
        return true;
    },
    hitCallback: function(fish){
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var h = this.get('harpoonAmount');
        var sts = this.get('player').get('status');
        h--;
        if(h<0) {
            h=0
        }else{
            var fsts = util.copy(fish.get('status'));
            console.log('name:'+fsts.name+' HP:'+fsts.hp +' Length:'+fsts.length);
            fsts.hp -= sts.attack+this.get('player').get('items').harpoon.attack;
            fish.set('status',fsts);
            if(fsts.hp<=0){
                var cb = [];
                try{
                    var cb = this.get('charBoard');
                    for(i=0;i<cb.length;i++){
                        this.removeChild({child:cb[i],cleanup:true});
                    }
                }catch(e){}
                var sprite = cocos.nodes.Sprite.create({ file: '/resources/char_back.png' });
                sprite.set('position', new geo.Point(s.width/2+25,s.height/2+80));
                sprite.set('scaleX',1.5);sprite.set('scaleY',1.5);
                this.addChild({child: sprite,z:20});
                cb.push(sprite);
                var size = sprite.get('contentSize');
                var bs = this.get('boatSize');
                bs += fsts.size;
                var time = 1000;
                if(bs>this.get('player').get('items').boat.size){
                    bs-=fsts.size;
                    var l = cocos.nodes.Label.create({string: '船がいっぱいです！',
                                                    fontName: "Thonburi",
                                                    fontSize: 12,
                                                   fontColor: '#502d16'});
                    l.set('position', new geo.Point(size.width/2,size.height/2));
                    sprite.addChild({child: l, z: 0});
                }else{
                    var l = cocos.nodes.Label.create({string: fsts.name + '、獲ったど～！',
                                                    fontName: "Thonburi",
                                                    fontSize: 12,
                                                   fontColor: '#502d16'});
                    l.set('position', new geo.Point(size.width/2,size.height/2));
                    sprite.addChild({child: l, z: 0});
                    var dict = this.get('player').dict;
                    if(dict[fsts.name] == undefined||dict[fsts.name].length<fsts.length){
                        l.set('position', new geo.Point(size.width/2,size.height/2-10));
                        var l = cocos.nodes.Label.create({string: fsts.name+' : '+ Math.round(fsts.length*10)/10 + '、最高記録です',
                                                        fontName: "Thonburi",
                                                        fontSize: 12,
                                                       fontColor: '#502d16'});
                        l.set('position', new geo.Point(size.width/2,size.height/2+10));
                        sprite.addChild({child: l, z: 0});
                        dict[fsts.name] = {id:fsts.id,length:fsts.length};
                        time = 1500;
                    }
                
                }
                sts.exp += fsts.exp;
                if(sts.exp >= sts.EXP){
                    sts.exp -= sts.EXP;
                    sts.EXP += Math.floor(sts.EXP/10);
                    sts.level++;
                    var dAttack = Math.floor(Math.random()*sts.level)+1;
                    var dDefence = Math.floor(Math.random()*sts.level)+1;
                    sts.attack += dAttack;
                    sts.defence += dDefence;
                    
                    var popupLevelup = [];
                    var l = cocos.nodes.Label.create({string: 'LEVEL UP!',
                                                    fontName: "Thonburi",
                                                    fontSize: 64,
                                                   fontColor: '#FF0000'});
                    l.set('position', new geo.Point(s.width/2+50,50));
                    this.addChild({child: l, z: 20});
                    popupLevelup.push(l);
                    var l = cocos.nodes.Label.create({string: 'ATTACK +'+dAttack,
                                                    fontName: "Thonburi",
                                                    fontSize: 32,
                                                   fontColor: '#FF0000'});
                    l.set('position', new geo.Point(s.width/2+50,130));
                    this.addChild({child: l, z: 20});
                    popupLevelup.push(l);
                    var l = cocos.nodes.Label.create({string: 'ATTACK +'+dDefence,
                                                    fontName: "Thonburi",
                                                    fontSize: 32,
                                                   fontColor: '#FF0000'});
                    l.set('position', new geo.Point(s.width/2+50,170));
                    this.addChild({child: l, z: 20});
                    popupLevelup.push(l);
                    this.set('popup',popupLevelup);
                    window.setTimeout(
                        util.callback(this, 'removePopUp'),2000
                    );
                }
            
                this.set('charBoard',cb);
                window.setTimeout(
                    util.callback(this, 'removeCharBoard'),time
                );
                var hit = fish.get('hit');
                h += hit;
                this.createFish((fish.get('zOrder')-1)/2);
                this.removeChild({child:fish,cleanup:true});
                this.set('boatSize',bs);
            }
            this.removeChild({child:this.get('harpoon'),cleanup:true});
            var l = cocos.nodes.Label.create({string: h.toString(),
                                            fontName: "Thonburi",
                                            fontSize: 12,
                                           fontColor: '#502d16'});
            l.set('position', new geo.Point(20, 148));
            this.addChild({child: l, z: 11});
            this.set('harpoon',l);
            this.set('harpoonAmount',h);
            
            try{
                this.removeChild({child:this.get('hit'),cleanup:true});
            }catch(e){}
            var l = cocos.nodes.Label.create({string: 'HIT!',
                                            fontName: "Thonburi",
                                            fontSize: 64,
                                           fontColor: '#FF0000'});
            l.set('position', new geo.Point(s.width-80, s.height-50));
            this.set('hit',l);
            this.addChild({child: l, z: 8});
            window.setTimeout(
                util.callback(this, 'removeHitLabel'),500
            );
            /*var dive = Dive.create();
            this.addChild({child:dive,z:8});
            dive.setPosition(new geo.Point(s.width / 4*3, s.height /2));*/
        }
    },
    removePopUp: function(){
        var pop = this.get('popup');
        for(i=0;i<pop.length;i++){
            this.removeChild({child:pop[i],cleanup:true});
        }
    },
    removeHitLabel: function(){
        this.removeChild({child:this.get('hit'),cleanup:true});
    },
    removeCharBoard: function(){
        var cb = this.get('charBoard');
        for(i=0;i<cb.length;i++){
            this.removeChild({child:cb[i],cleanup:true});
        }
    },
    buttonCallback: function(){
        var director = cocos.Director.get('sharedDirector');

        var scene = cocos.nodes.Scene.create();
        scene.addChild({child: Harbor.create(this.get('player'))});

        director.replaceScene(scene);
    }
});
var Harbor = cocos.nodes.Layer.extend({
    player:null,
    itemBox:null,
    boatSize:null,
    harpoonAttack:null,
    chumAttribute:null,
    chumPower:null,
    boat:null,
    harpoon:null,
    chum:null,
    itemName:null,
    itemInfo:null,
    HP:null,
    elapsedTime:0,
    init: function(player){
        Harbor.superclass.init.call(this);
        this.set('player',player);
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var l = cocos.nodes.Label.create({string: '港',
                                        fontName: "Thonburi",
                                        fontSize: 64,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2 + 50, 30));
        this.addChild({child: l, z: 1});
        
        var l = cocos.nodes.Label.create({string: '船',
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2 - 70, 84));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: '銛',
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2+50, 84));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: 'コマセ',
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2 + 170, 84));
        this.addChild({child: l, z: 1});
        
        var boat = constant.boatDatas(0);
        var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+boat.file,
                                                    selectedImage:'/resources/'+boat.file,
                                                    callback: util.callback(this, 'boatCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('boat',menu);
        var harpoon = constant.harpoonDatas(0);
        var item = cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+harpoon.file,
                                                    selectedImage:'/resources/'+harpoon.file,
                                                    callback: util.callback(this, 'harpoonCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2+50,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('harpoon',menu);
        var chum = constant.chumDatas(0);
        var item = cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+chum.file,
                                                    selectedImage:'/resources/'+chum.file,
                                                    callback: util.callback(this, 'chumCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2+170,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('chum',menu);
        
        
        
        var items = player.get('items');
        items.boat = boat;
        items.harpoon = harpoon;
        items.chum = chum;
        
        var button = cocos.nodes.MenuItemImage.create({normalImage: '/resources/next.png',
                                                    selectedImage:'/resources/next.png',
                                                    callback: util.callback(this, 'buttonCallback')});
        button.set('scaleX',0.5);button.set('scaleY',0.5);
        var menu = cocos.nodes.Menu.create({items: [button]});
        menu.set('position', new geo.Point(50,s.height-50));
        this.addChild({child: menu, z: 0});
        var button = cocos.nodes.MenuItemImage.create({normalImage: '/resources/next.png',
                                                    selectedImage:'/resources/next.png',
                                                    callback: util.callback(this, 'dictButtonCallback')});
        button.set('scaleX',0.5);button.set('scaleY',0.5);
        var menu = cocos.nodes.Menu.create({items: [button]});
        menu.set('position', new geo.Point(s.width-50,s.height-50));
        this.addChild({child: menu, z: 0});

        var sts = player.get('status');
        var l = cocos.nodes.Label.create({string: 'Player',
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 20));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: 'LEVEL:'+sts.level.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 60));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: 'HP:'+sts.hp.toString()+'/'+sts.HP.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 80));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('HP',l);
        var l = cocos.nodes.Label.create({string: 'ATTACK:'+sts.attack.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 100));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: 'DEFENCE:'+sts.defence.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 120));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        
        
         var l = cocos.nodes.Label.create({string: boat.name,
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 160));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('itemName',l);
        var l = cocos.nodes.Label.create({string: 'SIZE:'+boat.size.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 200));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        
        var itemInfos = [l];
        this.set('itemInfo',itemInfos);
        
        this.boatCallback();
        this.scheduleUpdate();
    },
    boatCallback: function(){
        try{
            this.removeChild(this.get('itemBox'));
        }catch(e){}
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var boats = constant.boatArray();
        var items = [];
        for(i=0;i<boats.length;i++){
            var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+boats[i].file,
                                                    selectedImage:'/resources/'+boats[i].file,
                                                    callback: util.callback(this, 'bItemCallback')})
            item.set('position',new geo.Point(i*100,0));
            item.set('scaleX',0.5);
            item.set('scaleY',0.5);
            items.push(item);
        }
        var menu = cocos.nodes.Menu.create({items: items});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2+80));
        menu.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: menu, z: 9});
        this.set('itemBox',menu);
        
    },
    harpoonCallback: function(){
        try{
            this.removeChild(this.get('itemBox'));
        }catch(e){}
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var harpoons = constant.harpoonArray();
        var items = [];
        for(i=0;i<harpoons.length;i++){
            var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+harpoons[i].file,
                                                    selectedImage:'/resources/'+harpoons[i].file,
                                                    callback: util.callback(this, 'hItemCallback')})
            item.set('position',new geo.Point(i*100,0));
            item.set('scaleX',0.5);
            item.set('scaleY',0.5);
            items.push(item);
        }
        var menu = cocos.nodes.Menu.create({items: items});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2+80));
        menu.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: menu, z: 9});
        this.set('itemBox',menu);
    },
    chumCallback: function(){
        try{
            this.removeChild(this.get('itemBox'));
        }catch(e){}
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var chums = constant.chumArray();
        var items = [];
        for(i=0;i<chums.length;i++){
            var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+chums[i].file,
                                                    selectedImage:'/resources/'+chums[i].file,
                                                    callback: util.callback(this, 'cItemCallback')})
            item.set('position',new geo.Point(i*100,0));
            item.set('scaleX',0.5);
            item.set('scaleY',0.5);
            items.push(item);
        }
        var menu = cocos.nodes.Menu.create({items: items});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2+80));
        menu.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: menu, z: 9});
        this.set('itemBox',menu);
    },
    bItemCallback: function(own){
        var boat = this.get('boat');
        var s = cocos.Director.get('sharedDirector').get('winSize');
        try{
            this.removeChild(boat);
            this.removeChild(this.get('itemName'));
            var itemInfo = this.get('itemInfo');
            for(i=0;i<itemInfo.length;i++)
            this.removeChild(itemInfo[i]);
        }catch(e){}
        var items = (this.get('itemBox')).get('children');
        for(i=0;i<items.length;i++){
            if(items[i]==own) break;
        }
        var l = cocos.nodes.Label.create({string: constant.boatDatas(i).name,
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 160));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('itemName',l);
        var itemInfos = [];
        var l = cocos.nodes.Label.create({string: 'SIZE:'+constant.boatDatas(i).size.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 200));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        this.set('itemInfo',itemInfos);
        var items = this.get('player').get('items');
        items.boat = constant.boatDatas(i);
        
        var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+items.boat.file,
                                                    selectedImage:'/resources/'+items.boat.file,
                                                    callback: util.callback(this, 'boatCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('boat',menu);
        
    },
    hItemCallback: function(own){
        var harpoon = this.get('harpoon');
        var s = cocos.Director.get('sharedDirector').get('winSize');
                
        try{
            this.removeChild(harpoon);
            this.removeChild(this.get('itemName'));
            var itemInfo = this.get('itemInfo');
            for(i=0;i<itemInfo.length;i++)
            this.removeChild(itemInfo[i]);
        }catch(e){}
        var items = (this.get('itemBox')).get('children');
        for(i=0;i<items.length;i++){
            if(items[i]==own) break;
        }
        var l = cocos.nodes.Label.create({string: constant.harpoonDatas(i).name,
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 160));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('itemName',l);
        var itemInfos = [];
        var l = cocos.nodes.Label.create({string: 'ATTACK:'+constant.harpoonDatas(i).attack.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 200));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        var l = cocos.nodes.Label.create({string: 'AMOUNT:'+constant.harpoonDatas(i).amount.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 220));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        this.set('itemInfo',itemInfos);
        var items = this.get('player').get('items');
        items.harpoon = constant.harpoonDatas(i);
        var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+items.harpoon.file,
                                                    selectedImage:'/resources/'+items.harpoon.file,
                                                    callback: util.callback(this, 'harpoonCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2+50,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('harpoon',menu);
    },
    cItemCallback: function(own){
        var chum = this.get('chum');
        var s = cocos.Director.get('sharedDirector').get('winSize');
        try{
            this.removeChild(chum);
            this.removeChild(this.get('itemName'));
            var itemInfo = this.get('itemInfo');
            for(i=0;i<itemInfo.length;i++)
            this.removeChild(itemInfo[i]);
        }catch(e){}
        var items = (this.get('itemBox')).get('children');
        for(i=0;i<items.length;i++){
            if(items[i]==own) break;
        }
        var l = cocos.nodes.Label.create({string: constant.chumDatas(i).name,
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 160));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('itemName',l);
        var itemInfos = [];
        var l = cocos.nodes.Label.create({string: 'POWER:'+constant.chumDatas(i).power.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 200));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        var l = cocos.nodes.Label.create({string: 'ATTRIBUTE:'+constant.chumDatas(i).attribute.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 220));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        this.set('itemInfo',itemInfos);
        var items = this.get('player').get('items');
        items.chum = constant.chumDatas(i);
        var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+items.chum.file,
                                                    selectedImage:'/resources/'+items.chum.file,
                                                    callback: util.callback(this, 'chumCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2+170,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('chum',menu);
    },
    update: function(dt){
        var t = this.get('elapsedTime');
        t += dt;
        
        if(t>5*60){
            t=0;
            var sts = this.get('player').get('status');
            sts.hp++;
            if(sts.hp>sts.HP) sts.hp = sts.HP;
            else{
                this.removeChild(this.get('HP'));
                var l = cocos.nodes.Label.create({string: 'HP:'+sts.hp.toString()+'/'+sts.HP.toString(),
                                                fontName: "Thonburi",
                                                fontSize: 16,
                                               fontColor: '#000000'});
                l.set('position', new geo.Point(10, 80));
                l.set('anchorPoint', new geo.Point(0,0));
                this.addChild({child: l, z: 1});
                this.set('HP',l);
            }
        }
        this.set('elapsedTime',t);
    },
    buttonCallback: function(){
        var director = cocos.Director.get('sharedDirector');
        var p = this.get('player');
        var sts = p.get('status');
        if(sts.hp>10){
            sts.hp-=10;
            p.setup();
            var scene = cocos.nodes.Scene.create();
            scene.addChild({child: Breakout.create(p)});
            director.replaceScene(scene);
        }
    },
    dictButtonCallback: function(){
        var director = cocos.Director.get('sharedDirector');
        var p = this.get('player');
        var scene = cocos.nodes.Scene.create();
        scene.addChild({child: Dict.create(p)});
        director.replaceScene(scene);
    }
    
});

var Dict = cocos.nodes.Layer.extend({
    player:null,
    init: function(player){
        Dict.superclass.init.call(this);
        this.set('player',player);
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var dict = player.get('dict');
        var datas = [];
        var fish;
        for(var i in dict){
            fish = constant.fishStatusDatas(dict[i].id);
            datas.push({file:"/resources/fishs/"+fish.file+".png",name:fish.name,recode:Math.floor(dict[i].length*10)/10});
        }
        
        var view = ScrollView.ScrollView.create(datas);
        view.set('contentSize',{width:400,height:300});
        view.set('position',new geo.Point(s.width/2,s.height/2));
        view.set('anchorPoint',new geo.Point(0.5,0.5));
        view.set('isRelativeAnchorPoint', true);
        this.addChild(view);
        
        var button = cocos.nodes.MenuItemImage.create({normalImage: '/resources/next.png',
                                                    selectedImage:'/resources/next.png',
                                                    callback: util.callback(this, 'buttonCallback')});
        button.set('scaleX',0.5);button.set('scaleY',0.5);
        var menu = cocos.nodes.Menu.create({items: [button]});
        menu.set('position', new geo.Point(s.width-50,s.height-50));
        this.addChild({child: menu, z: 0});
    },
    buttonCallback: function(){
        var director = cocos.Director.get('sharedDirector');

        var scene = cocos.nodes.Scene.create();
        scene.addChild({child: Harbor.create(this.get('player'))});

        director.replaceScene(scene);
    }
});

exports.main = function() {
    // Initialise application

    // Get director
    var director = cocos.Director.get('sharedDirector');

    // Attach director to our <div> element
    director.attachInView(document.getElementById('inch_fisherman_app'));
	director.set("backgroundColor","00ffff")
    // Create a scene
    var player = Player.create();
    var scene = cocos.nodes.Scene.create();
 //   director.set('displayFPS',true);

    // Add our layer to the scene
    //scene.addChild({child: Breakout.create()});
    scene.addChild({child: Harbor.create(player)});
    //scene.addChild({child: Dict.create(player)});

    // Run the scene
    director.runWithScene(scene);
};

}};
__resources__["/Player.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
﻿var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Player = cocos.nodes.Node.extend({
	elapsedTime:null,
	defaultPosition:null,
    status:null,
    items:{boat:null,harpoon:null,chum:null},
    dict:{},
	init: function() {
        this.setup();
        this.set('status',{hp:100,HP:100,level:1,attack:1,defence:1,exp:0,EXP:10,});
	},
    setup: function(){
        Player.superclass.init.call(this);
        var initData = constant.waveInitDatas(0);
        var sprite = cocos.nodes.Sprite.create({
                        file: '/resources/boat.png',
                        rect: new geom.Rect(0, 0, 100, 100)
                    });
        sprite.set('anchorPoint', new geom.Point(0.5, 0.25));
        sprite.set('rotation',initData.startAngle);
        this.addChild({child: sprite});
        this.set('contentSize',sprite.get('contentSize'));

        var action, actionBack, seq;
        action = actions.RotateBy.create({duration: 2.5, angle: initData.diffAngle});
        actionBack = action.reverse();
        seq = actions.Sequence.create({actions: [action, actionBack]});
        sprite.runAction(actions.RepeatForever.create(seq));
        
        this.scheduleUpdate();
        this.set('elapsedTime',initData.position*5);
    },
	update: function(dt) {
        var pos = util.copy(this.get('position')),
            et  = util.copy(this.get('elapsedTime')),
        	dPos = util.copy(this.get('defaultPosition'));
        
        et += dt;
        pos.x = 5*Math.cos(2*Math.PI*et/5)+dPos.x;
        pos.y = 5*Math.sin(4*Math.PI*et/5)+dPos.y;
 
        this.set('position', pos);
        this.set('elapsedTime',et);        
    },
    setPosition: function(pos){
    	var Pos = new geom.Point(pos.x+50,pos.y+50);
    	this.set('position',Pos);
    	this.set('defaultPosition',Pos);
    }
});

exports.Player = Player;
}};
__resources__["/resources/aji.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJAQkkAP+4mXEAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAACqFJREFUeNrtnW1MFNcax3+7rC5YoRSsGrGX2hKbtB7LrQ0tV1PBpGlaidY2IVHAbawvjVLU3A0E0lbRCP0Aim9t08YXarUfmqZBSUg0Ta9pqkatqPPB2hpQ0RaxvFisUlH3ftjZkYUFZmFnZoXzT0bdcTOz8//P85zzPOec54BEWMEW7j9QUZRIYBwwCZjc5UgExgOxgAO4C7QBjcAl4NcuRz1wTQjRIQUJXoA4YBqQAWQDcSG8fAvwFVAN/CyEaJGCBBYhEZgHFAJjTbx1E1AKfCeEuDSsBVEUJRqYC5SbLEJf4vwXqBJCtA8bQRRFeQJwA3lh7Mq3AGVCiIYhK4jqlkqABQ9Rp2cfUGSmO7OZIMRjwNowtwg9FrNWCNH60AqiKIoNyAL2DKEwIQfYK4TwPFSCqO5pPzB1CMZuZ4E5RrkxuwFizAcuDlExUJ/rovqc4WshakT9GeAaRpmOSuC9UGYAbCESYwJQGybxhBXxy7+FEL+HhSCKogjVrw53TBVCKJa2IYqi/EeK8aCxV/mwRhBFUdKAn6QOfvhJ5cVcl6W+CVKM3jFdCHHEFEFkm2Fsm2ILUowJwFXJtW4kBNv7sgchRqTatZXQj1qVN0Ma9c+GaZwxGIxVeQuty1LTBPskvwPGAiHE1yERRE0UXpScDhpP6klI2vsRw4Y3aysxeOxX+RxUG5LF0M3amt4NVvkcmMtSR/paJI8hR1xfI499WchayZ0hWBu0hciG3LoGvjcLKZGcGYoS3Raizpu6LDkzHP8KNO8rkIW4JVemwN2vhajTO/+SXJmGmO7TVrtbyFzJkamY25/LKpccmYryXgVRu7oym2suxqq8B7SQeZIfSzCvN0EKJTeWoLCHIOoyMumuAqCuro7Kykqj3Za2bM+h/j1NUt8Tzc3NuFwu2tra+OWXXyguLmbkyJFG3GoacKiry8oY6uReuHCBxYsXc/78+X6/+8cff7Bt2zZiYmLIz8/H4XBQXV1Nbm4uHR2GLOTN8AsMFUVpJrSrXQ3F3bt3cTgcur/v8XhwuVzU1tZit9vJzMwkNzeXRx99tMd3//77b+bMmUNTUxMvv/wymzZt4ty5cyxfvpyOjg5eeuklPvnkk1BbSosQIh7Aps6KuG0EcUeOHOHWrVt0dnZy584d7ej+2Xeut/NdP7e1tZGcnExFRQU2m75ZTPX19WRnZ/PXXw+SEGPGjGHNmjWkpaX1+P7JkyfJy8ujvb2d5557js8//1wT5c033+SDDz7Qfe8gECWE6LAZmWqfNWsW169fN8RKFi9ezMqVK/W/gi0tlJeXs3+//4h0RkYG69ev72FxPhfX3NysidLU1MTTTz9thBigpuTteCskGILY2FhDrmu324mNjcXj0b+yLC4ujg0bNrBr1y4mTpzo584Cub+kpCR27txJfHw8EREReDwekpKSjBIDnw4OvGUqDMGUKVNwOp1ERkb6HXrOOZ1OoqKicDqd3L59m9WrV9Pa6h35dLvd5OTkDOg3vfjii3z77bds2rSJ77//nsLC3sOvp556ij179hAfH8+oUaOMbhonA/+zKYpShnfBfFji1q1bLF26lDNnznjD2nnzWLdune7GvK83ur29nejo6LDJawkh3HYjLUQv4ampqaSmpvLKK69w9eqDqcM3b970EyM9PZ01a9bovvbGjRvJy8vj8uXA423BinHv3j2jLQQH3qo6luLmzZsAjB49moSEBC0WWLFiBb/99hsAKSkplJWVERERoeuax48fp7KyEo/Hw48//kh2djbLly8nKipqwL9z69atAKxatcoIGhJ9geH4cHNTJ06cYP78+ZoYqampbN++Pai+/9GjR/3ilt27d/P2229TWzuw+eKnT59m165d7Nixg4qKCiMee7xPkNhwEcLj8fDpp59q3U2AtLQ0tm3bRmRkUJPIWblyJd988w3PP/+8dq6hoQGXy8WOHTuCutaNGzcoLCzk/v37AFy5csWQTqlPEEe4CBIREUFra6v24JmZmVRUVAw4Kn7mmWf48ssvyc/P1wS12+0kJyfrvkZnZyerVq3SRHj88cf58MMPjXh8h++Pu8BIq0To7Ox8EKpGRVFUVERMTAwxMTEsXLgwJDFLTk4OM2bMoKCggNdee41p06bpttji4mJOnjypvTAff/xxwJRLKDJCPkHasDD1fuPGDe3fvgfNzc0NfdQ1aRJ79+7VnQO7d+8eH330kV9kX1RUREpKilFUtPlcVqOVbqquru5B7uDJJw2914gRI3RF2v/88w/5+fl+YixatIjMzEwjf16jTxBLS9udOnVK+/ezzz5reTvW0NBAVlYWBw8e1M69++67rF692uhbX/K5rF+tevj79+9TU1OjfZ45c6alYhw4cICSkhItLgLIy8tjyZIlZtz+V8sFOXDgAI2NXo85efJkkpKSLHOb69ev1xpvgEceeYTS0lLS09PN+hnWCtLa2srmzZu1z++8844lQnzxxRfU1NT4pUWmTp3Khg0bDG/TehOk3oqubkFBgTZWMmXKFGbPnm3Kve/cucPhw4epqqri8OHDfv/ndDpZsWIFLpcLu91uNi31PkGumXnXjo4OCgoKtNSG0+lk3bp1hhLw559/cuzYMY4dO8YPP/zgN3IIYLPZmDt3Lrm5uYwbN84qD34NTB5Tv3z5Mm63m3PnzmnnNm7cyKuvvmqoGG+88Qa3b/ccpXY4HLz++ussWrTIsvZLhTam7nstvzL6jocOHeKtt97SxLDb7RQXFxsqBnjHzt9//32/cxMmTGDZsmUcPHiQkpISq8Xw498XtlZjcBnXlJQUEhISqKurIzo6mtLSUtO6uVlZWdTU1BAdHc3SpUt54YUXjByKHQiqNfepuqw4oNnouzY2NlJWVobb7Wb8eHOz/s3NzTgcDqPyUINFvG9jAO01URTlGnI6qRVoEkJoPYmuXZtSyY0l8OO9qyDfSW4sgR/v3dcYSrdlobvqbiEQxtOBhih68N1dkCrJkamo6lMQdYnuFsmTKdgSaCefQAmkMsmVKQjIcw9B1HIPspyfsdjX23ZKvaVYiyRnhqJXfgMKopYOkm2JcW3HpaAEUbFWcmcI+uS1V0HUMnQ5kr+QIqe/jcX6G6bbi6zzHiqcVfnsE7Jur3kYfN3eLg38AsnnoLBA765uumYWqGWyKyWvA0Kl3jLjugVR8R7eDbAk9KNJ5U035P4hxsK4/UNU1/U7svS4XkwdyFZ6Qc9OU7fxmS757hPTB7qF3oCmC6obXqVL3gMifaAbggXdhgRoU+RubT0t48hgLiB3+gxtm2HtTp9d2pSEYdwlblJ7U0ooLhaSKedqbyJxGAaPlUBiqDYmDonLCuDChssGYguCicAtE0QVJRHv3lVDMWY5C8zRm5uyxGUFcGGXgGSG3nhKDpBslBiGWUg3a3kM7yhZ3kMsxBZgbX+DSw+FIN3cWAkPVyp/H1BkpEVYJkgXYZ7Au5lJXphbRFlvU3WGlCBdhInGu39GOeExwbsJ71zbqkAzCoe8IAHc2Ty8henHmixCKfCdmW4p7AXpJk4c3lroGUA2oV0d3IJ3gWU18LNvGVk4IewECSBQJDAOb13byV2ORLxl8WJ5UPerDW9VnUt4KyP4jnrgmhCiI9yf9//ApbtQiPJFqAAAAABJRU5ErkJggg==")};
__resources__["/resources/bar.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAFACAYAAAD+oi/PAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAJOgAACToB8GSSSgAAAAd0SU1FB9sIHQUbGwO2QlIAABThSURBVHja7Z13XFRH18d/dxcEkd6LIIKIiqjYsWtEo8SGXR81Bks0aiwx+hhLTMDE8hq7j+W1BDEajFKMIhawodjAggVp0qULSNsyzx8KCdL23p27YJ57/tjPljsz+71nypm5M+cwo51NNwFYDEAdH6dIAGxjRjubln/EEJUwon8ABACoi/APEQFEABFABBABRAARQAQQAYQ/UaOdoZa2Djr3GYQufd1gYdMShibmUFNXR25WBrIz0vDw1lXcCQ1GTmY61XKZ0c6mhEpGIhFGTJ2NqYtWMU00NOu8lhCCEL9fyZGt61Fa/LbxgJhb22Lhj9vRrnNPhk26zLRksmvtYjy+c6PhQT4ZMwWzVnozmk21OKUnhCD45GFy4OfvQOTyhmnsjh27Yv66LZwhAIBhGAyb9AUzavqXDdNraWg2xdfeOyESianU8SlfrWSa2zmoHmT6kjWwsLFjaPU66hoaWOTF/cZwAmnr0gPDJn1BDaJCHNq7MCOmzVEdyKBRk8Aw1Dne5T16smpAGJEI3QYM8eNrhLaxd2TMrW35BzEyNYeeofEEPs0Nu7Yd+AcxNDHn3W4yNDHjH0Rbz4B3EB0OZbAGKcjP4R2kID+Xf5C8zNe8g+RmZvAPkpuVgdysDMInSGx0JP8ghBDcDb3AG0TC8yckKz1VNQPiJf/jSlmqdcnF076qG9ljn0ThzJHd1KtX9P1bJPjkYdUajb/t3ohXL59RgyktKcbONV+DEKJaEKlEgu3fLYBMKqECcvT/1pPXKa8aZmKV8PwJtq6YR4oK8u245iGXy3DqwDZywe+oaqe6DMOgma4etHX1IZfJUF5WCi0dXXgu/xGd+37CyiROjoshO1YvRGx0FP9zdmNzS4yeMR8dXQdA19Borrau3v5aJz+EAAzw/qVeKS8rRXFhQe7bwjcGb4sKkZ+ThazUJGSmpyAzLRlx0VFQtCuud11rxtLv0efTUYyC6mJ1F5toaKKJhqahvrFprdeEBp4kO1YvUr6NhJ31Q1lpCRpKCvPz6LURMysbTF20Cr2GjGDEYjWVAKQnJRC//b8gNPAk/cZuZGYJ9ymeGDJuGtNMR4/6n5dKJLh9+RwJOfUrnty9yWpM4bRAp6nVDMMne8LjiwVUgGRSCUJO+ZDf921Ffk6WarrfqpMsfYybtRjDJ3sy6k2acMrj5oUAcmzHBmQkJ6p2HKlJLGxawuuwPwxNzFl1W+EhgWTzN7OpVEsRpYaJ/d4rOWgjkFr7ovagp7iokHUac5uWjQ+k99BRrNMMmzgTaurqjQdEW1cfA0aMZ730aGxuybh5/KvxgAz2mAoNzaac0o6d/TW49nhUQUQiMYZP+qLG3yTl5YgKDyO/79tKHkVcr7F3NDK1YIaMm640iNL2RvdBn8LEsjlTvfEXYO2scSTu6cPK78bMXECmL1lT7VoPz4UI+cMHkrKyhtPIZ1NmVfuu5G0R1s+dWAUCAM4c3oVDm9ZU04yhiTkzeMzUhqtaVrat4NS1V5U7LJNJ4b1wGol5/KDGNEHH9uPwlnXVYAaOnNBwIK6D3at957PNi0TfC68zXeCv/8GZw7uqwDi0d2FMLa0bBqT7oGFVPt8JDSYBR/cqlNZnmxeunTtdBaauCRavIDKptPJ9ZHioQjO5v2bFBDvXLELw70dIxWJfNocVRipGo4GJGezaOEMulyPy5hUok08TDU1kpiZxXteitoWjoUXY5iSACCACiAAigAggAogAIoAIIAKIACKACCACiADyPwVS62MFzxVeaOno1Kj+7FnfA7h9+Rw7EKlEUm2lvaHl+K6NhHXVevbgdqPShlwuQ/yzR+zbyNPICM7rsHxISvxLUlpSzB6k6E0+kuNjGg3JyyeR3HutZ/cbT/WKfRLFHeRpI2on9e17rBMk+v7tRtFOJGVlSIyJ5g6S8zoNUeGhDU5y44I/kUokyo3sAb/+p+EHwmMHlDdRHt66SnXrOFuJvn+LxD9/TMfWCvLZ16BmCTWj8dq5P3g//FKTpCclkDtXgumBSMrL4b1gGqfNZVwlOyON/DBvEuRyGV0zPv7ZI3gv+BcpLyvlHSIrPZWs/mI0qw2brOYjTx/cxqalnoTWUYsaIdJSyOqZo8D2CAbridX965fw3czR5OmD21TbTHFRAU7u3UKWjB+EzLRk1umV2jDg0msgpixciVZOnRhlAIJ89pOgY/vxtvAN5xtBZefDyGlzMXP5D6xh4p8/Jms9xyoFQHXObsJxe5J5c1umvIzOSQgqexoHjBhvzyWtlrYOOrkOaBwg1vatoa2rH881vavbZ1RAlG4jmk21YGRupYSJXsqpl1J4FUVRKS0pRmrCywa3kIWVRgFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQASQSuHFo5Fd2w5obucAQxNzGJlZoJmuHt7kZCMvKwM5mRmIf/YY6UnxjROkfbde6OU2At0HfgojM8t6n14lx8WQiNDzuBnsj8SYp0qXr/RjhdbOnTF96Vo4dXHl9ByREIKbFwLJsR3eUMaZHmeQZjp6+HLNZsW9odUjUokEQcf2Ed8dP0Emk6oGxLKFPb7b5QPLFvbUd6E+vnODbFrmiaI3+fz2Ws7de2PT8fMMTYgKTwWlxcVo3603s/n4BViw9CvECsTavjVWbjtK1duZVCKBVCJBQW7unNKiolyGYWBubcus2XMc2rr69EG09fSxaocPtLR1qEEQQvAmO5sQuRxJz5/v0zE0NJSUlwMALGzsmG+2HFDYj7zCIIu9d8Hc2pZqm0iNjSUGpqbM1VOniJOrK5OflUX+7keoY89+zOSvvqUH0qFHX3Tp50YVIuXlS2Jsacn4795Neo0c6ZYcE0OMLCyqlTFq+jzGyMxSeRCGYTB9yRqqPVNWSgpRb9IEl48fJ226d0d2aupFEyurGm+UuoYGFNFKvSDdBgyFfbuO1LRRXFiI10lJSIiORklxMXQMDdFUWxtNtbVrTTNo5ETGrHkL5UB6DxlJtXE/uHyZaGpp4fLx4xgwfjzyMzNhblt322NEohrd+ygMIlZTR5d+g6lpI2DvXmLt6IhdixfD08sLkaGhcO7TR6H8ewwcxh3EqUtP0BwzMpOT8Y2bGzwWLcKts2cxcMIEhW+SY8eujJ6hMTcQ29btqDZymUQCUxsbnD90CH3GjGHlSI8RiWDTypGbGW9AMY7C5ePHSfStW9gcHMxo6epyyqOu/1MniKEpHZDYqChybMMGeAcEgCsEUHeAijqrlq6+odIQBTk5P2+eNQsLtm2Dpb1yhqaugSE3EC7BGv4ucpkMW+bMWTF0xgx0Gax871eQl8sNhEuwhr+Lj5cX0TM2hsfChVS68NysDG5tJC+LO8jNgADy6MYN/BQURG0cyuMKwnVRIOnFC+Lj5YUf/f3RRFOTjlUglyMp9gW3qhV9/zbrPbnFBQXYMmsWFu3cidoMQS7y4uE98iY3mxuITCrB/WuXFJ7TE0Kw7auviPusWWjXsydVsz8i9LxyRuPNEMWdC/tt3UoMzc0xdMYMqhBELsetS38qB3I37ALinz+uVyv3L10ij65fx+wNG6ivrIQG/V5vAAmRItXFZ5tXnddkJCaSY97eWH7woJ9YnW64d0l5OU7s2URnqhsVHoao8LAatVJWUoJf5s3Dwu3boWdMP1DXWd/9CoW6UXjx4Zd/z0dWWko1mN1LlhD32bNh16ED9SoVfS+c+O78me4qSkFeDjYsmlYlxmfgvn3E2MoK/Tw8qEO8Tk0im5Z6KhyohdUCXWLMU2xa6klK3hYBAPRNTDDtu++oQ2SlpRCvr6awsvU4rf3a2Dti1U4fmDVvQR3iWWQE+XnxTBTksYtgxumJVVLcCyyfMhR3QoOpnbOSyaT40/cAWTtrLGsIzhqpOq93xYxl6+DQ3oWzdiKunCc+272VOvVAzbusS+9B6PnJcHTt76ZQjIXUxFhyNywEN0MC6j10r1KQygwZBnZtO8CqZSuVPkMU/P0KIAKIACKACCACiAAigAggAogAIoAIIAKIACKACCACiAAigFSKmqoKcuk9CNb2rZH2Kg5R4WGoz6Vno9OIqaU12rh0R2JMNG5dDILr4M+w52wEBo2a9HFo5P3GToz5fD4ykl+hrKQYJcVvkZmWjJT4GCz8cTtceg/CrrVfU4n/TnU1nhGJMHj0ZPQc7I7OfT6p9/rMtGS8fByJgz+tQn5uVuMAsWrpgAXrf0GbTt2q/ZadkYboe+EofJMHLW0daGnropmOLsytW8LE4p2TMd8dG3Dq4HbVVy0DEzP0dx8Lyxb20DcyQbcBQ6v8/vjODYQF+eHpg9vQ1GoGpy6uaOvSHeoamijIzUFqwkvcDQsBQGDZwh6T5n973aKFXd89678BF4eWrDWib2wK18Gf4fNl66420dDsX9M1e9YvQ8yj+5g47xu4Dq7fx1x6UgJC/I5CrYkGnLq4YsvyOay3VykM0rSZNmYsWQv/o3uQkZyIJhqaWLxhdxVneFHhYdjnvQKjZszDpxM+56TpgKN7YW3fGj8v/hwVZ0modr/LtxzAtXOnKx2lOjh3rgLx5G44tiyfg/nrtnKGAIBRM+Yh5vEDdOs/lP440salO4qLCiu9lusZGmPZxqoupnetW4wVvxyCc/feSncck+Yth3OPPqzOWSkEMmziTIQG+VV+njz/WxiYmP3VJr5fikEjJ8K5ex9q49CnEz6HQ3sXeiB6hsZo17knom6GAgA0NJti6IQZlb8/uHEZj+7cwIQvl1EfVDv1HgiGYeiA9Bg0DLcuna085Njjg+jGpw/twshpc3mxDlo4tFXYb329IJYt7PE88k7lZ8eOXSvfy6TS64kvojF8sicvIC0d2ydTq1oWNi2Rl51Z+dmujXPl+xvB/n1bd+jCm8HJMIw1NRBza1vk5/wF0rpj18p45SkJL9GuS8/GP7FiGAY2rdpU0YhIJOpc8T4jORGOHbo2fpCmzd6dRPv79r+/S87rdBgoEYpcZSDy9+HG6xItHR1e/yAjElEAkb1zPq+p1ayWyZO4zlM2VO40jbO6FV70K06+icVq1WaBfItYTANEJn8P8u5clEhN/EEh/K9diNXU6Gmk4ly52gcaUFPjH4TaMfCczPRKK/RDDYhUAEKlalWMFTat2ry7WFy9asmk0uu8aoQmiPX7E5kf1lexmhqK3uQ586sRNfoaEdegEYlEos+vRkT0QIxMLaCjb1BD9yvm5MOEHQgljSQ8fwIA6NizX7VMxWrq4DMWCdVeKzUxFulJCejUayDENYwjUim/GvmwTKXm7PeuXYRL74HVq5ZYDDnfILSqFgDcuxoCQxNzNLdrXa1qSfmuWmKKGol+H4WvrUv3at2v7GPSiEwqwYm9m9GmY7dqVYv3XkskogcCAGcO7YKekUkNvRbPIGpqdEHKy0px6YxvNY3w3UYU7UxYPXp78fBe9TYi4UcjSXEvsHaWB2IeP1DoejVlGh5fvdb/b1yN8ycOs2p/7OzwD5YvxWIxtaezr1Ne4dals/A/sgd1HfemAhIVHoaYxw/Q2rnzXyO7pJzzn3/18hluX/oTt6+cQ+KLaKVuBCsQmVSCrd/OxcptR2Dr6MTK1npbWBCaGBM9MC0xDq9in+P+tYusgtLVW1m4PgzV1tOHgbEpDIzNYOvoBJFIDJFIBJFIBEYkAsMwyM5IQ2piLFITYlFUkM9r7yYcFhNABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQASQ/0WQNp26Yc6qn2BmZUMlPzVV/vnmdg7o7z4OfYd7wMzKBndCg/E6NenjADE0MUff4WPQz31sla22APDb7o3UyuEFREtbF65un6G/+9ha98uHhwRSCTJEHURNXR1d+7mhn/tYhQ6/nNi7merNUwqEYRg4dXVFP/dxcPOYqnC6a+dOIzkupuFBbFu3Q//PxqHvsDFQJDbIh3Jy7xbq1VlhEBPL5ug7zAP93cdW7t/iIlcCTiDtVZxqQbT19NF7yEj0cx+Ldp3p7IH/fd9WXnrHWkFs7B2x/cw1qoVd/OOYUtHDOI3syfExVB9WAoDffn60UScIIQRXAk7Q08ZpXyjiSZkXWys08CS1gtw8pmLMzAW87d6uEyQ7Iw1R4WHUCpu+ZA02/3YBrZw6UQcRtzFr9n1dF8ikEvRyG0GtQANjUwwZNw1a2rp4HhlBbS9LvWZ8xJXzKCrIt6d9B0dOmwvvIwHQNTBSDYikvBzXz52O46Ne27XtgJ9+Dao8Cs77xOrSmd94620sW9hjw9GzsGrpwD9I/LNHSu/eqUuMzS2x4WjgXGVgFJ7qXvbnTysAoKtvuG/JT7s5d88Kg1z98xTvU2H7dh0xdvbX/IIU5uch/GIQ7zCT539bbUpMfRXliv8JqEIWee9U+NQ0J5DIm6F1Ri6qkIMbV8N3xwYU5OdyOlbdwqEtHJw78wcil8sQGlC3/ZWTmY7gk0dw6uB2zB3aZd/RrT+gMD/PjS2MIvN+ziDveq+6q1eQz77KfY6lJcXwP7IbyyZ+cjHu6UN2IG48g6QnxeNZZEStv4ec8qn2XVZ6Kv49YwQra9rMyoZVo+e0ZFqbVv44uB0VIT2qmTplZdixehGunTutcDmt2nfiF+TmhYAavz/re6DetHvXL1N4KUjRA8ecQUqL31Yb6UMDTyI/p35HRqUlxdi07AvVTqzYjCnnThxSOG1K/EvcCQ1uHCBPH9yujFgR+ySKdeiNkD+ONQ6Qvzd6NtqoHFxvXMGb3Gy/OqfaLBYrlAIJC/wdb3Kz/W5c8GedVi6XITkuZnxd1zy6c101IDmZ6di64svxkrIyTunrWjeLuHIebPJV+tHbowjuh6czUmoHuRt2QXVtRFkpKymuHeRqyMcDUlvQ+oe3rqomjhU9kJpj7B7esk613S8fGjnrewCvXj77uEBsHZ2qfM7Pybr/2+5NnPISNWS1+tCj2dGt67sUFxV8XCDtu7pW+fwsMgJhQX4NY6IoIx169K18X5CXs3Hnmq+Vyq/BQJx79qt8/+P8KSvSkxI+PhB9IxPY2L9zUbL+y4mIjVY+aF2DgFRs6/hl5TxqD5IaBqRHXxzatIbV/L0+UWsIkLjoKFzw+5VqnsLJUAGERxDJP4BDIgKw7SOHkQDY9l+HeMd2KB1wyAAAAABJRU5ErkJggg==")};
__resources__["/resources/bar_back.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAFACAIAAABxwLiYAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIHQUvBtua3XwAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAANlJREFUeNrtzjEBAAAIAyC1f+fZwNsDEtBJ6p+pl7S0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tG4L32YFfeuns1IAAAAASUVORK5CYII=")};
__resources__["/resources/bigwave.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/boat.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/boat_bar.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAIAAADhM9qrAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAJOgAACToB8GSSSgAAAAd0SU1FB9sIHQkhEc/QjFEAAANGSURBVFjDdVjBruQwCPP2/392tddi7yFtsElHGo06fQkQsA15f/TvL4qoG1Xvd6EKvHEXWLjXe/vTXsnCfT+L+z1RN+4Kg6zn5Tb7YbDfXJCgAgkSEkSIIEFBRBFa7wUJ5LOgf64HPVv2gwQQICCAvXLtpdlc7rS3C+T1WMG27r7f1TvWNj0+6UDu5o2Sbs28kICdRIR0xZ7ngzdEPFZowc3c7JPoPR7fBfag6lRlYiCh3kBfL5et3s7qjTJtRR0FVWRrF52+xeNgx+rvd6bRx7tiz8ANcRTeK2In5i5HHNogq6i1w6Ptd3GvBJDaEHc+9J6JzY+dHg0sK8oEdXB0sNOybrnvbPF1sOLFmwwo612JWYaDIPIvxqEj2x77G47yKxx4DpznfNNA/3ms2ScOACWfwldGZp/LTmwYdKhN6UosD+1wntMrwIlLqYFIBga4BUJKDJqMyXDNioD2An3pgswrNY9BfQs45UXMTAYr/RmhWAPRTPVfRpBEa1pUEt9VY6m8ZS9UcQrgcgzfnzAf3Eyh0cEMGvEhD/2a5lqQ8PZKoz1+JUbhkkzs1+RTnRUMmF6hH538MkBUZ7iG3nL2791hmULPF+MDiCOv8uZDJipTCOgvlb02Sx9E9kptCNaBdAMiusleRz8/BKwTWVadt12yuu18KNMZZc5Cy2N5iCtbE3E/pC9A7c40lc8BN7u18lSmL2tEgEO+R4bhzIU430uRns8xkPwxmY3vlAkugYiof2ggDxmMKWVFCajeOe7oxD5r8GDMAf9rkpOczWdp1YT/OaXUVEXlrPcxxO7WVMYJz5YGpdk9a1V56BYyW9TUd44GxS+xPU/Y2apguLeCHjXRHIypkjGk8yC1BzfmgJHInFqv5PnA6XZcBwkU6+dMNxRHMzIdUG6DtXRL3xPmmP9nu+WRCc5KUd2qo76OxdFe9WbrvL10+0wGRI0U2uv0Lk25iUGcE1XMBD/3xPP2gq9L2EdjHj3nx9wcP6tbtexyxRnAlYK5qpa64jpEfcgjTxKMedC37/F1ecHHbFeymw/G3TfvmY/GcOKXX7hWdvHK4TNoaCx+GvlmIjVBozoKwUNE0ErmPdtVADVneR7/v4hbwlPT/wJMaQLWh2XYAAAAAElFTkSuQmCC")};
__resources__["/resources/button.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAABkCAYAAAC4or3HAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIHQMPFlcklQgAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAHRJREFUeNrtwTEBAAAAwqD1T20MH6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+BndzAAEQB55HAAAAAElFTkSuQmCC")};
__resources__["/resources/char_back.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABQCAYAAAAwa2i1AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGMSURBVHic7dYxSpxRFIDR5z8TAgZByQLcgFjrPlJZuzBbm9QpsodASCepLKZIcCBdUNAdqMw/ovid09/Lbb7H27k4O7oZYxwM4L1aT0Pk8N4dTK99AfDyhA4By7kLPu7ujU/7n7dxC/CIf39W4+72/0azs0M//XI+Do9P5q4BnvDj2+X4+f3rRrOzv+7TYvZbATzDNC02n93iHcAbJXQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdAoQOAUKHAKFDgNAhQOgQIHQIEDoECB0ChA4BQocAoUOA0CFA6BAgdAgQOgQIHQKEDgFChwChQ4DQIUDoECB0CBA6BAgdApZzF6yufo3F8sM2bgEe8ff698azOxdnR/dbvAV4g3zdIUDoEDCNMdavfQTwotYPf7wZHtRE85cAAAAASUVORK5CYII=")};
__resources__["/resources/dive.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAtCAYAAABYtc7wAAAFTUlEQVR4Ae1a7XLjIAyM2zRp70/f/zF76SVpPprTOsAARgJhnPh68UzGGISkXQEWON3lclk8rvkw8NTKlePxeKbg9hfpRJT78jdd2+32Tys799IDDMACUD4+PAN7K7+6q/46dXCm6zpVZ2B6okvV6U7CCAC5qgIIPokTVR8fXm1AWq1z1Y77ICYo3w2faqRixBD4Vs6Cx8t+vz9OQGiVSuNLU3yGs2J/NDOkpaMpB+89W2aBr3SGTO0sAnQLG6mBcCvbRfiyATkcDqcUio+PD9RjVAe/MUkC6SpyOuXPiLpqmwZrgB98GG4GLnFc+oIlS5bkMLvMYO3UZiieY6xeT6ZFUcLG6idouUxR0itiy84Q1qtrA2sYqe1utztk+nPNrF6uQ0V9lQ1gAjbBXpVeq09SvKCpt7WCNfe3t7c19RNHBKf3dDo122zFNkbo7gymWGXxc45TMSDv7++/cpbO5zNSYfEiJ9Q79eVyKfomGsw01uguwVDCRY7Tse+QBR0bfL+8vDxnOOjPUSo3sFUzTPBHvaSU7r5xhEJc5AaSiGd0QAi4aCAiRk2GUn9kLvk4tQ85/SJfuWgCEavgRrvsHMAk60xlS11JExlOWC6tspKAQDaYSTb/fn19XVlFJfeSPLxEzy1ltD4bTpJ8lfgddCzp0EBGPUpL13DJN9KhPpk2+rKjWrKrbQtmiDnXB2HBT3tApnUiJ1+ZDARqW+gIFCofDIcBr6Ri8C3FBQQjiMsQaB+EUdIrwy5V6YsT//z83LgHZWHMR6Axfcf4bLjqeTMcDlCDc3BvG/olizZKJ8rNs6mr7WTvMJjZtVrR/o5RwjkWCPIPtcuHA8yrTrfcCiM2qxSDpX2HVDtsYdDL77xarZb2mbmPtXPzgBgcol28+Am7ekAnOOqeNpvNqOMRq9Q4BMKxLgYnxGQDS9XYYCy+vr7UZ2M1fSwm734xGFyVwdjjbRSMBWKBGcISZZvu/UJ0LFwL4miNZPHI4kvITlpVwqd7qUeeADTF4XqhjB+WpUju8ZhhwHCW5DPVlQtIclSZdwQ+wFRnSyknfmKd4agznKUgJjnucELJZT5oe6YrpQ11DV9mnIlBPVJYShVzyUPfD+s8ybL+D5Q3qMCMEIKwIE7PRGlyIiCjK8myStbsZLQb4ONUlPiEvnP0S/Kp6yOFyHDIf9PFtXn1pQR5XX5cMcuBxKWNgZ0h0veKrCFLLTI2SgPs45T3UiPsQGvlHDInpD4KfQOffB1uLYNSytmD/YPCSC+qdEyrfpbyYzGDc1+HCwjQrtfrF7oh2v4PTZpLM1o0ep0s/fF55x6YQokM01VTXYPV57YznDubbslyNW0Kg2nZRu1VSy77g5SUzTT0pSYgovl/MiAGUY6MSQdFoQ8i+anGYMnyBAAm+aM1bzZ/jvb8nWXRcJXk0fA78DsVEHFk0ZqHTVlvhFK1b/peEKTFVPXfHK/EWMEFOLH8GK4GpHsVA67jJWsg4HWeW3EOS1YrThyW1AxpZeShp4KBR0AqSJuyiyYg3Yj/xDbHIJ04S23NHckoNJy5JSkjvig6NYUSHIvgk69RePd3DZ2o4o/cyUtqS3aYrrIjzqRjqYHlYIbgTIW7aHvvN3W0E977FbcuS8fqUtst/DTcOMIi7gIXYs7jLAvCfFSuRyqBwox8LNvsGdkl9x2H2vBvmGa2lIpcILx+xZymAgI9nIKUMWuX62Pbp7hz/szJF+Dm/Bn4zw2j/ktixOCgc9yOkRnV/fhHgznLjU8EzuLoOdmHmyF+/6ry1J9Psfb6x9a+k9Q26XcZzWdk36+S8l+ts6ccvj+WAAAAAABJRU5ErkJggg==")};
__resources__["/resources/donabe.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/donburi.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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phAcHGz3jZWWlnL27FmCg4PZtGkTx44do62tjejoaNauXWsy+e7Ytm0b48eP57HHHrPaf1BQENOnT6e8vJzNmzdTXFzMokWLSEhI6CHMgQMHePLJJy3+Zvd8rHNm39jYSGpqKsOHD+ebb77pEaFJEERpDHt1Uojbu3cvzz//PPv378fT05OUlBT27dvHF198QVJSUq/EaG9vN/kOtVpNVVUVPj4+tLW1sW/fPr799luL/1tYWMiiRYv46SfbO8dyc3PZsGED48aNQ6PRkJmZSUJCAsePHze1yczMZOnSpaSlpUma8jHmF5cuXaK5uZklS5bQ1NRETExMFzGMwY8t52/UwQ1DWTyryM/PZ9myZbS0tBAXF8eePXtIS0vrc2j61VdfodFocHd3Z9WqVRw6dIjS0lJSUw11aqqqqixm3hcvXkShUNjMcYxTMLGxsRQVFZGVlYWfnx9nz57lpZdeoqbGsDtv3rx5jBw5koqKCtLT020+0Z6envj4+HDu3DlmzpzJqVOniIuLY/ny5V3aGbN4Pz8/W3RcMQpy0dYcUE6O4dXvihUrWLduHb6+fa+619TUxNatWwFYv349L774oiliMWb2DQ3mV+8fPHgQgIiICIuRnFarJT09nfj4ePLy8kwEz5w5k6+//prw8HA6OjrIyMgAIDw8nNzcXJRKJbt372bLli0272H69OmmEDg5OZnMzEyTbzEOU9XV1QA88MADtrq7aBTE6p6FggLDPp3nnnvOofnBxx9/TGtrK3PnziUmJqbLd/fdd59JkM5O04jvvzfskJgxY4bZvq9du8bixYv57rvvTON950QvMDCQjz76CIDTp0+bIsSJEyeSlpYGwCeffGIi0xIyMjLYsWMH+/fv58033+wiBsDRo0fRaDSMHTuWwECbwWyDUZA6a62MFzt16lSHiXH8+HF27tyJl5cXr7/+utnphsDAQNrb27lwoeueySNHjnDq1CmUSiXPPvusWct7+eWXqaysxMPDgw0bNpCSktKj3dixYxk9ejQAf/zx90LNhQsXEh0djV6vZ82aNVan4xUKBQ899BD+/v49HYJOR25uLgDx8fFSaKmTJIgx9a+trXWIGHq9nvfffx+ApKQki7OgY8aMAeC3334z/e3q1atkZmaabrI7ERcuXGDhwoXU1dXh6+vLtm3bmDZtms1cojveffddRo4caZr36g2ysrKora0lKCiIuXPnShZEaUuQZ555BpVKxbZt27h+/TpRUVF4e3vbnOuZMGGCSczOqKmp4fTp0yiVSpKSLFf7i4iI4PDhw+Tl5aHX62lubiY/Px+1Wk1QUJDJ8Xe3HrVaTUBAAJ999hmhoaEAFBUVMWzYMJ5++mlTtPPLL79w5coV0zxW9/m4goIC7r33XruF0Ol0ZGVlUVhYiFKp5MMPP5QURht1UNjaeqDT6Vi2bBnl5eV2XVhJSYnJF3RHY2MjR48eZfZsywsl//zzT+Lj402kGSEIArm5uWbfxwDs2LGDSZMmdSF59uzZnDlzhqFDh/Lggw8ydOhQVCoVWq2W8PBwiouLbT5gkhitqyMjIwOVSsWQIUPIzs42OX4JCBUEoUEhvqmyORVZWVnJ4cOHOXfuHDdu3DDrbLubvQRHZhVqtZrt27ejVqvx8/MjOjqap556yi7ybt68yerVq9mzZ0+P/MLf35/NmzdLiYBsor6+nhdeeAGdToevry/Z2dlMnDjRrglpQRBuGJcBXcKxFaQHHFpaWvj555+pr69Hr9cTGhrK1KlTpSRskrF7924qKytJS0szBQwScVkQBD/4e13WBm7vqqG3OzYKgrDUGGWBoRa6DNfBxL9RkGqZE5eiuosg4jLGRpkXl6Cx8ykNnXP9dTI3LkEX3jsLUixz4xJ04b37HkMN8qYdZw9XAZYsBAznZ8hwHnrw3V2QEpkjp6LEqiDiFt2NMk9OSwav2bIQgGyZK6fALM89BBHLPcjl/PoXBZaOU7JUfGalzFm/wiK/ZgURSwfJvqT/fEeDXYKIyJC56xdY5dWiIGIZugUyfw7FAlsHi9kqgrkduc67o1Aj8mkVct1e56HvdXs7Ofgkmc8+IUnqqW6Sar+LZbK/lHntFb6UWmZcsiAi/oP8EsteNIq8SYZ8fkj/ov/ODxGHrgvIpcelIqI3R+nZfSiYeIzPEzLfVvFEb4/Q69UpbeKBV9Nk3s1iWm8PBLPbh5jxKfJpbT0t46e+dCCf9OlYn+Hakz47+ZSgOzgkbhSjKZUjOnPI8d1iNBFyByaPXwIhjjqY2CFDlpkh7E45QCzJngzcZYKIooRgOLtqMOYsNcC/pM5NuWTIMjOENQATGHzvUxYAE/pLjH6zkG7WMhrDW7Lbef/JRiDD1sul20KQbsPYWm6vqfwCYGV/WoTLBOkkTDCGw0xSB7hFZFtaqjOoBOkkzAgM52fkMDAWeDdiWGtbYm5F4aAXxMxwNgdDYfq7nSzCOqDYmcPSgBekmzi+GGqhx2Go+OzI3cGXgf9i2NNX3Xnn0kDBgBPEjEDDMRQZDsNQKNL4CcFQFm8UhooUOgwlji5iKORS1+lzFtAIgnBjoN/v/wGqSQpdvAn2NgAAAABJRU5ErkJggg==")};
__resources__["/resources/fish.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/aji.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/hirame.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/ika.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/iwashi.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/katsuo.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEtwAABLcBtWiB2QAAAAd0SU1FB9sIHwUUOIxA52QAAAo+SURBVHja7Z17lFVVHcc/MEOgsAItlw2hgKAEGmhokKlJgiGaYoUPMJ8lrlXmpKRGPjKRRCHLBwqhFWICivhENDNCTVci0rRCiBGQMFB5SRrDY5j+2Ps05567f/ucc885c++du79rnTV37v7te84937P377F/+3fBwcHBwcHBoVWgKmH/Gn3sAPa425kcbRL2nwJcqV9vBtYD/9J/64GpmiyHFsJCoEk41gBd3C1qWawXyFgFfNrdnvioTtC3M/BZoW0msCnCZ3QH3gmRuRQ4K8N78Evg6Yw+uzuwAdjVEoQMtLT9AzgipP+JwO3AeH1TmgS5w4CTMiTkUf23I9Azxc89Crgb+BtwptaxmeJmi/6Ie7wIHCycZ3KK5zEdl/kekKzOUQ98LspNbZuAkCEpkjsEqAO+3UpVQy/gVWBoVoTsCxyT8kV31rrnplZKShfgWa0TUyfkROATGVz0X4FHWrkRdUAWSv3sDC62AfiWdixbK+YDE9MmpAMwMoOLvSsmGff4LCQPPwJGGGQnaSfWhH+2ICH3WKzJggkZAXxSaNsJrLD07a3NyyC2Aj+PeR31wKLAe+cJsisMskF8pE1UgHZAP0Hm7ZDP6aH1oQlvZeGH2CyhucD5QtvBwEqhbaImpZhYAhypX3cTRuubwAkhn/MScJzh/e3Av9O2sg4BTre0/97Sdoue7oJYp6erUoLkWXeM0LdnoaOjEEJqLX3eB14Q2r4AjBHartdTXWsgpD3QVWirS5uQLsBFlvYZyGsikzGH+uuAWSVoDTVY/K8w/SEtaSxNm5ArgE5C2x7U2ocJp1m8+muAvSVKyI4CRkgvS9ubaRJSo01KmzJ/1/B+FXCb0OdFiylaCtgsRBNshtAxlge2Ls2Lux85cLYbOFToN1bosxc4OuK5peDiNtR6jP/4WJDdYpD1H/2EJ9r0WbZRIC3YLUmTjAFAo4WQaUK/TsBGoc/DMc6fdbS3yWfu+rFAkB0mXGcbTbypz6+iftmwKasaeMAitxW4UWi7GjhQsGB+UgZhjjUW09+EPsB+QtsraRFynTZZJVylR0EQXXWbCfcBq8uAkNUxCTk+xFmMBJuCGhjyJDcAg/QRRH+LidhVk4LFPJxeAoTUC+/3F96XHOblqGXcROiswxxNRTgeLREd0sNiTLQ1mMM7BPk74tz4toKpOhu1ll3JWKuVtOlhDY6SrwlhIYDn45zUNGXdDgwvgxt2A/DrmH0WaqsxKpZiXnY9Hljm+/8Mof/HhEeZrYSMBX5YJk/wfwSDwoa46a4vC4ScQHNAdB+L/niWmJmb/inrQuBeHILRBBOG+4yWUcgZmvPjntAjZIz2xts4DnLwmp52TE6vt2r6XYsVGjsBr1rHqX5L/FD8WPIDg5cAgw2y04HXA+8dCXyvxAnZrZXymYa287SOOU7o+wRqUaogPFKAqWgyCGYJsucYZEcmNHtrC/ieS2KYvR7OtcTwHrTcnxGFEOHd1GuAr6MWWILxnJMM75cCuguj0YaOBZznKT39dDDcO2kNfyPwXBJCVmurYZyvbRMqqevtEp1OagscJXHxETAPecUTYYpuLORkfr0xgeaM9T3AaMxrHJWIqTH1zrRCT+Qn5EPgp/r1ZcAfHA//x18CjqANjxEhuyRq6GSaVmL3Ow7yMCmi3K1JTtLW4MnOdvfeiLmoyK0Nz8QYSZEIcZCxF5UKasO0pCepLuMbtMYwV/fGvEq5CpU3ZrOkwtAhgiM7HhXA3F0MQi41eOpSssNQQ7xnQEJC7kRthfNjho4WBDFRRyOS6pB+ITKDtQ65KssnsYHSXKAy+SAzBNkLE96DYfrhi/odznA6JDt01SGSOIHXhyhwh5kjxI52qDjfgQWEaJ7ROs0RkiKmAMda2m2bbw7QCr7GEZIOxgKXh8icjVp7l9ALWIy85dsREhGnRfA55unpbAz2QGJvVF5WpOkridk71TBkh2HOVnle+wJ+9KTANYOMMUhHK2ylq7ahdgOAinNNQM7gRI+QxZropVkRcgX5SQOzBEJ+YwjJjExIyCjyqyN8WZC9APvayQRU0vUg1DpG2LrJ5eRGwn8GfBE4xdKnBpU0cREwJws/pNgrhmknyg1GRbzj+kkeuqB29EY53wTJjHY6JHe22CdEZi1yUsM27RBui3CugyQLzRHSjJeB71vad6HKRNl2C7+FytFqsMj8CfiOs7KiYTpybto48jNnTHhJT9Emy2s58A0swUdHiNlYWRx470Hibd1+AriY3ODre8CpYVOaIyQfu1E1V7xKd0sIqeAjYCaqiEIj8F9t8q7N0g8pNuYg74uPi3WB/z/QVuA8VJJcQ4Gf+5AmeCcR9xmWMyGvocLtWWEZqkxh0jK3c+OaeqWOceTmi6WFWuS6kE16eplBC9cdTkLID8hfMZTqCp4CfCbw3ueLTPRw1EYbG7ZQgjsCir1imBUWhlzHvRRhN4CzsmTMI6TYmCOkAuAIcYQ4tEY/ZJQOZyRBu5D2BSQvHbWSmPlnUQi5I8LFp4koZYyqyH4TURrfuX0WI+THLfz0t0FlbHzgdEi2+qUaVQFhtNDeDVVbZRXwBnIp2orVIeP1zVvkO/wJy31R+/yCeI/mcnbno9aaB+q51FuRW4daEAKV93Sd9pr9D8EU5NW5isRMg/e6nObsimsFD9dfW/AFQeZ3PpmByHmzUo3ccyhOYZy4x4o0pyxT9khfmutCSXVoD/cpszkWK8nLhn8DuQD/bW5cNGNzyNN9mOXJ8BKNP4VaDzDJ+Pda9LOMkm8Kir864fFcyNN9cgrnqEqLjP0tF3qLz/Tcif1Xa7B88eDWr/mC3HKyCfKFBReHFmMUSFNWf0sfL0GskfyVNr9e8CBNRwO0wvcwWZDrS3mUi8qUEFudxXcM5Jj0iIfHkXNf/VbUK8hZHbWOEBn1EQjp43u9ifwsDr+15K+WLW3QP5nw7WQVSUgjudU637XoIP8PSz4myHUit9LObOREtIsrlZB9A0+4H+vITfKyVSzoE5i2sJjAHhqQi/OPTtNqKSdCvmQZOcEtBVsj+jHrtb8hTUf+MImUSVJTLMun2IR8xSIfrGRgy8LrFvj/KUGuPbm7VuuQqyEc6wjJxd8D/39okQ3urXs64rTlhW38WIyq23VjpXnnHbBnmQS3+h5lkZ1v8K43CLINgWmrBrUZ6M/AVzP6riXpGAajvYORF1X2on502A9bTcFgHlaT9tovsExb3irgBm3p1aHq847O4LsfHtJ+JeaNRkmwElUXOTImWZ4Y0+/9HWSRX2WQP9ci/6RwTcsoj8hulGNRXB1yqkXWtFnRVmTFtBvpj8i5TgNo2aXiklfqPUKG8espEPK+z1Jr0qbwTTqm1YMEVXRaC6ojjg6JkD0xCQH4hf67gPilwiuKkC2o/eRH69BHMGRicux26Sd+uzaBt/sOyUd5wN32aIQ8TPNvQx2qpxHvqMJccntHBGvFIQbKodb76YYRW67YSGn/VKCDg4ODg4NDWvgfUItKQB8+nrYAAAAASUVORK5CYII=")};
__resources__["/resources/fishs/kiss.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEtwAABLcBtWiB2QAAAAd0SU1FB9sIHwURNY+Gb5wAAAexSURBVHja7Z15jBRFFMZ/CwisIugCyrGB3SAISFxFBeXyiAcqRg6DGDAGFC+CkRgNZNUoEqPxAIwaxQsQETzQgCZoRFYOCXggJKKyywoJAsLucskhIOMf1RNme+r1MTO90zNdX9LZ7aqu7un+qt6r9+pVFRgYGBgYGBjkBRqnWK4QmAH0BDoApwPHgMPmk6aHghTL9QdWadL/ATYCk4GVIX7vdsLvj+NfYDUw0fq/wdAkxXJ9hfQWQHegVcgrYhOgi8s1zYBGudKyPgJiwnF+Dvz+YoffHwNqrVaUM9gmvEiVj3s8DlwTUkK2ZrPp+kVHoJOQtx7o5eEepcAz1v8bgZnAfOCoUev+cZdL7Ur12A1MBdpHuYWkgnkBERI/jlotpoUhxBt2BkxI/HjT6BB39GqA3scyYCkwOyFtAjAwg88odMlvCyzI4PO2AOVBfKwpAbeKdULff14Dtcqgjh+9fmC/hs9tAbaME8B44GSUe0x+RFYJ0FvIOw5s8nCP84AzhLzpwIaod2H9EDLCIW+xh9bTDqgW8rYCTxmLwp/IGuXSFXZDuYMyfQDjKfaFMheDrqlL+U4or6mu/IchsH1Co9S9iqzxDnlvo8ZCnPCkQNo+4GEPz58JfJ7BClbkYufsAR7M4PPqMtk6CoG9AvMnHPxaiYr8uFB+fJZafE5b6nc7/PAFaYiblaQ+QBZZQhoBvzv88ItdyvcE/tOUO2blYQjxp0OGIw84fYVytzthqtCTe96j3aLDucCcNN+7mYdnLE3zGeXAT5km7AeHWtTHpWxvy+q2l9sMNE/jN5XkSM9qcKbJGOHwsMUeyn8plE13lDCvCZFEVlNLrDj1vN5wEQk3adJrgZHW4YYXUF5SA+CRENSwAVFsITqF2x54wtTJ8Piy3iL8cVV5C7sOGQfcHPLfvAu4Lge+7fp0b9DF8i2FRQYPiLLIamE574yoCoHIKgDmIge4xQSf033oh1ufRQUJ2DHZ6vba8SjQzVChUGD5dbain5qwEBgquBpOQ3l77ahCH8hcKviIKoArNekDcY5QB7gRFUkZNswnzQG32egD1kqtvzoZLxmVVcL1JcL1FWnokG9CaoMUp6tDpqG8snZL+U8jRLKj1KuoPy5ebekCgywahvFWEgPuAY6Yz5NdwzDeSvYCy/Pg3ZYAOwK8/2gCCAi3K+ZyoCZPKtvLVochKAxuCEL+MkIjPDrEIGQ6xC/uFSz1lg4yV2epdzA0ZIaQ13xeP818biOyItVCwo6nUSGhQaGtIcQfBhmRZWAIMTrkFF5H+b3sGIN+5HEucFCTPsx0fU/BS/T5UcI7QNVI08qnoGKKdZiD/3kmo5Gn601EHzB4IkjSwjxApUMRcEi45/cp3G+TcK8a1MJtRoe4oA54V8i7An/j932BHg4i+7AhxBumkzwCGsdYH/cZ6yA1XjW9LO+oBhYJeXd6fO/mwO1C3vuoya6GEB94UUjviLfIx6HAWZr0GPCSsUP8Yx3yQpxexJZ0zRLgj2y+WK71shJxi3DvI0Ltj6MY/dzIwENcc8WXdRVqenUqdtYhktdXaQ48hzyhf5AgPWpQq652T/E9dqJmluV8C8n1lRziR0WQLeQh9COGUsD2OPQrGhRjkBFC/PY0zKysiPeyDCEGhhCjQ7KEZaidF3Idm4M0DM0cwyy1kOmowaiGxnYjwAwMBHeHeXkNCi1xVQVUWn+3UH9LiQLgBlu5XcAvCedXA11Ra1C1Qy35NFtjrQ9BOQPLgAtxX6ewPzApxN92DRl203fVKNqTqCX/nJS+fdx6kS3fvnBZa9QKc4nXeBmNG0W4/VafZNoOKRZalH2qmz1c074C3c+28x7UH9euBb6wXXM/3jaGiZRhKDn9al0IKaJ+3KtuzY9htnP7kq2NLXFpCEmANCG/zoUQqD9eoCPkVtv51yRPwb4WuMTYIem3kLjYig+f7kAN7LRJyL8MNWh0yDqPAe+QPIdkEioSMhV8h9r8Mij0RS0X0mCEXOCREN1GXvbQ0EobIU0sUioS0hZqCBkJPEZqs2m3k9nVsLMusso0aQeA/bY0XdhkGw0hdvSznVfZustYHoIJRoeo5cPP1qTroi0yRQjAx5q0MYYQuEhI35wiIbpyfTwS0skSb5EmpExI99pCWtvOt2muaUtyKE4l+qVhh0edkP4+CNFFgNunL+x08AbY8a0hJPljSlvU/aZJO9PDc+J7H3ohZJkmrRtyFHreE9JPqPUHgF816S09POc4+jVUdIQsF8gbGAVCdHaIFIi8Bn8rN9ixg+SpxKWa63ZbXeCumooyy8e7XY7a/ScodM42IVLgso6QmAeDUqf849ggEOIHXXDfxD70IqsD8l6Fq3y4WPZ7TCtyIEQn3tpETWTdIeiVY8BaTXohcI4mfU8GCanh1ABZK/JnPS9PhIwWrluB3mclydEaj4RIIqvCMgYrhXKRIKQH8p5SnwrpJT4IqUYN39ZZRy3wt1D+ID72/nPohMwK8Nv1Rk2LDowQqXWcBD4T8g4DH3jUN69YR0OhmuSx+0xiX9CEzLJ6R+Oo7z5f7VCTV1hHFLEf582UU1rzuEAgaQhqbffrUbvtzAjhB7kUtZythLXAe/lWCzo7KF4DAwMDg2jjfzstWs9jMDzQAAAAAElFTkSuQmCC")};
__resources__["/resources/fishs/maguro.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/saba.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/sake.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/sanma.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/sawara.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/suzuki.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fishs/tai.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/fork.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/hari.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/hp_bar.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/iwashi.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/knife.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/komase.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/next.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/resources/owan.png"] = {meta: {mimetype: "image/png"}, data: __imageResource("data:image/png;base64,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")};
__resources__["/ScrollView.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
﻿var cocos = require('cocos2d');
var geom = require('geometry');
var util = require('util');
var ccp = geom.ccp;


var ScrollView = cocos.nodes.Layer.extend({
    cells:null,
    mouse:null,
    datas:null,
    scrollUp:true,
    scrollDown:true,
    init: function(datas){
        ScrollView.superclass.init.call(this);
        var cells = [];
        for(i=0;i<4&&i<datas.length;i++){
            cells[i] = Cell.create({ index:i,
                                      file:datas[i].file,
                                      name:datas[i].name,
                                    recode:datas[i].recode});
            cells[i].setPosition(ccp(0,i*100+10));
            cells[i].set('anchorPoint',ccp(0,0));
            this.addChild({child:cells[i]});
        }
 
        this.set('datas',datas);
        this.set('cells',cells);
        this.set('isMouseEnabled',true);
    },
    mouseDown: function(evt){
        this.set('mouse',evt.locationInCanvas);
        
    },
    mouseDragged: function(evt){
        var size = this.get('contentSize');        

        var cells = this.get('cells');
        var preMouse = util.copy(this.get('mouse'));
        
        var dy = evt.locationInCanvas.y-preMouse.y;
        var up = this.get('scrollUp');
        var down = this.get('scrollDown');
        var vpos;
        var pos;
        var cs;
        var i,max;
        
        if(dy>30||dy<-30){
            this.set('preMouse',evt.locationInCanvas);
            for(i=0,max=cells.length;i<max;i++){
                vpos = util.copy(this.get('position'));
                vs = util.copy(cells[i].get('contentSize'));
                pos = util.copy(cells[i].get('position'));
                cs = util.copy(cells[i].get('contentSize'));
                pos.y += (Math.floor(dy/50)>10)? 10:Math.floor(dy/20);
                //console.log(i+':'+pos.y+':'+dy+':'+vpos.y);
                if(pos.y<-90){
                        var datas = this.get('datas');
                        var index = util.copy(cells[i].get('index'))+max;
                        if(index<datas.length){
                            this.removeChild({child:cells[i],cleanup:true})
                            cells[i] = Cell.create({ index:index,
                                                      file:datas[index].file,
                                                      name:datas[index].name,
                                                    recode:datas[index].recode});
                            this.addChild({child:cells[i]});
                            cells[i].set('anchorPoint',ccp(0,0));
                            pos.y = cells[(i+max-1)%max].get('position').y+100;
                            console.log(pos.y);
                            up = true;
                            down = true;
                        }else{
                            up = false;
                            down = true;
                        }
                    
                        this.set('scrollUp',up);
                        this.set('scrollDown',down);
                        
                    }
                else if(pos.y>310){
                        var datas = this.get('datas');
                        var index = util.copy(cells[i].get('index'))-max;
                        if(index>=0){
                            this.removeChild({child:cells[i],cleanup:true})
                            cells[i] = Cell.create({ index:index,
                                                      file:datas[index].file,
                                                      name:datas[index].name,
                                                    recode:datas[index].recode});
                            this.addChild({child:cells[i]});
                            cells[i].set('anchorPoint',ccp(0,0));
                            
                            pos.y = cells[(i+1)%max].get('position').y-100;
                            down = true;
                            up = true;
                        }else{
                            up = true;
                            down = false;
                        }
                    
                        
                        this.set('scrollDown',down);
                        this.set('scrollUp',up);
                    }
                if(dy>0&&down){
                        cells[i].setPosition(pos);
                        up = true;
                        this.set('scrollUp',up);
                    }
                else if(dy<0&&up){
                    cells[i].setPosition(pos);
                    down = true;
                    this.set('scrollDown',down);
                }
            }
            
        }
  
    }
});

var Cell = cocos.nodes.Node.extend({
    content:null,
    index:null,
    init: function(content) {
        Cell.superclass.init.call(this);
        var img = cocos.nodes.Sprite.create({ file: content.file });
        var name = cocos.nodes.Label.create({ string: content.name+' : ',
                                            fontName: "Thonburi",
                                            fontSize: 12,
                                           fontColor: '#502d16'});
        var recode = cocos.nodes.Label.create({ string: content.recode + '      cm',
                                            fontName: "Thonburi",
                                            fontSize: 12,
                                           fontColor: '#502d16'});
        this.addChild({child:img});
        this.addChild({child:name});
        this.addChild({child:recode});
        this.set('contentSize', {wight:400,height:100});
        name.set('anchorPoint',ccp(0,0));
        recode.set('anchorPoint',ccp(0,0));
        this.set('index',content.index);
        this.set('content',{image:img,name:name,recode:recode,detail:null});
        this.set('isMouseEnabled',true);
	},
    setPosition: function(pos){
        var content = this.get('content');
        var image = this.get('image');
        var name = this.get('name');
        var recode = this.get('recode');
        this.set('position',pos);
        content.image.set('position',ccp(pos.x+50,pos.y+50));
        content.name.set('position',ccp(pos.x+150,pos.y));
        content.recode.set('position',ccp(pos.x+300,pos.y));
        this.set('content',{image:content.image,name:content.name,recode:content.recode,detail:null});
    }
});

exports.Cell = Cell;
exports.ScrollView = ScrollView;
}};
__resources__["/Wave.js"] = {meta: {mimetype: "application/javascript"}, data: function(exports, require, module, __filename, __dirname) {
﻿var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Wave = cocos.nodes.Node.extend({
	elapsedTime:null,
	defaultPosition:null,
	init: function(no) {
        Wave.superclass.init.call(this);
        var initData = constant.waveInitDatas(no);
        var sprite = cocos.nodes.Sprite.create({
                        file: '/resources/bigwave.png',
                        rect: new geom.Rect(0, 0, 200, 200)
                    });
        sprite.set('anchorPoint', new geom.Point(0.5, 0.25));
        sprite.set('rotation',initData.startAngle);
        this.addChild({child: sprite});
        this.set('contentSize',sprite.get('contentSize'));

        var action, actionBack, seq;
        action = actions.RotateBy.create({duration: 2.5, angle: initData.diffAngle});
        actionBack = action.reverse();
        seq = actions.Sequence.create({actions: [action, actionBack]});
        sprite.runAction(actions.RepeatForever.create(seq));
        
        this.scheduleUpdate();
        this.set('elapsedTime',initData.position*5);
	},
	update: function(dt) {
        var pos = util.copy(this.get('position')),
            et  = util.copy(this.get('elapsedTime')),
        	dPos = util.copy(this.get('defaultPosition'));
        
        et += dt;
        pos.x = 10*Math.cos(2*Math.PI*et/5)+dPos.x;
        pos.y = 10*Math.sin(4*Math.PI*et/5)+dPos.y;
 
        this.set('position', pos);
        this.set('elapsedTime',et);
    },
    setPosition: function(pos){
    	var Pos = new geom.Point(pos.x+100,pos.y+100);
    	this.set('position',Pos);
    	this.set('defaultPosition',Pos);
    }
});

exports.Wave = Wave;
}};/*globals module exports resource require window Module __main_module_name__ __resources__*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

function resource(path) {
    // Check for packed resource
    var r = __resources__[path];
    if (r) {
        return r.data;
    }

    // Check for remote resource
    r = __remote_resources__[path];
    if (r) {
        // Load remote image
        if (r.meta.mimetype.split('/')[0] == 'image') {
            return require('cocos2d').RemoteImage.create({url: r.data, path: path});
        } else {
            return require('cocos2d').RemoteResource.create({url: r.data, path: path});
        }
    }

    throw("Unable to find resource: " + path.toString());
}

(function () {
    var process = {};
    var modulePaths = ['/__builtin__', '/__builtin__/libs', '/libs', '/'];

    var path; // Will be loaded further down

    function resolveModulePath(request, parent) {
        // If not a relative path then search the modulePaths for it
        var start = request.substring(0, 2);
        if (start !== "./" && start !== "..") {
            return modulePaths;
        }

        var parentIsIndex = path.basename(parent.filename).match(/^index\.js$/),
            parentPath    = parentIsIndex ? parent.id : path.dirname(parent.id);

        // Relative path so searching inside parent's directory
        return [path.dirname(parent.filename)];
    }

    function findModulePath(id, dirs) {
        if (id.charAt(0) === '/') {
            dirs = [''];
        }
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];
            var p = path.join(dir, id);

            // Check for index first
            if (path.exists(path.join(p, 'index.js'))) {
                return path.join(p, 'index.js');
            } else if (path.exists(p + '.js')) {
                return p + '.js';
            }
        }

        return false;
    }

    function loadModule(request, parent) {
        parent = parent || process.mainModule;

        var paths    = resolveModulePath(request, parent),
            filename = findModulePath(request, paths);

        if (filename === false) {
            throw "Unable to find module: " + request;
        }


        if (parent) {
            var cachedModule = parent.moduleCache[filename];
            if (cachedModule) {
                return cachedModule;
            }
        }

        //console.log('Loading module: ', filename);

        var module = new Module(filename, parent);

        // Assign main module to process
        if (request == __main_module_name__ && !process.mainModule) {
            process.mainModule = module;
        }

        // Run all the code in the module
        module._initialize(filename);

        return module;
    }

    function Module(id, parent) {
        this.id = id;
        this.parent = parent;
        this.children = [];
        this.exports = {};

        if (parent) {
            this.moduleCache = parent.moduleCache;
            parent.children.push(this);
        } else {
            this.moduleCache = {};
        }
        this.moduleCache[this.id] = this;

        this.filename = null;
        this.dirname = null;
    }

    Module.prototype._initialize = function (filename) {
        var module = this;
        function require(request) {
            return loadModule(request, module).exports;
        }

        this.filename = filename;

        // Work around incase this IS the path module
        if (path) {
            this.dirname = path.dirname(filename);
        } else {
            this.dirname = '';
        }

        require.paths = modulePaths;
        require.main = process.mainModule;

        __resources__[this.filename].data.apply(this.exports, [this.exports, require, this, this.filename, this.dirname]);

        return this;
    };

    // Manually load the path module because we need it to load other modules
    path = (new Module('path'))._initialize('/__builtin__/path.js').exports;

    var util = loadModule('util').exports;
    util.ready(function () {
        // Populate globals
        var globals = loadModule('global').exports;
        for (var x in globals) {
            if (globals.hasOwnProperty(x)) {
                window[x] = globals[x];
            }
        }

        // Add a global require. Useful in the debug console.
        window.require = function require(request, parent) {
            return loadModule(request, parent).exports;
        };
        window.require.paths = modulePaths;

        process.mainModule = loadModule(__main_module_name__);

        window.require.main = process.mainModule;

        if (process.mainModule.exports.main) {
            process.mainModule.exports.main();
        }

    });
})();

// vim:ft=javascript

})();
