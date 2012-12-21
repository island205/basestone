var
map = require('../src/map').map,
fs = require('fs')

function combine(files, callback) {
    files = files.map(function (file) {
        return [file.file, false]
    })
    files = map(files)

    files.on('update', function () {
        var
        finished = this.values().every(function (data) {
            return data !== false
        })

        if (finished) {
            callback(this.values().join(''))
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
}

exports.combine = combine

