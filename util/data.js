// @flow

import {maybe} from 'maybes'
import data from '../data/content.yml'

export const findByName = (name: string) =>
  maybe(data.find(item => item.name === name))
