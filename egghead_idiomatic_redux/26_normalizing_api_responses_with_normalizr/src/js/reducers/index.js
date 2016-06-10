import { combineReducers } from 'redux'
import byId, * as fromById from './byId'
import createList, * as fromList from './createList'

// now that createList is in a separate file its state structure is opaque, so
// now to get the IDs, we use the getIds selector it exports
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

// we combine reducers
const todos = combineReducers({
  byId,
  listByFilter
})

export default todos

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter])
  return ids.map(id => fromById.getTodo(state.byId, id))
}

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter])

// follows the same patterns as getIsFetching
export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter])
