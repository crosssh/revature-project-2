import * as React from "react";

export class CreateUserComponent extends React.Component<any, any> {
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

  public render() {
    return <h1> This will be the create user form </h1>;
  }
}
