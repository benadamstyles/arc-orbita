// @flow

import React, {PureComponent, Fragment} from 'react'
import styled from 'styled-components'
import withFutureState from 'set-future-state'
import {after} from 'fluture'
import {primaryColor} from '../../constants/style/colors'

const Box = styled.div`
  transition: opacity 0.2s ease-out;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.7rem;
  overflow: hidden;
  margin-right: ${({style}) => style.left};
  opacity: ${({visible}) => (visible ? 1 : 0)};
  z-index: ${({visible}) => (visible ? 1 : 0)};
  pointer-events: ${({visible}) => (visible ? 'auto' : 'none')};
  max-width: 35em;
`

const ScalingBox = Box.extend`
  transform-origin: bottom left;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  transform: scale(${({visible}) => (visible ? 1 : 0.1)});
`

const BoxContent = styled.div`
  padding: 0.7rem;
`

const Button = styled.button.attrs({type: 'button'})`
  padding: 0.7rem;
  background-color: transparent;
  border: none;
  color: ${primaryColor};
  font-weight: bold;

  &:hover {
    opacity: 0.7;
  }
`

const Description = styled.p`
  white-space: pre-line;
`

const Maximized = ({style, onClick, visible, title, description}) => (
  <ScalingBox style={style} visible={visible}>
    <BoxContent>
      <h1>{title}</h1>
      <Description>{description}</Description>
    </BoxContent>
    <Button onClick={onClick}>Hide</Button>
  </ScalingBox>
)

const Minimized = ({style, onClick, visible}) => (
  <Box style={style} visible={visible}>
    <Button onClick={onClick}>Info</Button>
  </Box>
)

type Props = {
  style: {},
  title: string,
  description: string,
}

export default withFutureState(
  setFutureState =>
    class Info extends PureComponent<Props, {expanded: boolean}> {
      state = {expanded: false}

      componentDidMount() {
        setFutureState(this, after(1000, true), expanded => ({expanded}))
      }

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
          </Fragment>
        )
      }
    }
)
