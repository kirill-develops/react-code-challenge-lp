import React, { useId } from 'react';
import { useSelector } from 'react-redux';
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
      <section className='card-deck'>
        <h2 className=''>Results For Zip Code: {zipCode}</h2>
        {zipData.map(each =>
          <div key={useId} className='card--multi-row'>
            <h2 className=''>
              {each['place name']}, {each['state abbreviation']}
            </h2>
            <h3 className=''>{each.latitude}, {each.longitude}</h3>
            <h3 className=''>State: {each.state}</h3>
          </div>
        )}
      </section>
  }

  return (
    <main className='page-layout'>
      <section className='search-wrapper'>
        <SearchBar
          reduxAction={fetchZipCode}
          placeholder="enter US zipcode..."
        />
      </section>
      {content}
    </main>
  )
};

export default PostalLookup;