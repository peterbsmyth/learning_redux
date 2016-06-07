import { v4 } from 'node-uuid'
import * as api from '../api'

// receiveTodos becomes private
const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

// our first asynchronous action creator
// we use fetchTodos to take in a filter, call the api fetchTodos method with
// that filter to return a promise that resolves to the action receiveTodos.
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
