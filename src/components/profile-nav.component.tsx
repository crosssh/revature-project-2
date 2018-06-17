import * as React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../assets/rev-logo.png';

export const ProfileNavComponent: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/bids" className="unset-anchor nav-link">Bids</Link>
            </li>
            <li className="nav-item active">
              <Link to="/selling" className="unset-anchor nav-link">Selling</Link>
            </li>
            <li className="nav-item active">
              <Link to="/bought" className="unset-anchor nav-link">Bought</Link>
            </li>
            <li className="nav-item active">
              <Link to="/user-info" className="unset-anchor nav-link">User Info</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}