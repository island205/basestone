var
jsp = require('uglify-js').parser,
pro = require('uglify-js').uglify,
fs = require('fs'),
map = require('../src/map').map,
file = process.argv[2],
deps = map([[file, false]])

function isFinished() {
    return deps.values().every(function (value) {
        return value != false
    })
}

function getUnFinishedFile() {
    var
    files = deps.keys().filter(function (key) {
        return deps.get(key) === false
    })

    return files.length === 0 ? null: files[0]
}

function getDependence(file) {
    var
    ast
    file = fs.readFileSync(file, 'utf8')
    ast = jsp.parse(file)
    function getDependence(ast) {
        var deps = []
        ast.forEach(function (item) {
            var file
            if (Object.prototype.toString.call(item) === '[object Array]') {
                if (item[1] && item[1][1] === 'require') {
                    file = item[2][0][1]
                    if (/\.\//.test(file)) {
                        if (!/\.js$/.test(file)) {
                            file += '.js'
                        }
                        deps.push(file)
                    }
                }
                deps = deps.concat(getDependence(item))
            }
        })
        return deps
    }
    return getDependence(ast)
}

function main() {
    var
    _file, _deps
    while (!isFinished()) {
        _file = getUnFinishedFile()
        _deps = getDependence(_file)
        console.log(_file)
        _deps.forEach(function (item) {
            deps.set(item, false)
        })
        deps.set(_file, true)
    }
}

main()

