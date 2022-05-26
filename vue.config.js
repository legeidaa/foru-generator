const {
    defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    base: '/foru-generator/',
    publicPath: process.env.NODE_ENV === 'production' ?
        '/foru-generator/' :
        '/'
})