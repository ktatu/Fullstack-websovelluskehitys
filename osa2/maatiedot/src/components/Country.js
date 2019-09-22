import React from 'react'
import Countries from './Countries'

const Country = ({country}) => {

    return (
        <div>
            <h2>{country.name}</h2>
            <p>population {country.population}</p>
        
            <h3>languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
        
            <img alt="flag" width='50 px;' height='30 px;' src={country.flag} />
        </div>
        )
}
export default Country