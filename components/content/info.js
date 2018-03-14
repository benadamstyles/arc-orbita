// @flow

import React, {PureComponent, Fragment} from 'react'
import styled from 'styled-components'

const Box = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.7rem;
  overflow: hidden;
  padding: 1rem;
`

const Button = styled.button.attrs({type: 'button'})`
  background-color: rgba(255, 255, 255, 0.3);
  border: none;

  &:hover {
    transform: scale(1.2);
  }
`

type Props = {
  name: string,
  style: {},
  title: string,
}

class Info extends PureComponent<Props, {expanded: boolean}> {
  state = {expanded: true}

  toggle = () => this.setState(({expanded}) => ({expanded: !expanded}))

  render() {
    return (
      <Box style={this.props.style}>
        {this.state.expanded && (
          <Fragment>
            <p>{this.props.title.toUpperCase()}</p>
          </Fragment>
        )}
        <Button onClick={this.toggle}>{this.state.expanded ? '–' : '+'}</Button>
      </Box>
    )
  }
}

export default Info
