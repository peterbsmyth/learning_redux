import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

// react router makes the "params" prop available to the route handler component
// on the <Route> </Route> component
//
// since its empty on the root path, we default to filter 'all'
const App = ({ params }) => (
  <div>
    <AddTodo />
    <VisibleTodoList
      filter={params.filter || 'all'}
    />
    <Footer />
  </div>
)

export default App
