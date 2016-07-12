/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    baseFolderName : 'www',
    buildFolderName: 'build',
    clean: {
      ci: ['<%= buildFolderName %>/']
    },
    copy: {
      publish: {
        files: [
          {expand: true, cwd: '<%= baseFolderName %>/partials/', src: ['**/*.html'], dest: '<%= buildFolderName %>/partials/'},
          {expand: true, cwd: 'bower_components/', src: ['**/*'], dest: '<%= buildFolderName %>/bower_components/'},
          {expand: true, cwd: '<%= baseFolderName %>/scripts/app/', src: ['app.js'], dest: '<%= buildFolderName %>/scripts/app/'},
          {expand: true, src: ['<%= baseFolderName %>/*'], dest: '<%= buildFolderName %>/', filter: 'isFile', flatten:true}
        ]
      }
    },
    connect: {
      server: {
        options: { port: 9005, base: '<%= buildFolderName %>' }
      }
    },
    watch: {
      dev: {
        files: ['<%= baseFolderName %>/**/*', 'package.json', 'tests/**/*'],
        tasks: ['build']
      }
    }
  });


  grunt.registerTask('build', ['clean:ci','copy:publish']);
  grunt.registerTask('run-dev', ['build', 'connect:server','watch:dev']);

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');


};
