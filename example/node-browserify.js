var
jsp = require('uglify-js').parser,
pro = require('uglify-js').uglify,
fs = require('fs'),
path = require('path'),
map = require('../src/map').map,
set = require('../src/set').set,
file = process.argv[2],
originFiles = map(),
deps = map([[file, false]]),
combine = require('./combine'),
deeps = map(),
cwd
deeps.set(file, 0)

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
    ast, deep = deeps.get(file)
    cwd = path.dirname(file)
    file = fs.readFileSync(file, 'utf8')
    ast = jsp.parse(file)
    function getDependence(ast) {
        var _deps = []
        ast.forEach(function (item) {
            var file, originFile
            if (Object.prototype.toString.call(item) === '[object Array]') {
                if (item[1] && item[1][1] === 'require') {
                    originFile = file = item[2][0][1]
                    if (/\.\//.test(file)) {
                        if (!/\.js$/.test(file)) {
                            file += '.js'
                        }
                        file = path.normalize(cwd + '/' + file)
                        if (!deps.has(file)) {
                            _deps.push(file)
                        }
                        deeps.set(file, deep + 1)
                        if (originFiles.has(file)) {
                            originFiles.get(file).add(originFile)
                        } else {
                            originFiles.set(file, set([originFile]))
                        }
                    }
                }
                _deps = _deps.concat(getDependence(item))
            }
        })
        return _deps
    }
    return getDependence(ast)
}

function main() {
    var
    _file, _deps, files
    while (!isFinished()) {
        _file = getUnFinishedFile()
        _deps = getDependence(_file)
        _deps.forEach(function (item) {
            deps.set(item, false)
        })
        deps.set(_file, true)
    }
    files = deeps.keys().map(function (key) {
        return {
            file: key,
            deep: deeps.get(key)
        }
    }).sort(function (a, b) {
        return b.deep - a.deep
    }).map(function (file) {
        file.origin = originFiles.get(file.file)
        return file
    })

    combine.combine(files, function (content) {
        console.log(content)
    })

}

main()

