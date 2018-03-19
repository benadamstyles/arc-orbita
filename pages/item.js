// @flow

import React from 'react'
import styled from 'styled-components'
import Global from '../components/meta/global'
import Page from '../components/layout/page'
import Info from '../components/content/info'
import {findByName} from '../util/data'

const styles = {
  info: {
    position: 'fixed',
    display: 'block',
    bottom: '2rem',
    top: 'auto',
    left: '2rem',
  },
}

type Url<Q> = {
  pathname: string,
  query: Q,
  asPath: string,
  push: (Url<*>, as?: string) => void,
  replace: (Url<*>, as?: string) => void,
}

const Image = styled.img``

const Item = ({url: {query: {name}}}: {url: Url<{name: string}>}) =>
  findByName(name)
    .map(item => (
      <Page>
        <Global />
        <Image src={`/static/images/${item.src}`} />
        <Info
          name={name}
          style={styles.info}
          title={item.info.title}
          backgroundColor={item.backgroundColor}
          description={item.info.description}
        />
      </Page>
    ))
    .orJust(null)

export default Item
