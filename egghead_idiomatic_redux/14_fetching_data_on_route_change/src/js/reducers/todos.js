import { combineReducers } from 'redux'
import todo from './todo'

// we change state to default to a {} instead of a [] to be more like the real
// world. We change todos to byId
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      }
    default:
      return state
  }
}

const allIds = (state=[], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id]
    default:
      return state
  }
}

// we combine reducers
const todos = combineReducers({
  byId,
  allIds
})

export default todos

// maps the ids to the lookup table and returns an array, this array is the same
// shape as the previous state array used in getVisibleTodos below, so nothing
// needs to change except to include this function in that getVisibleTodos
// function
const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id])

export const getVisibleTodos = (state, filter) => {
  // allTodos is all of the todos
  const allTodos = getAllTodos(state)
  switch (filter) {
    case 'all':
      return allTodos
    case 'completed':
      return allTodos.filter(t => t.completed)
    case 'active':
      return allTodos.filter(t => !t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}
