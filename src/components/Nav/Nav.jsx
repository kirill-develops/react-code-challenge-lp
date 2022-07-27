import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePrefetch } from '../../slices/apiSlice';

import Styles from './Nav.module.scss';

const Nav = () => {
  const prefetchCountries = usePrefetch('getCountries')
  const prefetchPosts = usePrefetch('getAllPosts')

  return (
    <div className={Styles.nav}>
      <NavLink
        exact to="/"
        onMouseEnter={() => prefetchPosts()}
        className={({ isActive }) => isActive
          ? Styles.button_active : Styles.button}
      >
        Home
      </NavLink>
      <NavLink
        to="/universities"
        onMouseEnter={() => prefetchCountries()}
        className={({ isActive }) => isActive
          ? Styles.button_active : Styles.button}
      >
        Universities
      </NavLink>
      <NavLink
        to="/postal-lookup"
        className={({ isActive }) => isActive
          ? Styles.button_active : Styles.button}
      >
        Postal Lookup
      </NavLink>
    </div >
  );
}

export default Nav;