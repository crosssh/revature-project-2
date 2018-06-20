import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';

export class SignInComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateUsername = (e: any) => {
    const username = e.target.value;
    this.props.updateUsername(username);
  }

  public updatePassword = (e: any) => {
    const password = e.target.value;
    this.props.updatePassword(password);
  }

  public submit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.props; // destructuring
    const credentials = { username, password };

    const authenticationData = {
      Password: credentials.password,
      Username: credentials.username,
    };
    const authenticationDetails = new awsCognito.AuthenticationDetails(authenticationData);
    const poolData = {
      ClientId: '5gpn6c10oppbml3hjva90nrjgf', // Your client id here
      UserPoolId: 'us-west-2_S3BP7tO7z', // Your user pool id here
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);
    const userData = {
      Pool: userPool,
      Username: credentials.username,
    };
    const cognitoUser = new awsCognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const token = result.getIdToken().getJwtToken();
        localStorage.setItem('token', token);
        // console.log(userPool.getCurrentUser());
        // console.log(result.getIdToken().decodePayload())
        // const idtok: any = result.getIdToken();
        // console.log(idtok.payload['cognito:groups']) //payload has the user info on it

        // navigate pages now that we have successfully logged in
        this.props.history.push('/movies');
      },

      onFailure: (err) => {
        console.log(err);
        if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
          this.props.updateError('Invalid Credentials, try again.');
        } else {
          this.props.updateError('Unable to login at this time, please try again later');
        }
      },

    });
  }

  public render() {
    return (
      <form className="form-signin" onSubmit={this.submit}>
        <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input value={this.props.username}
          onChange={this.updateUsername}
          type="text" id="inputUsername"
          className="form-control"
          placeholder="Username"
          required />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input value={this.props.password}
          onChange={this.updatePassword}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required />
        { this.props.errorMessage !== '' &&
          <div id="error-message">
            {this.props.errorMessage}
          </div>
        }
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
      </form>
    );
  }
}