'use strict';

module.exports = function(grunt){
	grunt.initConfig({
		// Minifica tdos os arquivos js da pasta public/js
		uglify : {
			dist : {
				src : 'public/js/*.js',
				dest : 'public/minified/filesJs.min.js'
			}
		}, 
		// Minifica todos os arquivos css da pasta public/css
		cssmin : {
			dist : {
				src : 'public/css/*.css',
				dest : 'public/minified/filesCss.min.css'
			}
		},
		// Inicia app
		nodemon: {
			dev: {
				script: 'pm2 start app.js'
			}
		},
		// Deploy no github
		git_deploy: {
			deploy: {
				options: {
					url: 'https://github.com/laerciogermano/trabManutencao.git'
				},
				src: '.'
			},
		},
		// Analisa o código etaticamente
		jshint: {
			all: ['./**/*.js'],
			options: {
				jshintrc: true,
				reporter: 'checkstyle',
				reporterOutput: 'relatorios/jshint.xml'
			}
		},
		plato: {
			coverage: {
				options : {
					jshint : grunt.file.readJSON('.jshintrc')
				},
				files: {
					'public/test/plato': [
						'public/chat.js',
						'app.js',
						'config.js',
						'Gruntfile.js',
						'routes.js'
					]
				}
			}
		},
		// Limpa o projeto
		clean: ['node_modules','bower_components','public/minified'],
	});

	//Carregando módulo para minificar js
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//Carregando módulo para minificar css
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// Carregando múdulo para limpar projeto
	grunt.loadNpmTasks('grunt-contrib-clean');
	// Carregando módulo para iniciar app
	grunt.loadNpmTasks('grunt-nodemon');
	// Carregando módulo para deploy github
	grunt.loadNpmTasks('grunt-git-deploy');
	// Carregando módulo de análise estatica de código
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-plato');
	// Carregando todos os módulos

	//require('load-grunt-tasks')(grunt);


	// Criando tarefa default. 'grunt'
	grunt.registerTask('default', ['uglify:dist','cssmin:dist', 'jshint']);
	// Criando tarefa de deploy
	grunt.registerTask('deploy', ['git_deploy']);
};