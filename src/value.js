var
EventEmitter = require('./emitter').EventEmitter,
util = require('./util').utii

function value(val) {
	var
	_val = val || undefined
	function _value(val) {
		if (typeof val === 'undefined') {
			return _val
		} else {
			_val = val
			_value.emit('change', _val)
		}
	}
	util.extend(_value, EventEmitter.prototype)
	return _value
}
exports.value = value
