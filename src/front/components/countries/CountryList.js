import React from 'react'
import Country from './Country'

const CountryList = (props) => {
  if (props.countryList.length === 1) {
    return (
      <Country country={props.countryList[0]} weatherInfo={props.weatherInfo} />
    )
  } else if (props.countryList.length > 10) {
    return (
      <div>
        <p>Too many maches, specify another filter</p>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          {props.countryList.map((country) => {
            return (
              <li key={country.flag}>
                <span>{country.name.official}</span>
                <button
                  onClick={(e) => props.showCountry(e, country.name.official)}
                >
                  Show
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default CountryList
