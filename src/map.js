var
Map = require('./structure/map').Map,
util = require('./util').util,

UPDATE_METHOD = 'set remove'.split(' ')

function map(iterable) {
	var
	_mp = new Map(iterable)
	function _map(key, value) {
		var
		type, len = util.makeArray(arguments).length,
		iterable
		type = typeof key
		if (len === 0) {
			return _mp
		} else if (len === 1) {
			if (type === 'array') {
				iterable = key
				iterable.forEach(function (item) {
					var key, value
					key = item[0]
					value = item[1]
					_map.set(key, value)
					_map.emit('change', key, value, _mp)
				})
			} else {
				return _map.get(key)
			}
		} else {
			_map.set(key, value)
			_map.emit('change', key, value, _mp)
		}
	}

	'get set has remove items keys values'.split(' ').forEach(function (method) {
		_map[method] = function () {
			_mp[method].apply(_mp, arguments)
			if (UPDATE_METHOD.indexOf(method) > - 1) {
				_map.emit('update', _mp)
			}
			return _mp
		}
	})
	return _map
}

exports.map = map

