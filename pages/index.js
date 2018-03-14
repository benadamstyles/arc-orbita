// @flow

import React, {Fragment} from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import rapt from 'rapt'
import Thumb from '../components/content/thumb'
import DisplaceAbsolute from '../components/util/displace-absolute'
import Page from '../components/layout/page'
import Global from '../components/meta/global'
import data from '../data/content.yml'

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React, {exclude: []})
}

const FeatureText = styled.p`
  color: #be3a34;
`

const Intro = DisplaceAbsolute(
  'fixed',
  ({style}) => (
    <div style={style}>
      <h1>Orbita</h1>
      <FeatureText>Welcome to the Arc Orbita website.</FeatureText>
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
            <Thumb
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

const IndexPage = () => (
  <Page pad>
    <Global />
    <Intro />
    <ContentWrapper items={data} />
  </Page>
)

export default IndexPage
