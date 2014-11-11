'use strict';

module.exports = function(grunt) {
  var testFiles = ['test/**/*.js'];

  var srcFiles = [
    '*.js',
    'public/**/*.js'
  ].concat(testFiles);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    simplemocha: {
      src: testFiles
    },

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

  grunt.registerTask('private', ['simplemocha']);
  grunt.registerTask('test', ['jshint', 'jscs']);
  grunt.registerTask('default',  ['test']);
};
