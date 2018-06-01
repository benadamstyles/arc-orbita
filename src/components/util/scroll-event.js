// @flow

import {Component, type Node} from 'react'

type Props = {
  children: number => Node,
}

type State = {
  scroll: number,
}

export default class ScrollEvent extends Component<Props, State> {
  working = false

  state = {scroll: 0}

  act = () => {
    this.setState({scroll: window.pageYOffset})
    this.working = false
  }

  handleScroll = () => {
    if (!this.working) {
      this.working = true
      requestAnimationFrame(this.act)
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return this.props.children(this.state.scroll)
  }
}
