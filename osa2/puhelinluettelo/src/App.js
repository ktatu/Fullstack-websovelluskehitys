import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState(0)

  const addPerson = (event) => {

    console.log('nimi printattuna addPersonissa: ', newName);
    event.preventDefault()

    if (findPerson()) {
      setPersons(persons.concat({ name: newName.toLocaleLowerCase(), number: newNumber}))
      setNewName('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
  }

  const findPerson = () => {

    const foundPerson = persons.filter(person => person.name === newName)

    if (foundPerson.length > 0) {
      return false
    }
    return true
  }

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameInput = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)  
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber);
  }

  //varmaan turha, useState('') aluksi(?)
  const numberForm = () => {
    if (newNumber === 0) {
      return ''
    }
    return newNumber
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterInput={handleFilterInput} filterValue={newFilter} />

      <PersonForm handleNumberInput={handleNumberInput} handleNameInput={handleNameInput} 
        numberForm={numberForm()} nameForm={newName} addPerson={addPerson}
        header='add a person' />

      <h2>Numbers</h2>
      <Persons filter={newFilter} persons={persons} />
  </div>
  )

}

export default App