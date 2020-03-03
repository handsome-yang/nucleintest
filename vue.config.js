module.exports = {
    lintOnSave: false,
    outputDir: 'nucleintest',
    publicPath:'',
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