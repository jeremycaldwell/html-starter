module.exports = function(grunt) {

    // Theme path
    $themepath = '';

    // 1. Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatenate JS
        concat: {   
            dist: {
                src: [
                    'js/modernizr.custom.14715.js',     // Modernizr
                    'js/script.js'                      // Script
                ],
                dest: 'js/build/production.js',
            }
        },

        // Uglify JS
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },

        // Image optimization
        imageoptim: {
          myTask: {
            options: {
              jpegMini: false,
              imageAlpha: true,
              quitAfter: true
            },
            src: ['images']
          }
        },

        // Compass & SASS
        compass: {
            options: {
                bundleExec: true,
                relativeAssets: true,
                httpPath: $themepath,
                cssDir: 'css',
                sassDir: 'sass',
                imagesDir: 'images',
                javascriptsDir: 'js',
                // fontsDir: 'fonts',
                assetCacheBuster: 'none',
                require: [
                      'breakpoint', 
                      'sass-globbing', 
                      'singularitygs', 
                      'rgbapng', 
                      'toolkit',
                ]
            },

            // Production
            prod: {
                options: {
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true,
                }
            },
        },

        // Minimize SVGs
        svgmin: {
            options: {
                plugins: [
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false }
                ]
            },
            all: {                                        // Target
                files: [{                                 // Dictionary of files
                    expand: true,                         // Enable dynamic expansion.
                    cwd: 'images/',                       // Src matches are relative to this path.
                    src: ['**/*.svg'],                    // Actual pattern(s) to match.
                    dest: 'images/',                      // Destination path prefix.
                    ext: '.svg'                           // Dest filepaths will have this extension.
                }]
            }
        },

        // SVG Sprites
        "svg-sprites": {
            "icons": {
                options: {
                    spriteElementPath: "images/icons/svg",
                    spritePath: "images",
                    cssPath: "sass",
                    cssSuffix: "scss",
                    cssPrefix: "_sprite",
                    cssPngPrefix: ".no-svg",
                    prefix: "icon",
                    unit: 20
                }
            }
        },

        // PNG Sprites
        sprite:{

            icons: {
                src: 'images/icons/*.png',
                destImg: 'images/sprite-icons.png',
                destCSS: 'sass/_sprite-icons.scss',
                // 'padding': 20,
            },

            // navigation: {
            //     src: 'images/nav/*.png',
            //     destImg: 'images/sprite-nav.png',
            //     destCSS: 'sass/_sprite-nav.scss',
            //     'padding': 20,
            // },
        },

        // Watch
        watch: {

            // Live Reload
            options: {
                livereload: true,
            },

            // CSS
            css: {
                files: [
                    '**/*.scss',
                ],
                tasks: ['compass'],
                options: {
                    spawn: false,
                },
            },

            // Javascript
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
        }

    });

    // 1. Plugins
    
    // Watch
    grunt.loadNpmTasks('grunt-contrib-watch');

    // JS - Concatinate
    grunt.loadNpmTasks('grunt-contrib-concat');

    // JS - Uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // SASS
    grunt.loadNpmTasks('grunt-contrib-compass');

    // SVG min
    grunt.loadNpmTasks('grunt-svgmin');

    // SVG sprites
    grunt.loadNpmTasks('grunt-dr-svg-sprites');

    // PNG sprites
    grunt.loadNpmTasks('grunt-spritesmith');

    // Image compression
    grunt.loadNpmTasks('grunt-imageoptim');

    // 2. Grunt tasks
    grunt.registerTask('default', [
        'concat', 
        'uglify', 
        'compass', 
        'svgmin', 
        'svg-sprites', 
        'sprite', 
        'imageoptim', 
    ]);

};