module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      core: {
        src: ['js/zepto/zepto.js', 'js/zepto/event.js', 'js/*.js'],
        dest: 'dist/iotboard.js'
      },
      css: {
        src: ['css/*.css'],
        dest: 'dist/iotboard.css'
      },
      dummy: {
        src: ['models/dummy/*.js'],
        dest: 'dist/models/dummy.model.js'
      },
      freeiot: {
        src: ['models/freeiot/bridge.js', 'models/freeiot/freeiot.model.js'],
        dest: 'dist/models/freeiot.model.js'
      }
    },
    copy: {
      widgets: {
        files: [{
          expand: true, 
          src: ['widgets/**'], 
          dest: 'dist/'
        },{
          expand: true, 
          flatten: true,
          src: ['css/img/*'], 
          dest: 'dist/img/',
          filter: 'isFile'
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
          'dist/models/freeiot.model.min.js': ['dist/models/freeiot.model.js'],
          'dist/models/dummy.model.min.js': ['dist/models/dummy.model.js'],
          'dist/widgets/led/led.widget.min.js': ['dist/widgets/led/led.widget.js'],
          'dist/widgets/switch/switch.widget.min.js': ['dist/widgets/switch/switch.widget.js'],
          'dist/widgets/text/text.widget.min.js': ['dist/widgets/text/text.widget.js'],
          'dist/widgets/atmosphere/atmosphere.widget.min.js': ['dist/widgets/atmosphere/atmosphere.widget.js']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/',
          ext: '.min.css'
        },{
          expand: true,
          cwd: 'dist/widgets/led',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/widgets/led',
          ext: '.widget.min.css'
        },{
          expand: true,
          cwd: 'dist/widgets/switch',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/widgets/switch',
          ext: '.widget.min.css'
        },{
          expand: true,
          cwd: 'dist/widgets/text',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/widgets/text',
          ext: '.widget.min.css'
        },{
          expand: true,
          cwd: 'dist/widgets/atmosphere',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/widgets/atmosphere',
          ext: '.widget.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', "copy", "uglify", "cssmin"]);

};