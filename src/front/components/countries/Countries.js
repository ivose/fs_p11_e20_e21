import React from 'react'
import SearchCountry from './SearchCountry'
import CountryList from './CountryList'

const Countries = (props) => {
  return (
    <div>
      <h1 className="greenItalic">Countries</h1>
      <SearchCountry
        countrySearchSubmit={props.countrySearchSubmit}
        countrySearch={props.countrySearch}
        handleCountrySearch={props.handleCountrySearch}
        handleFullText={props.handleFullText}
        countryFullText={props.countryFullText}
        clearSearch={props.clearSearch}
      />
      <CountryList
        countryList={props.countryList}
        weatherInfo={props.weatherInfo}
        showCountry={props.showCountry}
      />
    </div>
  )
}

export default Countries
