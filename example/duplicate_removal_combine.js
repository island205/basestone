function require(id) {
    return (typeof require[id] !== 'undefined') ? require[id] : module.require(id)
}
require['./util'] = require['../util'] = new
function () {
    var exports = this
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
        isArray: function (obj) {
            return __toString.call(obj) === '[object Array]'
        },
        arrayify: function (o) {
            return __slice.call(o)
        }
    })

    exports.util = util
}
require['./map'] = new
function () {
    var exports = this
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

}
require['./emitter'] = new
function () {
    var exports = this
    exports.EventEmitter = require('events').EventEmitter
}
require['./structure/set'] = new
function () {
    var exports = this
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

}
require['../src/set'] = new
function () {
    var exports = this
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
}

new
function () {
    var exports = this
    var
    set = require('../src/set').set,
    duplicateList = [7, 10, 2, 0, 7, 7, 8, 13, 1, 9, 9, 7, 3, 7, 0, 10, 4, 3, 4, 5, 7, 12, 0, 0, 12, 5, 2, 5, 12, 12, 0, 13, 6, 10, 5, 13, 5, 14, 4, 5, 10, 5, 5, 5, 14, 9, 5, 4, 7, 7, 1, 6, 11, 3, 12, 3, 8, 5, 5, 2, 10, 7, 10, 11, 6, 0, 6, 0, 3, 2, 5, 3, 10, 12, 6, 11, 12, 4, 4, 9, 7, 2, 9, 2, 6, 4, 13, 11, 14, 7, 2, 4, 4, 5, 6, 10, 14, 9, 1, 9, 10, 42, 24, 38, 20, 25, 2, 39, 37, 44, 27, 30, 36, 0, 30, 48, 41, 39, 28, 15, 20, 19, 34, 27, 28, 0, 2, 31, 1, 11, 48, 28, 19, 12, 39, 43, 0, 4, 28, 27, 28, 5, 35, 28, 23, 44, 29, 41, 29, 23, 32, 5, 14, 20, 32, 31, 30, 39, 4, 34, 5, 36, 32, 45, 37, 12, 7, 36, 36, 32, 31, 47, 10, 22, 0, 35, 15, 34, 14, 28, 5, 42, 19, 9, 42, 22, 36, 25, 14, 17, 33, 26, 12, 32, 23, 5, 26, 31, 28, 28, 46, 46],
    singleList = set()

    // or just use `singleList = set(duplicateList)`
    for (var i = 0, len = duplicateList.length; i < len; i++) {
        singleList.add(duplicateList[i])
    }

    // out:[ 7, 10, 2, 0, 8, 13, 1, 9, 3, 4, 5, 12, 6, 14, 11, 42, 24, 38, 20, 25, 39, 37, 44, 27, 30, 36, 48, 41, 28, 15, 19, 34, 31, 43, 35, 23, 29, 32, 45, 47, 22, 17, 33, 26, 46 ]
    console.log(singleList.values())

}

