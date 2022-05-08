import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, getAllUniversity } from '../../features/university/universitySlice.js';
import { fetchCountries, fetchUniversity } from '../../features/university/universityActions.js';

const Universities = () => {
  const dispatch = useDispatch();

  const countries = useSelector(getAllCountries);
  const countryStatus = useSelector(state => state.university.status)
  const error = useSelector(state => state.university.error);

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
        <div key={uni.name} className='card' >
          <h1 className=''>
            {uni.name}
          </h1>
          <a href={uni.web_pages[0]} className='link'>{uni.web_pages[0]}</a>
        </div>
      )
  }

  return countryStatus === 'loading' ? (<div>Loading</div>) : (
    <main className='page-layout'>
      <section className='search-wrapper'>
        <select
          value={search}
          onChange={onCountryChanged}
          disabled={countryStatus !== "succeeded"}
        >
          <option value="" disabled>Select Country</option>
          {countryOptions}
        </select>
      </section>
      <section className='card-deck'>
        {universityData}
      </section>
    </main>
  )
};

export default Universities;
