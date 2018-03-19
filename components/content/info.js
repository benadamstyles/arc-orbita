// @flow

import React, {PureComponent, Fragment} from 'react'
import styled from 'styled-components'
import {primaryColor} from '../../constants/style/colors'

const Box = styled.div`
  transition: opacity 0.2s ease-out;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.7rem;
  overflow: hidden;
  padding: 0.7rem;
  margin-right: ${({style}) => style.left};
  opacity: ${({visible}) => (visible ? 1 : 0)};
  z-index: ${({visible}) => (visible ? 1 : 0)};
  max-width: 35em;
`

const ScalingBox = Box.extend`
  transform-origin: bottom left;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  transform: scale(${({visible}) => (visible ? 1 : 0.1)});
`

const Button = styled.button.attrs({type: 'button'})`
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  color: ${primaryColor};
  font-weight: bold;

  &:hover {
    transform: scale(1.2);
  }
`

const Maximized = ({style, onClick, visible, title, description}) => (
  <ScalingBox style={style} visible={visible}>
    <h1>{title}</h1>
    <p>{description}</p>
    <Button onClick={onClick}>–</Button>
  </ScalingBox>
)

const Minimized = ({style, onClick, visible}) => (
  <Box style={style} visible={visible}>
    <Button onClick={onClick}>+</Button>
  </Box>
)

type Props = {
  name: string,
  style: {},
  title: string,
  description: string,
  backgroundColor: string,
}

class Info extends PureComponent<Props, {expanded: boolean}> {
  state = {expanded: true}

  toggle = () => this.setState(({expanded}) => ({expanded: !expanded}))

  render() {
    return (
      <Fragment>
        <Maximized
          style={this.props.style}
          onClick={this.toggle}
          visible={this.state.expanded}
          title={this.props.title}
          description={this.props.description}
        />
        <Minimized
          style={this.props.style}
          onClick={this.toggle}
          visible={!this.state.expanded}
        />
        <style global jsx>
          {`
            html {
              background-color: ${this.props.backgroundColor};
            }
          `}
        </style>
      </Fragment>
    )
  }
}

export default Info
