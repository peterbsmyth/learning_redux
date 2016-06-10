// here is the new implementation, using react-router
import React from 'react'
import { Link } from 'react-router'

// it accepts filter as a prop
//
// the to prop on the <Link> component corresponds to the path we want the link
// to point to. If the filter is all, we use the root path. Otherwise we use the
// specified filter as the route
//
// activeStyle styles the link differently when the to prop matches the current
// prop
//
// we add children within the link and pass children as a prop to FilterLink so
// that the parent component can specify the children
const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === 'all' ? '' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </Link>
)

export default FilterLink
