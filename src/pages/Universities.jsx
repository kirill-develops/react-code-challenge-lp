import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Styles from '../styles/global.module.scss';
import CardStyles from '../components/Card/Card.module.scss';
import { getAllUniversity, useGetUniQuery } from '../slices/universitySlice.js';
import { useGetCountriesQuery } from '../slices/universitySlice';

const Universities = () => {

  const { data: countries,
    isLoading: countryLoading,
    isSuccess: countrySuccess,
    isError: countryError,
    error: countryErrorMsg } = useGetCountriesQuery();

  const [search, setSearch] = useState('Canada');

  const { isFetching, isSuccess, isError } = useGetUniQuery(search);
  const allUni = useSelector(getAllUniversity);

  let countryOptions;
  let universityData;

  if (countryLoading) {
    countryOptions = <option>Loading...</option>
  }
  else if (countrySuccess) {
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

  if (isError) {
    universityData = <div>Error fetching. Please refresh page</div>
  } else if (isSuccess) {
    universityData = allUni
      .map(uni =>
        <div key={uni.id} className={CardStyles.card} >
          <h1 className=''>
            {uni.name}
          </h1>
          <a href={uni.web_pages[0]} >{uni.web_pages[0]}</a>
        </div>
      )
  }

  const isDisabled = isFetching
    ? [Styles.card_deck, Styles.disabled].join(" ") : Styles.card_deck;

  const onCountryChanged = e => setSearch(e.target.value);

  return countryLoading ? (
    <div>Loading</div>
  ) : (
    <main className={Styles.page_layout}>
      <section className={Styles.search_wrapper}>
        <select
          value={search}
          onChange={onCountryChanged}
          disabled={!countrySuccess}
        >
          <option value="" disabled>Select Country</option>
          {countryOptions}
        </select>
      </section>
      <section className={isDisabled}>
        {universityData}
      </section>
    </main>
  )
};

export default React.memo(Universities);
