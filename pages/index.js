// @flow

import React from 'react'
import styled from 'styled-components'
import {Provider, Subscribe} from 'unstated'
import Video from '../components/content/video'
import Image from '../components/content/image'
import DisplaceAbsolute from '../components/util/displace-absolute'
import ScrollEvent from '../components/functionality/scroll-event'
import data from '../data/content.yml'
import ScrollContainer from '../components/higher-order/scroll'

const FeatureText = styled.p`
  color: #be3a34;
`

const Intro = DisplaceAbsolute(
  'fixed',
  ({style}) => (
    <div style={style}>
      <h1>Orbita</h1>
      <FeatureText>Welcome to this Arc Orbita website.</FeatureText>
    </div>
  ),
  {padding: '1rem'}
)

const ContentWrapper = ({items}) => (
  <div>
    {items.map(
      (item, i, {length}) =>
        item.type === 'video' ? (
          <Video
            key={item.src}
            src={item.src}
            thumb={item.thumb}
            mainColor={item.mainColor}
            isLastItem={i === length - 1}
          />
        ) : (
          <Image key={item.src} src={item.src} isLastItem={i === length - 1} />
        )
    )}
  </div>
)

const Wrapper = styled.div`
  padding: 1rem;
`

const IndexPage = () => (
  <Provider>
    <Subscribe to={[ScrollContainer]}>
      {scroll => <ScrollEvent callback={scroll.updateScrollY} />}
    </Subscribe>
    <Wrapper>
      <Intro />
      <ContentWrapper items={data} />
    </Wrapper>
  </Provider>
)

export default IndexPage
