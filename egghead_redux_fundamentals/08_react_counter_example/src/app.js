import { createStore } from 'redux';

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

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

// Create a render function
const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('root')
  );
};

// then have store subscribe to render function
store.subscribe(render);
// call render once to initialize
render();
