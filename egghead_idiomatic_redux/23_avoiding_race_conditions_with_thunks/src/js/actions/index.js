import { v4 } from 'node-uuid'
import * as api from '../api'
import { getIsFetching } from '../reducers'

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

// we have access to getState via the thunk middleware, its the second argument
// after dispatch
export const fetchTodos = (filter) => (dispatch, getState) => {
  // if we're already fetching for a particular filter, do nothing
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }
  dispatch(requestTodos(filter))

  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response))
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
