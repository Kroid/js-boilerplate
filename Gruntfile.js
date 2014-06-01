module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    wiredep: {
      target: {
        src: [
          'app/views/development/index.jade',
          'app/views/production/index.jade'
        ],
        ignorePath: '../../../public'
      }
    },

    includeSource: {
      options: {
        basePath: 'public/',
        baseUrl: '',
        templates: {
          jade: {
            js: 'script(src="{filePath}", type="text/javascript")',
            css: 'link(href="{filePath}", rel="stylesheet", type="text/css")'
          }
        }
      },
      angular: {
        'app/views/production/index.jade': 'app/views/production/indexSource.jade'
      },
      angularDev: {
        files: {
          'app/views/development/index.jade': 'app/views/development/indexSource.jade',
          'app/views/production/index.jade': 'app/views/production/indexSource.jade'
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      angular: {
        src: ['public/angular-dev/**/*.js'],
        dest: 'public/angular-production.js'
      }
    },

    uglify: {
      angular: {
        files: {
          'public/angular-production.min.js': 'public/angular-production.js'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'includeSource',
    'wiredep',
    'concat',
    'uglify'
  ]);
};