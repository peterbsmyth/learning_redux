import { v4 } from 'node-uuid'
import * as api from '../api'
import { getIsFetching } from '../reducers'

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }
  // we move the REQUEST_TODOs into the dispatch directly and then rename it,
  // and those below for clarity and uniformity
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  })

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response
      })
    },
    // we add an error handler, which has a dispatch funciton of its own.
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILIRE',
        filter,
        message: error.message || 'Something went wrong.'
      })
    })
}


export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: v4(),
    text
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
