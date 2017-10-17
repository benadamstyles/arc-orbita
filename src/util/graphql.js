// @flow

export const getYamlItems = (
  // $FlowFixMe
  [cap, ...rest]: string,
  data: Object
): Array<Object> => {
  return data[`all${cap.toUpperCase()}${rest.toLowerCase()}Yaml`].edges.map(
    ({node}) => node
  )
}
