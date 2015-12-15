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
					banner: '// <%= pkg.simpleName %> <%= pkg.version %> <%= grunt.util.linefeed %>// (c) 2013, <%= grunt.template.today("yyyy")%> <%= pkg.author %> <%= grunt.util.linefeed %>// <%= pkg.homepage %><%= grunt.util.linefeed %><%= grunt.util.linefeed %>'
				},
				src: 'dist/<%= pkg.simpleName %>.js',
				dest: 'dist/<%= pkg.simpleName %>.js',
			},
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
				banner: '// <%= pkg.simpleName %> <%= pkg.version %> <%= grunt.util.linefeed %>// (c) 2013, <%= grunt.template.today("yyyy")%> <%= pkg.author %> <%= grunt.util.linefeed %>// <%= pkg.homepage %><%= grunt.util.linefeed %>',
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
		      files: ['package.json', 'bower.json'],
		      updateConfigs: [],
		      commit: true,
		      commitMessage: 'Release v%VERSION%',
		      commitFiles: ['package.json', 'bower.json'],
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
	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask('build', ['concat:preUMD', 'umd:all', 'concat:postUMD', 'uglify', 'jsbeautifier']);
	grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('doc', ['shell:jsdoc']);
	grunt.registerTask('default', ['build', 'test', 'doc']);
};
