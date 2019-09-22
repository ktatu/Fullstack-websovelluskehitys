import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'


const App = () => {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])


  const [newFilter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const filtered = countries.filter(
                      country => country.name.toLocaleLowerCase()
                      .includes(newFilter.toLocaleLowerCase()))

    setFilteredCountries(filtered)
    console.log("filtteröityjä: ", filtered.length)
  }, [newFilter, countries])

  const handleFilterInput = (event) => {
    console.log("handle filter")
    setFilter(event.target.value)
  }

  const render = () => renderCountries()

  const renderCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Specify filter</p>
    } 
    else if (filteredCountries.length > 1) {
      return (
              <ul>
                {filteredCountries.map(country => 
                  <li key={country.name}>
                    <Countries key={country.name} name={country.name}/>
                    <button type="submit" 
                      onClick={() => setFilteredCountries(
                                      filteredCountries.filter(filtered => filtered.name === country.name))}>
                      Show
                    </button>
                  </li>)}
              </ul>
      )
    }
    else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />
    }
  }

  return (
    <div>
      <h2>Search for countries</h2>
      <Filter handleFilterInput={handleFilterInput} filter={newFilter} />
      {render()}
    </div>
  );
}

export default App;
