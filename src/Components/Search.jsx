import React from 'react'

const Search = ({search, setSearch}) => {

  return (
    <div className='search-container'>
      <img src="/search-icon.svg" alt="search-icon" loading='lazy' />
      <input type='text' value= {search} className='search' placeholder='Search through 300+ movies online' 
        onChange={(e) => {
            setSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default Search
