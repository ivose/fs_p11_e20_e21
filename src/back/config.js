require('dotenv').config({ path: require('find-config')('.env') })

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  argv: process.argv,
  exit: process.exit
}