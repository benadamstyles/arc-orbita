import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'

const TemplateWrapper = ({children}: {children: Function}) => (
  <div>
    <Helmet
      title="Arc Orbita"
      meta={[
        {name: 'description', content: 'Sample'},
        {name: 'keywords', content: 'sample, something'},
      ]}
    />
    <div
      style={{
        padding: '1rem',
      }}>
      {children()}
    </div>
  </div>
)

export default TemplateWrapper
