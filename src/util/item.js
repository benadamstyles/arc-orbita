// @flow

import type {ContentUnion} from '../data/content.yml'

export const getItemImage = (item: ContentUnion) =>
  item.type === 'video' || item.type === 'audio' ? item.thumb : item.src
