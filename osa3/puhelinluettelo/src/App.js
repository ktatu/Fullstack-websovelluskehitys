import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState(0)

  const [notification, setNotification] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()

    const foundPerson = findPerson()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (foundPerson === undefined) {
      personService
        .create(personObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.concat(returnedPerson))
            successNotification('added', personObject.name)
          })
          .catch(error => {
            console.log("error:", error);
            console.log("error.response.data:", error.response.data);
            console.log("error.response:", error.response);
            setNotification(`Error: ${error.response.data.error}`)
          })
      setNewNumber(0)
    } else {
      if (newNumber !== foundPerson.number) {
        eventReplaceNumber(foundPerson, 
          window.confirm(`${newName} is already added to phonebook, replace old number?`))
      } else {
        window.alert(`${newName} is already added to phonebook`)
      }
      }
    setNewName('')
  }

const eventReplaceNumber = (foundPerson, confirmation) => {
    if (confirmation) {
      foundPerson.number = newNumber
      personService
        .update(foundPerson.id, foundPerson)
          .then(returnedPerson => {
            console.log(returnedPerson);
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
            successNotification('updated', foundPerson.name)
          })
        .catch(error => {
          setNotification(`Error: ${foundPerson.name} has already been removed from the server`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber(0)
  }

  const findPerson = () => {
    const foundPerson = persons.filter(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())

    if (foundPerson.length > 0) {
      return foundPerson[0]
    }
    return undefined
  }

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)  
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  //varmaan turha, useState('') aluksi(?)
  const numberForm = () => {
    if (newNumber === 0) {
      return ''
    }
    return newNumber
  }

  const deletePerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === event.target.value)

    const confirmation = window.confirm(`Delete ${person.name}?`)
    if (confirmation) {
      personService
        .remove(person.id)
          .then(responseStatus => {
            if (responseStatus === 204) {
              const newArray = persons.filter(listPerson => listPerson.name !== person.name)
              setPersons(newArray)
            }
          })
      successNotification('deleted', person.name)
    }
  }

  const successNotification = (eventType, name) => {
    setNotification(`${name} ${eventType}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setNewName('')
    setNewNumber(0)
  }

  useEffect(() => {
      personService
        .getAll()
          .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notification} />

      <Filter handleFilterInput={handleFilterInput} filterValue={newFilter} />

      <PersonForm handleNumberInput={handleNumberInput} handleNameInput={handleNameInput} 
        numberForm={numberForm()} nameForm={newName} addPerson={addPerson}
        header='add a person' />

      <h2>Numbers</h2>
      <Persons filter={newFilter} persons={persons} onClick={deletePerson} />
  </div>
  )
}

export default App