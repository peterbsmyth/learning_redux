import { v4 } from 'node-uuid'
import * as api from '../api'

// the action creator function for requestTodos takes in a filter and returns an
// action for requesting todos
export const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter, response)
  )

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
