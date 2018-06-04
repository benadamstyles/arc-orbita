// @flow

import React, {PureComponent, type ElementType} from 'react'
import {maybe} from 'maybes'
import {Link, withRouteData} from 'react-static'
import type {ContentUnion} from '../data/content.yml'
import Global from '../components/meta/global'
import Page from '../components/layout/page'
import Info from '../components/content/info'
import Video, {defaultIframeProps} from '../components/content/video'
import Audio from '../components/content/audio'
import Image from '../components/content/image'
import Flip from '../components/content/flip'
import {getImagePath, getAudioPath} from '../util/path'

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

const ContentSwitch = ({item}: {item: ContentUnion}) => {
  if (item.type === 'image') {
    return Array.isArray(item.src) ? (
      item.src.map(s => <Image src={getImagePath(s)} />)
    ) : (
      <Image src={getImagePath(item.src)} />
    )
  } else if (item.type === 'video') {
    return <Video {...item} />
  } else if (item.type === 'audio') {
    return (
      <Audio
        src={getAudioPath(item.src)}
        backgroundColor={item.backgroundColor}
        thumb={item.thumb}
      />
    )
  } else {
    return null
  }
}

type Props = {
  item: ContentUnion,
}

type State = {
  FlipPage: ?ElementType,
}

class ItemPage extends PureComponent<Props, State> {
  initialHtmlBackgroundColor: string = ''

  state = {
    FlipPage: null,
  }

  /* eslint-disable fp/no-mutation */
  componentDidMount() {
    this.setState({FlipPage: require('react-flip-page').default})

    this.initialHtmlBackgroundColor = window.getComputedStyle(
      document.documentElement
    ).backgroundColor

    maybe(document.documentElement).forEach(html => {
      html.style.backgroundColor = this.props.item.backgroundColor
    })
  }

  componentWillUnmount() {
    maybe(document.documentElement).forEach(html => {
      html.style.backgroundColor = this.initialHtmlBackgroundColor
    })
  }
  /* eslint-enable fp/no-mutation */

  render() {
    const {item} = this.props

    return (
      <Page>
        <Global />

        {/* NOTE: hackfix https://github.com/nozzle/react-static/issues/569 */}
        <Link to={`/${item.category}`} />

        <ContentSwitch item={item} />

        {item.type === 'image' &&
          maybe(item.pages)
            .flatMap(pages =>
              maybe(this.state.FlipPage).map(FlipPage => (
                <Flip item={item} pages={pages} FlipPage={FlipPage} />
              ))
            )
            .orJust(null)}

        {(item.type === 'image' || item.type === 'audio') &&
          maybe(item.videos)
            .map(videos =>
              videos.map(video => (
                <iframe
                  key={video}
                  src={video}
                  {...defaultIframeProps}
                  width="640"
                  height="360"
                />
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

export default withRouteData(ItemPage)
