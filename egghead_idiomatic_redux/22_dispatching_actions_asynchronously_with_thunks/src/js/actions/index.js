import { v4 } from 'node-uuid'
import * as api from '../api'


const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

// now fetchTodos no longer returns a promise, it return a function. I.E. it is
// a function that returns a function, this is known as a thunk
//
// fetchTodos now returns a function that accepts a dispatch callback argument
// now you can call dispatch as many times as you like during the async
// operation
export const fetchTodos = (filter) => (dispatch) => {
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
