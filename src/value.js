var
EventEmitter = require('./emitter').EventEmitter,
util = require('./util').utii

function value(val) {
	val = val || undefined
	function value(val) {
		if (typeof val === 'undefined') {
			return val
		} else {
			val = val
			value.emit('change', val)
		}
	}
	util.extend(value, EventEmitter.prototype)
	return value
}
exports.value = value
