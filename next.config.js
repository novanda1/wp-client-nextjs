module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Unset client-side javascript that only works server-side
            // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
            config.node = { fs: 'empty', module: 'empty' }
        }

        return config
    },

    env: {
        API_URL: process.env.API_URL,
        SITE_NAME: process.env.SITE_NAME,
        SITE_DESCRIPTION: process.env.SITE_DESCRIPTION,
        SITE_URL: process.env.SITE_URL,
        WORDPRESS_PREVIEW_SECRET: process.env.WORDPRESS_PREVIEW_SECRET,
    },
}
