module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    clean:
      options:
        force: true
      bodule: "bodule_modules/<%= pkg.name %>/<%= pkg.version %>"

    bodule:
      options:
        pkg: grunt.file.readJSON 'package.json'
      bodule:
        files:
          'bodule_modules/<%= pkg.name %>/': '<%= pkg.main %>'

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-bodule-wrapping'
  grunt.registerTask 'default', ['clean', 'bodule']
