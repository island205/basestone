var
map = require('../src/map').map,
fs = require('fs'),
util = require('../src/util').util

function combine(files, callback) {
    var
    code
    files = files.map(function (file) {
        return [file, false]
    })
    files = map(files)

    files.on('update', function () {
        var
        finished = this.values().every(function (data) {
            return data !== false
        })

        if (finished) {
            code = "function require(id) {\n" + "    return (typeof require[id] !== 'undefined') ? require[id] : module.require(id)\n" + "}\n" + this.values().join('')
            callback(code)
        }
    })

    files.keys(function (file) {
        fs.readFile(file.file, 'utf8', function (err, data) {
            var code
            if (err) {
                throw err
            }
            if (typeof file.origin === 'undefined') {
                data = '\nnew function () {\n' + '    var exports = this\n' + data.split('\n').map(function (line) {
                    return line = '    ' + line
                }).join('\n') + '}\n'
            } else {
                code = file.origin.values().map(function (origin) {
                    return 'require[\'' + origin + '\']'
                }).join(' = ')
                data = code + ' = new function () {\n' + '    var exports = this\n' + data.split('\n').map(function (line) {
                    return line === '' ? line: line = '    ' + line
                }).join('\n') + '}\n'
            }
            files.set(file, data)
        })
    })
}

exports.combine = combine

