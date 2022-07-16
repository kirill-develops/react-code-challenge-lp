import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Styles from '../styles/global.module.scss';
import CardStyles from '../components/Card/Card.module.scss';
import { getAllUniversity, useGetUniQuery } from '../slices/universitySlice.js';
import { useGetCountriesQuery } from '../slices/universitySlice';
import SearchBar from '../components/SearchBar/SearchBar';

const Universities = () => {

  const { data: countries,
    isLoading: countryLoading,
    isSuccess: countrySuccess,
    isError: countryError,
    error: countryErrorMsg } = useGetCountriesQuery();

  const [countrySearch, setCountrySearch] = useState('');
  const [uniSearch, setUniSearch] = useState('');
  const [skip, setSkip] = useState(true);

  const { isFetching,
    isSuccess,
    isUninitialized,
    isError } = useGetUniQuery(countrySearch, { skip });
  const allUni = useSelector(getAllUniversity);

  let countryOptions = <option>Loading...</option>;
  let universityData;

  if (countrySuccess) {
    countryOptions = countries.map(country =>
      <option key={country.name} value={country.name}>
        {country.name}
      </option>
    );
  }
  else if (countryError) {
    universityData = <div>
      <p>Fetch Error, Please Reload</p>
      <p>
        Error message: {JSON.stringify(countryErrorMsg)}
      </p>
    </div>
  }

  if (isUninitialized) {
    universityData = <h1>Use the drop down menu to generate all Post Secondary options withen your selection</h1>
  } else if (isError) {
    universityData = <h1>Error fetching. Please refresh page</h1>
  } else if (isSuccess) {
    universityData = allUni
      .filter(uni => uni.name.toLowerCase()
        .startsWith(uniSearch.toLowerCase()))
      .map(uni =>
        <div key={uni.id} className={CardStyles.card} >
          <h2 className=''>
            {uni.name}
          </h2>
          <a href={uni.web_pages[0]} >{uni.web_pages[0]}</a>
        </div>
      )
  }

  const isDisabled = isFetching
    ? [Styles.card_deck, Styles.disabled].join(" ") : Styles.card_deck;

  const onCountryChanged = e => {
    setCountrySearch(e.target.value);
    setSkip(false);
  };

  const showSearch = !isUninitialized
    && <SearchBar
      search={uniSearch}
      setSearch={setUniSearch}
      placeholder="search results..."
    />

  return countryLoading ? (
    <h1>Loading...</h1>
  ) : (
    <main className={Styles.page_layout}>
      <section className={Styles.search_wrapper}>
        <select
          value={countrySearch}
          onChange={onCountryChanged}
          disabled={!countrySuccess}
          className={Styles.search}
        >
          <option value="" disabled default>Select Country</option>
          {countryOptions}
        </select>
      </section>
      {showSearch}
      <section className={isDisabled}>
        {universityData}
      </section>
    </main>
  )
};

export default React.memo(Universities);
