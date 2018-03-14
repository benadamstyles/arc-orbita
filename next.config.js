// @flow

const {promisify} = require('util')
const fs = require('fs')
const yaml = require('js-yaml')
const rapt = require('rapt').default
const fromPairs = require('lodash/fromPairs')

module.exports = {
  // $FlowIgnore
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
      {
        test: /\.css$/,
        use: 'raw-loader',
      }
    )
    return config
  },
  exportPathMap: () =>
    rapt(promisify(fs.readFile)('./data/content.yml'))
      .thenMap(yaml.safeLoad)
      .thenMap(data =>
        fromPairs(
          data.map(({name}) => [`/${name}`, {page: '/item', query: {name}}])
        )
      )
      .thenMap(pages => ({
        '/': {page: '/'},
        ...pages,
      }))
      .val(),
}
