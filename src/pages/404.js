// @flow

import React from 'react'
import {Link} from 'react-static'

const Page404 = () => (
  <div>
    <h1>NOT FOUND</h1>
    <p>This page doesn’t exist...</p>
    <p>
      <Link to="/">Go home</Link>
    </p>
  </div>
)

export default Page404
