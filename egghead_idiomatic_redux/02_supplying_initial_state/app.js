// reducers are autonomous and each specifies their own initial state

// from our todo example the `todo` reducer has an initial state of an empty
// array, [  ]
// ** initial state is called when the state passed through to the function is
// undefined
const todos = (state = [], action) => {
  /* reducer logic in here */
}

// for the setVisibility reducer, the default state is a string "SHOW_ALL"
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  /* reducer logic in here */
}


// when you combine reducers you get an object that has the initial states of
// the individual reducers
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
  todos,
  visibilityFilter
})

// this becomes the initial state of the store
const store = createStore(rootReducer)

// so if you show the initial state of the store in the console, you would see
// that reflected there
console.log(store.getState())

// createStore lets you pass a persistedState to the store before the app starts
const persistedState = {
  todos: [{
    id: '0',
    text: 'welcome back!',
    completed: false,
  }],
}

const store = createStore(
  rootReducer,
  persistedState
)
