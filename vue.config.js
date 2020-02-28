module.exports = {
    lintOnSave: false,
    outputDir: 'nucleintest',
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