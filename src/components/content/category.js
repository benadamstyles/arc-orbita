// @flow

import React, {type Node} from 'react'
import {Link} from 'react-static'
import styled from 'styled-components'

type ImageContainerProps = {
  isLastItem: boolean,
  children: Node,
}

const height = '300px'

const ImageContainerStyled = styled.div`
  height: ${height};
  width: 100%;
  overflow: hidden;
  margin-bottom: ${({isLastItem}: ImageContainerProps) =>
    isLastItem ? '0' : '1rem'};
`

export const ImageElement = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({source}) => source});
  background-size: cover;
  background-position: center;
`

export const Header = styled.h1`
  line-height: ${height};
  color: white;
  text-align: center;
  font-weight: bold;
  font-family: sans-serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  font-size: 4em;
`

type Props = {
  src: string,
  name: string,
  isLastItem: boolean,
}

const Category = ({src, isLastItem, name}: Props) => (
  <ImageContainerStyled isLastItem={isLastItem}>
    <Link to={`/${name}/`}>
      <ImageElement source={src}>
        <Header>{name}</Header>
      </ImageElement>
    </Link>
  </ImageContainerStyled>
)

export default Category
