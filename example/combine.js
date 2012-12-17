var
map = require('../src/map').map,
fs = require('fs')

files = map([['../src/emitter.js', false], ['../src/util.js', false], ['../src/value.js', false]])

files.on('update', function () {
	var
	finished = this.values().every(function (data) {
		return data !== false
	})

	if (finished) {
		console.log(this.values().join(''))
	}
})

files.keys(function (file) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			throw err
		}
		files.set(file, data)
	})
})

