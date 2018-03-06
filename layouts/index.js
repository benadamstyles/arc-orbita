// @flow

import React, {type Node} from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'

export const styles = {
  container: {
    padding: '1rem',
  },
}

const TemplateWrapper = ({children}: {children: () => Node}) => (
  <div>
    <Helmet
      title="Arc Orbita"
      meta={[
        {name: 'description', content: 'Sample'},
        {name: 'keywords', content: 'sample, something'},
      ]}
    />
    <div style={styles.container}>{children()}</div>
  </div>
)

export default TemplateWrapper
