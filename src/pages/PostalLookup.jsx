import React, { useEffect, useId, useReducer, useState } from 'react';

import CardStyles from '../components/Card/Card.module.scss';
import GlobalStyles from '../styles/global.module.scss';
import { useGetZipQuery } from '../slices/postalSlice';
import SearchBar from '../components/SearchBar/SearchBar';

const PostalLookup = () => {
  // search reducer checks that all imputs are numbers
  const [search, setSearch] = useReducer((state, action) => {
    if (!action) {
      return '';
    }
    else if (!Number(action)) {
      return state;
    }
    return action;
  }, '');
  const [validSearch, setValidSearch] = useState(search);
  const [skip, setSkip] = useState(true);

  // whenever the search is equal to 5 numbers
  useEffect(() => {
    if (search.length === 5) {
      setValidSearch(search);
      setSkip(false);
    }
    else setSkip(true);
  }, [search])

  const { data: zipData,
    isLoading,
    isFetching,
    isSuccess,
    isUninitialized,
    isError } = useGetZipQuery(validSearch, { skip, })

  let content = <hr></hr>;

  if (isUninitialized) {
    content = <h1>Please enter a valid Zip Code</h1>
  } else if (isError) {
    content = <h1>No Such zip code could be found</h1>
  } else if (isLoading) {
    content = <h1>Loading...</h1>
  }
  else if (isSuccess) {
    const { places: result } = zipData;

    const isDisabled = isFetching
      ? [GlobalStyles.card_deck, GlobalStyles.disabled].join(" ") : GlobalStyles.card_deck;

    content =
      <section className={isDisabled}>
        <h1 className=''>Results For Zip Code: {zipData['post code']}</h1>
        {result.map(each =>
          <div key={useId} className={CardStyles.card__multi_row}>
            <h2 className={CardStyles.title}>
              {each['place name']}, {each['state abbreviation']}
            </h2>
            <p className="">State: {each.state}</p>
            <h4 className={CardStyles.label}>Latitude: {each.latitude}</h4>
            <h4 className={CardStyles.label}> Longitude: {each.longitude}</h4>
          </div>
        )}
      </section>
  }

  return (
    <main className={GlobalStyles.page_layout}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="enter US zipcode..."
      />
      {content}
    </main>
  )
};

export default PostalLookup;
