// @flow

import {PureComponent} from 'react'

type Props = {
  callback: number => void,
}

export default class ScrollEvent extends PureComponent<Props> {
  working = false

  act = () => {
    this.props.callback(window.pageYOffset)
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
    return null
  }
}
