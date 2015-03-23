module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '<%= grunt.util.linefeed %><%= grunt.util.linefeed %>',
			},
			preUMD: {
				src: 'src/*.js',
				dest: '<%= pkg.simpleName %>.js',
			},
			postUMD: {
				options: {
					banner: '// <%= pkg.simpleName %> <%= pkg.version %> <%= grunt.util.linefeed %>// (c) 2013, <%= grunt.template.today("yyyy")%> <%= pkg.author %> <%= grunt.util.linefeed %>// <%= pkg.homepage %><%= grunt.util.linefeed %><%= grunt.util.linefeed %>'
				},
				src: '<%= pkg.simpleName %>.js',
				dest: '<%= pkg.simpleName %>.js',
			},
		},
		umd: {
			all: {
				options: {
					template: 'templates/umd-buckets.hbs',
					src: '<%= pkg.simpleName %>.js',
					objectToExport: '<%= pkg.simpleName %>', // optional, internal object that will be exported
				}
			}
		},
		uglify: {
			options: {
				banner: '// <%= pkg.simpleName %> <%= pkg.version %> <%= grunt.util.linefeed %>// (c) 2013, <%= grunt.template.today("yyyy")%> <%= pkg.author %> <%= grunt.util.linefeed %>// <%= pkg.homepage %><%= grunt.util.linefeed %>'
			},
			dist: {
				files: {
					'<%= pkg.simpleName %>.min.js': ['<%= pkg.simpleName %>.js']
				}
			}
		},
		jasmine: {
			pivotal: {
				src: '<%= pkg.simpleName %>.min.js',
				options: {
					specs: 'test/*.js',
					summary: true,
				}
			}
		},
		shell: {
			jsdoc: {
				command: 'node node_modules/jsdoc2/app/run.js <%= pkg.simpleName %>.js -d=doc/ -s -D=\"noGlobal:true\" -D=\"title:Buckets\" -t=templates/jsdoc-buckets'
			}
		},
		jsbeautifier: {
			files: ['<%= pkg.simpleName %>.js', 'src/*.js', 'test/*.js'],
			options: {
			          js: {
			              jslintHappy: true,
			          }
			 }
		},
		writeBowerJson: {
			options: {
				bowerJsonTemplate: 'templates/bower-buckets.json'
			}
		}
	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask('reformat', ['jsbeautifier']);
	grunt.registerTask('build', ['concat:preUMD', 'umd:all', 'concat:postUMD', 'uglify', 'reformat', 'writeBowerJson']);
	grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('doc', ['shell:jsdoc']);
	grunt.registerTask('default', ['build', 'test', 'doc']);
};
