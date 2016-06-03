import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';
import { Component } from 'react';

// This code is demonstrating how to use React with Redux
// to create a toggle todo function/component
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
        if (state.id !== action.id) {
          return state;
        }

        return Object.assign({},state,{completed: !state.completed});
    default:
      return state;
  }
};
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// This code is identical to the commented code below it, except for it uses
// new ES6 Obeject literal shorthand
const todoApp = combineReducers({
  todos,
  visibilityFilter
});


const store = createStore(todoApp);

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    // this.props has the todos key
    return (
        // ref is a react callback api to get the DOM node corresponding
        // to the ref and then below we save it to this.input
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          // state change is caused by store.dispatch, in this case its called
          // when button is clicked
          store.dispatch({
            type: 'ADD_TODO',
            // we can set the text to this.input.value thanks to the ref above
            text: this.input.value,
            id: nextTodoId++
          });
          // initialize the input value
          this.input.value = '';
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            // every todo needs its own id/key
            // click on the li to dispatch TOGGLE_TODO
            <li key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id
                });
              }}
              style={{
                textDecoration:
                  todo.completed ?
                  'line-through' :
                  'none'
              }}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      // Get the todos from the state from the store
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
};

// the render function runs anytime the store state changes
store.subscribe(render);
// the render function also ones once initially
render();
