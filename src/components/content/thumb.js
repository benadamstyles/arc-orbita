// @flow

import React, {type Node} from 'react'
import {Link} from 'react-static'
import styled from 'styled-components'

type ImageContainerProps = {
  isLastItem: boolean,
  children: Node,
}

const ImageContainerStyled = styled.div`
  height: 300px;
  width: 300px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: ${({isLastItem}: ImageContainerProps) =>
    isLastItem ? '0' : '10em'};
`

export const ImageElement = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({source}) => source});
  background-size: cover;
  background-position: center;
`

type Props = {
  src: string,
  name: string,
  isLastItem: boolean,
}

const Thumb = ({src, isLastItem, name}: Props) => (
  <ImageContainerStyled isLastItem={isLastItem}>
    <Link to={`/${name}/`}>
      <ImageElement source={src} />
    </Link>
  </ImageContainerStyled>
)

export default Thumb
