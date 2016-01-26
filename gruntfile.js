module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/**\n * @link www.couchfriends.com\n * @license MIT\n */\n'
            },
            build: {
                files: {
                    'build/game.js': [
                        'src/js/utils/three.js',
                        'src/js/Game.js',
                        'src/js/core/Game.Element.js',
                        'src/js/block/Game.Block.js',
                        'src/js/block/Game.BlockCrate.js',
                        'src/js/block/Game.BlockStone.js',
                        'src/js/levels/Game.Level.js',
                        'src/game.js'
                    ]
                }
            }
        },
        copy: {
            main: {
                src: ['**'],
                dest: 'build/assets/',
                cwd: 'src/assets/',
                expand: true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);

    grunt.loadNpmTasks('grunt-contrib-copy');

};