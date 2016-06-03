### Whats the point of this tutorial?

The content in this tutorial is the same as the final product of the 30 videos
shown on egghead.io in the redux fundamentals course, it differs though in that
shows a separation of files, suggesting a beginning file structure for 
redux/react apps

```
index.js

actions/
actions/index.js

components/
components/App.js
components/Footer.js
components/Link.js
components/Todo.js
components/TodoList.js

containers/
containers/FilterLink.js
containers/VisibleTodoList.js

containers/AddTodo.js

reducers/
reducers/index.js
reducers/todos.js
reducers/visibilityFilter.js
```
