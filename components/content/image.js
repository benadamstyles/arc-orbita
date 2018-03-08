// @flow

import React from 'react'
import {Subscribe} from 'unstated'
import styled from 'styled-components'
import ScrollContainer from '../higher-order/scroll'

const ImageContainer = styled.div`
  width: 560px;
  height: 315px;
  margin-bottom: ${({isLastItem}: {isLastItem: boolean}) =>
    isLastItem ? '0' : '10em'};
`

export const ImageElement = styled.img`
  width: 100%;
`

type Props = {
  src: string,
  isLastItem: boolean,
}

const Image = ({src, isLastItem}: Props) => (
  <Subscribe to={[ScrollContainer]}>
    {({state: {scrollY}}) => (
      <ImageContainer isLastItem={isLastItem}>
        <p>{scrollY}</p>
        <ImageElement src={`/static/images/${src}`} />
      </ImageContainer>
    )}
  </Subscribe>
)
export default Image
