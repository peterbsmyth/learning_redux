// below are generic load and save state funcionts that would ordinarily be
// imported from their own separate files
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const saveState = (state) => {
  try {
    const  serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore write erros
  }
}

// we load the persistedState
const persistedState = loadState()

// create the store
const store = createStore(
  rootReducer,
  persistedState
)

// use the store subscribe method to save the state every time the store (and
// therefore state) changes. subscribe adds an event listener
store.subscribe(() => {
  saveState(store.getState())
})

// above would store the entire state, including the state of the UI. Usually we
// only want to persist data, and not UI state. Makes sense.
// so we store an object with the todos key with the state of todos
store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  })
})

// to prevent the write to store occuring too many times, too quickly, and
// slowing down our app we can use a handy utility from ladash called throttle
// to write only once per 1000 milliseconds, maximum
import throttle from 'lodash/throttle'
store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  })
}, 1000))
