// @flow

import styled from 'styled-components'
import {interpolate} from 'd3-interpolate'

const i = interpolate(0.8, 1)

export default styled.div`
  transition: transform 0.1s;
  transform: scale(${({scrollY, top}) => i(1 / -Math.min(-1, top - scrollY))});
`
