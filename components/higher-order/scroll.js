// @flow

import {Container} from 'unstated'

type State = {scrollY: number}

export default class ScrollContainer extends Container<State> {
  state = {scrollY: 0}
  updateScrollY = () => this.setState({scrollY: window.scrollY})
}
