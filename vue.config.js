module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-three-rhinoviewer/'
        : '/',

    transpileDependencies: [
      'vuetify'
    ]
}
