// @flow

import React from 'react'

const Video = ({youtube, style}: {youtube: string, style: Object}) => (
  <div style={style}>
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube-nocookie.com/embed/${youtube}?rel=0&amp;showinfo=0`}
      frameBorder="0"
      allowFullScreen
    />
  </div>
)

export default Video
