// @flow

import type {Node} from 'react'
import {maybe} from 'maybes'
import data from '../../data/content.yml'

type Props = {
  name: string,
  children: string => Node,
}

const QueryImage = ({name, children}: Props) =>
  children(
    maybe(
      data
        .filter(({type}) => type === 'image')
        .find(({src}) => src.includes(name))
    )
      .map(({src}) => `/static/images/${src}`)
      .orJust('')
  )

export default QueryImage
