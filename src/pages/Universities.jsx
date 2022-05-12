import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Styles from '../styles/global.module.scss';
import CardStyles from '../components/Card/Card.module.scss';
import { getAllUniversity } from '../features/university/universitySlice.js';
import { fetchUniversity } from '../features/university/universityActions.js';
import { fetchCountries, getAllCountries } from '../features/country/countrySlice';

const Universities = () => {
  const dispatch = useDispatch();

  const countries = useSelector(getAllCountries);
  const countryStatus = useSelector(state => state.country.status);
  const error = useSelector(state => state.country.error);

  useEffect(() => {
    if (countryStatus === 'idle') dispatch(fetchCountries())
  }, [countryStatus, dispatch])

  let countryOptions;
  let universityData;

  if (countryStatus === 'loading') {
    countryOptions = <option>Loading...</option>
  }
  else if (countryStatus === 'succeeded') {
    countryOptions = countries.map(country =>
      <option key={country.name} value={country.name}>
        {country.name}
      </option>
    );
  }
  else if (countryStatus === 'failed') {
    universityData = <div>{error}</div>
  }

  const university = useSelector(getAllUniversity);
  const [search, setSearch] = useState('Canada');
  const onCountryChanged = e => setSearch(e.target.value);

  useEffect(() => {
    if (countryStatus === 'succeeded')
      dispatch(fetchUniversity(search));
  }, [search, dispatch, countryStatus])


  if (university[0] === 404) {
    universityData = <div>Error fetching. Please refresh page</div>
  } else if (university[0]) {
    universityData = university
      .map(uni =>
        <div key={uni.id} className={CardStyles.card} >
          <h1 className=''>
            {uni.name}
          </h1>
          <a href={uni.web_pages[0]} >{uni.web_pages[0]}</a>
        </div>
      )
  }

  return countryStatus === 'loading' ? (<div>Loading</div>) : (
    <main className={Styles.page_layout}>
      <section className={Styles.search_wrapper}>
        <select
          value={search}
          onChange={onCountryChanged}
          disabled={countryStatus !== "succeeded"}
        >
          <option value="" disabled>Select Country</option>
          {countryOptions}
        </select>
      </section>
      <section className={Styles.card_deck}>
        {universityData}
      </section>
    </main>
  )
};

export default React.memo(Universities);
