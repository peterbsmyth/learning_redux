import { combineReducers } from 'redux'

// we change state to default to a {} instead of a [] to be more like the real
// world. We change todos to byId
const byId = (state = {}, action) => {
  switch (action.type) {
    // remove existing cases because they aren't handled locally anymore
    case 'RECEIVE_TODOS':
      // shallow copy of the state object which corresponds to the lookup table
      const nextState = { ...state }
      // for each todo in the response, make the nextState (which is a copy of
    // the state) include the todo
      action.response.forEach(todo => {
        nextState[todo.id] = todo
      })
      return nextState
    default:
      return state
  }
}

const allIds = (state=[], action) => {
  if (action.filter !== 'all') {
    return state
  }
  switch (action.type) {
    // we only care about actions with the all filter
    // we remove ADD_TODO action handler for now, because for now we only want
    // it to respond to receive todos
    case 'RECEIVE_TODOS':
      // when we get a response with todos, for each todo, return its id
      return action.response.map(todo => todo.id)
    default:
      return state
  }
}

const activeIds = (state = [], action) => {
  if (action.filter !== 'active') {
    return state
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id)
    default:
      return state
  }
}

const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id)
    default:
      return state
  }
}

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds
})

// we combine reducers
const todos = combineReducers({
  byId,
  idsByFilter
})

export default todos

export const getVisibleTodos = (state, filter) => {
  // first we now lookup visible todos based on the filter passed to the
  // idsByFilter key on the state. This is an array of ids
  const ids = state.idsByFilter[filter];
  // then we make an array based on those ids where each element is the actual
  // todo stored in the byId key on the state
  return ids.map(id => state.byId[id])
}
