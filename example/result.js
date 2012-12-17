exports.EventEmitter = require('events').EventEmitter
var
util = {},
__slice = Array.prototype.slice

function extend(target, source) {
	for (var key in source) {
		target[key] = source[key]
	}
}

extend(util, {
	extend: extend,
	makeArray: function (o) {
		return __slice.call(o)
	}
})

exports.util = util

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

