module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    })
    return config
  },
  exportPathMap: () => ({
    '/': {page: '/'},
    // '/about': { page: '/about' },
    // '/readme.md': { page: '/readme' },
    // '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
    // '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
    // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } }
  }),
}
