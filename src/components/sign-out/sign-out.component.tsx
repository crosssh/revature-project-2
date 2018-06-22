import * as React from "react";
import { IProduct, IBuyer, IUser } from "../../reducers";
import {RouteProps} from 'react-router';

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
    this.props.reinitializeBuyer();
    this.props.reinitializeProduct();
    this.props.reinitializeUser();

    this.props.history.push('/home');
  }


  public render() {
    return (
      <div>
        
      </div>
    );
  }
}
