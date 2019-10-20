import React from 'react'

const Filter = ({handleFilterInput, filterValue}) => {
    return (
        <div>
            Filter:<input value={filterValue} onChange={handleFilterInput} />
        </div>
    )
}

export default Filter