var
EventEmitter = require('event').EventEmitter,
Map = require('./structure/map').Map,
util = require('./util').util,

UPDATE_METHOD = 'set remove'.split(' ')

function map(iterable) {
	var
	mp = new Map(iterable)
	function map(key, value) {
		var
		type, len = util.makeArray(arguments).length,
		iterable
		type = typeof key
		if (len === 0) {
			return mp
		} else if (len === 1) {
			if (type === 'array') {
				iterable = key
				iterable.forEach(function (item) {
					var key, value
					key = item[0]
					value = item[1]
					map.set(key, value)
					map.emit('change', key, value, mp)
				})
			} else {
				return map.get(key)
			}
		} else {
			map.set(key, value)
			map.emit('change', key, value, mp)
		}
	}

	'get set has remove items keys values'.split(' ').forEach(function (method) {
		map[method] = function () {
			mp[method].apply(mp, arguments)
			if (UPDATE_METHOD.indexOf(method) > - 1) {
				map.emit('update', mp)
			}
			return mp
		}
	})
    util.extend(map, EventEmitter.prototype)
	return map
}

exports.map = map

