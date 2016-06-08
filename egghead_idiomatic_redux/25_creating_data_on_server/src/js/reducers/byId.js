const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      const nextState = { ...state }
      action.response.forEach(todo => {
        nextState[todo.id] = todo
      })
      return nextState
    // we add the ADD_TODO_SUCCESS case to the byId reducer and return a new
    // object with state, spread. As well, we add a key with the action
    // response id, and give it the value of action response
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response
      }
    default:
      return state
  }
}

export default byId

export const getTodo = (state, id) => state[id]
