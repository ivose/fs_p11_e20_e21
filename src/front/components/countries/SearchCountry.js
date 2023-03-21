import React from 'react'

const SearchCountry = (props) => {
  return (
    <div>
      <form onSubmit={props.countrySearchSubmit}>
        <input
          value={props.countrySearch}
          onChange={props.handleCountrySearch}
        />
        <button>Search..</button>
        <button onClick={props.clearSearch}>Clear</button>
        <button onClick={props.handleFullText} title="Full text">
          [{props.countryFullText ? 'X' : '_'}]
        </button>
      </form>
    </div>
  )
}
export default SearchCountry
