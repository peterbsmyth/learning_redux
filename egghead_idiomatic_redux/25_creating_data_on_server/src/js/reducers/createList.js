import { combineReducers } from 'redux'

const createList = (filter) => {
  const ids = (state = [], action) => {
    // we remove the top level if state that returns state when the filter
    // doesnt match the action's filter and replace it with case by case
    // handlers this is because the added todo does not have a filter
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ?
          action.response.map(todo => todo.id) :
          state
      // we add the case for ADD_TODO_SUCCESS, where the array now contains all
      // the previous ids, plus the new one for this response
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ?
          [...state, action.response.id] :
          state
      default:
        return state
    }
  }

  const isFetching = (state = false , action) => {
    if (action.filter !== filter) {
      return state
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILIRE':
        return false
      default:
        return state
    }

  }

  const errorMessage = (state=null, action) => {
    if (filter !== action.filter) {
      return state
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILIRE':
        return action.message
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_REQUEST':
        return null
      default:
        return state
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  })
}

export default createList

export const getIds = (state) => state.ids
export const getIsFetching = (state) => state.isFetching
export const getErrorMessage = (state) => state.errorMessage
