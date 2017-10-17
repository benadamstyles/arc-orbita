// @flow

import React from 'react'
import Link from 'gatsby-link'
import Video from '../components/video'
import {getYamlItems} from '../util/graphql'

declare function graphql(string[]): Object

const Intro = () => (
  <div>
    <h1>Orbita</h1>
    <p>Welcome to this Arc Orbita website.</p>
  </div>
)

const Content = ({items}) => (
  <div style={{}}>
    {items.map(
      ({youtube, type}) => (
        console.log(type),
        (
          <Video
            key={youtube}
            youtube={youtube}
            style={{float: 'left', marginLeft: '1rem'}}
          />
        )
      )
    )}
  </div>
)

const IndexPage = ({data}: Object) => (
  <div>
    <Intro />
    <Content items={getYamlItems('content', data)} />
  </div>
)

export default IndexPage

export const Q = graphql`
  query IndexQuery {
    allContentYaml {
      edges {
        node {
          youtube
          type
        }
      }
    }
  }
`
