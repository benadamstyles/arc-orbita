// @flow

import styled from 'styled-components'

export default styled.div`
  padding: ${({pad}) => (pad ? '1rem' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
`
