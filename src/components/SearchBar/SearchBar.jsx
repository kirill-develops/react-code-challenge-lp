import './SearchBar.scss';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const SearchBar = ({ reduxAction, placeholder }) => {
  // search state & redux variable
  const [search, setSearch] = useState('');

  // localized dispatch caller of useDispatch hook
  const dispatch = useDispatch();

  // when the search state changes, dispatch fetchPost with the search state as
  // a paramater
  useEffect(() => dispatch(reduxAction(search)),
    [search, dispatch, reduxAction]);

  return (
    <section className='search-wrapper'>
      <input
        type='search'
        value={search}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className=''
      />
    </section>
  )
}

export default SearchBar