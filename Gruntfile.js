module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '<%= grunt.util.linefeed %><%= grunt.util.linefeed %>',
            },
            preUMD: {
                src: 'src/*.js',
                dest: 'dist/<%= pkg.simpleName %>.js',
            },
            postUMD: {
                options: {
                    banner: '// <%= pkg.simpleName %><%= grunt.util.linefeed %>// version: <%= pkg.version %><%= grunt.util.linefeed %>// (c) 2013 - <%= grunt.template.today("yyyy")%> <%= pkg.author.name %> <%= grunt.util.linefeed %>// <%= pkg.homepage %> <%= grunt.util.linefeed %>',
                },
                src: 'dist/<%= pkg.simpleName %>.js',
                dest: 'dist/<%= pkg.simpleName %>.js',
            }
        },
        umd: {
            all: {
                options: {
                    template: 'templates/umd-buckets.hbs',
                    src: 'dist/<%= pkg.simpleName %>.js',
                    objectToExport: '<%= pkg.simpleName %>', // optional, internal object that will be exported
                }
            }
        },
        uglify: {
            options: {
              banner: '/*! <%= pkg.simpleName %> - version: <%= pkg.version %> - (c) 2013 - <%= grunt.template.today("yyyy")%> <%= pkg.author.name %> - <%= pkg.homepage %>*/',
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/<%= pkg.simpleName %>.min.js': ['dist/<%= pkg.simpleName %>.js']
                }
            }
        },
        jasmine: {
            pivotal: {
                src: 'dist/<%= pkg.simpleName %>.min.js',
                options: {
                    specs: 'test/*.js',
                    summary: true,
                }
            }
        },
        shell: {
            jsdoc: {
                command: 'node node_modules/jsdoc2/app/run.js ./dist/<%= pkg.simpleName %>.js -d=doc/ -s -D=\"noGlobal:true\" -D=\"title:Buckets\" -t=templates/jsdoc-buckets'
            }
        },
        jsbeautifier: {
            files: ['dist/<%= pkg.simpleName %>.js', 'src/*.js', 'test/*.js'],
            options: {
                js: {
                    jslintHappy: true,
                }
             }
        },
        bump: {
            options: {
              files: ['package.json', 'bower.json', 'dist/buckets.js', 'dist/buckets.min.js'],
              updateConfigs: [],
              commit: true,
              commitMessage: 'Release v%VERSION%',
              commitFiles: ['package.json', 'bower.json', 'dist/buckets.js', 'dist/buckets.min.js'],
              createTag: true,
              tagName: 'v%VERSION%',
              tagMessage: 'Version %VERSION%',
              push: true,
              pushTo: 'origin',
              gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
              globalReplace: false,
              prereleaseName: false,
              metadata: '',
              regExp: false
            }
        },
        'gh-pages': {
            options: {
                base: 'doc',
                repo: 'https://' + process.env.GH_TOKEN + '@' + process.env.GH_REF,
                message: 'Lastest jsdoc on successful travis build ' + process.env.TRAVIS_BUILD_NUMBER + ' auto-pushed to gh-pages',
                silent: true, // Hide GH_TOKEN from log messages
                user: {
                    name: 'travis-ci',
                    email: 'travis@travis-ci.org'
                }
            },
            src: ['**/*']
        }
    });

    require("load-grunt-tasks")(grunt);

    //////////////////////////
    // Declare all the available tasks
    //////////////////////////

    grunt.registerTask('publish-docs', function() {
        grunt.task.run('doc');

        // Only publish under these conditions
        if (process.env.TRAVIS === 'true' &&
        process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
        process.env.TRAVIS_PULL_REQUEST === 'false') {
            grunt.log.writeln('Publishing documentation...');
            grunt.task.run('gh-pages');
        }
        else {
            grunt.log.writeln('Skipped doc publishing');
        }
    });

    grunt.registerTask('build', ['concat:preUMD', 'umd:all', 'concat:postUMD', 'uglify', 'jsbeautifier']);
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('doc', ['shell:jsdoc']);
    grunt.registerTask('default', ['build', 'test', 'doc']);
};
