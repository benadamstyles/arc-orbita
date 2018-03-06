// @flow

import React, {PureComponent} from 'react'
import QueryImage from '../query/images'
declare function graphql(string[]): Object

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
  data: Array<*>,
  src: string,
  style: Object,
}

export default class Image extends PureComponent<Props> {
  render() {
    return (
      <div style={this.props.style}>
        <div style={styles.video}>
          <QueryImage name={this.props.src}>
            {url => <img src={url} />}
          </QueryImage>
        </div>
      </div>
    )
  }
}
