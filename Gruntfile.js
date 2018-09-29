'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package-lock.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

        clean: {
            options: {
                force: true
            },
            files: ['public/stylesheets/*','public/javascripts/*']
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'static_build/sass/',
                    cssDir: 'public/stylesheets/',
                    outputStyle: 'compact',
                    noLineComments: true ,
                    bundleExec:true
                }
            },
            localDev: {
                options: {
                    sassDir: 'static_build/sass/',
                    cssDir: 'One/style/',
                    outputStyle: 'expanded',
                    noLineComments: false
                }
            }
        },
        concat:{
            projectMain:{
                src:[
                    'static_build/js/jquery.js',
                    'static_build/js/functionality.js'
                ],
                dest:'public/javascripts/main.js',
                nonull: true
            }
        },
        cssmin: {
            options: {
                banner: '/* DO NOT COMMIT */',
                report: false /* change to 'gzip' to see gzipped sizes on local */
            },
            minify: {
                expand: true,
                cwd: 'stylesheets',
                src: ['main.css'],
                dest: 'public/stylesheets',
                ext: '.min.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                report: false /* change to 'gzip' to see gzipped sizes on local */
            },
            minify:{
                expand: true,
                cwd: 'public/javascripts',
                src: ['**/*.js','!*.min.js'],
                dest: 'public/javascripts/',
                ext: '.min.js'
            }
        },
        watch: {
            sassy: {
                files: ['static_build/sass/*.scss','static_build/sass/_partials/*.scss'],
                tasks: ['compass:localDev'],
                options: {
                    spawn: false
                }
            },
            scripts:{
                files:['static_build/js/*'],
                tasks:['concat','uglify'],
                options:{
                    spawn:false
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('devWatch', ['compass:localDev','watch']);
    grunt.registerTask('default', ['clean','compass:dist','cssmin','concat','uglify']);


};