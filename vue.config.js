module.exports = {
	lintOnSave: false,
	outputDir: 'nucleintest',
	publicPath: '',
	devServer: {
		overlay: {
			warning: false,
			errors: false
		}
	},
		css: {
			loaderOptions: {
				postcss: {
					plugins: [
						require('postcss-pxtorem')({
							rootValue: 75,
							selectorBlackList: ['van'],
							propList: ['*'],
						}),
					]
				}
			}
		}
	}
	