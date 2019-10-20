import React from 'react'
import Person from './Person'

const Persons = ({filter, persons, onClick}) => {
    if (filter === '') {
        return (
          <ul>
            {persons.map(person =>
            <Person key={person.name} person={person} onClick={onClick}/>)}
          </ul>
        )  
      }

      return (
        <ul>
          {persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
          .map(person => 
          <div key={person.id}>
            <Person key={person.name} person={person} onClick={onClick}/>
          </div>)}
        </ul>
      )
}

export default Persons