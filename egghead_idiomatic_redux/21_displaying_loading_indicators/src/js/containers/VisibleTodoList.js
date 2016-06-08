import React, { Component } from 'React'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// we take in all of our exported actions as action
import * as actions from '../actions'
import TodoList from '../components/TodoList'
// add getIsFetching to our imports from root reducer file
import { getVisibleTodos, getIsFetching } from '../reducers'

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData() {
    // we add request todos to the props
    const { filter, requestTodos, fetchTodos } = this.props
    // now when we trigger the requestTodos action, before fetchTodos the
    // boolean isFetching is updated, and then when fetchTodos returns a
    // response the isFetching will be updated again
    requestTodos(filter)
    fetchTodos(filter)
  }

  render() {
    // we update the destructuring of the props to include the isFetching
    // boolean
    const { toggleTodo, todos, isFetching } = this.props
    console.log(isFetching)
    // if we're fetching and there are no dos, render a loading component
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    return (
      <TodoList
        /*we no longer use the ...rest spread. I AM NOT SURE what rest was
        before but now we explicitly pass todos with the todos*/
        todos={todos}
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    // we add the isFetching prop to the container based on the state and the
    // filter that we are fetching (seperate fetches for all, completed, etc...)
    isFetching: getIsFetching(state, filter),
    filter
  }
}

// we add all of our actions to the component so they are available as props
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))

export default VisibleTodoList
