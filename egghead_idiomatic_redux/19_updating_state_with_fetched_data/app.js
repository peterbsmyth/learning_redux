// npm install --save react-router
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'
import App from './App'

//the history in react router defaults to hashhistory which makes it compatible
//with IE9.
// we wrap the App component in the route component, which is wrapped in the
// router component
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

// if you dont need to target IE9, use browserHistory
imprt { Router, Route, browserHistory } from 'react-router'
