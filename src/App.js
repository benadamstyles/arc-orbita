import React from 'react'
import {Router} from 'react-static'
import {hot} from 'react-hot-loader'
// eslint-disable-next-line import/no-unresolved
import Routes from 'react-static-routes'

const App = () => (
  <Router>
    <Routes />
  </Router>
)

export default hot(module)(App)
