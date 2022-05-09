import React, { useId } from 'react';
import { useSelector } from 'react-redux';

import CardStyles from '../components/Card/Card.module.scss';
import GlobalStyles from '../styles/global.module.scss';
import { getAllData } from '../features/postal/postalSlice';
import SearchBar from '../components/SearchBar/SearchBar';
import { fetchZipCode } from '../features/postal/postalActions';

const PostalLookup = () => {

  // zipData, zipStatus & error copied from the postal slice in Redux
  const zipData = useSelector(getAllData);
  const zipCode = useSelector(state => state.postal.zip);
  const error = useSelector(state => state.postal.error)

  let content;

  if (error) {
    content = <h2>No Such zip code could be found</h2>
  }
  else if (zipData[0]) {
    content =
      <section className={GlobalStyles.card_deck}>
        <h2 className=''>Results For Zip Code: {zipCode}</h2>
        {zipData.map(each =>
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
        reduxAction={fetchZipCode}
        placeholder="enter US zipcode..."
      />
      {content}
    </main>
  )
};

export default PostalLookup;
