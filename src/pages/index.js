// @flow

import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {maybe} from 'maybes'
import {Link, RouteData} from 'react-static'
import {Spring, animated} from 'react-spring'
import Category from '../components/content/category'
import DisplaceAbsolute from '../components/util/displace-absolute'
import Page from '../components/layout/page'
import ContentBackground from '../components/layout/content-background'
import Global from '../components/meta/global'
import {getImagePath} from '../util/path'
import {getItemImage} from '../util/item'
import ScrollEvent from '../components/util/scroll-event'

const FeatureImg = styled.img`
  max-width: 100%;
  padding-bottom: 4em;
`

class IntroContent extends PureComponent<{style: Object}, {range: number}> {
  state = {
    range: 250,
  }

  componentDidMount() {
    this.setState({range: window.document.body.offsetHeight / 8})
  }

  render() {
    return (
      <ScrollEvent>
        {scroll => (
          <Spring native to={{scroll}}>
            {({scroll: s}) => (
              console.log(this.state.range),
              (
                <animated.div
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    transformOrigin: 'top',
                    ...this.props.style,
                    opacity: s.interpolate({
                      range: [0, this.state.range],
                      output: [1, 0],
                    }),
                    transform: s.interpolate({
                      range: [0, this.state.range],
                      output: ['scale(1)', 'scale(0.9)'],
                    }),
                  }}>
                  <Link to="/">
                    <FeatureImg src={getImagePath('header.png')} />
                  </Link>
                </animated.div>
              )
            )}
          </Spring>
        )}
      </ScrollEvent>
    )
  }
}

export const Intro = DisplaceAbsolute('fixed', IntroContent, {
  padding: '1rem',
  width: '100%',
  textAlign: 'center',
})

const ContentWrapper = ({categories, sampleItems}) => (
  <ContentBackground>
    {categories.map((category, i, {length}) =>
      maybe(sampleItems[i])
        .map(firstItem => (
          <Category
            key={category}
            src={getImagePath(getItemImage(firstItem))}
            name={category}
            isLastItem={i === length - 1}
          />
        ))
        .orJust(null)
    )}
  </ContentBackground>
)

const IndexPage = () => (
  <Page pad>
    <Global />
    <Intro />
    <RouteData>
      {({categories, sampleItems}) => (
        <ContentWrapper categories={categories} sampleItems={sampleItems} />
      )}
    </RouteData>
  </Page>
)

export default IndexPage
