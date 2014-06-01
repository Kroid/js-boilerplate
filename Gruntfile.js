module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
    wiredep: {
      target: {
        src: [
          'app/views/development/index.jade'
        ],
        ignorePath: '../../../public'
      }
    },

    includeSource: {
      options: {
        basePath: 'public/',
        baseUrl: '',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
          },
          haml: {
            js: '%script{src: "{filePath}"}/',
            css: '%link{href: "{filePath}", rel: "stylesheet"}/'
          },
          jade: {
            js: 'script(src="{filePath}", type="text/javascript")',
            css: 'link(href="{filePath}", rel="stylesheet", type="text/css")'
          },
          scss: {
            scss: '@import "{filePath}";',
            css: '@import "{filePath}";'
          },
          less: {
            less: '@import "{filePath}";',
            css: '@import "{filePath}";'
          }
        }
      },
      angular: {
        files: {
          'app/views/development/index.jade': 'app/views/development/indexSource.jade'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'includeSource',
    'wiredep'
  ]);
};