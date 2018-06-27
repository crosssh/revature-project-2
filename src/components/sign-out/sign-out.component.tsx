import * as React from "react";
import { IProduct, IBuyer, IUser } from "../../reducers";
import { RouteProps } from 'react-router';
import * as awsCognito from "amazon-cognito-identity-js";

interface IProps extends IBuyer, IProduct, IUser, RouteProps {
  buyer: any;
  product: any;
  user: any;
  history: any;
  reinitializeBuyer: () => void;
  reinitializeProduct: () => void;
  reinitializeUser: () => void;
  // log out function
}

export class SignOutComponent extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
  }

  public componentDidMount() {
    // add something here
    // call log out function to clear user.state and local storage 
    console.log('signing out')
    this.props.reinitializeBuyer();
    this.props.reinitializeProduct();
    this.props.reinitializeUser();
    localStorage.removeItem('token');
    localStorage.removeItem('username');

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

    if (cognitoUser != null) {
      console.log(cognitoUser.getUsername())
      cognitoUser.globalSignOut({
        onFailure: console.log,
        onSuccess: console.log,
      });
    }

    this.props.history.push('/home');
  }

  public render() {
    return (
      false
    );
  }
}
