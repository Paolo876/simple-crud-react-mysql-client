import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import "./SearchInput.scss";
export default function SearchInput() {
    const [ input, setInput ] = useState('')
    const handleSubmit = (e) => {
      e.preventDefault();
      if(input.trim().length !== 0) {
        console.log(input)
        setInput("")
      }
    }
  return (
    <form className='navbar-search-form' onSubmit={handleSubmit}>
        <span>
            <input type="text" placeholder='Search' value={input} onChange={e => setInput(e.target.value)}/>
            <SearchIcon onClick={() => console.log("ASD")}/>
        </span>
    </form>
  )
}
