import * as React from 'react';
import { Link } from 'react-router-dom';
// import RevLogo from '../assets/rev-logo.png';

export const ProfileNavComponent: React.StatelessComponent<{}> = () => {
  return (
    <div className="col-1 vertical-menu">
      <Link to="/bids" className="unset-anchor nav-link">
        Bids
      </Link>
      <Link to="/selling" className="unset-anchor nav-link">
        Selling
      </Link>
      <Link to="/bought" className="unset-anchor nav-link">
        Bought
       </Link>
      <Link to="/new-pop" className="unset-anchor nav-link">
        Add New Pop
       </Link>
      <Link to="/user-info" className="unset-anchor nav-link">
        User Info
      </Link>
    </div >
  );
}