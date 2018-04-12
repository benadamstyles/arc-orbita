// @flow

import {maybe} from 'maybes'
import typeof Data from '../data/content.yml'

export const findByName = (data: Data, name: string) =>
  maybe(data.find(item => item.name === name))

export const getAllCategories = (data: Data) =>
  data.reduce((categories, item) => categories.add(item.category), new Set())
