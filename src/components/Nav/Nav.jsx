import './Nav.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='nav'>
      <NavLink
        to="/universities"
        className={({ isActive }) => isActive ? 'nav__button--active' : 'nav__button'}
      >
        Universities
      </NavLink>
      <NavLink
        to="/postal-lookup"
        className={({ isActive }) => isActive ? 'nav__button--active' : 'nav__button'}
      >
        Postal Lookup
      </NavLink>
    </div>
  )
};

export default Nav;