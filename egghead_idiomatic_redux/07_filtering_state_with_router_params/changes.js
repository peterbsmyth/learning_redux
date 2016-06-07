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
