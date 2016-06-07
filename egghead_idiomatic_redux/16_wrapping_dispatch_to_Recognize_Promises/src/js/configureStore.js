import { createStore } from 'redux'
import rootReducer from './reducers'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch
  if (!console.group) {
    return rawDispatch
  }
  return (action) => {
    console.group(action.type)
    console.log('%c prev state', 'color: gray', store.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

// we add promise support to dispatch because by default it only handles
// objects, but in the same way we wrapped dispatch to do logging, we can wrap
// dispatch to do promise
const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch
  return (action) => {
    // if the action has the then method (if its an async action) return the
    // resolved poromise as a result of the raw dispatch
    if( typeof action.then === 'function' ) {
      return action.then(rawDispatch)
    }
    // otherwise return the action right away by calling raw dispatch
    return rawDispatch(action)
  }
}
const configureStore = () => {

  const store = createStore(
    rootReducer
  )

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }
  // this comes after addLoggingToDispatch so that the promise is resolved
  // before we log
  store.dispatch = addPromiseSupportToDispatch(store)

  return store
}

export default configureStore
