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

