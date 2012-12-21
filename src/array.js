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

    util.extend(array, EventEmitter.prototype)
    return array

}
exports.array = array

