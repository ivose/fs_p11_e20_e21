const express = require('express')
const app = express()

const { useApp } = require('./src/back/index')

// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))

useApp(app)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server started on port ' + PORT)
})

