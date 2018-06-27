import * as React from 'react';
import { Link } from 'react-router-dom';
import * as awsCognito from "amazon-cognito-identity-js";
import { IUser } from '../reducers';

interface IProp extends IUser {
  updateUsername: (username: string) => void;
  updateError: (errorMessage: string) => void;
  updateAuthToken: (authToken: string) => void;
}

let tempPass = ""
export class NavComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
  }

  public updateUsername = (e: any) => {
    const username = e.target.value;
    this.props.updateUsername(username);
  };

  public changeTemp = (e: any): void => {
    const temp = e.target.value;
    tempPass = temp;
  };

  public updateAuthToken = (token: string) => {
    this.props.updateAuthToken(token);
  };

  public submit = (e: any) => {
    e.preventDefault();

    const authenticationData = {
      Password: tempPass,
      Username: this.props.username
    };
    const authenticationDetails = new awsCognito.AuthenticationDetails(
      authenticationData
    );
    const poolData = {
      ClientId: "5gpn6c10oppbml3hjva90nrjgf",
      UserPoolId: "us-west-2_S3BP7tO7z"
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);
    const userData = {
      Pool: userPool,
      Username: this.props.username
    };
    const cognitoUser = new awsCognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        const token = result.getIdToken().getJwtToken();
        localStorage.setItem("token", token);
        this.updateAuthToken(token);
        localStorage.setItem("username", this.props.username);
      },

      onFailure: err => {
        console.log(err);
        if (
          err.code === "UserNotFoundException" ||
          err.code === "NotAuthorizedException"
        ) {
          this.props.updateError("Invalid Credentials, try again.");
          tempPass = "";
        } else {
          this.props.updateError(
            "Unable to login at this time, please try again later"
          );
        }
      }
    });
  };

  public render() {
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
                <p id="dropdown-signin" data-toggle="dropdown" className="nav-link dropdown-toggle pointer" >Sign In</p>
                <ul className="dropdown-menu form-wrapper">
                  <li>
                    <form onSubmit={this.submit} method="post">
                      <div className="form-group">
                        <input
                          value={this.props.username}
                          onChange={this.updateUsername}
                          type="text" className="form-control"
                          placeholder="Username" required />
                      </div>
                      <div className="form-group">
                        <input
                          onChange={this.changeTemp}
                          type="password" className="form-control"
                          placeholder="Password" required />
                      </div>
                      <button type="submit" className="btn btn-danger btn-block" value="Login"> Sign In</button>
                      <br />
                      <div className="form-footer row">
                        {this.props.errorMessage !== "" && (
                          <div id="error-message italic">{this.props.errorMessage}</div>
                        )}
                        Don't have an account yet?
                        <Link to="/create-user">
                          <button type="submit" className="btn btn-secondary btn-sm margin-button" value="Login">Sign Up</button>
                        </Link>
                      </div>
                    </form>
                  </li>
                </ul>
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
}