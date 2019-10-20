import React from 'react'

const PersonForm = ({handleNameInput, handleNumberInput, header, numberForm, nameForm, addPerson }) => {
    return (
        <div>
            <h2>{header}</h2>
            <form onSubmit={addPerson}>
                <div>
                name: <input value={nameForm} onChange={handleNameInput} /><br></br>
                number: <input value={numberForm} onChange={handleNumberInput} />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm