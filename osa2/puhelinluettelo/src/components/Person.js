import React from 'react'

const Person =  ({ person, onClick }) => {
    return (
        <li>
            {person.name} {person.number}
            <button type="submit" onClick={onClick} value={person.name}>delete</button>
        </li>
    )
}

export default Person