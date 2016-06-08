import { combineReducers } from 'redux'

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state
    }
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return action.response.map(todo => todo.id)
      default:
        return state
    }
  }

  // isFetching simply involves two cases, its fetching if REQUEST_TODOS its not
  // fetching if RECEIVE_TODOS
  const isFetching = (state = false , action) => {
    // we only update the isFetching boolean when the action has the right
    // filter, regardless of its action
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

  // here goes the error message reducer
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
