var
EventEmitter = require('./emitter').EventEmitter,
util = require('./util').util

function array(arr) {
	var
	_arr = arr || []

	function _array(arr) {
		if (typeof arr !== 'undefined') {
			_arr = arr
			_array.emit('reset', _arr)
			return
		}
	}

	util.extend(_array, {
		pop: function () {
			var
			item = _arr.pop()
			_array.emit('pop', item, _arr)
			return item
		},
		push: function () {
			var
			args = util.makeArray(arguments)
			Array.prototype.push.apply(_arr, args)
			_array.emit('push', args, _arr)
            _array.emit.apply(_array, ['push'].concat(args.push(_arr)).concat([_arr]))
			return _array.length
		}
	})

	'sort reverse'.split(' ').forEach(function (method) {
		_array[method] = function () {
			Array.prototype[method].apply(_arr, arguments)
			_array.emit(method, _arr)
			return _arr
		}
	})

	util.extend(_array, EventEmitter.prototype)
	return _array

}
exports.array = array
