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
