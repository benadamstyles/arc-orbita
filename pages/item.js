// @flow

import React from 'react'
import Global from '../components/meta/global'
import Page from '../components/layout/page'
import {ImageElement} from '../components/content/thumb'
import {findByName} from '../util/data'

type Url<Q> = {
  pathname: string,
  query: Q,
  asPath: string,
  push: (Url<*>, as?: string) => void,
  replace: (Url<*>, as?: string) => void,
}

const Item = ({url: {query: {name}}}: {url: Url<{name: string}>}) => (
  <Page>
    <Global />
    <ImageElement
      source={`/static/images/${findByName(name)
        .map(item => item.src)
        .orJust('')}`}
    />
  </Page>
)

export default Item
