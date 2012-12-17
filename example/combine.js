var
map = require('../src/map').map,
fs = require('fs')

files = map([['../src/emitter.js', false], ['../src/util.js', false], ['../src/value.js', false]])

files.keys(function (file) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			throw err
		}
		files.set(file, data)
	})
})

files.on('update', function () {
	var
	datas = []
	files.values(function (data) {
		datas.push(data)
	})
	var finished = datas.every(function (data) {
		return data !== false
	})

	if (finished) {
		console.log(datas.join(''))
	}
})

