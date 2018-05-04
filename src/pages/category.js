// @flow

import React, {Fragment} from 'react'
import Fade from 'react-reveal/Fade'
import rapt from 'rapt'
import {RouteData} from 'react-static'
import typeof Data from '../data/content.yml'
import Thumb from '../components/content/thumb'
import Page from '../components/layout/page'
import Global from '../components/meta/global'
import {getImagePath} from '../util/path'
import {getItemImage} from '../util/item'
import {Intro} from './index'

const ContentWrapper = ({items}) => (
  <Fragment>
    {items.map((item, i, {length}) =>
      rapt(i % 2 === 0)
        .map(isEven => (
          <Fade
            key={Array.isArray(item.src) ? item.src[0] : item.src}
            left={isEven}
            right={!isEven}>
            <Thumb
              category={item.category}
              src={getImagePath(getItemImage(item))}
              name={item.name}
              isLastItem={i === length - 1}
            />
          </Fade>
        ))
        .val()
    )}
  </Fragment>
)

const CategoryPage = () => (
  <Page pad>
    <Global />
    <Intro />
    <RouteData>
      {({items}: {items: Data}) => <ContentWrapper items={items} />}
    </RouteData>
  </Page>
)

export default CategoryPage
