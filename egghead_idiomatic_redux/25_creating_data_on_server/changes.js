// 06
// we add react router to components/root.js
// we modify the FilterLink heavily so that it uses the react-routers Link
// component
// we remove visibiltyFilter from actions/index because we dont need it anymore
// we also remove the custom <Link> component from component/link because we have the Link from
// react-router
//
// 07
// we reconfigure VisibleTodoList mapStateToProps with a second parameter,
// ownProps. Then on the App component, we include { params } which gets passed
// through from React Router, then on the VisibleTodoList component in the App
// componet we pass {params.filter || 'all'}. The params.filter is the value of
// the filter URL param, and the 'all' is so that the all filter runs, which
// happens when the root is '/'
//
// We finally can remove the VisibilityFilter Reducers from reducers/index.js
// and the corresponding file in the reducers/ folder
//
// 08
// previously we passed the URL params down from App into VisibleTodoList, and
// did nothing with them in App.It can be tedious to do this in larger apps, so
// theres must be a better way.
//
// we use withRouter in the VisibleTodoList delcaration and remove the
// unecessary code from App
//
// 09
// there is ANOTHER shorthand in redux, using mapDispatchToProps, see the
// VisibleTodoList for what it looks like
//
// 10
// we can remove the selector getVisibleTodos, which modifies the UI based on
// data, from the VisibleTodoList and put it in the todos file as a named export
// then in the reducers/index file we import that file, and export
// getVisibleTodos from there, finally we reimport the file back into
// VisibleTodoList. What all of this reconfiguring does is allows for the
// selector to be updated in a single place (the reducer its being called from )
// and then it can be updated everywhere in the app
//
// 11
// in this video we seperate the todo reducer into a new file from todos reducer
// the todo reducer is used in the new `byId` reducer, whose state shape is
// an object. It reads the id of the todo to update from the action. And it
// calls the todo reducer with the previous state of the id and the action.
// the part where the reducer uses [action.id] is called computed property
// syntax. which lets us specify a value at a dynamic key
//
// we also added allIds that manages the array of ids of the todos. every time a
// todo is added it returns a new array with the current state + the new id at
// the end. it uses the array spread operator in ES6
//
// we updated the getVisibleTodos selector since the state shape changed from []
// to {}
//
// 12
// we wrap the dispatch function with some loggin in configureStore, check it
// out. The tricky bit is in returning the wrapped function
//
// 13
// we create a fake backend by creating a delay function and returning a
// promise, we remove the persisted state stuff from before and instead now mock
// an api.
//
// 14
// we abstract VisibleTodoList further to include the api, see the changes in
// containers/VisibleTodoList
// we do this so that the URL params can be used to modify the UI and update the
// state too
//
// 15
// in the previous video we were not updating the state quite yet, we were
// console logging the fetched data when the component rendered and updated,
// this video we dispatch the actions
//
// we made some important modification to the way VisibleTodoList operates, such
// as passing all of the actions as the second argument of the connect function,
// i.e. mapDispatchToProps.
//
// 16
// in this video we add promise support to the dispatch. what this means is we
// can now use asynchronous action creators. an asynchronous action creator in
// this example fetches data from our mock-api after a 500ms delay, at that
// point it returns data. We add the promise support by wrapping the dispatch
// function.
//
// 17
// the logging functionality and the promise functionality we made are
// middlewares to the dispatch function, in this video we formalize that
// by creating a function called wrapDispatchWithMiddleware
//
// This is a very dense video and complicated at that, so here is a link for
// review:
// https://egghead.io/lessons/javascript-redux-the-middleware-chain#/tab-transcript
//
// 18
// we can get rid of a lot of custom middleware related stuff and replace it
// with redux's middleware, see the relevant configureStore file for more
//
// 19
// currently allTodos are in memory at the same time. What if we had thousands
// of todos on the server? we'd fetch them all and filter them on the client.
// Instead we'll keep a list of ids for each of the tabs, all, active, and
// completed. We won't filter on the client anymore, the serve will return the
// filtered list.
//
// we have three reducers now, allIds, activeIds, and completedIds
// then we update the byId reducer to handle the new todos from the response.
// the byId reducer has one case now, 'RECEIVE_TODOS' to calculate the next
// state
//
// we have a delay now the first time we switch filteres in the UI but after
// that we can use cached versions first, and then update
//
// this is another dense videos, which leads us to another link for review:
// https://egghead.io/lessons/javascript-redux-updating-the-state-with-the-fetched-data
//
// 20
// we make todos.js our new rootReducer then pull out the byId reducer into a
// new file. We make a new function that takes a filter as an argument that
// makes a reducer given a filter, which lets us condense allIds activeIds and
// completedIds. Then we pass the createList function to the filterByIds
// combineReducers function, see the reducers for details.
//
// we rename idsByFilter to listByFilter.
//
// 21
//
// here we change the program to add loading when there are no todos, and we're
// waiting for data to come from the server.
//
// we add a isFetching to the render function of VisibleTodoList
// isFetching boolean becomes a prop on VisibleTodoList
//
// we add a selector called getIsFetching to the index reducer that delegates to
// getIsFetching from the createList reducer
//
// another piece of the puzzle is to create a new action called 'REQUEST_TODOS'
// which is dispatched when a todo is requested, then "RECEIVE_TODOS" is
// dispatched on response
//
// 22
// in this video we learn that thunks are functions that return functions and
// they are useful for calling dispatch multiple times in async action
// operations
// it allows you to, in a single async action call RECEIVE_TODOS and
// RECEIVE_TODOS, making for tidy code
//
// 23
// in this video we use redux-thunk to avoid redux function, the thunk gives us
// access to getState, so in our async action creator we can see if the state of
// the action is currently fetching, if it is, it wont fetch. Makes sense. If
// its not fetching, it returns an immediately resolved promise so you can use
// .then() allowing you to respond accordingly
//
// 24
// in this video we add error handling, its a bit like getIsFetching, we make
// getIsMessage. Then we also make a HandleError component which shows when
// there is an error. We modify the fake api to throw half the time, and we
// rewrite our actions to be more uniform. Check out the reducers files and
// VisibleTodoList to see whats going on
//
// 25
// in this video we update the addTodo action, giving it the action name
// ADD_TODO_SUCCESS, see the actions/index.js for more. we turn it into a thunk
// like the others. In this case we dont take advantage of it being a thunk,
// though we could in the future add a ADD_TODO_FAILURE action, we change the
// fake api to make these changes happen

