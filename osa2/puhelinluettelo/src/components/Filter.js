import React from 'react'

const Filter = ({handleFilterInput, filterValue}) => {
    return (
        <input value={filterValue} onChange={handleFilterInput} />
    )
}

export default Filter