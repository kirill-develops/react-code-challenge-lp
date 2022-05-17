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

  // whenever the search is equal to 5 numbers
  useEffect(() => {
    (search.length === 5) && setValidSearch(search)
  }, [search])

  const { data: zipData,
    isFetching,
    isSuccess,
    isError } = useGetZipQuery(validSearch)


  let content;

  if (search.length === 5 && isError) {
    content = <h2>No Such zip code could be found</h2>
  }
  else if (isSuccess) {
    const { places: result } = zipData;

    const isDisabled = isFetching
      ? [GlobalStyles.card_deck, GlobalStyles.disabled].join(" ") : GlobalStyles.card_deck;

    content =
      <section className={isDisabled}>
        <h2 className=''>Results For Zip Code: {zipData['post code']}</h2>
        {result.map(each =>
          <div key={useId} className={CardStyles.card__multi_row}>
            <h2 className={CardStyles.title}>
              {each['place name']}, {each['state abbreviation']}
            </h2>
            <p className="">State: {each.state}</p>
            <h3 className={CardStyles.label}>Latitude: {each.latitude}</h3>
            <h3 className={CardStyles.label}> Longitude: {each.longitude}</h3>
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
