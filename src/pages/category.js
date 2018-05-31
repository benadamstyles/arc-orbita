// @flow

import React from 'react'
import Fade from 'react-reveal/Fade'
import rapt from 'rapt'
import {RouteData} from 'react-static'
import styled from 'styled-components'
import {maybe} from 'maybes'
import typeof Data from '../data/content.yml'
import Thumb from '../components/content/thumb'
import Page from '../components/layout/page'
import ContentBackground from '../components/layout/content-background'
import Global from '../components/meta/global'
import {getImagePath} from '../util/path'
import {getItemImage} from '../util/item'
import {Intro} from './index'

const Statement = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  padding: 2rem 1rem 4rem;
  text-align: center;
  max-width: 40rem;
`

const ContentWrapper = ({items, statement}) => (
  <ContentBackground>
    {maybe(statement)
      .map(s => <Statement>{s}</Statement>)
      .orJust(null)}

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
  </ContentBackground>
)

const CategoryPage = () => (
  <Page pad>
    <Global />
    <Intro />
    <RouteData>
      {({items, statement}: {items: Data, statement: ?string}) => (
        <ContentWrapper items={items} statement={statement} />
      )}
    </RouteData>
  </Page>
)

export default CategoryPage
