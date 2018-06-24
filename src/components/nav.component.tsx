import * as React from 'react';
import { Link } from 'react-router-dom';

export const NavComponent: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/home" className="unset-anchor nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/browse" className="unset-anchor nav-link">Browse</Link>
            </li>
            <li className="nav-item active">
              <Link to="/checkout" className="unset-anchor nav-link">Checkout</Link>
            </li>
            <li className="nav-item active">
              <Link to="/bids" className="unset-anchor nav-link">Profile</Link>
            </li>
            <li className="nav-item active">
              <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
            </li>
            <li className="nav-item active">
              <Link to="/sign-out" className="unset-anchor nav-link">Sign Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}