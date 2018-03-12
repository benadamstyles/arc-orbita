// @flow

import React, {Fragment} from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import rapt from 'rapt'
import Image from '../components/content/image'
import DisplaceAbsolute from '../components/util/displace-absolute'
import data from '../data/content.yml'

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React, {exclude: [/^Subscribe$/, /^Consumer$/]})
}

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
  <Fragment>
    {items.map((item, i, {length}) =>
      rapt(i % 2 === 0)
        .map(isEven => (
          <Fade key={item.src} left={isEven} right={!isEven}>
            <Image
              src={
                item.type === 'video'
                  ? item.thumb
                  : `/static/images/${item.src}`
              }
              name={item.name}
              isLastItem={i === length - 1}
            />
          </Fade>
        ))
        .val()
    )}
  </Fragment>
)

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IndexPage = () => (
  <Wrapper>
    <Intro />
    <ContentWrapper items={data} />
  </Wrapper>
)

export default IndexPage
