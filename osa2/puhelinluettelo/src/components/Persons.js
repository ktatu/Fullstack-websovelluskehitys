import React from 'react'
import Person from './Person'

const Persons = ({filter, persons}) => {
    if (filter === '') {
        return (
          <ul>{persons.map(person =>
            <Person
              key={person.name}
              person={person} />)}</ul>
        )  
      }
      return <ul>{persons.filter(person => person.name.includes(filter.toLocaleLowerCase()))
        .map(person => <Person key={person.name} person={person} />)}/</ul>
}

export default Persons