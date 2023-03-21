import React from 'react'
import Weather from './Weather'

const Country = (props) => {
  return (
    <div>
      <h2 className="greenItalic">{props.country.name.official}</h2>
      <ul>
        <li>
          Capital: <b>{props.country.capital.join(', ')}</b>
        </li>
        <li>
          Area: <b>{props.country.area}</b>
        </li>
      </ul>
      <h2 className="greenItalic">Languages</h2>
      <ul>
        {Object.keys(props.country.languages).map((key) => (
          <li key={key}>{props.country.languages[key]}</li>
        ))}
      </ul>
      <img
        src={props.country.flags.svg}
        alt="Flag"
        style={{ width: '150px', border: 'solid black 1px' }}
      />
      <Weather weatherInfo={props.weatherInfo} />
    </div>
  )
}

export default Country
