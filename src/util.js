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
                return util.extend({}, obj)
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
