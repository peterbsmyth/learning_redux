import { createStore } from 'redux'
import rootReducer from './reducers'

// we rename addLoggingToDispatch to just logger since it is now a proper
// middleware
const logger = (store) => {
  // this gets tricky, to make next a part of the middleware contract, we can
  // pass it as an outside argument

  // middleware, here logger, returns a function that returns a function that
  // returns a function (store) => (next) > (action)
  return (next) => {
    if (!console.group) {
      return rawDispatch
    }
    return (action) => {
      console.group(action.type)
      console.log('%c prev state', 'color: gray', store.getState())
      console.log('%c action', 'color: blue', action)
      const returnValue = next(action)
      console.log('%c next state', 'color: green', store.getState())
      console.groupEnd(action.type)
      return returnValue
    }
  }
}

// like logger, promise is now a proper middleware
const promise = (store) => {
  // rawDispatch gets changed to next, because it refers to the next dispatch in
  // the chain, not necessarily the "raw" dispatch, in the case of the first
  // middleware in a chain it genuinely is the "raw" dispatch, but only then
  return (next) => {
    return (action) => {
      if( typeof action.then === 'function' ) {
        return action.then(next)
      }
      return next(action)
    }
  }
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  // the reversing we do allows us to specify the middleware in the order in
  // which the action propogates through the midlewares instead of the order in
  // which the dispatch function is overwritten
  middlewares.slice().reverse().forEach(middleware =>
    // a middleware function takes in a store, and also a "next" as injected
    // arguments like...
    // middleware(store)(next)
    // the "next" is the previous value of a store dispatch function
    store.dispatch = middleware(store)(store.dispatch)
  )
}

const configureStore = () => {
  const store = createStore(
    rootReducer
  )

  // we create an array of middlewares for our wrapDispatchWithMiddlewares
  // function to iterate over, to pass the dispatch through each, changing it
  // somehow each time.
  const middlewares = [promise]

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }

  wrapDispatchWithMiddlewares(store, middlewares)

  return store
}

export default configureStore
