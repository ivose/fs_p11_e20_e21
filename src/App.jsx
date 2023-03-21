import React, { useState, useEffect } from 'react'
import Book from './front/components/phonebook/Book'
import Notes from './front/components/notes/Notes'
import Countries from './front/components/countries/Countries'
import noteService from './front/services/notes'
import personService from './front/services/persons'
import courseService from './front/services/courses'
import countriesAndWearther from './front/services/countriesAndWearther'
import Footer from './front/components/varia/Footer'
import Courses from './front/components/kurssitiedot/Courses'

const App = () => {
  //notes
  const [notes, setNotes] = useState([])
  const [courses, setCourses] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notesAlertMsg, setNotesAlertMsg] = useState('')
  const [notesAlertClass, setNotesAlertClass] = useState('')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [search1, setSearch1] = useState('')
  const [personAlertMsg, setPersonAlertMsg] = useState('')
  const [personAlertClass, setPersonAlertClass] = useState('')
  const [countryList, setCountryList] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const [countryFullText, setCountryFullText] = useState(false)
  const [weatherInfo, setWeatherInfo] = useState({})


  useEffect(async () => {
    setNotes(await noteService.getAll())
    setPersons(await personService.getAll())
    setCourses(await courseService.getAll())
  }, [])

  const toggleImportance = (event, id) => {
    event.preventDefault()
    // eslint-disable-next-line
    //console.log('toggle important: ' + id)
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then((respdata) => {
        setNotes(notes.map((note) => (note.id !== id ? note : respdata)))
      })
      .catch((error) => {
        setNotesAlertClass('error')
        setNotesAlertMsg(`Server error: ${error.response.data.error}`)
        setTimeout(() => {
          setNotesAlertMsg(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      //id: maxIdp1(notes.map((note) => note.id)),
    }

    noteService
      .create(noteObject)
      .then((respdata) => {
        setNotes(notes.concat(respdata))
        setNotesAlertClass('success')
        setNotesAlertMsg('New note added!')
        setTimeout(() => {
          setNotesAlertMsg(null)
        }, 5000)
        setNewNote('')
      })
      .catch((error) => {
        setNotesAlertClass('error')
        setNotesAlertMsg(`Server error: ${(((error || {}).response || {}).data || {}).error}`)
        setTimeout(() => {
          setNotesAlertMsg(null)
        }, 5000)
      })
  }
  const deleteNote = (event, id, content) => {
    if (window.confirm(`Delete ${content}?`)) {
      noteService
        .remove(id)
        .then(() => {
          setNotes(notes.filter((note) => note.id !== id))
          setNotesAlertClass('success')
          setNotesAlertMsg('Note is deleted!')
          setTimeout(() => {
            setNotesAlertMsg(null)
          }, 5000)
          setNewNote('')
        })
        .catch((error) => {
          setNotesAlertClass('error')
          // eslint-disable-next-line
          setNotesAlertMsg(`Server error: ${error.response.data.error}`)
          setTimeout(() => {
            setNotesAlertMsg(null)
          }, 5000)
          setNotes(notes.filter((n) => n.id !== id))
        })
    }
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleShowAll = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearch1(search)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName.length === 0) {
      alert('Write the name')
      return
    }
    if (newNumber.length === 0) {
      alert('Write the number')
      return
    }
    const specificPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (specificPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = specificPerson.id
        const changedPerson = { ...specificPerson, number: newNumber }
        personService
          .update(id, changedPerson)
          .then((respdata) => {
            setPersonAlertClass('success')
            // eslint-disable-next-line
            setPersonAlertMsg(`Phone number updated: ${respdata.name} has new number ${respdata.number}.`)
            setTimeout(() => {
              setPersonAlertMsg(null)
            }, 5000)
            setPersons(persons.map((person) => (person.id !== id ? person : respdata)))
          })
          .catch((error) => {
            setPersonAlertClass('error')
            // eslint-disable-next-line
            setPersonAlertMsg(`Server error: ${error.response.data.error}`)
            setTimeout(() => {
              setPersonAlertMsg(null)
            }, 5000)
            setPersons(persons.filter((n) => n.id !== id))
          })
      }
      return
    }
    const personObject = {
      //id: maxIdp1(persons.map((person) => person.id)),
      name: newName,
      number: newNumber,
    }
    personService
      .create(personObject)
      .then((respdata) => {
        setPersons([...persons, respdata])
        setNewName('')
        setNewNumber('')
        setPersonAlertClass('success')
        setPersonAlertMsg('New person added!')
        setTimeout(() => setPersonAlertMsg(null), 5000)
      })
      .catch((error) => {
        setPersonAlertClass('error')
        // eslint-disable-next-line
        setPersonAlertMsg(`Server error: ${error.response.data.error}`)
        setTimeout(() => setPersonAlertMsg(null), 5000)
      })
  }
  const delPerson = (event, id, name) => {
    event.preventDefault()
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((note) => note.id !== id))
          setPersonAlertClass('success')
          setPersonAlertMsg('Person is deleted!')
          setTimeout(() => {
            setPersonAlertMsg(null)
          }, 5000)
          setNewNote('')
        })
        .catch((error) => {
          setPersonAlertClass('error')
          // eslint-disable-next-line
          setPersonAlertMsg(`Server error: ${error.response.data.error}`)
          setTimeout(() => {
            setPersonAlertMsg(null)
          }, 5000)
          setPersons(persons.filter((n) => n.id !== id))
        })
    }
  }
  const searchResults = persons.filter((person) =>
    person.name.toLowerCase().includes(search1)
  )

  const handleCountrySearch = (event) => {
    event.preventDefault()
    setCountrySearch(event.target.value)
  }

  const handleFullText = (event) => {
    event.preventDefault()
    setCountryFullText(!countryFullText)
  }

  const weatherApiQuery = (capital) => {
    if (!capital) setWeatherInfo({})
    else {
      //const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
      countriesAndWearther.weatherData(capital)
        //axios
        //  .get(url)
        .then((response) => {
          setWeatherInfo(response)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    }
  }

  const queryCountries = (search, fullText) => {
    setCountryList([])
    if (countrySearch.length > 0) {
      //const url = `https://restcountries.com/v3.1/name/${search || countrySearch
      //  }?fullText=${fullText || countryFullText}`
      //console.log(url)
      countriesAndWearther
        .countryData(search || countrySearch, fullText || countryFullText)
        //axios
        //  .get(url)
        .then((response) => {
          if (response.length === 1) {
            // eslint-disable-next-line
            weatherApiQuery(response[0].capital[0])
            //weatherApiQuery(response.data[0].capitalInfo.latlng)
          }
          setCountryList(response)
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            // eslint-disable-next-line
            console.log(error.response.data)
            // eslint-disable-next-line
            console.log(error.response.status)
            // eslint-disable-next-line
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // eslint-disable-next-line
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            // eslint-disable-next-line
            console.log('Error', error.message)
          }
        })
    }
  }

  const showCountry = (event, search) => {
    event.preventDefault()
    setCountryFullText(true)
    setCountrySearch(search)
    queryCountries(search, true)
  }

  const countrySearchSubmit = (event) => {
    event.preventDefault()
    queryCountries()
  }

  const clearSearch = (event) => {
    event.preventDefault()
    setCountryFullText(false)
    setCountrySearch('')
    setCountryList([])
    setWeatherInfo({})
  }

  return <div>
    <h1 className='greenItalicBig'>This is a website</h1>
    <p>Here can be watch, weather in different countries, course list, use public notes and phonebook.</p>
    <Countries
      countrySearchSubmit={countrySearchSubmit}
      countrySearch={countrySearch}
      handleCountrySearch={handleCountrySearch}
      handleFullText={handleFullText}
      countryFullText={countryFullText}
      clearSearch={clearSearch}
      countryList={countryList}
      weatherInfo={weatherInfo}
      showCountry={showCountry}
    />
    <hr />
    <Notes
      handleShowAll={handleShowAll}
      notesToShow={notesToShow}
      newNote={newNote}
      addNote={addNote}
      showAll={showAll}
      toggleImportance={toggleImportance}
      handleNoteChange={handleNoteChange}
      deleteNote={deleteNote}
      alertmsg={notesAlertMsg}
      alertclass={notesAlertClass}
    />
    <hr />
    <Courses courses={courses} />
    <hr />
    <Book
      handleSearchSubmit={handleSearchSubmit}
      search={search}
      handleSearchChange={handleSearchChange}
      searchResults={searchResults}
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      delPerson={delPerson}
      alertmsg={personAlertMsg}
      alertclass={personAlertClass}
    />
    <hr />
    <Footer />
  </div>
}

export default App
