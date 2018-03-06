// @flow

import React from 'react'
import Video from '../components/content/video'
import Image from '../components/content/image'
import DisplaceAbsolute from '../components/util/displace-absolute'
import data from '../data/content.yml'

type ContentType = 'video'
type Content = {type: ContentType, src: string, thumb: string}

const styles = {
  container: {
    padding: '1rem',
  },

  page: {
    overflowX: 'scroll',
  },
  content: {
    display: 'table',
  },
  video: {
    paddingRight: '10em',
    display: 'table-cell',
  },
  lastItem: {
    paddingRight: 0,
  },
  featureText: {
    color: '#be3a34',
  },
}

const Intro = DisplaceAbsolute(
  'fixed',
  ({style}) => (
    <div style={style}>
      <h1>Orbita</h1>
      <p style={styles.featureText}>Welcome to this Arc Orbita website.</p>
    </div>
  ),
  styles.container
)

const ContentContainer = ({items}: {items: $ReadOnlyArray<Content>}) => (
  <div style={styles.content}>
    {items.map(
      ({src, thumb, type}, i, {length}) =>
        type === 'video' ? (
          <Video
            key={src}
            src={src}
            thumb={thumb}
            style={{
              ...styles.video,
              ...(i === length - 1 ? styles.lastItem : {}),
            }}
          />
        ) : (
          <Image
            key={src}
            src={src}
            style={{
              ...styles.video,
              ...(i === length - 1 ? styles.lastItem : {}),
            }}
          />
        )
    )}
  </div>
)

const IndexPage = () => (
  <div style={styles.page}>
    <Intro />
    <ContentContainer items={data} />
  </div>
)

export default IndexPage
