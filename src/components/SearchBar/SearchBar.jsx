import './SearchBar.scss';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchPost } from '../../features/posts/postsActions';

const SearchBar = () => {
  // search state & redux variable
  const [search, setSearch] = useState('');

  // localized dispatch caller of useDispatch hook
  const dispatch = useDispatch();

  // when the search state changes, dispatch fetchPost with the search state as
  // a paramater
  useEffect(() => dispatch(fetchPost(search)), [search, dispatch]);

  return (
    <section className='search-wrapper'>
      <input
        type='search'
        value={search}
        placeholder="search by ID..."
        onChange={(e) => setSearch(e.target.value)}
        className=''
      />
    </section>
  )
}

export default SearchBar