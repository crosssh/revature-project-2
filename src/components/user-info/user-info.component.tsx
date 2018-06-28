import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import * as awsCognito from "amazon-cognito-identity-js";

export class UserInfoComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
    this.state = {
      email: "",
      errorMsg: "",
      firstName: "",
      lastName: "",
      newPassword: "",
      oldPassword: "",
      repeatPassword: "",
      showChangePassword: false,
    }
  }

  public componentDidMount() {
    const poolData = {
      ClientId: "5gpn6c10oppbml3hjva90nrjgf", // Your client id here
      UserPoolId: "us-west-2_S3BP7tO7z" // Your user pool id here
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser !== null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('session: ' + session.isValid());
      });
    }
    if (cognitoUser !== null) {
      cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          console.log(err)
          return;
        }

        if (result !== undefined) {
          this.setState({
            email: result[4].getValue(),
            firstName: result[2].getValue(),
            lastName: result[3].getValue(),
          })
        }
      });
    }
  }

  public updateOldPassword = (e: any) => {
    this.setState({
      oldPassword: e.target.value,
    })
  }

  public updateNewPassword = (e: any) => {
    this.setState({
      newPassword: e.target.value,
    })
  }

  public updateRepeatPassword = (e: any) => {
    this.setState({
      repeatPassword: e.target.value,
    })
  }

  public showChangePassword = (e: any) => {
    e.preventDefault();
    if (!this.state.showChangePassword) {
      this.setState({
        showChangePassword: true,
      })
    } else {
      this.setState({
        showChangePassword: false,
      })
    }
  }

  public changePassword = (e: any) => {
    e.preventDefault();

    if (this.state.newPassword === this.state.repeatPassword) {
      const poolData = {
        ClientId: "5gpn6c10oppbml3hjva90nrjgf", // Your client id here
        UserPoolId: "us-west-2_S3BP7tO7z" // Your user pool id here
      };
      const userPool = new awsCognito.CognitoUserPool(poolData);
      const cognitoUser = userPool.getCurrentUser();

      if (cognitoUser !== null) {
        cognitoUser.getSession((err: any, session: any) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('session: ' + session.isValid());
        });

        cognitoUser.changePassword(this.state.oldPassword, this.state.newPassword, function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(result);
          return;
        });
      }
      this.setState({
        errorMsg: "",
        newPassword: "",
        oldPassword: "",
        repeatPassword: "",
      })
    } else {
      this.setState({
        errorMsg: "New pass word is not the same as the repeat password",
      })
    }
  }

  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-10">
          <div className="container">
            <h5 className="bubble-font text-center">Your User Information</h5>
            <br />
            <p className="font-weight-bold text-center">First Name: {this.state.firstName}</p>
            <p className="font-weight-bold text-center">Last Name: {this.state.lastName}</p>
            <p className="font-weight-bold text-center">Email: {this.state.email}</p>
            <br />
            <button className="btn btn-secondary btn-sm" onClick={this.showChangePassword}> Change Password </button>
            {
              this.state.showChangePassword !== false &&
              <div className="change-password">
                <form onSubmit={this.changePassword} className="change-password-form">
                  <h6>Please enter your old password</h6>
                  <input type="password" className="form-control" placeholder="Old Password" onChange={this.updateOldPassword} required />
                  <h6>Please enter your New password</h6>
                  <input type="password" className="form-control" placeholder="New Password" onChange={this.updateNewPassword} required />
                  <h6>Please enter your new password again</h6>
                  <input type="password" className="form-control" placeholder="Confirm Password" onChange={this.updateRepeatPassword} required />
                  <div id="error-message">{this.state.errorMsg}</div>
                  <button type="submit" className="btn btn-secondary btn-sm float-right">Submit</button>
                </form>
              </div>
            }
          </div>
        </div>
      </div >
    );
  }
}
