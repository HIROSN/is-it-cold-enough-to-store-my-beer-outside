'use strict';

module.exports = function(grunt) {
  var srcFiles = ['*.js', 'public/**/*.js'];

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    jshint: {
      files: srcFiles,
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: srcFiles,
      options: {
        preset: 'google',
        requireCamelCaseOrUpperCaseIdentifiers: 'ignoreProperties'
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs']);
  grunt.registerTask('default',  ['test']);
};
