// @flow

import type {ContentUnion} from '../data/content.yml'

export const getItemImage = (item: ContentUnion) =>
  item.type === 'video' || item.type === 'audio'
    ? item.thumb
    : Array.isArray(item.src)
      ? item.src[0]
      : item.src
