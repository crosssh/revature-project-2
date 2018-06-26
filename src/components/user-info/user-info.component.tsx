import * as React from "react";
import { ProfileNavComponent } from "../profile-nav.component";
import * as awsCognito from "amazon-cognito-identity-js";

export class UserInfoComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
    }
  }

  public componentDidMount() {
    const poolData = {
      ClientId: "5gpn6c10oppbml3hjva90nrjgf", // Your client id here
      UserPoolId: "us-west-2_S3BP7tO7z" // Your user pool id here
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if(cognitoUser !== null) {
      cognitoUser.getSession((err: any, session: any) => {
        if(err) {
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


  public render() {
    return (
      <div className="row">
        <ProfileNavComponent />
        <div className="col-10">
          <div className="container">
            <p className="font-weight-bold text-center">First Name: {this.state.firstName}</p>
            <p className="font-weight-bold text-center">Last Name: {this.state.lastName}</p>
            <p className="font-weight-bold text-center">Email: {this.state.email}</p>
          </div>
        </div>
      </div>
    );
  }
}
