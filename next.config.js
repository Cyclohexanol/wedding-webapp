// const { i18n } = require('./next-i18next.config')

module.exports = {
  // i18n,
    publicRuntimeConfig : {
        API_URL: process.env.BRANCH === 'main' ? 'https://wedding-api.saamb.app/api' : 'https://wedding-api-dev.saamb.app/api',
    },
    trailingSlash: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
}
