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
}

export class SignOutComponent extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.reinitializeBuyer();
    this.props.reinitializeProduct();
    this.props.reinitializeUser();
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    const poolData = {
      ClientId: "5gpn6c10oppbml3hjva90nrjgf",
      UserPoolId: "us-west-2_S3BP7tO7z"
    };
    const userPool = new awsCognito.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      console.log(cognitoUser.getUsername())
      cognitoUser.signOut();
    }

    this.props.history.push('/home');
  }


  public render() {
    return (
      <div>

      </div>
    );
  }
}
