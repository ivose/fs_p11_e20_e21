import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NotesList from '../src/front/components/notes/NotesList'

const notesToShow = [
  {
    content: 'Note one',
    date: '2023-03-13T12:56:25.026Z',
    important: false,
    id: '640f1d7918dee8dc17826e15'
  },
  {
    content: 'Note the second',
    date: '2023-03-14T17:04:12.350Z',
    important: true,
    id: '6410a90cb7bd378de06516c8'
  }
]

describe('<NotesList />', () => {
  it('Should render notes', () => {
    const toggleImportance = () => { }
    const deleteNote = () => { }
    render(<NotesList {...{ toggleImportance, deleteNote, notesToShow }} />)
    expect(screen.getByText('Note one')).toBeVisible()
  })
})
