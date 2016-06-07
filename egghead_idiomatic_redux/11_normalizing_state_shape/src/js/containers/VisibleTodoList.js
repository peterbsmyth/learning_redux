import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
// we import getVisibleTodos from the reducers
import { getVisibleTodos } from '../reducers'

// we remove getVisibleTodos and put it in the reducers/todos.js file
// getVisibleTodos is a "selector" because it prepares the data to be displayed
// by the UI
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state,
    params.filter || 'all'
  )
})
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList))

export default VisibleTodoList
