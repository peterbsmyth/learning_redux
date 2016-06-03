const expect = require('expect');
const deepFreeze = require('deep-freeze');

const toggleTodo = (todo) => {
  /*
* NO GOOD because it MUTATES
* todo.completed = !todo.completed;
* return todo;
*/
  // Below is new ES6 Object.assign
  // First is {}, the empty object to mutate
  // Second and third are objects to copy to first object
  // The objects who have overlapping properties have the
  // final object winning
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
}

testToggleTodo();
console.log('all tests pass');

