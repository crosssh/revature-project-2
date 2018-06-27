import * as React from "react";
import { IBuyer, IUser } from "../../reducers";
import * as awsCognito from "amazon-cognito-identity-js";
import { RouteProps } from "react-router";

interface IProp extends IBuyer, IUser, RouteProps {
  buyer: any;
  user: any;
  history: any;
  postNewBuyer: (username: string) => void;
  updateUsername: (username: string) => void;
  updatePassword: (password: string) => void;
  updateGivenName: (givenName: string) => void;
  updateFamilyName: (familyName: string) => void;
  updateEmail: (email: string) => void;
}

export class CreateUserComponent extends React.Component<IProp, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public updateUsername = (e: any) => {
    const username = e.target.value;
    this.props.updateUsername(username);
  };

  public updatePassword = (e: any) => {
    const password = e.target.value;
    this.props.updatePassword(password);
  };

  public updateGivenName = (e: any) => {
    const givenName = e.target.value;
    this.props.updateGivenName(givenName);
  };

  public updateFamilyName = (e: any) => {
    const familyName = e.target.value;
    this.props.updateFamilyName(familyName);
  };

  public updateEmail = (e: any) => {
    const email = e.target.value;
    this.props.updateEmail(email);
  };

  public postNewBuyer = (username: string) => {
    this.props.postNewBuyer(username);
  }

  public submit = (e: any) => {
    e.preventDefault();
    const poolData = {
      ClientId: "5gpn6c10oppbml3hjva90nrjgf", // Your client id here
      UserPoolId: "us-west-2_S3BP7tO7z" // Your user pool id here
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);
    const email = {
      Name: 'email',
      Value: this.props.user.attribute.email,
    };
    const familyName = {
      Name: 'family_name',
      Value: this.props.user.attribute.family_name,
    }
    const givenName = {
      Name: 'given_name',
      Value: this.props.user.attribute.given_name,
    }

    const attributeEmail = new awsCognito.CognitoUserAttribute(email);
    const attributeFamilyName = new awsCognito.CognitoUserAttribute(familyName);
    const attributeGivenName = new awsCognito.CognitoUserAttribute(givenName);
    const attributeList = [];

    attributeList.push(attributeEmail);
    attributeList.push(attributeFamilyName);
    attributeList.push(attributeGivenName)
    let cognitoUser;
    console.log(cognitoUser);

    userPool.signUp(this.props.user.username, this.props.user.password, attributeList, [], (err: any, result: any) => {
      if (err) {
        console.log(err);
        return;
      }
      cognitoUser = result.user;
      this.postNewBuyer(this.props.user.username);
      this.props.history.push('/sign-in');
    })
  };

  public render() {
    return (
      <div>
        <h3 className="indented">Become a member of PopBay! </h3>
        <form className="form-group indented col-4" onSubmit={this.submit}>
          Username: <br />
          <input type="text" className="username form-control" placeholder="Username" onChange={this.updateUsername} required /> <br />
          Password: <br />
          <input type="password" className="password form-control" placeholder="Password" onChange={this.updatePassword} required /> <br />
          Email: <br />
          <input type="email" className="username form-control" placeholder="example@example.com" onChange={this.updateEmail} required /> <br />
          First Name: <br />
          <input type="text" className="firstname form-control" placeholder="First name" onChange={this.updateGivenName} required /> <br />
          Last Name: <br />
          <input type="text" className="lastname form-control" placeholder="Last name" onChange={this.updateFamilyName} required /> <br />
          <button type="submit" className="btn btn-secondary create-user-btn" >Register</button>
        </form>
      </div>
    );
  }
}
