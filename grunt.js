var
exec = require('child_process').exec

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    })
    grunt.task.registerTask('build', 'build basestone for web browser with noloader', function () {
        exec('noloader ./src/basestone > ./build/basestone.js', function (err) {
            if (err) {
                grunt.fail.fatal(err)
            } else {
                grunt.log.writeln('build success')
            }
        })
    })
}

