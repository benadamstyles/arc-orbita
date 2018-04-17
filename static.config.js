// @flow

import {promisify} from 'util'
import fs from 'fs'
import React, {Component, type ComponentType, type Node} from 'react'
import {ServerStyleSheet} from 'styled-components'
import yaml from 'js-yaml'
import {getAllCategories} from './src/util/data'

type DocumentProps = {
  Html: ComponentType<*>,
  Head: ComponentType<*>,
  Body: ComponentType<*>,
  children: ComponentType<*>,
  routeInfo: {},
  siteData: {},
  renderMeta: {
    styleTags: Node,
  },
}

class Document extends Component<DocumentProps> {
  render() {
    const {Html, Head, Body, children, renderMeta} = this.props

    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {renderMeta.styleTags}
        </Head>
        <Body>{children}</Body>
      </Html>
    )
  }
}

export default {
  siteRoot: 'https://www.arcpublications.co.uk',
  basePath: 'orbita',

  getSiteData: () => ({
    title: 'Orbita: The Project',
  }),

  getRoutes: async () => {
    const data = yaml.safeLoad(
      await promisify(fs.readFile)('./src/data/content.yml')
    )

    const categories = [...getAllCategories(data)]

    // const paths = {
    //   '/': {page: '/'},
    //   '/books': {page: '/category', query: {category: 'books'}},
    //   '/videos': {page: '/category', query: {category: 'videos'}},
    //   '/artura': {page: '/item', query: {name: 'artura'}},
    //   '/used': {page: '/item', query: {name: 'used'}},
    //   '/stereo': {page: '/item', query: {name: 'stereo'}},
    //   '/tal': {page: '/item', query: {name: 'tal'}},
    //   '/semions': {page: '/item', query: {name: 'semions'}},
    //   '/semions-int': {page: '/item', query: {name: 'semions-int'}},
    //   '/z-magnet': {page: '/item', query: {name: 'z-magnet'}},
    //   '/zorzs': {page: '/item', query: {name: 'zorzs'}},
    //   '/time-room': {page: '/item', query: {name: 'time-room'}},
    //   '/right': {page: '/item', query: {name: 'right'}},
    //   '/orchestral-rehearsal': {
    //     page: '/item',
    //     query: {name: 'orchestral-rehearsal'},
    //   },
    // }

    return [
      {
        path: '/',
        component: 'src/pages/index',
        getData: () => ({
          categories,
          sampleItems: categories.map(category =>
            data.find(item => item.category === category)
          ),
        }),

        children: categories.map(category => ({
          path: category,
          component: 'src/pages/category',
          getData: () => ({
            items: data.filter(item => item.category === category),
          }),

          children: data.map(item => ({
            path: item.name,
            component: 'src/pages/item',
            getData: () => ({item}),
          })),
        })),
      },

      {
        is404: true,
        component: 'src/pages/404',
      },
    ]
  },

  renderToHtml: (
    render: Node => string,
    RootComponent: ComponentType<*>,
    meta: $PropertyType<DocumentProps, 'renderMeta'>
  ) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<RootComponent />))
    // eslint-disable-next-line fp/no-mutation
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document,
}
