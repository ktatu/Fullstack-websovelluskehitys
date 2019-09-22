import React from 'react'

const Filter = ({filter, handleFilterInput}) => {
    return (
        <div>
            <p>Search countries:</p>
            <input name="filter" value={filter} onChange={handleFilterInput} />
        </div>
    )
}

export default Filter