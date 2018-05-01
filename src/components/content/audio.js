// @flow

import React, {Fragment} from 'react'
import styled from 'styled-components'
import ReactAudioPlayer from 'react-audio-player'
import {getImagePath} from '../../util/path'
import Image from './image'

const AudioPlayer = styled(ReactAudioPlayer)`
  width: 40em;
  max-width: 100%;
`

type Props = $ReadOnly<{
  src: string,
  thumb: string,
  backgroundColor: string,
}>

const Audio = (props: Props) => (
  <Fragment>
    <AudioPlayer controls src={props.src} />
    <Image src={getImagePath(props.thumb)} />
  </Fragment>
)

export default Audio
