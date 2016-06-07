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

// now ownProps has params on it and we can call ownProps.params to get the URL
// params filter value. We use 'all' again for the '/' route
//
// we also use ES6 destruction syntax to get params from ownProps
// const mapStateToProps = (state, ownProps) => ({
//   todos: getVisibleTodos(
//     state.todos,
//     params.filter || 'all'
//   )
// })
const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    todos: getVisibleTodos(
      state.todos,
      ownProps.params.filter || 'all'
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

// we wrap the connect function with withRouter
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList))

export default VisibleTodoList
