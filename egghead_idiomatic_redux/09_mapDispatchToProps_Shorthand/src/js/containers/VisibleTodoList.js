import { connect } from 'react-redux'
// we import withRouter
import { withRouter } from 'react-router'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(t => t.completed)
    case 'active':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state, { params }) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      params.filter || 'all'
    )
  }
}

// we can shorthand mapDispatchToProps when the params to the callback function
// are the same as the ones passed to the action creator inside the action
// creator in this case, id
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

// the shorthand is to pass an object with the key as the callback functions
// name and the action creators name as the value
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList))

export default VisibleTodoList
