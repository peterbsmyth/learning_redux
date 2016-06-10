import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

// we removed the params props and the corresponding filter
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList/>
    <Footer />
  </div>
)

export default App
