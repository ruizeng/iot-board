module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    tmod: {
      template: {
        src: './widgets/templates/*.html',
        dest: './widgets/templates/template.js',
        options: {
          output: "./widgets/templates/",
          charset: "utf-8",
          syntax: "native",
          helpers: "widgets/templates/template-helpers.js",
          escape: true,
          compress: true,
          type: "default",
          runtime: "template.js",
          combo: true,
          minify: false,
          cache: true,
          base: "./widgets/templates/"
        } 
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      core: {
        src: ['core/js/zepto/zepto.js', 'core/js/zepto/event.js', 'core/js/arttemplate/*.js','core/js/*.js'],
        dest: 'dist/iotboard.js'
      },
      css: {
        src: ['core/css/*.css'],
        dest: 'dist/iotboard.css'
      },
      dummy: {
        src: ['models/dummy/*.js'],
        dest: 'dist/dummy.model.js'
      },
      freeiot: {
        src: ['models/freeiot/bridge.js', 'models/freeiot/freeiot.model.js'],
        dest: 'dist/freeiot.model.js'
      },
      widgets: {
        src: [ 'widgets/templates/template.js', 'widgets/javascripts/*.js'],
        dest: 'dist/widgets.js'
      }
    },
    copy: {
      widgets: {
        files: [{
          expand: true, 
          src: ['widgets/assets/**'], 
          dest: 'dist/assets/'
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: {
          'dist/iotboard.min.js': ['dist/iotboard.js'],
          'dist/freeiot.model.min.js': ['dist/freeiot.model.js'],
          'dist/dummy.model.min.js': ['dist/dummy.model.js'],
          'dist/widgets.min.js': ['dist/widgets.js']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: false,
          src: ['widgets/stylesheets/*.css'],
          dest: 'dist/widgets.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-tmod');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ["tmod", "concat", "copy", "uglify", "cssmin"]);

};