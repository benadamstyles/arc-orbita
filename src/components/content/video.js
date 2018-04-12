// @flow

import React from 'react'
import styled from 'styled-components'
import {primaryColor} from '../../constants/style/colors'

const Wrapper = styled.div`
  width: 100%;
`

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
`

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

type Props = {
  src: string,
  mainColor: string,
}

const Video = (props: Props) => (
  <Wrapper>
    <VideoContainer style={{backgroundColor: props.mainColor}}>
      <Iframe
        width="640"
        height="360"
        src={`${props.src}?color=${primaryColor.substr(1)}&byline=0&portrait=0`}
        frameBorder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
      />
    </VideoContainer>
  </Wrapper>
)

export default Video
