const createStore = require('redux').createStore;

// uses ES6 Arrow Function as well as const as well as ES6 default argument
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state +1;
    case 'DECREMENT':
      return state -1;
    default:
      return state;
  }
}

const store = createStore(counter);

// get the state
console.log(store.getState());

// dispatch
store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());

// Create a render function
const render = () => {
  document.body.innerText = store.getState();
}

// then have store subscribe to render function
store.subscribe(render);
// call render once to initialize
render();
/*
 * Below is as above, but less sophisticated
 */
/*
store.subscribe(() => {
  document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
*/
