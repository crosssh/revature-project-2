import * as React from 'react';
import { Link } from 'react-router-dom';
// import RevLogo from '../assets/rev-logo.png';

export const ProfileNavComponent: React.StatelessComponent<{}> = () => {
  return (
    <div className="col-1">
      <div className="row bids">
        <Link to="/bids" className="unset-anchor nav-link">
          <button className="btn btn-primary">Bids</button>
        </Link>
      </div>
      <div className="row selling">
        <Link to="/selling" className="unset-anchor nav-link">
          <button className="btn btn-primary">Selling</button>
        </Link>
      </div>
      <div className="row bought">
        <Link to="/bought" className="unset-anchor nav-link">
          <button className="btn btn-primary">Bought</button>
        </Link>
      </div>
      <div className="row new-pop">
        <Link to="/new-pop" className="unset-anchor nav-link">
          <button className="btn btn-primary">Add New Pop</button>
        </Link>
      </div>
      <div className="row user-info">
        <Link to="/user-info" className="unset-anchor nav-link">
          <button className="btn btn-primary">Use Info</button>
        </Link>
      </div>

      {/* <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
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
      </nav> */}
    </div >
  );
}