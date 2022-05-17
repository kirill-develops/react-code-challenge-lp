import React from 'react';
import { NavLink } from 'react-router-dom';

import Styles from './Nav.module.scss';

const Nav = () => (
  <div className={Styles.nav}>
    <NavLink
      to="/"
      className={({ isActive }) => isActive ? Styles.button_active : Styles.button}
    >
      Home
    </NavLink>
    <NavLink
      to="/universities"
      className={({ isActive }) => isActive ? Styles.button_active : Styles.button}
    >
      Universities
    </NavLink>
    <NavLink
      to="/postal-lookup"
      className={({ isActive }) => isActive ? Styles.button_active : Styles.button}
    >
      Postal Lookup
    </NavLink>
  </div >
);

export default Nav;