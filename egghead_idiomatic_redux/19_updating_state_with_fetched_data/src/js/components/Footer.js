import React from 'react'
import FilterLink from '../containers/FilterLink'

// we change the filter props to be in-line with what we want displayed in the
// url
const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="all">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="active">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="completed">
      Completed
    </FilterLink>
  </p>
)

export default Footer
