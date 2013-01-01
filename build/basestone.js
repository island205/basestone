function require(id) {
    return (typeof require[id] !== 'undefined') ? require[id] : module.require(id)
}

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        // FUNCTION

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis ? this: oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }

        // ARRAY

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach
        // Production steps of ECMA-262, Edition 5, 15.4.4.18
        // Reference: http://es5.github.com/#x15.4.4.18
        if (!Array.prototype.forEach) {

            Array.prototype.forEach = function forEach(callback, thisArg) {

                var T, k;

                if (this == null) {
                    throw new TypeError("this is null or not defined");
                }

                // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
                var O = Object(this);

                // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
                // 3. Let len be ToUint32(lenValue).
                var len = O.length >>> 0; // Hack to convert O.length to a UInt32
                // 4. If IsCallable(callback) is false, throw a TypeError exception.
                // See: http://es5.github.com/#x9.11
                if ({}.toString.call(callback) !== "[object Function]") {
                    throw new TypeError(callback + " is not a function");
                }

                // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (thisArg) {
                    T = thisArg;
                }

                // 6. Let k be 0
                k = 0;

                // 7. Repeat, while k < len
                while (k < len) {

                    var kValue;

                    // a. Let Pk be ToString(k).
                    //   This is implicit for LHS operands of the in operator
                    // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                    //   This step can be combined with c
                    // c. If kPresent is true, then
                    if (Object.prototype.hasOwnProperty.call(O, k)) {

                        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                        kValue = O[k];

                        // ii. Call the Call internal method of callback with T as the this value and
                        // argument list containing kValue, k, and O.
                        callback.call(T, kValue, k, O);
                    }
                    // d. Increase k by 1.
                    k++;
                }
                // 8. return undefined
            };
        }

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
                "use strict";
                if (this == null) {
                    throw new TypeError();
                }
                var t = Object(this);
                var len = t.length >>> 0;
                if (len === 0) {
                    return -1;
                }
                var n = 0;
                if (arguments.length > 1) {
                    n = Number(arguments[1]);
                    if (n != n) { // shortcut for verifying if it's NaN
                        n = 0;
                    } else if (n != 0 && n != Infinity && n != -Infinity) {
                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                    }
                }
                if (n >= len) {
                    return -1;
                }
                var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                for (; k < len; k++) {
                    if (k in t && t[k] === searchElement) {
                        return k;
                    }
                }
                return -1;
            }
        }
        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
        // Production steps of ECMA-262, Edition 5, 15.4.4.19
        // Reference: http://es5.github.com/#x15.4.4.19
        if (!Array.prototype.map) {
          Array.prototype.map = function(callback, thisArg) {

            var T, A, k;

            if (this == null) {
              throw new TypeError(" this is null or not defined");
            }

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
              throw new TypeError(callback + " is not a function");
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (thisArg) {
              T = thisArg;
            }

            // 6. Let A be a new array created as if by the expression new Array(len) where Array is
            // the standard built-in constructor with that name and len is the value of len.
            A = new Array(len);

            // 7. Let k be 0
            k = 0;

            // 8. Repeat, while k < len
            while(k < len) {

              var kValue, mappedValue;

              // a. Let Pk be ToString(k).
              //   This is implicit for LHS operands of the in operator
              // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
              //   This step can be combined with c
              // c. If kPresent is true, then
              if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[ k ];

                // ii. Let mappedValue be the result of calling the Call internal method of callback
                // with T as the this value and argument list containing kValue, k, and O.
                mappedValue = callback.call(T, kValue, k, O);

                // iii. Call the DefineOwnProperty internal method of A with arguments
                // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
                // and false.

                // In browsers that support Object.defineProperty, use the following:
                // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

                // For best browser support, use the following:
                A[ k ] = mappedValue;
              }
              // d. Increase k by 1.
              k++;
            }

            // 9. return A
            return A;
          };      
        }

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every
        if (!Array.prototype.every)
        {
          Array.prototype.every = function(fun /*, thisp */)
          {
            "use strict";
         
            if (this == null)
              throw new TypeError();
         
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun != "function")
              throw new TypeError();
         
            var thisp = arguments[1];
            for (var i = 0; i < len; i++)
            {
              if (i in t && !fun.call(thisp, t[i], i, t))
                return false;
            }
         
            return true;
          };
        }

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some
        if (!Array.prototype.some)
        {
          Array.prototype.some = function(fun /*, thisp */)
          {
            "use strict";

            if (this == null)
              throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun != "function")
              throw new TypeError();

            var thisp = arguments[1];
            for (var i = 0; i < len; i++)
            {
              if (i in t && fun.call(thisp, t[i], i, t))
                return true;
            }

            return false;
          };
        }

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
        if (!Array.prototype.filter)
        {
          Array.prototype.filter = function(fun /*, thisp */)
          {
            "use strict";
         
            if (this == null)
              throw new TypeError();
         
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun != "function")
              throw new TypeError();
         
            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++)
            {
              if (i in t)
              {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t))
                  res.push(val);
              }
            }
         
            return res;
          };
        }

        // OBJECT

        // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
        if (!Object.keys) {
          Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                  'toString',
                  'toLocaleString',
                  'valueOf',
                  'hasOwnProperty',
                  'isPrototypeOf',
                  'propertyIsEnumerable',
                  'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
              if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

              var result = [];

              for (var prop in obj) {
                if (hasOwnProperty.call(obj, prop)) result.push(prop);
              }

              if (hasDontEnumBug) {
                for (var i=0; i < dontEnumsLength; i++) {
                  if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
                }
              }
              return result;
            }
          })()
        };
    })(require, exports, module)
    require['./lang/lang'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        require('./lang/lang')
        var
        util = {},
        __slice = Array.prototype.slice,
        __toString = Object.prototype.toString

        function extend(target, source) {
            for (var key in source) {
                target[key] = source[key]
            }
            return target
        }

        extend(util, {
            extend: extend,
            clone: function (obj) {
                if (typeof obj !== 'object') {
                    return obj
                } else {
                    if (util.isArray(obj)) {
                        return obj.slice()
                    } else {
                        return util.extend({},
                        obj)
                    }
                }
            },
            isArray: function (value) {
                if (typeof Array.isArray === 'function') {
                    return Array.isArray(value);
                } else {
                    return Object.prototype.toString.call(value) === '[object Array]';
                }
            },
            arrayify: function (o) {
                return __slice.call(o)
            }
        })

        exports.util = util

    })(require, exports, module)
    require['./util'] = require['../util'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        var
        util = require('../util').util

        function Map(iterable) {
            iterable = iterable || []
            this._keys = []
            this._vals = []
            iterable.forEach(function (item) {
                this.set(item[0], item[1])
            }.bind(this))
        }

        exports.Map = Map

        util.extend(Map.prototype, {
            get: function (key) {
                var i
                i = this._keys.indexOf(key)
                return i < 0 ? undefined: this._vals[i]
            },
            has: function (key) {
                return this._keys.indexOf(key) >= 0
            },
            set: function (key, val) {
                var keys, i
                keys = this._keys
                i = this._keys.indexOf(key)
                if (i < 0) {
                    i = keys.length
                }
                keys[i] = key
                this._vals[i] = val
            },
            remove: function (key) {
                var keys, i
                keys = this._keys
                i = this._keys.indexOf(key)
                if (i < 0) {
                    return false
                }
                keys.splice(i, 1)
                this._vals.splice(i, 1)
                return true
            },
            items: function (iterator) {
                var keys = this._keys
                for (var i = 0; i < keys.length; i++) {
                    iterator(keys[i], this._vals[i])
                }
            },
            keys: function (iterator) {
                var keys = this._keys
                if (typeof iterator === 'undefined') {
                    return util.clone(keys)
                }
                for (var i = 0; i < keys.length; i++) {
                    iterator(keys[i])
                }
            },
            values: function (iterator) {
                if (typeof iterator === 'undefined') {
                    return util.clone(this._vals)
                }
                for (var i = 0; i < this._keys.length; i++) {
                    iterator(this._vals[i])
                }
            }
        })

    })(require, exports, module)
    require['./structure/map'] = require['./map'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        // exports.EventEmitter = require('events').EventEmitter
        var
        __slice = Array.prototype.slice

        function EventEmitter() {}

        var proto = EventEmitter.prototype

        proto.listeners = function (event) {
            var
            listeners
            listeners = this.__listeners = this.__listeners || {}
            listeners.__maxListeners = listeners.__maxListeners || 10
            listeners[event] = listeners[event] || []
            return listeners[event]
        }
        proto.addEventListener = function (event, listener) {
            var
            listeners = this.listeners(event)
            if (listeners.length !== 0 && listeners.length >= this.__listeners.__maxListeners) {
                throw new Error('Listener can\'t more than ' + this.listeners.__maxListeners)
            }
            listeners.push(listener)
            this.emit('newListener')
        }

        proto.on = proto.addEventListener

        proto.once = function (event, listener) {
            var
            once

            once = function () {
                this.removeListener(event, listener)
                listener.apply(this, arguments)
            }.bind(this)

            once.__listener = listener
            this.addEventListener(event, once)
        }

        proto.removeListener = function (event, listener) {
            var
            listeners = this.listeners(event),
            i,
            len,
            index = - 1

            for (i = 0, len = listeners.length; i < len; i++) {
                if (listener === listeners[i] || listener === listeners[i].__listener) {
                    index = i
                    break
                }
            }
            if (index !== - 1) {
                listeners.splice(index, 1)
            }
        }

        proto.removeAllListeners = function (event) {

            if (typeof event === 'undefined') {
                this.__listeners = null
            } else {
                if (typeof this.__listeners[event] !== 'undefined') {
                    this.__listeners[event] = null
                }
            }
        }

        proto.setMaxListeners = function (n) {
            this.__listeners.__maxListeners = n
        }

        proto.emit = function (event) {
            var
            args, listeners, i, len

            listeners = this.listeners(event).slice()
            args = []

            if (arguments.length > 1) {
                args = __slice.call(arguments)
                args.shift()
            }

            for (i = 0, len = listeners.length; i < len; i++) {
                listeners[i].apply(this, args)
            }
        }

        exports.EventEmitter = EventEmitter
    })(require, exports, module)
    require['./emitter'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        var
        util = require('../util').util,
        Map = require('./map').Map

        function Set(iterable) {
            iterable = iterable || []
            this._map = new Map()
            iterable.forEach(function (item) {
                this.add(item)
            }.bind(this))
        }

        exports.Set = Set

        util.extend(Set.prototype, {
            add: function (key) {
                this._map.set(key, true)
            },
            has: function (key) {
                return this._map.has(key)
            },
            remove: function (key) {
                return this._map.remove(key)
            },
            values: function () {
                return this._map.keys.apply(this._map, arguments)
            }
        })

    })(require, exports, module)
    require['./structure/set'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        var
        EventEmitter = require('./emitter').EventEmitter,
        Map = require('./structure/map').Map,
        util = require('./util').util

        function map(iterable) {
            var
            mp = new Map(iterable)
            function map(key, value) {
                var
                type, len = util.arrayify(arguments).length,
                iterable
                type = typeof key
                if (len === 0) {
                    return mp
                } else if (len === 1) {
                    if (type === 'array') {
                        iterable = key
                        iterable.forEach(function (item) {
                            var key, value
                            key = item[0]
                            value = item[1]
                            map.set(key, value)
                            map.emit('change', key, value, mp)
                        })
                    } else {
                        return map.get(key)
                    }
                } else {
                    map.set(key, value)
                    map.emit('change', key, value, mp)
                }
            }

            'set remove'.split(' ').forEach(function (method) {
                map[method] = function () {
                    mp[method].apply(mp, arguments)
                    map.emit('update', mp)
                    return mp
                }
            })

            'get has items keys values'.split(' ').forEach(function (method) {
                map[method] = function () {
                    return mp[method].apply(mp, arguments)
                }
            })
            util.extend(map, EventEmitter.prototype)
            return map
        }

        exports.map = map

    })(require, exports, module)
    require['./map'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        var
        EventEmitter = require('./emitter').EventEmitter,
        Set = require('./structure/set').Set,
        util = require('./util').util,
        UPDATE_METHOD = 'add remove'.split(' ')

        function set(iterable) {
            var
            st = new Set(iterable)

            function set(key) {
                var
                len, type, iterable
                len = util.arrayify(arguments).length
                type = typeof key

                if (len === 0) {
                    return st
                } else {
                    if (type === 'array') {
                        iterable = key
                        iterable.forEach(function (item) {
                            set.add(item)
                        })
                    } else {
                        set.add(key)
                    }
                }
            }

            'add remove'.split(' ').forEach(function (method) {
                set[method] = function () {
                    st[method].apply(st, arguments)
                    if (UPDATE_METHOD.indexOf(method) > - 1) {
                        set.emit('update', st)
                    }
                    return set
                }
            })

            'has values'.split(' ').forEach(function (method) {
                set[method] = function () {
                    return st[method].apply(st, arguments)
                }
            })

            util.extend(set, EventEmitter.prototype)
            return set
        }

        exports.set = set
    })(require, exports, module)
    require['./set'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        var
        EventEmitter = require('./emitter').EventEmitter,
        util = require('./util').util

        function value(initVal) {
            // val = val || undefined
            function value(val) {
                if (typeof val === 'undefined') {
                    return initVal
                } else {
                    initVal = val
                    value.emit('change', initVal)
                }
            }
            util.extend(value, EventEmitter.prototype)
            return value
        }
        exports.value = value
    })(require, exports, module)
    require['./value'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        var
        EventEmitter = require('./emitter').EventEmitter,
        util = require('./util').util

        function object(obj) {
            obj = obj || {}

            function object(key, value) {

                var
                type, len = util.arrayify(arguments).length
                type = typeof key

                // return `obj` without argument
                // get value by `key` form obj when arguments's length is `1`
                // and the type if `key` is `tring`.
                // if type is `object`, extend `key` to `obj`
                // otherwise set `obj` with `key` `value`
                if (len === 0) {
                    return util.clone(obj)
                } else if (len === 1) {
                    if (type === 'string') {
                        return obj[key]
                    } else {
                        // util.extend(obj, key)
                        Object.keys(key).forEach(function (k) {
                            object(k, key[k])
                        })
                    }
                } else {
                    obj[key] = value
                    object.emit('change:' + key, value)
                    object.emit('change', obj)
                }
            }

            'keys'.split(' ').forEach(function (method) {
                object[method] = function () {
                    return Object[method].apply(Object, [obj])
                }
            })

            util.extend(object, EventEmitter.prototype)
            return object
        }
        exports.object = object

    })(require, exports, module)
    require['./object'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        var
        EventEmitter = require('./emitter').EventEmitter,
        util = require('./util').util

        function array(arr) {
            arr = arr || []

            function array(arr) {
                if (typeof arr !== 'undefined') {
                    arr = arr
                    array.emit('reset', arr)
                    return
                }
            }

            util.extend(array, {
                pop: function () {
                    var
                    item = arr.pop()
                    array.emit('pop', item, arr)
                    return item
                },
                push: function () {
                    var
                    args = util.arrayify(arguments)
                    Array.prototype.push.apply(arr, args)
                    array.emit('push', args, arr)
                    array.emit.apply(array, ['push'].concat(args.push(arr)).concat([arr]))
                    return array.length
                }
            })

            'sort reverse'.split(' ').forEach(function (method) {
                array[method] = function () {
                    Array.prototype[method].apply(arr, arguments)
                    array.emit(method, arr)
                    return arr
                }
            })

            'map every some filter'.split(' ').forEach(function (method) {
                array[method] = function  () {
                    return arr[method].apply(arr, arguments)
                }
            })

            util.extend(array, EventEmitter.prototype)
            return array

        }
        exports.array = array

    })(require, exports, module)
    require['./array'] = module.exports
})()

void (function () {
    var module = {
        exports: {}
    },
    exports = module.exports

    void (function (require, exports, module) {
        var
        EventEmitter = require('./emitter').EventEmitter,
        value = require('./value').value,
        object = require('./object').object,
        array = require('./array').array,
        map = require('./map').map,
        set = require('./set').set,
        structure = {
            set: require('./structure/set'),
            map: require('./structure/map')
        }

        module.exports = {
            EventEmitter: EventEmitter,
            value: value,
            object: object,
            array: array,
            map: map,
            set: set,
            structure: structure
        }

    })(require, exports, module)
    require['./src/basestone'] = module.exports
})()

