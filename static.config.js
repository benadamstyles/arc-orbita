// @flow

import {promisify} from 'util'
import fs from 'fs'
import React, {Component, type ComponentType, type Node} from 'react'
import {ServerStyleSheet} from 'styled-components'
import yaml from 'js-yaml'
import {maybe} from 'maybes'
import {getAllCategories} from './src/util/data'
import typeof Data from './src/data/content.yml'
import typeof Statements from './src/data/category-statements.yml'

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
    const data: Data = yaml.safeLoad(
      await promisify(fs.readFile)('./src/data/content.yml')
    )

    const statements: Statements = yaml.safeLoad(
      await promisify(fs.readFile)('./src/data/category-statements.yml')
    )

    const categories = [...getAllCategories(data)]

    return [
      {
        path: '/',
        component: 'src/pages/index',
        getData: () => ({
          categories,
          sampleItems: categories.map(category =>
            data.find(
              item => item.category === category && item.isCategorySample
            )
          ),
        }),

        children: categories.map(category => {
          const items = data.filter(item => item.category === category)
          const statement = maybe(statements.find(s => s.category === category))
            .map(s => s.statement)
            .orJust(null)

          return {
            path: category,
            component: 'src/pages/category',
            getData: () => ({items, statement}),

            children: items.map(item => ({
              path: item.name,
              component: 'src/pages/item',
              getData: () => ({item}),
            })),
          }
        }),
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
