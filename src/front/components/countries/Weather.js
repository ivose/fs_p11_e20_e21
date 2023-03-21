import React from 'react'

const Weather = (props) => {
  if (Object.keys(props.weatherInfo).length === 0) return <div></div>
  return (
    <div>
      <h2 className="greenItalic">Weather in {props.weatherInfo.name}</h2>
      <p>
        Temperature {(props.weatherInfo.main.temp - 273.15).toFixed(1)} celsius
      </p>
      <p>{((((props || {}).weatherInfo || {}).weather || [])[0] || {}).description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${((((props || {}).weatherInfo || {}).weather || [{}])[0] || {}).icon}@2x.png`}
        alt="Weather"
      />
      <p>Wind speed {props.weatherInfo.wind.speed.toFixed(0)} m/s</p>
    </div>
  )
}

export default Weather
