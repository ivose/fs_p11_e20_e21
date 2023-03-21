require('dotenv').config({ path: require('find-config')('.env') })
const express = require('express')
//const morgan = require('morgan')
const cors = require('cors')
const { response } = require('express')
const dbconnect = require('./models/dbconnect')
const { WEATHER_API_KEY } = require('./config')
const mongoose = dbconnect.getMongoose()
const Note = dbconnect.getModel(mongoose, 'Note')
const Person = dbconnect.getModel(mongoose, 'Person')
const { version } = require('../../package.json')

const courses = [
  {
    'name': 'Half Stack application development',
    'id': 1,
    'parts': [
      {
        'name': 'Fundamentals of React',
        'exercises': 10,
        'id': 1
      },
      {
        'name': 'Using props to pass data',
        'exercises': 7,
        'id': 2
      },
      {
        'name': 'State of a component',
        'exercises': 14,
        'id': 3
      },
      {
        'name': 'Redux',
        'exercises': 11,
        'id': 4
      }
    ]
  },
  {
    'name': 'Node.js',
    'id': 2,
    'parts': [
      {
        'name': 'Routing',
        'exercises': 3,
        'id': 1
      },
      {
        'name': 'Middlewares',
        'exercises': 7,
        'id': 2
      }
    ]
  }
]

const useApp = (app) => {

  app.use(cors())

  /*const requestLogger = (request, response, next) => {
    // eslint-disable-next-line
    console.log('Method:', request.method)
    // eslint-disable-next-line
    console.log('Path:  ', request.path)
    // eslint-disable-next-line
    console.log('Body:  ', request.body)
    // eslint-disable-next-line
    console.log('---')
    next()
  }
  app.use(requestLogger)
  */
  //app.use(morgan('tiny')) //task 3.7
  /*app.use(morgan(function (tokens, req, res) { //task 3.8
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))*/
  app.use(express.json())

  /////Weather
  app.get('/api/courses', (req, res) => {
    res.json(courses)
  })

  app.get('/api/weather', (request, response) => {
    //WEATHER_API_KEY

    let capital = ((request || {}).query || {}).capital
    if (!capital) response.status(404).send({ error: 'No parameter \'capital\' given.' })
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${WEATHER_API_KEY}`
    require('axios').get(url).catch(() => {
      response.status(500).send({ error: 'Couldn\'t got weather data' })
    }).then((resp) => {
      response.json(resp.data)
    })
  })


  ////////Notes
  //create
  app.post('/api/notes', (request, response, next) => {
    //v3:
    const body = request.body

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })

    note.save()
      .then(savedNote => {
        response.json(savedNote)
      })
      .catch(error => next(error))
  })

  //read
  app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
      if (!note) response.status(404).send({ error: 'Item doesn\'t exist' })
      else response.json(note)
    }).catch(error => next(error))
  })

  //update
  app.put('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
      if (!note) response.status(404).send({ error: 'Item doesn\'t exist' })
      else {
        const { content, important } = request.body
        Note.findByIdAndUpdate(
          request.params.id,
          { content, important },
          { new: true, runValidators: true, context: 'query' }
        ).then(updatedNote => { response.json(updatedNote) })
          .catch(error => next(error))
      }
    }).catch(error => next(error))

  })

  //delete
  app.delete('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
      if (!note) response.status(404).send({ error: 'Item doesn\'t exist' })
      else Note.findByIdAndRemove(request.params.id)
        .then((result) => {
          response.status(204).send(result)
        }).catch(error => next(error))
    }).catch(error => next(error))

  })

  app.get('/api/notes', async (request, response) => {
    response.json(await Note.find({}))
  })

  //////show info
  app.get('/info', (req, res) => {
    Person.countDocuments({}, function (err, count) {
      if (err) {
        return response.status(400).json({ error: 'No data found' })
      } else {
        res.send(`<p>Phonebook has info for ${count}</p><p>${(new Date()).toString()}</p>`)
      }
    })
  })



  ////////Persons

  //create
  app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))

  })

  //read
  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (!person) response.status(404).send({ error: 'Item doesn\'t exist' })
      else response.json(person)
    }).catch(error => next(error))
  })

  //update
  app.put('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (!person) response.status(404).send({ error: 'Item doesn\'t exist' })
      else {
        const { name, number } = request.body
        Person.findByIdAndUpdate(
          request.params.id,
          { name, number },
          { new: true, runValidators: true, context: 'query' }
        ).then(updatedPerson => { response.json(updatedPerson) })
          .catch(error => next(error))
      }
    }).catch(error => next(error))

  })

  //delete
  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (!person) response.status(404).send({ error: 'Item doesn\'t exist' })
      else {
        Person.findByIdAndRemove(request.params.id)
          .then(() => response.status(204).end())
          .catch(error => next(error))
      }
    }).catch(error => next(error))
  })

  //show all
  app.get('/api/persons', (_, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })


  app.get('/version', (req, res) => {
    res.send(version)
  })


  app.get('/health', (req, res) => {
    res.send('ok')
  })

  app.get('/mytest', (req, res) => {
    res.send('abc.......')
  })


  /////Common

  app.use(express.static('build'))

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    // eslint-disable-next-line
    //console.log(`${error.name} ==== ${error.kind} === ${error.message}`)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }
  app.use(errorHandler)
}

module.exports = { useApp }

