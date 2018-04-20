// @flow

import React, {type ElementType} from 'react'
import styled from 'styled-components'
import type {Item} from '../../pages/item'
import {getImagePath} from '../../util/path'

const maxWidthInRem = 60

const FlipWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 7rem;
  width: 100%;
  max-width: ${maxWidthInRem}rem;
  height: ${({ratio}) => 100 / ratio}vw;
  max-height: ${({ratio}) => maxWidthInRem / ratio}rem;
`

type Props = $ReadOnly<{
  item: Item,
  FlipPage: ElementType,
  pages: $PropertyType<Item, 'pages'>,
}>

const Flip = ({item, FlipPage, pages}: Props) => (
  <FlipWrapper ratio={item.pagesAspectRatio}>
    <FlipPage
      responsive
      uncutPages
      flipOnTouch
      showHint
      showTouchHint
      pageBackground={item.backgroundColor}
      animationDuration={300}
      orientation="horizontal">
      {pages.map(url => <img src={getImagePath(`books/${url}`)} />)}
    </FlipPage>
  </FlipWrapper>
)

export default Flip
