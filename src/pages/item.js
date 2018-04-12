// @flow

import React, {PureComponent, type ElementType} from 'react'
import styled from 'styled-components'
import {maybe} from 'maybes'
import {withRouteData} from 'react-static'
import typeof Data from '../data/content.yml'
import Global from '../components/meta/global'
import Page from '../components/layout/page'
import Info from '../components/content/info'
import Video from '../components/content/video'

const styles = {
  info: {
    position: 'fixed',
    display: 'block',
    bottom: '2rem',
    top: 'auto',
    left: '2rem',
    zIndex: 100,
  },
}

const Image = styled.img``

const FlipWrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
  height: ${({ratio}) => 100 / ratio}vw;
`

type Props = {
  item: $ElementType<Data, number>,
}

type State = {
  Flip: ?ElementType,
}

class Item extends PureComponent<Props, State> {
  initialHtmlBackgroundColor: string = ''

  state = {
    Flip: null,
  }

  componentDidMount() {
    this.setState({Flip: require('react-flip-page').default})

    this.initialHtmlBackgroundColor = window.getComputedStyle(
      document.documentElement
    ).backgroundColor

    maybe(document.documentElement).forEach(html => {
      // eslint-disable-next-line fp/no-mutation
      html.style.backgroundColor = this.props.item.backgroundColor
    })
  }

  componentWillUnmount() {
    maybe(document.documentElement).forEach(html => {
      // eslint-disable-next-line fp/no-mutation
      html.style.backgroundColor = this.initialHtmlBackgroundColor
    })
  }

  render() {
    const {item} = this.props

    return (
      <Page>
        <Global />
        {item.type === 'image' ? (
          <Image src={`/orbita/assets/images/${item.src}`} />
        ) : (
          <Video {...item} />
        )}

        {item.type === 'image' &&
          maybe(item.pages)
            .flatMap(pages =>
              maybe(this.state.Flip).map(Flip => (
                <FlipWrapper ratio={item.pagesAspectRatio}>
                  <Flip
                    responsive
                    uncutPages
                    flipOnTouch
                    showHint
                    showTouchHint
                    pageBackground={item.backgroundColor}
                    animationDuration={300}
                    orientation="horizontal">
                    {pages.map(url => (
                      <img src={`/orbita/assets/images/books/${url}`} />
                    ))}
                  </Flip>
                </FlipWrapper>
              ))
            )
            .orJust(null)}

        <Info
          style={styles.info}
          title={item.info.title}
          description={item.info.description}
        />
      </Page>
    )
  }
}

export default withRouteData(Item)
