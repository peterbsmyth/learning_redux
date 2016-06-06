// uses a block as the body of the arrow function
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: (nextTodoId++).toString(),
    text
  }
}

// uses an object expression instead of a block
// paranthesis are important so the parser knows it is not a block
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: (nextTodoId++).toString(),
  text
})


const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisbilityFilter(ownProps.filter))
  }
})


// below replaces the arrow function with concise method notation which is
// available when a function is declared inside of an object.
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisbilityFilter(ownProps.filter))
  }
})


// If we were returning some other value than an object from an arrow function
// like some string, it would look like
const fooString = () => "STRING"
