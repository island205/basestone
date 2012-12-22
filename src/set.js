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
