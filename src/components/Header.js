import React from 'react';
import { NavLink } from 'react-router-dom'
import SelectTheater from './SelectTheater'
import Bookings from './Bookings';
import logo from '../logo-light.png'

const Header = ({ location, ...props }) => (
    <header className="App-header">
      <ul>
        <img src={logo} alt='' height={32} />
        <Link to="/">Etusivu</Link>
        <Link to="/current">Ohjelmistossa</Link>
        <Link to="/upcoming">Tulossa</Link>
        <Link to="/schedule">Näytösajat</Link>
        <SelectTheater />
        <Bookings />
      </ul>
    </header>
);

const Link = ({children, ...props}) => (
  <li>
    <NavLink activeClassName='active' exact {...props}><div>{children}</div></NavLink>
  </li>
)

export default Header;
