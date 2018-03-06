// @flow

import {maybe} from 'maybes'

export type YamlData<T> = {|
  [string]: {|
    edges: $ReadOnlyArray<{node: T}>,
  |},
|}

export const getYamlItems = <T>(
  // $FlowFixMe
  [cap, ...rest]: string,
  data: YamlData<T>
): Array<T> =>
  maybe(data)
    .map(d =>
      d[`all${cap.toUpperCase()}${rest.toLowerCase()}Yaml`].edges.map(
        ({node}) => node
      )
    )
    .orJust([])
