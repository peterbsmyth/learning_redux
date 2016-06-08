import React, { Component } from 'React'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers'
// import the FetchError component
import FetchError from '../components/FetchError'

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
    const { filter, fetchTodos } = this.props
    fetchTodos(filter)
  }

  render() {
    // the error comes in from errorMessage
    const { toggleTodo, errorMessage, todos, isFetching } = this.props

    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    // if theres an error, and no todos...
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }

    return (
      <TodoList
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
    // here is where errorMessage gets on props
    // the getErrorMessage selector comes from the index reducer
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))

export default VisibleTodoList
