// @flow

import React, {PureComponent, type Node} from 'react'
import {Subscribe} from 'unstated'
import styled from 'styled-components'
import pure from 'recompose/pure'
import ScrollContainer from '../higher-order/scroll'
import ScrollScale from '../styled/scroll-scale'

type ImageContainerProps = {
  isLastItem: boolean,
  scrollY: number,
  children: Node,
}

const ImageContainerStyled = ScrollScale.extend`
  height: 315px;
  width: 560px;
  margin-bottom: ${({isLastItem}: ImageContainerProps) =>
    isLastItem ? '0' : '10em'};
`

class ImageContainer extends PureComponent<ImageContainerProps, {top: number}> {
  state = {top: 0}

  ref = el =>
    el &&
    this.setState({top: el.getBoundingClientRect().top + window.pageYOffset})

  render() {
    return (
      <ImageContainerStyled
        innerRef={this.ref}
        {...this.props}
        top={this.state.top}>
        {this.props.children}
      </ImageContainerStyled>
    )
  }
}

export const ImageElement = pure(styled.img`
  width: 100%;
`)

type Props = {
  src: string,
  isLastItem: boolean,
}

const Image = ({src, isLastItem}: Props) => (
  <Subscribe to={[ScrollContainer]}>
    {scroll => (
      <ImageContainer scrollY={scroll.state.scrollY} isLastItem={isLastItem}>
        <ImageElement src={`/static/images/${src}`} />
      </ImageContainer>
    )}
  </Subscribe>
)
export default Image
