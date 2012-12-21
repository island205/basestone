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
            return obj
        } else if (len === 1) {
            if (type === 'string') {
                return obj[key]
            } else {
                util.extend(obj, key)
                object.emit('change', obj)
            }
        } else {
            obj[key] = value
            object.emit('change:' + key, value)
        }
    }

    util.extend(object, EventEmitter.prototype)
    return object
}
exports.object = object

