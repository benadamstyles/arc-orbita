// @flow

import React, {PureComponent} from 'react'

const width = 560
const height = 315

const styles = {
  video: {
    backgroundColor: 'black',
    position: 'relative',
    overflow: 'hidden',
    width,
    height,
    // borderRadius: '50%',
    zIndex: 1,
  },
  iframe: {
    position: 'relative',
    marginBottom: 0,
    zIndex: -1,
  },
}

type Props = {
  src: string,
  thumb: string,
  style: Object,
}

type State = {expanded: boolean}

export default class Video extends PureComponent<Props, State> {
  state = {expanded: false}

  expand = () => {
    this.setState({expanded: true})
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.state.expanded ? (
          <div style={styles.video}>
            <iframe
              style={styles.iframe}
              width="560"
              height="315"
              src={this.props.src}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={styles.video} onClick={this.expand}>
            <img src={this.props.thumb} />
          </div>
        )}
      </div>
    )
  }
}
