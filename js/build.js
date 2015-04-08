({
    appDir: '.',
    baseUrl: 'src/modules',
    dir: 'dist/',
    modules: [
        {
            name: 'main'
        },
        {
            name: 'ko/ko-form'
        }
    ],
    fileExclusionRegExp: /^(build)\.js$/,
    removeCombined: true,
    paths: {
        knockout: '../knockout'
    }
})