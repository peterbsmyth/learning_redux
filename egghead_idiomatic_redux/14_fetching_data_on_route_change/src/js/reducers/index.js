import { combineReducers } from 'redux'
// because getVisibleTodos is a function below, we import the getVisibleTodos
// from the todos reducer as fromTodos, see below
import todos, * as fromTodos from './todos'

const rootReducer = combineReducers({
  todos,
})

export default rootReducer

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter)
