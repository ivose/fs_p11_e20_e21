import React from 'react'

const Search = (props) => {
  return (
    <form onSubmit={props.handleSearchSubmit}>
      <input value={props.search} onChange={props.handleSearchChange} placeholder="Search.." />
      <button>Search</button>
    </form>
  )
}

export default Search
