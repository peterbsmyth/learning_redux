const createStore = (reducer) => {
  /* this is the redux store, except for a few edge cases */
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    // instead of unsubscribe, return the function below
    return () => {
      listeners = listeners.filter(l => l !== listener)
    };
  }

  dispatch({});

  return {getState, dispatch, subscribe};
}
