var
EventEmitter = require('./emitter').EventEmitter,
util = require('./util').util

function object(obj) {
	var
	_obj = obj || {}

	function _object(key, value) {
		var
		type, len = util.makeArray(arguments).length
		type = typeof key

		if (len === 0) { // object()
			return _obj
		} else if (len === 1) { // object('age') or object({age:18})
			if (type === 'string') {
				return _obj[key]
			} else {
				util.extend(_obj, key)
				_object.emit('change', _obj)
			}
		} else { // object('age', 18)
			_obj[key] = value
			_object.emit('change:' + key, value)
		}
	}
	util.extend(_object, EventEmitter.prototype)
	return _object
}
exports.object = object
