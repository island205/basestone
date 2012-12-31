var
exec = require('child_process').exec

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    })
    grunt.task.registerTask('build', 'build basestone for web browser with noloader', function () {
        exec('noloader ./src/basestone.js > ./build/basestone.js', function (err) {
            if (err) {
                throw err
            } else {
                grunt.log.writeln('build success')
            }
        })
    })
}
