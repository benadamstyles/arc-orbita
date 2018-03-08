// @flow

import {PureComponent} from 'react'

type Props = {
  callback: number => void,
}

export default class ScrollEvent extends PureComponent<Props> {
  handleScroll = () => {
    this.props.callback(window.scrollY)
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
