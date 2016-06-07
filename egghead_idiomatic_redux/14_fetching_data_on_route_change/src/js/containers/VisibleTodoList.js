import React, { Component } from 'React'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
// we import getVisibleTodos from the reducers
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../api'

// because we cannot wrap the connect and withRouter container component
// directly, we abstract down a level to include the api. In doing so we
// hook into reacts componentDidMount and componentDidUpdate lifecycle methods
class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    )
  }
  //componentDidUpdate accepts the previous props as a parameter then, for this
  //component, we want to know if the filter has changed, if it does, fetch the
  //todos for the new filter
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      )
    }
  }

  render() {
    return <TodoList {...this.props} />
  }
}

// we pass the filter through as props so that the connect component can pass it
// down to our newly abstracted VisibleTodoList
const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(VisibleTodoList))

export default VisibleTodoList
